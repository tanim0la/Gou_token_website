import Web3 from 'web3'
import Uchiha from './build/Uchiha.json'

let web3

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum)
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/adaa638d09ba451589fc8a00235e3489',
  )
  web3 = new Web3(provider)
}

const instance = new web3.eth.Contract(
  Uchiha.abi,
  '0x212Fd30e63911B3EFb22d3ab177de3d26b6F5584',
)

export default instance
