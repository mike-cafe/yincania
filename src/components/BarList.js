import * as React from "react";
import { Box, Container, Stack } from "@chakra-ui/react";
import { BarStep } from "./BarStep";
import { useStep } from "./useStep";

export const BarList = (props) => {

  const { completed,loading,...rest } = props;

  const [currentStep, { setStep }] = useStep({
    maxStep: 7,
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
        <Stack spacing="0">
          {props.bars
            ?.map((bar, id) => {
                return (
                  <BarStep
                    completed={completed}
                    key={id}
                    position={bar.pos}
                    cursor="pointer"
                    onButtonClick={props.tapasAction}
                    title={bar.name}
                    address={bar.address}
                    addressURL={bar.addressURL}
                    finishTime={bar.finishTime?.seconds}
                    startTime={bar.startTime?.seconds}
                    description={bar.address}
                    status={bar.status}
                    isLastStep={bar.pos===7}
                    routeID={props.routeID}
                    barID={bar.bar}
                    game={bar.barGame.id}
                    team={props.team}
                    loading={loading}
                  />
                );
              }
            )
            .sort((a, b) => a.props.position - b.props.position)}
        </Stack>
      </Container>
    </Box>
  );
};
