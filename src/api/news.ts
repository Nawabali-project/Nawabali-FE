import { useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { GetRecentPostsParams } from '@/interfaces/main/news.interface';

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

export const getRecentPosts = async ({
  category,
  district,
  period,
}: GetRecentPostsParams) => {
  const params = `category=${category}&distirct=${district}$period=${period}`;
  const response = await instance.get(`/posts/top-like?${params}`);
  return response.data;
};

export const useGetRecentPosts = ({
  category,
  district,
  period,
}: GetRecentPostsParams) => {
  return useQuery({
    queryKey: ['getRecentPosts', category, district, period],
    queryFn: () => getRecentPosts({ category, district, period }),
  });
};
