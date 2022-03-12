import { Button, FormControl, FormLabel, Input, Stack, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const ModalForm = () => (
  <Stack
    as="form"
    spacing="3"
    onSubmit={(e) => {
      e.preventDefault() // manage form submission
    }}
  >
    <FormControl id="email">
      <FormLabel srOnly>Enter your email</FormLabel>
      <Input
        type="email"
        placeholder="Enter your email"
        size="lg"
        fontSize="md"
        focusBorderColor={useColorModeValue('brand.500', 'brand.200')}
      />
    </FormControl>
    <Button
      type="submit"
      fontWeight="bold"
      textTransform="uppercase"
      fontSize="md"
      colorScheme="brand"
      size="lg"
    >
      Get my 20% off
    </Button>
  </Stack>
)