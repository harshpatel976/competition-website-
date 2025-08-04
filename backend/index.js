const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/database');
const initSocket = require('./config/socket');
const { errorHandler } = require('./middleware/errorMiddleware');
const participantRoutes = require('./routes/participantRoutes');
const teamRoutes = require('./routes/teamRoutes');
const coachRoutes = require('./routes/coachRoutes');
const eventRoutes = require('./routes/eventRoutes');
const resultRoutes = require('./routes/resultRoutes');
const authRoutes = require('./routes/authRoutes');
const { PORT } = require('./config/env');

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/participants', participantRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/auth', authRoutes);

// Error Handler
app.use(errorHandler);

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Make io accessible globally
app.set('io', io);