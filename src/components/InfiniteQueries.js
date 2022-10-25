import {useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";
import {Fragment} from "react";

const fetchColors = ({pageParam = 1}) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueries = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      //underscore lastPage becuz we dont need it here as of now.
      return pages.length < 4 ? pages.length + 1 : undefined;
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div style={{padding: "10px 50px ", display: "grid"}}>
      <h1>Colors</h1>
      {data?.pages.map((group, ind) => {
        return (
          <Fragment key={ind}>
            {group.data.map((color) => {
              return (
                <h2>
                  {color.id}. {color.label}
                </h2>
              );
            })}
          </Fragment>
        );
      })}

      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "fetching---" : null}</div>
    </div>
  );
};
