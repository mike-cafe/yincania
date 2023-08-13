import {
  Box,
  Image,
  Center,
  Heading,
  VStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

export const StatLight = (props) => {
  const { label, value, delta,creativity, ...boxProps } = props;
  return (
    <Box
      bg="bg.canvas"
      borderRadius="lg"
      textAlign="center"
      w="100%"
      shadow="base"
      {...boxProps}
    >
      <Box
        px="4"
        py="2"
      >
        <Stack>
          <Center mx="auto" boxSize={{ base: '32px', sm: '64px', lg: '64px' }}>
            <Image
              src={creativity}
              alt="Ruta de Tapas, La Épica Marítima"
            />
            </Center>
          <VStack justify="center" spacing="0.5">
            <Text fontSize="sm" color="muted">
              {label}
            </Text>
            <Heading size="xs">
              {value}
            </Heading>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};
