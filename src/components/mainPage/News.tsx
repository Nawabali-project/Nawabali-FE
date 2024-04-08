import styled from 'styled-components';
import Slick from './Slick';

interface itemsProps {
  item: string;
  name: string;
}

const SliderItem = styled.div`
  width: 200px;
  height: 300px;
  img {
    width: 200px;
  }
`;

const items: itemsProps[] = [
  {
    item: '/assets/testImgs/1.png',
    name: '이미지01',
  },
  {
    item: '/assets/testImgs/2.png',
    name: '이미지02',
  },
  {
    item: '/assets/testImgs/3.png',
    name: '이미지03',
  },
];

function Item() {
  return (
    <Slick>
      {items.map((item, index) => (
        <SliderItem key={index}>
          <img src={item.item} alt={item.name} />
        </SliderItem>
      ))}
    </Slick>
  );
}

export default Item;
