import {
  VStack,
  Stack,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { TeamForm } from "../components/TeamForm";
import { ActionTrail } from "../components/ActionTrail";
import { useNavigate,useParams } from "react-router-dom";

import { shields } from '../data';

export const CreateTeam = (props) => {
  let navigate = useNavigate();
  let { id } = useParams();

  return (
      <VStack spacing="8" px="4" py="24" flex="1">
        <Stack w="100%" spacing="5">
          <Text fontSize="lg" fontWeight="medium">
            Crear Equipo
          </Text>
          <Text color="muted" fontSize="sm">
            Podrás invitar a tus amigos a unirse al equipo para participar en
            esta Yincaña.
          </Text>
        </Stack>
        <TeamForm shieldOptions={shields} />
        <ActionTrail
          secondVariant="ghost"
          secondAction="Cancelar"
          firstAction="Confirmar Equipo"
          mainClick={()=>navigate("/app/view/team/"+id)}
          backButton={true}
          backClick={()=>navigate("/app/detail/"+id)}
        />
      </VStack>
  );
};
