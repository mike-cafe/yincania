import * as React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";

export const ShareDrawer = (props) => (
  <Drawer placement="bottom" isOpen={props.isOpen} onClose={props.onClose}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">Invitación a Equipo</DrawerHeader>
      <DrawerBody>
        <VStack spacing={4} align="flex-start" my={2}>
          <p>
            Comparte el código del equipo para que tus amigos se puedan unir{" "}
          </p>
          <HStack spacing={6}>
            <WhatsappShareButton
              title="Únete a mi equipo para una Yincaña que empezará próximamente..."
              url={`https://${window.location.host}/app/join/team?code=${props.teamCode}`}
            >
              <WhatsappIcon size={48} round={true} />
            </WhatsappShareButton>
            {/* <TwitterShareButton
              url={`https://${window.location.host}/app/join/team?code=${props.teamCode}`}
            >
              <TwitterIcon size={48} round={true} />
            </TwitterShareButton>
            <TelegramShareButton
              url={`https://${window.location.host}/app/join/team?code=${props.teamCode}`}
            >
              <TelegramIcon size={48} round={true} />
            </TelegramShareButton> */}
          </HStack>
        </VStack>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);
