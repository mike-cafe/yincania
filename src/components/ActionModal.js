import {
  Box,
  Center,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Stack,
  HStack,
  Button,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "./Logo";
import { GoCalendar, GoGlobe, GoLocation } from "react-icons/go";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { Link as RouteLink } from "react-router-dom";

import QRCode from "react-qr-code";
import { BarAvatar } from "./BarAvatar";

export const ActionModal = (props) => {
  const { barNumber, onClose, ...rest } = props;

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
                <HStack
                  spacing="4"
                  p={2}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="lg"
                >
                  <BarAvatar
                    name="Destino"
                    src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6"
                  />
                  <CardContent>
                    <CardHeader title="La Cueva del Pirata" />
                    <HStack fontSize="sm">
                      <Icon as={GoLocation} color="gray.500" />
                      <Text>Calle Ida, 12</Text>
                      <Button
                        size="xs"
                        colorScheme="gray"
                        variant="link"
                        marginLeft="auto"
                      >
                        <Link as={RouteLink} isExternal to="https://google.com/">
                          Ir al bar
                        </Link>
                      </Button>
                    </HStack>
                  </CardContent>
                </HStack>
                <Text fontSize="lg">
                  Muestra este código al camarero para obtener tu tapa.
                </Text>
                <Center>
                  <QRCode
                    size="196"
                    value="https://www.npmjs.com/package/react-qr-code"
                  />
                </Center>
              </Stack>
              {/* <ModalForm /> */}
              {/* <Link
                fontSize="lg"
                textAlign="center"
                color={useColorModeValue("gray.600", "gray.400")}
                textDecoration="underline"
                onClick={onClose}
              >
                Cerrar
              </Link> */}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
