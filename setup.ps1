# DXP Prompt Library Setup Script
# Run this script to set up the development environment

Write-Host "Setting up Cognizant DXP Prompt Library..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Yellow
} catch {
    Write-Host "Error: Node.js is not installed. Please install Node.js 16.x or higher." -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Yellow
} catch {
    Write-Host "Error: npm is not available." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Error: Failed to install dependencies." -ForegroundColor Red
    exit 1
}

# Compile TypeScript
Write-Host "Compiling TypeScript..." -ForegroundColor Green
npm run compile

if ($LASTEXITCODE -eq 0) {
    Write-Host "TypeScript compiled successfully!" -ForegroundColor Green
} else {
    Write-Host "Error: TypeScript compilation failed." -ForegroundColor Red
    exit 1
}

# Run linter
Write-Host "Running linter..." -ForegroundColor Green
npm run lint

Write-Host ""
Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To start development:" -ForegroundColor Yellow
Write-Host "1. Open VS Code: code ." -ForegroundColor White
Write-Host "2. Press F5 to launch extension in debug mode" -ForegroundColor White
Write-Host "3. Use Ctrl+Shift+P and search for 'DXP' commands" -ForegroundColor White
Write-Host ""
Write-Host "To build the extension:" -ForegroundColor Yellow
Write-Host "npm run package" -ForegroundColor White
