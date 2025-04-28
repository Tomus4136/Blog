const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});