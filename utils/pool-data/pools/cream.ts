import { ERC20_ABI, SYNTHETIX_STAKING_ABI } from '../../../data/constants'
import { PoolToken, StakingPool } from '../../../data/token'
import { Tokens } from '../../../data/TokenManager'
import { PoolData, RiskLevel } from '../../../types'
import { getSnxBasedBalPool } from '../../pool-templates/balancer-staking'

const creamPoolData: PoolData = {
  provider: 'Cream',
  name: 'Swap',
  added: '2020-09-09 22:50:58',
  risk: {
    smartContract: RiskLevel.HIGH,
    impermanentLoss: RiskLevel.HIGH,
  },
  links: [
    {
      title: 'Info',
      link:
        'https://medium.com/cream-finance/announcing-c-r-e-a-m-swap-a7b318f19f6',
    },
    {
      title: 'Staking',
      link: 'https://app.cream.finance/reward#CreamSwap',
    },
    {
      title: 'Pool',
      link: 'https://app.cream.finance/pools/pool/',
    },
  ],
}

export const creamUsdcPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x1676fc274b65966ed0c6438a26d34c6c92a5981c',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  const liquidityPool = new PoolToken(
    {
      address: '0x4fd2d9d6ef05e13bf0b167509151a4ec3d4d4b93',
      ticker: 'CRPT',
    },
    {
      poolToken1: tokens.cream,
      poolToken2: tokens.usdc,
    }
  )

  const data = await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.cream,
    },
    creamPoolData
  )
  console.log(data)

  return data
}

export const creamWethPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x43a8ecE49718E22D21077000768afF91849BCEfF',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xa49b3c7C260ce8A7C665e20Af8aA6E099A86cf8A',
      ticker: 'CRPT',
    },
    {
      poolToken1: tokens.cream,
      poolToken2: tokens.weth,
    }
  )
  const data = await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.cream,
    },
    creamPoolData
  )
  console.log(data)

  return data
}

export const yyCrvUsdcPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xb8c3a282de181889ef20488e73e7a149a8c1bfe1',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x661b94d96ADb18646e791A06576F7905a8d1BEF6',
      ABI: ERC20_ABI,
      ticker: 'CRPT',
    },
    {
      poolToken1: tokens.ycrv,
      poolToken2: tokens.usdc,
    }
  )
  const data = await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.cream,
    },
    creamPoolData
  )
  console.log(data)

  return data
}
