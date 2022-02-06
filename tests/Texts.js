const { expect } = require("chai");

describe("Texts contract", function () {
  let owner;

  before(async function () {
    this.accounts = await ethers.getSigners();
    owner = await this.accounts[0].getAddress();

    this.Contract = await ethers.getContractFactory("Texts");
    this.contract = await this.Contract.deploy();
    await this.contract.deployed();
  });

  beforeEach(async function () {
    // Nothing specific to do, yet.
  });

  it("Check contract info", async function () {
    let texts = await this.contract.getTexts(owner);
    console.log(texts);
    // expect(i).to.equal("0");
  });

  it("Write a text", async function () {
    let i = await this.contract.writeText("Hola", { from: owner });
    await i.wait();
    console.log(i);
    expect(i.value).to.equal("0");
  });
});
