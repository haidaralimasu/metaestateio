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
      "https://mainnet.infura.io/v3/ed0dd7303c2c4cbb995e6a5536f207f9",
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
