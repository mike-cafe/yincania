import { Divider, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { FiHelpCircle, FiHome, FiInfo, FiLogOut, FiShare2 } from "react-icons/fi";
import useVH from "react-viewport-height";
import { useAuth } from "../contexts/AuthContext";
import { avatarOptions } from "../data";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";

export const Sidebar = (props) => {
  const { logout } = useAuth();
  const [avatar, setAvatar] = React.useState();

  React.useEffect(() => {
    if (props.profile?.avatar) {
      setAvatar(
        avatarOptions.filter((opt) => opt.name === props.profile.avatar)[0]
          .decor,
        [props.profile]
      );
    }
  }, [props.profile]);
  const vh = useVH();
  return (
    <Flex as="section" style={{ minHeight: `${100 * vh}px` }} bg="bg.canvas" zIndex="9999">
      <Flex
        flex="1"
        bg="bg.canvas"
        overflowY="auto"
        boxShadow={useColorModeValue("sm", "sm-dark")}
        maxW={{
          base: "full",
          sm: "xs",
        }}
        py={{
          base: "6",
          sm: "8",
        }}
        px={{
          base: "4",
          sm: "6",
        }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack
            spacing={{
              base: "5",
              sm: "6",
            }}
            shouldWrapChildren
          >
            <Logo />
            <Stack spacing="1">
              <NavButton
                path="/app/routes"
                label="Yincañas"
                icon={FiHome}
                aria-current="page"
                onClick={()=>props.close()}
              />
            </Stack>
          </Stack>
          <Stack
            spacing={{
              base: "2",
              sm: "3",
            }}
          >
            <Stack spacing="1">
              {/* <NavButton path="/app/routes" label="Compartir" icon={FiShare2} onClick={()=>props.close()}/> */}
            </Stack>
            <Divider />
            <UserProfile
              name={props.profile?.name}
              image={avatar}
              email={props.profile?.email}
              onClick={()=>{
                props.close()
              }
              }
            />
            <NavButton path="/tutorial" label="Tutorial" icon={FiInfo} onClick={()=>props.close()}/> 
            <NavButton
                path="/"
                onClick={()=>logout}
                label="Cerrar sesión"
                icon={FiLogOut}
              />
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
