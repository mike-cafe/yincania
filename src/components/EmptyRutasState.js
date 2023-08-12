import {
  Box,
  HStack,
  Image,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  SimpleGrid,
  VStack,
  Spacer,
  Center,
} from "@chakra-ui/react";
import * as React from "react";
import { GoLocation } from "react-icons/go";
import { shields } from "../data";

export const EmptyRutasState = (props) => (
  <VStack spacing={1} mx="auto" minH="256px" maxW="256px">
    <Box zIndex={500} my="auto" position="relative" >
      <Center>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTeams.png?alt=media&token=2c05cdbc-6e06-4262-8154-9ccf25f71059"
          filter="grayscale(60%)"
          opacity="20%"
          zIndex={100}
          minH="256px" maxW="256px"
          position="absolute"
        />
      <Text
        color="brand.400"
        fontSize="3xl"
        fontWeight={"bold"}
        textAlign="center"
      >
        Vaya... <br></br>¡No hay Yincañas!{" "}
      </Text>
      </Center>

    </Box>

    <Text color="blackAlpha.700" fontSize="sm" textAlign="center">
      Es posible que no haya ninguna próximamente o que no te hayas apuntado a
      tiempo a una en curso.
      <br />
      Te mantendremos informado cuando haya más en camino
    </Text>
  </VStack>
);
