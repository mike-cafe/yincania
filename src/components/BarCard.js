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
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { BarAvatar } from "./BarAvatar";

export const BarCard = (props) => (
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
        name={props.barDetail.name}
        src={props.barDetail.cover}
      />
      <CardContent>
        <Text color="muted">
          {props.barDetail.isLast? "Bar Final":""}
        </Text>
        <CardHeader title={props.barDetail.name} />
        <Stack spacing="1" mt="2">
          <HStack fontSize="sm">
            <Icon as={GoLocation} color="gray.500" />
            <Text>{props.barDetail.location}</Text>
          </HStack>
        </Stack>
      </CardContent>
    </HStack>
  </Box>
);
