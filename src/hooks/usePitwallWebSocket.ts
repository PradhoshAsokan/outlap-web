'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export interface TelemetryData {
  [driverNumber: string]: {
    speed: number;
    rpm: number;
    n_gear: number;
    throttle: number;
    timestamp: string;
  };
}

export function usePitwallWebSocket() {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastHz, setLastHz] = useState(0);
  const socketRef = useRef<WebSocket | null>(null);
  const frameCountRef = useRef(0);
  const lastHzUpdateRef = useRef(Date.now());

  const connect = useCallback(() => {
    const wsUrl = process.env.NEXT_PUBLIC_PITWALL_WS_URL;
    const token = process.env.NEXT_PUBLIC_PITWALL_AUTH_TOKEN;

    if (!wsUrl || !token) {
      console.warn("WebSocket URL or Auth Token missing in .env");
      return;
    }

    // Append token as a query parameter for the handshake
    const socket = new WebSocket(`${wsUrl}?token=${token}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Pitwall WebSocket Connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        setData(payload);
        
        // Calculate Hz
        frameCountRef.current++;
        const now = Date.now();
        if (now - lastHzUpdateRef.current >= 1000) {
          setLastHz(frameCountRef.current);
          frameCountRef.current = 0;
          lastHzUpdateRef.current = now;
        }
      } catch (e) {
        console.error("WS Parse Error", e);
      }
    };

    socket.onclose = () => {
      console.log("Pitwall WebSocket Disconnected. Reconnecting...");
      setIsConnected(false);
      setTimeout(connect, 3000); // Auto-reconnect
    };

    socket.onerror = (err) => {
      console.error("WS Error", err);
      socket.close();
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
    };
  }, [connect]);

  return { data, isConnected, lastHz };
}
