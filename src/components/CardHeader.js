import { Flex, Text } from '@chakra-ui/react'
import * as React from 'react'

export const CardHeader = (props) => {
  const { title, action, ...flexProps } = props
  return (
    <Flex justifyContent="space-between" alignItems="center" {...flexProps}>
      <Text fontSize="xl" fontWeight="bold" letterSpacing="tight" marginEnd="6">
        {title}
      </Text>
    </Flex>
  )
}