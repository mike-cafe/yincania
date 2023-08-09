import {
  Alert,
  AlertIcon,
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
  Spacer,
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "./Logo";
import { GoLocation } from "react-icons/go";
// import { CardContent } from "./CardContent";
// import { CardHeader } from "./CardHeader";

import QRCode from "react-qr-code";

export const ActionModal = (props) => {
  const { barInfo, tapaURL, onClose, ...rest } = props;

  return (
    <Modal isOpen={true} onClose={onClose} size="full">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
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
            <Text fontSize="lg" textAlign="justify">
              Para disfrutar de las tapas, <b>muestra este código QR al camarero</b> que
              lo escaneará con su móvil y os servirá el plato.
            </Text>
            <Center>
              <QRCode size={196} value={tapaURL} />
            </Center>

            <Alert status="info">
              <AlertIcon />
              Válido para todo el equipo y solo se puede canjear una vez.
            </Alert>
            <Card>
              <CardHeader title={barInfo?.name} />
              <CardBody fontSize="sm">
                <Icon as={GoLocation} color="gray.500" />
                <Text>{barInfo?.address}</Text>
                <Spacer />
              </CardBody>
            </Card>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
