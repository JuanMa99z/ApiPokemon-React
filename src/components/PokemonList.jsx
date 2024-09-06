import { useContext } from "react"
import { PokemonContext } from "../context/PokemonContext"
import { CardPokemon } from "./CardPokemon";



export const PokemonList = () => {

  const { allPokemon } =
  useContext(PokemonContext);

  return (
    <>
    <div className='card-list-pokemon cointainer'>
    {allPokemon.map(pokemon => (
								<CardPokemon pokemon={pokemon} key={pokemon.id} />
        ))}
    </div>
    </>
  )
}
