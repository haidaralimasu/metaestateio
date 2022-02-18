import React from "react";
import { ChainId, DAppProvider } from "@usedapp/core";
import Minter from "./components/Minter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      "https://mainnet.infura.io/v3/70ced43c56d248f18566ebe01e2d9fbe",
  },
  supportedChains: [ChainId.Mainnet],
};

const App = () => {
  return (
    <DAppProvider config={config}>
      <ToastContainer />
      <Minter />
    </DAppProvider>
  );
};

export default App;
