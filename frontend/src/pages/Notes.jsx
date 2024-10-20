import React from 'react'
import TopMenuNotes from '../components/core/Notes.jsx/TopMenuNotes'
import NoteRow from '../components/core/Notes.jsx/NoteRow'
import { useSelector } from 'react-redux'

function Notes() {
  const {notes} = useSelector((state) => state.notes);
  return (
    <div>
        <div
        className='pt-10'
        >
        <TopMenuNotes />
        </div>
        <div>
          <h1 className='text-3xl font-bold pl-16 pb-5'>Notes</h1>
        </div>
        <div
        className='pl-14 pr-14'
        >
          {notes.map((note, index) => <NoteRow title = {note.title} noteLink={note.fileUrl} key={index}/>)}
        </div>
    </div>
  )
}

export default Notes