import { VStack, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { TeamForm } from "../../components/TeamForm";
import { useParams } from "react-router-dom";

import { shields } from "../../data";

const CreateTeam = (props) => {
  let { id } = useParams();

  React.useEffect(() => {
    if (props.teamDetail) {
      props.addUserRoute({
        route: props.teamDetail?.route,
        team: props.teamDetail?.teamId,
        owner:props.teamDetail?.owner
      });
    }
  }, [props.teamDetail]);

  return (
    <VStack spacing="8" px="4" py="24" flex="1">
      <Stack w="100%" spacing="5">
        <Text fontSize="lg" fontWeight="medium">
          Crear Equipo
        </Text>
        <Text color="muted" fontSize="sm">
          Podrás invitar a tus amigos a unirse al equipo para participar en esta
          Yincaña o en otra.
        </Text>
      </Stack>
      <TeamForm
        shieldOptions={shields}
        id={id}
        saveAction={props.saveTeamData}
      />
    </VStack>
  );
};

export default CreateTeam;
