import messages from "./messages.js";

const { ethereum } = window;

class Contract {
  constructor(definition = {}, localStorage = null) {
    this.abi = definition.abi || [];
    this.storage = localStorage || window.localStorage;
    this.status = null;
  }

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

  getName = () => {
    return "";
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
