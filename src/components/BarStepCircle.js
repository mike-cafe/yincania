import { Circle, Icon } from '@chakra-ui/react'
import { HiCheck } from 'react-icons/hi'

export const BarStepCircle = (props) => {
  const { isCompleted, isActive } = props

  return (
    <Circle
      size="8"
      bg={isCompleted ? 'brand.300' : 'inherit'}
      borderWidth={isCompleted ? '0' : '2px'}
      borderColor={isActive ? 'brand.300' : 'inherit'}
      // {...props}
    >
      {isCompleted ? (
        <Icon as={HiCheck} color="white" boxSize="5" />
      ) : (
        <Circle bg={isActive ? 'brand.300' : 'border'} size="3" />
      )}
    </Circle>
  )
}