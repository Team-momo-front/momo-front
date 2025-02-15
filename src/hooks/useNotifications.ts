import { useMutation } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import { Notification } from '../types/Notification';

const COMMON_URL = '/api/v1/notifications';

function useNotifications(accessToken: string | null) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!accessToken) return;

    const eventSource = new EventSourcePolyfill(`${COMMON_URL}/subscribe`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      heartbeatTimeout: 1000 * 60 * 24,
    });

    eventSource.onmessage = event => {
      try {
        const newNotification: Notification = JSON.parse(event.data);
        setNotifications(prev => [newNotification, ...prev]);
      } catch (error) {
        console.error('SSE 데이터 파싱 에러:', error);
      }
    };

    eventSource.onerror = error => {
      console.error('SSE 연결 에러:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [accessToken]);

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (id: number) =>
      apiClient({ url: `${COMMON_URL}/${id}`, method: 'delete' }),
    onSuccess: result => {
      const { id } = result;
      setNotifications(prev => prev.filter(n => n.id !== id));
    },
    onError: error => {
      console.error('알림 삭제 실패:', error);
      alert('알림 삭제에 실패했습니다.');
    },
  });

  const { mutate: deleteAllNotifications } = useMutation({
    mutationFn: () => apiClient({ url: COMMON_URL, method: 'delete' }),
    onSuccess: () => {
      setNotifications([]);
    },
    onError: error => {
      console.error('전체 알림 삭제 실패:', error);
      alert('전체 알림 삭제에 실패했습니다.');
    },
  });

  return {
    notifications,
    deleteNotification,
    deleteAllNotifications,
  };
}

export default useNotifications;
