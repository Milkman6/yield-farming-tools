import deepmerge from 'deepmerge'
import { SYNTHETIX_STAKING_ABI } from '../../../data/constants'
import { PoolToken, StakingPool } from '../../../data/token'
import { Tokens } from '../../../data/TokenManager'
import { PoolData, RiskLevel } from '../../../types'
import { getSnxBasedBalPool } from '../../pool-templates/lp-staking'
import { getSnxBasedStakingData } from '../../pool-templates/snx-staking'

const yffiPoolData: PoolData = {
  provider: 'yffi.finance',
  name: 'Balancer',
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
      title: 'Staking',
      link: 'https://www.yffi.finance/#/stake',
    },
  ],
}

export const ycrvStaking = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x95284D906Ab7F1bD86f522078973771EcBB20662',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  return await getSnxBasedStakingData(
    {
      stakingPool,
      stakingToken: tokens.ycrv,
      rewardToken: tokens.yffi,
    },
    deepmerge(yffiPoolData, {
      name: '',
      risk: {
        impermanentLoss: RiskLevel.NONE,
      },
    })
  )
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

  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yffi,
    },
    deepmerge(yffiPoolData, {
      links: [
        {
          title: 'Pool',
          link: `https://pools.balancer.exchange/#/pool/${liquidityPool.address}`,
        },
      ],
    })
  )
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

  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yffi,
    },
    deepmerge(yffiPoolData, {
      links: [
        {
          title: 'Pool',
          link: `https://pools.balancer.exchange/#/pool/${liquidityPool.address}`,
        },
      ],
    })
  )
}
