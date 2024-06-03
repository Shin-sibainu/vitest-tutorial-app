import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { APIServer } from "./src/test/server";

beforeAll(() => APIServer.listen()); //テスト前にサーバーを待機状態にする
afterAll(() => APIServer.close()); //テスト後にサーバーを終了させる
afterEach(() => APIServer.resetHandlers()); //テスト毎にリクエストハンドラをリセットする。
