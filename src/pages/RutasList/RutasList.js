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
import { EmptyRutasState } from "../../components/EmptyRutasState";

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
  let navigate = useNavigate();
  const [openRoutes, setOpenRoutes] = React.useState();
  React.useEffect(() => {
    props.getRoutesData();
    props.getUserProfile();
  }, []);

  React.useEffect(() => {
    if (props.userProfile && props.routes) {
      setOpenRoutes(
        props.routes.filter((route) => {
          return (
            props.userProfile.routes
              .map((r) => r.id)
              .some((element) => element === route.id) ||
            route.status === "open"
          );
        })
      );
    }
  }, [props.userProfile, props.routes]);

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
            {openRoutes ? (
              openRoutes?.length > 0 ? (
                openRoutes?.map((ruta) => {
                  return (
                    <RutaCard
                      key={ruta.id}
                      loading={false}
                      colorScheme="brand"
                      name={ruta.location}
                      price={ruta.title}
                      hasJoined={props.userProfile.routes.findIndex((x)=>x.id==ruta.id)>-1}
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
                      status={ruta.status}
                    />
                  );
                })
              ) : (
                <EmptyRutasState />
              )
            ) : (
              <RutaCard
                colorScheme="brand"
                name={""}
                price={""}
                duration=""
                description=""
                features={["", "", ""]}
                image={""}
                onClick={() => ""}
                isFinished={false}
                loading={true}
              />
            )}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  );
};

export default RutasList;
