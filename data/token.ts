import axios from 'axios'
import { ethers } from 'ethers'
import { ERC20_ABI } from './constants'

export type TokenProps = {
  address: string
  ticker?: string
  ABI?: any
  numBase?: number
  tokenId?: string
  scales?: boolean
}

export class Token extends ethers.Contract {
  public ticker: string
  public numBase: number
  public price: number
  public totalTokenSupply: number
  public scales: boolean
  public tokenId: string

  public constructor({
    address,
    ticker,
    ABI = ERC20_ABI,
    numBase = 1e18,
    tokenId,
    scales = false,
  }: TokenProps) {
    super(address, ABI, global.App.provider)
    this.ticker = ticker
    this.numBase = numBase
    this.tokenId = tokenId
    this.scales = scales
  }

  public async init() {
    await this.getPrice()
  }

  public async getPrice(refresh?: boolean) {
    if (!refresh && this.price) {
      return this.price
    }

    this.price = await this.getCoingeckoPrice()
    console.log('Token -> getPrice -> this.price', this.price)
    return this.price
  }

  public setPrice(price: number) {
    this.price = price
  }

  public async getTotalSupply() {
    this.totalTokenSupply = (await this.totalSupply()) / this.numBase
    return this.totalTokenSupply
  }

  public async getBalance(address: string) {
    const balance = (await this.balanceOf(address)) / this.numBase
    return balance
  }

  private async getCoingeckoPrice() {
    const prices = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${this.tokenId}&vs_currencies=usd`
    )
    return prices?.data[this.tokenId]?.usd
  }
}

export class SynthToken extends Token {
  parentToken: Token
  constructor(tokenData: TokenProps, parentToken: Token) {
    super(tokenData)
    this.parentToken = parentToken
  }

  public async init() {
    await this.getPrice()
  }

  public async getPrice(refresh?: boolean) {
    if (refresh || !this.price) {
      const parentTokenPrice = await this.parentToken.getPrice()
      const exchangeRate = await this.contract.exchangeRateStored()
      this.price = parentTokenPrice / exchangeRate
    }

    return this.price
  }
}

export class PoolToken extends Token {
  poolToken1: Token
  poolToken2: Token
  totalTokenOneInPool: number
  totalTokenTwoInPool: number

  constructor(
    tokenData: TokenProps,
    { poolToken1, poolToken2 }: { poolToken1: Token; poolToken2: Token }
  ) {
    super(tokenData)
    this.poolToken1 = poolToken1
    this.poolToken2 = poolToken2
  }

  public async init() {
    await this.getTotalSupply()
    await this.getTokenBalances()
    await this.getPrice()
  }

  public async getTokenBalances(refresh?: boolean) {
    if (refresh || !this.totalTokenOneInPool || !this.totalTokenTwoInPool) {
      this.totalTokenOneInPool =
        (await this.poolToken1.balanceOf(this.address)) /
        this.poolToken1.numBase

      this.totalTokenTwoInPool =
        (await this.poolToken2.balanceOf(this.address)) /
        this.poolToken2.numBase
    }

    return {
      totalTokenOneInPool: this.totalTokenOneInPool,
      totalTokenTwoInPool: this.totalTokenTwoInPool,
    }
  }

  public async getPrice(refresh?: boolean) {
    if (!refresh && this.price) {
      return this.price
    }
    await this.getTokenBalances()
    await this.getTotalSupply()
    console.log(
      '2',
      this.totalTokenTwoInPool,
      this.totalTokenOneInPool,
      this.totalTokenSupply
    )
    this.price =
      (this.totalTokenTwoInPool * this.poolToken2.price +
        this.totalTokenOneInPool * this.poolToken1.price) /
      this.totalTokenSupply

    return this.price
  }
}

export class StakingPool extends Token {
  public contract
  constructor(stakingPoolProps: StakingPoolProps) {
    super(stakingPoolProps)
  }
  public async getMyRewards() {
    const rewards = (await this.earned(global.App.YOUR_ADDRESS)) / 1e18
    return rewards
  }
}

type StakingPoolProps = {
  address: string
  ABI: any
}
