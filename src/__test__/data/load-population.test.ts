import { LoadPopulation } from "../../data/load-population";
import { IHttpClient } from "../../types";

describe("LoadPopulation", () => {
  it("should load the population correctly", async () => {
    const httpClientSpy: IHttpClient = {
      handle: jest.fn().mockResolvedValue({ data: { foo: "bar" } }),
    };

    const loadPopulation = new LoadPopulation(httpClientSpy);

    const response = await loadPopulation.handle();

    expect(httpClientSpy.handle).toHaveBeenCalled();
    expect(response).toStrictEqual({ foo: "bar" });
  });

  it("should throw the http client error", async () => {
    const httpClientSpy: IHttpClient = {
      handle: jest.fn().mockRejectedValue("error"),
    };

    const loadPopulation = new LoadPopulation(httpClientSpy);

    try {
      await loadPopulation.handle();
    } catch (e) {
      expect(e).toBe("error");
    }
  });
});
