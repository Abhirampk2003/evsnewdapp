import web3 from './web3';
//const {Web3} = require('web3');
import Electioncreation from '../ethereum/build/ElectionCreation.json';
//const Electioncreation = require("./build/Electioncreation.json");
//const web3 = new Web3("https://sepolia.infura.io/v3/840152b62f154721b04b828a8edcb024")
const instance = new web3.eth.Contract(
    Electioncreation.abi,
    "0x74FCF7b8AD47a5C95C9a3e030658E62A1e63F6Ac"
);
//console.log(instance);

export default instance;
