// Import the necessary dependencies from the Polkadot.js library
const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
require('dotenv').config();

// Constants
const RELAY_CHAIN_WS = process.env.RELAY_CHAIN_WS; // Replace with the appropriate relay chain node address
const PARACHAIN_WS = process.env.PARACHAIN_WS; // Replace with your parachain node address
const PARACHAIN_ID = parseInt(process.env.PARACHAIN_ID, 10); // Replace with your parachain ID
const MAX_AMOUNT = 1000000000; // Replace with the maximum amount you are willing to spend (example value)

// Function to execute the coretime buying process
const executeCoretimePurchase = async () => {
  // Establish connection to the parachain and relay chain
  const parachainProvider = new WsProvider(PARACHAIN_WS);
  const relayChainProvider = new WsProvider(RELAY_CHAIN_WS);

  // Create API instances for both parachain and relay chain
  const parachainApi = await ApiPromise.create({ provider: parachainProvider });
  const relayChainApi = await ApiPromise.create({ provider: relayChainProvider });

  // Keyring to sign the transaction
  // Replace with private key to sign the transaction
  const PRIVATE_KEY = process.env.PRIVATE_KEY; // Replace with your private key
  const keyring = new Keyring({ type: 'sr25519' });
  const account = keyring.addFromUri(PRIVATE_KEY);
  console.log(`Using sender account: ${account.address}`); // Replace '//Alice' with the account seed phrase of the coretime buyer

  try {
    // Check if there are any transactions in the parachain's transaction pool
    const txPool = await parachainApi.rpc.author.pendingExtrinsics();
    if (txPool.length === 0) {
      console.log('No transactions found in the parachain transaction pool.');
      return;
    }

    console.log(`${txPool.length} transactions found in the parachain transaction pool.`);

    // Buy coretime to produce a block in the relay chain with the onDemand feature
    // Use the correct extrinsic method `placeOrderKeepAlive(maxAmount, paraId)`
    const coretimeTx = relayChainApi.tx.onDemand.placeOrderKeepAlive(MAX_AMOUNT, PARACHAIN_ID);

    console.log('Sending transaction to buy coretime...');

    // Send and sign the transaction using Alice's account
    const hash = await coretimeTx.signAndSend(account);
    console.log(`Coretime transaction sent with hash: ${hash}`);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Disconnect from both parachain and relay chain
    await parachainApi.disconnect();
    await relayChainApi.disconnect();
  }
};

// Execute the function every 12 seconds
setInterval(executeCoretimePurchase, parseInt(process.env.INTERVAL, 10));

