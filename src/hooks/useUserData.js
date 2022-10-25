import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const fetchUser = ({queryKey}) => {
  const userId = queryKey[1]; //queryKey Array mimics the Array passed in useQuery.
  return axios.get(`http://localhost:4000/users/${userId}`);
};
// export const useUserData = (userId) => {
//   return useQuery(["user", userId], fetchUser);
// };

//* With no loading effect using Initial Query

export const useUserData = (userId) => {
  const queryClient = useQueryClient();
  return useQuery(["user", userId], fetchUser, {
    initialData: () => {
      const user = queryClient
        .getQueryData(["user"])
        ?.data?.find((user) => user.id === parseInt(userId));
      if (user) {
        return {data: user};
      } else {
        return undefined;
      }
    },
  });
};
