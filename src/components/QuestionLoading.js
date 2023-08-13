import { Box, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import * as React from "react";

const QuestionLoading = (props) => {
  return (
    <Box
      w="100%"
      bg="bg.canvas"
      px="4"
      py="6"
      mb={4}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
    >
      <Flex>
        <Skeleton width="30%" mb={1} height="14px" />
        <SkeletonCircle
          ml="auto"
          startColor="gray.50"
          endColor="gray.400"
          size="4"
        />
      </Flex>
      <Skeleton width="90%" height="12px" />
    </Box>
  );
};

export default QuestionLoading;
