import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/presentation/ui";

interface Props {
  length: number;
  value?: string;
  onChange: (value: string) => void;
}

export function OTP({ length, value, onChange }: Props) {
  return (
    <InputOTP
      maxLength={length}
      minLength={length}
      onChange={onChange}
      value={value}
    >
      <InputOTPGroup>
        {Array.from({ length }).map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
