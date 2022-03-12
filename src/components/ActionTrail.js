import { Button, HStack, Box } from "@chakra-ui/react";
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
      <HStack
        w="100%"
        spacing="4"
        justifyContent="between"
        alignItems="between"
      >
        <Button
          onClick={() => console.log("click")}
          size="lg"
          colorScheme="gray"
          variant={secondVariant}
          marginRight="auto"
        >
          {secondAction}
        </Button>
        <Button
          onClick={() => console.log("click")}
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
