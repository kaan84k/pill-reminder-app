# ----------- Build Stage -----------
    FROM node:18-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package.json package-lock.json* ./
    RUN npm install
    
    # Copy all source files
    COPY . .
    
    # Build the Next.js app
    RUN npm run build
    
    # ----------- Production Stage -----------
    FROM node:18-alpine
    
    # Set working directory
    WORKDIR /app
    
    # Copy only the built app and necessary files
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/next.config.js ./
    
    # Expose the port Next.js runs on
    EXPOSE 3000
    
    # Start the Next.js server
    CMD ["npm", "start"]
    