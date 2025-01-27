#!/bin/bash

# Open the frontend commands in a new cmd window
start cmd /k "cd frontend && npx expo start -c"

# Open the backend commands in another new cmd window
start cmd /k "cd backend && npm run dev"
