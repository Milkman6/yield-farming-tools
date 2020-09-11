import { SYNTHETIX_STAKING_ABI } from '../../../data/constants'
import { PoolToken, StakingPool } from '../../../data/token'
import { Tokens } from '../../../data/TokenManager'
import { PoolData, RiskLevel } from '../../../types'
import { getSnxBasedBalPool } from '../../pool-templates/balancer-staking'

const poolData: PoolData = {
  provider: 'yfv.finance',
  name: 'Uni',
  added: '2020-09-02 22:50:58',
  risk: {
    smartContract: RiskLevel.LOW,
    impermanentLoss: RiskLevel.MEDIUM,
  },
  links: [
    {
      title: 'Info',
      link:
        'https://medium.com/@yfv.finance/farming-yfv-at-balancer-pool-92c62b122027',
    },
    {
      title: 'Staking',
      link: 'https://yfv.finance/',
    },
    {
      title: 'Pool',
      link: `https://pools.balancer.exchange/#/pool/`,
    },
  ],
}

export const yfiPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x70b83A7f5E83B3698d136887253E0bf426C9A117',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x742569fd5266486fd2a50171dbdc88B8Ee893ee9',
      ticker: 'BPT',
    },
    {
      poolToken1: tokens.yfv,
      poolToken2: tokens.yfi,
    }
  )

  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yfv,
    },
    poolData
  )
}

export const balPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x62a9fE913eb596C8faC0936fd2F51064022ba22e',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xc19e3035a4f6f69b981c7dc2f533e862aa3af496',
      ticker: 'BPT',
    },
    {
      poolToken1: tokens.yfv,
      poolToken2: tokens.bal,
    }
  )
  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yfv,
    },
    poolData
  )
}

export const batPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x1c990fc37f399c935625b815975d0c9fad5c31a1',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x471eb7dcf6647abaf838a5aad94940ce6932198c',
      ticker: 'BPT',
    },
    { poolToken1: tokens.yfv, poolToken2: tokens.bat }
  )
  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yfv,
    },
    poolData
  )
}

export const renPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x752037bfef024bd2669227bf9068cb22840174b0',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x433d0c33288b985cf232a7e312bcfafd372460a8',
      ticker: 'BPT',
    },
    { poolToken1: tokens.yfv, poolToken2: tokens.ren }
  )
  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yfv,
    },
    poolData
  )
}

export const kncPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x9b74774f55C0351fD064CfdfFd35dB002C433092',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xbfdef139103033990082245c24ff4b23dafd88cf',
      ticker: 'BPT',
    },
    { poolToken1: tokens.yfv, poolToken2: tokens.knc }
  )
  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yfv,
    },
    poolData
  )
}

export const wethPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x67FfB615EAEb8aA88fF37cCa6A32e322286a42bb',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x10dd17ecfc86101eab956e0a443cab3e9c62d9b4',
      ticker: 'BPT',
    },
    { poolToken1: tokens.yfv, poolToken2: tokens.weth }
  )
  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yfv,
    },
    poolData
  )
}

export const linkPool = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x196cf719251579cbc850ded0e47e972b3d7810cd',
    ABI: SYNTHETIX_STAKING_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x4b0b0bf60abbf79a2fd028e4d52ac393982488ce',
      ticker: 'BPT',
    },
    { poolToken1: tokens.yfv, poolToken2: tokens.link }
  )
  return await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.yfv,
    },
    poolData
  )
}
