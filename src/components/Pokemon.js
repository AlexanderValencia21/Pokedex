import { useContext } from "react";
import { FavoriteContext } from "../favoriteContext";

export default function Pokemon(props) {
  const { pokemon } = props;
  const {favoritePokemons , updateFavoritePokemon}=useContext(FavoriteContext);
  const redHeart = "❤️";
  const blackHeart = "🖤";
  const heart=favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart;
  function clickHeart(e){
    e.preventDefault();
    updateFavoritePokemon(pokemon.name)
  }
  return (
    <div className="pokemon-card">
      <div className="pokemon-img-container">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-img"
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <div>#{pokemon.id}</div>
        </div>

        <div className="card-bottom">
          <div className="pokemon-type">
            {pokemon.types.map((type, idx) => {
              return (
                <div key={idx} className="pokemon-type-text">
                  {type.type.name}
                </div>
              );
            })}
          </div>
          <button onClick={clickHeart} className="pokemon-heart-btn">
            <div className="pokemon-favorite">{heart}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
