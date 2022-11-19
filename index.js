const express = require("express")
const app = express();
const expHbs = require("express-handlebars");
const path = require("path");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const methodOverride = require("method-override");

const questionRoutes = require("./src/routes/question");
const db = require("./src/connect_db/connect");

db.connect();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const handlebars = expHbs.create({
    defaultLayout: 'main',
    helpers: {
        sum: (a, b) => a + b
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src/views')));


app.get("/", (req, res) => {
    res.render("edit");
})

app.get("/test", (req, res) => {
    res.json("test page")
})

app.use("/question", questionRoutes);

app.listen(3001, () => {
    console.log("Node app is running on port 3001");
})