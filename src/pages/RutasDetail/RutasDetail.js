import {
  Box,
  Alert,
  AlertDescription,
  AlertIcon,
  HStack,
  Image,
  VStack,
  Center,
  Text,
  useBreakpointValue,
  Container,
  Button,
  Spacer,
} from "@chakra-ui/react";
import * as React from "react";
import { StatLight } from "../../components/StatLight";
import { BarCard } from "../../components/BarCard";
import { ActionTrail } from "../../components/ActionTrail";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const RutasDetail = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  let navigate = useNavigate();
  let params = useParams();
  const [hasTeam, setHasTeam] = React.useState(
    props.user?.routes?.find((r) => r.id === params.id)?.team
  );

  React.useEffect(() => {
    if (props.detail?.final != null) {
      props.getFinalDetail(props.detail?.final);
    }
  }, [props.detail]);

  React.useEffect(() => props.getRouteDetail(params.id), [params.id]);

  return (
    <Container mb="24" px={{ base: 2, sm2: 4 }}>
      <Center width="100%" pt="67px">
        <Image src={props.detail?.cover} alt={props.detail?.title} />
      </Center>
      <VStack spacing="8" px="4" py="8" flex="1">
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
          <Text
            fontSize="lg"
            marginStart="1"
            alignSelf="flex-start"
            fontWeight="light"
          >
            {`${props.detail?.date.toDate().getDate()} de ${
              months[props.detail?.date.toDate().getMonth()]
            } de ${props.detail?.date
              .toDate()
              .getFullYear()} a la ${props.detail?.date.toDate().getHours()}:${
              props.detail?.date.toDate().getMinutes() < 10 ? "0" : ""
            }${props.detail?.date.toDate().getMinutes()}`}
          </Text>
          <Spacer></Spacer>
          <Text
            fontSize="lg"
            marginStart="1"
            alignSelf="flex-start"
            fontWeight="medium"
            color="blackAlpha.700"
          >
            {`La cerveza Reliquia, de Toledo, patrocina esta ruta de bares por ${props.detail?.location} a la que te invitamos a jugar con tus amigo/as.`}
          </Text>
          <Spacer />
          <Text
            fontSize="lg"
            marginStart="1"
            alignSelf="flex-start"
            fontWeight="medium"
            color="blackAlpha.700"
          >
            La Yincaña consiste en:
          </Text>
        </VStack>{" "}
        <HStack w="100%" spacing="4">
          <StatLight
            label="Equipos"
            value={props.detail?.teamCounter}
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTeams.png?alt=media&token=2c05cdbc-6e06-4262-8154-9ccf25f71059"
          />
          <StatLight
            label="Bares"
            value={props.detail?.barCounter}
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapBares.png?alt=media&token=051efd21-07ac-4769-b6e8-370e0f942c4c"
          />
          <StatLight
            label="Tapas"
            value={props.detail?.tapasCounter}
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTapas.png?alt=media&token=5eb3599d-0b03-4f8d-8d04-17a53a0ac5b3"
          />
        </HStack>
        <Alert status="info">
          <AlertIcon />
          {`El precio de participar en esta Yincaña es de ${props.detail?.precio} euros`}
        </Alert>
        {props.final ? <BarCard w="100%" barDetail={props.final} /> : ""}
        <ActionTrail
          backButton={!hasTeam}
          backClick={() =>
            navigate(`/app/join/team?routeId=${props.detail?.id}`)
          }
          secondVariant="outline"
          secondAction="Unirse a Equipo"
          firstAction={hasTeam ? "Ver Equipo" : "Crear Equipo"}
          mainClick={() => {
            if (hasTeam) {
              navigate(
                "/app/view/team/" + hasTeam + `?routeId=${props.detail?.id}`
              );
            } else {
              navigate("/app/create/team/" + props.detail?.id);
            }
          }}
        />
      </VStack>
    </Container>
  );
};
export default RutasDetail;
