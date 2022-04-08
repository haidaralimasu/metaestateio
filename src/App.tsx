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
      "https://mainnet.infura.io/v3/d014af161a4b4ffbaa358366e232e2c8",
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
