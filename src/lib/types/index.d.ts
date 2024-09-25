type UseApiState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  statusCode: string | number;
};

type SendRequestParams<T> = {
  callback?: (data: T | null, error: string | null, statusCode: string | number) => void;
  command: "get" | "post";
  options?: Record<string, any>;
  url: string;
};

type UseApiHookState<T> = UseApiState<T> & {
  sendRequest: (params: SendRequestParams<T>) => void;
};
