let express = require("express")
const multer = require("multer")
const path = require("path")

let db = require("./db")


let app = express()
app.use(express.urlencoded({ extended: true }))



app.use(express.static("static"))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage })




app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "views")

app.get("/", (req, res) => {
    db.query("SELECT * FROM products", (err, rows) => {
        console.log(err)
        let products = rows
        products.forEach(product => {
            product.image = JSON.parse(product.image)
        })
        res.render("index", { products })
    })
})
app.get("/post/:id", (req, res) => {
    let postId = req.params.id
    db.query(`SELECT p.*, c.id as commentId, c.author, c.comment FROM products as p LEFT JOIN comments as c 
        ON p.id =c.postId
        WHERE p.id = ?`, postId, (err, result) => {
        if (err || result.length == 0) {
            console.log(err)
            return res.status(404).render("notFound")
        }
        let product = result[0]
        console.log(result)
        product.image = JSON.parse(product.image)
        res.status(200).render("post", { product })
    })

})

app.post("/add", upload.fields([{ name: "image" }]), (req, res) => {
    let data = { ...req.body }
    console.log(data)
    data.image = req.files.image.map((file) => file.filename)
    data.image = JSON.stringify(data.image)
    db.query("INSERT INTO products SET?", data, (err) => {
        res.status(201)
        res.send({ status: "ok" })
    })
})

app.post("/comment", (req, res) => {
    let data = req.body
    console.log(data)
    // db.query(`INSERT INTO comments set ?`, data, (err, result)=>{
    //     if (err) res.status(500)
    //     res.end()
    // })
    res.end()
})



app.get("/ads", (req, res) => {
    res.json(ads)
})

// app.use( (req,res, next)=>{
//     res.status = 404
//     res.render("notFound")
// })
app.listen(3000, () => console.log("Server on!"))
