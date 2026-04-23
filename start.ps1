# Inspector Startup Script
# Automates Docker, database, and dev server startup

$ErrorActionPreference = "Stop"

function Write-Color {
    param([string]$Text, [string]$Color = "White")
    $colors = @{
        Red = "Red"; Green = "Green"; Yellow = "Yellow"; Blue = "Cyan"
    }
    Write-Host $Text -ForegroundColor $colors[$Color]
}

Write-Color "=======================================" "Blue"
Write-Color "   Inspector - Vehicle Inspection System" "Blue"
Write-Color "=======================================" "Blue"
Write-Host ""

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Color "Error: Docker is not installed." "Red"
    Write-Host "Please install Docker Desktop from https://www.docker.com/products/docker-desktop/"
    exit 1
}

# Check if Docker is running
try {
    $null = docker info 2>$null
    Write-Color "Docker is running." "Green"
} catch {
    Write-Color "Error: Docker is not running." "Red"
    Write-Host "Please start Docker Desktop and try again."
    exit 1
}

Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Color "Installing dependencies..." "Yellow"
    npm install
    Write-Color "Dependencies installed." "Green"
    Write-Host ""
}

# Check if Prisma client is generated
if (-not (Test-Path "node_modules\.prisma")) {
    Write-Color "Generating Prisma client..." "Yellow"
    npx prisma generate
    Write-Color "Prisma client generated." "Green"
    Write-Host ""
}

# Start Docker Compose services
Write-Color "Starting Docker services..." "Yellow"
docker compose up -d db

# Wait for database to be ready
Write-Color "Waiting for PostgreSQL to be ready..." "Yellow"
$retries = 30
$ready = $false
while ($retries -gt 0 -and -not $ready) {
    try {
        $result = docker compose exec -T db pg_isready -U postgres 2>$null
        if ($LASTEXITCODE -eq 0) {
            $ready = $true
            Write-Color "PostgreSQL is ready." "Green"
            break
        }
    } catch { }
    $retries--
    Write-Host "  Waiting... ($retries attempts left)"
    Start-Sleep -Seconds 2
}

if (-not $ready) {
    Write-Color "Error: PostgreSQL did not start in time." "Red"
    Write-Host "Check Docker logs: docker compose logs db"
    exit 1
}

Write-Host ""

# Run Prisma migrations
Write-Color "Running database migrations..." "Yellow"
npx prisma migrate dev --name init --skip-generate
Write-Color "Migrations complete." "Green"
Write-Host ""

# Seed database
Write-Color "Seeding database with reference data..." "Yellow"
npx prisma db seed
Write-Color "Database seeded." "Green"
Write-Host ""

# Start development server
Write-Color "=======================================" "Green"
Write-Color "   Starting development server..." "Green"
Write-Color "=======================================" "Green"
Write-Host ""
Write-Color "App will be available at: http://localhost:3000" "Blue"
Write-Color "Prisma Studio: npx prisma studio" "Blue"
Write-Host ""

npm run dev
