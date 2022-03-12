import { Avatar, Box, HStack, Text } from '@chakra-ui/react'
import * as React from 'react'

export const UserProfile = (props) => {
  const { name, image, email } = props
  return (
    <HStack spacing="3" ps="2">
      <Avatar showBorder={true} name={name} src={image} boxSize="10" bg="white"/>
      <Box>
        <Text fontWeight="medium" fontSize="sm">
          {name}
        </Text>
        <Text color="muted" fontSize="sm">
          {email}
        </Text>
      </Box>
    </HStack>
  )
}