const express = require("express")
const router = express.Router()
const chapter = require('../models/chapter')


router.post('/create',async(req,res)=>{
    try{
        let notebook_id = req.body.notebook_id
        let chapter_name = req.body.chapter_name
        const newChapter = new chapter({name:chapter_name,content:"",notebookid:notebook_id})
        await newChapter.save()
        res.json({ message: 'chapter created successfully', name: chapter_name});
    } catch(error){
        console.log(error)
    }
})

router.get('/',async(req,res)=>{
    try {
        let notebook_id = req.headers.notebook_id
        let response = await chapter.find({notebookid:notebook_id})
        res.json({response});
    } catch (error) {
        console.log(error)
    }
})

router.get('/find',async(req,res)=>{
    try {
        let chapter_id = req.headers.chapter_id
        let response = await chapter.findById(chapter_id)
        res.json({response})
    } catch (error) {
        console.log(error)
    }
})

router.put('/update',async(req,res)=>{
    try {
        let chapter_id = req.headers.chapter_id
        let content = req.body.content
        let response = await chapter.findByIdAndUpdate(chapter_id,{content:content})
        res.json({response})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete',async(req,res)=>{
    try {
        let chapter_id = req.headers.chapter_id
        let response = await chapter.findByIdAndDelete(chapter_id)
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router