import { Wallet } from "./modules/wallet.js";

const initialize = () => {
  const storage = window.localStorage;

  // Connect button.
  const walletButton = document.getElementById("walletButton");
  const wallet = new Wallet(walletButton, storage);
  wallet.resetDisplay();
};

window.addEventListener("DOMContentLoaded", initialize);
