import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function Radio({
  options,
  defaultValue,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <div>
      <Label>{placeholder}</Label>
      <RadioGroup
        defaultValue={defaultValue}
        value={value}
        onValueChange={onChange}
      >
        {options.map((option) => (
          <div className="flex items-center gap-3" key={option.value}>
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
