const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");

router.get("/fetchnotes", fetchuser, async (req, res)=>{
   try{
      const notes = await Note.find({user: req.user.id}).sort( {"date": -1 } );
      res.json(notes)
   }catch(err){
      console.log(err);
      res.status(500).send("Server error")
  }
});
router.post("/addnotes", fetchuser, async (req, res)=>{
   try{
      const {title, description, tag} = req.body;
      const addnotes = new Note({
         title,
         description,
         tag,
         user: req.user.id
      })
      const savenotes = await addnotes.save();
      res.json(savenotes)
   }catch(err){
      console.log(err);
      res.status(500).send("Server error 2")
  }
});

router.put("/updatenotes/:id", fetchuser, async (req, res)=>{
   const {title, description, tag} = req.body;

   const newNotes = {};
   if(title){newNotes.title = title}
   if(description){newNotes.description = description}
   if(tag){newNotes.tag = tag}
   let note = await Note.findById(req.params.id);
   if(!note){return res.status(404).send("Not Found")}

   if(note.user.toString() !== req.user.id){
      return res.status(404).send("Not Allowed")
   }
   note = await Note.findByIdAndUpdate(req.params.id, {$set: newNotes}, {new: true})
   res.json(note)
})

router.delete("/deletenotes/:id", fetchuser, async (req, res)=>{
  try{
     if(!req.params.id){
      return res.status(404).send("please enter id")
     }
      let note = await Note.findById(req.params.id);
      if(!note){return res.status(404).send("Not Found")}

      if(note.user.toString() !== req.user.id){
         return res.status(404).send("Not Allowed")
      }
      note = await Note.findByIdAndDelete(req.params.id)
      res.json({"success": "Note has been deleted", note: note})
   }catch(err){
      console.log(err);
      res.status(500).send("Server error 2")
  }
})

module.exports = router