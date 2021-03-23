import React from 'react'
import useKashi from '../../sushi-hooks/useKashi'
import useBentoBalances from '../../sushi-hooks/queries/useBentoBalances'
import { BigNumber } from '@ethersproject/bignumber'

import { useKashiPair } from 'context/kashi'

const TestBed = () => {
  // const { kashiApproved, approve, approveAsset, approveCollateral, depositAddCollateral } = useKashi()
  // depositAddCollateral(
  //   { value: BigNumber.from(0).mul(BigNumber.from(10).pow(18)), decimals: 18 },
  //   '0xc2118d4d90b274016cB7a54c03EF52E6c537D957'
  // )
  //const { approveMaster } = useKashi()

  //const kashiBalances = useKashiPair('0x5a0625c24ddd563e758958f189fc9e52abaa9023')
  //console.log('kashiBalances:', kashiBalances)

  const { approveAddAsset, getAddresses } = useKashi()

  getAddresses()

  //approveMaster()

  //const summary = useBentoBalances()
  //console.log(summary)

  /*const bentoBoxContract = useBentoBoxContract(true) // withSigner
  console.log(await bentoBoxContract?.)*/
  return (
    <>
      <button
        onClick={() =>
          approveAddAsset('0x5a0625c24ddd563e758958f189fc9e52abaa9023', '0xc2118d4d90b274016cB7a54c03EF52E6c537D957', {
            value: BigNumber.from(1).mul(BigNumber.from(10).pow(18)),
            decimals: 18
          })
        }
      >
        Test
      </button>
    </>
  )
}

export default TestBed
