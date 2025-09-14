let express = require ("express")

let app = express()
app.use(express.static("static"))

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Hi")
})

app.post("/add",(req,res)=>{
    ads.push(req.body)
    res.send({status:"ok"})
})

app.get("/ads", (req,res)=>{
    res.json(ads)
})


app.listen(3000, ()=>console.log("Server on!"))
