import * as React from "react";
import {
  Stack,
  Center,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  HStack,
  VStack,
  Box,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import StarRatingComponent from "react-star-rating-component";
import { FaStar, FaStarHalf, FaRegStar, FaRegStarHalf } from "react-icons/fa";

export const ResponseDrawer = (props) => {
  const colorBase = useColorModeValue("brand.500", "brand.200");

  const ratingComment = () => {
    switch (props.rating) {
      case(0.5):
      case (1):
        return (
          <Text color="red.600">
            No vuelvo ni obligado
          </Text>
        );
      case(1.5):
      case(2):
        return <Text color="red.600">Bastante mal, no creo que vuelva</Text>
      case (2.5):
      case(3):
        return <Text color="gray">Normalito</Text>
      case(3.5):
        return <Text color="gray">Bien pero sin más</Text>
      case(4.5):
      case(4):
        return <Text color="green.700">Bastante bien</Text>
      case(5):
        return <Text color="green" fontWeight="bold">Me encantó, volveré lo antes posible</Text>
      default:
        return <></>
    }
  };


  const onStarClickHalfStar = (nextValue, prevValue, name, e) => {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }
    props.manageRating(nextValue);
  };

  return (
    <Drawer placement="bottom" isOpen={props.isOpen} onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          {props.isCorrectAnswer ? (
            <>
              <VStack spacing={8} align="flex-start" my={2}>
                <Stack
                  maxW="xs"
                  mx="auto"
                  spacing={{
                    base: "6",
                    md: "10",
                  }}
                >
                  <Center>
                    <Logo height="5" />
                  </Center>

                  <Stack spacing="3" textAlign="center">
                    <Text
                      color="brand.500"
                      fontWeight="extrabold"
                      fontSize={{ base: "5xl", md: "6xl" }}
                      textTransform="uppercase"
                      transform="scale(1.2)"
                    >
                      ¡BIEN!
                    </Text>

                    <Text fontSize="lg">
                      Tú y tu equipo
                      <Box as="span" fontWeight="bold">
                        {" "}
                        podéis pasar al siguiente bar.
                      </Box>
                    </Text>
                  </Stack>
                </Stack>
                <VStack mb={8}>
                <Text width="full" textAlign={"center"}>
                  Dinos que te ha parecido el servicio y la comida{" "}
                </Text>
                <HStack width="full">
                  <Box marginLeft="auto" marginRight="auto">
                    <StarRatingComponent
                      name="app6"
                      starColor="#ffb400"
                      emptyStarColor="#ffb400"
                      value={props.rating}
                      onStarClick={onStarClickHalfStar}
                      renderStarIcon={(index, value) => {
                        if (index <= value) {
                          return <Icon boxSize={8} as={FaStar} />;
                        } else {
                          return <Icon boxSize={8} as={FaRegStar} />;
                        }
                      }}
                      renderStarIconHalf={() => {
                        return (
                          <>
                            <Icon
                              position="absolute"
                              boxSize={8}
                              as={FaStarHalf}
                            />
                            <span>
                              <Icon boxSize={8} as={FaRegStar} />
                            </span>
                          </>
                        );
                      }}
                    />
                  </Box>
                </HStack>
                <Box w="100%" textAlign={"center"} mt="0">
                  {ratingComment()}
                </Box>
                </VStack>
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="brand"
                  size="md"
                  width="100%"
                  onClick={props.onFinish}
                >
                  Siguiente bar
                </Button>
              </VStack>
            </>
          ) : (
            <Stack
              maxW="xs"
              mx="auto"
              py={{
                base: "12",
                md: "16",
              }}
              spacing={{
                base: "6",
                md: "10",
              }}
            >
              <Center>
                <Logo height="5" />
              </Center>
              <Stack spacing="3" textAlign="center">
                <Text
                  color={colorBase}
                  fontWeight="extrabold"
                  fontSize={{ base: "5xl", md: "6xl" }}
                  textTransform="uppercase"
                  transform="scale(1.2)"
                >
                  ¡No, mal!
                </Text>

                <Text fontSize="lg">
                  La respuesta es incorrecta.
                  <Box as="span" fontWeight="bold">
                    Puedes volver a intentarlo en {props.penaltyWait} segundos
                  </Box>
                </Text>
              </Stack>
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
