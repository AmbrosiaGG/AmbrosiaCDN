const express = require("express")
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('../views/dashboard/index.ejs', {
        title: process.env.title,
        req: req,
        res: res,
        role: req.session.role,
        name: req.session.username
    })
})

router.get('/images', async (req, res) => {
    res.render('../views/dashboard/images.ejs', {
        title: process.env.title,
        req: req,
        res: res,
        role: req.session.role,
        name: req.session.username,
        pass: req.session.not_listd
    })
})

router.get('/texts', async (req, res) => {
    res.render('../views/dashboard/files.ejs', {
        title: process.env.title,
        req: req,
        res: res,
        role: req.session.role,
        name: req.session.username
    })
})
module.exports = router