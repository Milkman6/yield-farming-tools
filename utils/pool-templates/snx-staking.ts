import { StakingPool, Token } from '../../data/token'
import { PoolData } from '../../types'
import { get_synth_weekly_rewards, toFixed } from '../utils'
import { getTokenPriceList, getRoiList } from '../poolUtils'

type RequiredTokens = {
  stakingPool: StakingPool
  stakingToken: Token
  rewardToken: Token
}

export async function getSnxBasedStakingData(
  { rewardToken, stakingPool, stakingToken }: RequiredTokens,
  poolData: PoolData
) {
  const yourStakedTokens = await stakingPool.getBalance(
    global.App.YOUR_ADDRESS,
    stakingToken
  )

  const totalStakedTokens = await stakingToken.getBalance(stakingPool.address)

  const weeklyReward = await get_synth_weekly_rewards(stakingPool)
  const yourEarnedRewards = await stakingPool.getMyRewards()

  const rewardPerToken = weeklyReward / totalStakedTokens

  const weeklyRoi =
    (rewardPerToken * (await rewardToken.getPrice()) * 100) /
    (await stakingToken.getPrice())

  return {
    provider: poolData.provider,
    name: `${poolData.name} ${stakingToken.ticker}`,
    poolRewards: [rewardToken.ticker],
    links: poolData.links,
    risk: poolData.risk,
    apr: weeklyRoi * 52,
    prices: await getTokenPriceList([stakingToken, rewardToken]),
    staking: [
      {
        label: 'Pool Total',
        value: totalStakedTokens * stakingToken.price,
      },
      {
        label: 'Your Total',
        value: yourStakedTokens * rewardToken.price,
      },
    ],
    rewards: [
      {
        label: `${toFixed(yourEarnedRewards, 4)} ${rewardToken.ticker}`,
        value: yourEarnedRewards * rewardToken.price,
      },
    ],
    ROIs: getRoiList(weeklyRoi),
  }
}
