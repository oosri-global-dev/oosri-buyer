import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNegotiation,
  fetchBuyerNegotiations,
  acceptNegotiation,
  rejectNegotiation,
} from "@/network/negotiation";
import { getSocket } from "./useSocket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

export const useNegotiation = () => {
  const queryClient = useQueryClient();
  const negotiationsKey = ["negotiations", "buyer"];

  const { data: negotiationsData, isLoading } = useQuery({
    queryKey: negotiationsKey,
    queryFn: () => fetchBuyerNegotiations(),
    staleTime: 60_000,
  });

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const refresh = () => queryClient.invalidateQueries({ queryKey: negotiationsKey });

    socket.on(SOCKET_EVENTS.NEGOTIATION_COUNTERED, refresh);
    socket.on(SOCKET_EVENTS.NEGOTIATION_ACCEPTED, refresh);
    socket.on(SOCKET_EVENTS.NEGOTIATION_REJECTED, refresh);
    socket.on(SOCKET_EVENTS.NEGOTIATION_EXPIRED, refresh);

    return () => {
      socket.off(SOCKET_EVENTS.NEGOTIATION_COUNTERED, refresh);
      socket.off(SOCKET_EVENTS.NEGOTIATION_ACCEPTED, refresh);
      socket.off(SOCKET_EVENTS.NEGOTIATION_REJECTED, refresh);
      socket.off(SOCKET_EVENTS.NEGOTIATION_EXPIRED, refresh);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitOffer = useMutation({
    mutationFn: createNegotiation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: negotiationsKey }),
  });

  const accept = useMutation({
    mutationFn: acceptNegotiation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: negotiationsKey }),
  });

  const reject = useMutation({
    mutationFn: rejectNegotiation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: negotiationsKey }),
  });

  return { negotiationsData, isLoading, submitOffer, accept, reject };
};
