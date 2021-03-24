import React from 'react'
import { WrapperNoPadding } from 'components/swap/styleds'
import { AutoColumn } from 'components/Column'
import QuestionHelper from 'components/QuestionHelper'
import SupplyInputPanel from './SupplyInputPanel'
import WithdrawInputPanel from './WithdrawInputPanel'
import { useKashiPair } from 'context/kashi'
import { formattedNum, formattedPercent } from 'utils'
import { Switch } from '../../components'

interface SupplyProps {
  tokenAddress: string
  tokenSymbol: string
  pairAddress: string
}

export default function Supply({ tokenAddress, tokenSymbol, pairAddress }: SupplyProps) {
  const pair = useKashiPair(pairAddress)

  const assetSymbol = pair?.asset.symbol
  const supplyAPY = pair?.details.apr.currentSupplyAPR

  const marketSupply = pair?.details.total.supply.string
  const marketSupplyUSD = pair?.details.total.supply.usdString

  const utilization = pair?.details.total.utilization.string

  const userSupply = pair?.user.supply.string
  const userSupplyUSD = pair?.user.supply.usdString
  const userProportion = (Number(userSupply) / Number(marketSupply)) * 100

  return (
    <>
      <WrapperNoPadding id="stake-page">
        <AutoColumn gap="sm">
          <div className="px-2 py-4 grid grid-cols-3 gap-2">
            <div className="col-span-1 items-start">
              <div className="flex">
                <div className="text-xs sm:text-sm text-gray-300">Supply APR</div>
                <QuestionHelper text="The amount of asset you have supplied to this Kashi Pair. The dollar value is estimated using the Sushiswap Oracle." />
              </div>
              <div className="text-2xl sm:text-3xl font-semibold">{formattedPercent(supplyAPY)}</div>
            </div>
            <div className="col-span-2">
              <div className="flex justify-between">
                <div className="text-xs sm:text-sm text-gray-300">Market Supply:</div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-gray-300">
                    {formattedNum(marketSupply, false)} {assetSymbol}
                  </div>
                  <div className="text-xs text-gray-500">≈ {formattedNum(marketSupplyUSD, true)}</div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-xs sm:text-sm text-gray-300">Market Utilization:</div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-gray-300">{formattedPercent(utilization)}</div>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="text-xs sm:text-sm text-gray-300">Your Supply:</div>
                  <div className="text-xs text-gray-500">({formattedPercent(userProportion)} of Market)</div>
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-gray-300">
                    {formattedNum(userSupply, false)} {assetSymbol}
                  </div>
                  <div className="text-xs text-gray-500">≈ {formattedNum(userSupplyUSD, true)}</div>
                </div>
              </div>
            </div>
          </div>
          <Switch
            switch1key={'Deposit'}
            switch1components={
              <>
                <SupplyInputPanel
                  id="supply-collateral-token"
                  tokenAddress={tokenAddress}
                  tokenSymbol={tokenSymbol}
                  pairAddress={pairAddress}
                />
              </>
            }
            switch2key={'Withdraw'}
            switch2components={
              <>
                <WithdrawInputPanel
                  id="withdraw-collateral-token"
                  tokenAddress={tokenAddress}
                  tokenSymbol={tokenSymbol}
                  pairAddress={pairAddress}
                />
              </>
            }
          />
        </AutoColumn>
      </WrapperNoPadding>
    </>
  )
}
