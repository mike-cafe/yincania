import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Stack,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as React from "react";
import { RadioCardGroup, RadioCard } from "./RadioCardGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { ActionTrail } from "./ActionTrail";
import { useNavigate } from "react-router-dom";
import { shields } from "../data";

const schema = yup.object().shape({
  shield: yup.string().required().default("one"),
  name: yup.string().required("Escribe un nombre para tu equipo"),
  warcry: yup.string().required("Escribe un grito de guerra para tu equipo"),
});

export const TeamForm = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (values) => {
    if (values) {
      props.saveAction({
        owner: auth.currentUser?.uid,
        route: props.id,
        ...values,
        shield: shields.find((shield) => shield.name === values.shield).decor,
        navigate: navigate,
      });
    }
  };

  return (
    <>
      <Stack pb="8" w="100%" spacing="5">
        <FormControl id="shield">
          <FormLabel>Escudo</FormLabel>
          <Stack
            spacing={{
              base: "3",
              md: "5",
            }}
            direction={{
              base: "column",
              sm: "row",
            }}
          >
            <Controller
              name="shield"
              control={control}
              render={({ field }) => (
                <RadioCardGroup defaultValue="one" spacing="3" {...field}>
                  {props.shieldOptions.map((option) => {
                    return (
                      <RadioCard
                        key={option.name}
                        value={option.name}
                        decor={option.decor}
                      >
                        <Text
                          color="emphasized"
                          fontWeight="medium"
                          fontSize="sm"
                        >
                          Option {option.name}
                        </Text>
                        <Text color="muted" fontSize="sm">
                          Jelly biscuit muffin icing dessert powder macaroon.
                        </Text>
                      </RadioCard>
                    );
                  })}
                </RadioCardGroup>
              )}
            />
          </Stack>
        </FormControl>
        <FormControl
          id="name"
          isInvalid={!!errors?.name?.message}
          errortext={errors?.name?.message}
          isRequired
        >
          <FormLabel>Nombre del Equipo</FormLabel>
          <Input placeholder="Nombre de Equipo" {...register("name")} />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="warcry"
          isInvalid={!!errors?.warcry?.message}
          errortext={errors?.warcry?.message}
          isRequired>
          <FormLabel>Grito de Guerra</FormLabel>
          <Textarea rows={3} resize="none" {...register("warcry")} />
          <FormHelperText color="subtle">
            Escribe una frase para motivar al equipo
          </FormHelperText>
          <FormErrorMessage>{errors?.warcry?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <ActionTrail
        secondVariant="ghost"
        secondAction="Cancelar"
        firstAction="Guardar"
        mainClick={handleSubmit(onSubmit)}
        backButton={true}
        backClick={() => navigate("/app/detail/" + props.id)}
      />
    </>
  );
};
