import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/api/post';

const AllPosts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allPosts'],
    queryFn: () => getAllPosts({ pageParam: 1 }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return data;
};

export default AllPosts;
