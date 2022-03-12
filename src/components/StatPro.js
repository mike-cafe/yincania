import {
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import * as React from "react";
import { GoCalendar, GoGlobe, GoLocation } from "react-icons/go";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { BarAvatar } from "./BarAvatar";

export const StatPro = () => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    mx="auto"
    py="6"
    px="4"
    width="100%"
    rounded="lg"
    shadow="base"
  >
    <HStack spacing="4">
      <BarAvatar
        name="Destino"
        src="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CuevaPirata.jpeg?alt=media&token=1ae0f1af-0722-4f02-b841-6980ce83d2d6"
      />
      <CardContent>
        <Text color="muted">
          Bar Final
        </Text>
        <CardHeader title="La Cueva del Pirata" />
        <Stack spacing="1" mt="2">
          <HStack fontSize="sm">
            <Icon as={GoLocation} color="gray.500" />
            <Text>Calle Ida, 12</Text>
          </HStack>
        </Stack>

        {/* <Text fontWeight="semibold" mt="8" mb="2">
          Interests
        </Text>
        <Wrap shouldWrapChildren>
          <Tag>Productivity</Tag>
          <Tag>Work</Tag>
          <Tag>Business</Tag>
          <Tag>Woman</Tag>
        </Wrap> */}
      </CardContent>
    </HStack>
  </Box>
);
