import React, { useState, useContext } from 'react'
import { ChainId } from '@sushiswap/sdk'
import { Link, RouteComponentProps, useLocation } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { transparentize } from 'polished'
import { useActiveWeb3React } from 'hooks'

// Components
import { BaseCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import Supply from './Supply'
import Borrow from './Borrow'
import Tabs from '../components/Tabs'
import { useKashiPair } from 'context/kashi'
import getTokenIcon from 'sushi-hooks/queries/getTokenIcons'
import { BarChart, User, ArrowLeft } from 'react-feather'
import BentoBoxLogo from 'assets/kashi/bento-symbol.svg'

import { Debugger } from 'components/Debugger'
import { formattedNum } from 'utils'
import { theme } from 'theme'

import ResponsiveGrid, { Secondary, Primary } from '../components/ResponsiveGrid'
import { FixedScrollable, InfoCard } from '../components'
import BorrowGraphic from '../../../assets/kashi/borrow-graphic.png'

//import Charts from './Charts'

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`

const PageWrapper = styled(AutoColumn)`
  max-width: 1200px; /* 480px */
  width: 100%;
  margin: 0 auto;
`

const StyledBaseCard = styled(BaseCard)`
  border: none
  background: ${({ theme }) => transparentize(0.6, theme.bg1)};
  position: relative;
  overflow: hidden;
`

const tabs = [
  {
    title: 'Supply',
    id: 'supply'
  },
  {
    title: 'Borrow',
    id: 'borrow'
  }
  // {
  //   title: 'Leverage',
  //   id: 'leverage'
  // }
]

interface TokenProps {
  address: string
  symbol: string
}

export default function KashiPair({
  match: {
    params: { pairAddress }
  }
}: RouteComponentProps<{ pairAddress: string }>) {
  const theme = useContext(ThemeContext)

  const location = useLocation()

  const [section, setSection] = useState(new URLSearchParams(location.search).get('tab') || 'supply')

  const { chainId } = useActiveWeb3React()

  const pair = useKashiPair(pairAddress)

  if (!pair) return null

  return (
    <>
      <PageWrapper>
        <ResponsiveGrid>
          <Secondary>
            <InfoCard
              backgroundImage={BorrowGraphic}
              title={'Deposit tokens into BentoBox for all the yields.'}
              description={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              }
            />
          </Secondary>
          <Primary>
            <div className="flex-col space-y-8" style={{ maxWidth: '600px' }}>
              <div>
                <div className="block flex justify-between items-center">
                  {/* <StyledArrowLeft /> */}
                  <div></div>
                  <nav className="-mb-px flex space-x-4 px-4">
                    <Link to="/bento/kashi" className="border-transparent py-2 px-1 border-b-2">
                      <div className="flex items-center text-gray-500 hover:text-gray-400 font-medium">
                        <div className="whitespace-nowrap text-base mr-2">Markets</div>
                        <BarChart size={16} />
                      </div>
                    </Link>
                    <Link to="/bento/kashi/positions" className="border-transparent py-2 px-1 border-b-2">
                      <div className="flex items-center text-gray-500 hover:text-gray-400 font-medium">
                        <div className="whitespace-nowrap text-base mr-2">Positions</div>
                        <User size={16} />
                      </div>
                    </Link>
                    <Link to="/bento/balances" className="border-transparent py-2 px-1 border-b-2">
                      <div className="flex items-center text-gray-500 hover:text-gray-400 font-medium">
                        <div className="whitespace-nowrap text-base mr-2">My Bento</div>
                        <img src={BentoBoxLogo} className="w-6" />
                      </div>
                    </Link>
                  </nav>
                </div>
                <StyledBaseCard padding={'0px'}>
                  {/* Header */}
                  <div
                    className="py-4 px-6"
                    style={{
                      borderBottom: `4px solid ${section === 'supply' ? theme.primaryBlue : theme.primaryPink}`,
                      background: theme.mediumDarkPurple
                    }}
                  >
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <div className="flex space-x-2 mr-4">
                        <a
                          href={
                            `${
                              chainId === ChainId.MAINNET
                                ? 'https://www.etherscan.io/address/'
                                : chainId === ChainId.ROPSTEN
                                ? 'https://ropsten.etherscan.io/address/'
                                : null
                            }` + pair?.collateral.address
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={pair && getTokenIcon(pair?.collateral.address)}
                            className="w-10 y-10 sm:w-12 sm:y-12 rounded-lg"
                          />
                        </a>
                        <a
                          href={
                            `${
                              chainId === ChainId.MAINNET
                                ? 'https://www.etherscan.io/address/'
                                : chainId === ChainId.ROPSTEN
                                ? 'https://ropsten.etherscan.io/address/'
                                : null
                            }` + pair?.asset.address
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={pair && getTokenIcon(pair?.asset.address)}
                            className="w-10 y-10 sm:w-12 sm:y-12 rounded-lg"
                          />
                        </a>
                      </div>
                      <div className="col-span-2 flex justify-between items-center w-full">
                        <div>
                          <div className="text-base sm:text-2xl font-bold">
                            {pair && `${pair.collateral.symbol + '/' + pair.asset.symbol}`}
                          </div>
                          <div className="text-sm text-gray-400">{pair && `${pair.oracle.name}`}</div>
                        </div>
                        <div className="items-baseline text-right">
                          <div className="text-base text-gray-400">Net Worth</div>
                          <div
                            className="text-sm text-gray-400"
                            style={{
                              color: `${pair.user.pairNetWorth.usdString > 0 ? theme.primaryBlue : theme.primaryPink}`
                            }}
                          >
                            ≈ {formattedNum(pair.user.pairNetWorth.usdString, true)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Tabs */}
                  <div
                    className="py-2 px-6"
                    style={{
                      borderBottom: '2px solid rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Tabs tabs={tabs} selected={section} setSelected={setSection} />
                  </div>
                  <FixedScrollable height="26rem">
                    <div className="py-4 px-6">
                      {pair && section === 'supply' && (
                        <Supply
                          tokenAddress={pair.asset.address}
                          tokenSymbol={pair.asset.symbol}
                          pairAddress={pairAddress}
                        />
                      )}
                      {pair && section === 'borrow' && (
                        <Borrow collateral={pair.collateral} asset={pair.asset} pairAddress={pairAddress} />
                      )}
                      {/* {pair && section === 'leverage' && <Leverage />} */}
                    </div>
                  </FixedScrollable>
                </StyledBaseCard>
              </div>
            </div>
          </Primary>
        </ResponsiveGrid>
      </PageWrapper>

      <div className="w-full px-2 py-4">
        <Debugger data={pair} />
      </div>
    </>
  )
}
