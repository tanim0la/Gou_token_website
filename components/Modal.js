import { useState } from 'react'
import Image from 'next/image'
import { ethers } from 'ethers'
import gou from '../ethereum/uchiha'
import Uchiha from '../ethereum/build/Uchiha.json'
import cong from '../public/cong.png'

function Modal(props) {
  const [buttonMsg, setButtonMsg] = useState('Claim!')
  const [bool, setBool] = useState(false)

  const onClaim = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      const isClaimed = await gou.claimedAddresses(props.address)

      setButtonMsg('Claiming...')
      setBool(true)
      try {
        if (!isClaimed) {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          const instance = new ethers.Contract(
            '0x212Fd30e63911B3EFb22d3ab177de3d26b6F5584',
            Uchiha.abi,
            provider.getSigner(),
          )
          await instance.claim().then((tx) => tx.wait())
        }
      } catch (err) {
        onCancel()
      }
      setButtonMsg('Claimed!')
    } else {
      setButtonMsg('No Metamask!')
    }
  }

  const onCancel = () => {
    props.offModal(false)
  }

  return (
    <div className="flex bg-zinc-100 bg-opacity-30 justify-center items-center fixed h-screen w-screen inset-0 z-50 transition-all">
      <div className="flex flex-col p-2 bg-white rounded-xl h-fit sm:h-3/4 w-2/3 md:w-1/2">
        <div className="flex justify-end px-2">
          <span
            onClick={onCancel}
            className=" cursor-pointer text-gray-400 font-semibold hover:text-gray-600"
          >
            X
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className=" flex justify-start w-1/2 h-2/3 md:h-72 md:w-72">
            <Image src={cong} />
          </div>
          <span className="text-red-800 text-xl font-bold sm:text-3xl md:justify-end items-end">
            Claim your GOU tokens
            <div className="py-4 flex justify-center">
              <button
                disabled={bool}
                onClick={onClaim}
                className="rounded-lg border-2 border-red-800 hover:bg-red-800 hover:text-white px-5 py-1 text-base transition delay-100 duration-300 ease-in-out font-semibold sm:px-5 sm:py-3"
              >
                {buttonMsg}
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Modal
