import {
  VStack,
  Container,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { BarList } from "../../components/BarList";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { TeamPlayCard } from "../../components/TeamPlayCard";
import { ActionModal } from "../../components/ActionModal";
import { rutaDetail,teamDetail,barList } from "../../data";
import { useParams } from "react-router-dom";

const RutasPlay = (props) => {
  const [showQR, setShowQR] = React.useState(0);
  const params = useParams();
  const tapasAction = (pos, isPlayable) => {
    if (!isPlayable) {
      setShowQR(pos);
    }
  };

  React.useEffect(()=>props.getRouteDetail(params.id),[])

  return (
      <Container
        mb="24"
      >
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
          <TeamPlayCard
            w="100%"
            label="Tapas"
            team={teamDetail}
            rutaId={props.detail?.id}
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTapas.png?alt=media&token=5eb3599d-0b03-4f8d-8d04-17a53a0ac5b3"
          />
          <BarList routeID={params.id} bars={barList} tapasAction={tapasAction} />
        </VStack>
      {showQR !== 0 ? (
        <ActionModal barNumber={showQR} onClose={() => setShowQR(0)}>
          {" "}
        </ActionModal>
      ) : (
        ""
      )}
    </Container>
  );
};

export default RutasPlay