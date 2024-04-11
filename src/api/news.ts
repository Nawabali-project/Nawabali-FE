import { instance } from '../axios';

export const getAllPostsByDistrict = async (district: string) => {
  const basicParams = '&page=0&size=10&sort=string';
  const response = await instance.get(
    `/posts/filtered?district=${district}${basicParams}`,
  );
  console.log(response);
  return response.data.content;
};
