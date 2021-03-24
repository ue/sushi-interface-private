import React from 'react'
import KashiLogo from 'assets/kashi/kashi-kanji-wires.png'

const Logo = () => {
  return (
    <div className="flex items-center pb-3 px-4">
      <img src={KashiLogo} className="w-10 y-10 sm:w-14 sm:y-14 lg:w-18 lg:y-18 mx-2" />
      <div className="font-semibold text-2xl">Kashi</div>
    </div>
  )
}

export default Logo
