import { useState } from "react";

const PokemonFinder = () => {
  const [pokemonId, setPokemonId] = useState(""); // ユーザー入力用の状態を追加
  const [pokemon, setPokemon] = useState<{ name: string; image: string }>();

  const fetchPokemonById = async () => {
    if (pokemonId) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      if (response.ok) {
        const data = await response.json();
        const { name, sprites } = data;
        setPokemon({ name, image: sprites.front_default });
      } else {
        console.error("Failed to fetch Pokemon:", response.status);
        alert("ポケモンのデータが見つかりません。");
      }
    } else {
      alert("ポケモンのIDを入力してください。");
    }
  };

  return (
    <div className="App">
      <h1>ポケモンファインダー</h1>
      <input
        type="number"
        value={pokemonId}
        onChange={(e) => setPokemonId(e.target.value)}
        placeholder="ポケモンのIDを入力"
      />
      <button onClick={fetchPokemonById}>ポケモンを見つける</button>
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={{ width: 250, height: 250 }}
          />
        </div>
      )}
    </div>
  );
};

export default PokemonFinder;
