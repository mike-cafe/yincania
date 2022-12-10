import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Stack,
  Text,
  useColorModeValue,
  Center
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "./Logo";

const ResponseModal = (props) => {
  const { isCorrect, onFinish, onClose, penaltyWait, ...rest } = props;

  return (
    <Box height="100vh">
      <Modal isOpen={true} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx="4">
          <ModalBody>
            <ModalCloseButton />
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
              <Center>
                <Logo height="5" />
              </Center>
              <Stack spacing="3" textAlign="center">
                <Text
                  color={useColorModeValue("brand.500", "brand.200")}
                  fontWeight="extrabold"
                  fontSize={{ base: "5xl", md: "6xl" }}
                  textTransform="uppercase"
                  transform="scale(1.2)"
                >
                  {isCorrect ? "¡BIEN!" : "No, mal."}
                </Text>

                <Text fontSize="lg">
                  {isCorrect ? "Tú y tu equipo" : "La respuesta es incorrecta."}{" "}
                  <Box as="span" fontWeight="bold">
                    {isCorrect
                      ? "podéis pasar al siguiente bar."
                      : `Puedes volver a intentarlo en ${penaltyWait} segundos`}
                  </Box>
                </Text>
              </Stack>
              {isCorrect ? (
                <Stack direction="row" spacing="4">
                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="md"
                    width="100%"
                    onClick={onFinish}
                  >
                    Inicio
                  </Button>
                  <Button
                    colorScheme="brand"
                    variant="outline"
                    onClick={onClose}
                    size="md"
                    width="100%"
                  >
                    Resultados
                  </Button>
                </Stack>
              ) : (
                ""
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
