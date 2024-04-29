import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Cookies } from 'react-cookie';
import useSSEStore from '@/store/SSEState';

const SSEListener = () => {
  const cookie = new Cookies();
  const accessToken = cookie.get('accessToken');

  // Zustand 스토어에서 함수를 가져옴.
  const { setNotificationCount } = useSSEStore((state) => ({
    addMessage: state.addMessage,
    setNotificationCount: state.setNotificationCount,
  }));

  useEffect(() => {
    if (!accessToken) return;

    const setupSSEConnection = () => {
      const eventSource = new EventSourcePolyfill(
        'https://hhboard.shop/notification/subscribe',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          heartbeatTimeout: 6000,
          withCredentials: true,
        },
      );

      eventSource.addEventListener('unreadMessageCount', (event: any) => {
        if (!event?.data) {
          return;
        }
        const notificationCount = event.data;
        setNotificationCount(notificationCount);
        console.log(notificationCount);
      });

      eventSource.onerror = (event) => {
        console.error('SSE Error:', event);
        eventSource.close();
        // 에러 후 재연결
        setTimeout(() => {
          setupSSEConnection();
        }, 3000);
      };

      return () => {
        eventSource.close();
      };
    };

    // 연결 설정 함수 호출
    setupSSEConnection();
  }, [accessToken, setNotificationCount]);

  return null;
};

export default SSEListener;
