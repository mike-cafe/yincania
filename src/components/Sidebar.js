import {
  Divider,
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import {
  FiHelpCircle,
  FiHome,
  FiShare2,
} from 'react-icons/fi'
import { avatarOptions } from '../data'
import { Logo } from './Logo'
import { NavButton } from './NavButton'
import { UserProfile } from './UserProfile'

export const Sidebar = (props) => {
  
  const [avatar,setAvatar] = React.useState(); 
  React.useEffect(() => {
    if(props.profile?.avatar){
      setAvatar(avatarOptions.filter((opt)=>opt.name===props.profile.avatar)[0].decor,[props.profile])
    }
  }, [props.profile]);
  return (
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
            <NavButton path="/app/routes" label="Yincañas" icon={FiHome} aria-current="page"/>
          </Stack>
        </Stack>
        <Stack
          spacing={{
            base: '5',
            sm: '6',
          }}
        >
          <Stack spacing="1">
            <NavButton path="/tutorial" label="Ayuda" icon={FiHelpCircle} />
            <NavButton path="/app/routes" label="Compartir" icon={FiShare2} />
          </Stack>
          <Divider />
          <UserProfile
            name={props.profile?.name}
            image={avatar}
            email={props.profile?.email}
          />
        </Stack>
      </Stack>
    </Flex>
  </Flex>
)}