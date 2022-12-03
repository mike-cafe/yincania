import * as React from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Stack,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TeamJoinCard } from "../../components/TeamJoinCard";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const schema = yup.object().shape({
  code: yup.string().required(),
});

const JoinTeam = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const auth = useAuth();
  
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
    if(props.teamFound){
      setShowTeam(true)
    }else{
      setShowTeam(false);
    }
  }, [props.teamFound]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [showTeam, setShowTeam] = React.useState(false);

  let code = searchParams.get("code");

  if(code){
    onSubmit({code:code})
  }

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
            discard={props.resetFindTeam}
            team={props.teamDetail}
            rutaId={props.teamDetail?.route}
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTapas.png?alt=media&token=5eb3599d-0b03-4f8d-8d04-17a53a0ac5b3"
          />
        ) : (
          ""
        )}
        <FormControl id="code">
          <FormLabel>Código</FormLabel>
          <Input
            defaultValue={code}
            placeholder="XXXXXX"
            {...register("code")}
          />
        </FormControl>
        <Button
          disabled={!!errors?.code?.message}
          onClick={handleSubmit(onSubmit)}
          size="lg"
          w="100%"
          colorScheme="brand"
          rightIcon={<Search2Icon />}
        >
          Buscar Equipo
        </Button>
      </VStack>
    </>
  );
};

export default JoinTeam;
