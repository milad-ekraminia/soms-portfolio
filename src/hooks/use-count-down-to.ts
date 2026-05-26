import { useEffect, useMemo, useRef, useState } from "react";

const floorToMinute = (ms: number) => Math.floor(ms / 60000) * 60000;

export const useCountdownToMinute = (targetIso?: string | null) => {
  const [now, setNow] = useState(() => Date.now());
  const wasOverRef = useRef(false);

  const targetMs = useMemo(() => {
    if (!targetIso) return null;
    const ms = new Date(targetIso).getTime();
    return Number.isFinite(ms) ? ms : null;
  }, [targetIso]);

  // Tick each second (fine), countdown is minute-rounded anyway
  useEffect(() => {
    if (!targetMs) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const { remainingMs, shouldAuto } = useMemo(() => {
    if (!targetMs) return { remainingMs: 0, shouldAuto: false };

    const roundedTarget = floorToMinute(targetMs);
    const diff = roundedTarget - now;

    const shouldAuto = diff > 0;

    // remaining is clamped
    return {
      remainingMs: Math.max(0, diff),
      shouldAuto,
    };
  }, [targetMs, now]);

  const totalSec = Math.floor(remainingMs / 1000);
  const isOver = totalSec <= 0;

  const justFinished = shouldAuto && isOver && !wasOverRef.current;

  useEffect(() => {
    if (isOver) wasOverRef.current = true;
  }, [isOver]);

  useEffect(() => {
    wasOverRef.current = false;
  }, [targetMs]);

  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  const label = `${String(h).padStart(2, "0")}:${String(m).padStart(
    2,
    "0"
  )}:${String(s).padStart(2, "0")}`;

  return { label, isOver, justFinished, shouldAuto };
};
