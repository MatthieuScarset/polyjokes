import { Messenger } from "./modules/messenger.js";
import { Wallet } from "./modules/wallet.js";
const storage = window.localStorage;

const initialize = () => {
  const messageBoxes = document.getElementById("messages");
  const messenger = new Messenger(messageBoxes);
  messenger.initialize();

  // Connect button.
  const walletButton = document.getElementById("walletButton");
  const wallet = new Wallet(walletButton, storage);
  wallet.initialize();
};

window.addEventListener("DOMContentLoaded", initialize);
