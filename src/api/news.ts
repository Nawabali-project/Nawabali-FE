import { useQuery } from '@tanstack/react-query';
import { authInstance, instance } from '../axios';
import { GetRecentPostsParams } from '@/interfaces/main/news.interface';

const getAllPostsByDistrictOrCategory = async (
  district?: string,
  category?: string,
  size?: number,
) => {
  let endpoint = '/posts/filtered?';
  if (district) {
    endpoint += `district=${district}&`;
  }
  if (category) {
    endpoint += `category=${category}&`;
  }
  const pageable = `page=0&size=${size}&sort=likesCount`;
  const response = await authInstance.get(`${endpoint}${pageable}`);
  return response.data;
};

export const useGetAllPostsByDistrictOrCategory = (
  district?: string,
  category?: string,
  size?: number,
) => {
  return useQuery({
    queryKey: [district, category, size],
    queryFn: () => getAllPostsByDistrictOrCategory(district, category, size),
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

export const getCategoryCountsByDistrict = async (district: string) => {
  const response = await authInstance.get(
    `posts/sort-category?district=${district}`,
  );
  return response.data;
};

export const useGetCategoryCountsByDistrict = (district: string) => {
  return useQuery({
    queryKey: [district],
    queryFn: () => getCategoryCountsByDistrict(district),
  });
};

export const getCountOfPostsByDistrict = async (district: string) => {
  const response = await authInstance.get(
    `posts/top-district?district=${district}&period=MONTH`,
  );
  return response.data;
};

export const useGetCountOfPostsByDistrict = (district: string) => {
  return useQuery({
    queryKey: [district],
    queryFn: () => getCountOfPostsByDistrict(district),
  });
};
