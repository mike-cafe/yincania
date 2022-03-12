import {
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue,
  } from "@chakra-ui/react";
  import * as React from "react";
  import { FiDownloadCloud } from "react-icons/fi";
  import { Card } from "../components/Card";
  import { Navbar } from "../components/Navbar";
  import { Sidebar } from "../components/Sidebar";
  import { RutaCard } from "../components/RutaCard";
  
  export const RutasList = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true });
    return (
      <Flex
        as="section"
        direction={{ base: "column", lg: "row" }}
        height="100vh"
        bg="bg-canvas"
        overflowY="auto"
      >
        {isDesktop ? <Sidebar /> : <Navbar />}
        <Container py="8" pt={24} flex="1">
          <Stack spacing={{ base: "8", lg: "6" }}>
            <Stack
              spacing="4"
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              align={{ base: "start", lg: "center" }}
            >
              <Stack spacing="1">
                <Heading
                  size={useBreakpointValue({ base: "xs", lg: "sm" })}
                  fontWeight="medium"
                >
                  Yincañas
                </Heading>
                <Text color="muted">Juega a tu deporte favorito, ir de bares...</Text>
              </Stack>
              {/* <HStack spacing="3">
                <Button
                  variant="secondary"
                  leftIcon={<FiDownloadCloud fontSize="1.25rem" />}
                >
                  Download
                </Button>
                <Button variant="primary">Create</Button>
              </HStack> */}
            </Stack>
            <Stack spacing={{ base: "5", lg: "6" }}>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
              <RutaCard
              colorScheme="brand"
              name="Cabo de Palos, Murcia"
              price="La Épica Marítima"
              duration=""
              description="24 de junio del 2022"
              features={[
                '7 bares, 7 tapas, 1 ganador',
                '17 equipos apuntados',
                'Termina en Taberna del Destino',
              ]}
              image="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%2070pp.png?alt=media&token=95a79a73-2bb4-4f51-8d84-886092b7dd4f"
            />
                <RutaCard
              colorScheme="brand"
              name="La Latina, Madrid"
              price="Operación Retorno"
              duration=""
              description="4 de septiembre del 2022"
              features={[
                '04/09/2022',
                '5 equipos apuntados',
                'Termina en La Última Tasca',
              ]}
              image="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%20II%2070pp.png?alt=media&token=d4ffb88a-ecdf-4a93-93a0-bbf4a754977b"
            />
              </SimpleGrid>
            </Stack>
            {/* <Card minH="sm" /> */}
          </Stack>
        </Container>
      </Flex>
    );
  };
  