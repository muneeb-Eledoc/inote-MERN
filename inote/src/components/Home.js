import React, { useContext, useState, useEffect} from 'react'
import { Navbar } from './Navbar'
import { Notes } from "./Notes";
import noteContext from './context/noteContext';
import { useNavigate } from 'react-router-dom';

export const Home = (props) => {
    const navigate = useNavigate()
    const context = useContext(noteContext);
    const { addNote, getNotes } = context;
    const {progressing} = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "default" });
    //  const [alert, setalert] = useState("")
    const handleClick = () => {
        
        addNote(note.title, note.description, note.tag)
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    props.setprogress(progressing)
    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes()
        }else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
   

    return (
        <div className='container-fluid p-2'>
            <Navbar />
            <div className='pt-4 row m-2'>
            <div className="container p-3 card mt-5 col-6">
                <h3>Add Note</h3>
                <div className="my-2">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' placeholder="Title" onChange={onChange} />
                </div>
                <div className="my-1">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' placeholder="Tag" onChange={onChange} />
                </div>
                <div className="my-1">
                    <label htmlFor="description" className="form-label">Note Description</label>
                    <textarea className="form-control" id="description" name='description' onChange={onChange} rows="3"></textarea>
                    <button className='btn btn-danger my-3' onClick={handleClick}>Add Note</button>
                </div>
            </div>
            <div className='col-6'>
                <Notes />
            </div>
            </div>
        </div>
    )
}
