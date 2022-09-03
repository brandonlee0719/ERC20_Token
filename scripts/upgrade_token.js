// scripts/upgrade_Token.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const Token = await ethers.getContractFactory('Token');
  console.log('Upgrading Token...');
  await upgrades.upgradeProxy('0x20e62b11c6d855ad8025eb900ab532ec0ffeb643', Token);
  console.log('Token upgraded');
}

main();