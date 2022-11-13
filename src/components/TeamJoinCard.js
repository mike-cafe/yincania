import {
  Box,
  Image,
  Button,
  HStack,
  Icon,
  Stack,
  Divider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { HiUser } from "react-icons/hi";

export const TeamJoinCard = (props) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      mx="auto"
      width="100%"
      rounded="lg"
      shadow="base"
    >
      <HStack py="6" px="4" spacing="4">
        <Image width="48px" src={props.team.shield} alt="Escudo Equipo" />
        <CardContent>
          <CardHeader title={props.team.name} />
          <Stack spacing="1" mt="2">
            <HStack fontSize="sm">
              <Icon as={HiUser} color="gray.500" />
              <Text>{`${props.team.memberCounter} jugadores`}</Text>
            </HStack>
          </Stack>
        </CardContent>
      </HStack>
      <Divider />
      <HStack px={{ base: "6", md: "6" }} py="4" justifyContent="space-between">
        <Button onClick={props.discard} variant="ghost" colorScheme="gray" size="sm">
          Descartar
        </Button>
        <Button onClick={props.join} variant="solid" colorScheme="brand" size="sm">
          Unirse
        </Button>
      </HStack>
    </Box>
  );
};
