

/*importataan useState ja useEffect*/
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
  /* määritellään komponentille tila, joka saa
  aluksi arvokseen propsina välitettvän muistiinpanot
  alustavan taulukon */
  const [notes, setNotes] = useState([])
  
  /* kontrolloitu komponentti */
  const [newNote, setNewNote] = useState(
    'a new note...'
  )

  /* näytetäänkö kaikki vai tärkeät */
  const [showAll, setShowAll] = useState(true)
  
  /* notet 'json servulta' promisella */
  /*useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')
  */

 /*käytetään tehtyä noteserviceä */
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


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
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(response => {
    //     setNotes(notes.concat(response.data))
    //     setNewNote('')
    //   })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  
  const toggleImportanceOf = (id) => {
    /* määrittelee jokaiselle muistiinpanolle id-kenttään perustuvan yksilöivän urlin*/
    const url = `http://localhost:3001/notes/${id}`
    /* taulukon find metodilla etsitään halutun id:n omaava note*/
    const note = notes.find(n => n.id === id) 
    /* tehdään kopio oliolle "...note", jolle asetetaan important kenttä päinvastaiseksi '!'*/
    const changedNote = { ...note, important: !note.important} 

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        alert(
          `the note ${note.content} was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      }) 
    // axios
    // /*uusi note lähetetään PUT pyynnön mukana palvelimelle */
    //   .put(url, changedNote).then(response => {
    //     /* takaisinkutsufunktiossa asetetaan komponentin App tilaan notes kaikki vanhat notet
    //       paitsi muuttunut, josta tilaan asetetaan palvelimen palauttama versio */
    //     setNotes(notes.map(n => n.id !== id ? n : response.data))
    //   })
  
  }
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
          <Note
            key = {note.id}
            note = {note}
            toggleImportance={() => toggleImportanceOf(note.id)} />
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
