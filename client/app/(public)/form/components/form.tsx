import { FormBuilder } from "@/components/components";
import { schema } from "./schema";
import { fields } from "./form-fields";

export function FormComponent() {
  return (
    <FormBuilder
      formSchema={schema}
      fields={fields}
      submitText="Enviar"
      onSubmit={(data) => console.log("submitted:", data)}
    />
  );
}
