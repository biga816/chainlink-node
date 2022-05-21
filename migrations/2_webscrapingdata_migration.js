require("dotenv/config");
const WebScrapingData = artifacts.require("WebScrapingData");
const Oracle = artifacts.require("Oracle");

module.exports = (deployer, network, [defaultAccount]) => {
  Oracle.setProvider(deployer.provider);

  deployer
    .deploy(WebScrapingData, process.env.LINKTOKEN_ADDRESS)
    .then(async (instance) => {
      await instance.setUrl("http://abehiroshi.la.coocan.jp/movie/eiga.htm");
      Oracle.setProvider(deployer.provider);
      return deployer.deploy(
        Oracle,
        process.env.LINKTOKEN_ADDRESS,
        defaultAccount,
        {
          from: defaultAccount,
        }
      );
    })
    .then(async (instance) => {
      await instance.setAuthorizedSenders(
        [process.env.CHAINLINK_NODE_ACCOUNT],
        { from: defaultAccount }
      );
    });
};
