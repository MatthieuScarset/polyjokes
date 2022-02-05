async function main() {
  const Texts = await ethers.getContractFactory("Texts");

  const _contract = await Texts.deploy();
  console.log("Contract deployed to address:", _contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
