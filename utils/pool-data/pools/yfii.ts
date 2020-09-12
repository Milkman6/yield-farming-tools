import deepmerge from 'deepmerge'
import { SYNTHETIX_STAKING_ABI } from '../../../data/constants'
import { PoolToken, StakingPool } from '../../../data/token'
import { Tokens } from '../../../data/TokenManager'
import { PoolData, RiskLevel } from '../../../types'
import { getSnxBasedBalPool } from '../../pool-templates/lp-staking'
import { getSnxBasedStakingData } from '../../pool-templates/snx-staking'

const poolData: PoolData = {
  provider: 'yfii.finance',
  name: 'Balancer',
  risk: {
    smartContract: RiskLevel.MEDIUM,
    impermanentLoss: RiskLevel.MEDIUM,
  },
  links: [
    {
      title: 'Instructions',
      link:
        'https://yfii.s3-ap-northeast-1.amazonaws.com/YFII_Innovative_DeFi_Yield_Farming_Token.pdf',
    },
    {
      title: 'Staking',
      link: 'https://www.yfii.finance/#/stake',
    },
  ],
}

export const ycrvStaking = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xb81D3cB2708530ea990a287142b82D058725C092',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  return await getSnxBasedStakingData(
    {
      stakingPool,
      stakingToken: tokens.ycrv,
      rewardToken: tokens.yfii,
    },
    deepmerge(poolData, {
      name: '',
    } as PoolData)
  )
}

export const yfiiDai = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xAFfcD3D45cEF58B1DfA773463824c6F6bB0Dc13a',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  const liquidityPool = new PoolToken(
    {
      address: '0x16cAC1403377978644e78769Daa49d8f6B6CF565',
      ticker: 'BPT',
    },
    {
      poolToken1: tokens.yfii,
      poolToken2: tokens.dai,
    }
  )

  const data = await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yfii,
    },
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://pools.balancer.exchange/#/pool/${liquidityPool.address}`,
        },
      ],
    })
  )

  return data
}
