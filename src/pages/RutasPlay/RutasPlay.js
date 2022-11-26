import {
  VStack,
  Container,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { BarList } from "../../components/BarList";
import { TeamPlayCard } from "../../components/TeamPlayCard";
import { ActionModal } from "../../components/ActionModal";
import { useParams } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../utils/init-firebase";

const RutasPlay = (props) => {
  const [showQR, setShowQR] = React.useState(0);
  const [currentTeam, setCurrentTeam] = React.useState();
  const [tapaURL, setTapaURL] = React.useState();
  const [tapaLoading, setTapaLoading] = React.useState(false);
  const params = useParams();

  React.useEffect(() => props.getRouteDetail(params.id), []);
  React.useEffect(() => props.getUserProfile(), []);
  React.useEffect(() => {
    setCurrentTeam(props.user?.routes?.find((route) => route.id === params.id));
    if (currentTeam) {
      props.getTeamDetail(currentTeam.team);
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
            setTapaURL(
              `https://react-coffee-a2736.web.app/tapa/${res.data}`
            );
          }
          setShowQR(pos);
        })
        .catch((e) => console.error(e));
    } else {
      setShowQR(pos);
    }
    setTapaLoading(false);
  };

  const closeQR = () => {
    if (!currentTeam) {
      setCurrentTeam(
        props.user?.routes?.find((route) => route.id === params.id)
      );
    }
    props.getTeamDetail(currentTeam.team);
    setShowQR(0);
  };

  return (
    <Container mb="24">
      <VStack spacing="8" px="4" py="8" pt="92px" flex="1">
        <VStack color="brand.600" w="100%" spacing={2} align="left">
          <Text fontSize="xl" lineHeight="1" fontWeight="bold">
            {props.detail?.location}
          </Text>
          <Text
            fontSize="4xl"
            lineHeight="1"
            letterSpacing="tight"
            fontWeight="extrabold"
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
        <ActionModal tapaURL={tapaURL} barNumber={showQR} onClose={closeQR}>
          {" "}
        </ActionModal>
      ) : (
        ""
      )}

    </Container>
  );
};

export default RutasPlay;
