import { LoadGeojson } from "../../data/load-geojson";
import { IHttpClient } from "../../types";

describe("LoadGeojson", () => {
  it("should load the geojson correctly", async () => {
    const httpClientSpy: IHttpClient = {
      handle: jest.fn().mockResolvedValue({ data: { foo: "bar" } }),
    };

    const loadGeojson = new LoadGeojson(httpClientSpy);

    const response = await loadGeojson.handle();

    expect(httpClientSpy.handle).toHaveBeenCalled();
    expect(response).toStrictEqual({ foo: "bar" });
  });

  it("should throw the http client error", async () => {
    const httpClientSpy: IHttpClient = {
      handle: jest.fn().mockRejectedValue("error"),
    };

    const loadGeojson = new LoadGeojson(httpClientSpy);

    try {
      await loadGeojson.handle();
    } catch (e) {
      expect(e).toBe("error");
    }
  });
});
