import * as React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import {
  Spacer,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue as mode,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RadioCardGroup,RadioCard } from "../components/RadioCardGroup";
import { DeleteIcon } from "@chakra-ui/icons";

export const UserProfile = (props) => {
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
      <Container pt="92px">
        <Stack spacing="5">
          <Stack
            spacing="4"
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
          >
            <Box>
              <Text fontSize="lg" fontWeight="medium">
                Tu Perfil de Usario
              </Text>
              <Text color="muted" fontSize="sm">
                Tu personalidad en el bar.
              </Text>
            </Box>
            <Button variant="primary" alignSelf="start">
              Guardar
            </Button>
          </Stack>
          <Divider />
          <Stack spacing="5" divider={<StackDivider />}>
            <FormControl id="name">
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline">Name</FormLabel>
                <Input maxW={{ md: "3xl" }} defaultValue="Miguel Baquero" />
              </Stack>
            </FormControl>
            <FormControl id="username">
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline">Nombre de Ususario</FormLabel>
                <Input maxW={{ md: "3xl" }} defaultValue="maiki" />
              </Stack>
            </FormControl>

            <FormControl id="avatar">
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline">Avatar</FormLabel>
                <Stack
                  spacing={{ base: "3", md: "5" }}
                  direction={{ base: "column", sm: "row" }}
                  width="full"
                  maxW={{ md: "3xl" }}
                >
                  <RadioCardGroup defaultValue="one" spacing="3">
                    {[
                      {
                        decor:
                          "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CheeseAvatar.png?alt=media&token=6a2f1a00-4532-480e-9734-0953791fcba3",
                        name: "one",
                        subtitle:"Quesiko"
                      },
                      {
                        decor:
                        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/AvatarThree.png?alt=media&token=508a18c9-a6c9-4eeb-9160-d8bf6aa7f01a",
                        name: "two",
                        subtitle:"Totopo"
                      },
                      {
                        decor:
                          "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/AvatarOne.png?alt=media&token=7c7160cb-54bd-4fca-b16f-61cecab6c422",
                        name: "three",
                        subtitle:"Tomatú"
                      },
                      {
                        decor:
                          "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/AvatarTwo.png?alt=media&token=b578c9cf-00f0-4dad-a11e-15f7c17d9449",
                        name: "four",
                        subtitle:"Almóndigo"
                      },
                      
                    ].map((option) => (
                      <RadioCard
                        key={option.name}
                        value={option.name}
                        decor={option.decor}
                        subtitle={option.subtitle}
                      >
                        <Text
                          color="emphasized"
                          fontWeight="medium"
                          fontSize="sm"
                        >
                          Option {option.name}
                        </Text>
                        <Text color="muted" fontSize="sm">
                          Jelly biscuit muffin icing dessert powder macaroon.
                        </Text>
                      </RadioCard>
                    ))}
                  </RadioCardGroup>
                </Stack>
              </Stack>
            </FormControl>
            <FormControl id="email">
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline">Email</FormLabel>
                <Input
                  type="email"
                  maxW={{ md: "3xl" }}
                  defaultValue="maiki@tapap.es"
                  disabled={true}
                />
              </Stack>
            </FormControl>
            <Flex direction="row-reverse">
              <Button variant="primary">Guardar</Button>
              <Spacer></Spacer>
              <Button leftIcon={<DeleteIcon />} variant="ghost" colorScheme="gray" color="gray.400">Eliminar Cuenta</Button>
            </Flex>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
};
