import { schema } from "./schema";
import { fields } from "./form-fields";
import { FormBuilder } from "@/presentation";

export function FormComponent() {
  return (
    <FormBuilder
      className="max-w-md w-full"
      formSchema={schema}
      fields={fields}
      submitText="Enviar"
      onSubmit={(data) => console.log("submitted:", data)}
    />
  );
}
