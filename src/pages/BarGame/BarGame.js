import {
  Container,
  Center,
  Box,
  VStack,
  Flex,
  Text,
  Alert,
  AlertIcon,
  useColorModeValue as mode,
  useBreakpointValue,
  Skeleton,
} from "@chakra-ui/react";
import * as React from "react";
import { CorrectResponseModal } from "../../components/CorrectResponseModal";
import { WrongResponseModal } from "../../components/WrongResponseModal";
import { ActionTrail } from "../../components/ActionTrail";
import QuestionLoading from "../../components/QuestionLoading";

import {
  RadioQuestion,
  RadioQuestionGroup,
} from "../../components/RadioQuestionGroup copy";
import { useNavigate, useParams } from "react-router-dom";

const BarGame = (props) => {
  const params = useParams();
  const [currentAnswer, setCurrentAnswer] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [penalty, setPenalty] = React.useState(false);
  const [seconds, setSeconds] = React.useState();
  const [intervalId, setIntervalId] = React.useState();
  const handleAnswer = (value) => setCurrentAnswer(value);
  const handleFinish = () => {
    props.saveAnswer({
      team: params.team,
      game: params.game,
    });
  };
  const chooseModal = () => {
    if (
      showModal &&
      currentAnswer === props.game?.answers[props.game?.correct - 1]
    ) {
      return (
        <CorrectResponseModal
          saving={props.game?.loading}
          onFinish={handleFinish}
        />
      );
    } else if (showModal) {
      return (
        <WrongResponseModal
          penaltyWait={seconds}
          onClose={() => setShowModal(false)}
        />
      );
    } else {
      return "";
    }
  };

  let navigate = useNavigate();

  React.useEffect(() => {
    if (
      showModal &&
      currentAnswer !== props.game?.answers[props.game?.correct - 1]
    ) {
      setPenalty(true);
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      setIntervalId(interval);
    }
  }, [showModal]);

  React.useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalId);
      setPenalty(false);
      setSeconds(props.game?.penalty);
      setShowModal(false);
    }
  }, [seconds]);

  React.useEffect(() => props.getBarGameData(params.game), []);
  React.useEffect(() => setSeconds(props.game?.penalty), [props.game]);
  React.useEffect(() => {
    if (props.saved) {
      navigate("/app/play/" + props.game?.route + "?game="+params.game);
      props.resetGame()
    }
  }, [props.saved]);
  return (
    <>
      <Container mb="24">
        <VStack spacing="8" px="4" py="8" pt="92px" flex="1">
          <Center w="100%">
            <Skeleton
              height="18px"
              width={!props.loading ? "100%" : "75%"}
              isLoaded={!props.loading}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                letterSpacing="tight"
                marginEnd="6"
                textAlign="center"
              >
                {props.game?.question}
              </Text>
            </Skeleton>
          </Center>
          {!props.loading || (
            <Container>
              <QuestionLoading />
              <QuestionLoading />
              <QuestionLoading />
              <QuestionLoading />
            </Container>
          )}
          <Box
            w="100%"
            as="section"
            bg="bg-surface"
            py={{ base: "4", md: "8" }}
            mt={10}
          >
            <Container maxW="xl">
              <RadioQuestionGroup
                defaultValue={"0"}
                spacing="3"
                onChange={handleAnswer}
              >
                {props.game?.answers.map((option, idx) => (
                  <RadioQuestion key={idx} value={option}>
                    <Text color="emphasized" fontWeight="medium" fontSize="sm">
                      Opción {idx + 1}
                    </Text>
                    <Text color="muted" fontSize="sm">
                      {option}
                    </Text>
                  </RadioQuestion>
                ))}
              </RadioQuestionGroup>
            </Container>
          </Box>

          <Alert status="warning">
            <AlertIcon />
            {props.game?.tip}
          </Alert>
          <ActionTrail
            secondVariant="ghost"
            secondAction="Volver"
            firstAction={penalty ? `Espera... ${seconds}` : "Enviar"}
            backButton={true}
            mainClick={() => setShowModal(true)}
            backClick={() => navigate("/app/play/" + props.game?.route)}
            firstDisabled={penalty}
          />
        </VStack>
      </Container>
      {chooseModal()}
    </>
  );
};

export default BarGame;
