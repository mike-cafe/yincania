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
      <VStack spacing={4} height="100%">
        <Container height={"256px"} bgImage={stepImage} bgSize="cover" bgRepeat="no-repeat">

        </Container>
        <VStack py="2">
          <Text fontSize="2xl" color="emphasized" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="md" textAlign="center" px={6} color="muted">
            {description}
          </Text>
        </VStack>
      </VStack>
    );
  }
};
