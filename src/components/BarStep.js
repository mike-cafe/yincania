import { ArrowRightIcon, SearchIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, Divider, Stack, Text,Flex } from "@chakra-ui/react";
import * as React from "react";
import { BarStepCircle } from "./BarStepCircle";

export const BarStep = (props) => {
  const {
    isActive,
    isCompleted,
    isLastStep,
    title,
    description,
    ...stackProps
  } = props;
  return (
    <Stack spacing="4" direction="row" {...stackProps}>
      <Stack spacing="0" align="center">
        <BarStepCircle isActive={isActive} isCompleted={isCompleted} />
        <Divider
          orientation="vertical"
          borderWidth="1px"
          borderColor={
            isCompleted ? "accent" : isLastStep ? "transparent" : "inherit"
          }
        />
      </Stack>

      <Stack spacing="0.5" pb={isLastStep ? "0" : "8"}>
        <Text color="emphasized" fontWeight="medium">
          {title}
        </Text>
        <Text
          filter={!isActive & !isCompleted & !isLastStep ? "auto" : "none"}
          blur="4px"
          color="muted"
        >
          {description}
        </Text>
      </Stack>
      <Flex flexGrow={1} pr={4}>
      {!isActive || (
        <Button
          marginLeft={"auto"}
          colorScheme="brand"
          aria-label="Jugar"
        >Jugar</Button>
      )}
      </Flex>
    </Stack>
  );
};
