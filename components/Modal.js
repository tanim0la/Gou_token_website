import React, { useState } from 'react'
import Image from 'next/image'
import Web3 from 'web3'
import gou from '../ethereum/uchiha'
import cong from '../public/cong.png'

function Modal(props) {
  const [buttonMsg, setButtonMsg] = useState('Claim!')
  const [bool, setBool] = useState(false)

  const onClaim = async () => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const isClaimed = await gou.methods.claimedAddresses(props.address).call()

    setButtonMsg('Claiming...')
    setBool(true)
    try {
      if (!isClaimed) {
        await gou.methods.claim().send({
          from: accounts[0],
        })
      }
    } catch (err) {
      onCancel()
    }
    setButtonMsg('Claimed!')
  }

  const onCancel = () => {
    props.offModal(false)
  }
  return (
    <div className="flex bg-zinc-100 justify-center items-center fixed h-screen w-screen inset-0 z-50 transition-all">
      <div className="flex flex-col p-2 bg-white rounded-xl h-fit sm:h-3/4 w-2/3 md:w-1/2">
        <div className="flex justify-end px-2">
          <span
            onClick={onCancel}
            className=" cursor-pointer text-gray-400 font-semibold"
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
