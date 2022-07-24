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
          {props.shieldOptions.map((option) => (
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
