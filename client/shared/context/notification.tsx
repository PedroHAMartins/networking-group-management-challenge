"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Notification } from "@/presentation/components/molecules/notification";

export type NotificationType = "info" | "warning" | "error" | "success";

export interface NotificationData {
  title: string;
  description: React.ReactNode;
  type: NotificationType;
  className?: string;
  duration?: number;
}

type NotificationContextType = {
  makeNotification: (data: NotificationData) => void;
  clearNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
  makeNotification: () => {},
  clearNotification: () => {},
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<NotificationData | null>(
    null
  );
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const clearNotification = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId);
    setNotification(null);
    setTimeoutId(null);
  }, [timeoutId]);

  const makeNotification = useCallback(
    (data: NotificationData) => {
      if (timeoutId) clearTimeout(timeoutId);

      setNotification(data);

      if (data.duration && data.duration > 0) {
        const id = setTimeout(() => {
          setNotification(null);
        }, data.duration);
        setTimeoutId(id);
      }
    },
    [timeoutId]
  );

  return (
    <NotificationContext.Provider
      value={{ makeNotification, clearNotification }}
    >
      {children}
      {notification && (
        <Notification
          title={notification.title}
          description={notification.description}
          type={notification.type}
          className={notification.className}
          onClose={clearNotification}
        />
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}

export default NotificationProvider;
