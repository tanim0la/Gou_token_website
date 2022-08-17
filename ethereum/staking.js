import { ethers } from 'ethers'
import Staking from './build/Staking.json'

let instance

if (
  typeof window !== 'undefined' &&
  typeof window.ethereum !== 'undefined' &&
  window.ethereum.selectedAddress !== null
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  instance = new ethers.Contract(
    '0x31fd0691809Ec54499d7363Be76807c9cbDD0e38',
    Staking.abi,
    provider.getSigner(),
  )
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rinkeby.infura.io/v3/adaa638d09ba451589fc8a00235e3489',
  )

  instance = new ethers.Contract(
    '0x31fd0691809Ec54499d7363Be76807c9cbDD0e38',
    Staking.abi,
    provider,
  )
}

export default instance
