const express = require('express');
const cors = require('cors'); // ✅ ADD THIS
const tasks = require('./routes/tasks');
require('dotenv').config();

const app = express();

app.use(cors()); // ✅ ENABLE CORS FOR ALL ORIGINS
app.use(express.json());

app.use('/tasks', tasks);

app.get('/', (req, res) => {
  res.send('✅ Task Tracker API is running on Azure!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

