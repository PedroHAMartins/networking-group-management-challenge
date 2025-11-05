import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

interface Props {
  label?: string;
  key: string;
  placeholder?: string;
  defaultValue?: string | number | readonly string[];
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export function FormField({
  label,
  key,
  placeholder,
  defaultValue,
  field,
  fieldState,
}: Props) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Input
        {...field}
        id={key}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={fieldState.invalid}
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
