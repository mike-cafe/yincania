import {
  Box,
  Image,
  Button,
  HStack,
  VStack,
  Icon,
  Stack,
  Divider,
  Text,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import * as React from "react";
import { GoCalendar, GoGlobe, GoLocation } from "react-icons/go";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { BarAvatar } from "./BarAvatar";
import { HiUser } from "react-icons/hi";

export const TeamPlayCard = () => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    mx="auto"
    width="100%"
    rounded="lg"
    shadow="base"
  >
    <HStack py="6" px="4" spacing="4">
      <Image
        width="48px"
        src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda"
        alt="Escudo Equipo"
      />
      <CardContent>
        <Text color="muted">Tu Equipo</Text>
        <CardHeader title="Idiotas de Alcobendas" />
        <Stack spacing="1" mt="2">
          <HStack fontSize="sm">
            <Icon as={HiUser} color="gray.500" />
            <Text>7 jugadores</Text>
          </HStack>
        </Stack>
      </CardContent>
    </HStack>
    <Divider />
    <HStack px={{ base: "6", md: "6" }} py="4" justifyContent="space-between">
      <HStack spacing={3}>
        <Image
          width="32px"
          src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapClock.png?alt=media&token=64614b8b-3cb6-4d9d-b4b1-b6c48ad85ea4"
          alt="Tiempo Equipo"
        />
        <Stack spacing={0}>
          <Text mb={0} fontSize="xs" color="muted">
            Tiempo de partida
          </Text>
          <Text lineHeight={1} fontSize="xl" color="brand.600" fontWeight="bold">
            01:33
          </Text>
        </Stack>
      </HStack>
      <Button variant="link" colorScheme="gray" size="sm">
        Ver Equipo
      </Button>
    </HStack>
  </Box>
);
