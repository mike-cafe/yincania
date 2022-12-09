import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  useToast,
  Box,
  Text,
  Flex,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link as RouteLink, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Logo } from "../../components/Logo";
import { Card } from "../../components/Card";
import { useAuth } from "../../contexts/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = yup.object().shape({
  password: yup
    .string("Se debe introducir una contraseña")
    .min(
      8,
      "La contraseña debe tener por lo menos 8 caracteres (mayúsculas y minúsculas), 1 número y un caracter especial"
    )
    .required("Se debe introducir una contraseña")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "La contraseña debe tener por lo menos 8 caracteres (mayúsculas y minúsculas), 1 número y un caracter especial"
    ),
  confirmPassword: yup
    .string("Se debe confirmar la contraseña")
    .required("Confirma tu contraseña")
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden."),
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordPage = (props) => {
  const { resetPassword, verifyPasswordResetCodeVerification } = useAuth();
  const query = useQuery();
  const [disableForm, setDisableForm] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShow = () => setShow(!show);
  const oobCode = query.get("oobCode");

  const handleShowConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    async function verifyToken() {
      try {
        await verifyPasswordResetCodeVerification(oobCode);
        toast({
          position: "bottom-right",
          title: "Token verificado",
          description: "Puedes cambiar tu contraseña",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        setDisableForm(false);
      } catch (error) {
        setShowErrorAlert(true);
        toast({
          position: "bottom-right",
          title: "Código no válido",
          description: "Parece que el link ha caducado.",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      }
    }
    if(oobCode){
    toast({
      position: "bottom-right",
      title: "Verificando código",
      isClosable: true,
      duration: 3000,
    });
    verifyToken();}
    else{
      navigate("/")
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (payload) => {
    try {
      await resetPassword(oobCode, payload.password);
      toast({
        position: "bottom-right",
        description:
          "La contraseña ha sido modificada, puedes hacer login normalmente.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        position: "bottom-right",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    reset();
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{
        base: "4",
        lg: "8",
      }}
    >
      <Box maxW="md" mx="auto">
        <Logo
          mx="auto"
          h="6"
          mb={{
            base: "10",
            md: "20",
          }}
        />
        <Heading textAlign="center" my={12}>
          Resetear Contraseña
        </Heading>

        <Text align="center" maxW="md" fontWeight="small">
          ¿Has recordado tu contraseña? Vuelve a la página de
          <Link
            ml={1}
            color="brand.600"
            fontWeight="bold"
            as={RouteLink}
            to="/"
          >
            iniciar sesión
          </Link>
        </Text>
        {!showErrorAlert || (
          <Alert status="error" my={2}>
            <AlertIcon />
            <AlertTitle>Link caducado</AlertTitle>
            <AlertDescription>
              <Link textDecor="underline" as={RouteLink} to="/forget-password">
                Por favor envía uno nuevo
              </Link>
            </AlertDescription>
          </Alert>
        )}
        <Card maxW="md" mx="auto" mt={4}>
          <Stack spacing="6">
            <FormControl
              isInvalid={!!errors?.password?.message}
              errortext={errors?.password?.message}
              isRequired
              isDisabled={disableForm}
            >
              <Flex justify="space-between">
                <FormLabel>Contraseña</FormLabel>
              </Flex>
              <InputGroup>
                <Input
                  {...register("password")}
                  type={show ? "text" : "password"}
                  name="password"
                  pr="4.5rem"
                />
                <InputRightAddon onClick={handleShow}>
                  {show ? <FiEyeOff color="gray" /> : <FiEye color="gray" />}
                </InputRightAddon>
              </InputGroup>
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.confirmPassword?.message}
              errortext={errors?.confirmPassword?.message}
              isRequired
              isDisabled={disableForm}
            >
              <Flex justify="space-between">
                <FormLabel>Confirma Contraseña</FormLabel>
              </Flex>
              <InputGroup>
                <Input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  pr="4.5rem"
                />

                <InputRightAddon onClick={handleShowConfirmPasswordClick}>
                  {showConfirmPassword ? (
                    <FiEyeOff color="gray" />
                  ) : (
                    <FiEye color="gray" />
                  )}
                </InputRightAddon>
              </InputGroup>
              <FormErrorMessage>
                {errors?.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              bg="yellow.500"
              textColor="white"
              size="lg"
              fontSize="md"
              onClick={handleSubmit(onSubmit)}
              disabled={
                !!errors.password || !!errors.confirmPassword || disableForm
              }
            >
              Resetear Contraseña
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
