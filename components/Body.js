import { useState } from 'react'
import Airdrop from './Airdrop'
import Staking from './Staking'

function Body(props) {
  const [isAirdrop, setIsAirdrop] = useState(true)

  const toggle = (bool) => {
    setIsAirdrop(bool)
    // console.log(props)
  }

  const getAddress = (addy) => {
    props.newAddy(addy)
  }

  return (
    <div className="pt-10 sm:pt-16">
      <div className="flex justify-center py-5 text-sm sm:text-base">
        <div className="pr-2">
          <button
            onClick={() => toggle(true)}
            className={
              isAirdrop ? 'px-4 py-1 rounded-t border-x border-t' : 'px-4 py-1'
            }
          >
            Airdrop
          </button>
        </div>
        <div className="pl-2">
          <button
            onClick={() => toggle(false)}
            className={
              isAirdrop ? 'px-4 py-1' : 'px-4 py-1 rounded-t border-x border-t'
            }
          >
            Stake Gou
          </button>
        </div>
      </div>
      {isAirdrop ? (
        <Airdrop />
      ) : (
        <Staking addy={props.addy} bodyAddy={getAddress} />
      )}
    </div>
  )
}

export default Body
