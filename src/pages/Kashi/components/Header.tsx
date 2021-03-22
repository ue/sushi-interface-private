import React from 'react'
import { useKashiCounts } from 'context/kashi'
import Stats from './Stats'

export default function Header() {
  const counts = useKashiCounts()

  //console.log('totalNetWorth:', totalNetWorth)

  return (
    <div>
      <div className="flex-col space-y-8">
        <div className="w-full md:w-2/3 m-auto">
          <Stats />
        </div>
        <div className="text-2xl md:text-3xl font-semibold text-center">{counts.markets} Kashi Markets</div>
      </div>
    </div>
  )
}
