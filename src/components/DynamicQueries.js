import {useQueries} from "@tanstack/react-query";
import axios from "axios";

export const DynamicQueries = () => {
  const [userQuery, companyQuery] = useQueries({
    queries: [
      {
        queryKey: ["usersA"],
        queryFn: () =>
          axios.get("http://localhost:4000/users").then((res) => res.data),
      },
      {
        queryKey: ["companiesB"],
        queryFn: () =>
          axios.get("http://localhost:4000/companies").then((res) => res.data),
      },
    ],
  });

  if (userQuery.isLoading) return "Loading Posts...";
  if (companyQuery.isLoading) return "Loading Users...";

  if (userQuery.error)
    return "An error has occurred: " + userQuery.error.message;

  if (companyQuery.error)
    return "An error has occurred: " + companyQuery.error.message;

  return (
    <div style={{padding: "20px"}}>
      {/*Users*/}
      <h2>Users</h2>
      {userQuery.data?.map((user) => {
        return (
          <div key={user.id} style={{display: "flex"}}>
            <span>{user.name}</span>
          </div>
        );
      })}
      {/*Companies*/}

      <h2>Companies</h2>
      {companyQuery.data?.map((comp) => {
        return (
          <div key={comp.id} style={{display: "flex"}}>
            <span>{comp.name}</span>
          </div>
        );
      })}
    </div>
  );
};
