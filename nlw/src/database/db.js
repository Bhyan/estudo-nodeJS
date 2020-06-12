const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.serialize(() => {

    function afterInsertData(error){
        if(error) {
            return console.log(error)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    function listData(error, rows) {
        if(error) {
            return console.log(error)
        }

        console.log("Aqui estão seus registos")
        console.log(rows)       
    }

    function deleteData(error){
        if(error) {
            return console.log(error)
        }

        console.log("Registro deletado")
    }

    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

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
        "http://localhost:3000/img/michael-jin-ET6_fDwZj2U-unsplash.jpg",
        "Coleteria",
        "Guilherme Gemballa, Jardim América ",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    // db.run(query, values, afterInsertData)

    // db.all(`SELECT * FROM places`, listData)

    // db.run(`DELETE FROM places WHERE id = ?`, [6], deleteData)

})