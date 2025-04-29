import { ScreenshotQuery } from "lib/types";
import puppeteer, { Browser, Page } from "puppeteer";

let browser: Browser | null = null;

const PAGE_POOL_SIZE = 5;
const pagePool: Page[] = [];

export const initBrowser = async (): Promise<void> => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
};

export const cleanupBrowser = async (): Promise<void> => {
  if (browser) {
    await Promise.all(pagePool.map((page) => page.close()));
    pagePool.length = 0;

    await browser.close();
    browser = null;
  }
};

export const getPage = async (): Promise<Page> => {
  if (!browser) {
    throw new Error("Browser not initialized");
  }

  if (pagePool.length > 0) {
    return pagePool.pop()!;
  }
  return await browser.newPage();
};

export const releasePage = async (page: Page): Promise<void> => {
  try {
    await page.goto("about:blank");
    if (pagePool.length < PAGE_POOL_SIZE) {
      pagePool.push(page);
    } else {
      await page.close();
    }
  } catch (error) {
    console.error("Failed to release page:", error);
    await page.close().catch(() => {});
  }
};

export const configurePage = async (
  page: Page,
  query: ScreenshotQuery
): Promise<void> => {
  if (query.width || query.height) {
    await page.setViewport({
      width: query.width || 1920,
      height: query.height || 1080,
    });
  }

  if (query.theme) {
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: query.theme },
    ]);
  }
};
