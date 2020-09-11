import { Token } from './token'
import { YAM_TOKEN_ABI } from './constants'
import { asyncForEach, sleep } from '../utils/utils'
import axios from 'axios'

export class TokenManager {
  tokens: Tokens = {} as Tokens

  public constructor() {
    const App = global.App
    console.log('TokenManager -> constructor -> App', App)
    this.tokens.cream = new Token(
      {
        address: '0x2ba592F78dB6436527729929AAf6c908497cB200',
        ticker: 'CREAM',
        tokenId: 'cream-2',
      },
      App
    )

    this.tokens.ycrv = new Token(
      {
        address: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
        ticker: 'yCRV',
        tokenId: 'curve-fi-ydai-yusdc-yusdt-ytusd',
      },
      App
    )

    this.tokens.yam = new Token(
      {
        address: '0x0e2298E3B3390e3b945a5456fBf59eCc3f55DA16',
        ABI: YAM_TOKEN_ABI,
        ticker: 'YAM',
        tokenId: 'yam',
      },
      App
    )

    this.tokens.yfi = new Token(
      {
        address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
        ticker: 'YFI',
        tokenId: 'yearn-finance',
      },
      App
    )

    this.tokens.comp = new Token(
      {
        address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        ticker: 'COMP',
        tokenId: 'compound-governance-token',
      },
      App
    )

    this.tokens.lend = new Token(
      {
        address: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
        ticker: 'LEND',
        tokenId: 'ethlend',
      },
      App
    )

    this.tokens.link = new Token(
      {
        address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        ticker: 'LINK',
        tokenId: 'chainlink',
      },
      App
    )

    this.tokens.mkr = new Token(
      {
        address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
        ticker: 'MKR',
        tokenId: 'maker',
      },
      App
    )

    this.tokens.snx = new Token(
      {
        address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
        ticker: 'SNX',
        tokenId: 'havven',
      },
      App
    )

    this.tokens.weth = new Token(
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        ticker: 'WETH',
        tokenId: 'ethereum',
      },
      App
    )

    this.tokens.shrimp = new Token(
      {
        address: '0x38c4102D11893351cED7eF187fCF43D33eb1aBE6',
        ABI: YAM_TOKEN_ABI,
        ticker: 'SHRIMP',
        tokenId: 'shrimp-finance',
      },
      App
    )

    this.tokens.pasta = new Token(
      {
        address: '0x08A2E41FB99A7599725190B9C970Ad3893fa33CF',
        ticker: 'PASTA',
        tokenId: 'spaghetti',
      },
      App
    )

    this.tokens.wbtc = new Token(
      {
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        ticker: 'WBTC',
        tokenId: 'bitcoin',
      },
      App
    )

    this.tokens.based = new Token(
      {
        address: '0x68a118ef45063051eac49c7e647ce5ace48a68a5',
        ticker: 'BASED',
        tokenId: 'based-money',
      },
      App
    )

    this.tokens.sushi = new Token(
      {
        address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
        ticker: 'SUSHI',
        tokenId: 'sushi',
      },
      App
    )

    this.tokens.uma = new Token(
      {
        address: '0x04fa0d235c4abf4bcf4787af4cf447de572ef828',
        ticker: 'UMA',
        tokenId: 'uma',
      },
      App
    )

    this.tokens.band = new Token(
      {
        address: '0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55',
        ticker: 'BAND',
        tokenId: 'band-protocol',
      },
      App
    )

    this.tokens.ampl = new Token(
      {
        address: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
        ticker: 'AMPL',
        tokenId: 'ampleforth',
        numBase: 1e9,
      },
      App
    )

    this.tokens.tether = new Token(
      {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        ticker: 'USDT',
        tokenId: 'tether',
        numBase: 1e6,
      },
      App
    )

    this.tokens.dai = new Token(
      {
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        ticker: 'DAI',
        tokenId: 'dai',
      },
      App
    )

    this.tokens.usdc = new Token(
      {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        ticker: 'USDC',
        tokenId: 'usd-coin',
        numBase: 1e6,
      },
      App
    )

    this.tokens.susd = new Token(
      {
        address: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
        ticker: 'sUSD',
        tokenId: 'nusd',
      },
      App
    )

    this.tokens.yfv = new Token(
      {
        address: '0x45f24BaEef268BB6d63AEe5129015d69702BCDfa',
        ticker: 'YFV',
        tokenId: 'yfv-finance',
      },
      App
    )

    this.tokens.bal = new Token(
      {
        address: '0xba100000625a3754423978a60c9317c58a424e3D',
        ticker: 'BAL',
        tokenId: 'balancer',
      },
      App
    )

    this.tokens.bat = new Token(
      {
        address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
        ticker: 'BAT',
        tokenId: 'basic-attention-token',
      },
      App
    )

    this.tokens.ren = new Token(
      {
        address: '0x408e41876cccdc0f92210600ef50372656052a38',
        ticker: 'REN',
        tokenId: 'republic-protocol',
      },
      App
    )

    this.tokens.knc = new Token(
      {
        address: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
        ticker: 'KNC',
        tokenId: 'kyber-network',
      },
      App
    )

    this.tokens.srm = new Token(
      {
        address: '0x476c5E26a75bd202a9683ffD34359C0CC15be0fF',
        ticker: 'SRM',
        tokenId: 'serum',
        numBase: 1e6,
      },
      App
    )

    this.tokens.yamv2 = new Token(
      {
        address: '0xAba8cAc6866B83Ae4eec97DD07ED254282f6aD8A',
        ABI: YAM_TOKEN_ABI,
        ticker: 'YAMv2',
        tokenId: 'yam-v2',
        numBase: 1e24,
      },
      App
    )

    this.tokens.crv = new Token(
      {
        address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
        ticker: 'CRV',
        tokenId: 'curve-dao-token',
      },
      App
    )
  }

  public async getAllPrices() {
    const tokenIds = Object.values(this.tokens).map(
      (token: Token) => token.tokenId
    )
    const ids = tokenIds.join('%2c')
    const prices = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    )
    Object.keys(this.tokens).forEach((id: string) => {
      const selectedToken: Token = this.tokens[id]
      selectedToken.setPrice(prices?.data[selectedToken.tokenId]?.usd)
      console.log(selectedToken.price, selectedToken.ticker)
    })
  }
}

export type Tokens = {
  cream: Token
  ycrv: Token
  yam: Token
  yfi: Token
  comp: Token
  lend: Token
  link: Token
  mkr: Token
  snx: Token
  weth: Token
  shrimp: Token
  pasta: Token
  wbtc: Token
  based: Token
  sushi: Token
  uma: Token
  band: Token
  ampl: Token
  tether: Token
  dai: Token
  usdc: Token
  susd: Token
  yfv: Token
  bal: Token
  bat: Token
  ren: Token
  knc: Token
  srm: Token
  yamv2: Token
  crv: Token
}
