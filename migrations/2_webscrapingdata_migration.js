const WebScrapingData = artifacts.require('WebScrapingData')
const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
const { Oracle } = require('@chainlink/contracts/truffle/v0.4/Oracle')

module.exports = (deployer, network, [defaultAccount]) => {
  // Local (development) networks need their own deployment of the LINK
  // token and the Oracle contract
  if (network.startsWith('ropsten')) {
    Oracle.setProvider(deployer.provider)

    deployer
      .deploy(WebScrapingData, '0x20fE562d797A42Dcb3399062AE9546cd06f63280')
      .then(async (instance) => {
        await instance.setUrl('http://abehiroshi.la.coocan.jp/movie/eiga.htm')
        Oracle.setProvider(deployer.provider)
        return deployer.deploy(Oracle, '0x20fE562d797A42Dcb3399062AE9546cd06f63280', { from: defaultAccount })
      })
      .then(async (instance) => {
        await instance.setFulfillmentPermission('0xDC4D1E89A01557Fa6C81bfD2de56D73236708BA0', true, { from: defaultAccount })
      })
  } else if (network.startsWith('live')) {
    // For live networks, use the 0 address to allow the ChainlinkRegistry
    // contract automatically retrieve the correct address for you
    deployer.deploy(WebScrapingData, '0x0000000000000000000000000000000000000000')
  } else {
    LinkToken.setProvider(deployer.provider)
    Oracle.setProvider(deployer.provider)

    deployer.deploy(LinkToken, { from: defaultAccount }).then(link => {
      return deployer
        .deploy(Oracle, link.address, { from: defaultAccount })
        .then(() => {
          return deployer.deploy(WebScrapingData, link.address)
        })
    })
  }
}
