const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
var cors = require('cors');
const authRoutes = require('./routes/auth')



env.config();
app.use(cors());
mongoose.connect(
    `mongodb+srv://akshaywairagade2:pvbt890SwnzId8E5@cluster0.lvwngsm.mongodb.net/splitwise?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log(`Database Connected`);
});

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT_NUMBER, () => {
    console.log("Connected");
})
