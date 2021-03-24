import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Logo } from '../components'

export default function InfoCard({ backgroundImage, title, description, withLogo = true }: any) {
  const theme = useContext(ThemeContext)
  return (
    <>
      <div className="flex flex-col h-full">
        {withLogo && <Logo />}
        <div
          className="flex-grow rounded-xl flex-col justify-between"
          style={{
            backgroundColor: theme.baseCard,
            background: `url(${backgroundImage}), ${theme.baseCard}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom'
          }}
        >
          <div className="p-8">
            <div className="font-semibold text-2xl pb-4">{title}</div>
            <div className="font-base text-base text-gray-400">{description}</div>
          </div>
          {/* <img src={BentoBoxImage} className="w-full cover" /> */}
        </div>
      </div>
    </>
  )
}
