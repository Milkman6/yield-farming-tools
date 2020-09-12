import { PoolData, RiskLevel } from '../../../types'
import { Tokens } from '../../../data/TokenManager'
import { StakingPool, PoolToken } from '../../../data/token'
import { SYNTHETIX_STAKING_ABI } from '../../../data/constants'
import { getSnxBasedBalPool } from '../../pool-templates/lp-staking'

const poolData: PoolData = {
  provider: 'Based',
  name: 'Uniswap',
  added: '2020-08-24 18:14:46',
  risk: {
    smartContract: RiskLevel.HIGH,
    impermanentLoss: RiskLevel.HIGH,
  },
  links: [
    {
      title: 'Info',
      link: 'http://based.money/',
    },
    {
      title: 'Pool',
      link:
        'https://uniswap.info/pair/0xaAD22f5543FCDaA694B68f94Be177B561836AE57',
    },
    {
      title: 'Staking',
      link: 'https://stake.based.money/',
    },
  ],
}
//todo: account for rebase
export const susdBased = async (tokens: Tokens) => {
  const stakingPool = new StakingPool({
    address: '0x4fc7e3249A149c0bf729863f49cD2FF468F2412F',
    ABI: SYNTHETIX_STAKING_ABI,
  })

  const liquidityPool = new PoolToken(
    {
      address: '0xaAD22f5543FCDaA694B68f94Be177B561836AE57',
      ticker: 'BPT',
    },
    {
      poolToken1: tokens.based,
      poolToken2: tokens.susd,
    }
  )

  const data = await getSnxBasedBalPool(
    {
      stakingPool,
      liquidityPool,
      rewardToken: tokens.based,
    },
    poolData
  )

  return data
}
