import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerFieldState } from "react-hook-form";

interface Props {
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  value?: string;
  fieldState: ControllerFieldState;
  onChange?: (value: string) => void;
}

export function SelectInput({
  placeholder,
  options,
  defaultValue,
  value,
  fieldState,
  onChange,
}: Props) {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(v) => {
        onChange?.(v);
      }}
      value={value}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={placeholder}
          aria-invalid={fieldState.invalid}
        />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
