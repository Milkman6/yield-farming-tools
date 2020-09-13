import { PoolToken, StakingPool, Token } from '../../data/token'
import { toFixed } from '../utils'
import { getTokenPriceList, getRoiList } from '../poolUtils'

type RequiredTokens = {
  stakingPool: StakingPool
  liquidityPool: PoolToken
  rewardToken: Token
}

export async function getSushiPoolData(
  { stakingPool, liquidityPool, rewardToken }: RequiredTokens,
  poolId: number,
  poolData
) {
  const poolToken1 = liquidityPool.poolToken1
  const poolToken2 = liquidityPool.poolToken2

  // update to be dynamic
  const multiplier = 1
  const poolInfo = await stakingPool.poolInfo(poolId)
  const rewardPerBlock = parseInt(poolInfo.allocPoint)

  const weeklyReward = rewardPerBlock * (604800 / 30)

  const totalStakedLiqTokens = await liquidityPool.getBalance(
    stakingPool.address
  )
  const userInfo = await stakingPool.userInfo(poolId, global.App.YOUR_ADDRESS)

  const yourStakedTokens = userInfo.amount / 1e18

  const yourEarnedRewards =
    (await stakingPool.pendingSushi(poolId, global.App.YOUR_ADDRESS)) / 1e18

  const rewardPerToken = weeklyReward / totalStakedLiqTokens

  let weeklyRoi =
    (rewardPerToken * (await rewardToken.getPrice()) * multiplier) /
    (await liquidityPool.getPrice())

  return {
    provider: poolData.provider,
    name: `${poolData.name} ${poolToken1.ticker}/${poolToken2.ticker}`,
    poolRewards: [rewardToken.ticker],
    links: poolData.links,
    risk: poolData.risk,
    apr: weeklyRoi * 52,
    prices: await getTokenPriceList([
      poolToken1,
      poolToken2,
      rewardToken,
      liquidityPool,
    ]),
    staking: [
      {
        label: 'Pool Total',
        value: totalStakedLiqTokens * liquidityPool.price,
      },
      {
        label: 'Your Total',
        value: yourStakedTokens * liquidityPool.price,
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
