import React from 'react'

function NoteRow({title, noteLink}) {
  const modifiedLink = noteLink.replace('/upload/', '/upload/fl_attachment/')
  return (
    <div
    className='bg-gray-300 p-2 w-full flex justify-between hover:bg-gray-400 cursor-pointer rounded-lg border-l-transparent hover:border-l-white border-l-4 mb-8 items-center'
    >
        <div>
            {title}
        </div>

        <div>
          <a
            href={modifiedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sm bg-red-500 text-white p-2 rounded-lg"
            >
            Download
            </a>
        </div>
    </div>
  )
}

export default NoteRow