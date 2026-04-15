export const searchProducts = async (query, page = 1) => {
  return {
    success: true,
    message: "Client-side search mode enabled",
    body: {
      query,
      page,
      products: [],
    },
  };
};