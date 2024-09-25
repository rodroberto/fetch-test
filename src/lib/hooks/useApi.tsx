import { useState } from "react";

import Api from "../Api";

const useApi = <T,>(): UseApiHookState<T> => {
  const defaultState: UseApiState<T> = {
    data: null,
    error: null,
    loading: false,
    statusCode: "",
  };

  const [state, setState] = useState<UseApiState<T>>(defaultState);

  const sendRequest = ({
    command,
    url,
    options = {},
    callback,
  }: SendRequestParams<T>): void => {
    setState({
      ...defaultState,
      loading: true,
    });

    (async () => {
      const newState: UseApiState<T> = {
        ...defaultState,
        loading: false,
      };

      const { data, error } = await Api[command]<T>(url, options);

      newState.data = data ?? null;
      newState.error = error;
      newState.statusCode = error?.status || "";

      setState(newState);
      callback?.(newState.data, newState.error, newState.statusCode);
    })();
  };

  return {
    ...state,
    sendRequest,
  };
};

export default useApi;
