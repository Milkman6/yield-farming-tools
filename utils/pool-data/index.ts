import * as basedPools from './pools/based'
import * as creamPools from './pools/cream'
import * as mstablePools from './pools/mstable'
import * as omenPools from './pools/omen-pnk'
import * as sushiPools from './pools/sushi'
import * as umaPools from './pools/uma'
import * as yearnVaults from './pools/yearn'
import * as yffiPools from './pools/yffi'
import * as yfiiPools from './pools/yfii'
import * as yfvPools from './pools/yfv'

export const getPools = {
  ...omenPools,
  ...sushiPools,
  ...basedPools,
  ...umaPools,
  ...mstablePools,
  ...yearnVaults,
  ...yfvPools,
  ...creamPools,
  ...yffiPools,
  ...yfiiPools,
}
