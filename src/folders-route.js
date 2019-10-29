const express = require('express')
const foldersRouter = express.Router()
const bodyParser = express.json()
const FoldersService = require('./folders-service.js')
const jsonParser = express.json()
const xss = require('xss')
const path = require('path')

foldersRouter
    .route('/')
    .get((req, res, next)=>{
        const knexInstance = req.app.get('db')
        FoldersService.getAllFolders(knexInstance)
            .then(folders =>{
                res.json(folders)
            })
            .catch(next);
    })
    .post(jsonParser, (req,res,next)=>{
        const folder_name = req.body.folder_name;

        if(!folder_name){
            return res
            .status(400)
            .json({error: {message: 'Missing "folder_name" in request body'}})
        }

        const newFolder = {folder_name};

        FoldersService.insertFolder(req.app.get('db'), newFolder)
        .then(folder=>{
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${folder.id}`))
            .json(folder)
        })
        .catch(next)

    })

    foldersRouter  
        .route('/:id')
        .all((req, res, next)=>{
            FoldersService.getById(
                req.app.get('db'),
                req.params.id
            )
            .then(folder=>{
                if(!folder) {
                    return res.status(404).json({
                        error: {message: `Folder with id ${req.params.id} not found`}
                    })
                }
                res.folder = folder
                next()
            })
            .catch(next)
        })
        .get((req, res, next)=>{

            res.json({
                id: res.folder.id,
                name: xss(res.folder.folder_name)
            })
        })

        .delete((req, res, next)=>{
            FoldersService.deleteFolder(
                req.app.get('db'),
                req.params.id
            )
            .then(()=>{res
            .status(204)
            .end();})
        })

        .patch(jsonParser, (req, res, next) => {
            const { folder_name } = req.body
            const folderToUpdate = { folder_name }
 
               const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length
               if (numberOfValues === 0) {
                 return res.status(400).json({
                   error: {
                     message: `Request body must contain a new name.`
                   }
                 })
               }
 
               FoldersService.updateFolder(
                  req.app.get('db'),
                  req.params.id,
                  folderToUpdate
                )
                  .then(numRowsAffected => {
                    res.status(204).end()
                  })
                  .catch(next)          })

        module.exports = foldersRouter
  