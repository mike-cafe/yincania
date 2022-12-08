import {
  Image,
  TagLabel,
  TagRightIcon,
  Box,
  HStack,
  Icon,
  Stack,
  VStack,
  Tag,
  Text,
  useColorModeValue as mode,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import * as React from "react";
import { HiShieldCheck, HiUser } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { ActionTrail } from "../../components/ActionTrail";
import { ShareDrawer } from "../../components/ShareDrawer";
import { rutaDetail } from "../../data";
import { useAuth } from "../../contexts/AuthContext";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import copy from "copy-to-clipboard";

const TeamDetail = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();
  const navigate = useNavigate();

  let params = useParams();
  const [teamCode, setTeamCode] = React.useState();
  const [showCheck, setShowCheck] = React.useState(false);

  React.useEffect(() => props.getTeamDetail(params.id), [params.id]);

  React.useEffect(() => {
    if (props.teamDetail?.members) {
      props.getUsernames(props.teamDetail?.members);
    }
    if (props.teamDetail?.id) {
      if (props.teamDetail?.code) {
        setTeamCode(props.teamDetail?.code);
      } else {
        setTeamCode(props.teamDetail?.id.substring(0, 5));
      }
    }
  }, [props.teamDetail]);

  const abandonTeam = () => {
    props.removeUser({
      members: props.teamDetail?.members,
      user: auth.currentUser.uid,
      id: params.id,
      route: props.teamDetail?.route,
      navigate: navigate,
    });
    props.removeTeam({
      routes: props.userData?.routes,
      route: props.teamDetail?.route,
      user: auth.currentUser?.uid,
      navigate: navigate,
    });
  };

  const copyCode = () => {
    copy(teamCode);
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, [3000]);
  };

  return (
    <>
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
          {props.usernames?.map((tag) => (
            <Tag key={tag} color="inherit" px="3">
              {tag}
            </Tag>
          ))}
        </Wrap>
        <VStack spacing="2">
          <HStack spacing={2}>
            <Tag
              size="lg"
              fontWeight={showCheck ? "light" : "semibold"}
              fontSize={showCheck ? "md" : "xl"}
              variant="outline"
              colorScheme={showCheck ? "green" : "gray"}
              color={showCheck ? "green.500" : "gray"}
              onClick={copyCode}
            >
              <TagLabel>{showCheck ? "Copiado" : teamCode}</TagLabel>
              <TagRightIcon
                as={showCheck ? CheckIcon : CopyIcon}
                color={showCheck ? "green" : "gray"}
              />
            </Tag>
          </HStack>
          <Text>(con este código puedes invitar al equipo)</Text>
        </VStack>
        {/* <Text>Con este código otros podrán unirse a tu equipo</Text> */}
        <ActionTrail
          secondVariant="ghost"
          secondAction="Abandonar Equipo"
          firstAction="Invitar al Equipo"
          backButton={true}
          mainClick={onOpen}
          backClick={abandonTeam}
        />
      </VStack>
      <ShareDrawer
        isOpen={isOpen}
        onClose={onClose}
        teamCode={teamCode}
        routeId={props.teamDetail?.route}
      />
    </>
  );
};

export default TeamDetail;
