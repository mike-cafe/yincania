import {
  Box,
  Circle,
  Text,
  Image,
  createIcon,
  Icon,
  HStack,
  Stack,
  useId,
  useRadio,
  useRadioGroup,
  useStyleConfig,
} from "@chakra-ui/react";
import React from "react";

export const RadioCardGroup = (props) => {
  const { children, name, defaultValue, value, onChange, ...rest } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value,
    onChange,
  });
  const cards = React.useMemo(
    () =>
      React.Children.toArray(children)
        .filter(React.isValidElement)
        .map((card) => {
          return React.cloneElement(card, {
            radioProps: getRadioProps({
              value: card.props.value,
            }),
          });
        }),
    [children, getRadioProps]
  );
  return (
    <HStack maxW="xl" overflowX="auto" {...getRootProps(rest)}>
      {cards}
    </HStack>
  );
};
export const RadioCard = (props) => {
  const { radioProps, children, ...rest } = props;
  const { getInputProps, getCheckboxProps, getLabelProps, state } =
    useRadio(radioProps);
  const id = useId(undefined, "radio-button");
  const styles = useStyleConfig("RadioCard", props);
  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();
  const labelProps = getLabelProps();
  return (
    <Box
      as="label"
      cursor="pointer"
      {...labelProps}
      sx={{
        ".focus-visible + [data-focus]": {
          boxShadow: "outline",
          zIndex: 1,
        },
      }}
    >
      <input {...inputProps} aria-labelledby={id} />
      <Stack
        alignItems="center"
        justifyContent="center"
        maxW="96px"
        sx={styles}
        {...checkboxProps}
        {...rest}
      >
        <Image
          src={props.decor}
          alt="Ruta de Tapas, La Épica Marítima"
          filter={!state.isChecked ? "grayscale(90%)" : "none"}
        />
        {props.subtitle ? (
          <Text
            color={state.isChecked ? "brand.600" : "gray.200"}
            fontWeight={state.isChecked ? "bolder" : "light"}
            mt="2"
          >
            {props.subtitle}
          </Text>
        ) : (
          <></>
        )}
        {state.isChecked ? (
          <Circle mx="auto" bg="accent" size="4">
            <Icon as={CheckIcon} boxSize="2.5" color="inverted" />
          </Circle>
        ) : (
          <Circle size="4" />
        )}
      </Stack>
    </Box>
  );
};
export const CheckIcon = createIcon({
  displayName: "CheckIcon",
  viewBox: "0 0 12 10",
  path: (
    <polyline
      fill="none"
      strokeWidth="2px"
      stroke="currentColor"
      strokeDasharray="16px"
      points="1.5 6 4.5 9 10.5 1"
    />
  ),
});
