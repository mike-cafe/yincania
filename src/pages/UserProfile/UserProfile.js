import * as React from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { UserForm } from "../../components/UserForm";

const UserProfile = (props) => {

  const auth = useAuth();

  React.useEffect(() => props.getUserProfile(), []);

  return (
    <Container pt="92px">
      <Stack spacing="5">
        <Stack
          spacing="4"
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
        >
          <Box>
            <Text fontSize="lg" fontWeight="medium">
              Tu Perfil de Usuario
            </Text>
            <Text color="muted" fontSize="sm">
              Tu personalidad en el bar.
            </Text>
          </Box>
        </Stack>
        <Divider />

        {props.userProfile?.avatar && (
          <UserForm
            avatar={props.userProfile?.avatar}
            name={props.userProfile?.name}
            username={props.userProfile?.username}
            email = {props.userProfile?.email}
            owner={auth.currentUser?.uid}
            route={props.id}
            saveUser={props.saveUserProfile}
            uid={props.userProfile?.uid}
          />
        )}
      </Stack>
    </Container>
  );
};

export default UserProfile;
