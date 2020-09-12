import { ethers } from 'ethers'
import {
  BALANCER_POOL_ABI,
  ERC20_ABI,
  USDC_TOKEN_ADDR,
  YUSDSEP20_TOKEN_ADDR,
  YUSD_USDC_BPT_TOKEN_ADDR,
} from '../../../data/constants'
import { priceLookupService } from '../../../services/price-lookup-service'
import { RiskLevel } from '../../../types'
import { toFixed } from '../../utils'

export async function yusdUsdc() {
  const YUSD_USDC_BALANCER_POOL = new ethers.Contract(
    YUSD_USDC_BPT_TOKEN_ADDR,
    BALANCER_POOL_ABI,
    global.App.provider
  )
  const YUSD_USDC_BPT_TOKEN = new ethers.Contract(
    YUSD_USDC_BPT_TOKEN_ADDR,
    ERC20_ABI,
    global.App.provider
  )

  const totalBPTAmount = (await YUSD_USDC_BALANCER_POOL.totalSupply()) / 1e18
  const yourBPTAmount =
    (await YUSD_USDC_BPT_TOKEN.balanceOf(global.App.YOUR_ADDRESS)) / 1e18

  const totalYUSDSEP20Amount =
    (await YUSD_USDC_BALANCER_POOL.getBalance(YUSDSEP20_TOKEN_ADDR)) / 1e18
  const totalUSDCAmount =
    (await YUSD_USDC_BALANCER_POOL.getBalance(USDC_TOKEN_ADDR)) / 1e6

  const YUSDSEP20PerBPT = totalYUSDSEP20Amount / totalBPTAmount
  const USDCPerBPT = totalUSDCAmount / totalBPTAmount

  // Find out reward rate
  const weekly_reward = 25000 // 25k UMA every week
  const UMARewardPerBPT = weekly_reward / (totalBPTAmount - 100)

  const {
    'usd-coin': USDCPrice,
    uma: UMAPrice,
  } = await priceLookupService.getPrices(['usd-coin', 'uma'])

  const YUSDSEP20Price =
    ((await YUSD_USDC_BALANCER_POOL.getSpotPrice(
      USDC_TOKEN_ADDR,
      YUSDSEP20_TOKEN_ADDR
    )) /
      1e6) *
    USDCPrice

  const BPTPrice = YUSDSEP20PerBPT * YUSDSEP20Price + USDCPerBPT * USDCPrice

  const UMAWeeklyROI = (UMARewardPerBPT * UMAPrice * 100) / BPTPrice

  return {
    provider: 'UMA Project',
    name: 'Balancer yUSD-USDC',
    poolRewards: ['UMA', 'BAL'],
    risk: {
      smartContract: RiskLevel.LOW,
      impermanentLoss: RiskLevel.LOW,
    },
    apr: UMAWeeklyROI * 52,
    prices: [
      { label: 'UMA', value: UMAPrice },
      { label: 'yUSD-OCT20', value: YUSDSEP20Price },
      { label: 'BPT', value: BPTPrice },
    ],
    staking: [
      {
        label: 'Pool Total',
        value: totalBPTAmount * BPTPrice,
      },
      {
        label: 'Your Total',
        value: yourBPTAmount * BPTPrice,
      },
    ],
    rewards: [
      {
        label: `${toFixed(UMARewardPerBPT * yourBPTAmount, 2)} UMA`,
        value: UMARewardPerBPT * yourBPTAmount * UMAPrice,
      },
    ],
    ROIs: [
      {
        label: 'Hourly',
        value: UMAWeeklyROI / 7 / 24,
      },
      {
        label: 'Daily',
        value: UMAWeeklyROI / 7,
      },
      {
        label: 'Weekly',
        value: UMAWeeklyROI,
      },
    ],
    links: [
      {
        title: 'Info',
        link:
          'https://medium.com/uma-project/liquidity-mining-on-uma-is-now-live-5f6cb0bd53ee',
      },
      {
        title: 'Instructions',
        link: 'https://docs.umaproject.org/tutorials/mint-farm-yusd',
      },
      {
        title: 'Balancer Pool',
        link:
          'https://pools.balancer.exchange/#/pool/0xD2F574637898526FCddfb3D487cc73c957Fa0268',
      },
    ],
  }
}
