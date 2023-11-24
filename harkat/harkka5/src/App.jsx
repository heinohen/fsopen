

/*importataan useState */
import { useState } from 'react'

import Note from './components/Note'


const App = (props) => {
  /* määritellään komponentille tila, joka saa
  aluksi arvokseen propsina välitettvän muistiinpanot
  alustavan taulukon */
  const [notes, setNotes] = useState(props.notes)
  
  /* kontrolloitu komponentti */
  const [newNote, setNewNote] = useState(
    'a new note...'
  )

  /* näytetäänkö kaikki vai tärkeät */
  const [showAll, setShowAll] = useState(true)
  

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  /* HTML form uuden muistiinpanon lisäystä */
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  
  /*form*/
  /* lomakkeen input-komponentille on nyt
  rekisteröity tapahtumankäsittelijä
  tilanteeseen onChange
  */
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key = {note.id} note = {note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value = {newNote}
          onChange={handleNoteChange}
        />
        <button type = 'submit'>save</button>
      </form>
      
    </div>
  )
}
export default App
