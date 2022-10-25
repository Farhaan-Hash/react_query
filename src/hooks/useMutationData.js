import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const fetchUser = () => {
  return axios.get("http://localhost:4000/users");
};

//* POST Request
const addUser = (user) => {
  return axios.post("http://localhost:4000/users", user);
};

export const useMutationData = (onSuccess, onError) => {
  return useQuery(["users"], fetchUser, {onSuccess, onError});
};

//* MUTATION - FOR CRUD OPERATIONS
export const useAddUserData = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    // onSuccess: (data) => {
    //   data is the axios response
    //   queryClient.invalidateQueries("users"); This ensures automatic update of the newly added element to show without reloading or refetching
    //  queryClient.setQueryData(["users"], (oldQueryData) => {
    //      Automatically updtes the list chnages
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries(["users"]);
      //Hold current data, so if anythings fails we can Roll back
      const previousUserData = queryClient.getQueryData(["users"]);
      //Get data
      queryClient.setQueryData(["users"], (oldQueryData) => {
        //Automatically updates the list chnages
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {id: oldQueryData?.data?.length + 1, ...newUser},
          ],
        };
      });
      return {
        //Roll Back
        previousUserData,
      };
    },
    onError: (_error, _user, context) => {
      //set data to previous data
      queryClient.setQueryData(["users"], context.previousUserData);
      alert("invalid post request");
    },
    //either succesful or error
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
