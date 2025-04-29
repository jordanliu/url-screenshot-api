import { Elysia, t } from "elysia";
import { Page } from "puppeteer";
import { handleError } from "lib/utils/error";
import { configurePage, getPage, releasePage } from "lib/utils/browser";
import { ScreenshotQuery } from "lib/types";

const screenshot = new Elysia({ prefix: "/screenshot" }).get(
  "/",
  async ({ query }: { query: ScreenshotQuery }) => {
    let page: Page | null = null;

    try {
      const startTime = performance.now();

      page = await getPage();
      await configurePage(page, query);
      await page.goto(query.url, { waitUntil: "domcontentloaded" });

      const screenshot = await page.screenshot();

      const endTime = performance.now();
      console.info(
        `[REQUEST] ${query.url} took ${(endTime - startTime).toFixed(2)}ms`
      );

      return new Response(screenshot, {
        headers: {
          "Content-Type": "image/png",
        },
      });
    } catch (error) {
      return handleError(error as Error);
    } finally {
      if (page) {
        await releasePage(page);
      }
    }
  },
  {
    query: t.Object({
      url: t.String({ format: "uri" }),
      width: t.Optional(t.Number()),
      height: t.Optional(t.Number()),
      theme: t.Optional(t.String()),
    }),
  }
);

export default screenshot;
