import { instance } from './axios';

export const fetchNotifications = async ({ skip = 0, limit = 20 } = {}) => {
  const { data } = await instance.get('/buyer/notifications', { params: { skip, limit } });
  return data;
};

export const markNotificationRead = async (id) => {
  const { data } = await instance.patch(`/buyer/notifications/${id}/read`);
  return data;
};

export const markAllNotificationsRead = async () => {
  const { data } = await instance.patch('/buyer/notifications/read-all');
  return data;
};

export const deleteNotification = async (id) => {
  const { data } = await instance.delete(`/buyer/notifications/${id}`);
  return data;
};
