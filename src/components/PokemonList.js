import {useQuery} from "@tanstack/react-query";
// import axios from "axios";

const PokemonList = ({number}) => {
  //fetch
  const fetchPokemon = async ({number}) => {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    return await request.json();
  };

  //
  const {isIdle, data, isLoading} = useQuery(
    ["pokemon", number],
    () => fetchPokemon({number}),
    {
      enabled: number > 0,
    }
  );

  return (
    <div className="App">
      {isIdle ? (
        <p>Is idle...</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <li>
            <strong>Name</strong>: {data.name}
          </li>
          <li>
            <strong>Weight</strong>: {data.weight}
          </li>
          <li>
            <strong>Image</strong>:
          </li>
          <div>
            <img
              style={{padding: "70px"}}
              src={
                data.sprites?.other.dream_world.front_default ??
                data.sprites?.front_default
              }
              alt={data.name}
            />
          </div>
        </ul>
      )}
    </div>
  );
};
export default PokemonList;
