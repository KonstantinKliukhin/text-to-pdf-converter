import axios from "axios";

import { ENV } from "../../config/env";

export const mainApi = axios.create({
  baseURL: ENV.NEXT_PUBLIC_APP_API_URL,
});

mainApi.interceptors.request.use((config) => {
  // It is better to not include api keys in request like this,
  // because they can be easily stolen
  // but I guess it is ok for the test app

  if (config.url) {
    const url = new URL(config.url, config.baseURL);

    url.searchParams.set("apiKey", ENV.NEXT_PUBLIC_API_KEY);

    config.url = url.pathname + url.search;
  }

  return config;
});
