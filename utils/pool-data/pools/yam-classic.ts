import { Y_STAKING_POOL_ABI } from '../../../data/constants'
import { getSnxBasedStakingData } from '../../pool-templates/staking'
import {
  WETH_TOKEN,
  YAM_CLASSIC_TOKEN,
  YCRV_TOKEN,
} from '../../../data/token-data'
import { PoolData, RiskLevel, TokenData } from '../../../types'

const YCRV_YAM2_UNI_POOL_ADDR = '0xC329BC05CC9fb5f4e8dA13Bf6A849D33dD2A167b'

const poolData: PoolData = {
  provider: 'Yam Classic',
  name: 'YAM2',
  added: '2020-08-17 22:51:18',
  risk: {
    smartContract: RiskLevel.MEDIUM,
    impermanentLoss: RiskLevel.NONE,
  },
  links: [
    {
      title: 'Info',
      link:
        'https://medium.com/yamfinance-classic/yam-2-0-the-farming-continues-2cb77e5d186b?source=collection_home---6------0-----------------------',
    },
    {
      title: 'Staking',
      link: 'https://yamclassic.finance/#/farms/',
    },
  ],
}

const wethStakingPool: TokenData = {
  address: '0xd9c5472986A1a6E12390ceeb7a28A2D236D5CA02',
  ABI: Y_STAKING_POOL_ABI,
}
export const yamcWethPool = async (App) => {
  return await getSnxBasedStakingData(
    App,
    WETH_TOKEN,
    YAM_CLASSIC_TOKEN,
    wethStakingPool,
    poolData,
    YCRV_YAM2_UNI_POOL_ADDR
  )
}

const yCrvStakingPool: TokenData = {
  address: '0xE29b7D23e47c16B8EedF50a17A03649F5Db35433',
  ABI: Y_STAKING_POOL_ABI,
}
export const yCrvPool = async (App) =>
  await getSnxBasedStakingData(
    App,
    YCRV_TOKEN,
    YAM_CLASSIC_TOKEN,
    yCrvStakingPool,
    poolData,
    YCRV_YAM2_UNI_POOL_ADDR
  )
