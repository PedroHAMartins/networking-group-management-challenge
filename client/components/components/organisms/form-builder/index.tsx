import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  DefaultValues,
  SubmitHandler,
} from "react-hook-form";
import { z, ZodObject, ZodRawShape } from "zod";
import { FormField } from "./form-field";
import { Button } from "@/components/ui/button";

interface FieldProps<TFieldName extends string> {
  name: TFieldName;
  label?: string;
  placeholder?: string;
  defaultValue?: string | number;
}

interface Props<TSchema extends ZodObject<ZodRawShape>> {
  formSchema: TSchema;
  formName: string;
  fields: FieldProps<keyof z.input<TSchema> & string>[];
  submitText?: string;
  onSubmit: (data: z.output<TSchema>) => void;
}

export function FormBuilder<TSchema extends ZodObject<ZodRawShape>>({
  onSubmit,
  formSchema,
  submitText,
  fields,
}: Props<TSchema>) {
  type FormInput = z.input<TSchema>;

  const defaultValues = fields.reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name as keyof FormInput] =
        field.defaultValue as FormInput[keyof FormInput];
    }
    return acc;
  }, {} as Partial<FormInput>) as DefaultValues<FormInput>;

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {fields.map((fieldConfig) => (
          <Controller
            key={fieldConfig.name}
            name={fieldConfig.name as never}
            control={form.control}
            render={({ field, fieldState }) => (
              <FormField
                label={fieldConfig.label}
                key={fieldConfig.name}
                placeholder={fieldConfig.placeholder}
                defaultValue={fieldConfig.defaultValue}
                field={field as never}
                fieldState={fieldState}
              />
            )}
          />
        ))}
      </FieldGroup>
      <Button type="submit">{submitText || "Submit"}</Button>
    </form>
  );
}
