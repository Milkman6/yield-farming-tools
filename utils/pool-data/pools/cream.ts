import { SYNTHETIX_STAKING_ABI } from '../../../data/constants'
import { PoolToken, StakingPool } from '../../../data/token'
import { Tokens } from '../../../data/TokenManager'
import { PoolData, RiskLevel } from '../../../types'
import { getSnxBasedBalPool } from '../../pool-templates/lp-staking'
import { getSnxBasedStakingData } from '../../pool-templates/snx-staking'

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
      ticker: 'CRPT',
    },
    {
      poolToken1: tokens.yUsd,
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

export const creamWethUniPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x65bC20147E2cA6F3bf0819c38E519F8792043b36',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xddF9b7a31b32EBAF5c064C80900046C9e5b7C65F',
      ticker: 'UNI-V2',
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
// fix name
export const creamWethBalPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xCcD5cb3401704AF8462a4FFE708a180d3C5c4Da0',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x5a82503652d05B21780f33178FDF53d31c29B916',
      ticker: 'BPT',
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
  return data
}

export const crCreamCrYfi = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xCC5f8cA88cAbA27f15746aeb481F0C446991F863',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xa65405e0dd378c65308deae51da9e3bcebb81261',
      ticker: 'CRPT',
    },
    {
      poolToken1: tokens.crCream,
      poolToken2: tokens.crYfi,
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
  return data
}

export const yUsdUsdc = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xb8c3a282de181889ef20488e73e7a149a8c1bfe1',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x661b94d96ADb18646e791A06576F7905a8d1BEF6',
      ticker: 'CRPT',
    },
    {
      poolToken1: tokens.yUsd,
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
  return data
}

export const yEthWeth = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xcf679b2e16498a866bd4cbda60d42f208084c6e1',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x6a3B875854f5518E85Ef97620c5e7de75bbc3fA0',
      ticker: 'CRPT',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.yEth,
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
  return data
}

export const crYethCrYusd = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0xd032bfedc68ce5067e3e0b766dbcf653ceea541a',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xB3284F2F22563F27cEF2912637b6A00F162317c4',
      ticker: 'CRPT',
    },
    {
      poolToken1: tokens.crYeth,
      poolToken2: tokens.crYusd,
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
  return data
}

export const yfiUsdc = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x2ab765c2b4a4e197fbae769f86870f2310a04d61',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x7350c6d00d63ab5988250aea347f277c19bea785',
      ticker: 'CRPT',
    },
    {
      poolToken1: tokens.yfi,
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
  return data
}

export const crCreamStaking = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x71A808Fd21171d992ebc17678e8ae139079922d0',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  const data = await getSnxBasedStakingData(
    {
      stakingPool,
      stakingToken: tokens.crCream,
      rewardToken: tokens.cream,
    },
    creamPoolData
  )

  return data
}
