import { Link, Button, Divider, Stack, Text, Flex } from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { BarStepCircle } from "./BarStepCircle";

export const BarStep = (props) => {
  const {
    isActive,
    isPlayable,
    isCompleted,
    isLastStep,
    title,
    description,
    time,
    onButtonClick,
    position,
    ...stackProps
  } = props;

  const navigate = useNavigate();

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
      {!isActive || (
        <Flex flexGrow={1} pr={4}>
          {!isPlayable || (
            <Button
              marginLeft={"auto"}
              colorScheme="brand"
              aria-label="Jugar"
              onClick={() => navigate(`/app/route/${props.routeID}/game/${props.barID}`)}
            >
              <Link to="/tutorial">Jugar</Link>
            </Button>
          )}
          {!!isPlayable || (
            <Button
              marginLeft={"auto"}
              colorScheme="brand"
              aria-label="Jugar"
              onClick={() => onButtonClick(position + 1, isPlayable)}
            >
              Tapa
            </Button>
          )}
        </Flex>
      )}
      {!isCompleted || (
        <Flex flexGrow={1} pr={4}>
          <Text color="brand.700" fontWeight="bold" marginLeft={"auto"}>
            {time}
          </Text>
        </Flex>
      )}
    </Stack>
  );
};
