import { PoolToken, StakingPool, Token } from '../../data/token'
import { PoolData } from '../../types'
import { get_synth_weekly_rewards, toDollar, toFixed } from '../utils'

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

  console.log('6', weeklyRoi)

  const priceData = [
    { label: poolToken1.ticker, value: poolToken1.price },
    { label: poolToken2.ticker, value: poolToken2.price },
    { label: liquidityPool.ticker, value: liquidityPool.price },
  ]

  console.log(
    'liquidityPool.address',
    liquidityPool.address,
    poolData.links[2].link
  )

  if (
    rewardToken.ticker !== poolToken1.ticker &&
    rewardToken.ticker !== poolToken2.ticker
  ) {
    priceData.push({ label: rewardToken.ticker, value: rewardToken.price })
  }

  return {
    provider: poolData.provider,
    name: `${poolData.name} ${poolToken1.ticker}/${poolToken2.ticker}`,
    poolRewards: [rewardToken.ticker],
    links: [
      ...poolData.links.slice(0, 2),
      {
        title: poolData.links[2].title,
        link: poolData.links[2].link + liquidityPool.address.toLowerCase(),
      },
    ],
    risk: poolData.risk,
    apr: weeklyRoi * 52,
    prices: priceData,
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
