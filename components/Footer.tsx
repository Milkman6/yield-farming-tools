import { Link, Stack, Text } from '@chakra-ui/core'
export const Footer = () => (
  <Stack spacing={2} py={4} alignItems="flex-start" pl="15px">
    <Link
      href="https://carterm126.typeform.com/to/lrvZbH3E"
      target="_blank"
      rel="noopener"
    >
      <Text textAlign="center" fontSize="sm">
        Request features
      </Text>
    </Link>

    <Link
      display="flex"
      alignItems="center"
      justifyContent="center"
      href="https://gitcoin.co/grants/1170/yield-farming-tools-2"
      target="_blank"
      rel="noopener"
      fontSize="sm"
      pb={1}
    >
      Support development
    </Link>
  </Stack>
)
