import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../public/2.gif'
import { useTypewriter, Cursor } from 'react-simple-typewriter'

function Header() {
  let accounts

  const [word, setWord] = useState('CONNECT WALLET')
  const { text } = useTypewriter({
    words: [
      'Uchiha',
      'Otsutsuki',
      'Senju',
      'Hyuga',
      'Uzumaki',
      'Nara',
      'Kazekage',
    ],
    loop: 0,
    delaySpeed: 1000,
    deleteSpeed: 120,
    typeSpeed: 120,
  })

  useEffect(() => {
    const onConnect = async () => {
      accounts = await ethereum.request({
        method: 'eth_accounts',
      })

      if (accounts[0]) {
        setWord(accounts[0])
      } else {
        setWord('CONNECT WALLET')
      }
    }

    onConnect()
  }, [word])

  const onConnect = async (e) => {
    e.preventDefault()

    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      try {
        // We are in the browser and metamask is running.
        await window.ethereum.request({ method: 'eth_requestAccounts' })
      } catch (err) {
        console.log(err)
      }

      accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      setWord(accounts[0])
    } else {
      // We are on the server *OR* the user is not running metamask
      setWord('NO METAMASK')
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="h-20 w-20 sm:h-24 sm:w-24">
          <Image draggable={false} src={logo} />
        </div>
        <div>
          <button
            onClick={onConnect}
            className="p-3 bg-red-700 hover:bg-red-800  text-sm rounded-full sm:text-base"
          >
            {word.length > 40
              ? word.slice(0, 5) + '...' + word.slice(37, 42)
              : word}
          </button>
        </div>
      </div>
      <div className="text-6xl sm:text-7xl sm:px-10 font-serif font-bold text-center py-5 px-5">
        I am the Ghost Of <br />
        <span className="text-red-600">
          {text}
          <Cursor cursorStyle="_" />
        </span>
      </div>
    </div>
  )
}

export default Header
