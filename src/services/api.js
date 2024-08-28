import { http } from "@/utils";

const getRandomAdvice = () => {
  return http.get(`/advice`);
};

export { getRandomAdvice };
