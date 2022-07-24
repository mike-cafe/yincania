import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { RutaCard } from "../../components/RutaCard";
import { useNavigate } from "react-router-dom";

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const RutasList = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  let navigate = useNavigate();

  React.useEffect(() => {
    props.getRoutesData();
  }, []);

  return (
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
              <Text color="muted">
                Juega a tu deporte favorito, ir de bares...
              </Text>
            </Stack>
          </Stack>
          <Stack spacing={{ base: "5", lg: "6" }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
              {props.routes ? (
                props.routes?.map((ruta) => {
                  return (
                    <RutaCard
                      key={ruta.id}
                      loading={false}
                      colorScheme="brand"
                      name={ruta.location}
                      price={ruta.title}
                      duration=""
                      description={`${ruta.date.toDate().getDate()} de ${
                        months[ruta.date.toDate().getMonth()]
                      } de ${ruta.date.toDate().getFullYear()}`}
                      features={[
                        `${ruta.barCounter} bares, ${ruta.tapasCounter} tapas, 1 ganador`,
                        `${ruta.teamCounter} equipos apuntados`,
                        `Termina en ${ruta.final.name}`,
                      ]}
                      image={ruta.cover}
                      onClick={() => {
                        if (ruta.status === "started") {
                          navigate("/app/play/" + ruta.id);
                        } else if (ruta.status === "finished") {
                          navigate("/app/finished/" + ruta.id);
                        } else {
                          navigate("/app/detail/" + ruta.id);
                        }
                      }}
                      isFinished={ruta.status === "finished" ? true : false}
                    />
                  );
                })
              ) : (
                <RutaCard 
                colorScheme="brand"
                name={""}
                price={""}
                duration=""
                description=""
                features={[
                  "",
                  "",
                  "",
                ]}
                image={""}
                onClick={()=>""}
                isFinished={false}
                loading={true} />
              )}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
  );
};

export default RutasList;
