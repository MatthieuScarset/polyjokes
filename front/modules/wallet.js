import messages from "./messages.js";

const { ethereum } = window;

class Wallet {
  constructor(domElement, localStorage = null) {
    this.element = domElement;
    this.stateKey = "wallet";
    this.storage = localStorage || window.localStorage;
  }

  // State management.
  getAccount() {
    return this.storage.getItem(this.stateKey);
  }
  setAccount(value) {
    this.storage.setItem(this.stateKey, value);
  }
  removeAccount() {
    this.storage.removeItem(this.stateKey);
  }

  // Utilities.
  isConnected = () => {
    return Boolean(this.getAccount());
  };
  connect = async () => {
    try {
      let accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(accounts);
      if (accounts && accounts.length > 0) {
        this.setAccount(accounts[0]);
      }
    } catch (error) {
      this.disconnect();
      messages(error.code + " " + error.message);
      return;
    }

    // @todo Trigger onConnect event.
  };
  disconnect = () => {
    this.removeAccount();

    // @todo Trigger onDisconnect event.
  };

  // Rendering.
  displayWalletStatus = () => {
    messages(
      this.isConnected() ? "Connected: " + this.getAccount() : "Not connected."
    );
  };
  displayWalletButton = () => {
    this.element.disabled = !Boolean(ethereum);

    this.element.innerHTML = !Boolean(ethereum)
      ? "Install metamask"
      : this.isConnected()
      ? "Disconnect"
      : "Connect";

    this.element.addEventListener("click", this.onClick, true);
  };

  // Events.
  onClick = async () => {
    this.element.disabled = true;

    if (this.isConnected()) {
      // Disconnect.
      this.element.innerText = "Disconnecting...";
      this.disconnect();
      this.displayWalletButton();
      messages("Disconnected.");
    } else {
      // Try to connect.
      this.element.innerText = "Loading...";
      this.connect();
    }

    // Reset button.
    this.displayWalletStatus();
    this.displayWalletButton();
  };
}

export { Wallet };
