import { Elysia } from "elysia";
import screenshot from "lib/routes/screenshot";
import { initBrowser, cleanupBrowser } from "lib/utils/browser";

const port = process.env.PORT || 3000;

// Initialize the browser when the server starts
await initBrowser();

const app = new Elysia().use(screenshot).listen(port);

console.log(`🚀 Server is running at ${app.server?.hostname}:${port}`);

// Handle cleanup on process termination
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await cleanupBrowser();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await cleanupBrowser();
  process.exit(0);
});
