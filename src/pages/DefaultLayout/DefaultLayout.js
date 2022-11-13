import {
  Flex,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const DefaultLayout = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const toast = useToast();
  let auth = useAuth();

  React.useEffect(() => {
    props.getUserProfile();
  }, []);

  React.useEffect(() => {
    if (props.userFeedback) {
      toast(props.userFeedback);
      props.resetToast();
    }
  }, [props.userFeedback]);

  return (
    
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      overflowY="auto"
    >
      {isDesktop ? (
        <Sidebar profile={props.userProfile} />
      ) : (
        <Navbar profile={props.userProfile} />
      )}
      <Outlet />
    </Flex>
  );
};

export default DefaultLayout;