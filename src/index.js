const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const collection = require("./mongodb")
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const templatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        email:req.body.email,
        password: req.body.password
    };

    try {
        const checking = await collection.findOne({ name: req.body.name });

        if (checking && checking.name === req.body.name && checking.email === req.body.email && checking.password === req.body.password) {
            res.send("User details already exist");
        } else {
            await collection.insertMany([data])
            res.status(201).render("home", {
                naming: req.body.name
            });
        }
    } catch (error) {
        console.error('MongoDB Error:', error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/login', async (req, res) => {

    try {
        const check = await collection.findOne({ name: req.body.name })
        if (check.password === req.body.password && check.email === req.body.email && check.name === req.body.name ) {
            res.status(201).render("home", { naming: `${req.body.name}` })
        }
        else {
            res.send("Incorrect Details")
        }
    }
    catch (e) {
        res.send("Account Not Found")
    }

})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})