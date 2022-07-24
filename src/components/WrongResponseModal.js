import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "./Logo";

export const WrongResponseModal = (props) => {
  const { onClose, penaltyWait } = props;

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
              <Logo height="5" />
              <Stack spacing="3" textAlign="center">
                <Text
                  color={useColorModeValue("brand.500", "brand.200")}
                  fontWeight="extrabold"
                  fontSize={{ base: "5xl", md: "6xl" }}
                  textTransform="uppercase"
                  transform="scale(1.2)"
                >
                  ¡No, mal!
                </Text>

                <Text fontSize="lg">
                  La respuesta es incorrecta.
                  <Box as="span" fontWeight="bold">
                    Puedes volver a intentarlo en {penaltyWait} segundos
                  </Box>
                </Text>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
