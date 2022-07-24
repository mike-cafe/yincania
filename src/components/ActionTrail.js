import { Button,Spacer, HStack, Box } from "@chakra-ui/react";
import * as React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

export const ActionTrail = (props) => {
  const {
    label,
    value,
    delta,
    creativity,
    secondVariant,
    secondAction,
    firstAction,
    mainClick,
    backClick,
    backButton,
    firstDisabled,
    ...boxProps
  } = props;
  return (
    <Box
      position="fixed"
      bottom="0"
      py="6"
      px="4"
      bg="white"
      shadow="base"
      w="100%"
    >
      <Box mb="8">
        {props.children}
      </Box>
      <HStack
        w="100%"
        spacing="4"
        justifyContent="between"
        alignItems="between"
      >
        <Button
          hidden={!backButton}
          onClick={backClick}
          size="lg"
          colorScheme="gray"
          variant={secondVariant}
          marginRight="auto"
        >
          {secondAction}
        </Button>
        <Spacer />
        <Button
          disabled={firstDisabled}
          onClick={mainClick}
          size="lg"
          colorScheme="brand"
          rightIcon={<HiArrowNarrowRight />}
        >
          {firstAction}
        </Button>
      </HStack>
    </Box>
  );
};
