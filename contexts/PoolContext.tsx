import { useCallback, useState, useMemo } from 'react'
import { TokenManager } from '../data/TokenManager'
import { useEthContext } from './ProviderContext'
import { LoadState } from '../types'
import { getPools } from '../utils/pool-data'
import { toNumber } from '../utils/utils'
import constate from 'constate'

const usePools = () => {
  const { ethApp } = useEthContext()
  const [pools, setPools] = useState([])
  const [filteredPools, setFilteredPools] = useState([])
  const [expandAll, setExpandAll] = useState(false)
  const [expandAllStateChanged, setExpandAllStateChanged] = useState(0)
  const [loadState, setLoadState] = useState(LoadState.LOADED)
  const [totalWeeklyRoi, setTotalWeeklyRoi] = useState(0)
  const [poolPositions, setPoolPositions] = useState([])
  const [yourPoolGroupings, setYourPoolGroupings] = useState({})

  const expandOrCollapseAll = (value: boolean) => {
    setExpandAllStateChanged(expandAllStateChanged + 1)
    setExpandAll(value)
  }

  const initTokens = async () => {
    const tokenManager = new TokenManager()
    await tokenManager.getAllPrices()
    return tokenManager.tokens
  }

  const getPoolInfo = async () => {
    if (ethApp && ethApp.YOUR_ADDRESS && typeof window !== 'undefined') {
      setLoadState(LoadState.LOADING)
      console.log(ethApp)
      const tokens = await initTokens()
      console.log('getPoolInfo -> tokens', tokens)

      const fetchedPools = []
      const yourPoolPositions = []
      let weeklyRoi = 0

      await Promise.all(
        Object.values(getPools).map(
          (getPoolData) =>
            new Promise((resolve) => {
              ;(getPoolData(tokens) as any)
                .then((data) => {
                  fetchedPools.push(data)
                  if (data?.staking[1]?.value) {
                    if (data?.ROIs[2]?.value) {
                      const roi =
                        (data.ROIs[2].value * data.staking[1].value) / 100
                      weeklyRoi += roi
                    }
                    if (data?.staking[1]?.value > 10) {
                      yourPoolPositions.push(data)
                    }
                  }
                  resolve()
                })
                .catch((e) => {
                  console.error(e)
                  resolve()
                })
            })
        )
      )

      const yourPools = yourPoolPositions.reduce((acc, item) => {
        const key = item.provider
        acc[key] = acc[key] || []
        acc[key].push(item)
        return acc
      }, {})

      setTotalWeeklyRoi(weeklyRoi)
      setPoolPositions(yourPoolPositions)
      setYourPoolGroupings(yourPools)
      setPools(fetchedPools)
      setLoadState(LoadState.LOADED)
    }
  }

  useMemo(() => getPoolInfo(), [ethApp])

  return {
    pools,
    setPools,
    filteredPools,
    setFilteredPools,
    expandAll,
    expandAllStateChanged,
    expandOrCollapseAll,
    loadState,
    setLoadState,
    totalWeeklyRoi,
    setTotalWeeklyRoi,
    poolPositions,
    setPoolPositions,
    getPoolInfo,
    yourPoolGroupings,
  }
}
export const [PoolProvider, usePoolContext] = constate(usePools)
