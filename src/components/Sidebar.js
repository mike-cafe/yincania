import { Icon } from '@chakra-ui/icons'
import {
  Divider,
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import {
  FiBarChart2,
  FiBookmark,
  FiCheckSquare,
  FiHelpCircle,
  FiHome,
  FiSearch,
  FiSettings,
  FiShare,
  FiShare2,
  FiUsers,
} from 'react-icons/fi'
import { Logo } from './Logo'
import { NavButton } from './NavButton'
import { UserProfile } from './UserProfile'

export const Sidebar = () => (
  <Flex as="section" minH="100vh" bg="bg-canvas" zIndex="9999">
    <Flex
      flex="1"
      bg="bg-surface"
      overflowY="auto"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      maxW={{
        base: 'full',
        sm: 'xs',
      }}
      py={{
        base: '6',
        sm: '8',
      }}
      px={{
        base: '4',
        sm: '6',
      }}
    >
      <Stack justify="space-between" spacing="1">
        <Stack
          spacing={{
            base: '5',
            sm: '6',
          }}
          shouldWrapChildren
        >
          <Logo />
          <Stack spacing="1">
            <NavButton label="Yincañas" icon={FiHome} aria-current="page"/>
            <NavButton label="Historial" icon={FiBarChart2}  />
          </Stack>
        </Stack>
        <Stack
          spacing={{
            base: '5',
            sm: '6',
          }}
        >
          <Stack spacing="1">
            <NavButton label="Ayuda" icon={FiHelpCircle} />
            <NavButton label="Compartir" icon={FiShare2} />
          </Stack>
          {/* <Box bg="bg-subtle" px="4" py="5" borderRadius="lg">
            <Stack spacing="4">
              <Stack spacing="1">
                <Text fontSize="sm" fontWeight="medium">
                  Almost there
                </Text>
                <Text fontSize="sm" color="muted">
                  Fill in some more information about you and your person.
                </Text>
              </Stack>
              <Progress value={80} size="sm" aria-label="Profile Update Progress" />
              <HStack spacing="3">
                <Button variant="link" size="sm">
                  Dismiss
                </Button>
                <Button variant="link" size="sm" colorScheme="blue">
                  Update profile
                </Button>
              </HStack>
            </Stack>
          </Box> */}
          <Divider />
          <UserProfile
            name="Eduardo Manos Tijeras"
            image="https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/CheeseAvatar.png?alt=media&token=6a2f1a00-4532-480e-9734-0953791fcba3"
            email="edu@tapap.es"
          />
        </Stack>
      </Stack>
    </Flex>
  </Flex>
)