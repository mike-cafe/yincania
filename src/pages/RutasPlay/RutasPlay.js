import {
  ScaleFade,
  VStack,
  Container,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  Button,
  Stack,
  Center,
} from "@chakra-ui/react";
import * as React from "react";
import { BarList } from "../../components/BarList";
import { TeamPlayCard } from "../../components/TeamPlayCard";
import { ActionModal } from "../../components/ActionModal";
import { useNavigate, useParams } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { doc, onSnapshot } from "firebase/firestore";
import { Logo } from "../../components/Logo";
import CountdownTimer from "../../components/CountdownTimer";
import { db, functions } from "../../utils/init-firebase";

const RutasPlay = (props) => {
  const coolDownTime = 5 * 60;
  const [showQR, setShowQR] = React.useState(0);
  const [tapaURL, setTapaURL] = React.useState();
  const [tapaLoading, setTapaLoading] = React.useState(false);
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamId, setTeamId] = React.useState();
  const [tapaId, setTapaId] = React.useState();
  const [isServed, setIsServed] = React.useState(false);

  let navigate = useNavigate();
  let [coolDownActive, setCoolDownActive] = React.useState(false);
  const [targetDate, setTargetDate] = React.useState();

  React.useEffect(() => {
    props.getRouteDetail(params.id);
    if (props.user) {
      let teamId = props.user?.routes?.find(
        (route) => route.id === params.id
      ).team;
      try {
        props.getTeamDetail(teamId);
        setTeamId(teamId);
      } catch (e) {
        console.error("failed to get team detail", e);
      }
    } else {
      props.getUserProfile();
    }
  }, []);

  React.useEffect(() => {
    if (teamId) {
      try {
        const unsub = onSnapshot(
          doc(db, "teams", teamId),
          (doc) => {
            props.getTeamDetail(teamId);
            const teamData = doc.data();
            if (teamData.routeFinished) {
              onOpen();
            }
          },
          (err) => console.error(err)
        );
        return unsub;
      } catch (e) {
        console.error("failed to get snapshot with team", props.team);
        console.error("more error info", e);
      }
    }
  }, [teamId]);

  React.useEffect(() => {
    if (props.user) {
      let teamId = props.user?.routes?.find(
        (route) => route.id === params.id
      ).team;
      if (teamId) {
        props.getTeamDetail(teamId);
        setTeamId(teamId);
      }
    }
  }, [props.user]);

  const tapasAction = async (pos, game) => {
    setTapaLoading(true);
    if (!tapaURL) {
      const generateQR = httpsCallable(functions, "createTapa");
      await generateQR({
        team: props.team?.id,
        game: game,
        bar: props.team?.routeGames[pos - 1]?.bar,
        members: props.team?.members.length,
      })
        .then((res) => {
          if (window.location.hostname === "localhost") {
            setTapaId(res.data);
            setTapaURL(`http://192.168.41.3:3000/tapa/${res.data}`);
          } else {
            setTapaId(res.data);
            setTapaURL(`https://react-coffee-a2736.web.app/tapa/${res.data}`);
          }
          setShowQR(pos);
        })
        .catch((e) => console.error(e));
    } else {
      setShowQR(pos);
    }
    setTapaLoading(false);
  };

  React.useEffect(() => {
    if (props.team) {
      let cooldownFinish = new Date(1970, 0, 1);
      let playableStep = props.team?.routeGames?.find(
        (r) => r.status === "playable"
      );
      if (playableStep) {
        cooldownFinish.setSeconds(
          props.team?.routeGames?.find((r) => r.status === "playable")
            .consumedTime?.seconds +
            coolDownTime +
            60 * 60 * 2
        );
        let currentDate = new Date();
        if (cooldownFinish.getTime() > currentDate.getTime()) {
          closeQR();
          setTargetDate(cooldownFinish);
          setCoolDownActive(true);
        }
      }
      let consumableStep = props.team?.routeGames?.find(
        (r) => r.status === "consumable"
      );
      if (consumableStep) {
        if (consumableStep.served) {
          setIsServed(true);
        } else {
          setIsServed(false);
        }
      }
    }
  }, [props.team]);

  const closeQR = () => {
    setShowQR(0);
  };

  const onConfirmTapa = () => {
    props.updateTapa(tapaId);
  };
  return (
    <Container mb="24">
      <VStack spacing="8" px="4" py="8" pt="128px" flex="1">
        <VStack w="100%" spacing={2} align="left">
          <Text
            fontSize="xl"
            lineHeight="1"
            fontWeight="normal"
            color="blackAlpha.800"
          >
            {props.detail?.location}
          </Text>
          <Text
            fontSize="4xl"
            lineHeight="1"
            letterSpacing="tight"
            fontWeight="medium"
            color="blackAlpha.800"
          >
            {props.detail?.title}
          </Text>
        </VStack>{" "}
        {props.team ? (
          <TeamPlayCard
            cooldown={coolDownTime}
            rutaStart={props.detail?.date}
            w="100%"
            label="Tapas"
            team={props.team}
            rutaId={props.detail?.id}
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTapas.png?alt=media&token=5eb3599d-0b03-4f8d-8d04-17a53a0ac5b3"
          />
        ) : (
          ""
        )}
        {props.team?.id ? (
          <>
            <ScaleFade in={coolDownActive} unmountOnExit={true}>
              {coolDownActive ? (
                <CountdownTimer
                  targetDate={targetDate}
                  onCompletion={() => {
                    setTargetDate(null);
                    setCoolDownActive(false);
                  }}
                  totalCooldownTime={coolDownTime}
                />
              ) : (
                ""
              )}
            </ScaleFade>

            <BarList
              routeID={params.id}
              team={props.team?.id}
              bars={props.team?.routeGames}
              tapasAction={tapasAction}
              loading={tapaLoading}
              coolDownActive={coolDownActive}
            />
          </>
        ) : (
          "No hay equipo"
        )}
      </VStack>
      {showQR !== 0 ? (
        <ActionModal
          barInfo={props.team?.routeGames[showQR - 1]}
          tapaURL={tapaURL}
          tapaId={tapaId}
          confirmTapa={onConfirmTapa}
          isServed={isServed}
          onClose={closeQR}
        >
          {" "}
        </ActionModal>
      ) : (
        ""
      )}
      {
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="2xl"
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent borderRadius="2xl" mx="4">
            <ModalHeader>
              <Center>
                <Logo height="5" />
              </Center>
            </ModalHeader>
            <ModalBody>
              <Stack
                maxW="xs"
                mx="auto"
                py={{
                  base: "12",
                  md: "16",
                }}
                spacing={{
                  base: "6",
                  md: "10",
                }}
              >
                <Stack spacing="3" textAlign="center">
                  <Text
                    color="brand.500"
                    fontWeight="extrabold"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    textTransform="uppercase"
                    transform="scale(1.2)"
                  >
                    La Yincaña ha terminado!
                  </Text>
                  <Text fontSize="lg">Ya puedes consultar los resultados</Text>
                </Stack>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => navigate(`/app/finished/${props.team.route}`)}
                variant="solid"
                colorScheme="brand"
                w="100%"
              >
                Ir a Resultados
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </Container>
  );
};

export default RutasPlay;
