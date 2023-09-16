import * as React from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Stack,
  FormErrorMessage,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Link,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TeamJoinCard } from "../../components/TeamJoinCard";
import { useAuth } from "../../contexts/AuthContext";
import {
  Link as RouteLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const schema = yup.object().shape({
  code: yup.string().required("Introduce un código de equipo"),
});

const JoinTeam = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showTeam, setShowTeam] = React.useState(false);
  const [joinAvailable, setJoinAvailable] = React.useState(false);
  const [teamCode, setTeamCode] = React.useState("");
  const [alreadyPlaying, setAlreadyPlaying] = React.useState(false);
  const [currentTeam, setCurrentTeam] = React.useState();

  const onSubmit = async (values) => props.findTeam(values.code);

  const joinTeam = () => {
    props.addMember({
      member: auth.currentUser.uid,
      team: props.teamDetail,
      route: props.teamDetail.route,
      navigate: navigate,
    });
  };

  React.useEffect(() => {
    let paramCode = searchParams.get("code");
    if (paramCode) {
      onSubmit({ code: paramCode });
      setValue("code", paramCode);
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (props.teamFound) {
      setShowTeam(true);
    } else {
      setShowTeam(false);
    }
  }, [props.teamFound]);

  React.useEffect(() => {
    if (props.routeDetail?.status == "open") {
      setJoinAvailable(true);
    } else {
      setJoinAvailable(false);
    }
    setValue("code", "");
  }, [props.routeDetail]);

  React.useEffect(() => {
    if (props.err) {
      setError(
        "code",
        {
          message: "No se ha encontrado un equipo con este código",
          type: "focus",
        },
        { shouldFocus: true }
      );
    }
  }, [props.err]);

  React.useEffect(() => {
    if (props.teamDetail?.route || searchParams.get("routeId")) {
      props.getRouteDetail(
        props.teamDetail?.route || searchParams.get("routeId")
      );
    }
  }, [props.teamDetail]);

  React.useEffect(() => {
    setAlreadyPlaying(
      props.user?.routes?.findIndex(
        (x) => x.id == searchParams.get("routeId")
      ) > -1
    );
    setCurrentTeam(
      props.user?.routes?.find((x) => x.id == searchParams.get("routeId"))
    );
  }, [props.user]);

  return (
    <>
      <VStack spacing="8" px="4" py="32" flex="1">
        <Stack w="100%" spacing="5">
          <Text fontSize="lg" fontWeight="medium">
            Unirse a Equipo
          </Text>
          <Text color="muted" fontSize="sm">
            Introduce el código de 6 dígitos único del equipo. Te lo deberían
            compartir los actuales miembros.
          </Text>
        </Stack>
        {showTeam ? (
          <TeamJoinCard
            w="100%"
            label="Tapas"
            join={joinTeam}
            loading={props.loading}
            discard={props.resetFindTeam}
            team={props.teamDetail}
            rutaId={props.teamDetail?.route}
            delta={{ isUpwardsTrend: true, value: "+10" }}
            isAvailable={joinAvailable}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTapas.png?alt=media&token=5eb3599d-0b03-4f8d-8d04-17a53a0ac5b3"
          />
        ) : (
          ""
        )}
        {currentTeam && (
          <Alert
            status="warning"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            colorScheme="accent"
            variant="top-accent"
            borderRadius={"base"}
          >
            <AlertIcon />
            <AlertTitle>Ya estás apuntado a un equipo</AlertTitle>
            <AlertDescription>
              Si quieres apuntarte a otro, antes debes abandonar
              <Link
                ml={1}
                fontWeight="bold"
                as={RouteLink}
                color="accent.700"
                textDecor="underline"
                to={`/app/view/team/${currentTeam.team}?routeId=${currentTeam.id}`}
              >
                tu equipo actual
              </Link>
            </AlertDescription>
          </Alert>
        )}

        <FormControl
          id="code"
          isInvalid={!!errors?.code?.message}
          errortext={errors?.code?.message}
          isRequired
        >
          <FormLabel>Código</FormLabel>
          <Input
            defaultValue={teamCode}
            placeholder="XXXXXX"
            disabled={alreadyPlaying}
            {...register("code")}
          />
          <FormErrorMessage>{errors?.code?.message}</FormErrorMessage>
        </FormControl>
        <Button
          isDisabled={!!errors?.code?.message || alreadyPlaying}
          onClick={handleSubmit(onSubmit)}
          size="lg"
          w="100%"
          colorScheme="brand"
          rightIcon={<Search2Icon />}
          isLoading={props.loading}
        >
          Buscar Equipo
        </Button>
      </VStack>
    </>
  );
};

export default JoinTeam;
