import { LoadNeighborhoods } from "../../data/load-neighborhoods";
import { ILoadGeojsonUseCase } from "../../domain/usecases/load-geojson.usecase";
import { ILoadPopulationUseCase } from "../../domain/usecases/load-population.usecase";

describe("LoadNeighborhoods", () => {
  it("should load the geojson and the population correctly", async () => {
    const loadGeojsonSpy: ILoadGeojsonUseCase = {
      handle: jest.fn().mockResolvedValue({ foo: "geo" }),
    };

    const loadPopulationSpy: ILoadPopulationUseCase = {
      handle: jest.fn().mockResolvedValue({ foo: "pop" }),
    };

    const loadNeighborhoods = new LoadNeighborhoods(
      loadGeojsonSpy,
      loadPopulationSpy
    );

    const response = await loadNeighborhoods.handle();

    expect(loadGeojsonSpy.handle).toHaveBeenCalled();
    expect(loadPopulationSpy.handle).toHaveBeenCalled();
    expect(response).toStrictEqual({
      status: "success",
      geojson: { status: "fulfilled", data: { foo: "geo" } },
      population: { status: "fulfilled", data: { foo: "pop" } },
    });
  });

  it("should behave correctly when geojson fails", async () => {
    const loadGeojsonSpy: ILoadGeojsonUseCase = {
      handle: jest.fn().mockRejectedValue(undefined),
    };

    const loadPopulationSpy: ILoadPopulationUseCase = {
      handle: jest.fn().mockResolvedValue({ foo: "pop" }),
    };

    const loadNeighborhoods = new LoadNeighborhoods(
      loadGeojsonSpy,
      loadPopulationSpy
    );

    const response = await loadNeighborhoods.handle();

    expect(response).toStrictEqual({
      status: "geojson_failed",
      geojson: { status: "rejected", data: null },
      population: { status: "fulfilled", data: { foo: "pop" } },
    });
  });

  it("should behave correctly when population fails", async () => {
    const loadGeojsonSpy: ILoadGeojsonUseCase = {
      handle: jest.fn().mockResolvedValue({ foo: "geo" }),
    };

    const loadPopulationSpy: ILoadPopulationUseCase = {
      handle: jest.fn().mockRejectedValue(undefined),
    };

    const loadNeighborhoods = new LoadNeighborhoods(
      loadGeojsonSpy,
      loadPopulationSpy
    );

    const response = await loadNeighborhoods.handle();

    expect(response).toStrictEqual({
      status: "population_failed",
      geojson: { status: "fulfilled", data: { foo: "geo" } },
      population: { status: "rejected", data: [] },
    });
  });

  it("should behave correctly when both geojson and population fail", async () => {
    const loadGeojsonSpy: ILoadGeojsonUseCase = {
      handle: jest.fn().mockRejectedValue(undefined),
    };

    const loadPopulationSpy: ILoadPopulationUseCase = {
      handle: jest.fn().mockRejectedValue(undefined),
    };

    const loadNeighborhoods = new LoadNeighborhoods(
      loadGeojsonSpy,
      loadPopulationSpy
    );

    const response = await loadNeighborhoods.handle();

    expect(response).toStrictEqual({
      status: "both_failed",
      geojson: { status: "rejected", data: null },
      population: { status: "rejected", data: [] },
    });
  });
});
