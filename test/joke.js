const Joke = artifacts.require("Joke");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Joke", function (/* accounts */) {
  it("should assert true", async function () {
    await Joke.deployed();
    return assert.isTrue(true);
  });
});
