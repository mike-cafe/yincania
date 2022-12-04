import React, { useState, useEffect } from "react";
import { RadioCardGroup, RadioCard } from "../../components/RadioCardGroup";
import { avatarOptions } from "../../data";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  useColorModeValue,
  Flex,
  Divider,
  Toast,
  Checkbox,
  FormErrorMessage,
  InputRightAddon,
  useToast,
  Center,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation, Link as RouteLink } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "./../../components/Card";
import { useAuth } from "./../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { getAuth, updateProfile } from "@firebase/auth";
import { Logo } from "../../components/Logo";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = yup.object().shape({
  name: yup.string().required("Por favor, dinos tu nombre"),
  username: yup.string().required("Se debe introducir un nombre de usuario"),
  avatar: yup.string().required("Debes seleccionar un avatar!"),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("Se debe introducir un email"),
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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Signup = (props) => {
  const navigate = useNavigate();
  const query = useQuery();
  const nextUrl = query.get("next") || "/app/routes";

  const {
    signInWithGoogle,
    sendUserEmailVerification,
    registerUser,
    logout,
    createUserProfile,
  } = useAuth();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkedTermsAndCondition, setCheckedTermsAndCondition] =
    useState(false);
  const [checkedPrivacyPolicy, setCheckedPrivacyPolicy] = useState(false);
  const [emailAlreadyTaken, setEmailAlreadyTaken] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);

  // useEffect(() => {
  //   const { emailAlreadyTaken } = props;
  //   if (emailAlreadyTaken) {
  //     setEmailAlreadyTaken(true);
  //   }
  // }, [props.emailAlreadyTaken]);

  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
    reset,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues:{
      email:"",
      password:"",
      confirmPassword:"",
      name:"",
      username:""
    }
  });

  const handleShowConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleGoogleClick = () => {
    setDisabledForm(true);
    signInWithGoogle(redirectTo).finally(() => setDisabledForm(false));
  };
  const redirectTo = (res) =>
    props.userData({ user: res.user, next: nextUrl, navigate });

  const handleClick = () => setShow(!show);

  const onSubmit = (payload) => {
    setDisabledForm(true);
    registerUser(payload.email, payload.password)
      .then(async (res) => {
        reset();
        await sendUserEmailVerification();
        await createUserProfile({
          uid: res.user.uid,
          avatar: payload.avatar,
          username: payload.username,
          name: payload.name,
          email: payload.email,
          routes: [],
        });
        await updateProfile(res.user, {
          displayName: payload.username,
        });
        await logout();
        setDisabledForm(false);
        toast({
          position: "bottom-center",
          title: "Comprueba tu correo",
          description: "Te hemos enviado un email para verificar la dirección.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        setDisabledForm(false);
        if (error.message.includes("email-already-in-use")) {
          setEmailAlreadyTaken(true);
        } else {
          toast({
            position: "bottom-center",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          reset();
        }
      });
  };

  const forceReset = ()=>reset();

  const avatarFormControl = (
    <Controller
      name="avatar"
      control={control}
      render={({ field, formState }) => {
        return (
          <FormControl
            id="avatar"
            isInvalid={formState.errors?.avatar}
            errortext={formState.errors?.avatar?.message}
            isRequired
            isDisabled={disabledForm}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: "1.5", md: "8" }}
              justify="space-between"
            >
              <FormLabel variant="inline">Avatar</FormLabel>
              <Stack
                spacing={{ base: "3", md: "5" }}
                direction={{ base: "column", sm: "row" }}
                width="full"
                maxW={{ md: "3xl" }}
              >
                <RadioCardGroup spacing="3" {...field}>
                  {avatarOptions.map((option, idx) => (
                    <RadioCard
                      key={option.name}
                      value={option.name}
                      decor={option.decor}
                      subtitle={option.name}
                    >
                      <Text
                        color="emphasized"
                        fontWeight="medium"
                        fontSize="sm"
                      >
                        Option {option.name}
                      </Text>
                    </RadioCard>
                  ))}
                </RadioCardGroup>
              </Stack>
            </Stack>
            <FormErrorMessage>
              {formState.errors?.avatar?.message}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    />
  );

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
        <Center>
          <Logo />
        </Center>

        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="lg" fontWeight="extrabold">
            Crear una cuenta
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="small">
            <Text as="span">¿Ya tienes una cuenta?</Text>
            <Link
              ml={1}
              color="brand.600"
              fontWeight="bold"
              as={RouteLink}
              to="/"
            >
              Inicia sesión
            </Link>
          </Text>
          <Card>
            <Stack spacing="6">
              <FormControl
                isInvalid={!!errors?.email?.message || emailAlreadyTaken}
                errortext={errors?.email?.message}
                isRequired
                isDisabled={disabledForm}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  {...register("email", {
                    onChange: (e) =>{
                      if(emailAlreadyTaken){
                        setEmailAlreadyTaken(false);
                      }
                    }  
                  })}
                />

                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                {emailAlreadyTaken && (
                  <FormErrorMessage>
                    Vaya parece que ya tenemos una cuenta con ese correo electrónico
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={!!errors?.password?.message}
                errortext={errors?.password?.message}
                isRequired
                isDisabled={disabledForm}
              >
                <Flex justify="space-between">
                  <FormLabel>Contraseña</FormLabel>
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
              <FormControl
                isInvalid={!!errors?.confirmPassword?.message}
                errortext={errors?.confirmPassword?.message}
                isRequired
                isDisabled={disabledForm}
              >
                <Flex justify="space-between">
                  <FormLabel>Confirma Contraseña</FormLabel>
                </Flex>
                <InputGroup size="md">
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
              <FormControl
                id="name"
                isInvalid={!!errors?.name?.message}
                errortext={errors?.name?.message}
                isRequired
                isDisabled={disabledForm}
              >
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: "1.5", md: "8" }}
                  justify="space-between"
                >
                  <FormLabel variant="inline">Nombre</FormLabel>
                  <Input maxW={{ md: "3xl" }} {...register("name")} />
                </Stack>
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="username"
                isInvalid={!!errors?.username?.message}
                errortext={errors?.username?.message}
                isRequired
                isDisabled={disabledForm}
              >
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: "1.5", md: "8" }}
                  justify="space-between"
                >
                  <FormLabel variant="inline">Nombre de Ususario</FormLabel>
                  <Input maxW={{ md: "3xl" }} {...register("username")} />
                </Stack>
                <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
              </FormControl>
              {avatarFormControl}
              <FormControl id="conditionCheckBox">
                <Checkbox
                  marginBottom="1"
                  value={checkedTermsAndCondition}
                  onChange={(e) =>
                    setCheckedTermsAndCondition(e.target.checked)
                  }
                  fontSize="sm"
                  isDisabled={disabledForm}
                >
                  He leído y acepto los
                  <Link
                    href="https://mikecafe.notion.site/Terms-and-Conditions-7ff554e60e3d48069849821d14a4c9f9"
                    isExternal
                    mx="4px"
                    fontWeight="bold"
                    textDecoration="underline"
                    color="yellow.600"
                  >
                    términos & condiciones <ExternalLinkIcon mx="2px" />
                  </Link>
                </Checkbox>
                <Checkbox
                  marginTop="1"
                  fontSize="sm"
                  value={checkedPrivacyPolicy}
                  isDisabled={disabledForm}
                  onChange={(e) => setCheckedPrivacyPolicy(e.target.checked)}
                >
                  He leído y acepto la
                  <Link
                    href="https://mikecafe.notion.site/Privacy-Policy-509f3be10de7493db4f09f59519b2ece"
                    isExternal
                    mx="4px"
                    fontWeight="bold"
                    textDecoration="underline"
                    color="yellow.600"
                  >
                    política de privacidad
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                </Checkbox>
              </FormControl>
              <Button
                type="submit"
                colorScheme="yellow"
                size="lg"
                fontSize="md"
                onClick={handleSubmit(onSubmit)}
                isDisabled={
                  !checkedTermsAndCondition ||
                  !checkedPrivacyPolicy ||
                  !isValid ||
                  disabledForm
                }
              >
                Registrar
              </Button>
              <Button variant="outline" colorScheme="brand" onClick={()=>forceReset()}>
                Forzar reset
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
    </>
  );
};

export default Signup;
