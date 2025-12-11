const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());



const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.PGHOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

pool.connect()
.then(() => console.log("Connected to Postgres"))
.catch(err => console.error("Database connection error:", err));



app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.post("/submit", async (req, res) => {
    const { text } = req.body;
    if(!text){
        return res.status(400).json({error: 'No text provided'});
    }

    try {
        await pool.query('INSERT INTO submissions (text_content) VALUES ($1)', [text]);
        console.log("Inserted:", text);
        res.json({ success: true });
    }

    catch (err){
        console.error('Database error:', err);
        res.status(500).json({error: 'Database error: ' + err.message });
    }
});

app.post("/score", async(req, res)=>{
    const { player_name, score } = req.body;

    if(!player_name || typeof score !== "number"){
        return res.status(400).json({ error: "Invalid name or score"});
    }

    try{
        await pool.query(
            "INSERT INTO scores (player_name, score) VALUES ($1, $2)",
            [player_name, score]
        );
        res.json({ success: true });
    }

    catch (err){
        console.error("Database error:", err);
        res.status(500).json({ error: "Database error: " + err.message });
    }

});

app.get("/scores", async (req, res) =>{
    try{
        const result = await pool.query(
            "SELECT player_name, score FROM scores ORDER BY score DESC, created_at ASC LIMIT 10"
        );
        res.json(result.rows);
    }
    catch (err){
        console.error ("Database error:", err);
        res.status(500).json({ error: "Database error: " + err.message });
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

