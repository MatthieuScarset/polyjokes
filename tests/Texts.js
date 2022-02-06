const { expect } = require("chai");

describe("Texts contract", function () {
  let owner, contract;

  before(async function () {
    this.accounts = await ethers.getSigners();
    owner = await this.accounts[0].getAddress();

    this.Contract = await ethers.getContractFactory("Texts");
    this.contract = await this.Contract.deploy();
    await this.contract.deployed();
    contract = this.contract;
  });

  beforeEach(async function () {
    // Nothing specific to do, yet.
  });

  it("Check contract info", async function () {
    let texts = await contract.getTexts(owner);
    expect(texts.length).to.equal(0);
  });

  it("Write a text", async function () {
    let i = await this.contract.writeText("Hola", { from: owner });
    await i.wait();
    expect(i.value.toString()).to.equal("0");
  });

  it("Check text exists", async function () {
    let texts = await contract.getTexts(owner);
    expect(texts.length).to.equal(1);
  });
});
