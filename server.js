const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')


const app =  express()
const attributes = []
let cols = ``

const connection = mysql.createConnection({
    host : 'localhost',
    user: 'aman',
    password : 'a1+a2+a3=A6',
    database : 'misc'

})


app.use(bodyParser.json())

app.get("/api",(req,res)=>{

    res.json({
    })

})


app.post('/createTable',(req,res)=>{
    const data = req.body
    const result = data
    const tableName = result.name
    let reply = ''
    if(tableName != undefined)
    {
          query = `CREATE TABLE `+tableName+` (
            id INT PRIMARY KEY
            );`
            
        connection.query(query, (err, result) => {
            if(err)
                res.json({
                    'reply' : "table exists!"
                })
            else
            res.json({
                'reply' : "table created successfully"
            })
        })
    }
   
})

app.post('/alterTable', (req, res)=>{
    const tableName = req.body.tableName;
    const attribute =req.body.attribute;
    if(attribute!= undefined)
    {
        const query = `ALTER TABLE `+tableName+` ADD COLUMN `+attribute+` INT;`
        console.log(query)

        connection.query(query, (err)=>{
            if(err)
                res.json({
                    "reply" : "attribute '"+attribute+"' already exists."
                })
            else
            res.json({
                "reply" : "attribute added successfully! Press + to add more"
            })
        })

    }
  
})








app.listen(5000,()=>{
    console.log('server started on port 5000')
})