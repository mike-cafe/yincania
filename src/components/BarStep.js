import {
  Button,
  Divider,
  Stack,
  Text,
  Flex,
  VStack,
  HStack,
  Icon,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  useDisclosure,
  Spacer,
  Box,
  Heading,
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
    profilePic,
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
        <DrawerContent borderRadius="2xl">
          <DrawerCloseButton />
          <DrawerHeader p={0.5} boxShadow={"base"}>
              <Image
                src={profilePic}
                alt={title}
                borderTopRadius="2xl"
                objectFit='fill'
                dropShadow={"2xl"}
              />
          </DrawerHeader>
          <DrawerBody p={4}>
            <VStack spacing={4} alignItems="flex-start">
              <Text color={"blackAlpha.800"} fontWeight={"bold"} fontSize="3xl">{title}</Text>            
              <Box>
              <Text color={"blackAlpha.600"} fontSize={"md"}>Dirección</Text>
              <Text fontWeight={"medium"}>{address}</Text>
              </Box>
                <Button
                  colorScheme="brand"
                  variant="solid"
                  leftIcon={<ExternalLinkIcon />}
                  onClick={() => window.open(addressURL, "_blank")}
                  w="full"
                >
                  Ver en Mapa
                </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};
