import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reducer, { initialState } from "./dataProvider/reducer";
import { StateProvider } from "./dataProvider/StateProvider";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-00oaulus.us.auth0.com"
      clientId="t7DsFbDdMLEcXp7ttTXtJLtODEQ3SVBr"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
