import * as React from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import {
  Link,
  Spacer,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  StackDivider,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RadioCardGroup,RadioCard } from "../../components/RadioCardGroup";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link as RouteLink } from "react-router-dom";
import { avatarOptions } from "../../data";
import { useAuth } from "../../contexts/AuthContext";

const UserProfile = (props) => {
  // no cambia el choice del grupo de radio.
  const [avatarChoice,setAvatarChoice] = React.useState()
  React.useEffect(()=>props.getUserProfile(),[])
  
  let avatarFormControl;

  if( avatarChoice){
    avatarFormControl = <FormControl id="avatar">
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={{ base: "1.5", md: "8" }}
      justify="space-between"
    >
      <FormLabel variant="inline">Avatar</FormLabel>
      <Stack
        spacing={{ base: "3", md: "5" }}
        direction={{ base: "column", sm: "row" }}
        width="full"
        maxW={{ md: "3xl" }}
      >
        <RadioCardGroup defaultValue={avatarChoice} spacing="3">
          {avatarOptions.map((option,idx) => (
            <RadioCard
              key={option.name}
              value={option.name}
              decor={option.decor}
              subtitle={option.name}
            >
              <Text
                color="emphasized"
                fontWeight="medium"
                fontSize="sm"
              >
                Option {option.name}
              </Text>
            </RadioCard>
          ))}
        </RadioCardGroup>
      </Stack>
    </Stack>
  </FormControl>
  }else{
    avatarFormControl = "";
  }
  
  React.useEffect(()=>{
    if(props.userProfile?.avatar){
      setAvatarChoice(props.userProfile.avatar);
    }
  },[props.userProfile])

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
                Tu Perfil de Usario
              </Text>
              <Text color="muted" fontSize="sm">
                Tu personalidad en el bar.
              </Text>
            </Box>
            <Button variant="primary" alignSelf="start">
              <Link as={RouteLink} to="/app/routes">
              Guardar
              </Link>
            </Button>
          </Stack>
          <Divider />
          <Stack spacing="5" divider={<StackDivider />}>
            <FormControl id="name">
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline">Name</FormLabel>
                <Input maxW={{ md: "3xl" }} defaultValue={props.userProfile?.name} />
              </Stack>
            </FormControl>
            <FormControl id="username">
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline">Nombre de Ususario</FormLabel>
                <Input maxW={{ md: "3xl" }} defaultValue={props.userProfile?.username} />
              </Stack>
            </FormControl>

            {avatarFormControl}
            {/* <FormControl id="avatar">
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline">Avatar</FormLabel>
                <Stack
                  spacing={{ base: "3", md: "5" }}
                  direction={{ base: "column", sm: "row" }}
                  width="full"
                  maxW={{ md: "3xl" }}
                >
                  <RadioCardGroup defaultValue={avatarChoice} spacing="3">
                    {avatarOptions.map((option,idx) => (
                      <RadioCard
                        key={option.name}
                        value={option.name}
                        decor={option.decor}
                        subtitle={option.name}
                      >
                        <Text
                          color="emphasized"
                          fontWeight="medium"
                          fontSize="sm"
                        >
                          Option {option.name}
                        </Text>
                      </RadioCard>
                    ))}
                  </RadioCardGroup>
                </Stack>
              </Stack>
            </FormControl> */}
            <FormControl id="email">
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline">Email</FormLabel>
                <Input
                  type="email"
                  maxW={{ md: "3xl" }}
                  defaultValue={props.userProfile?.email}
                  disabled={true}
                />
              </Stack>
            </FormControl>
            <Flex direction="row-reverse">
              <Button variant="primary">
                <Link as={RouteLink} to="/app/routes">
                Guardar
                </Link>
                </Button>
              <Spacer></Spacer>
              <Button leftIcon={<DeleteIcon />} variant="ghost" colorScheme="gray" color="gray.400">Eliminar Cuenta</Button>
            </Flex>
          </Stack>
        </Stack>
      </Container>
  );
};

export default UserProfile