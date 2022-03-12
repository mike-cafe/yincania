import {
  HStack,
  Box,
  Container,
  Divider,
  VStack,
  Stack,
  Flex,
  Text,
  useColorModeValue as mode,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { TeamForm } from "../components/TeamForm";
import { ActionTrail } from "../components/ActionTrail";

export const CreateTeam = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      overflowY="auto"
      bg={mode("bg-canvas", "gray.700")}
    >
      {isDesktop ? <Sidebar /> : <Navbar />}
      <VStack spacing="8" px="4" py="24" flex="1">
        <Stack w="100%" spacing="5">
          <Text fontSize="lg" fontWeight="medium">
            Crear Equipo
          </Text>
          <Text color="muted" fontSize="sm">
            Podrás invitar a tus amigos a unirse al equipo para participar en
            esta Yincaña.
          </Text>
        </Stack>
        <TeamForm />
        <ActionTrail
          secondVariant="ghost"
          secondAction="Cancelar"
          firstAction="Confirmar Equipo"
        />
      </VStack>
    </Flex>
  );
};
