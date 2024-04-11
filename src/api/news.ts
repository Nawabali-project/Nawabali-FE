import { useQuery } from '@tanstack/react-query';
import { instance } from '../axios';

const getAllPostsByDistrict = async (district: string) => {
  const basicParams = '&page=0&size=10&sort=string';
  const response = await instance.get(
    `/posts/filtered?district=${district}${basicParams}`,
  );
  return response.data.content;
};

export const useGetAllPostsByDistrict = (district: string) => {
  return useQuery({
    queryKey: [district],
    queryFn: () => getAllPostsByDistrict(district),
  });
};
