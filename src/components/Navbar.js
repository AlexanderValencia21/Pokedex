import { useContext } from "react";
import { FavoriteContext } from "../favoriteContext";

export default function Navbar() {
  const {favoritePokemons}=useContext(FavoriteContext);
  console.log(favoritePokemons)
  return (
    <nav>
      <div />
      <div>
        <img
          className="navbar-image"
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="PokeAPI"
        />
      </div>
      <div>❤️ {favoritePokemons.length}</div>
    </nav>
  );
}
