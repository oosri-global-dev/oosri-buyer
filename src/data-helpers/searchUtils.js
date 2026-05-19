class ProductSearchIndex {
  constructor(products = []) {
    this.products = products;
    this.index = this.buildIndex(products);
  }

  buildIndex(products) {
    return products.map((product, idx) => {
      const searchableText = [
        product.name || "",
        product.description || "",
        product.category || "",
        product.brand || "",
        product.tags?.join(" ") || "",
        product.sku || "",
      ]
        .join(" ")
        .toLowerCase();

      return {
        productIndex: idx,
        product,
        tokens: this.tokenize(searchableText),
        searchableText,
      };
    });
  }

  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 0);
  }

  calculateScore(indexEntry, queryTokens) {
    let score = 0;
    const { tokens, searchableText, product } = indexEntry;

    queryTokens.forEach((queryToken) => {
      if (product.name?.toLowerCase().includes(queryToken)) {
        score += 10;
      }

      if (tokens.includes(queryToken)) {
        score += 5;
      }

      tokens.forEach((token) => {
        if (token.includes(queryToken) || queryToken.includes(token)) {
          score += 2;
        }
      });

      if (product.category?.toLowerCase() === queryToken) {
        score += 8;
      }

      if (product.brand?.toLowerCase() === queryToken) {
        score += 7;
      }
    });

    const matchedTokens = queryTokens.filter((qt) =>
      searchableText.includes(qt)
    );

    if (matchedTokens.length < queryTokens.length) {
      score *= 0.5;
    }

    return score;
  }

  search(query, options = {}) {
    const { maxResults = 20, minScore = 0, filters = {} } = options;

    if (!query || query.trim().length === 0) {
      return this.applyFilters(this.products, filters).slice(0, maxResults);
    }

    const queryTokens = this.tokenize(query);
    const results = [];

    this.index.forEach((indexEntry) => {
      const score = this.calculateScore(indexEntry, queryTokens);

      if (score > minScore) {
        results.push({
          product: indexEntry.product,
          score,
        });
      }
    });

    results.sort((a, b) => b.score - a.score);

    const products = results.map((r) => r.product);
    const filtered = this.applyFilters(products, filters);

    return filtered.slice(0, maxResults);
  }

  applyFilters(products, filters) {
    let filtered = [...products];

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => (p.price || 0) >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => (p.price || 0) <= filters.maxPrice);
    }

    if (filters.category) {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.brand) {
      filtered = filtered.filter(
        (p) => p.brand?.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.inStock !== undefined) {
      filtered = filtered.filter((p) =>
        filters.inStock ? (p.inStock ?? 0) > 0 : true
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((p) =>
        filters.tags.some((tag) =>
          p.tags?.some((pTag) => pTag.toLowerCase() === tag.toLowerCase())
        )
      );
    }

    return filtered;
  }

  getSuggestions(query, maxSuggestions = 5) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const queryLower = query.toLowerCase();
    const suggestions = new Set();

    this.products.forEach((product) => {
      if (product.name?.toLowerCase().includes(queryLower)) {
        suggestions.add(product.name);
      }

      if (product.category?.toLowerCase().includes(queryLower)) {
        suggestions.add(product.category);
      }

      if (product.brand?.toLowerCase().includes(queryLower)) {
        suggestions.add(product.brand);
      }

      product.tags?.forEach((tag) => {
        if (tag.toLowerCase().includes(queryLower)) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, maxSuggestions);
  }

  updateProducts(products) {
    this.products = products;
    this.index = this.buildIndex(products);
  }
}

export default ProductSearchIndex;