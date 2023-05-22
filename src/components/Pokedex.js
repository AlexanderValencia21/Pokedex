import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

export default function Pokedex(props) {
  const { pokemons, page, setPage, total, loading } = props;
  function lastPage() {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  }
  function nextPage() {
    const nextPage = Math.min(page + 1, total);
    setPage(nextPage);
  }

  return (
    <div>
      <div className="header">
        <h1> Pokedex </h1>
        <Pagination
          page={page + 1}
          totalPages={total}
          onLeftClick={lastPage}
          onRightClick={nextPage}
        />
      </div>
      {loading ? (
        <div>Loading Pokemons...</div>
      ) : (
        <div className="pokedex-grid">
          {pokemons.map((pokemon, idx) => {
            return <Pokemon pokemon={pokemon} key={pokemon.name} />;
          })}
        </div>
      )}
    </div>
  );
}
