import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/useForm"

export const PokemonProvider = ({children}) => {

    const [allPokemon, setAllPokemon] = useState([])
    const [globalPokemon, setGlobalPokemon] = useState([])
    const [offset, setOffset] = useState(0)

    //UseForm para extrae
    const {valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch: ''
    })

    //Estados Simples
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)


    //llamar pokemones a la api
    const getAllPokemon = async(limit = 20) =>{
        const URLbase = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${URLbase}pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();
        

        const promises = data.results.map(async(pokemon) =>{
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(promises)

        setAllPokemon([...allPokemon, ...results])
        setLoading(false)
    }


    // Pokemon llamar a todos los pokemones
    const getGlobalPokemons = async() =>{
        const URLbase = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${URLbase}pokemon?limit=10000&offset=0`)
        const data = await res.json();
        

        const promises = data.results.map(async(pokemon) =>{
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(promises)

        setGlobalPokemon(results)
        setLoading(false)
    }

    //llamar pokemon por ID
    const getPokemonByID = async(id) =>{
        const URLbase = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${URLbase}pokemon/${id}`)
        const data = await res.json()
        return data

    }

    useEffect(() => {
    getAllPokemon();
    }, [offset]);
    
    useEffect(() => {
      getGlobalPokemons();
    }, []);
    
    // boton para cargar mas
    const OnclickLoadMore = () =>{
        setOffset(offset + 10)
    }


  return (
    <PokemonContext.Provider value={{
         valueSearch,
         onInputChange,
         onResetForm,
         allPokemon,
         globalPokemon,
         getPokemonByID,
         OnclickLoadMore,
        //  componente Loader
         loading,
         setLoading,
        //  Boton filter
         active,
         setActive
        //  Filtar checkbox container
    }}>
        {children}
    </PokemonContext.Provider>
  )
}
