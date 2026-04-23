#!/bin/bash
# Inspector Startup Script
# Automates Docker, database, and dev server startup

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}   Inspector - Vehicle Inspection System${NC}"
echo -e "${BLUE}=======================================${NC}"
echo ""

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed.${NC}"
    echo "Please install Docker Desktop from https://www.docker.com/products/docker-desktop/"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}Error: Docker is not running.${NC}"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo -e "${GREEN}Docker is running.${NC}"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}Dependencies installed.${NC}"
    echo ""
fi

# Check if Prisma client is generated
if [ ! -d "node_modules/.prisma" ]; then
    echo -e "${YELLOW}Generating Prisma client...${NC}"
    npx prisma generate
    echo -e "${GREEN}Prisma client generated.${NC}"
    echo ""
fi

# Start Docker Compose services
echo -e "${YELLOW}Starting Docker services...${NC}"
docker compose up -d db

# Wait for database to be ready
echo -e "${YELLOW}Waiting for PostgreSQL to be ready...${NC}"
RETRIES=30
while [ $RETRIES -gt 0 ]; do
    if docker compose exec -T db pg_isready -U postgres > /dev/null 2>&1; then
        echo -e "${GREEN}PostgreSQL is ready.${NC}"
        break
    fi
    RETRIES=$((RETRIES - 1))
    echo "  Waiting... ($RETRIES attempts left)"
    sleep 2
done

if [ $RETRIES -eq 0 ]; then
    echo -e "${RED}Error: PostgreSQL did not start in time.${NC}"
    echo "Check Docker logs: docker compose logs db"
    exit 1
fi

echo ""

# Run Prisma migrations
echo -e "${YELLOW}Running database migrations...${NC}"
npx prisma migrate dev --name init --skip-generate || true
echo -e "${GREEN}Migrations complete.${NC}"
echo ""

# Seed database
echo -e "${YELLOW}Seeding database with reference data...${NC}"
npx prisma db seed || true
echo -e "${GREEN}Database seeded.${NC}"
echo ""

# Start development server
echo -e "${GREEN}=======================================${NC}"
echo -e "${GREEN}   Starting development server...${NC}"
echo -e "${GREEN}=======================================${NC}"
echo ""
echo -e "${BLUE}App will be available at: http://localhost:3000${NC}"
echo -e "${BLUE}Prisma Studio: http://localhost:5555${NC}"
echo ""

npm run dev
