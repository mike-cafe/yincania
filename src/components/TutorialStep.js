import {
  Container,
  VStack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

export const TutorialStep = (props) => {
  
  const { title, description, isVisible, stepImage } = props;
  
  if (!isVisible) {
    return <></>;
  } else {
    return (
      <VStack spacing={4} bg="brand.50" height="100%">
        <Container height="380px" bgImage={stepImage}></Container>
        <VStack py="4">
          <Text fontSize="3xl" color="emphasized" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="lg" textAlign="center" px={8} color="muted">
            {description}
          </Text>
        </VStack>
      </VStack>
    );
  }
};
