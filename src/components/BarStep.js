import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Progress,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Button,
  Divider,
  Stack,
  Text,
  VStack,
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
} from "@chakra-ui/react";
import * as React from "react";
import { BarStepCircle } from "./BarStepCircle";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { ExternalLinkIcon, TimeIcon } from "@chakra-ui/icons";
import {
  BsFillArrowRightCircleFill,
  BsArrowRightCircle,
  BsTornado,
} from "react-icons/bs";

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
    timetable,
    ...stackProps
  } = props;

  const [playTime, setPlayTime] = React.useState();
  const [stepAction, setStepAction] = React.useState();
  // const [coolUntil, setCoolUntil] = React.useState(
  //   Number((props.finishTime + 126 * 60) / 60).toFixed(0)
  // );
  // const [waitTime, setWaitTime] = React.useState(
  //   coolUntil - Number((Date.now() / 60000).toFixed(0))
  // );

  // const [waitAction,setWaitAction] = React.useState()

  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    if (!completed) {
      switch (status) {
        case "hidden":
          setStepAction(null);
          break;
        case "playable":
            setStepAction(
              <Button
                rightIcon={<BsArrowRightCircle color="brand.300" />}
                colorScheme="brand"
                size="md"
                variant="solid"
                onClick={() => navigate(`/app/team/${team}/game/${game}`)}
                aria-label="Jugar"
                isLoading={loading}
                ml="auto"
                my="auto"
                isDisabled={props.coolDownActive}
              >
                Jugar
              </Button>
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
              isDisabled={props.coolDownActive}
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
  }, [status, loading,props.coolDownActive]);

  const navigate = useNavigate();

  return (
    <VStack justifyContent="flex-start" alignItems={"flex-start"} spacing="4">
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
          spacing="1"
          pb={isLastStep ? "0" : "8"}
          onClick={() => {
            if ((status != "hidden" || isLastStep) && !completed) {
              onOpen();
            }
          }}
        >
          <Text
            color={status === "hidden" ? "gray.300" : "emphasized"}
            fontWeight="medium"
          >
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
                objectFit="fill"
                dropShadow={"2xl"}
              />
            </DrawerHeader>
            <DrawerBody p={4}>
              <VStack spacing={4} alignItems="flex-start">
                <Text
                  color={"blackAlpha.800"}
                  fontWeight={"bold"}
                  fontSize="3xl"
                >
                  {title}
                </Text>
                <Box>
                  <Text color={"blackAlpha.600"} fontSize={"md"}>
                    Dirección
                  </Text>
                  <Text fontWeight={"medium"}>{address}</Text>
                </Box>
                <Box>
                  <Text color={"blackAlpha.600"} fontSize={"md"}>
                    Horario
                  </Text>
                  <Text fontWeight={"medium"}>{timetable}</Text>
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
    </VStack>
  );
};
