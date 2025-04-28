const express = require('express');
const router = express.Router();
const db = require('../config/db');
const mysql = require('mysql2/promise');

router.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);
        const [rows] = await connection.query('SELECT * FROM posts ORDER BY created_at DESC');
        connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);
        const [rows] = await connection.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
        connection.end();
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    
    try {
        const connection = await mysql.createConnection(db);
        const [result] = await connection.query(
            'INSERT INTO posts (title, content) VALUES (?, ?)',
            [title, content]
        );
        connection.end();
        
        res.status(201).json({ id: result.insertId, title, content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;