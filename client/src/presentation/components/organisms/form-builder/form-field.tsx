import { useMemo, ChangeEvent } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Radio, SelectInput } from "../../atoms";
import {
  Checkbox,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Label,
} from "@/presentation/ui";

interface Props<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> {
  label?: string;
  fieldId?: string;
  placeholder?: string;
  defaultValue?: string | number | readonly string[] | boolean;
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  type?: "text" | "radio" | "select" | "checkbox";
  isPassword?: boolean;
  onChange?: (value: unknown) => void;
  options?: {
    label: string;
    value: string;
  }[];
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
>({
  label,
  fieldId,
  placeholder,
  field,
  fieldState,
  type = "text",
  isPassword,
  options,
  onChange,
}: Props<TFieldValues, TName>) {
  const fieldComponent = useMemo(() => {
    switch (type) {
      case "text":
        return (
          <Input
            id={fieldId}
            value={(field.value as unknown as string) ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const v = e?.target ? e.target.value : e;
              field.onChange(v);
              onChange?.(v);
            }}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            type={isPassword ? "password" : "text"}
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              className="max-w-4 max-h-4"
              checked={Boolean(field.value)}
              onCheckedChange={(checked: boolean) => {
                field.onChange(checked);
                onChange?.(checked);
              }}
              aria-invalid={fieldState.invalid}
              id={fieldId}
            />
            <Label>{label}</Label>
          </div>
        );
      case "radio":
        return (
          <Radio
            options={options || []}
            value={field.value as string | undefined}
            onChange={(v: string) => {
              field.onChange(v);
              onChange?.(v);
            }}
          />
        );
      case "select":
        return (
          <SelectInput
            options={options || []}
            value={field.value as string | undefined}
            onChange={(v: string) => {
              field.onChange(v);
              onChange?.(v);
            }}
            fieldState={fieldState}
            placeholder={placeholder}
          />
        );
      default:
        return null;
    }
  }, [
    type,
    fieldId,
    field,
    fieldState,
    placeholder,
    isPassword,
    label,
    options,
    onChange,
  ]);

  return (
    <Field>
      {label && type !== "checkbox" && (
        <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      )}
      {fieldComponent}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
