import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDiscussions,
  fetchReplies,
  createDiscussion,
  createReply,
  toggleReaction,
  reportContent,
} from "@/network/community";
import { getSocket } from "./useSocket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

export const useCommunity = ({ productId, enabled = true }) => {
  const queryClient = useQueryClient();
  const discussionKey = ["discussions", productId];

  const { data: discussionsData, isLoading } = useQuery({
    queryKey: discussionKey,
    queryFn: () => fetchDiscussions({ productId }),
    enabled: !!productId && enabled,
    staleTime: 30_000,
  });

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !productId) return;

    socket.emit("join:product", productId);

    const handleNew = (discussion) => {
      queryClient.setQueryData(discussionKey, (old) => {
        if (!old) return old;
        return { ...old, data: { ...old.data, discussions: [discussion, ...(old.data?.discussions || [])] } };
      });
    };

    socket.on(SOCKET_EVENTS.DISCUSSION_NEW, handleNew);

    return () => {
      socket.off(SOCKET_EVENTS.DISCUSSION_NEW, handleNew);
      socket.emit("leave:product", productId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const postDiscussion = useMutation({
    mutationFn: createDiscussion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: discussionKey }),
  });

  const postReply = useMutation({
    mutationFn: createReply,
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["replies", vars.discussionId] });
    },
  });

  const react = useMutation({
    mutationFn: toggleReaction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: discussionKey }),
  });

  const report = useMutation({ mutationFn: reportContent });

  const useReplies = (discussionId) =>
    useQuery({
      queryKey: ["replies", discussionId],
      queryFn: () => fetchReplies({ discussionId }),
      enabled: !!discussionId,
      staleTime: 30_000,
    });

  return {
    discussionsData,
    isLoading,
    postDiscussion,
    postReply,
    react,
    report,
    useReplies,
  };
};
