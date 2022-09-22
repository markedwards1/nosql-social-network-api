const express = require('express');
const Thought = require('./models/Thought');
require('./config/connection')
const apiRoutes = require ('./router/api');
const thoughtRoutes = require('./router/thoughts')


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/thoughts', thoughtRoutes)

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}/`)
})
