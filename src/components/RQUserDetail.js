import React from "react";
import {useParams} from "react-router-dom";
import {useUserData} from "../hooks/useUserData";

const RQUserDetail = () => {
  const {userId} = useParams();
  const {isLoading, data, isError, error} = useUserData(userId);

  if (isLoading) {
    <div>Loading....</div>;
  }
  if (isError) {
    <div>{error.message}</div>;
  }
  return (
    <>
      <h2>Name: {data?.data.name}</h2>
      <h3>Email: {data?.data.email}</h3>
    </>
  );
};

export default RQUserDetail;
