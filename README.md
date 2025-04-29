# URL Screenshot API

A fast and lightweight API for generating screenshots from a URL, built with Elysia and Bun.

## Getting Started

First, install the required dependencies and ensure that Bun is installed on your system.

```bash
bun install
```

## Development

To start the development server run:

```bash
bun run dev
```

## Usage

`GET /screenshot`

Parameters

- url (required): The URL of the webpage you want to capture.
- width (optional): The width of the screenshot. Defaults to 1920ox if not provided.
- height (optional): The height of the screenshot. Defaults to 1080px if not provided.
- theme (optional): The theme to use for the screenshot. Options include:
- - light (default)
- - dark

```bash
curl "http://localhost:3000/screenshot?url=https://googlechromelabs.github.io/dark-mode-toggle/demo/&width=1920&height=1080&theme=dark" --output screenshot.png

```

The API does not return a JSON response. Instead, it directly returns the screenshot image in response to the GET request. You can view or download the image from the browser or handle it programmatically.
