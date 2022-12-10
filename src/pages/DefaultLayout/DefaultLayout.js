import { Flex, useBreakpointValue, useToast } from "@chakra-ui/react";
import * as React from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";

const DefaultLayout = (props) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const toast = useToast();
  let params = useParams();
  let [searchParams] = useSearchParams();
  let location = useLocation();
  const [backButton, setBackButton] = React.useState();
  
  React.useEffect(
    ()=>{
      let match = location.pathname.match(
        /(app[/]routes)|(app[/]detail)|(view[/]team)|(create[/]team)|(join[/]team)|(app[/]play)/g
      );
      if(match && props.userProfile){
        switch (match[0]) {
          case "app/routes":
            setBackButton(null);
            break;
          case "app/detail":
            setBackButton("/app/routes/");
            break;
          case "view/team":
            let url = -1;
            let routeId = searchParams.get("routeId") || "/app/routes/"
            if(routeId){
              let url = `/app/detail/${searchParams.get("routeId")}`
            }
            setBackButton(url);
            break;
          case "create/team":
            setBackButton(null);
            break;
          case "join/team":
            setBackButton(`/app/detail/${searchParams.get("routeId")}`);
            break;
          case "app/play":
            setBackButton("/app/routes");
            break;
          default:
            setBackButton(null);
        }
      }else{
        setBackButton(null);
      }
    },[location.pathname,props]
  ) 

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
        <Sidebar profile={props.userProfile} close={()=>{}} />
      ) : (
        <Navbar backButton={backButton} profile={props.userProfile} />
      )}
      <Outlet />
    </Flex>
  );
};

export default DefaultLayout;
