import React from "react";
import {
  Box,
  Link,
  Heading,
  Text,
  Center,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { Logo } from "./Logo";

export function PageNotFound() {


  return (
    <Box
    minH="100vh"
    py="12"
    px={{
      base: "4",
      lg: "8",
    }}
  >
    <Box maxW="md" h="full" mx="auto">
      <Center>
        <Logo />
      </Center>

      <AbsoluteCenter>
        <Heading textAlign="center" size="lg" fontWeight="extrabold">
          404
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="small">
          <Text as="span">Página no encontrada,</Text>
          <Link
            ml={1}
            color="brand.600"
            fontWeight="bold"
            as={RouteLink}
            to="/"
          >
            vuelve a la aplicación.
          </Link>
        </Text>
      </AbsoluteCenter>
    </Box>
    </Box>
  );
}
