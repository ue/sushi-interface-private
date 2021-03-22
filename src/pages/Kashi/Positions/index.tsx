import React, { useState } from 'react'
import styled from 'styled-components'
//import QuestionHelper from '../../components/QuestionHelper'
import { useKashiPairs } from 'context/kashi'

import PositionsToggle from './Toggle'
import SupplyPositions from './Supply'
import BorrowPositions from './Borrow'

import ResponsiveGrid, { Secondary, Primary } from '../components/ResponsiveGrid'
import { InfoCard, MarketsNavigation, SectionHeader, Navigation, SplitPane } from '../components'

import DepositGraphic from '../../../assets/kashi/deposit-graphic.png'

const PageWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
`

export default function Positions() {
  const pairs = useKashiPairs()

  const supplyPositions = pairs.filter(function(pair: any) {
    return pair.user.asset.value.gt(0)
  })
  const borrowPositions = pairs.filter(function(pair: any) {
    return pair.user.borrow.value.gt(0)
  })
  const [selected, setSelected] = useState<'supply' | 'borrow'>('supply')

  return (
    <>
      <PageWrapper>
        <ResponsiveGrid>
          <Secondary marginTop={12}>
            <InfoCard
              backgroundImage={DepositGraphic}
              title={'Deposit tokens into BentoBox for all the yields.'}
              description={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              }
            />
          </Secondary>
          <Primary>
            <div className="flex-col space-y-8">
              <div>
                <SectionHeader portfolio={true}>
                  <PositionsToggle selected={selected} setSelected={setSelected} />
                </SectionHeader>
                {selected && selected === 'supply' && <SupplyPositions supplyPositions={supplyPositions} />}
                {selected && selected === 'borrow' && <BorrowPositions borrowPositions={borrowPositions} />}
              </div>
            </div>
          </Primary>
        </ResponsiveGrid>
      </PageWrapper>
    </>
  )
}
