import {
  Circle,
  HStack,
  VStack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ActionTrail } from "../components/ActionTrail";
import { TutorialStep } from "../components/TutorialStep";

export const Tutorial = () => {
  let navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = React.useState(0);
  
  const steps = [
    {
      description:
        "Ruta de bares cronometrada con una tapa y una prueba a superar en cada bar. Si tu equipo llega el primero al último bar, ¡ganará premios!.",
      title: "¿Qué es una Yincaña?",
      stepImage:
        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%2070pp.png?alt=media&token=95a79a73-2bb4-4f51-8d84-886092b7dd4f",
    },
    {
      description:
        "Verás la fecha de la Yincaña y las horas a la que estará activa. Dentro de ese rango de horas podrás realizar la Yincaña. No importa cuando empieces, importa cuanto tardas en acabarla.",
      title: "¿Cómo apuntarse?",
      stepImage:
        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%2070pp.png?alt=media&token=95a79a73-2bb4-4f51-8d84-886092b7dd4f",
    },
    {
      description:
        "Recuerda, cuantos más seáis más difícil será poneros de acuerdo y superar las pruebas. Quedate solo con los mejores Tappers!",
      title: "¿Con quien quieres jugar?",
      stepImage:
        "https://firebasestorage.googleapis.com/v0/b/react-coffee-a2736.appspot.com/o/Yincania%20Ilustration%2070pp.png?alt=media&token=95a79a73-2bb4-4f51-8d84-886092b7dd4f",
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
          spacing="4"
          mt="8"
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
