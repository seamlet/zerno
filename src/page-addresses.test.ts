import { describe, expect, it } from "vitest";
import { pageParameterOf } from "./page-addresses";

describe("pageParameterOf", () => {
  it("gives the first page no parameter", () => {
    expect(pageParameterOf("/")).toBeUndefined();
  });

  it("gives another page its address without the leading slash", () => {
    expect(pageParameterOf("/menu")).toBe("menu");
    expect(pageParameterOf("/menu/winter")).toBe("menu/winter");
  });
});
