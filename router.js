import express from "express"
import { nanoid } from "nanoid"

const router = express.Router()

const notes = []

router.post('/notes', async(req,res)=>{
  const {title, tags, body} = req.body
  const id = nanoid(16)
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newData = {title, tags, body, id, createdAt, updatedAt}
  notes.push(newData)
  res.json({ status: 'success', dataId: { id } }); 
  
})


router.get('/notes', async(req,res)=>{
  res.json({ status: 'success', data: { notes } });
})

router.get('/notes/:id', async(req,res)=>{
  const {id} = req.params
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    res.json({ status: 'success', data: { note } });
  } 
  console.log(note)
})

router.put('/notes/:id', async(req,res)=>{
  const {id} = req.params
  const {title, tags, body} = req.body
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
  }
  
})

router.delete('/notes/:id', async(req, res)=>{
  const {id} = req.params
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1)
    res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    })
  }
})

export default router