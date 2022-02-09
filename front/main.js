import { Wallet } from "./modules/wallet.js";

const initialize = () => {
  const storage = window.localStorage;

  // Connect button.
  const walletButton = document.getElementById("walletButton");
  const wallet = new Wallet(walletButton, storage);
  wallet.displayWalletStatus();
  wallet.displayWalletButton();
};

window.addEventListener("DOMContentLoaded", initialize);
