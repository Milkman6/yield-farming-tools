import { Box, Flex, SimpleGrid } from '@chakra-ui/core'
import { ImpermanentLossCalculator } from '../components/ImpermanentLossCalc'
import { GasCost } from '../components/GasCost'
import { SectionHeading } from '../components/SectionHeading'

export default () => (
  <Box>
    <SectionHeading title="Tools" />
    <Flex alignItems="center" width="100%" paddingX={10}>
      <SimpleGrid columns={{ xs: 1, lg: 2 }} spacing={4} pb="1rem" w="100%">
        <ImpermanentLossCalculator />
        <GasCost />
      </SimpleGrid>
    </Flex>
  </Box>
)
