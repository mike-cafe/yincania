import { Box, Container, Stack } from "@chakra-ui/react";
import * as React from "react";
import { steps } from "../data";
import { BarStep } from "./BarStep";
import { useStep } from "./useStep";

export const BarList = (props) => {
  const [currentStep, { setStep }] = useStep({
    maxStep: steps.length,
    initialStep: 2,
  });
  return (
    <Box width="100%" bg="bg-surface" boxShadow="base" borderRadius="lg">
      <Container
        py={{
          base: "4",
          md: "8",
        }}
      >
        {props.completed ? (
          <Stack spacing="0">
            {props.bars.map((bar, id) => (
              <BarStep
                key={id}
                position={id}
                cursor="pointer"
                onButtonClick={props.tapasAction}
                title={bar.name}
                time={bar.time}
                description={bar.address}
                isActive={false}
                isCompleted={true}
                isLastStep={steps.length === id + 1}
                isPlayable={false}
                routeID={props.routeID}
                barID={bar.id}
              />
            ))}
          </Stack>
        ) : (
          <Stack spacing="0">
            {props.bars.map((bar, id) => (
              <BarStep
                key={id}
                position={id}
                cursor="pointer"
                onClick={() => setStep(id)}
                onButtonClick={props.tapasAction}
                title={bar.name}
                description={bar.address}
                isActive={currentStep === id}
                isCompleted={currentStep > id}
                isLastStep={props.bars.length === id + 1}
                isPlayable={bar.playable}
                routeID={props.routeID}
                barID={bar.id}
              />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};
