import React, { useState, useEffect } from "react";
import { InfoIcon } from "@chakra-ui/icons";
import { FiX } from "react-icons/fi";
import {
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BannerLink } from "./BannerLink";
const Banner = (props) => {
  const { email, handleCloseIcon, handleResendEmailClick } = props;
  const [buttonText, setButtonText] = useState("Resend email");

  useEffect(() => {
    const { emailSent } = props;
    if (emailSent) {
      setButtonText("Email Sent!");
      setTimeout(() => {
        setButtonText("Resend email");
        props.resetSignInStates();
      }, [3000]);
    }
  }, [props.emailSent]);

  useEffect(() => {
    const { error } = props;
    if (error) {
      setButtonText("Error Sent Email!");
      setTimeout(() => {
        setButtonText("Resend email");
        props.resetSignInStates();
      }, [3000]);
    }
  }, [props.error]);

  const handleResendEmailLink = () => {
    setButtonText("Resending...");
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
        bg={useColorModeValue("blue.600", "blue.400")}
      >
        <HStack spacing="2">
          <Icon as={InfoIcon} fontSize="2xl" h="10" />
          <Text fontWeight="medium" marginEnd="2">
            Confirm your email. Check your email. We&apos;ve send a message to{" "}
            <b>{email}</b>
          </Text>
        </HStack>
        <BannerLink
          w={{
            base: "full",
            sm: "auto",
          }}
          textColor={props?.error ? "red" : "blue.500"}
          fontWeight={buttonText === "Email Sent!" ? "bold" : "normal"}
          flexShrink={0}
          onClick={handleResendEmailLink}
        >
          {buttonText}
        </BannerLink>
        <FiX size={22} onClick={handleCloseIcon} />
      </Stack>
    </Box>
  );
};

export default Banner;
