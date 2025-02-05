const app = require('./app');
const runMigrations = require('./db/migrations');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await runMigrations();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();