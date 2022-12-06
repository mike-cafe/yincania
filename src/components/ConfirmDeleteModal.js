import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Button,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "./Logo";

export const ConfirmDeleteModal = (props) => {
  const { onClose, penaltyWait } = props;

  return (
      <Modal isOpen={true} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx="4">
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
          <ModalBody>
          <Text>Lorem ipsum,Lorem ipsum,Lorem ipsum,</Text>
                
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
};
