import * as omenPools from './pools/omen-pnk'
import * as sushiPools from './pools/sushi'
import * as umaPools from './pools/uma'
import * as yearnVaults from './pools/yearn'
import * as yfvPools from './pools/yfv'
import * as creamPools from './pools/cream'
import * as yffiPools from './pools/yffi'
import * as yfiiPools from './pools/yfii'
import * as mstablePools from './pools/mstable'
import * as basedPools from './pools/based'

export const getPools = {
  // ...sushiPools,
  // ...basedPools,
  // ...umaPools,
  // ...mstablePools,
  // ...omenPools,
  // ...yearnVaults,
  // ...yfvPools,
  ...creamPools,
  // ...yffiPools,
  // ...yfiiPools,
}
