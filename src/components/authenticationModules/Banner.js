import React, { useState, useEffect } from "react";
import { EmailIcon, InfoIcon } from "@chakra-ui/icons";
import { FiX } from "react-icons/fi";
import {
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BannerLink } from "./BannerLink";
const Banner = (props) => {
  const { email, handleCloseIcon, handleResendEmailClick } = props;
  const [buttonText, setButtonText] = useState("Enviar");

  useEffect(() => {
    if (props.error) {
      setButtonText("Error enviando el correo");
      setTimeout(() => {
        setButtonText("Resend email");
        props.setBannerError(false);
      }, [3000]);
    }
  }, [props.error]);

  useEffect(() => {
    if (props.emailSent) {
      setButtonText("Enviado!");
    }
  }, [props.emailSent]);

  const handleResendEmailLink = () => {
    setButtonText("Enviando...");
    handleResendEmailClick();
  };

  return (
    <Box position="fixed" bottom={0} width="100%">
      <Stack
        direction={{ base: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        py="3"
        px={{ base: "3", md: "6", lg: "8" }}
        color="white"
        spacing="4"
        bg={useColorModeValue("blue.600", "blue.400")}
        position="relative"
      >
        <Box position="absolute" top="2" right="2">
          <FiX size={22} onClick={handleCloseIcon} />
        </Box>
        <HStack spacing={4} mt={0}>
          <Icon as={EmailIcon} fontSize="2xl" h="10" />
          <Text fontWeight="medium" marginEnd="2">
            Te enviaremos un correo de verificación a <b>{email}</b>
          </Text>
        </HStack>
        <Button
          size="md"
          w="full"
          variant="solid"
          colorScheme="whiteAlpha"
          textColor={props?.error ? "red" : "white"}
          fontWeight={buttonText === "Email Sent!" ? "bold" : "normal"}
          onClick={handleResendEmailLink}
        >
          {buttonText}
        </Button>
      </Stack>
    </Box>
  );
};

export default Banner;
