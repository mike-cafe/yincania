import { Box, Center, Container, Stack } from '@chakra-ui/react'
import * as React from 'react'
import { steps } from './data'
import { BarStep } from './BarStep'
import { useStep } from './useStep'

export const BarList = () => {
  const [currentStep, { setStep }] = useStep({
    maxStep: steps.length,
    initialStep: 2,
  })
  return (
    <Box width="100%" bg="bg-surface" boxShadow="base" borderRadius="lg">
      <Container
        py={{
          base: '4',
          md: '8',
        }}
      >
          <Stack spacing="0">
            {steps.map((step, id) => (
              <BarStep
                key={id}
                cursor="pointer"
                onClick={() => setStep(id)}
                title={step.title}
                description={step.description}
                isActive={currentStep === id}
                isCompleted={currentStep > id}
                isLastStep={steps.length === id + 1}
              />
            ))}
          </Stack>
      </Container>
    </Box>
  )
}