import {
  Image,
  Flex,
  Box,
  HStack,
  Icon,
  Stack,
  VStack,
  Tag,
  Text,
  useColorModeValue as mode,
  useBreakpointValue,
  Wrap,
} from "@chakra-ui/react";
import * as React from "react";
import { HiShieldCheck, HiUser } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { ActionTrail } from "../../components/ActionTrail";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { rutaDetail } from "../../data";

const TeamDetail = (props) => {
  let params = useParams();
  React.useEffect(() => props.getTeamDetail(params.id), [params.id]);
  React.useEffect(() => {
    if (props.teamDetail) {
      props.getUsernames(props.teamDetail?.members.map((one)=>one.id));
    }
  }, [props.teamDetail]);

  // a falta de crear acciones para la recuperación de
  // los usuarios del equipo y la yincaña
  return (
      <VStack spacing="6" px="4" py="24" flex="1">
        <Stack
          align="center"
          spacing={{
            base: "3",
            md: "2",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Image height="96px" src={props.teamDetail?.shield} />

          <Text textAlign="center" as="h2" fontWeight="bold" fontSize="xl">
            {props.teamDetail?.name}
          </Text>
          <HStack
            fontSize={{
              base: "md",
              md: "lg",
            }}
          >
            <Text
              textAlign="center"
              as="span"
              color={mode("gray.500", "gray.300")}
              lineHeight="1"
            >
              {`Equipo para Yincaña '${rutaDetail.title}'`}
            </Text>
            <Icon as={HiShieldCheck} color="green.500" />
          </HStack>
        </Stack>
        <Box fontSize="sm" textAlign="center" noOfLines={2}>
          {props.teamDetail?.warcry}
        </Box>
        <HStack>
          <Icon as={HiUser} fontSize="xl" color="gray.400" />
          <Text
            fontSize="sm"
            fontWeight="medium"
            textAlign="center"
            color={mode("gray.600", "gray.300")}
          >
            {props.teamDetail?.memberCounter} miembros
          </Text>
        </HStack>
        <Wrap
          justify="center"
          shouldWrapChildren
          color={mode("gray.600", "gray.300")}
        >
          {props.usernames?.map(
            (tag) => (
              <Tag key={tag} color="inherit" px="3">
                {tag}
              </Tag>
            )
          )}
        </Wrap>
        <ActionTrail
          secondVariant="ghost"
          secondAction="Abandonar Equipo"
          firstAction="Invitar al Equipo"
          backButton={true}
        />
      </VStack>
  );
};

export default TeamDetail;
