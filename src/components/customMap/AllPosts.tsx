import { useQuery } from '@tanstack/react-query';
import { getAllPostsElastic } from '@/api/post';

const AllPosts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPostsElastic,
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
