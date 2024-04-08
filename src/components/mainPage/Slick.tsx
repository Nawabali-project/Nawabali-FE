import { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
  centerPadding?: string;
}

function Slick({ children, className }: sliderProps) {
  const settings = useMemo<Settings>(
    () => ({
      className: 'center',
      dots: true,
      arrow: true,
      infinite: true,
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      centerPadding: '60px',
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }),
    [],
  );
  return (
    <div className={className}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default Slick;

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function SampleNextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <FaArrowCircleRight />
    </div>
  );
}

function SamplePrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <FaArrowCircleLeft />
    </div>
  );
}
