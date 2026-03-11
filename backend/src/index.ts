import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import settingsRoutes from './routes/settings.js';
import { testConnection } from './db/connection.js';
import { testRedisConnection } from './config/redis.js';

dotenv.config();

/**
 * Express Application Server
 * Main backend server for Cartao Todos Meta Platform
 * Handles authentication, API proxy, and credential management
 */

const app: Application = express();
const PORT = process.env.PORT || 3001;

/**
 * Middleware Configuration
 */

// CORS - Allow frontend to access backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true, // Allow cookies to be sent
}));

// JSON body parser
app.use(express.json());

// URL-encoded body parser
app.use(express.urlencoded({ extended: true }));

// Cookie parser (for httpOnly cookies)
app.use(cookieParser());

/**
 * Routes
 */

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Settings routes
app.use('/api/settings', settingsRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.method} ${req.path} não existe`,
  });
});

/**
 * Error handler middleware
 */
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erro inesperado',
  });
});

/**
 * Start server and initialize connections
 */
async function startServer() {
  try {
    console.log('\n🚀 Starting Cartao Todos Backend Server...\n');

    // Test database connection
    console.log('→ Testing PostgreSQL connection...');
    await testConnection();

    // Test Redis connection
    console.log('→ Testing Redis connection...');
    await testRedisConnection();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`\n✓ Server running on port ${PORT}`);
      console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`  Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
      console.log(`\n✓ Backend server started successfully!\n`);
    });
  } catch (error) {
    console.error('\n✗ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
