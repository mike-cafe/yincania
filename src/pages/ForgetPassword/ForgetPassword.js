import React from "react";
import {
  Center,
  Box,
  Button,
  Heading,
  FormErrorMessage,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Logo } from "../../components/Logo";
import { Card } from "../../components/Card";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate,Link as RouteLink } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("No es un correo electrónico válido").required("Se requiere un correo electrónico"),
});

const ForgetPassword = (props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (payload) => {
    reset();
    try {
      await forgotPassword(payload.email);
      toast({
        position: "bottom-right",
        description: `Se ha enviado un correo a ${payload.email} con instrucciones para resetear la contraseña`,
        status: "success",
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
  };

  return (
    <>
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
          <Center>
            <Logo />
          </Center>

          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Recuperar Contraseña
          </Heading>
          <Text py={4} align="center" maxW="md" fontWeight="small">
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
          <Card>
            <Stack spacing="6">
              <FormControl
                isInvalid={!!errors?.email?.message}
                errortext={errors?.email?.message}
                isRequired
              >
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" {...register("email")} />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="yellow"
                size="lg"
                fontSize="md"
                onClick={handleSubmit(onSubmit)}
                isDisabled={!isValid}
              >
                Recuperar Contraseña
              </Button>
            </Stack>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
