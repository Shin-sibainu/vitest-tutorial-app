import { http, HttpResponse } from "msw";

// ポケモンデータの型定義
interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
}

// 明示的な型定義を持つオブジェクト
const pokemons: Record<string, PokemonData | undefined> = {
  "1": {
    name: "bulbasaur",
    sprites: { front_default: "http://example.com/bulbasaur.png" },
  },
  "25": {
    name: "pikachu",
    sprites: { front_default: "http://example.com/pikachu.png" },
  },
};

export const handlers = [
  http.get(
    "https://pokeapi.co/api/v2/pokemon/:id",
    async ({ params }: { params: { id: string } }) => {
      const id = params.id;

      // 安全にインデックスを付けるために型が定義されたオブジェクトを使用
      const pokemonData = pokemons[id];
      // ポケモンデータが存在する場合
      if (pokemonData) {
        return HttpResponse.json(
          {
            id,
            ...pokemonData,
          },
          { status: 200 }
        );
      } else {
        // ポケモンデータが存在しない場合は404エラーを返す
        return HttpResponse.json({ message: "Not Found" }, { status: 404 });
      }
    }
  ),
];
