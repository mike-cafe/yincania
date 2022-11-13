import {
  Spacer,
  Button,
  Flex,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { RadioCardGroup, RadioCard } from "./RadioCardGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { avatarOptions } from "../data";
import { DeleteIcon } from "@chakra-ui/icons";
import { httpsCallable } from "firebase/functions";
import { functions } from "./../utils/init-firebase";

export const UserForm = (props) => {
  const {
    owner,
    route,
    avatar,
    name,
    username,
    email,
    saveUser,
    uid,
    ...rest
  } = props;
  const { logout } = useAuth();
  const schema = yup.object().shape({
    name: yup.string().required().default(name),
    username: yup.string().required().default(username),
    avatar: yup.string().required().default(avatar),
    email: yup.string().email().required().default(email),
  });

  const onDeletion = async () => {
    const disableUser = httpsCallable(functions, "disableUser");
    await disableUser()
      .catch(() => logout())
      .finally(() => navigate("/"))
      .catch((e) => console.error(e));
  };

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

  const onSubmit = (formData) =>
    saveUser({
      ...formData,
      uid: uid,
    });

  return (
    <Stack spacing="5" divider={<StackDivider />}>
      <FormControl id="name">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "1.5", md: "8" }}
          justify="space-between"
        >
          <FormLabel variant="inline">Name</FormLabel>
          <Input
            maxW={{ md: "3xl" }}
            defaultValue={name}
            {...register("name")}
          />
        </Stack>
      </FormControl>
      <FormControl id="username">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "1.5", md: "8" }}
          justify="space-between"
        >
          <FormLabel variant="inline">Nombre de Ususario</FormLabel>
          <Input
            maxW={{ md: "3xl" }}
            defaultValue={username}
            {...register("username")}
          />
        </Stack>
      </FormControl>

      <FormControl id="avatar">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "1.5", md: "8" }}
          justify="space-between"
        >
          <FormLabel variant="inline">Avatar</FormLabel>
          <Stack
            spacing={{ base: "3", md: "5" }}
            direction={{ base: "column", sm: "row" }}
            width="full"
            maxW={{ md: "3xl" }}
          >
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <RadioCardGroup defaultValue={avatar} spacing="3" {...field}>
                  {avatarOptions.map((option, idx) => (
                    <RadioCard
                      key={option.name}
                      value={option.name}
                      decor={option.decor}
                      subtitle={option.name}
                    >
                      <Text
                        color="emphasized"
                        fontWeight="medium"
                        fontSize="sm"
                      >
                        Option {option.name}
                      </Text>
                    </RadioCard>
                  ))}
                </RadioCardGroup>
              )}
            />
          </Stack>
        </Stack>
      </FormControl>

      <FormControl id="email">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "1.5", md: "8" }}
          justify="space-between"
        >
          <FormLabel variant="inline">Email</FormLabel>
          <Input
            type="email"
            maxW={{ md: "3xl" }}
            defaultValue={email}
            disabled={true}
            {...register("email")}
          />
        </Stack>
      </FormControl>
      <Flex direction="row-reverse">
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          variant="primary"
        >
          Guardar
        </Button>
        <Spacer></Spacer>
        <Button
          leftIcon={<DeleteIcon />}
          variant="ghost"
          colorScheme="gray"
          color="gray.400"
          onClick={onDeletion}
        >
          Eliminar Cuenta
        </Button>
      </Flex>
    </Stack>
  );
};
