import {
  Box,
  BoxProps,
  Button,
  Flex,
  FlexProps,
  LightMode,
  List,
  ListIcon,
  ListItem,
  ListItemProps,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { HiArrowNarrowRight, HiCheckCircle } from "react-icons/hi";

const RutaDisplay = (props) => {
  const { currency, price, duration, ...rest } = props;
  return (
    <Flex w="100%" align="center" fontWeight="extrabold" {...rest}>
      <Text fontSize="xl" lineHeight="1">
        {currency}
      </Text>
      <Text fontSize="3xl" lineHeight="1" letterSpacing="tight">
        {price}
      </Text>
      <Text fontSize="lg" marginStart="1" alignSelf="flex-end">
        {duration}
      </Text>
    </Flex>
  );
};

const RutaDetail = (props) => {
  const { children, ...rest } = props;
  return (
    <ListItem display="flex" alignItems="center" fontWeight="medium" {...rest}>
      <ListIcon
        fontSize="2xl"
        as={HiCheckCircle}
        color="blue.400"
        marginEnd="4"
        mt="1"
      />
      <Text as="span" display="inline-block">
        {children}
      </Text>
    </ListItem>
  );
};

export const RutaCard = (props) => {
  const {
    features,
    name,
    description,
    onClick,
    price,
    duration,
    colorScheme: c,
    image,
    ...rest
  } = props;
  return (
    <Box
      bg={mode("white", "gray.700")}
      shadow="md"
      w="full"
      maxW="lg"
      mx="auto"
      rounded="lg"
      overflow="hidden"
      {...rest}
    >
      <Box
        bg={image? `url(${image})` : "orange.500"}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPos="center center"
        px="8"
        py="8"
        color={image? "orange.500":"orange.50"}
      >
        <Text fontWeight="bold" fontSize="lg" >
          {name}
        </Text>
        <RutaDisplay my="2" currency="" price={price} duration={duration} />
        <Text>{description}</Text>
      </Box>
      <Box px="8" pt="10" pb="12"  borderBottomWidth="1px">
        <List stylePosition="outside" spacing="4">
          {features.map((feature, index) => (
            <RutaDetail key={index}>{feature}</RutaDetail>
          ))}
        </List>
      </Box>
      <Box px="8" py="6">
        <LightMode>
          <Button
            onClick={onClick}
            size="lg"
            w="full"
            colorScheme={c}
            rightIcon={<HiArrowNarrowRight />}
          >
            Participar
          </Button>
        </LightMode>
        <Text
          mt="2"
          color={mode("gray.600", "gray.400")}
          align="center"
          fontSize="sm"
        >
          Diviérte y gana premios
        </Text>
      </Box>

    </Box>
  );
};
