import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components";
import { PokemonContext } from "../context/PokemonContext";
import { primerMayuscula } from "../helper/helper";

export const PokemonPage = () => {
  const { getPokemonByID } = useContext(PokemonContext);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const { id } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPokemon = async (id) => {
    const data = await getPokemonByID(id);
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, [fetchPokemon, id]);

  const getStatPercentage = (statValue) => {
    const maxStat = 100; // Valor máximo posible para un stat
    return (statValue / maxStat) * 100;
  };

  return (
    <main className="container main-pokemon">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="video-background">
            <video autoPlay loop muted>
              <source
                src="/src/assets/PokemonBackground-2.webm"
                type="video/webm"
              />
            </video>
            <div className="gradient-overlay"></div>
          </div>
          <div className="header-main-pokemon">
            <span className="number-pokemon">#{pokemon.id}</span>
            <div className="container-img-pokemon col-lg-6 col-md-6 col-sm-7">
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={`Pokemon ${pokemon?.name}`}
              />
            </div>

            <div className="container-info-pokemon col-lg-5 col-md-6 col-sm-7">
              <h1>{primerMayuscula(pokemon.name)}</h1>
              <div className="card-types info-pokemon-type ">
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className={`${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className="info-pokemon col-lg-12 col-md-10 col-sm-9">
                <div className="group-info">
                  <p>Altura</p>
                  <span>{(pokemon.height / 10).toLocaleString()} m</span>
                </div>
                <div className="group-info">
                  <p>Habilidad</p>
                  <span>{pokemon.abilities[0].ability.name}</span>
                  <span>{pokemon.abilities[1].ability.name}</span>
                </div>
                <div className="group-info">
                  <p>Peso</p>
                  <span>{(pokemon.weight / 10).toLocaleString()} kg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container-stats col-lg-12 col-md-12 col-sm-12">
            <h1>Estadísticas</h1>
            <div className="stats">
              {pokemon.stats.map((stat, index) => (
                <div className="stat-group" key={index}>
                  <span>{stat.stat.name}</span>
                  <div
                    className="progress"
                    style={{
                      width: "100%",
                      height: "1.4rem",
                      margin: "0.4rem 0",
                      background: "inherit",
                    }}
                  >
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${getStatPercentage(stat.base_stat)}%` }}
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
