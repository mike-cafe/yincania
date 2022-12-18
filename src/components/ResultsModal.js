import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Stack,
  HStack,
  StackDivider,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";
import * as React from "react";
// import { clasification } from "../data";
import { Logo } from "./Logo";

function time2text(time) {
  const timeHours = Math.trunc(time / 60);
  const timeMinutes = Math.trunc(time - timeHours * 60);
  const timeSeconds = Math.trunc((time - timeMinutes - timeHours * 60) * 60);
  return `${timeHours} horas, ${timeMinutes} minutos y ${timeSeconds} segundos`;
}

export const ResultsModal = (props) => {
  const { clasification, barNumber, noClose, onClose, ...rest } = props;

  return (
    <Box height="100vh">
      <Modal isOpen={true} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx="4">
          <ModalBody>
            {noClose ? "" : <ModalCloseButton />}
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
                <Text fontSize="2xl" color="brand.500" fontWeight="bold">
                  Resultados
                </Text>
                <Stack divider={<StackDivider />} spacing="4">
                  {clasification
                    .filter((team) => team.hasFinished)
                    .map((team) => (
                      <Stack key={team.id} fontSize="sm" px="4" spacing="4">
                        <Stack
                          direction="row"
                          justify="space-between"
                          spacing="4"
                        >
                          <HStack spacing="6">
                            <Image
                              width="32px"
                              src={team.shield}
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
                          <Text color="muted">{time2text(team.time)}</Text>
                        </Stack>
                      </Stack>
                    ))}
                </Stack>
              </Stack>
              <Button
                size="lg"
                colorScheme="brand"
                onClick={onClose}
                variant="solid"
              >
                Inicio
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
