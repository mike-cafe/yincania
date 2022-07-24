import {
  HStack,
  Box,
  Button,
  Stack,
  VStack,
  Flex,
  Text,
  useBreakpointValue,
  Container,
} from "@chakra-ui/react";
import * as React from "react";
import { BarList } from "../components/BarList";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { TeamPlayCard } from "../components/TeamPlayCard";
import { ActionModal } from "../components/ActionModal";
import { ResultsModal } from "../components/ResultsModal";
import { rutaDetail,teamDetail,barList } from "../data";

export const RutasPlayFinish = (props) => {
  const [showQR, setShowQR] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);

  const tapasAction = (pos, isPlayable) => {
    if (!isPlayable) {
      setShowQR(pos);
    } else {
    }
  };

  return (
    <>
      <Container
        mb="24"
      >
        <VStack spacing="8" px="4" py="8" pt="92px" flex="1">
          <VStack color="brand.600" w="100%" spacing={2} align="left">
            <Text fontSize="xl" lineHeight="1" fontWeight="bold">
              {rutaDetail.location}
            </Text>
            <Text
              fontSize="4xl"
              lineHeight="1"
              letterSpacing="tight"
              fontWeight="extrabold"
            >
              {rutaDetail.title}
            </Text>
          </VStack>{" "}
          <HStack
            spacing="4"
            bg="white"
            boxShadow="xl"
            borderRadius="3xl"
            bgPos="right"
            bgRepeat="no-repeat"
            bgImage={rutaDetail.cover}
          >
            <Box
              py="6"
              borderRadius="3xl"
              px="4"
              width="full"
              bg="whiteAlpha.800"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text
                  fontSize="xl"
                  fontWeight="black"
                  color="brand.500"
                  marginEnd="6"
                  letterSpacing="wide"
                >
                  ¡Buen intento!
                </Text>
              </Flex>
              <Stack spacing="1" mt="2">
                <HStack fontSize="lg">
                  <Text color="gray.700" fontWeight="semibold">
                    No ganasteis pero lo importante es participar... ¿no? Más
                    suerte en la siguiente, paquete.
                  </Text>
                </HStack>
              </Stack>
              <Button
                mt="4"
                width="100%"
                variant="outline"
                colorScheme="muted"
                onClick={() => setShowResults(true)}
              >
                Ver Resultados
              </Button>
            </Box>
          </HStack>
          <TeamPlayCard
            finished={true}
            w="100%"
            team={teamDetail}
            rutaId={rutaDetail.id}
            delta={{ isUpwardsTrend: true, value: "+10" }}
            creativity="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/TapapTapas.png?alt=media&token=5eb3599d-0b03-4f8d-8d04-17a53a0ac5b3"
          />
          <BarList completed={true} bars={barList} tapasAction={tapasAction} />
        </VStack>
      </Container>
      {showQR !== 0 ? (
        <ActionModal barNumber={showQR} onClose={() => setShowQR(0)}>
          {" "}
        </ActionModal>
      ) : (
        ""
      )}
      {showResults ? (
        <ResultsModal barNumber={0} onClose={() => setShowResults(false)}>
          {" "}
        </ResultsModal>
      ) : (
        ""
      )}
    </>
  );
};
