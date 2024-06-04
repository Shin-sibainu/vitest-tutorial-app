import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonFinder from "../components/PokemonFinder";

describe(PokemonFinder, () => {
  test("初期レンダリングが正しく行われる", async () => {
    render(<PokemonFinder />);
    expect(screen.getByText("ポケモンファインダー"));

    expect(screen.getByText("ポケモンを見つける"));
    expect(screen.getByRole("button")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("ポケモンのIDを入力")
    ).toBeInTheDocument();
  });

  test("ボタンクリックでポケモンデータがフェッチされ、表示される", async () => {
    render(<PokemonFinder />);

    const user = userEvent.setup();

    const inputElement = screen.getByPlaceholderText("ポケモンのIDを入力");
    await user.type(inputElement, "25");

    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);

    const pokemonName = screen.getByText("pikachu");
    expect(pokemonName).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "http://example.com/pikachu.png");
    expect(image).toHaveAttribute("alt", "pikachu");
  });

  test("データの取得中にエラーが発生した場合に適切なエラーメッセージが表示される。", async () => {
    render(<PokemonFinder />);

    const input = screen.getByPlaceholderText("ポケモンのIDを入力");
    const user = userEvent.setup();
    await user.type(input, "999");

    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);

    expect(
      await screen.findByText("ポケモンのデータが見つかりません。")
    ).toBeInTheDocument();
  });
});
