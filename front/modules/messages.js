const messages = (text) => {
  console.log(text);
  let box = document.getElementById("messages");
  box.classList.remove("hidden");
  box.innerHTML = text;
  setTimeout(() => {
    box.classList.add("hidden");
  }, 3000);
};

export default messages;
