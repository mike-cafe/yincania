import { Link, Button, HStack, Icon, Text } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import * as React from "react";

export const NavButton = (props) => {
  const { icon, label, path, ...buttonProps } = props;

  return (
    <Button variant="ghost" justifyContent="start" {...buttonProps}>
        <Link as={RouteLink} to={path}>
      <HStack spacing="3">
          <Icon as={icon} boxSize="6" color="subtle" />
          <Text
            color="subtle"
            fontWeight={props["aria-current"] ? "bold" : "normal"}
          >
            {label}
          </Text>
      </HStack>
        </Link>
    </Button>
  );
};
