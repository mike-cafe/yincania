import {
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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions, db } from "../../utils/init-firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Logo } from "../../components/Logo";

const RutasPlay = (props) => {
  const [showQR, setShowQR] = React.useState(0);
  const [currentTeam, setCurrentTeam] = React.useState();
  const [tapaURL, setTapaURL] = React.useState();
  const [tapaLoading, setTapaLoading] = React.useState(false);
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();
  let [searchParams, setSearhParams] = useSearchParams();

  React.useEffect(() => props.getRouteDetail(params.id), []);
  React.useEffect(() => props.getUserProfile(), []);

  React.useEffect(() => {
    setCurrentTeam(props.user?.routes?.find((route) => route.id === params.id));
    if (currentTeam) {
      props.getTeamDetail(currentTeam.team);
      if (currentTeam?.team) {
        const unsub = onSnapshot(
          doc(db, "teams", currentTeam.team),
          (doc) => {
            props.getTeamDetail(currentTeam.team);
            const teamData = doc.data();
            if (teamData.routeFinished) {
              onOpen();
            }
          },
          (err) => console.error(err)
        );
        return unsub;
      }
    }
  }, [props.user]);

  const tapasAction = async (pos, game) => {
    setTapaLoading(true);
    if (!tapaURL) {
      const generateQR = httpsCallable(functions, "createTapa");
      await generateQR({
        team: props.team?.id || currentTeam?.team,
        game: game,
        bar: props.team?.routeGames[pos - 1]?.bar,
        members: props.team?.members.length,
      })
        .then((res) => {
          if (window.location.hostname === "localhost") {
            setTapaURL(`http://192.168.41.3:3000/tapa/${res.data}`);
          } else {
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
    let posTapa =
      props.team?.routeGames?.findIndex(
        (r) => r.barGame.id === searchParams.get("game")
      ) + 1;
    // if (posTapa && props.team?.id) {
    //   tapasAction(posTapa, searchParams.get("game"));
    // }
  }, [props.team]);

  const closeQR = () => {
    if (!currentTeam) {
      setCurrentTeam(
        props.user?.routes?.find((route) => route.id === params.id)
      );
    }
    props.getTeamDetail(currentTeam.team);
    setSearhParams();
    setShowQR(0);
  };

  return (
    <Container mb="24">
      <VStack spacing="8" px="4" py="8" pt="128px" flex="1">
        <VStack w="100%" spacing={2} align="left">
          <Text fontSize="xl" lineHeight="1" fontWeight="bold" color="blackAlpha.600">
            {props.detail?.location}
          </Text>
          <Text
            fontSize="4xl"
            lineHeight="1"
            letterSpacing="tight"
            fontWeight="extrabold"
            color="brand.500"
          >
            {props.detail?.title}
          </Text>
        </VStack>{" "}
        {props.team ? (
          <TeamPlayCard
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
        {currentTeam?.team ? (
          <BarList
            routeID={params.id}
            team={currentTeam?.team || props.team?.id}
            bars={props.team?.routeGames}
            tapasAction={tapasAction}
            loading={tapaLoading}
          />
        ) : (
          "No hay current team"
        )}
      </VStack>
      {showQR !== 0 ? (
        <ActionModal
          barInfo={props.team?.routeGames[showQR-1]}
          tapaURL={tapaURL}
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
            {/* <ModalCloseButton /> */}
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
              {/* <Button colorScheme="brand" mr={3} onClick={onClose}>
                Volver
              </Button> */}
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
