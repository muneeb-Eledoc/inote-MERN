import NoteContext from './noteContext'
import { useState } from 'react';

function NoteState (props){
  const [notes, setnotes] = useState([])
  const [progressing, setprogressing] = useState(0)
   const host = "http://localhost:4000";

   const getNotes = async ()=>{
     setprogressing(10)
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      }
    });
    setprogressing(70)
    const data_json = await response.json()
    setnotes(data_json)
    setprogressing(100)
  }
      // adding new note
      const addNote = async (title, description, tag)=>{
        setprogressing(30)
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag}) 
        });
        setprogressing(70)
        if(response){
          getNotes()
          console.log("added")
        }
        setprogressing(100)
      }
      // delete note
      const deletenote = async (id)=>{
        setprogressing(30)
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          }
        });
        if(response){
          getNotes()
          console.log("deleted")
        }
        setprogressing(100)
      }   // update note
      const updatenote = async (id, title, description, tag)=>{
        setprogressing(30)
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag})
        });
        setprogressing(70)
        if(response){
          getNotes()
          console.log("updated")
        }
        setprogressing(100)
      }

    return (
        <div>
            <NoteContext.Provider value={{notes, addNote, getNotes, deletenote, updatenote, progressing, setprogressing}}>
                {props.children}
            </NoteContext.Provider>
        </div>
    )
}
export default NoteState;