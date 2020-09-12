import { PoolData, RiskLevel } from '../../../types'
import { Tokens } from '../../../data/TokenManager'
import { StakingPool, PoolToken } from '../../../data/token'
import { SYNTHETIX_STAKING_ABI } from '../../../data/constants'
import { getSnxBasedBalPool } from '../../pool-templates/lp-staking'
import { getSnxBasedStakingData } from '../../pool-templates/snx-staking'

// todo: update pool data per pool
const yffiPoolData: PoolData = {
  provider: 'yffi.finance',
  name: 'Balancer',
  added: '2020-07-09 22:50:58',
  risk: {
    smartContract: RiskLevel.MEDIUM,
    impermanentLoss: RiskLevel.MEDIUM,
  },
  links: [
    {
      title: 'Instructions',
      link: 'https://boxmining.com/yffi-yield-farming/',
    },
    {
      title: 'Curve Pool',
      link: 'https://www.curve.fi/iearn/deposit',
    },
    {
      title: 'Balancer Pool',
      link:
        'https://pools.balancer.exchange/#/pool/0xc855F1572c8128ADd6F0503084Ba23930B7461f8',
    },
    {
      title: 'Staking',
      link: 'https://www.yffi.finance/#/stake',
    },
    {
      title: 'Token',
      link:
        'https://etherscan.io/address/0xCee1d3c3A02267e37E6B373060F79d5d7b9e1669',
    },
  ],
}

export const ycrvStaking = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x95284D906Ab7F1bD86f522078973771EcBB20662',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  const data = await getSnxBasedStakingData(
    {
      stakingPool,
      stakingToken: tokens.ycrv,
      rewardToken: tokens.yffi,
    },
    yffiPoolData
  )

  return data
}

export const yffiDai = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x81dfa0b3cf2601012075ef2619afb9d4ed4da762',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  const liquidityPool = new PoolToken(
    {
      address: '0xFe793bC3D1Ef8d38934896980254e81d0c5F6239',
      ticker: 'BPT',
    },
    {
      poolToken1: tokens.yffi,
      poolToken2: tokens.dai,
    }
  )

  const data = await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yffi,
    },
    yffiPoolData
  )

  return data
}

export const yffiYcrv = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x7c8c77933e2fd6adc2ebfab5dc529c6787c57c34',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  const liquidityPool = new PoolToken(
    {
      address: '0xc855F1572c8128ADd6F0503084Ba23930B7461f8',
      ticker: 'BPT',
    },
    {
      poolToken1: tokens.yffi,
      poolToken2: tokens.ycrv,
    }
  )

  const data = await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yffi,
    },
    yffiPoolData
  )

  return data
}
