import * as React from "react";
import {
  Divider,
  Heading,
  Flex,
  PinInput,
  PinInputField,
  HStack,
  VStack,
  Text,
  Button,
  Box,
  useBreakpointValue,
  useToast,
  Spacer,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  ButtonGroup,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { Logo } from "../../components/Logo";

const TapaDetail = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [userCode, setUserCode] = React.useState(null);
  const toast = useToast();
  const [received, setReceived] = React.useState(false);

  let params = useParams();

  const checkCode = (code) => {
    props.getTapaDetail({ id: params.id, code: userCode });
  };

  const onConfirm = () => {
    props.updateTapa(params.id);
  };

  React.useEffect(() => {
    if (props.userFeedback) {
      toast(props.userFeedback);
      props.resetToast();
    }
  }, [props.userFeedback]);

  return (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      overflowY="auto"
    >
      <Box
        width="full"
        py="4"
        px={{ base: "4", md: "8" }}
        bg="bg.canvas"
        borderBottom="1px"
        borderBottomColor="blackAlpha.200"
        position="fixed"
        zIndex="999"
      >
        <Flex justify="space-between">
          <Logo />
        </Flex>
      </Box>
      <VStack
        py="4"
        px={{ base: "4", md: "8" }}
        mt="128px"
        alignItems={"flex-start"}
      >
        {" "}
        <Text fontSize="2xl" fontWeight="bold" textAlign="left">
          Instrucciones
        </Text>
        <Text>
          Introduce el código que te hemos proporcionado antes de la Yincaña.
          Este código te permitirá validar las consumiciones, por favor no lo
          compartas con los usuarios ni otras personas.
        </Text>
        <Spacer />
        <Text color="muted">Escribe aquí tú código</Text>
        <HStack justifyContent={"center"}>
          <PinInput
            type="alphanumeric"
            mask
            onChange={(value) => {
              if (value.length < 4) {
                setUserCode(null);
              } else {
                setUserCode(value);
              }
            }}
            isInvalid={props.error}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
          <Spacer />
          <Button
            colorScheme="blue"
            size="md"
            onClick={checkCode}
            isLoading={props.loading}
            isDisabled={userCode == null}
          >
            Ver Consumición
          </Button>
        </HStack>
        {props.error ? (
          <Alert status="error" mt="8">
            <AlertIcon />
            El código es incorrecto o el QR no es válido.
          </Alert>
        ) : (
          ""
        )}
        {!props.tapa?.served ? (
          <Card
            boxShadow="dark-lg"
            maxW="sm"
            visibility={props.tapa ? "visible" : "hidden"}
            mt="32px"
          >
            <CardHeader>
              <Heading size="xs">Servir Consumición</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Este equipo todavía no ha canjeado su consumición. Les
                corresponden un máximo de{" "}
                <b>{props.tapa?.members} tapas y consumiciones</b>.
                <br />
                <br />
                Por favor confirma el número de consumiciones con ellos y
                procede a servirles.
              </Text>
            </CardBody>
            <Divider borderColor="gray" opacity="30%" />
            <CardFooter flexDirection="column">
              <Checkbox
                isRequired={true}
                isChecked={received}
                onChange={() => setReceived(!received)}
                mb="4"
              >
                He servido a los clientes las consumuciones y tapas que les
                correspondían.
              </Checkbox>
              <Button
                variant="solid"
                colorScheme="brand"
                size="lg"
                onClick={onConfirm}
                isLoading={props.loading}
                isDisabled={!received}
              >
                Confirmar
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Alert status="success" mt="8" variant="solid" borderRadius="md">
            <AlertIcon />
            Este equipo ya ha sido servido
          </Alert>
        )}
      </VStack>
    </Flex>
  );
};

export default TapaDetail;
