import React from 'react'

const FixedScrollable = ({ children }: any) => {
  return (
    <div className="overflow-y-scroll" style={{ height: '28rem' }}>
      {children}
    </div>
  )
}

export default FixedScrollable
