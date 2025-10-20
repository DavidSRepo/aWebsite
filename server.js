const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());



const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
});



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
        res.json({ success: true });
    }

    catch (err){
        console.error('Database error:', err);
        res.status(500).json({error: 'Database error: ' + err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
