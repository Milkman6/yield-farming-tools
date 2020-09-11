import { PoolToken, StakingPool, Token } from '../../data/token'
import { toFixed } from '../utils'

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

  const multiplier = await stakingPool.BONUS_MULTIPLIER()
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
    prices: [
      { label: poolToken1.ticker, value: poolToken1.price },
      { label: poolToken2.ticker, value: poolToken2.price },
      { label: rewardToken.ticker, value: liquidityPool.price },
    ],
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
    ROIs: [
      {
        label: 'Hourly',
        value: weeklyRoi / 7 / 24,
      },
      {
        label: 'Daily',
        value: weeklyRoi / 7,
      },
      {
        label: 'Weekly',
        value: weeklyRoi,
      },
    ],
  }
}
