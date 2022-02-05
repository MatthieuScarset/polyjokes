const Citation = artifacts.require("Citation");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Citation", function (/* accounts */) {
  it("should assert true", async function () {
    await Citation.deployed();
    return assert.isTrue(true);
  });
});
