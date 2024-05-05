import {Web3} from "web3";
//const {Web3} = require("web3");

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/fd4bf29c6e43458a9f1c75ca6d8179b7"
  );
  web3 = new Web3(provider);
}

export default web3;
