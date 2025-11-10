import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/presentation/ui/card";

interface Props {
  title?: string;
  content?: React.ReactNode;
  className?: string;
}

export function CardComponent({ title, content, className }: Props) {
  return (
    <Card
      className={cn("flex flex-col justify-center items-center p-4", className)}
    >
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
