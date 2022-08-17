import { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../public/2.gif'
import mm from '../public/mm.png'
import { useTypewriter, Cursor } from 'react-simple-typewriter'

function Header(props) {
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
        props.addy(accounts[0])
      } else {
        setWord('CONNECT WALLET')
      }
    }
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      onConnect()
    } else {
      setWord('CONNECT WALLET')
    }
  }, [props.newAddy])

  const onConnect = async (e) => {
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
      props.addy(accounts[0])
      // Router.push('/')
    } else {
      // We are on the server *OR* the user is not running metamask
      setWord('NO METAMASK')
    }
  }

  return (
    <div className="sm:pt-8">
      <div className="flex flex-row justify-between">
        <div className="h-20 w-20 sm:h-24 sm:w-24">
          <Image draggable={false} src={logo} />
        </div>
        <div>
          <button
            onClick={onConnect}
            className="p-3 bg-red-800 hover:bg-red-900 text-sm rounded-full sm:text-base"
          >
            {word.length > 40 ? (
              <div className="flex flex-row">
                <div className="h-7 w-7">
                  <Image draggable={false} src={mm} />
                </div>
                <span className="mt-1">
                  {word.slice(0, 5) + '...' + word.slice(37, 42)}
                </span>
              </div>
            ) : (
              word
            )}
          </button>
        </div>
      </div>
      <div className="text-6xl sm:text-7xl sm:px-10 font-serif font-bold text-center py-5 px-5">
        I am the Ghost Of <br />
        <span className="text-red-700">
          {text}
          <Cursor cursorStyle="_" />
        </span>
      </div>
    </div>
  )
}

export default Header
