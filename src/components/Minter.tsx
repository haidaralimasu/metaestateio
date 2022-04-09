import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { address } from "../contract";
import nftabi from "../contract/NFT.json";
import { ethers } from "ethers";
// import banner from "../bg.png";
import { notifyMintSuccess, notifyError, notifyNetwork } from "../toast";
import {
  useBalanceOf,
  useTotalSupply,
  useMaxSupply,
  useCost,
  useNftPerAddressLimit,
  useIsWhitelisted,
  useOnlyWhitelisted,
  useHasClaimed,
  useWeiCost,
} from "../hooks";

declare var window: any;

const Minter = () => {
  const { account, activateBrowserWallet } = useEthers();
  const [minting, setMinting] = useState(false);
  const totalSupply = useTotalSupply();
  const maxSupply = useMaxSupply();
  const cost = useCost();
  const weiCost = useWeiCost();
  const nftbalance = useBalanceOf(account);
  const [amount, setAmount] = useState(1);
  const onlyWhitelisted = useOnlyWhitelisted();
  const isWhitelisted = useIsWhitelisted(account);
  const nftLimit = useNftPerAddressLimit();
  const hasClaimed = useHasClaimed(account);

  const increase = () => {
    if (amount < 3) {
      setAmount(amount + 1);
    }
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const nftInterface = new ethers.utils.Interface(nftabi);

  const onError = () => {
    notifyNetwork();
  };

  async function handleMint() {
    try {
      setMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const txCost = Number(weiCost) * amount;
      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      let transaction = await nftcontract.mint(amount, {
        value: txCost.toString(),
      });
      await transaction.wait();
      setMinting(false);
      setAmount(1);
      notifyMintSuccess();
    } catch (error) {
      notifyError();
      setAmount(1);
      console.log(error);
      setMinting(false);
    }
  }

  async function handleClaimFree() {
    try {
      setMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      let transaction = await nftcontract.claimFree();
      await transaction.wait();
      setMinting(false);
      setAmount(1);
      notifyMintSuccess();
    } catch (error) {
      notifyError();
      setAmount(1);
      console.log(error);
      setMinting(false);
    }
  }

  return (
    <>
      <div className="minter-main">
        {/* <img src={banner} className="banner" alt="banner" /> */}

        {/* <h1 className="minter-h1">Mint Your Meta Estate NFT</h1> */}
        <h1 style={{color:"white"}} className="minter-h1">MetaEstateIO Mint is Live</h1>

        {totalSupply < maxSupply ? (
          <div className="minting-section">
            {account ? (
              <div className="minting-section">
                <button className="connect btn btn-gradient-blue">{`${account.slice(
                  0,
                  6
                )}...${account.slice(-6)}`}</button>

                <>
                  {nftbalance >= 2 ? (
                    <>
                      {!hasClaimed ? (
                        null
                      ) : null}
                    </>
                  ) : null}
                </>

                {onlyWhitelisted ? (
                  <>
                    <>
                      {isWhitelisted ? (
                        <>
                          {nftbalance < nftLimit + 1 ? (
                            <div>
                              {/*<button
                                className="btn btn-round amount  btn-gradient-blue"
                                onClick={() => decrease()}
                              >
                                -
                              </button>*/}
                              <button
                                onClick={() => handleMint()}
                                className="btn mint  btn-gradient-blue"
                              >
                                {minting ? "Please Wait" : `Mint ${amount}`}
                              </button>
                              {/*<button
                                className="btn btn-round amount  btn-gradient-blue"
                                onClick={() => increase()}
                              >
                                +
                              </button>*/}
                            </div>
                          ) : (
                            <button className="btn mint  btn-gradient-blue">
                              You have reached your mint limit
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <button className="btn mint  btn-gradient-blue">
                            Please Wait for Public Sale
                          </button>
                        </>
                      )}
                    </>
                  </>
                ) : (
                  <>
                    <div>
                      {/* <button
                        className="btn btn-round amount  btn-gradient-blue"
                        onClick={() => decrease()}
                      >
                        -
                      </button>*/}
                      <button
                        onClick={() => handleMint()}
                        className="btn mint  btn-gradient-blue"
                      >
                        {minting ? "Please Wait" : `Mint ${amount}`}
                      </button>
                      {/*<button
                        className="btn btn-round amount  btn-gradient-blue"
                        onClick={() => increase()}
                      >
                        +
                      </button>*/}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => activateBrowserWallet(onError)}
                  className="connect btn btn-gradient-blue"
                >
                  Connect Metamask
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="minting-section">
            <button className="connect btn btn-gradient-blue">
              Sale Ended
            </button>
          </div>
        )}

        {totalSupply < maxSupply ? (
          <div className="minter-status">
            <div className="minter-status-card">
              <h6>Status</h6>

              <h2>Live</h2>
            </div>
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>Price</h6>
              <h2>{cost} ETH</h2>
            </div>
            <div className="vl"></div>
            {account ? (
              <>
                {onlyWhitelisted ? (
                  <>
                    {isWhitelisted ? (
                      <div className="minter-status-card">
                        <h6>Your Mint</h6>
                        <h2>
                          {nftbalance}/{nftLimit}
                        </h2>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>To Be Minted</h6>
              <h2>{maxSupply - totalSupply}</h2>
            </div>
          </div>
        ) : (
          <div className="minter-status">
            <div className="minter-status-card">
              <h6>Status</h6>
              <h2>Ended</h2>
            </div>
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>Price</h6>
              <h2>{cost}</h2>
            </div>
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>To Be Minted</h6>
              <h2>
                {maxSupply - totalSupply}/{maxSupply}
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Minter;
