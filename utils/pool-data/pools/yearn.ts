import {
  ALINK_VAULT_ADDR,
  DAI_TOKEN_ADDR,
  TUSD_TOKEN_ADDR,
  USDC_TOKEN_ADDR,
  USDT_TOKEN_ADDR,
  YCRV_TOKEN_ADDR,
} from '../../../data/constants'
import { yearnVault } from '../../pool-templates/getVaultinfo'

export async function yVaultTusd(App) {
  if (!global.App.metamask) {
    throw new Error('Can only get vault data when connected through web3')
  }

  const params = {
    ticker: 'TUSD',
    coingeckoId: 'true-usd',
    tokenAddr: TUSD_TOKEN_ADDR,
  }

  const vault = await yearnVault.getVaultData(params, App)

  return {
    provider: 'Yearn',
    name: `${params.ticker} Vault`,
    poolRewards: [params.ticker],
    links: [
      {
        title: 'Info',
        link: 'https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613',
      },
      {
        title: 'Pool',
        link: 'https://yearn.finance/vaults',
      },
    ],
    ...vault,
  }
}

export async function yvaultAlink(App) {
  if (!global.App.metamask) {
    throw new Error('Can only get vault data when connected through web3')
  }
  const params = {
    ticker: 'aLINK',
    coingeckoId: 'chainlink',
    tokenAddr: ALINK_VAULT_ADDR,
  }
  const vault = await yearnVault.getDelegatedVaultData(params, App)

  return {
    provider: 'Yearn',
    name: `${params.ticker} Vault`,
    poolRewards: [params.ticker],
    links: [
      {
        title: 'Info',
        link: 'https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613',
      },
      {
        title: 'Pool',
        link: 'https://yearn.finance/vaults',
      },
    ],
    ...vault,
  }
}

export async function yVaultDai(App) {
  if (!global.App.metamask) {
    throw new Error('Can only get vault data when connected through web3')
  }

  const params = {
    ticker: 'DAI',
    coingeckoId: 'dai',
    tokenAddr: DAI_TOKEN_ADDR,
  }
  const vault = await yearnVault.getVaultData(params, App)

  return {
    provider: 'Yearn',
    name: `${params.ticker} Vault`,
    poolRewards: [params.ticker],
    links: [
      {
        title: 'Info',
        link: 'https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613',
      },
      {
        title: 'Pool',
        link: 'https://yearn.finance/vaults',
      },
    ],
    ...vault,
  }
}

export async function yVaultUsdc(App) {
  if (!global.App.metamask) {
    throw new Error('Can only get vault data when connected through web3')
  }

  const params = {
    ticker: 'USDC',
    coingeckoId: 'usd-coin',
    tokenAddr: USDC_TOKEN_ADDR,
  }
  const vault = await yearnVault.getVaultData(params, App)

  return {
    provider: 'Yearn',
    name: `${params.ticker} Vault`,
    poolRewards: [params.ticker],
    links: [
      {
        title: 'Info',
        link: 'https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613',
      },
      {
        title: 'Pool',
        link: 'https://yearn.finance/vaults',
      },
    ],
    ...vault,
  }
}

export async function yVaultUsdt(App) {
  if (!global.App.metamask) {
    throw new Error('Can only get vault data when connected through web3')
  }

  const params = {
    ticker: 'USDT',
    coingeckoId: 'tether',
    tokenAddr: USDT_TOKEN_ADDR,
  }
  const vault = await yearnVault.getVaultData(params, App)

  return {
    provider: 'Yearn',
    name: `${params.ticker} Vault`,
    poolRewards: [params.ticker],
    links: [
      {
        title: 'Info',
        link: 'https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613',
      },
      {
        title: 'Pool',
        link: 'https://yearn.finance/vaults',
      },
    ],
    ...vault,
  }
}

export async function yVaultYcrv(App) {
  if (!global.App.metamask) {
    throw new Error('Can only get vault data when connected through web3')
  }

  const params = {
    ticker: 'yCRV',
    coingeckoId: 'curve-fi-ydai-yusdc-yusdt-ytusd',
    tokenAddr: YCRV_TOKEN_ADDR,
  }

  const vault = await yearnVault.getVaultData(params, App)

  return {
    provider: 'Yearn',
    name: `${params.ticker} Vault`,
    poolRewards: [params.ticker],
    links: [
      {
        title: 'Info',
        link: 'https://medium.com/iearn/yearn-finance-v2-af2c6a6a3613',
      },
      {
        title: 'Pool',
        link: 'https://yearn.finance/vaults',
      },
    ],
    ...vault,
  }
}
