class Messenger {
  constructor(domElement) {
    this.element = domElement;
  }

  initialize = () => {
    window.addEventListener("newMessage", this.onNew, true);
  };

  new = (content, _type = 1) => {
    window.dispatchEvent(
      new CustomEvent("newMessage", {
        detail: {
          type: _type,
          message: content,
        },
      })
    );
  };

  // Events.
  onNew = (event) => {
    switch (event.detail.type) {
      case 1:
        console.log(event.detail.message);
        break;
      case 0:
        console.error(event.detail.message);
        break;
    }

    var closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Close";
    closeBtn.addEventListener("click", this.onClickClose, true);

    var msgContent = document.createElement("div");
    msgContent.innerHTML = event.detail.message;

    var item = document.createElement("div");
    item.id = "message-" + (this.element.childElementCount + 1);
    item.tabIndex = 0;
    item.classList = !Boolean(event.detail.type) ? "error" : "status";
    item.appendChild(closeBtn);
    item.appendChild(msgContent);

    this.element.append(item);

    // Remove after 3s.
    setTimeout(() => {
      item.remove();
    }, 5000);
  };

  onClickClose = (event) => {
    event.path[1].remove();
  };
}

export { Messenger };
