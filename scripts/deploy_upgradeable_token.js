const { ethers, upgrades } = require('hardhat');

async function main() {
  try {

    //deploy token
    const Token = await ethers.getContractFactory('Token');
    console.log('Deploying Token...');
    const token = await upgrades.deployProxy(Token, [
      "Token name",
      "Symbol",
      18, //decimals
      "30000000",  //total supply
      [
        "0xEC261AaA4A88Ce37671fEa5027b9d3f2f3C3a445", //marketing wallet address
        "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"  //pc router
      ],
      true, // marketing fee is bnb or token itself
      [
        0, //sellLiquidityFee
        0, //buyLiquidityFee
        35, //sellMarketingFee
        35, //buyMarketingFee
        10, //sellRewardFee
        10, //buyRewardFee
        5, //sellBurnFee
        5 //buyBurnFee
      ],
      [
        "30000000", // maxTransactionAmount
        "30000000", // max wallet    
        100 //gas limit
      ]
    ], { initializer: 'initialize' });
    await token.deployed();
    console.log('token deployed to:', token.address);


    // //deploy timelock
    // const TimelockController = await ethers.getContractFactory('TimelockController');
    // console.log('Deploying TimelockController...');
    // const timelockController = await upgrades.deployProxy(TimelockController, [
    //   1000, //minimum delay time 1000s
    //   [], // proposer  address,  it will be replaced with governor address after the governor deployed
    //   ["0x0000000000000000000000000000000000000000"] // executor
    // ], { initializer: 'initialize' });
    // await timelockController.deployed();
    // console.log('TimelockController deployed to:', timelockController.address);

    // //deploy Governor
    // const Governor = await ethers.getContractFactory('Governor');
    // console.log('Deploying Governor...');
    // const governor = await upgrades.deployProxy(Governor, [
    //   "Governor", //DAO name
    //   token.address,
    //   timelockController.address,
    //   1000, //voting delay
    //   86400, //voting period
    //   4 // quorum fraction 4%
    // ], { initializer: 'initialize' });
    // await governor.deployed();
    // console.log('Token deployed to:', governor.address);
    // const proposer_role=await timelockController.PROPOSER_ROLE();
    // const canceller_role=await timelockController.CANCELLER_ROLE();
    // await timelockController.grantRole(proposer_role, governor.address);
    // await timelockController.grantRole(canceller_role, governor.address);

  } catch (err) {
    console.log(err);
  }
}

main();