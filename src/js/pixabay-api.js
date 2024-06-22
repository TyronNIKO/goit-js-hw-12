import axios from 'axios';

// export async function pixabayRequestNew(searchParams, container) {
export async function pixabayRequest(searchParams) {
  const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  return response.data;
}
