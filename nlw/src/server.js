const express = require("express")
const nunjucks = require("nunjucks")
const db = require("./database/db")


const server = express()
server.use(express.static("public"))
server.use(express.urlencoded({ extends: true }))

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.number,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    db.run(query, values, function afterInsertData(error) {
        if (error) {
            return console.log(error)
        }
        return res.render("create-point.html", { saved: true })
    })
})

server.get("/search-results", (req, res) => {

    const search = req.query.search

    db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function listData(error, rows) {
        if (error) {
            return console.log(error)
        }

        return res.render("search-results.html", { places: rows, total: rows.length })
    })
})

server.listen(3000)