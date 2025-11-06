import { schema } from "./schema";
import { fields } from "./form-fields";
import { FormBuilder } from "@/presentation";
import z from "zod";

interface Props {
  data: z.infer<typeof schema> | null;
  onChange: (data: z.infer<typeof schema> | null) => void;
  onSubmit: (data: z.infer<typeof schema>) => void;
}

export function FormComponent({ data, onSubmit, onChange }: Props) {
  const handleChange = (name: string, value: unknown) => {
    onChange({
      name: "",
      email: "",
      company: "",
      purpose: "",
      ...(data || {}),
      [name]: value,
    });
  };

  return (
    <FormBuilder
      className="max-w-md w-full"
      formSchema={schema}
      fields={fields}
      submitText="Enviar"
      onSubmit={onSubmit}
      onChange={handleChange}
    />
  );
}
