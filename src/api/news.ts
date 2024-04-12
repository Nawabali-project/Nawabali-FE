import { useQuery } from '@tanstack/react-query';
import { instance } from '../axios';

const getAllPostsByDistrict = async (district: string) => {
  const basicParams = '&page=0&size=7&sort=likesCount';
  const response = await instance.get(
    `/posts/filtered?district=${district}${basicParams}`,
  );
  return response.data;
};

export const useGetAllPostsByDistrict = (district: string) => {
  return useQuery({
    queryKey: [district],
    queryFn: () => getAllPostsByDistrict(district),
  });
};
