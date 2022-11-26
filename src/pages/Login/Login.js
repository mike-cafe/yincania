import React, { useState, useEffect } from "react";
import { functions } from "../../utils/init-firebase";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  FormErrorMessage,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  useColorModeValue,
  Flex,
  Divider,
  useToast,
  InputRightAddon,
  Center,
  Link,
} from "@chakra-ui/react";
import { useLocation, useNavigate, Link as RouteLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "./../../components/Card";
import Banner from "./../../components/authenticationModules/Banner";
import { Toast } from "./../../store/Toast";
import { useAuth } from "./../../contexts/AuthContext";
import { Logo } from "../../components/Logo";
import {
  getAuth,
} from "@firebase/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = yup.object().shape({
  email: yup.string().email().required("Se debe introducir un email"),
  password: yup
    .string()
    .min(
      8,
      "La contraseña debe tener por lo menos 8 caracteres (mayúsculas y minúsculas), 1 número y un caracter especial"
    )
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "La contraseña debe tener por lo menos 8 caracteres (mayúsculas y minúsculas), 1 número y un caracter especial"
    ),
});

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = (props) => {
  const location = useLocation();
  const query = useQuery();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    signInWithGoogle,
    login,
    applyActionCodeVerification,
    sendUserEmailVerification,
    currentUser,
    additionalInfo,
    logout,
    manageRedirectResult,
    createUserProfile
  } = useAuth();

  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [email, setEmail] = useState("");
  const [bannerError, setBannerError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [disabledForm, setDisabledForm] = useState(false);
  const auth = getAuth();
  const nextUrl = query.get("next") ||  "/app/routes";
  
  useEffect(() => {
    if (query.get("mode") === "verifyEmail") {
      toast({
        position: "bottom-center",
        title: Toast.EmailVerification.info.title,
        duration: Toast.EmailVerification.info.duration,
        isClosable: true,
      });
      verifyUserEmail();
    }
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleClick = () => setShow(!show);

  const handleCloseIcon = () => {
    setShowBanner(false);
    setEmail("");
    logout();
  };

  const handleResendEmailClick = async () => {
    try {
      await sendUserEmailVerification().finally(() => {
        setEmailSent(true);
        logout();
      });
      setTimeout(() => {
        setShowBanner(false);
      }, 1000);
    } catch (error) {
      toast({
        position: "bottom-center",
        title: "Reenviar Correo",
        description: error.message,
        status: "error",
        duration: Toast.EmailVerification.error.duration,
        isClosable: true,
      });
      setBannerError(true);
    }
  };

  const handleGoogleClick = () => {
    setDisabledForm(true)
    signInWithGoogle(redirectTo).finally(
      ()=>setDisabledForm(false)
    )
  };
  const redirectTo = (res) => props.userData({ user: res.user,next:nextUrl, navigate });

  const onSubmit = async (payload) => {
    setDisabledForm(true);
    login(payload.email, payload.password)
      .then((res) => {
        if (res.user?.emailVerified) {
          props.userData({ user: res.user,next:nextUrl, navigate });
        } else {
          setEmail(res?.user?.email);
          setShowBanner(true);
        }
        reset();
        setDisabledForm(false);
      })
      .catch((error) => {
        setDisabledForm(false);
        props.signInFailure(error.message);
        toast({
          position: "bottom-center",
          description: "Usuario y/o contraseña incorrectos.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const verifyUserEmail = async () => {
    const actionCode = query.get("oobCode");
    try {
      await applyActionCodeVerification(actionCode);
      toast({
        position: "bottom-center",
        title: Toast.EmailVerification.success.title,
        description: Toast.EmailVerification.success.description,
        status: "success",
        duration: Toast.EmailVerification.success.duration,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: "bottom-center",
        title: Toast.EmailVerification.error.title,
        description: Toast.EmailVerification.error.description,
        status: "error",
        duration: Toast.EmailVerification.error.duration,
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

          <Heading textAlign="center" size="lg" fontWeight="extrabold">
            Iniciar Sesión
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="small">
            <Text as="span">¿No tienes una cuenta todavía?</Text>
            <Link
              ml={1}
              color="brand.600"
              fontWeight="bold"
              as={RouteLink}
              to="/signup"
            >
              Regístrate
            </Link>
          </Text>
          <Card>
            <Stack spacing="6">
              <FormControl
                isInvalid={!!errors?.email?.message}
                errortext={errors?.email?.message}
                isRequired
                isDisabled={disabledForm}
              >
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" {...register("email")} />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors?.password?.message}
                errortext={errors?.password?.message}
                isRequired
                isDisabled={disabledForm}
              >
                <Flex my={2} justify="space-between" align="center">
                  <FormLabel m={0}>Contraseña</FormLabel>
                  <Button
                    variant="link"
                    colorScheme="yellow"
                    onClick={() => navigate("/forget-password")}
                    fontWeight="normal"
                    fontSize="xs"
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </Flex>
                <InputGroup size="md">
                  <Input
                    {...register("password")}
                    type={show ? "text" : "password"}
                    name="password"
                    pr="4.5rem"
                  />
                  <InputRightAddon onClick={handleClick}>
                    {show ? <FiEyeOff color="gray" /> : <FiEye color="gray" />}
                  </InputRightAddon>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="yellow"
                size="lg"
                fontSize="md"
                onClick={handleSubmit(onSubmit)}
                disabled={!!errors.email || !!errors.password || disabledForm}
              >
                Iniciar Sesión
              </Button>
            </Stack>
            <Flex align="center" color="gray.300" mt="6">
              <Box flex="1">
                <Divider borderColor="currentcolor" />
              </Box>
              <Text
                as="span"
                px="3"
                fontStyle="italic"
                color={useColorModeValue("gray.500", "gray.300")}
                fontWeight="medium"
              >
                o continua con
              </Text>
              <Box flex="1">
                <Divider borderColor="currentcolor" />
              </Box>
            </Flex>
            <SimpleGrid mt="12" columns={1} spacing="2">
              <Button
                w={"full"}
                maxW={"md"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
                onClick={handleGoogleClick}
              >
                <Center>
                  <Text>Google</Text>
                </Center>
              </Button>
            </SimpleGrid>
          </Card>
        </Box>
      </Box>
      {showBanner && (
        <Banner
          email={email}
          handleCloseIcon={handleCloseIcon}
          handleResendEmailClick={handleResendEmailClick}
          error={bannerError}
          setError={setBannerError}
          emailSent={emailSent}
        />
      )}
    </>
  );
};

export default Login;
