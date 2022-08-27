import React, { useContext, useRef, useState } from 'react'
import noteContext from './context/noteContext'

export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, deletenote, updatenote } = context;
    const openModal = useRef(null);
    const closeModal = useRef(null);
    const [enote, setenote] = useState({id: "", etitle: "", edescription: "", etag: "" });
    const updateNote = (currentNote) => {
        openModal.current.click()
        setenote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const handleEdit = () => {
      updatenote(enote.id, enote.etitle, enote.edescription, enote.etag)
      closeModal.current.click()
    }
    const eonChange = (e) => {
         setenote({...enote, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-4 text-white">
            <div className="p-4">
                <h3>Notes</h3>
                <div className="row">
                    {notes.length===0 && "No Notes to Show"}
                    {notes.length !== 0 && notes.map((note, index) => {
                        return <div className="text-dark col-lg-6 col-md-6 col-12" key={index}>
                            <div className="card p-2 my-2">
                                <h5>
                                    {note.title}
                                </h5>
                                <p>
                                    {note.description}
                                </p>
                                <div className="d-flex">
                                    <i className="fas fa-trash text-danger" onClick={() => deletenote(note._id)}></i>
                                    <i className="mx-2 fas fa-edit" onClick={()=> updateNote(note)}></i>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>

            <button type="button" className="btn btn-primary d-none" ref={openModal} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog text-dark">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="container p-1">
                                <div className="my-1">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='etitle' value={enote.etitle} placeholder="Title" onChange={eonChange} />
                                </div>
                                <div className="my-1">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='etag' value={enote.etag} placeholder="Tag" onChange={eonChange} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="description" className="form-label">Note Description</label>
                                    <textarea className="form-control" id="description" value={enote.edescription} name='edescription' onChange={eonChange} rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
