import axios from 'axios'
import { ethers } from 'ethers'
import { ERC20_ABI } from './constants'
import { SynthType } from '../types'

export type TokenProps = {
  address: string
  ticker?: string
  ABI?: any
  numBase?: number
  tokenId?: string
  rebases?: boolean
}

export class Token extends ethers.Contract {
  public ticker: string
  public numBase: number
  public price: number
  public totalTokenSupply: number
  public rebases: boolean
  public tokenId: string

  public constructor({
    address,
    ticker,
    ABI = ERC20_ABI,
    numBase = 1e18,
    tokenId,
    rebases = false,
  }: TokenProps) {
    super(address, ABI, global?.App?.provider)
    this.ticker = ticker
    this.numBase = numBase
    this.tokenId = tokenId
    this.rebases = rebases
  }

  public async init() {
    await this.getPrice()
  }

  public async getPrice(refresh?: boolean) {
    if (!refresh && this.price) {
      return this.price
    }

    this.price = await this.getCoingeckoPrice()
    return this.price
  }

  public setPrice(price: number) {
    this.price = price
  }

  public async getTotalSupply() {
    this.totalTokenSupply = (await this.totalSupply()) / this.numBase
    return this.totalTokenSupply
  }

  public async getBalance(address: string, token?: Token) {
    if (address === global?.App?.YOUR_ADDRESS && global?.App?.isAnon) {
      return 0
    }
    let balance =
      (await this.balanceOf(address)) / (token?.numBase || this.numBase)

    if (token?.underlyingToken) {
      balance = token.getUnderlyingBalance(balance)
    }

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
  public underlyingToken: Token
  public synthType: SynthType
  constructor(
    tokenData: TokenProps,
    synthType: SynthType,
    underlyingToken: Token
  ) {
    super(tokenData)
    this.underlyingToken = underlyingToken
    this.synthType = synthType
  }

  public async init() {
    await this.getPrice()
  }

  public async getPrice(refresh?: boolean) {
    if (!refresh && this.price) {
      return this.price
    }
    const underlyingTokenPrice = await this.underlyingToken.getPrice()

    let exchangeRate
    switch (this.synthType) {
      case SynthType.CREAM:
        exchangeRate = (await this.exchangeRateStored()) / 1e28
        this.price = underlyingTokenPrice * exchangeRate
        return this.price

      case SynthType.YEARN:
        exchangeRate = (await this.getPricePerFullShare()) / 1e18
        this.price = underlyingTokenPrice * exchangeRate
        return this.price
    }
  }

  public async getUnderlyingToken() {
    if (!this?.underlyingToken) {
      return this
    } else if (!this?.underlyingToken?.underlyingToken) {
      return this.underlyingToken
    } else {
      return await this.underlyingToken.getUnderlyingToken()
    }
  }

  public async getUnderlyingPrice() {
    if (!this?.underlyingToken) {
      return this.price
    } else if (!this?.underlyingToken?.underlyingToken) {
      return this.underlyingToken.price
    } else {
      return await this.underlyingToken.getUnderlyingPrice()
    }
  }

  public async getUnderlyingBalance(balance: number) {
    let convertedBalance: number
    let exchangeRate

    // todo: abstract this
    switch (this.synthType) {
      case SynthType.CREAM:
        exchangeRate = (await this.exchangeRateStored()) / 1e28
        convertedBalance = balance * exchangeRate
        break
      case SynthType.YEARN:
        exchangeRate = (await this.getPricePerFullShare()) / 1e18
        convertedBalance = balance * exchangeRate
        break
    }

    if (this.underlyingToken?.synthType) {
      convertedBalance = await this.underlyingToken.getUnderlyingBalance(
        convertedBalance
      )
    }
    return convertedBalance
  }
}

export class PoolToken extends Token {
  poolToken1: Token
  poolToken2: Token
  totalTokenOneInPool: number
  totalTokenTwoInPool: number
  tokenOneRatio: number
  tokenTwoRatio: number

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

  public async getTokenRatios() {
    await this.getPrice()
    await this.getTokenBalances()

    this.tokenOneRatio =
      (this.totalTokenOneInPool * this.poolToken1.price) /
      (this.price * this.totalTokenSupply)

    this.tokenTwoRatio = 1 - this.tokenOneRatio

    return {
      tokenOneRatio: this.tokenOneRatio,
      tokenTwoRatio: this.tokenTwoRatio,
    }
  }

  public async getPrice(refresh?: boolean) {
    if (!refresh && this.price) {
      return this.price
    }
    await this.getTokenBalances()
    await this.getTotalSupply()

    this.price =
      (this.totalTokenTwoInPool * (await this.poolToken2.getPrice()) +
        this.totalTokenOneInPool * (await this.poolToken1.getPrice())) /
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
    if (global?.App?.isAnon) {
      return 0
    }
    const rewards = (await this.earned(global.App.YOUR_ADDRESS)) / 1e18
    return rewards
  }
}

type StakingPoolProps = {
  address: string
  ABI: any
  numBase?: number
}
