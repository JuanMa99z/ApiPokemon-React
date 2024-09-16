import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

export const FilterBar = () => {
  const { active, handleCheckbox } = useContext(PokemonContext);

  const pokemonTypes = [
    { name: "grass", label: "Planta" },
    { name: "fire", label: "Fuego" },
    { name: "bug", label: "Bicho" },
    { name: "fairy", label: "Hada" },
    { name: "dragon", label: "Dragón" },
    { name: "shadow", label: "Fantasma" },
    { name: "ground", label: "Tierra" },
    { name: "normal", label: "Normal" },
    { name: "psychic", label: "Psíquico" },
    { name: "steel", label: "Acero" },
    { name: "dark", label: "Siniestro" },
    { name: "electric", label: "Eléctrico" },
    { name: "fighting", label: "Lucha" },
    { name: "flying", label: "Volador" },
    { name: "ice", label: "Hielo" },
    { name: "poison", label: "Veneno" },
    { name: "rock", label: "Roca" },
    { name: "water", label: "Agua" }
  ];

  return (
    <div className={`container-filters ${active ? "active" : ""}`}>
      <div className="filter-by-type">
        <span className="h5">Tipo
        </span>
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-1 ">
          {pokemonTypes.map((type) => (
            <div className="col mb-3" key={type.name}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleCheckbox}
                  name={type.name}
                  id={type.name}
                />
                <label className="form-check-label" htmlFor={type.name}>
                  {type.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};
