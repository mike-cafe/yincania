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

export const RateDrawer = (props) => (
  <Drawer placement="bottom" isOpen={props.isOpen} onClose={props.onClose}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">Puntúa el Bar</DrawerHeader>
      <DrawerBody>
        <VStack spacing={4} align="flex-start" my={2}>
          <p>
            Dinos que te ha parecido el servicio y la comida{" "}
          </p>
          <HStack spacing={6}>
            <p>1 al 5</p>
          </HStack>
        </VStack>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);
