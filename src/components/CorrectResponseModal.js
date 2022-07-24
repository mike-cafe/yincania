import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  StackDivider,
  Stack,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "./Logo";
import { clasification } from "../data";

export const CorrectResponseModal = (props) => {

  const [showResults, setShowResults] = React.useState(false);

  return (
    <Box height="100vh">
      <Modal isOpen={true} closeOnOverlayClick={false} size="2xl">
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx="4">
          <ModalBody>
            <Stack
              maxW="xs"
              mx="auto"
              py={{
                base: "12",
                md: "16",
              }}
              spacing={{
                base: "6",
                md: "10",
              }}
            >
              <Logo height="5" />
              {showResults ? (
                <Stack spacing="3" textAlign="center">
                  <Text fontSize="2xl" color="brand.500" fontWeight="bold">
                    Resultados
                  </Text>
                  <Stack divider={<StackDivider />} spacing="4">
                    {clasification.map((team) => (
                      <Stack key={team.id} fontSize="sm" px="4" spacing="4">
                        <Stack
                          direction="row"
                          justify="space-between"
                          spacing="4"
                        >
                          <HStack spacing="6">
                            <Image
                              width="32px"
                              src={team.shieldUrl}
                              alt="Escudo Equipo"
                            />

                            <Box>
                              <Text
                                textAlign="initial"
                                fontWeight="medium"
                                color="emphasized"
                              >
                                {team.name}
                              </Text>
                              <Text textAlign="initial" color="muted">
                                {team.slogan}
                              </Text>
                            </Box>
                          </HStack>
                          <Text color="muted">{team.time}</Text>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing="3" textAlign="center">
                  <Text
                    color="brand.500"
                    fontWeight="extrabold"
                    fontSize={{ base: "5xl", md: "6xl" }}
                    textTransform="uppercase"
                    transform="scale(1.2)"
                  >
                    ¡BIEN!
                  </Text>

                  <Text fontSize="lg">
                    Tú y tu equipo
                    <Box as="span" fontWeight="bold">
                      podéis pasar al siguiente bar.
                    </Box>
                  </Text>
                </Stack>
              )}

              <Stack direction="row" spacing="4">
                <Button
                  type="submit"
                  colorScheme="brand"
                  size="md"
                  width="100%"
                  onClick={props.onFinish}
                >
                  Inicio
                </Button>
                {showResults || <Button
                  colorScheme="brand"
                  variant="outline"
                  onClick={()=>setShowResults(true)}
                  size="md"
                  width="100%"
                >
                  Resultados
                </Button>}
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
