import {
  Image,
  Flex,
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  VStack,
  Tag,
  Text,
  useColorModeValue as mode,
  useBreakpointValue,
  Wrap,
} from "@chakra-ui/react";
import * as React from "react";
import {
  HiCash,
  HiLocationMarker,
  HiShieldCheck,
  HiUser,
} from "react-icons/hi";
import { ActionTrail } from "../components/ActionTrail";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export const ViewTeam = () => {
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
      <VStack spacing="6" px="4" py="24" flex="1">
        <Stack
          align="center"
          spacing={{
            base: "3",
            md: "2",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Image
            height="96px"
            src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda"
          />

          <Text textAlign="center" as="h2" fontWeight="bold" fontSize="xl">
            Los Idiotas de Alcobendas
          </Text>
          <HStack
            fontSize={{
              base: "md",
              md: "lg",
            }}
          >
            <Text
              textAlign="center"
              as="span"
              color={mode("gray.500", "gray.300")}
              lineHeight="1"
            >
              Equipo para Yincaña 'Desafío Marítimo'
            </Text>
            <Icon as={HiShieldCheck} color="green.500" />
          </HStack>
        </Stack>
        <Box fontSize="sm" textAlign="center" noOfLines={2}>
          La única solución a un plan absurdo es un plan aún más absurdo.
        </Box>
        <HStack>
          <Icon as={HiUser} fontSize="xl" color="gray.400" />
          <Text
            fontSize="sm"
            fontWeight="medium"
            textAlign="center"
            color={mode("gray.600", "gray.300")}
          >
            <b>7</b> miembros
          </Text>
        </HStack>
        <Wrap
          justify="center"
          shouldWrapChildren
          color={mode("gray.600", "gray.300")}
        >
          {["JC", "Maroto", "Vitti", "Jacob", "Capi", "Mari", "Quasi"].map(
            (tag) => (
              <Tag key={tag} color="inherit" px="3">
                {tag}
              </Tag>
            )
          )}
        </Wrap>
        <ActionTrail
          secondVariant="ghost"
          secondAction="Abandonar Equipo"
          firstAction="Invitar al Equipo"
        />
      </VStack>
    </Flex>
  );
};
