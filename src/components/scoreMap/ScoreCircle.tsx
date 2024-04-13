import { useQuery } from '@tanstack/react-query';
import { getAreaScore } from '@/api/post';

const ScoreCircle = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['areaScore'],
    queryFn: getAreaScore,
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return data;
};

export default ScoreCircle;
