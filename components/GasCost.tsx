import { Box, Text, Flex, SimpleGrid } from '@chakra-ui/core'
import { Card } from './Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toFixed } from '../utils/utils'
import CountUp from 'react-countup'

type GasSpeeds = {
  rapid: number
  fast: number
  standard: number
  slow: number
}

export const GasCost = () => {
  const [gasCost, setGasCost] = useState<GasSpeeds>()

  const getGasCosts = async () => {
    try {
      const gasData = await axios.get('https://www.gasnow.org/api/v3/gas/data')
      console.log('getGasCosts -> gasData', gasData)

      setGasCost(gasData.data.data.gasPrices)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getGasCosts()
    const interval = setInterval(() => {
      getGasCosts()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return gasCost ? (
    <Box w="100%">
      <Text color="gray.600" fontWeight="bold" pt="1rem" pl={1}>
        Gas Price
      </Text>
      <Card boxShadow="sm" mx={0} width="100%" maxW={600}>
        <SimpleGrid columns={2} spacing={4}>
          <GasTile label="🔥 Rapid" cost={gasCost.rapid} />
          <GasTile label="🏎 Fast" cost={gasCost.fast} />
          <GasTile label="🚂 Standard" cost={gasCost.standard} />
          <GasTile label="🐢 Slow" cost={gasCost.slow} />
        </SimpleGrid>
      </Card>
    </Box>
  ) : null
}

export const GasTile = ({ label, cost }) => {
  const toGwei = (num) => num / 1000000000

  return (
    <Card
      m={0}
      width="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Text pb={1}>{label}</Text>
      <Text fontWeight="bold" fontSize="md">
        <CountUp
          end={toGwei(cost)}
          decimals={0}
          preserveValue={true}
          suffix=" gwei"
        />
      </Text>
      {/* <Text>Fast</Text> */}
    </Card>
  )
}
