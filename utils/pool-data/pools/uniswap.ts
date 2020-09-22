import deepmerge from 'deepmerge'
import { SYNTHETIX_STAKING_ABI } from '../../../data/constants'
import { PoolToken, StakingPool } from '../../../data/token'
import { Tokens } from '../../../data/TokenManager'
import { PoolData, RiskLevel } from '../../../types'
import { getSnxBasedBalPool } from '../../pool-templates/lp-staking'

const poolData: PoolData = {
  provider: 'Uniswap',
  name: 'Uni',
  risk: {
    smartContract: RiskLevel.MEDIUM,
    impermanentLoss: RiskLevel.HIGH,
  },
  links: [
    {
      title: 'Info',
      link: 'https://uniswap.org/blog/uni/',
    },
    {
      title: 'Staking',
      link: 'https://app.uniswap.org/#/uni',
    },
  ],
}

export const ethDai = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xa1484C3aa22a66C62b77E0AE78E15258bd0cB711',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11',
      ticker: 'UNI-V2',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.dai,
    }
  )

  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.uni,
    },
    poolData
  )
}

export const ethUsdc = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x7FBa4B8Dc5E7616e59622806932DBea72537A56b',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
      ticker: 'UNI-V2',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.usdc,
    }
  )

  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.uni,
    },
    poolData
  )
}

export const ethUsdt = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x6C3e4cb2E96B01F4b866965A91ed4437839A121a',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852',
      ticker: 'UNI-V2',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.tether,
    }
  )

  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.uni,
    },
    poolData
  )
}

export const ethWbtc = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xCA35e32e7926b96A9988f61d510E038108d8068e',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940',
      ticker: 'UNI-V2',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.wbtc,
    }
  )

  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.uni,
    },
    poolData
  )
}
