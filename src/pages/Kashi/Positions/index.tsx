import React, { useState } from 'react'
import styled from 'styled-components'
//import QuestionHelper from '../../components/QuestionHelper'
import { useKashiPairs } from 'context/kashi'

import { Header, Navigation, SplitPane } from '../components'

import PositionsToggle from './Toggle'
import SupplyPositions from './Supply'
import BorrowPositions from './Borrow'

const PageWrapper = styled.div`
  max-width: 800px;
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
        <div className="flex-col space-y-8">
          <Header />
          <div>
            <SplitPane
              left={<Navigation />}
              right={<PositionsToggle selected={selected} setSelected={setSelected} />}
            />
            {selected && selected === 'supply' && <SupplyPositions supplyPositions={supplyPositions} />}
            {selected && selected === 'borrow' && <BorrowPositions borrowPositions={borrowPositions} />}
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
