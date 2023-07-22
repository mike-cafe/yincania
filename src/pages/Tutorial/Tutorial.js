import {
  Circle,
  HStack,
  VStack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ActionTrail } from "../../components/ActionTrail";
import { TutorialStep } from "../../components/TutorialStep";
import { userData } from "../../store/actions/SignIn";
import { getUserProfile } from "../../store/actions/UserProfile";

const Tutorial = (props) => {
  let navigate = useNavigate();

  const [currentStep, setCurrentStep] = React.useState(0);
  const [saved,setSaved] = React.useState(false)

  React.useEffect(()=>{
    if(!props.user){
      props.getUserProfile()
    }
  },[])


  React.useEffect(()=>{
    if(props.user){
      if(!saved){
        props.saveUserData({tutorial:true,uid:props.user.uid})
        setSaved(true)
      }
    }
  },[props.user])

  const steps = [
    {
      description:
        "Ruta de bares cronometrada con una tapa y una prueba a superar en cada bar. Si tu equipo llega el primero al último bar, ¡ganará premios!.",
      title: "¿Qué es una Yincaña?",
      stepImage:
        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Tutorial%201.png?alt=media&token=6e861c6a-f496-4c3c-922d-42e333b4fcce",
    },
    {
      description:
        "Verás la fecha y hora de la Yincaña, dentro de ese rango de horas podrás jugar la Yincaña. No importa cuando empieces, importa cuanto tardas en acabarla.",
      title: "¿Cómo apuntarse?",
      stepImage:
        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Tutorial%202.png?alt=media&token=719b24ae-be97-4a6b-8bff-0a6d05709606",
    },
    {
      description:
        "Recuerda, cuantos más seáis más difícil será poneros de acuerdo y superar las pruebas. Quedate solo con los mejores Tappers!",
      title: "¿Con quien quieres jugar?",
      stepImage:
        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Tutorial%203.png?alt=media&token=142a38e3-1e4b-485d-a9f7-31a2f1e3858d",
    },
  ];

  const goPlay = () =>{
    navigate("/app/routes");
  }

  const addStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const reduceStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <VStack
      as="section"
      height="calc(100vh - 96px)"
      overflowY="hidden"
      mb="24"
    >
      {steps.map((current, idx) => (
        <TutorialStep
          key={idx}
          isVisible={currentStep === idx}
          description={current.description}
          title={current.title}
          stepImage={current.stepImage}
        />
      ))}
      <ActionTrail
        backButton={currentStep !== 0}
        secondAction="Volver"
        firstAction={currentStep !== 2? "Siguiente": "A jugar!"}
        mainClick={currentStep !== 2? addStep : goPlay}
        backClick={reduceStep}
      >
        <HStack
          justify="center"
          spacing="2"
          color={mode("gray.300", "gray.600")}
        >
          <Circle
            size={currentStep === 0 ? 3 : 2}
            bg={currentStep === 0 ? "brand.500" : "currentColor"}
          />
          <Circle
            size={currentStep === 1 ? 3 : 2}
            bg={currentStep === 1 ? "brand.500" : "currentColor"}
          />
          <Circle
            size={currentStep === 2 ? 3 : 2}
            bg={currentStep === 2 ? "brand.500" : "currentColor"}
          />
        </HStack>
      </ActionTrail>
    </VStack>
  );
};

export default Tutorial;
