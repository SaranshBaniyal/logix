var MyContract = artifacts.require("Shipment");

module.exports = function (deployer) {
  deployer.deploy(MyContract);
};