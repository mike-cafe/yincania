import {
  Button,
  Divider,
  HStack,
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
  IconButton,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import * as React from "react";
import { BarStepCircle } from "./BarStepCircle";
import { Link as RouteLink, useLocation, useNavigate } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { BsArrowRightCircle, BsInfoCircle, BsMap } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(window.location.host);

  React.useEffect(() => {
    if (!completed) {
      switch (status) {
        case "hidden":
          setStepAction(null);
          break;
        case "playable":
          setStepAction(
            <Button
              // rightIcon={<BsArrowRightCircle color="brand.300" />}
              colorScheme="brand"
              size={{base:"xs",sm:"md"}}
              variant="solid"
              onClick={() => navigate(`/app/team/${team}/game/${game}`)}
              aria-label="Jugar"
              isLoading={loading}
              marginLeft={"auto"}
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
              marginLeft="auto"
              justifySelf="flex-end"
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
  }, [status, loading, props.coolDownActive]);

  const navigate = useNavigate();

  return (
    <VStack justifyContent="flex-start" alignItems={"flex-start"} spacing="4">
      <Stack spacing="4" direction="row" w="full">
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
            filter={status === "hidden" && !isLastStep ? "auto" : "none"}
            blur="4px"
            color={status === "hidden" && !isLastStep ? "gray.400" : "muted"}
            fontWeight="medium"
            fontSize={"lg"}
          >
            {title}
          </Text>
          <Text
            filter={status === "hidden" && !isLastStep ? "auto" : "none"}
            blur="4px"
            color={status === "hidden" && !isLastStep ? "gray.400" : "muted"}
            fontSize={"xs"}
            lineHeight={1}
          >
            <Text as="span">{description} </Text>
            <Text
              color={status === "hidden" && !isLastStep ? "gray.400" : "muted"}
              as="span"
              textDecor="underline"
            >
              ver info
            </Text>
          </Text>
        </Stack>
        {/* <Spacer /> */}
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
            <DrawerCloseButton size="sm" color="blackAlpha.500" background={"whiteAlpha.700"} />
            <DrawerHeader p={0.5} boxShadow={"base"}>
              <Skeleton></Skeleton>
              <Image
                src={profilePic}
                fallbackSrc="/placeholderImagev2.png"
                alt={title}
                borderTopRadius="2xl"
                objectFit="cover"
                dropShadow={"2xl"}
                w="100%"
                maxH="196px"
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
