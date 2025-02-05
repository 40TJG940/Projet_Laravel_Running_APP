# Running App

A desktop and mobile application for tracking runs and monitoring fitness progress.

## Features

- Real-time GPS tracking
- Run statistics and analytics
- User profiles and authentication
- Cross-platform support (Desktop & Mobile)

## Tech Stack

- Frontend: React, Vite, Electron
- Backend: Node.js, Express
- Database: MySQL
- Authentication: JWT

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Start development servers:

Desktop:
```bash
npm run electron:dev
```

Backend:
```bash
cd server
npm run dev
```

## Project Structure

```
└── running-app/
    ├── src/              # Frontend source
    │   ├── components/   # React components
    │   ├── pages/        # Route pages
    │   ├── hooks/        # Custom hooks
    │   └── utils/        # Utilities
    ├── server/           # Backend source
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   └── middleware/   # Express middleware
    └── public/           # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT