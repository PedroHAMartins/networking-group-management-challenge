import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/presentation/ui/alert";
import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/presentation/ui";

interface Props {
  title?: string;
  description?: React.ReactNode;
  type?: "info" | "warning" | "error" | "success";
  className?: string;
  onClose?: () => void;
}

export function Notification({
  title,
  description,
  type = "info",
  className,
  onClose,
}: Props) {
  const icon = useMemo(() => {
    switch (type) {
      case "info":
        return <Info className="text-primary" />;
      case "warning":
        return <CircleAlert className="text-yellow-400!" />;
      case "error":
        return <CircleX className="text-red-500!" />;
      case "success":
        return <CircleCheck className="text-green-500!" />;
      default:
        return null;
    }
  }, [type]);

  const textColor = useMemo(() => {
    switch (type) {
      case "info":
        return "text-primary";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-500";
      case "success":
        return "text-green-500";
      default:
        return "text-primary";
    }
  }, [type]);

  return (
    <Alert className="grid w-full items-start gap-4 pr-12 fixed top-4 right-4 z-50 max-w-md">
      {icon}
      <AlertTitle className={cn("font-semibold", textColor, className)}>
        {title}
      </AlertTitle>
      <AlertDescription className={cn(textColor, className)}>
        {description}
      </AlertDescription>
      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  );
}
