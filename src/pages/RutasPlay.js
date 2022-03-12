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
import { BarList } from "../components/BarList";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { TeamPlayCard } from "../components/TeamPlayCard";

export const RutasPlay = (props) => {
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
      {isDesktop ? <Sidebar /> : <Navbar />}
      <VStack spacing="8" px="4" py="8" pt="92px" flex="1">
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
        </VStack>{" "}
        <TeamPlayCard
          w="100%"
          label="Tapas"
          value="7"
          delta={{ isUpwardsTrend: true, value: "+10" }}
          creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTapas.png?alt=media&token=5eb3599d-0b03-4f8d-8d04-17a53a0ac5b3"
        />
        <BarList />
      </VStack>
    </Flex>
  );
};
