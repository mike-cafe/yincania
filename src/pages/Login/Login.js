import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTimer } from "use-timer";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "./../../components/Card";
import Banner from "./../../components/authenticationModules/Banner";
import { LocalStorage } from "./../../store/LocalStorage";
import { Toast } from "./../../store/Toast";
import { useAuth } from "./../../contexts/AuthContext";
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
});

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = (props) => {
  const { userHasWorkSpace } = props;
  const location = useLocation();
  const query = useQuery();
  const navigate = useNavigate();
  const toast = useToast();
  const auth = getAuth();
  const { time, start } = useTimer({
    endTime: 5,
    initialTime: 1,
    onTimeOver: () => {
      if (userHasWorkSpace) {
        localStorage.setItem(LocalStorage.TOKEN, currentUser.accessToken);
        localStorage.setItem(LocalStorage.USER_ID, currentUser.uid);
        navigate("/app/widgets/");
      } else {
        localStorage.setItem(LocalStorage.TOKEN, currentUser.accessToken);
        localStorage.setItem(LocalStorage.USER_ID, currentUser.uid);
        navigate("/app/notion1");
      }
    },
  });
  const {
    signInWithGoogle,
    login,
    applyActionCodeVerification,
    sendUserEmailVerification,
    currentUser,
    logout,
  } = useAuth();
  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [email, setEmail] = useState("");
  const [disabledForm, setDisabledForm] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [socialLogin, setSocialLogin] = useState(false);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const user = result.user;
        navigate(
          {
            pathname: "/login",
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
    if (query.get("v")) {
      setShowBanner(true);
      setEmail(localStorage.getItem(LocalStorage.TAPAP_EMAIL));
    }
    if (query.get("mode") === "verifyEmail") {
      toast({
        position: "bottom-right",
        title: Toast.EmailVerification.info.title,
        duration: Toast.EmailVerification.info.duration,
        isClosable: true,
      });
      verifyUserEmail();
    }
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

  useEffect(() => {
    const { user } = props;
    if (user) {
      if (!user?.emailVerified) {
        setShowBanner(true);
        setEmail(user.email);
      }
    }
  }, [props.user]);

  useEffect(() => {
    const { tokenVerified } = props;
    if (socialLogin) {
      if (tokenVerified) {
        setSocialLogin(false);
        start();
        toast({
          position: "bottom-right",
          title: Toast.SocialLoginVerification.success.title,
          description: `${Toast.SocialLoginVerification.success.description} ${time} `,
          duration: Toast.SocialLoginVerification.success.duration,
          status: "success",
          isClosable: true,
        });
      }
    }
  }, [props.user, props.userHasWorkSpace, props.tokenVerified]);

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
    localStorage.removeItem(LocalStorage.TAPAP_EMAIL);
  };

  const handleResendEmailClick = async () => {
    try {
      await sendUserEmailVerification();
      props.reSendEmailSuccess();
    } catch (error) {
      props.reSendEmailFailure(error.message);
      toast({
        position: "bottom-right",
        title: "Resend Email",
        description: error.message,
        status: "error",
        duration: Toast.EmailVerification.error.duration,
        isClosable: true,
      });
    }
  };

  const handleGoogleClick = () => {
    setSocialLogin(true);
    setIsGoogleLogin(true);
    signInWithGoogle();
  };

  const onSubmit = async (payload) => {
    reset();
    setDisabledForm(true);
    login(payload.email, payload.password)
      .then((res) => {
        setDisabledForm(false);
        if (res.user.emailVerified) {
          props.signInSuccess(res.user);
          props.userData({ user: res.user, navigate });
        } else {
          props.signInSuccess(res.user);
        }
      })
      .catch((error) => {
        setDisabledForm(false);
        props.signInFailure(error.message);
        toast({
          position: "bottom-right",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const onLogout = async () => {
    reset();
    setDisabledForm(true);
    logout().then(()=>{
      toast({
        position: "bottom-right",
        description: "Hasta pronto!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }).catch(
      (error)=>{toast({
        position: "bottom-right",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });}
    )
    .finally(()=>setDisabledForm(false))
  };

  const verifyUserEmail = async () => {
    const actionCode = query.get("oobCode");
    try {
      await applyActionCodeVerification(actionCode);
      toast({
        position: "bottom-right",
        title: Toast.EmailVerification.success.title,
        description: Toast.EmailVerification.success.description,
        status: "success",
        duration: Toast.EmailVerification.success.duration,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: "bottom-right",
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
          {/* <Logo
            mx="auto"
            h="6"
            mb={{
              base: "10",
              md: "20",
            }}
          /> */}
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Sign in to your account
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="small">
            <Text as="span">Don&apos;t have an account?</Text>
            <Button
              ml={1}
              colorScheme="yellow"
              variant="link"
              onClick={() => navigate("/signup")}
              fontWeight="bold"
            >
              Sign up here
            </Button>
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
                  <FormLabel m={0}>Password</FormLabel>
                  <Button
                    variant="link"
                    colorScheme="yellow"
                    onClick={() => navigate("/forget-password")}
                    fontWeight="bold"
                  >
                    Forgot Password?
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
                    {show ? "Hide" : "Show"}
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
                Sign in
              </Button>
              <Button
                type="button"
                colorScheme="gray"
                size="sm"
                fontSize="md"
                onClick={onLogout}
                disabled={!!errors.email || !!errors.password || disabledForm}
              >
                Logout
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
                  <Text>Sign in with Google</Text>
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
          {...props}
        />
      )}
    </>
  );
};

export default Login;
