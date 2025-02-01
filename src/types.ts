import { AxiosRequestConfig, AxiosResponse } from "axios";

export declare namespace IHttpClient {
  export type TRequest = AxiosRequestConfig;
  export type TResponse<TData> = AxiosResponse<TData>;
}

export interface IHttpClient {
  handle: <TData>(
    request: IHttpClient.TRequest
  ) => Promise<IHttpClient.TResponse<TData>>;
}
