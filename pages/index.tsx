import { Box, Flex, Text } from '@chakra-ui/core'
import { Card } from '../components/Card'
import { Filters } from '../components/Filters'
import {
  FilterDrawer,
  FilterSidebarProvider,
} from '../components/FilterSidebar'
import { PoolProvider, PoolSection } from '../components/Pools'
import { ResourceCard } from '../components/ResourceCard'
import { TopNav } from '../components/TopNav'
import Wrapper from '../components/Wrapper'
import { initInfuraServer } from '../hooks/useEthers'
import { graphcms, linkSectionContents } from '../services/graph-cms-service'
import { pools } from '../utils/pool-data'

export default ({ informationSection, toolSection, poolData }) => (
  <FilterSidebarProvider>
    <PoolProvider>
      <Wrapper maxW="1200px">
        <TopNav />
        <Flex direction={{ xs: 'column', lg: 'row' }} pb="1rem">
          <Box width={{ xs: '100%', lg: '70%' }}>
            <PoolSection prefetchedPools={poolData} />
          </Box>
          <Box flexGrow={1}>
            <Box d={{ xs: 'none', lg: 'block' }}>
              <Text color="gray.600" fontWeight="bold" pt={6} pl="20px">
                Filters
              </Text>
              <Card>
                <Filters />
              </Card>
            </Box>
            <Text color="gray.600" fontWeight="bold" pt="1rem" pl="20px">
              Information
            </Text>
            <ResourceCard pt={0} title="" sectionContent={informationSection} />
            <Text color="gray.600" fontWeight="bold" pt="1rem" pl="20px">
              Tools
            </Text>
            <ResourceCard pt={0} title="" sectionContent={toolSection} />
          </Box>
        </Flex>
        <FilterDrawer />
      </Wrapper>
    </PoolProvider>
  </FilterSidebarProvider>
)

export const getStaticProps = async () => {
  const sectionData = await graphcms.request(
    `
    {
      informationSection: infoLinks(where: {section: info}) {
        ${linkSectionContents}
      }
      toolSection: infoLinks(where: {section: tools}) {
        ${linkSectionContents}
      }
    }
    `
  )

  const poolData = await prerenderPoolData()

  return {
    props: { ...sectionData, poolData: JSON.parse(JSON.stringify(poolData)) },
    unstable_revalidate: 5,
  }
}

const maxTime = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const prerenderPoolData = async () => {
  const ethApp = await initInfuraServer()
  if (ethApp) {
    console.log('pools', pools)
    const fetchedPools = []
    await Promise.all(
      Object.values(pools).map((getPoolData) =>
        Promise.race([getPoolData(ethApp), maxTime(10000)])
          .then((data) => {
            console.log(data)
            fetchedPools.push(data)
          })
          .catch((e) => {
            console.error(e)
          })
      )
    )
    return fetchedPools
  }
}
