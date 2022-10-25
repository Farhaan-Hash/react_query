import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ColorRing} from "react-loader-spinner";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useMutationData, useAddUserData} from "../hooks/useMutationData";

//* FETCH API CALL
function fetchUsers() {
  return axios.get("http://localhost:4000/users");
}

//* callbacks
const RQUsers = () => {
  //* States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSuccess = () => {
    console.log("Perform side effect afetr data fetching");
  };

  //!Error
  const onError = () => {
    console.log("Perform side effect after encountering error");
  };

  //* MUTATION
  const {isPending, data, isError, error, isFetching, refetch} =
    useMutationData(onSuccess, onError);
  const {mutate} = useAddUserData();

  //* ADD USER

  const handleAddUserClick = () => {
    const user = {name, email};
    mutate(user);
  };

  /*const {isPending, isError, error, data, isFetching, refetch} = useQuery(
    ["users"],
    fetchUsers,
    {
      onError,
      onSuccess,
      //cacheTime: 5000, //default:5min
      // staleTime: 0, //staletime: default:0 seec. lets users see the cache results of the api, only conditon being that the api resukts do not change
      //refetchOnMount: true, // default: true
      //refetchOnWindowFocus: "always", //default behaviour-true
      // refetchInterval: false, //default
      //refetchIntervalInBackground: false, //default
      //enabled: false, //on fetch data is not shown by useQuery
      //select: (data) => {
      //Select a part. peice of api response
      // const userEmail = data.data.map((mail) => mail.email);
      //return userEmail;
      //},
    }
  );*/
  if (isPending || isFetching) {
    return (
      <div>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <>
        {toast.error(error.message, {toastId: ""})}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    );
  }

  return (
    <>
      {/*<h2>Email List</h2>*/}
      <h2>Users List</h2>
      {/* input*/}
      <section>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddUserClick}>ADD USER</button>
      </section>
      <br></br>
      <button onClick={refetch}>Fetch Users</button>

      {data?.data.map((val) => {
        return (
          <div key={val.id} style={{padding: "10px"}}>
            <Link style={{textDecoration: "none"}} to={`/rqusers/${val.id}`}>
              {val.name}
            </Link>
          </div>
        );
      })}
      {/*Select Particular Data from response
      <div style={{padding: "20px"}}>
        {data?.map((email) => {
          return <div key={email}>{email}</div>;
        })}
      </div>*/}
    </>
  );
};

export default RQUsers;
