#!/bin/bash

# Kill existing processes
pkill -f "tsx index.ts" 2>/dev/null
pkill -f "vite" 2>/dev/null

# Wait a moment
sleep 1

# Start backend server
cd server
tsx index.ts &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Go back to root and start frontend
cd ../client
npx vite --host 0.0.0.0 --port 5000 &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Servers started successfully!"

# Keep the script running to maintain the background processes
wait