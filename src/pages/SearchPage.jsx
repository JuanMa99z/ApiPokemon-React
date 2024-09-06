import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { useLocation } from "react-router-dom";
import { CardPokemon } from "../components/CardPokemon";

export const SearchPage = () => {
  const location = useLocation();

  const { globalPokemon } = useContext(PokemonContext);

  const filteredPokemon = globalPokemon.filter((pokemon) =>
    pokemon.name.includes(location.state.toLowerCase())
  );

  return (
    <div className="container">
      <p className="p-search">
        se encontraron <span>{filteredPokemon.length}</span> resultados:
      </p>
      <div className="card-list-pokemon.container">
        {filteredPokemon.map((pokemon) => (
          <CardPokemon pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
};
