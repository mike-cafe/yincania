import {
  Box,
  Circle,
  Center,
  Container,
  Image,
  Flex,
  HStack,
  VStack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { ActionTrail } from "../components/ActionTrail";

export const Tutorial = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <VStack
      as="section"
      height="100vh"
      overflowY="auto"
      bg={mode("bg-canvas", "gray.700")}
      mb="24"
    >
      <Flex bg="brand.100">
      <Center width="100%" pt="67px">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%2070pp.png?alt=media&token=95a79a73-2bb4-4f51-8d84-886092b7dd4f"
          alt="Ruta de Tapas, La Épica Marítima"
          maxWidth="256px"
        />
      </Center>
      </Flex>
      <ActionTrail
        secondVariant="outline"
        secondAction="Volver"
        firstAction="Siguiente"
      >
              <HStack
        justify="center"
        spacing="4"
        mt="8"
        color={mode("gray.300", "gray.600")}
      >
        <Circle size="3" bg="brand.500" />
        <Circle size="2" bg="currentColor" />
        <Circle size="2" bg="currentColor" />
      </HStack>
      </ActionTrail>
    </VStack>
  );
};
