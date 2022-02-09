import messages from "./messages.js";

const { ethereum } = window;

class Wallet {
  constructor(domElement, localStorage = null) {
    this.element = domElement;
    this.stateKey = "wallet";
    this.storage = localStorage || window.localStorage;
    this.status = Boolean(this.getAccount()) ? 1 : 0;
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
        this.status = 1;
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
    this.status = -1;

    // @todo Trigger onDisconnect event.
  };

  // Rendering.
  resetDisplay = () => {
    this.displayWalletStatus();
    this.displayWalletButton();
  };

  displayWalletStatus = () => {
    let message = "";

    message += !Boolean(ethereum) ? "No wallet detected." : "";
    message += this.status == 0 ? "Not connected." : "";
    message += this.status == -1 ? "Disconnected." : "";
    message +=
      this.status == 1
        ? "Connected: " +
          "<br>" +
          '<code class="block p-2 bg-slate-800 text-white">' +
          this.getAccount() +
          "</code>"
        : "";

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
    this.element.innerHTML =
      this.status == -1
        ? "Reconnect"
        : this.status == 1
        ? "Disconnect"
        : "Connect";
    this.element.addEventListener("click", this.onClick, true);
  };

  // Events.
  onClick = async () => {
    this.element.disabled = true;

    if (this.status !== 1) {
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
