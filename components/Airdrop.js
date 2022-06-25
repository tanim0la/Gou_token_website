import React, { Component } from 'react'
import Image from 'next/image'
import airdrop from '../public/airdrop.png'
import Web3 from 'web3'
import gou from '../ethereum/uchiha'
import Modal from './Modal'

let web3

class Airdrop extends Component {
  state = {
    address: '',
    addy: '',
    errMessage: '',
    buttonMsg: 'Join Whitelist',
    eligible: false,
    modalOn: false,
    bool: false,
  }

  onClaim = async () => {
    web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    if (accounts.length == 0) {
      const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/adaa638d09ba451589fc8a00235e3489',
      )
      web3 = new Web3(provider)
    }
    this.setState({ errMessage: '', bool: true })
    try {
      const check = await gou.methods
        .whitelistedAddresses(this.state.address)
        .call()

      if (check) {
        this.setState({ addy: this.state.address, modalOn: true })
      } else {
        this.setState({
          eligible: true,
          errMessage:
            'You are not Eligible for the airdrop, join whitelist above',
        })
      }
    } catch (err) {
      this.setState({ errMessage: err.message })
    }
    this.setState({ address: '', bool: false })
  }

  onJoin = async () => {
    web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()

    this.setState({ buttonMsg: 'Please wait...', errMessage: '', bool: true })
    try {
      await gou.methods.whitelistAddress().send({
        from: accounts[0],
      })
    } catch (err) {
      this.setState({ errMessage: err.message })
    }

    this.setState({
      buttonMsg: 'Join Whitelist',
      address: '',
      eligible: false,
      bool: false,
    })
  }

  offModal = (mode) => {
    this.setState({ modalOn: mode })
  }

  render() {
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
            hidden={this.state.eligible}
            className="border-0 border-b-2 border-stone-400 w-4/5 bg-transparent rounded-br-sm rounded-bl-sm pb-1"
            placeholder=" Enter Address 0x..."
            value={this.state.address}
            onChange={(e) => this.setState({ address: e.target.value })}
          />

          <div className="py-4">
            {!this.state.eligible ? (
              <button
                className="rounded-lg border-2 border-red-800 hover:border-green-400 p-2 text-sm transition delay-100 duration-300 ease-in-out font-semibold"
                onClick={this.onClaim}
                disabled={this.state.bool}
              >
                Check Eligibility
              </button>
            ) : (
              <button
                className="rounded-lg border-2 border-red-800 hover:border-green-400 p-2 text-sm transition delay-100 duration-300 ease-in-out font-semibold"
                onClick={this.onJoin}
                disabled={this.state.bool}
              >
                {this.state.buttonMsg}
              </button>
            )}
          </div>

          {this.state.errMessage ? (
            <span className="border-0 border-red-800 text-red-400 px-4 sm:px-0">
              <span className="font-semibold text-2xl">Oops...</span>
              <br />
              {this.state.errMessage}
            </span>
          ) : null}
        </div>

        {this.state.modalOn && (
          <Modal offModal={this.offModal} address={this.state.addy} />
        )}
      </div>
    )
  }
}

export default Airdrop
