import React from 'react'
import TopMenuPYQ from '../components/core/PYQ.jsx/TopMenuPYQ'
import { useSelector } from 'react-redux'
import PYQRow from '../components/core/PYQ.jsx/PYQRow'

function PYQ() {
  const {pyqs} = useSelector((state) => state.pyq)
  return (
    <div>
      <div
      className='pt-10'
      >
        <TopMenuPYQ />
      </div>
      <div>
        <h1 className='text-3xl font-bold pl-16 pb-5'>Past Year Questions</h1>
      </div>
        <div
        className='pl-20 pr-20'
        >
          {
            pyqs.map((paper, index) => (
              <PYQRow title={paper.year} paperLink={paper.fileUrl} key={paper._id}/>
            ))
          }
        </div>
    </div>
  )
}

export default PYQ