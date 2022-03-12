import {
  HStack,
  Image,
  VStack,
  Center,
  Flex,
  Text,
  useColorModeValue as mode,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { StatLight } from "../components/StatLight";
import { StatPro } from "../components/StatPro";
import { ActionTrail } from "../components/ActionTrail";

export const RutasDetail = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      overflowY="auto"
      bg={mode("bg-canvas", "gray.700")}
      mb="24"
    >
      <Center width="100%" pt="67px">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%2070pp.png?alt=media&token=95a79a73-2bb4-4f51-8d84-886092b7dd4f"
          alt="Ruta de Tapas, La Épica Marítima"
        />
      </Center>
      {isDesktop ? <Sidebar /> : <Navbar />}
      <VStack spacing="8" px="4" py="8" flex="1">
        <VStack color="brand.600" w="100%" spacing={2} align="left">
          <Text fontSize="xl" lineHeight="1" fontWeight="bold">
            Cabo de Palos, Murcia
          </Text>
          <Text
            fontSize="4xl"
            lineHeight="1"
            letterSpacing="tight"
            fontWeight="extrabold"
          >
            La Épica Marítima
          </Text>
          <Text
            fontSize="lg"
            marginStart="1"
            alignSelf="flex-start"
            fontWeight="light"
          >
            24 de junio de 2022
          </Text>
        </VStack>{" "}
        <HStack w="100%" spacing="4">
          <StatLight
            label="Equipos"
            value="150"
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTeams.png?alt=media&token=2c05cdbc-6e06-4262-8154-9ccf25f71059"
          />
          <StatLight
            label="Bares"
            value="7"
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapBares.png?alt=media&token=051efd21-07ac-4769-b6e8-370e0f942c4c"
          />
          <StatLight
            label="Tapas"
            value="7"
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTapas.png?alt=media&token=5eb3599d-0b03-4f8d-8d04-17a53a0ac5b3"
          />
        </HStack>
        <StatPro
          w="100%"
          label="Tapas"
          value="7"
          delta={{ isUpwardsTrend: true, value: "+10" }}
          creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTapas.png?alt=media&token=5eb3599d-0b03-4f8d-8d04-17a53a0ac5b3"
        />
        <ActionTrail secondVariant="outline" secondAction="Unirse a Equipo" firstAction="Crear Equipo" />
      </VStack>
    </Flex>
  );
};
