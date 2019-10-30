const express = require('express')
const notesRouter = express.Router()
const bodyParser = express.json()
const NotesService = require('./notes-service.js')
const jsonParser = express.json()
const xss = require('xss')
const path = require('path')
const cors = require('cors')



notesRouter.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });

notesRouter
    .route('/')
    .get((req, res, next)=>{
        const knexInstance = req.app.get('db')
        NotesService.getAllNotes(knexInstance)
            .then(notes =>{
                res.json(notes)
            })
            .catch(next);
    })
    .post(bodyParser, (req,res,next)=>{
        const note_name = req.body.note_name;
        const folder_id = req.body.folder_id;
        const note_content = req.body.note_content;

        if(!note_name){
            return res
            .status(400)
            .json({error: {message: 'Missing "name" in request body'}})
        }

        const newNote = {note_name, folder_id, note_content};

        NotesService.insertNote(req.app.get('db'), newNote)
        .then(note=>{
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${note.id}`))
            .json(note)
        })
        .catch(next)

    })

    notesRouter  
        .route('/:id')
        .all((req, res, next)=>{
            NotesService.getById(
                req.app.get('db'),
                req.params.id
            )
            .then(note=>{
                if(!note) {
                    return res.status(404).json({
                        error: {message: `Note with id ${req.params.id} not found`}
                    })
                }
                res.note = note
                next()
            })
            .catch(next)
        })
        .get((req, res, next)=>{

            res.json({
                id: res.note.id,
                name: xss(res.note.note_name),
                modified: res.note.modified, 
                folderId: res.note.folder_id, 
                content: xss(res.note.note_content)
            })
        })

        .delete((req, res, next)=>{
            NotesService.deleteNote(
                req.app.get('db'),
                req.params.id
            )
            .then(()=>{res
            .status(204)
            .end();})
        })

        .options(function(req, res, next){
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            res.send(200);
          })

        .patch(cors(),(req, res, next) => {
            const { note_name, note_content, folder_id } = req.body
            const noteToUpdate = { note_name, note_content, folder_id }
 
               const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length
               if (numberOfValues === 0) {
                 return res.status(400).json({
                   error: {
                     message: `Request body must contain either 'name', 'folder id' or 'content'`
                   }
                 })
               }
 
               NotesService.updateNote(
                  req.app.get('db'),
                  req.params.id,
                  noteToUpdate
                )
                  .then(numRowsAffected => {
                    res.status(204).end()
                  })
                  .catch(next)          })

        module.exports = notesRouter
  