import { Box, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const Card = (props) => (
  <Box
    minH="3xs"
    borderRadius="lg"
    p={2}
    {...props}
  />
)