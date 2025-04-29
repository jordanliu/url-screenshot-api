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

> [!NOTE]  
> The initial request will be slower than the subsequent requests due to browser initialization.

`GET /screenshot`

| Parameter | Required | Description                                      | Default |
| --------- | -------- | ------------------------------------------------ | ------- |
| url       | Yes      | The URL of the webpage you want to capture       | -       |
| width     | No       | The width of the screenshot                      | 1920px  |
| height    | No       | The height of the screenshot                     | 1080px  |
| theme     | No       | The theme to use for the screenshot (light/dark) | light   |

```bash
curl "http://localhost:3000/screenshot?url=https://googlechromelabs.github.io/dark-mode-toggle/demo/&width=1920&height=1080&theme=dark" --output screenshot.png

```

The API does not return a JSON response. Instead, it directly returns the screenshot image in response to the GET request. You can view or download the image from the browser or handle it programmatically.
