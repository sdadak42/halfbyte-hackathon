const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Bağlantısı Başarılı');
    } catch (err) {
        console.error('❌ MongoDB Bağlantı Hatası:', err);
        process.exit(1); 
    }
};

connectDB();

const authRoute = require('./routes/auth');
const workspaceRoute = require('./routes/workspace');
const quizRoute = require('./routes/quiz');
const notesRoute = require('./routes/notes');

app.use('/api/auth', authRoute);
app.use('/api/workspaces', workspaceRoute);
app.use('/api/quizzes', quizRoute);
app.use('/api/notes', notesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor.`);
});
