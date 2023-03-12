import {
  VStack,
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonText,
  LightMode,
  List,
  ListIcon,
  ListItem,
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
    loading,
    isFinished,
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
        bg={`url(${image})`}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPos="center center"
        px="8"
        py="8"
        color={image ? "orange.500" : "orange.50"}
        position="relative"
        borderTop="8px solid #C3672D"
      >
        {isFinished ? (
          <Flex
            bg="brand.500"
            position="absolute"
            right={-20}
            top={6}
            width="240px"
            transform="rotate(45deg)"
            py={2}
            justifyContent="center"
            alignItems="center"
          >
            <Text
              fontSize="xs"
              textTransform="uppercase"
              fontWeight="bold"
              letterSpacing="wider"
              color="white"
            >
              Finished
            </Text>
          </Flex>
        ) : (
          ""
        )}
        <VStack align={"flex-start"} justify={"center"}>
          <Text
            fontSize="3xl"
            lineHeight="1"
            letterSpacing="tight"
            fontWeight={"extrabold"}
            maxW="55%"
            color="brand.500"
          >
            {price}
          </Text>
          <Text textColor="blackAlpha.600" textAlign={"left"} fontWeight="bold">
            {description}
          </Text>
        </VStack>
      </Box>
      {isFinished ? (
        ""
      ) : (
        <Box px="8" pt="10" pb="12" borderBottomWidth="1px">
          <List stylePosition="outside" spacing="4">
            <SkeletonText
              skeletonHeight="12px"
              noOfLines={3}
              spacing="4"
              isLoaded={!loading}
            >
              {features.map((feature, index) => (
                <RutaDetail key={index}>{feature}</RutaDetail>
              ))}
            </SkeletonText>
          </List>
        </Box>
      )}
      <Box px="8" py="6">
        <LightMode>
          <Skeleton
            borderRadius="md"
            startColor="brand.100"
            endColor="brand.400"
            isLoaded={!loading}
          >
            <Button
              onClick={onClick}
              size="lg"
              w="full"
              bgColor="brand.400"
              color="whiteAlpha.900"
              rightIcon={<HiArrowNarrowRight />}
            >
              {isFinished ? "Ver Resultado" : "Jugar"}
            </Button>
          </Skeleton>
        </LightMode>
        <Skeleton
          startColor="gray.100"
          endColor="gray.300"
          mt={4}
          height="12px"
          isLoaded={!loading}
        >
          <Text
            mt="2"
            color={mode("gray.600", "gray.400")}
            align="center"
            fontSize="sm"
          >
            Ruta de la cerveza Reliquia Madrileña
          </Text>
        </Skeleton>
      </Box>
    </Box>
  );
};
