import {
  Avatar,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Link as RouteLink } from "react-router-dom";

export const UserProfile = (props) => {
  const { name, image, email,onClick } = props;
  return (
        <RouteLink to="/app/user" onClick={onClick}>
          <HStack spacing="3" ps="2">
            <Avatar
              showBorder={true}
              borderColor={"accent.500"}
              borderWidth="2px"
              name={name}
              src={image}
              boxSize="10"
              bg="white"
              padding="1"
            />
            <Box>
              <Text fontWeight="medium" fontSize="sm">
                {name}
              </Text>
              <Text color="muted" fontSize="sm">
                Perfil de Usuario | Ajustes
              </Text>
            </Box>
          </HStack>
        </RouteLink>
  );
};
