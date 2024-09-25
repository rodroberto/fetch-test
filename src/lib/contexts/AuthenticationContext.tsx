import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useApi from "../hooks/useApi";
import { ApiCommand } from "../Api";

interface IAuthenticationContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthenticationContext = createContext<IAuthenticationContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { sendRequest: authCheck } = useApi();

  const onChangeAuthentication = useCallback((value: boolean) => {
    setIsAuthenticated(value);
  }, []);

  // Auth token expires after 1 hour login, this will help if token is still in browser cookie or not
  useEffect(() => {
    const checkIsAuthenticated = async () => {
      await authCheck({
        command: ApiCommand.GET,
        url: "",
        callback: (_data, _error, statusCode) => {
          if (statusCode === 401) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        },
      });
    };

    checkIsAuthenticated();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated: onChangeAuthentication }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within a AuthenticationContext"
    );
  }
  return context;
};

export { AuthenticationContext, AuthenticationProvider, useAuthentication };
