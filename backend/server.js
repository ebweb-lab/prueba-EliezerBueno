const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cardRoutes = require('./routes/cards');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Card API Server Running' });
});

app.use('/api/cards', cardRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
