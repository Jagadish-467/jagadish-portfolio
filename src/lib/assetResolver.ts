// Map of local asset paths to their resolved URLs
// Clean resolver without missing file imports

const assetMap: Record<string, string> = {};

/**
 * Resolves an image URL - if it's a local /src/assets path, returns the bundled asset URL.
 * Otherwise returns the original URL (for Supabase storage URLs, public URLs, etc.)
 */
export const resolveImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  // Check if it's a local asset path
  if (url.startsWith("/src/assets/") || url.startsWith("src/assets/")) {
    const normalizedPath = url.startsWith("/") ? url : `/${url}`;
    return assetMap[normalizedPath] || url;
  }
  
  // Return the original URL
  return url;
};
