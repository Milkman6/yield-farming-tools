import deepmerge from 'deepmerge'
import { MASTER_CHEF_ABI } from '../../../data/constants'
import { PoolToken, StakingPool } from '../../../data/token'
import { Tokens } from '../../../data/TokenManager'
import { PoolData, RiskLevel } from '../../../types'
import { getSushiPoolData } from '../../pool-templates/sushi-staking'

const poolData: PoolData = {
  provider: 'Sushi',
  name: 'Sushi',
  risk: {
    smartContract: RiskLevel.MEDIUM,
    impermanentLoss: RiskLevel.HIGH,
  },
  links: [
    {
      title: 'Info',
      link: 'https://medium.com/sushiswap/the-sushiswap-project-c4049ea9941e',
    },
    {
      title: 'Staking',
      link: 'https://sushiswap.org/',
    },
  ],
}

export const umaEthPool = async (tokens: Tokens) => {
  const poolId = 7
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x001b6450083E531A5a7Bf310BD2c1Af4247E23D4',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.uma,
    }
  )
  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const bandEthPool = async (tokens: Tokens) => {
  const poolId = 9
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xA75F7c2F025f470355515482BdE9EFA8153536A8',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.band,
    }
  )
  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const snxEthPool = async (tokens: Tokens) => {
  const poolId = 6
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xA1d7b2d891e3A1f9ef4bBC5be20630C2FEB1c470',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.snx,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const sushiEthPool = async (tokens: Tokens) => {
  const poolId = 12
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x795065dCc9f64b5614C407a6EFDC400DA6221FB0',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.sushi,
      poolToken2: tokens.weth,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const lendEthPool = async (tokens: Tokens) => {
  const poolId = 5
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x5E63360E891BD60C69445970256C260b0A6A54c6',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.lend,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const yfiEthPool = async (tokens: Tokens) => {
  const poolId = 11
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x088ee5007C98a9677165D78dD2109AE4a3D04d0C',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.yfi,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const tetherEthPool = async (tokens: Tokens) => {
  const poolId = 0
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x06da0fd433C1A5d7a4faa01111c044910A184553',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.tether,
    }
  )
  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const amplEthPool = async (tokens: Tokens) => {
  const poolId = 10
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xCb2286d9471cc185281c4f763d34A962ED212962',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.ampl,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const daiEthPool = async (tokens: Tokens) => {
  const poolId = 2
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.dai,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const usdcEthPool = async (tokens: Tokens) => {
  const poolId = 1
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x397FF1542f962076d0BFE58eA045FfA2d347ACa0',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.usdc,
      poolToken2: tokens.weth,
    }
  )
  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const linkEthPool = async (tokens: Tokens) => {
  const poolId = 8
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xC40D16476380e4037e6b1A2594cAF6a6cc8Da967',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.link,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const compEthPool = async (tokens: Tokens) => {
  const poolId = 4
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x31503dcb60119A812feE820bb7042752019F2355',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.comp,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const susdEthPool = async (tokens: Tokens) => {
  const poolId = 3
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xF1F85b2C54a2bD284B1cf4141D64fD171Bd85539',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.susd,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const serumEthPool = async (tokens: Tokens) => {
  const poolId = 15
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x117d4288B3635021a3D612FE05a3Cbf5C717fEf2',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.srm,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const yamv2EthPool = async (tokens: Tokens) => {
  const poolId = 16
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x95b54C8Da12BB23F7A5F6E26C38D04aCC6F81820',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.yamv2,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const renEthPool = async (tokens: Tokens) => {
  const poolId = 13
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x611CDe65deA90918c0078ac0400A72B0D25B9bb1',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.ren,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const crvEthPool = async (tokens: Tokens) => {
  const poolId = 17
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0x58Dc5a51fE44589BEb22E8CE67720B5BC5378009',
      ticker: 'SLP',
    },
    {
      poolToken1: tokens.weth,
      poolToken2: tokens.crv,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://sushiswap.vision/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}

export const susdBasedPool = async (tokens: Tokens) => {
  const poolId = 14
  const stakingPool = new StakingPool({
    address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
    ABI: MASTER_CHEF_ABI,
  })
  const liquidityPool = new PoolToken(
    {
      address: '0xaAD22f5543FCDaA694B68f94Be177B561836AE57',
      ticker: 'UNI-V2',
    },
    {
      poolToken1: tokens.susd,
      poolToken2: tokens.based,
    }
  )

  return await getSushiPoolData(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.sushi,
    },
    poolId,
    deepmerge(poolData, {
      links: [
        {
          title: 'Pool',
          link: `https://uniswap.info/pair/${liquidityPool.address}`,
        },
      ],
    })
  )
}
