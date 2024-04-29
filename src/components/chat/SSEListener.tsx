import { useEffect, useRef, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Cookies } from 'react-cookie';
import useSSEStore from '@/store/SSEState';

const SSEListener = () => {
  const cookie = new Cookies();
  const accessToken = cookie.get('accessToken');
  const [, setIsConnected] = useState(false);

  const { setUnreadMessageCount } = useSSEStore((state) => ({
    setUnreadMessageCount: state.setUnreadMessageCount,
  }));

  const retryInterval = useRef(5000); // 초기 재시도 간격
  const maxInterval = 60000; // 최대 재시도 간격

  useEffect(() => {
    if (!accessToken) return;

    const setupSSEConnection = () => {
      const eventSource = new EventSourcePolyfill(
        'https://hhboard.shop/notification/subscribe',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          heartbeatTimeout: 60000,
          withCredentials: true,
        },
      );

      eventSource.onopen = () => {
        setIsConnected(true);
      };

      eventSource.addEventListener('unreadMessageCount', (event: any) => {
        if (!event?.data) {
          return;
        }
        const unreadMessageCount = event.data;
        setUnreadMessageCount(unreadMessageCount);
        console.log(unreadMessageCount);
      });

      const retryConnection = () => {
        setTimeout(() => {
          if (retryInterval.current < maxInterval) {
            retryInterval.current *= 2;
          }
          setupSSEConnection();
        }, retryInterval.current);
      };

      eventSource.onerror = (event) => {
        console.error('SSE Error:', event);
        setIsConnected(false);
        eventSource.close();
        retryConnection();
      };

      return () => {
        eventSource.close();
      };
    };

    // 연결 설정 함수 호출
    setupSSEConnection();
  }, [accessToken, setUnreadMessageCount]);

  return null; // 혹은 연결 상태를 나타내는 UI를 반환할 수 있습니다.
};

export default SSEListener;
