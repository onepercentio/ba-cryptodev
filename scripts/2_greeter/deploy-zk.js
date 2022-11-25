const { utils, Wallet } = require("zksync-web3");
const ethers = require("ethers");
const { HardhatRuntimeEnvironment } = require("hardhat/types");
const { Deployer } = require("@matterlabs/hardhat-zksync-deploy");

const hre = require('hardhat')

// An example of a deploy script that will deploy and call a simple contract.
async function main() {
  console.log(`Running deploy script for the Greeter contract`);

  // Initialize the wallet.
  const wallet = new Wallet("0xad7c172435166249a49f2ec1c7e2c7c977fba561f2b520ff29af71ee5de6d583");

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Greeter");

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  const depositAmount = ethers.utils.parseEther("0.1");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const greeting = "Hello, ";
  const greeterContract = await deployer.deploy(artifact, [greeting]);

  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

  // Call the deployed contract.
  const greetingFromContract = await greeterContract.greet("Alice");
  if (greetingFromContract == greeting) {
    console.log(`Contract greets us with ${greeting}!`);
  } else {
    console.error(`Contract said something unexpected: ${greetingFromContract}`);
  }

  // Edit the greeting of the contract
  const updateGreeting = false
  if (updateGreeting) {
    const newGreeting = "Hi there, ";
    const setNewGreetingHandle = await greeterContract.updateGreeting(newGreeting);
    await setNewGreetingHandle.wait();
  
    const newGreetingFromContract = await greeterContract.greet("Bob");
    if (newGreetingFromContract == newGreeting) {
      console.log(`Contract greets us with ${newGreeting}!`);
    } else {
      console.error(`Contract said something unexpected: ${newGreetingFromContract}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});