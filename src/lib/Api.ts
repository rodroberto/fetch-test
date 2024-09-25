import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { API_GATEWAY } from "./constants/env.constants";

export enum ApiCommand {
  GET = "get",
  POST = "post",
}

class Api {
  static encodedAmpersand: string = encodeURIComponent("&");

  static readonly axiosConfig: AxiosRequestConfig = {
    baseURL: API_GATEWAY,
    withCredentials: true,
  };

  static readonly instance: AxiosInstance = axios.create(Api.axiosConfig);

  static get client(): AxiosInstance {
    return Api.instance;
  }

  static buildQueryParam([key, value]: [string, any]): string {
    if (Array.isArray(value)) {
      return value
        .map((paramVal) => {
          return `${key}=${paramVal}`;
        })
        .join("&");
    }
    return `${key}=${value}`;
  }

  static buildRequestString(
    url: string,
    queryParams: Record<string, any> = {}
  ): string {
    let queryString = Object.entries(queryParams)
      .map(Api.buildQueryParam)
      .join("&");
    if (queryString) queryString = `?${queryString}`;
    return `${url}${queryString}`;
  }

  static async get<T>(
    url: string,
    queryParams: Record<string, any> = {}
  ): Promise<any> {
    const queryString = Api.buildRequestString(url, queryParams);

    try {
      const response = await Api.client.get<T>(queryString);
      return { data: response.data };
    } catch (err) {
      return {
        error: err,
      };
    }
  }

  static async post<T>(
    url: string,
    options: Record<string, any> = {}
  ): Promise<any> {
    const queryString = Api.buildRequestString(url);

    try {
      const response = await Api.client.post<T>(queryString, options);
      return { data: response.data };
    } catch (err) {
      return {
        error: "post error",
      };
    }
  }
}

export default Api;
