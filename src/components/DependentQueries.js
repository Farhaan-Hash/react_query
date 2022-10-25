import {useState} from "react";
import PokemonList from "./PokemonList";

const DependentQueries = () => {
  const [number, setNumber] = useState(0);
  return (
    <div>
      <input
        type="number"
        value={number}
        max="102250"
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={() => setNumber(0)}>reset</button>
      <PokemonList number={number} />
    </div>
  );
};

export default DependentQueries;
