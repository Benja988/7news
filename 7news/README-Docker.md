# Docker Setup for HintFlow

This guide explains how to run the HintFlow application using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10 or later)
- Docker Compose (version 2.0 or later)

## Quick Start

### Development Environment

1. **Clone the repository and navigate to the project directory:**
   ```bash
   cd 7news
   ```

2. **Start the development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - MongoDB: localhost:27017

### Production Environment

1. **Build and start the production environment:**
   ```bash
   docker-compose up --build -d
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://mongodb:27017/newsapp

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Docker Commands

### Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Start in background
docker-compose -f docker-compose.dev.yml up -d --build

# Stop containers
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f app
```

### Production

```bash
# Start production environment
docker-compose up --build -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f app

# Restart services
docker-compose restart
```

### Database Management

```bash
# Access MongoDB shell
docker-compose exec mongodb mongo -u admin -p password newsapp

# Backup database
docker-compose exec mongodb mongodump -u admin -p password -d newsapp -o /backup

# Restore database
docker-compose exec mongodb mongorestore -u admin -p password /backup/newsapp
```

## File Structure

```
7news/
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── docker-compose.yml      # Production environment
├── docker-compose.dev.yml  # Development environment
├── .dockerignore          # Files to exclude from Docker build
└── next.config.ts         # Next.js configuration (updated for standalone output)
```

## Services

### App Service
- **Image**: Custom Next.js application
- **Port**: 3000
- **Environment**: Production/Development
- **Dependencies**: MongoDB

### MongoDB Service
- **Image**: mongo:7-jammy
- **Port**: 27017
- **Volume**: mongodb_data (persistent storage)
- **Authentication**: Enabled with admin/password

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Change port in docker-compose.yml
   ports:
     - "3001:3000"  # Change 3000 to 3001
   ```

2. **MongoDB connection issues:**
   - Ensure MongoDB container is running
   - Check MONGODB_URI in environment variables
   - Verify network connectivity between containers

3. **Build failures:**
   ```bash
   # Clear Docker cache
   docker system prune -a

   # Rebuild without cache
   docker-compose build --no-cache
   ```

4. **Permission issues:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Logs and Debugging

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs app
docker-compose logs mongodb

# Follow logs in real-time
docker-compose logs -f app
```

## Production Deployment

For production deployment, consider:

1. **Use environment-specific docker-compose files**
2. **Set up proper SSL/TLS certificates**
3. **Configure reverse proxy (nginx)**
4. **Set up monitoring and logging**
5. **Configure backup strategies**
6. **Use Docker secrets for sensitive data**

## Performance Optimization

- The production Dockerfile uses Next.js standalone output for smaller images
- Multi-stage build reduces final image size
- Alpine Linux base image for minimal footprint
- Proper caching layers for faster builds

## Security Considerations

- Change default MongoDB credentials
- Use strong passwords for all services
- Keep Docker and base images updated
- Use Docker secrets in production
- Implement proper firewall rules
- Regular security audits of containers