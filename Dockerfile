# Step 1: Use the official Bun image as the base image
FROM oven/bun:latest

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package files (bun.lockb and package.json)
COPY bun.lockb package.json ./

# Step 4: Install dependencies once during the build
RUN bun install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Expose port 3000 for your API
EXPOSE 3000

# Step 7: Command to start the server
CMD ["bun", "run", "src/index.ts"]
