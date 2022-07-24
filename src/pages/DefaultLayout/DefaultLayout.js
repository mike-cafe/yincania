import {
    Flex,
    useBreakpointValue,
  } from "@chakra-ui/react";
  import * as React from "react";
  import { Navbar } from "../../components/Navbar";
  import { Sidebar } from "../../components/Sidebar";
  import { Outlet } from "react-router-dom";
 
  
  const DefaultLayout = (props) => {
    const isDesktop = useBreakpointValue({ base: false, lg: true });  
    React.useEffect(() => {
      props.getUserProfile();
    }, []);
  
    return (
      <Flex
        as="section"
        direction={{ base: "column", lg: "row" }}
        height="100vh"
        overflowY="auto"
      >
        {isDesktop ? <Sidebar profile={props.userProfile}/> : <Navbar profile={props.userProfile}/>}
        <Outlet />
      </Flex>
    );
  };
  
  export default DefaultLayout;
  