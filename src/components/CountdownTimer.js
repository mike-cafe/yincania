import { ScaleFade, Box, Text, Progress, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({
  targetDate,
  onCompletion,
  totalCooldownTime,
}) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetTime = targetDate.getTime();
    const timeLeft = targetTime - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    if (
      timeLeft.days == 0 &&
      timeLeft.hours == 0 &&
      timeLeft.minutes == 0 &&
      timeLeft.seconds == 0
    ) {
      clearInterval(intervalId);
      onCompletion();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!intervalId) {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      setIntervalId(interval);
      return () => clearInterval(interval);
    } else {
      clearInterval(intervalId);
    }
  }, []);

  return (
      <Box bgColor="orange" px={8} py={6} mx={-8}>
        <VStack>
          <Text
            color="blackAlpha.800"
            textAlign="center"
            fontWeight={"bold"}
            fontSize={"lg"}
          >
            Tenéis que esperar para poder jugar la partida
          </Text>
          <Text>
            {timeLeft.minutes} minutos {timeLeft.seconds} segundos
          </Text>
        </VStack>
        <Progress
          mt={2}
          hasStripe
          value={
            100 -
            ((timeLeft.minutes * 60 + timeLeft.seconds) / totalCooldownTime) *
              100
          }
          colorScheme="orange"
        />
      </Box>
  );
};

export default CountdownTimer;
