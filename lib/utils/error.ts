export const handleError = (error: Error): Response => {
  return new Response(
    JSON.stringify({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    }),
    {
      status: 500,
    }
  );
};
