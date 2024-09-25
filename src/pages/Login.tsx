import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input, { InputType } from "../components/common/Input";
import { ApiCommand } from "../lib/Api";
import useApi from "../lib/hooks/useApi";
import urlConstants from "../lib/constants/url.constants";
import { Path } from "../lib/constants/path.constants";
import { useAuthentication } from "../lib/contexts/AuthenticationContext";

const { login: loginUrl } = urlConstants.auth;

const Login = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuthentication();

  const { loading: isLoginLoading, sendRequest: login } = useApi<string>();

  const onLogin = () => {
    login({
      callback: (data: string | null) => {
        if (data === "OK") {
          setIsAuthenticated(true);
          navigate(Path.HOME);
        }
      },
      command: ApiCommand.POST,
      options: {
        name,
        email,
      },
      url: loginUrl,
    });
  };

  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Input
        label="Username"
        type={InputType.TEXT}
        value={name}
        onChange={(val) => setName(val as string)}
      />
      <Input
        label="Email"
        type={InputType.EMAIL}
        value={email}
        onChange={(val) => setEmail(val as string)}
      />
      {isLoginLoading ? (
        "Loading"
      ) : (
        <button onClick={onLogin} disabled={!name || !email}>
          Submit
        </button>
      )}
    </div>
  );
};

export default Login;
