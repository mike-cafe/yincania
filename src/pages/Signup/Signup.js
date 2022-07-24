import React, { useState, useEffect } from "react";
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

import { useNavigate, useLocation } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { Logo } from "./../../components/controls/Logo";
import { Card } from "./../../components/Card";
import { useAuth } from "./../../contexts/AuthContext";
import { LocalStorage } from "./../../store/LocalStorage";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
} from "@firebase/auth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters (lowercase and uppercase), one number and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords don't match."),
});

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Signup = (props) => {
  const navigate = useNavigate();
  const query = useQuery();
  const auth = getAuth();

  const {
    signInWithGoogle,
    login,
    applyActionCodeVerification,
    sendUserEmailVerification,
    registerUser,
    currentUser,
  } = useAuth();
  const toast = useToast();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkedTermsAndCondition, setCheckedTermsAndCondition] =
    useState(false);
  const [checkedPrivacyPolicy, setCheckedPrivacyPolicy] = useState(false);
  const [emailAlreadyTaken, setEmailAlreadyTaken] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [socialLogin, setSocialLogin] = useState(false);

  useEffect(() => {
    const { emailAlreadyTaken } = props;
    if (emailAlreadyTaken) {
      setEmailAlreadyTaken(true);
    }
  }, [props.emailAlreadyTaken]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleClick = () => {
    setSocialLogin(true);
    setIsGoogleLogin(true);
    signInWithGoogle();
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const user = result.user;
        navigate(
          {
            pathname: "/app/login",
            search: `oauthToken=${user.accessToken}`,
            state: { token: user.accessToken },
          },
          { replace: true }
        );
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error)
      });
  }, [auth]);

  useEffect(() => {
    if (query.get("oauthToken")) {
      toast({
        position: "bottom-right",
        title: Toast.SocialLoginVerification.info.title,
        duration: Toast.SocialLoginVerification.info.duration,
        isClosable: true,
      });
      setDisabledForm(true);
      setSocialLogin(true);
      props.verifyToken({
        token: query.get("oauthToken"),
        socialLogin: true,
        user: currentUser,
        navigate,
      });
    }
  }, [location]);

  const handleClick = () => setShow(!show);

  const onSubmit = async (payload) => {
    setDisabledForm(true);
    registerUser(payload.email, payload.password)
      .then(async (res) => {
        const data = {
          ...res.user,
          _tokenResponse: res._tokenResponse,
        };
        await sendUserEmailVerification();
        localStorage.setItem(LocalStorage.WAKANDA_EMAIL, payload.email);
        props.signUpSuccess(data);
        setDisabledForm(false);
        navigate({
          pathname: "/login",
          search: "?v=true",
        });
      })
      .catch((error) => {
        setDisabledForm(false);
        if (error.message.includes("email-already-in-use")) {
          props.getAlreadyEmail(true);
        } else {
          toast({
            position: "bottom-right",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
    reset();
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
          {/* <Logo
            mx="auto"
            h="6"
            mb={{
              base: "10",
              md: "20",
            }}
          /> */}
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Create a new account
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="small">
            <Text as="span">Already have an account?</Text>
            <Button
              ml={1}
              colorScheme="yellow"
              variant="link"
              onClick={() => navigate("/login")}
              fontWeight="bold"
            >
              Sign in
            </Button>
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
                  {...register("email")}
                  onChange={() =>
                    emailAlreadyTaken && setEmailAlreadyTaken(false)
                  }
                />

                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                {emailAlreadyTaken && (
                  <FormErrorMessage>
                    This email is already registered.
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
                  <FormLabel>Password</FormLabel>
                </Flex>
                <InputGroup size="md">
                  <Input
                    {...register("password")}
                    type={show ? "text" : "password"}
                    name="password"
                    pr="4.5rem"
                  />
                  <InputRightAddon onClick={handleClick}>
                    {show ? "Hide" : "Show"}
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
                  <FormLabel>Confirm Password</FormLabel>
                </Flex>
                <InputGroup size="md">
                  <Input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    pr="4.5rem"
                  />
                  <InputRightAddon onClick={handleShowConfirmPasswordClick}>
                    {showConfirmPassword ? "Hide" : "Show"}
                  </InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors?.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
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
                  I read and accept the
                  <Link
                    href="https://mikecafe.notion.site/Terms-and-Conditions-7ff554e60e3d48069849821d14a4c9f9"
                    isExternal
                    mx="4px"
                    fontWeight="bold"
                    textDecoration="underline"
                    color="yellow.600"
                  >
                    terms & conditions <ExternalLinkIcon mx="2px" />
                  </Link>
                </Checkbox>
                <Checkbox
                  marginTop="1"
                  fontSize="sm"
                  value={checkedPrivacyPolicy}
                  isDisabled={disabledForm}
                  onChange={(e) => setCheckedPrivacyPolicy(e.target.checked)}
                >
                  I read and accept the
                  <Link
                    href="https://mikecafe.notion.site/Privacy-Policy-509f3be10de7493db4f09f59519b2ece"
                    isExternal
                    mx="4px"
                    fontWeight="bold"
                    textDecoration="underline"
                    color="yellow.600"
                  >
                    privacy policy
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
                disabled={
                  !!errors.email ||
                  !!errors.password ||
                  !!errors.confirmPassword ||
                  !checkedTermsAndCondition ||
                  !checkedPrivacyPolicy ||
                  disabledForm
                }
              >
                Sign Up
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
                or continue with
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
                  <Text>Sign up with Google</Text>
                </Center>
              </Button>
              {/* <VisuallyHidden>Login with Google</VisuallyHidden>
                <FaGoogle /> */}
            </SimpleGrid>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
