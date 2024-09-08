import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components';
import { PokemonContext } from '../context/PokemonContext';
import { primerMayuscula } from '../helper/helper';

export const PokemonPage = () => {
  const { getPokemonByID } = useContext(PokemonContext);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const { id } = useParams();

  const fetchPokemon = async (id) => {
    const data = await getPokemonByID(id);
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, [id]);

  const getStatPercentage = (statValue) => {
    const maxStat = 100; // Valor máximo posible para un stat
    return (statValue / maxStat) * 100;
  };

  return (
    <main className='container main-pokemon'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='header-main-pokemon'>
            <span className='number-pokemon'>#{pokemon.id}</span>
            <div className='container-img-pokemon'>
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={`Pokemon ${pokemon?.name}`}
              />
            </div>

            <div className='container-info-pokemon'>
              <h1>{primerMayuscula(pokemon.name)}</h1>
              <div className='card-types info-pokemon-type'>
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className={`${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className='info-pokemon'>
                <div className='group-info'>
                  <p>Altura</p>
                  <span>{pokemon.height}</span>
                </div>
                <div className='group-info'>
                  <p>Peso</p>
                  <span>{pokemon.weight}KG</span>
                </div>
              </div>
            </div>
          </div>

          <div className='container-stats'>
            <h1>Estadísticas</h1>
            <div className='stats'>
              {pokemon.stats.map((stat, index) => (
                <div className='stat-group' key={index}>
                  <span>{stat.stat.name}</span>
                  <div className="progress" style={{ width: "100%", height: '1.4rem', margin: '0.4rem 0' }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width:`${getStatPercentage(stat.base_stat)}%` }}
                      aria-valuenow={stat.base_stat}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {stat.base_stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};
