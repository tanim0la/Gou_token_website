import { ethers } from "ethers"
import Staking from "./build/Staking.json"

let instance

if (
  typeof window !== "undefined" &&
  typeof window.ethereum !== "undefined" &&
  window.ethereum.selectedAddress !== null
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  instance = new ethers.Contract(
    "0x14e31AAD6E875cC552d24dD177730b1958CC6C02",
    Staking.abi,
    provider.getSigner(),
  )
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/adaa638d09ba451589fc8a00235e3489",
  )

  instance = new ethers.Contract(
    "0x14e31AAD6E875cC552d24dD177730b1958CC6C02",
    Staking.abi,
    provider,
  )
}

export default instance
