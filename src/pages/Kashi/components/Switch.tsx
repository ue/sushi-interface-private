import React, { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { transparentize } from 'polished'

interface SwitchProps {
  switch1key?: string
  switch2key?: string
  switch3key?: string
  switch1components?: any
  switch2components?: any
  switch3components?: any
}

const Switch = ({
  switch1key,
  switch1components,
  switch2key,
  switch2components,
  switch3key,
  switch3components
}: SwitchProps) => {
  const theme = useContext(ThemeContext)
  const [section, setSection] = useState<any>(switch1key)

  return (
    <>
      <div
        className="flex justify-between items-center py-1 px-1 rounded-xl space-x-2"
        style={{ background: transparentize(0.5, `${theme.extraDarkPurple}`) }}
      >
        {switch1key && (
          <button
            className="w-full rounded-xl py-3 focus:outline-none"
            onClick={() => {
              setSection(switch1key)
            }}
            style={
              section === switch1key ? { background: transparentize(0.1, '#21293a'), border: '1px solid #2d2f45' } : {}
            }
          >
            <div className="text-base font-semibold text-gray-300 text-center">{switch1key}</div>
          </button>
        )}
        {switch2key && (
          <button
            className="w-full rounded-xl py-3 focus:outline-none"
            onClick={() => {
              setSection(switch2key)
            }}
            style={
              section === switch2key ? { background: transparentize(0.1, '#21293a'), border: '1px solid #2d2f45' } : {}
            }
          >
            <div className="text-base font-semibold text-gray-300 text-center">{switch2key}</div>
          </button>
        )}
        {switch3key && (
          <button
            className="w-full rounded-xl py-3 focus:outline-none"
            onClick={() => {
              setSection(switch3key)
            }}
            style={
              section === switch3key ? { background: transparentize(0.1, '#21293a'), border: '1px solid #2d2f45' } : {}
            }
          >
            <div className="text-base font-semibold text-gray-300 text-center">{switch3key}</div>
          </button>
        )}
      </div>
      <div>
        {section === switch1key && <>{switch1components && switch1components}</>}
        {section === switch2key && <>{switch2components && switch2components}</>}
        {section === switch3key && <>{switch3components && switch3components}</>}
      </div>
    </>
  )
}

export default Switch
