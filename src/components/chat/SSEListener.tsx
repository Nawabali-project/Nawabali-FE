import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Cookies } from 'react-cookie';
import useSSEStore from '@/store/SSEState';

const SSEListener = () => {
  const cookie = new Cookies();
  const accessToken = cookie.get('accessToken');

  // Zustand 스토어에서 함수를 가져옴.
  const { addMessage, setNotificationCount } = useSSEStore((state) => ({
    addMessage: state.addMessage,
    setNotificationCount: state.setNotificationCount,
  }));

  useEffect(() => {
    if (!accessToken) return;

    const eventSource = new EventSourcePolyfill(
      'https://hhboard.shop/notification/subscribe',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 600000,
        withCredentials: true,
      },
    );

    eventSource.addEventListener('연결 되었습니다', (event: any) => {
      if (!event?.data) {
        return;
      }
      const { data } = event;
      console.log(JSON.parse(data));
    });

    eventSource.addEventListener('addMessage알림', (event: any) => {
      if (!event?.data) return;
      const data = JSON.parse(event.data);
      addMessage(data);
    });

    eventSource.addEventListener('notificationCount', (event: any) => {
      if (!event?.data) return;
      const count = parseInt(event.data, 10);
      console.log('count: ', count);

      setNotificationCount(count);
    });

    return () => {
      eventSource.close();
    };
  }, [accessToken, addMessage, setNotificationCount]);

  return null;
};

export default SSEListener;
