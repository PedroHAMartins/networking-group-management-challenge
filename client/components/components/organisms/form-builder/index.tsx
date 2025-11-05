"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  DefaultValues,
  Resolver,
  Path,
} from "react-hook-form";
import { z, ZodObject, ZodRawShape } from "zod";
import { FormField } from "./form-field";
import { cn } from "@/lib/utils";
import { FieldGroup, Button } from "@/components/ui";

export type FieldType = "text" | "radio" | "select" | "checkbox";

export type Option = {
  label: string;
  value: string;
};

export type FieldConfig<
  FormInput,
  Name extends keyof FormInput & string = keyof FormInput & string
> = {
  name: Name;
  label?: string;
  placeholder?: string;
  defaultValue?: string | number | readonly string[] | boolean;
  type?: FieldType;
  options?: Option[];
};

export type Fields<FormInput> = FieldConfig<
  FormInput,
  keyof FormInput & string
>[];

interface Props<TSchema extends ZodObject<ZodRawShape>> {
  formSchema: TSchema;
  fields: Fields<z.infer<TSchema>>;
  submitText?: string;
  className?: string;
  onChange?: (name: string, value: unknown) => void;
  onSubmit?: (data: z.infer<TSchema>) => void;
}

export function FormBuilder<TSchema extends ZodObject<ZodRawShape>>({
  onSubmit,
  onChange,
  formSchema,
  submitText,
  fields,
  className,
}: Props<TSchema>) {
  type FormInput = z.infer<TSchema>;

  const defaultValues = fields.reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name as keyof FormInput] =
        field.defaultValue as FormInput[keyof FormInput];
    }
    return acc;
  }, {} as Partial<FormInput>) as DefaultValues<FormInput>;

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema) as Resolver<FormInput, unknown>,
    defaultValues,
  });

  const handleSubmit = (data: FormInput) => {
    if (onSubmit) onSubmit(data);
    else console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn(
        "flex flex-col items-center gap-10 max-w-[90%] justify-center",
        className
      )}
    >
      <FieldGroup>
        {fields.map((fieldConfig) => (
          <Controller
            key={String(fieldConfig.name)}
            name={fieldConfig.name as Path<FormInput>}
            control={form.control}
            render={({ field, fieldState }) => (
              <FormField
                label={fieldConfig.label}
                fieldId={String(fieldConfig.name)}
                placeholder={fieldConfig.placeholder}
                defaultValue={fieldConfig.defaultValue}
                field={field}
                fieldState={fieldState}
                type={fieldConfig.type}
                options={fieldConfig.options}
                onChange={(val) => {
                  field.onChange(val);
                  onChange?.(String(fieldConfig.name), val);
                }}
              />
            )}
          />
        ))}
      </FieldGroup>
      <Button type="submit" className="px-10">
        {submitText || "Submit"}
      </Button>
    </form>
  );
}
