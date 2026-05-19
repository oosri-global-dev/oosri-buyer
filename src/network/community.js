import { instance, publicInstance } from "./axios";

export const fetchDiscussions = async ({ productId, page = 1, type }) => {
  const params = { page };
  if (type) params.type = type;
  const { data } = await publicInstance.get(`/community/discussions/product/${productId}`, { params });
  return data;
};

export const fetchReplies = async ({ discussionId, page = 1 }) => {
  const { data } = await publicInstance.get(`/community/discussions/${discussionId}/replies`, {
    params: { page },
  });
  return data;
};

export const createDiscussion = async (payload) => {
  const { data } = await instance.post(`/community/discussions`, payload);
  return data;
};

export const createReply = async ({ discussionId, content, isVerifiedPurchase }) => {
  const { data } = await instance.post(`/community/discussions/${discussionId}/reply`, {
    content,
    isVerifiedPurchase,
  });
  return data;
};

export const toggleReaction = async ({ targetId, targetType, emoji, productId }) => {
  const { data } = await instance.post(`/community/discussions/react/${targetId}`, {
    targetType,
    emoji,
    productId,
  });
  return data;
};

export const reportContent = async ({ targetId, targetType, reason, note }) => {
  const { data } = await instance.post(`/community/discussions/report`, {
    targetId,
    targetType,
    reason,
    note,
  });
  return data;
};
