import React, { useState, useCallback } from 'react'
import useTheme from 'hooks/useTheme'
import { TYPE } from 'theme'
import { RowBetween } from 'components/Row'
import { Input as NumericalInput } from 'components/NumericalInput'
import { Dots } from '../../../Pool/styleds'
import { useActiveWeb3React } from 'hooks'
import { useBentoBoxContract } from 'sushi-hooks/useContract'
import { ApprovalState, useApproveCallback } from 'sushi-hooks/useApproveCallback'
import { useKashiPair } from 'context/kashi'
//import useKashiBalances from 'sushi-hooks/queries/useKashiBalances'
import useKashi from 'sushi-hooks/useKashi'
import { formatFromBalance, formatToBalance } from 'utils'

import useBentoBalance from 'sushi-hooks/queries/useBentoBalance'
import useTokenBalance from 'sushi-hooks/queries/useTokenBalance'

import {
  InputRow,
  ButtonSelect,
  LabelRow,
  Aligner,
  InputPanel,
  Container,
  StyledButtonName,
  StyledSwitch,
  StyledBalanceMax
} from '../styled'

interface RemoveInputPanelProps {
  tokenAddress: string
  tokenSymbol?: string
  pairAddress: string
}

export default function RemoveInputPanel({ tokenAddress, tokenSymbol, pairAddress }: RemoveInputPanelProps) {
  const { account } = useActiveWeb3React()
  const theme = useTheme()

  const { removeCollateral, removeWithdrawCollateral } = useKashi()

  const [balanceFrom, setBalanceFrom] = useState<any>('bento')
  const walletBalance = useTokenBalance(tokenAddress)
  const bentoBalance = useBentoBalance(tokenAddress)
  const walletAmount = formatFromBalance(walletBalance?.value, walletBalance?.decimals)
  const bentoAmount = formatFromBalance(bentoBalance?.value, bentoBalance?.decimals)
  const balance = balanceFrom && balanceFrom === 'bento' ? bentoAmount : walletAmount

  const kashiBalances = useKashiPair(pairAddress)
  const assetBalance = kashiBalances?.user.collateral.max.balance
  const tokenBalance = formatFromBalance(assetBalance?.value, assetBalance?.decimals)
  const decimals = assetBalance?.decimals

  // check whether the user has approved BentoBox on the token
  const bentoBoxContract = useBentoBoxContract()
  const [approvalA, approveACallback] = useApproveCallback(tokenAddress, bentoBoxContract?.address)

  // track and parse user input for Deposit Input
  const [withdrawValue, setWithdrawValue] = useState('')
  const [maxSelected, setMaxSelected] = useState(false)

  const onUserWithdrawInput = useCallback((value: string, max = false) => {
    setMaxSelected(max)
    setWithdrawValue(value)
  }, [])

  const [pendingTx, setPendingTx] = useState(false)

  const maxWithdrawAmountInput = assetBalance

  const handleMaxDeposit = useCallback(() => {
    maxWithdrawAmountInput && onUserWithdrawInput(tokenBalance, true)
  }, [maxWithdrawAmountInput, onUserWithdrawInput, tokenBalance])

  return (
    <>
      <InputPanel>
        <RowBetween style={{ padding: '0.75rem 1rem 0 1rem' }}>
          <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
            Withdraw <span className="font-semibold">{tokenSymbol}</span> to{' '}
            <span>
              {balanceFrom === 'bento' ? (
                <StyledSwitch onClick={() => setBalanceFrom('wallet')}>Bento</StyledSwitch>
              ) : (
                <StyledSwitch onClick={() => setBalanceFrom('bento')}>Wallet</StyledSwitch>
              )}
            </span>
          </TYPE.body>
          {account && (
            <TYPE.body
              color={theme.text2}
              fontWeight={500}
              fontSize={14}
              style={{ display: 'inline', cursor: 'pointer' }}
            >
              Balance: {balance} {tokenSymbol}
            </TYPE.body>
          )}
        </RowBetween>
        <Container>
          <LabelRow>
            <RowBetween>
              <div></div>
              {account && (
                <TYPE.body
                  onClick={handleMaxDeposit}
                  color={theme.text2}
                  fontWeight={500}
                  fontSize={14}
                  style={{ display: 'inline', cursor: 'pointer' }}
                >
                  Safe Withdrawable: {tokenBalance} {tokenSymbol}
                </TYPE.body>
              )}
            </RowBetween>
          </LabelRow>
          <InputRow>
            <>
              <NumericalInput
                className="token-amount-input"
                value={withdrawValue}
                onUserInput={val => {
                  onUserWithdrawInput(val)
                }}
              />
              {account && <StyledBalanceMax onClick={handleMaxDeposit}>MAX</StyledBalanceMax>}
            </>
          </InputRow>
        </Container>
        {(approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING) && (
          <ButtonSelect disabled={approvalA === ApprovalState.PENDING} onClick={approveACallback}>
            <Aligner>
              <StyledButtonName>
                {approvalA === ApprovalState.PENDING ? <Dots>Approving </Dots> : 'Approve'}
              </StyledButtonName>
            </Aligner>
          </ButtonSelect>
        )}
        {approvalA === ApprovalState.APPROVED && (
          <ButtonSelect
            disabled={
              pendingTx ||
              !tokenBalance ||
              Number(withdrawValue) === 0 ||
              // todo this should be a bigInt comparison
              Number(withdrawValue) > Number(tokenBalance)
            }
            onClick={async () => {
              setPendingTx(true)
              if (balanceFrom === 'wallet') {
                if (maxSelected) {
                  await removeWithdrawCollateral(pairAddress, tokenAddress, maxWithdrawAmountInput, true)
                } else {
                  await removeWithdrawCollateral(
                    pairAddress,
                    tokenAddress,
                    formatToBalance(withdrawValue, decimals),
                    false
                  )
                }
              } else if (balanceFrom === 'bento') {
                if (maxSelected) {
                  await removeCollateral(pairAddress, tokenAddress, maxWithdrawAmountInput, true)
                } else {
                  await removeCollateral(pairAddress, tokenAddress, formatToBalance(withdrawValue, decimals), false)
                }
              }
              setPendingTx(false)
            }}
          >
            <Aligner>
              <StyledButtonName>Withdraw</StyledButtonName>
            </Aligner>
          </ButtonSelect>
        )}
      </InputPanel>
    </>
  )
}
