import { Token } from '../data/token'
import { asyncForEach } from './utils'

export const getTokenPriceList = async (tokenList: Token[]) => {
  const tokenPriceList = []
  const tokenTickers = []

  asyncForEach(tokenList, async (token: Token) => {
    if (!token?.underlyingToken) {
      if (!tokenTickers.includes(token.ticker)) {
        tokenPriceList.push({ label: token.ticker, value: token.price })
        tokenTickers.push(token.ticker)
      }
    } else {
      const underlyingToken = await token.getUnderlyingToken()
      if (!tokenTickers.includes(underlyingToken.ticker)) {
        tokenPriceList.push({
          label: underlyingToken.ticker,
          value: underlyingToken.price,
        })
        tokenTickers.push(underlyingToken.ticker)
      }
    }
  })

  return tokenPriceList
}

export const getRoiList = (weeklyRoi: number) => {
  const roiList = [
    {
      label: 'Hourly',
      value: weeklyRoi / 7 / 24,
    },
    {
      label: 'Daily',
      value: weeklyRoi / 7,
    },
    {
      label: 'Weekly',
      value: weeklyRoi,
    },
  ]
  return roiList
}
