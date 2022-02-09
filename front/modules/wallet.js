import messages from "./messages.js";

const { ethereum } = window;

class Wallet {
  constructor(domElement, localStorage = null) {
    this.element = domElement;
    this.stateKey = "wallet";
    this.storage = localStorage || window.localStorage;
    this.status = Boolean(this.getAccount());
  }

  // State management.
  getAccount = () => {
    return this.storage.getItem(this.stateKey);
  };

  setAccount = (value) => {
    this.storage.setItem(this.stateKey, value);
  };

  removeAccount = () => {
    this.storage.removeItem(this.stateKey);
  };

  // Utilities.
  connect = async () => {
    await ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        messages("Connection successful!");
        this.setAccount(accounts[0]);
        this.status = true;
        // @todo Trigger onConnect event.
        this.resetDisplay();
      })
      .catch((error) => {
        this.disconnect();
        messages(error.code + " " + error.message);
        this.resetDisplay();
      });
  };

  disconnect = () => {
    this.removeAccount();
    this.status = false;

    // @todo Trigger onDisconnect event.
  };

  // Rendering.
  resetDisplay = () => {
    this.displayWalletStatus();
    this.displayWalletButton();
  };

  displayWalletStatus = () => {
    let message = "";

    message += this.status
      ? "Connected: " + "<br>" + "<code>" + this.getAccount() + "</code>"
      : !Boolean(ethereum)
      ? "No wallet detected."
      : "Not connected.";

    if (!Boolean(ethereum)) {
      // Install wallet suggestion.
      message += "<br>";
      message += "Please install one provider such as ";
      message += '<a target="_blank" href="https://frame.sh/">Frame.sh</a>';
      message += " or ";
      message +=
        '<a target="_blank" href="https://metamask.io/">Metamask.io</a>';
    }

    messages(message);
  };

  displayWalletButton = () => {
    this.element.disabled = !Boolean(ethereum);
    this.element.innerHTML = this.status ? "Disconnect" : "Connect";
    this.element.addEventListener("click", this.onClick, true);
  };

  // Events.
  onClick = async () => {
    this.element.disabled = true;

    if (!this.status) {
      // Try to connect.
      this.element.innerText = "Loading...";
      this.connect();
    } else {
      // Disconnect.
      this.element.innerText = "Disconnecting...";
      this.disconnect();
    }

    // Reset button.
    this.resetDisplay();
  };
}

export { Wallet };
