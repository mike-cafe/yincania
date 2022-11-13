import * as React from "react";
import {
  PinInput,
  PinInputField,
  HStack,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const TapaDetail = (props) => {
  let params = useParams();
  const checkCode = (code) => {
    props.getTapaDetail({ id: params.id, code: code });
  };
  const onConfirm = () => {
    props.udpateTapa(params.id)
  };

  return (
    <>
      <HStack>
        <PinInput type="alphanumeric" mask onComplete={checkCode}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <VStack>
        <Text>Tapas para {props.tapa?.members} personas</Text>
        <Button
          variant="solid"
          colorScheme="brand"
          size="lg"
          onClick={onConfirm}
          isLoading={props.loading}
          isDisabled={props.tapa?.consumed}
        >
          Confirmar
        </Button>
        <Text size="xs">
          Si confirmas, estas tapas se darán por servidas en nuestros registros
          (y para el usuario)
        </Text>
      </VStack>
    </>
  );
};

export default TapaDetail;
