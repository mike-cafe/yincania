import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import * as React from 'react'
import { Logo } from './Logo'
import { Sidebar } from './Sidebar'
import { ToggleButton } from './ToggleButton'

export const Navbar = (props) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  
  return (
    <Box
      width="full"
      py="4"
      px={{ base: '4', md: '8' }}
      bg="bg-surface"
      borderBottom="1px"
      borderBottomColor="blackAlpha.200"
      position="fixed"
      zIndex="999"
    >
      <Flex justify="space-between">
        <Logo />
        <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap
          // Only disabled for showcase
          trapFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar profile={props.profile}/>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  )
}