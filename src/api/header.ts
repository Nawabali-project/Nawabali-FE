import { authInstance } from '../axios';

import { useQuery } from '@tanstack/react-query';

const searchPostsByContents = async (query: string) => {
  const { data } = await authInstance.get(`/posts/search?contents=${query}`);
  return data;
};

export const useSearchedPosts = (query: string) => {
  return useQuery({
    queryKey: ['searchedPosts', query],
    queryFn: () => searchPostsByContents(query),
  });
};
