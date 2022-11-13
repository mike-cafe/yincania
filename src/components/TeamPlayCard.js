import {
  Box,
  Image,
  Button,
  HStack,
  Link,
  Icon,
  Stack,
  Divider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { HiUser } from "react-icons/hi";
import { Link as RouteLink } from "react-router-dom";

export const TeamPlayCard = (props) => {
  const [totalTime, setTotalTime] = React.useState();
  React.useEffect(()=>{

    if(props.team?.routeGames){
      let timeArray = props.team?.routeGames?.flatMap((game) => {
        if(game.startTime && game.finishTime){
          return [game.startTime.seconds, game.finishTime.seconds];
        }else{
          return []
        }
      });
      let timeDiff = Math.max(...timeArray) - Math.min(...timeArray);
      let timeDate = new Date(null);
      timeDate.setHours(0);
      try{
        timeDate.setSeconds(timeDiff);
        if(timeDate.getHours()==0){
          setTotalTime(timeDate.getMinutes() + " minutos")
        }else{
          setTotalTime(timeDate.getHours()+" horas, " + timeDate.getMinutes() + " minutos")
        }        
      }catch(e){
        console.error(e)
      }
    }
  },[props.team])

  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      mx="auto"
      width="100%"
      rounded="lg"
      shadow="base"
    >
      <HStack py="6" px="4" spacing="4">
        <Image width="48px" src={props.team?.shield} alt="Escudo Equipo" />
        <CardContent>
          <Text color="muted">Tu Equipo</Text>
          <CardHeader title={props.team?.name} />
          <Stack spacing="1" mt="2">
            <HStack fontSize="sm">
              <Icon as={HiUser} color="gray.500" />
              <Text>{`${props.team?.memberCounter} jugadores`}</Text>
            </HStack>
          </Stack>
        </CardContent>
      </HStack>
      <Divider />
      <HStack px={{ base: "6", md: "6" }} py="4" justifyContent="space-between">
        { !totalTime ||
        <HStack spacing={3}>
        <Image
          width="32px"
          src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapClock.png?alt=media&token=64614b8b-3cb6-4d9d-b4b1-b6c48ad85ea4"
          alt="Tiempo Equipo"
        />
        <Stack spacing={0}>
          <Text mb={1} fontSize="xs" color="muted">
            Tiempo de partida
          </Text>
          <Text
            lineHeight={1}
            fontSize="lg"
            color="brand.600"
            fontWeight="bold"
          >
            {totalTime}
          </Text>
        </Stack>
      </HStack>
        }

        <Button variant="link" colorScheme="gray" size="sm">
          <Link as={RouteLink} to={"/app/view/team/" + props.team?.id}>
            Ver Equipo
          </Link>
        </Button>
      </HStack>
    </Box>
  );
};
