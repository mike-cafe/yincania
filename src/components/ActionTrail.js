import { Text, Button, Spacer, HStack, Box } from "@chakra-ui/react";
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

  let actionButtons;
  if (backButton) {
    actionButtons = (
      <>
        {" "}
        <Button
          hidden={!backButton}
          onClick={backClick}
          size="lg"
          colorScheme="gray"
          variant={secondVariant}
          marginRight="auto"
          fontSize={{ base: "sm", sm: "md" }}
        >
          {secondAction}
        </Button>
        <Spacer />
        <Button
          disabled={firstDisabled}
          onClick={mainClick}
          size="lg"
          w="100%"
          colorScheme="brand"
          rightIcon={<HiArrowNarrowRight />}
          fontSize={{ base: "sm", sm: "md" }}
        >
          {firstAction}
        </Button>
      </>
    );
  } else {
    actionButtons = (
      <>
        <Button
          disabled={firstDisabled}
          onClick={mainClick}
          size="lg"
          w="100%"
          colorScheme="brand"
          rightIcon={<HiArrowNarrowRight />}
          fontSize={{ base: "sm", sm: "md" }}
        >
          {firstAction}
        </Button>
      </>
    );
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      py={2}
      px={2}
      bg="white"
      shadow="base"
      w="100%"
    >
      <Box mb="8">{props.children}</Box>
      {props.firstAction == "Ver Equipo" && (
        <Text color="blackAlpha.600" textAlign={"center"} mb="2">
          Estás apuntado a este evento
        </Text>
      )}
      <HStack w="100%" justifyContent="between" alignItems="between" px={2}>
        {actionButtons}
      </HStack>
    </Box>
  );
};
