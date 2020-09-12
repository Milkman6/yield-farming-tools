import { PoolData, RiskLevel } from '../../../types'
import { Tokens } from '../../../data/TokenManager'
import { StakingPool, PoolToken } from '../../../data/token'
import { SYNTHETIX_STAKING_ABI } from '../../../data/constants'
import { getSnxBasedBalPool } from '../../pool-templates/lp-staking'
import { getSnxBasedStakingData } from '../../pool-templates/snx-staking'

// todo: update pool data per pool
const yfiiPoolData: PoolData = {
  provider: 'yfii.finance',
  name: 'Balancer',
  added: '2020-07-09 22:50:58',
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
      title: 'Balancer Pool',
      link:
        'https://pools.balancer.exchange/#/pool/0x16cAC1403377978644e78769Daa49d8f6B6CF565',
    },
    {
      title: 'Staking',
      link: 'https://www.yfii.finance/#/stake',
    },
    {
      title: 'Token',
      link:
        'https://etherscan.io/address/0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
    },
  ],
}

export const ycrvStaking = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xb81D3cB2708530ea990a287142b82D058725C092',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  const data = await getSnxBasedStakingData(
    {
      stakingPool,
      stakingToken: tokens.ycrv,
      rewardToken: tokens.yfii,
    },
    yfiiPoolData
  )

  return data
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
      rewardToken: tokens.yffi,
    },
    yfiiPoolData
  )

  return data
}
