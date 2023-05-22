import Navbar from "./components/Navbar";
import "./App.css";
import SearchBar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";
import { useEffect, useState } from "react";
import { getPokemones, pokemonData, searchPokemon } from "./api";
import { FavoriteProvider } from "./favoriteContext";
import Footer from "./components/Footer";
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);
  const localStorageKey = "favorite_pokemon";
  async function fetchgetPokemons() {
    try {
      setLoading(true);
      const data = await getPokemones(25, 25 * page);
      const promises = data.results.map(async (pokemon) => {
        return await pokemonData(pokemon.url);
      });
      const res = await Promise.all(promises);
      setPokemons(res);
      console.log(res);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false);
    } catch (error) {
      console.log(error);
    }
  }
  function loadFavoritePokemons() {
    const pokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  }
  useEffect(() => {
    loadFavoritePokemons();
  }, []);
  useEffect(() => {
    if (!searching) {
      fetchgetPokemons();
    }
  }, [page]);

  function updateFavPokemons(name) {
    const isFavorite = favorites.indexOf(name);
    const updated = [...favorites];
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  }

  async function onSearch(pokemon) {
    if (!pokemon) {
      return fetchgetPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true)
    const res = await searchPokemon(pokemon);
    if (!res) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([res]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false)
  }
  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemon: updateFavPokemons,
      }}
    >
      <div>
        <Navbar />
        <div className="App">
          <SearchBar onSearch={onSearch} />
          {notFound ? (
            <div className="not-found-text">
              No se encontro el Pokemon que buscabas...😢
            </div>
          ) : (
            <Pokedex
              loading={loading}
              pokemons={pokemons}
              page={page}
              setPage={setPage}
              total={total}
            />
          )}
        </div>
        <Footer/>
      </div>
    </FavoriteProvider>
  );
}

export default App;
