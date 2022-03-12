import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import * as React from "react";
import { RadioCardGroup, RadioCard } from "./RadioCardGroup";

export const TeamForm = (props) => (
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
        <RadioCardGroup defaultValue="one" spacing="3">
          {[
            {
              decor:
                "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda",
              name: "one",
            },
            {
              decor:
                "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldThree.png?alt=media&token=b4e3f05d-8dbc-48da-977f-1edaeb0bcbf0",
              name: "two",
            },
            {
              decor:
                "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldOne.png?alt=media&token=b0d82e4c-30aa-46a2-8289-cb1c818df3f6",
              name: "three",
            },
            {
              decor:
                "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/ShieldTwo.png?alt=media&token=99935f82-27bf-4212-864f-0fbf385a4dda",
              name: "four",
            },
          ].map((option) => (
            <RadioCard
              key={option.name}
              value={option.name}
              decor={option.decor}
            >
              <Text color="emphasized" fontWeight="medium" fontSize="sm">
                Option {option.name}
              </Text>
              <Text color="muted" fontSize="sm">
                Jelly biscuit muffin icing dessert powder macaroon.
              </Text>
            </RadioCard>
          ))}
        </RadioCardGroup>
      </Stack>
    </FormControl>
    <FormControl id="name">
      <FormLabel>Nombre del Equipo</FormLabel>
      <Input placeholder="Idiotas" />
    </FormControl>
    <FormControl id="motive">
      <FormLabel>Grito de Guerra</FormLabel>
      <Textarea rows={3} resize="none" />
      <FormHelperText color="subtle">
        Escribe una frase para motivar al equipo
      </FormHelperText>
    </FormControl>
  </Stack>
);
