import {
  Alert,
  AlertIcon,
  Button,
  Center,
  VStack,
  Checkbox,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Stack,
  Text,
  Spacer,
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "./Logo";
import QRCode from "react-qr-code";

export const ActionModal = (props) => {
  const { barInfo, tapaId, tapaURL, confirmTapa, onClose, ...rest } =
    props;
  const [received, setReceived] = React.useState(false);


  return (
    <Modal isOpen={true} onClose={onClose} size="full">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalBody>
          <ModalCloseButton />
          <VStack
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
              Para disfrutar de las tapas,{" "}
              <b>muestra este código QR al camarero</b> que lo escaneará con su
              móvil y os servirá el plato.
            </Text>
            <Center>
              <QRCode size={196} value={tapaURL} />
            </Center>
            <Alert status="info">
              <AlertIcon />
              Válido para todo el equipo y solo se puede canjear una vez.
            </Alert>
            <VStack visibility={props.isServed ? "visible" : "hidden"} spacing={4}>
              <Alert status="success" variant="solid" borderRadius="lg">
                <AlertIcon />
                El camarero ha registrado la entrega de las consumiciones.
              </Alert>
              <Spacer />
              <Checkbox
                isRequired={true}
                isChecked={received}
                onChange={() => setReceived(!received)}
              >
                Hemos recibido las consumuciones y tapas
              </Checkbox>
              <Button
                w="full"
                colorScheme="orange"
                variant="solid"
                borderRadius="full"
                size="lg"
                isDisabled={!received}
                onClick={confirmTapa}
              >
                CONTINUAR
              </Button>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
