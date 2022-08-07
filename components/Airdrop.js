import React, { useState } from 'react'
import Image from 'next/image'
import airdrop from '../public/airdrop.png'
import { ethers } from 'ethers'
import gou from '../ethereum/uchiha'
import Uchiha from '../ethereum/build/Uchiha.json'
import Modal from './Modal'
import { useRouter } from 'next/router'

function Airdrop() {
  const [address, setAddress] = useState('')
  const [addy, setAddy] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [buttonMsg, setButtonMsg] = useState('Join Whitelist')
  const [eligible, setEligible] = useState(false)
  const [modalOn, setModalOn] = useState(false)
  const [bool, setBool] = useState(false)

  const Router = useRouter()

  const onClaim = async () => {
    setErrMessage('')
    setBool(true)
    try {
      const check = await gou.whitelistedAddresses(address)

      if (check) {
        setAddy(address)
        setModalOn(true)
      } else {
        setEligible(true)
        setErrMessage(
          'You are not Eligible for the airdrop, join whitelist above',
        )
      }
    } catch (err) {
      setErrMessage(err.message)
    }
    setAddress('')
    setBool(false)
  }

  const onJoin = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      setButtonMsg('Please wait...')
      setErrMessage('')
      setBool(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      try {
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const instance = new ethers.Contract(
          '0x212Fd30e63911B3EFb22d3ab177de3d26b6F5584',
          Uchiha.abi,
          provider.getSigner(),
        )
        await instance.whitelistAddress().then((tx) => tx.wait())

        setButtonMsg('Join Whitelist')
        setAddress('')
        setEligible(false)
        setBool(false)
        Router.push('/')
      } catch (err) {
        setErrMessage(err.message)
        setButtonMsg('Join Whitelist')
        setAddress('')
        setEligible(false)
        setBool(false)
      }
    } else {
      setErrMessage('You dont have Metamask Installed.')
      setAddress('')
      setEligible(false)
    }
  }

  const offModal = (mode) => {
    setModalOn(mode)
  }

  return (
    <div className="flex flex-col justify-center items-center sm:flex-row">
      <div className="">
        <div className="h-80 w-80 sm:h-96 sm:w-96">
          <Image draggable={false} src={airdrop} />
        </div>
      </div>
      <div className="flex flex-col justify-center w-full items-center sm:items-start sm:pt-32">
        <span className="text-xl font-semibold pb-4 italic sm:text-2xl sm:pb-10">
          Are you eligible?
        </span>
        <input
          hidden={eligible}
          className="border-0 border-b-2 border-stone-400 w-4/5 bg-transparent rounded-br-sm rounded-bl-sm pb-1 focus:outline-none"
          placeholder=" Enter Address 0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="py-4">
          {!eligible ? (
            <button
              className="rounded-lg border-2 border-red-800 hover:border-green-400 p-2 text-sm transition delay-100 duration-300 ease-in-out font-semibold"
              onClick={onClaim}
              disabled={bool}
            >
              Check Eligibility
            </button>
          ) : (
            <button
              className="rounded-lg border-2 border-red-800 hover:border-green-400 p-2 text-sm transition delay-100 duration-300 ease-in-out font-semibold"
              onClick={onJoin}
              disabled={bool}
            >
              {buttonMsg}
            </button>
          )}
        </div>

        {errMessage ? (
          <span className="border-0 border-red-800 text-red-400 px-4 sm:px-0">
            <span className="font-semibold text-2xl">Oops...</span>
            <br />
            {errMessage}
          </span>
        ) : null}
      </div>

      {modalOn && <Modal offModal={offModal} address={addy} />}
    </div>
  )
}

export default Airdrop
