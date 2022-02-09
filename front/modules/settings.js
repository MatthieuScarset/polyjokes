const settings = fetch("/settings.json").then((response) => response.json());

export default await settings;
