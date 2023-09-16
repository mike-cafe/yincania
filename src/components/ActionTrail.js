import { Text,
   Button, Spacer, HStack, Box, VStack, ButtonGroup } from "@chakra-ui/react";
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
      <ButtonGroup variant='solid' spacing='2' w={"100%"}>
        <Button
          hidden={!backButton}
          onClick={backClick}
          size="xl"
          w="100%"
          colorScheme="secondary"
          variant={secondVariant}
          marginRight="auto"
          fontSize={{ base: "sm", sm: "md" }}
        >
          {secondAction}
        </Button>
        <Button
          w="100%"
          disabled={firstDisabled}
          onClick={mainClick}
          size="xl"
          colorScheme="brand"
          variant="solid"
          fontSize={{ base: "sm", sm: "md" }}
        >
          {firstAction}
        </Button>
      </ ButtonGroup>
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
      <Box w="100%" justifyContent="center" alignItems="between" px={8}>
        {actionButtons}
      </Box>
    </Box>
  );
};
