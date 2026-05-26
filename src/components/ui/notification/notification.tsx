import "./notification-items.scss";
import { BellSvg } from "@/assets/icons/bell-svg";
import { CloseSvg } from "@/assets/icons/close-svg";
import { NotifFailSvg } from "@/assets/icons/notif-fail-svg";
import { NotifSuccessSvg } from "@/assets/icons/notif-success-svg";
import { NotifWarningSvg } from "@/assets/icons/notif-warning-svg";
import { DisabledBellSvg } from "@/assets/icons/disabled-bell-svg";

import { useEffect, useState, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";
import { togglePaused } from "@/store/app/notification-settings-slice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface NotificationData {
  id: string;
  summary: string;
  details?: string;
  type: "success" | "warning" | "error";
  timeoutId?: NodeJS.Timeout;
}

export const Notification = () => {
const dispatch = useDispatch();
const paused = useSelector((s: any) => s.notificationSettings.paused);
  const [messages, setMessages] = useState<NotificationData[]>([]);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  // ---------------- HELPERS ----------------
  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const startTimer = useCallback(
    (msg: NotificationData) => {
      msg.timeoutId = setTimeout(() => {
        removeMessage(msg.id);
      }, 10000);
    },
    [removeMessage]
  );

  const handleMessage = useCallback(
    (data: Omit<NotificationData, "id">) => {
      const msg: NotificationData = {
        ...data,
        id: crypto.randomUUID(),
      };

      setMessages((prev) => [...prev, msg]);
      startTimer(msg);
    },
    [startTimer]
  );

  // ---------------- SignalR INIT ----------------
  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}/api/controlcenter/RealtimeNotification`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = conn;

    conn.start().catch((err) => console.error("SignalR Error:", err));

    return () => {
      conn.stop();
      // clear timers
      messages.forEach((m) => m.timeoutId && clearTimeout(m.timeoutId));
    };
  }, []);

  // ---------------- SignalR SUBSCRIPTION ----------------
  useEffect(() => {
    const conn = connectionRef.current;
    if (!conn) return;

    if (!paused) conn.on("ReceiveOutage", handleMessage);
    else conn.off("ReceiveOutage", handleMessage);

    return () => conn.off("ReceiveOutage", handleMessage);
  }, [paused, handleMessage]);

  // ---------------- Helpers ----------------
  const iconFor = (type: NotificationData["type"]) => {
    switch (type) {
      case "success":
        return <NotifSuccessSvg width="40" height="40" />;
      case "warning":
        return <NotifWarningSvg width="40" height="40" />;
      case "error":
        return <NotifFailSvg width="40" height="40" />;
      default:
        return <NotifSuccessSvg width="40" height="40" />;
    }
  };

  return (
    <div className="notification-container">
      <button
        className="notification-container__button"
        onClick={() => dispatch(togglePaused())}
        title={
          paused ? "Bildirim akışını devam ettir" : "Bildirim akışını durdur"
        }
      >
        {paused ? (
          <DisabledBellSvg
            width="24"
            height="26"
            stroke="var(--border-error)"
          />
        ) : (
          <BellSvg width="24" height="26" stroke="var(--fg-quaternary-500)" />
        )}
      </button>

      <div className="notification-container__list">
        {!paused
          ? messages.map((msg) => (
              <div
                className="notification-container__card fade-out"
                key={msg.id}
                // STOP timer on hover
                onMouseEnter={() => {
                  if (msg.timeoutId) clearTimeout(msg.timeoutId);
                }}
                // START again on leave
                onMouseLeave={() => startTimer(msg)}
              >
                <div className="notification-container__card-content primary">
                  {iconFor(msg.type)}
                  <p>{msg.summary}</p>
                </div>

                {msg.details && (
                  <div className="notification-container__card-content secondary">
                    {msg.details}
                  </div>
                )}

                <button
                  className="notification-card-delete"
                  onClick={() => removeMessage(msg.id)}
                >
                  <CloseSvg />
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
