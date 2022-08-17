import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import gou from '../ethereum/uchiha'
import stake from '../ethereum/staking'
import StakingArtifacts from '../ethereum/build/Staking.json'
import GouArtifacts from '../ethereum/build/Uchiha.json'
import Image from 'next/image'
import mm from '../public/mm.png'
import Countdown from './Countdown'

function Staking(props) {
  const [address, setAddress] = useState('')
  const [word, setWord] = useState('Connect Wallet')
  const [available, setAvailable] = useState()
  const [allowance, setAllowance] = useState()
  const [stakingInstance, setStakingInstance] = useState()
  const [gouInstance, setGouInstance] = useState()
  const [amountStaked, setAmountStaked] = useState()
  const [reward, setReward] = useState()
  const [apyy, setApyy] = useState()
  const [bool, setBool] = useState(true)
  const [connected, setConnected] = useState(false)
  const [staking, setStaking] = useState(false)

  useEffect(() => {
    const onConnectt = async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      })

      if (accounts[0]) {
        try {
          setAddress(accounts[0])
          setConnected(true)
          const provider = new ethers.providers.Web3Provider(window.ethereum)

          const stakingInstance = new ethers.Contract(
            '0x31fd0691809Ec54499d7363Be76807c9cbDD0e38',
            StakingArtifacts.abi,
            provider.getSigner(),
          )
          const gouInstance = new ethers.Contract(
            '0x212Fd30e63911B3EFb22d3ab177de3d26b6F5584',
            GouArtifacts.abi,
            provider.getSigner(),
          )
          const acctBal = await gou.balanceOf(accounts[0])
          const totalAllowance = await gou.allowance(
            accounts[0],
            '0x31fd0691809Ec54499d7363Be76807c9cbDD0e38',
          )
          const isStake = await stake.isStaking(accounts[0])
          const tStake = await stake.stakingBalance(accounts[0])
          const reward = await stake.rewards(accounts[0])
          const apy = await stake.apy()

          setReward(parseFloat(ethers.utils.formatEther(reward)).toFixed(1))
          setStakingInstance(stakingInstance)
          setGouInstance(gouInstance)
          setStaking(isStake)
          setAllowance(parseInt(ethers.utils.formatEther(totalAllowance)))
          setAmountStaked(String(tStake))
          setApyy(ethers.utils.formatEther(apy))
          setAvailable(ethers.utils.formatEther(acctBal))
          setBool(false)
        } catch (err) {
          console.log(err.message)
        }
      }
    }

    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      onConnectt()
    }
  }, [props.addy, bool])

  const onConnect = async (e) => {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      try {
        setBool(true)
        // We are in the browser and metamask is running.
        await window.ethereum.request({ method: 'eth_requestAccounts' })
      } catch (err) {
        console.log(err)
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts[0]) {
        props.bodyAddy(accounts[0])
      }
      setBool(false)
    } else {
      // We are on the server *OR* the user is not running metamask
      setWord('No MetaMask')
      setBool(false)
    }
  }

  const onClaim = async () => {
    try {
      setBool(true)
      await stakingInstance.claimRewards().then((tx) => tx.wait())
      setBool(false)
    } catch (err) {
      console.log(err.message)
      setBool(false)
    }
  }

  const onStake = async () => {
    try {
      setBool(true)
      await stakingInstance
        .depositTokens(String(parseInt(available)))
        .then((tx) => tx.wait())
      setBool(false)
    } catch (err) {
      console.log(err.message)
      setBool(false)
    }
  }

  const onUnstake = async () => {
    try {
      setBool(true)
      await stakingInstance.unstake().then((tx) => tx.wait())
      setBool(false)
    } catch (err) {
      console.log(err.message)
      setBool(false)
    }
  }

  const onApprove = async () => {
    try {
      setBool(true)
      await gouInstance
        .increaseAllowance(
          '0x31fd0691809Ec54499d7363Be76807c9cbDD0e38',
          ethers.utils.parseEther('10000'),
        )
        .then((tx) => tx.wait())
      setBool(false)
    } catch (err) {
      console.log(err.message)
      setBool(false)
    }
  }

  return (
    <div className="max-h-full mb-10">
      {connected ? (
        <div className="flex flex-row justify-center my-4 sm:my-8">
          <div className="h-8 w-8">
            <Image draggable={false} src={mm} />
          </div>
          <span className="text-end mt-1 px-2">
            {address.slice(0, 5) + '...' + address.slice(37, 42)}
          </span>
        </div>
      ) : null}
      <div className="max-h-screen  w-4/5 bg-neutral-900 m-auto rounded-2xl sm:h-[90%]">
        <div className="grid grid-cols-1 mx-[30%] gap-5 pt-5 sm:grid-cols-2 sm:mx-[20%] sm:pt-16 md:grid-cols-4">
          <div className="grid grid-cols-1 ">
            <span className="text-sm">Available</span>
            <span className="text-lg font-semibold">
              {connected ? available : '0'} GOU
            </span>
            <span className="text-sm ">
              {staking && available > 99 ? (
                <button
                  disabled={bool}
                  onClick={onStake}
                  className="border px-1 rounded-md hover:text-red-800  hover:border-red-800"
                >
                  stake more
                </button>
              ) : null}
            </span>
          </div>
          <div className="grid grid-cols-1">
            <span className="text-sm">Total Staked</span>
            <span className="text-lg font-semibold">
              {connected ? amountStaked : '0'} GOU
            </span>
            <span className="text-sm ">
              {staking && amountStaked > 99 ? (
                <button
                  disabled={bool}
                  onClick={onUnstake}
                  className="border px-1 rounded-md hover:text-red-800  hover:border-red-800"
                >
                  unstake
                </button>
              ) : null}
            </span>
          </div>
          <div className="grid grid-cols-1">
            <span className="text-sm">APY</span>
            <span className="text-lg font-semibold">
              {connected ? parseInt(apyy) : '0'}%
            </span>
          </div>
          <div className="grid grid-cols-1">
            <span className="text-sm">Reward Distribution</span>
            <span className="text-lg font-semibold">
              <Countdown />
            </span>
          </div>
        </div>
        <div className="text-center py-10">
          {connected ? (
            <span>
              {staking ? (
                <button
                  disabled={reward > 0 ? false : true}
                  onClick={onClaim}
                  className="rounded-lg w-4/5 bg-red-900 py-4"
                >
                  Claim Rewards [ {reward} ]
                </button>
              ) : (
                <span>
                  {' '}
                  {allowance > 0 ? (
                    <button
                      disabled={bool}
                      onClick={onStake}
                      className="rounded-lg w-4/5 bg-red-900 py-4"
                    >
                      Stake Gou [ Min. 100 ]
                    </button>
                  ) : (
                    <button
                      disabled={bool}
                      onClick={onApprove}
                      className="rounded-lg w-4/5 bg-red-900 py-4"
                    >
                      Approve
                    </button>
                  )}
                </span>
              )}
            </span>
          ) : (
            <button
              onClick={onConnect}
              className="rounded-lg w-4/5 bg-red-900 py-4"
            >
              {word}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Staking
