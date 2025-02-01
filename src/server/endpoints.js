import { HttpResponse, http, delay } from "msw";
import bairros from "./response_geometrias_bairros.json";
import populacao from "./response_populacao_bairros.json";

export const endpoints = [
  http.get("/bairros-geojson", async () => {
    await delay(2000);
    return HttpResponse.json(bairros);
    // return HttpResponse.json(null, { status: 400 });
  }),
  http.get("/populacao", async () => {
    await delay(2000);
    return HttpResponse.json(populacao);
    // return HttpResponse.json(null, { status: 400 });
  }),
];
