import {
  Badge,
  Box,
  Image,
  Center,
  Button,
  Divider,
  Heading,
  VStack,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiMoreVertical,
} from "react-icons/fi";

export const StatLight = (props) => {
  const { label, value, delta,creativity, ...boxProps } = props;
  return (
    <Box
      bg="bg-surface"
      borderRadius="lg"
      textAlign="center"
      w="100%"
      shadow="base"
      {...boxProps}
    >
      <Box
        px="4"
        py="2"
      >
        <Stack>
          <Center mx="auto" boxSize="64px">
            <Image
              src={creativity}
              alt="Ruta de Tapas, La Épica Marítima"
            />
            </Center>
          <VStack justify="center" spacing="0.5">
            <Text fontSize="sm" color="muted">
              {label}
            </Text>
            {/* <Icon as={FiMoreVertical} boxSize="5" color="muted" /> */}
            <Heading size="xs">
              {value}
            </Heading>
            {/* <Badge
              variant="subtle"
              colorScheme={delta.isUpwardsTrend ? "green" : "red"}
            >
              <HStack spacing="1">
                <Icon
                  as={delta.isUpwardsTrend ? FiArrowUpRight : FiArrowDownRight}
                />
                <Text>{delta.value}</Text>
              </HStack>
            </Badge> */}
          </VStack>
        </Stack>
      </Box>
      {/* <Divider />
      <Box
        px={{
          base: '4',
          md: '6',
        }}
        py="4"
      >
        <Button variant="link" colorScheme="blue" size="sm">
          Learn more
        </Button>
      </Box> */}
    </Box>
  );
};
