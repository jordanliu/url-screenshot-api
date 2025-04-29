import { Elysia } from "elysia";
import screenshot from "lib/routes/screenshot";
import { initBrowser, cleanupBrowser } from "lib/utils/browser";

const port = process.env.PORT || 3000;

await initBrowser();

const app = new Elysia().use(screenshot).listen(port);

console.log(`🚀 Server is running at ${app.server?.hostname}:${port}`);

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
