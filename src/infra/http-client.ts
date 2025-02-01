import axios from "axios";
import { IHttpClient } from "../types";

export class HttpClient implements IHttpClient {
  handle = <TData>(request: IHttpClient.TRequest) =>
    axios.request<TData>(request);
}
