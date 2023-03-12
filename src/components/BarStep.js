import {
  Button,
  Divider,
  Stack,
  Text,
  Flex,
  VStack,
  HStack,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  useDisclosure,
  Spacer,
  Box,
} from "@chakra-ui/react";
import * as React from "react";
import { BarStepCircle } from "./BarStepCircle";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { BsFillArrowRightCircleFill, BsTornado } from "react-icons/bs";

export const BarStep = (props) => {
  const {
    isLastStep,
    title,
    description,
    finishTime,
    startTime,
    onButtonClick,
    position,
    status,
    game,
    team,
    loading,
    address,
    addressURL,
    completed,
    ...stackProps
  } = props;

  const [playTime, setPlayTime] = React.useState();
  const [stepAction, setStepAction] = React.useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    if (props.finishTime && props.startTime) {
      setPlayTime(
        Number(((props.finishTime - props.startTime) / 60).toFixed(1)) +
          " minutos"
      );
    }
  }, [props.startTime, props.finishTime]);

  React.useEffect(() => {
    if (!completed) {
      switch (status) {
        case "hidden":
          setStepAction(null);
          break;
        case "playable":
          setStepAction(
            <Icon
              as={BsFillArrowRightCircleFill}
              w={"32px"}
              h={"32px"}
              color="brand.300"
              onClick={() => navigate(`/app/team/${team}/game/${game}`)}
              aria-label="Jugar"
              isLoading={loading}
              ml="auto"
            />
            // <Button
            //   variant="solid"
            //   ml="auto"
            //   colorScheme="brand"
            //   aria-label="Jugar"
            //   onClick={() => navigate(`/app/team/${team}/game/${game}`)}
            //   isLoading={loading}
            // >
            //   Jugar
            // </Button>
          );
          break;
        case "consumable":
          setStepAction(
            <Button
              variant="solid"
              marginLeft={"auto"}
              colorScheme="brand"
              aria-label="Jugar"
              onClick={() => onButtonClick(position, game)}
              isLoading={props.loading}
            >
              Tapa
            </Button>
          );
          break;
        case "completed":
          setStepAction(null);
          break;
      }
    } else {
      setStepAction(null);
    }
  }, [status, loading]);

  const navigate = useNavigate();

  return (
    <Stack spacing="4" direction="row">
      <Stack spacing="0" align="center">
        <BarStepCircle
          isActive={status === "playable" || status === "consumable"}
          isCompleted={status === "completed"}
        />
        <Divider
          orientation="vertical"
          borderWidth="1px"
          borderColor={
            status === "completed"
              ? "brand.200"
              : isLastStep
              ? "transparent"
              : "inherit"
          }
        />
      </Stack>
      <Stack
        spacing="0.5"
        pb={isLastStep ? "0" : "8"}
        onClick={() => {
          if ((status != "hidden" || isLastStep) && !completed) {
            onOpen();
          }
        }}
      >
        <Text color="emphasized" fontWeight="medium">
          {title}
        </Text>
        <Text
          filter={status === "hidden" && !isLastStep ? "auto" : "none"}
          blur="4px"
          color="muted"
          fontSize={"xs"}
          lineHeight={1}
        >
          {description}
        </Text>
      </Stack>
      <Spacer />
      {stepAction}
      {!(status === "completed") || (
        <Text
          textAlign={"right"}
          fontSize="sm"
          color="brand.700"
          fontWeight="bold"
          marginLeft={"auto"}
        >
          {playTime}
        </Text>
      )}
      <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
          <DrawerBody py={4}>
            <Flex>
              <Box>
                <Text>En {address}</Text>
              </Box>
              <Spacer />
              <Box>
                <Button
                  colorScheme="brand"
                  variant="link"
                  leftIcon={<ExternalLinkIcon />}
                  onClick={() => window.open(addressURL, "_blank")}
                >
                  ver en el mapa
                </Button>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};
