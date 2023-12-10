import {
  Label,
  RadioGroup,
  XStack,
} from "tamagui";

export function RadioGroupItemWithLabel(props) {
  const id = `radiogroup-${props.value}`;
  return (
    <XStack alignItems="center" space="$2" marginRight={5}>
      <RadioGroup.Item value={props.value} id={id} size={props.size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size={props.size} htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  );
}
