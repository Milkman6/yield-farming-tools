import { PoolToken, StakingPool, Token } from '../../data/token'
import { PoolData } from '../../types'
import { getRoiList, getTokenPriceList } from '../poolUtils'
import { get_synth_weekly_rewards, toFixed } from '../utils'

type RequiredTokens = {
  stakingPool: StakingPool
  liquidityPool: PoolToken
  rewardToken: Token
}

export async function getSnxBasedBalPool(
  { stakingPool, liquidityPool, rewardToken }: RequiredTokens,
  poolData: PoolData
) {
  console.log('starting')
  const poolToken1 = liquidityPool.poolToken1
  const poolToken2 = liquidityPool.poolToken2

  console.log('2', poolToken1, poolToken2)
  const yourStakedTokens = await stakingPool.getBalance(global.App.YOUR_ADDRESS)
  console.log('3', yourStakedTokens)

  const totalStakedLiqTokens = await liquidityPool.getBalance(
    stakingPool.address
  )

  const weeklyReward = await get_synth_weekly_rewards(stakingPool)
  const yourEarnedRewards = await stakingPool.getMyRewards()
  console.log('4', weeklyReward, yourEarnedRewards)

  const rewardPerToken = weeklyReward / totalStakedLiqTokens

  console.log('5', rewardPerToken)

  const weeklyRoi =
    (rewardPerToken * (await rewardToken.getPrice()) * 100) /
    (await liquidityPool.getPrice())

  await liquidityPool.getTokenRatios()
  let myPoolToken1Balance =
    (yourStakedTokens * liquidityPool.price * liquidityPool.tokenOneRatio) /
    poolToken1.price
  let poolToken1UnderlyingPrice = poolToken1.price
  if (poolToken1?.underlyingToken && myPoolToken1Balance > 0) {
    myPoolToken1Balance = await poolToken1.convertBalanceToUnderlying(
      myPoolToken1Balance
    )
    poolToken1UnderlyingPrice = await poolToken1.getUnderlyingPrice()
  }

  let myPoolToken2Balance =
    (yourStakedTokens * liquidityPool.price * liquidityPool.tokenTwoRatio) /
    poolToken2.price
  let poolToken2UnderlyingPrice = poolToken2.price

  if (poolToken2?.underlyingToken && myPoolToken2Balance > 0) {
    myPoolToken2Balance = await poolToken2.convertBalanceToUnderlying(
      myPoolToken2Balance
    )
    poolToken2UnderlyingPrice = await poolToken2.getUnderlyingPrice()
  }

  await liquidityPool.getTokenRatios()

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
    pooled: [
      {
        label: `${toFixed(myPoolToken1Balance, 4)} ${poolToken1.ticker}`,
        value: myPoolToken1Balance * poolToken1UnderlyingPrice,
      },
      {
        label: `${toFixed(myPoolToken2Balance, 4)} ${poolToken2.ticker}`,
        value: myPoolToken2Balance * poolToken2UnderlyingPrice,
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
