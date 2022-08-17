import { ethers } from 'ethers'
import Uchiha from './build/Uchiha.json'

let instance

if (
  typeof window !== 'undefined' &&
  typeof window.ethereum !== 'undefined' &&
  window.ethereum.selectedAddress !== null
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  instance = new ethers.Contract(
    '0x212Fd30e63911B3EFb22d3ab177de3d26b6F5584',
    Uchiha.abi,
    provider.getSigner(),
  )
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rinkeby.infura.io/v3/adaa638d09ba451589fc8a00235e3489',
  )

  instance = new ethers.Contract(
    '0x212Fd30e63911B3EFb22d3ab177de3d26b6F5584',
    Uchiha.abi,
    provider,
  )
}

export default instance
