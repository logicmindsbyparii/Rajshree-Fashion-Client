export const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1583391733958-d25e07fac661?w=600&q=80',
  'https://images.unsplash.com/photo-1617260551069-45f899e32a67?w=600&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
  'https://images.unsplash.com/photo-1509631179647-0c114cbab000?w=600&q=80',
  'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80',
  'https://images.unsplash.com/photo-1502716115624-b565e0990d9b?w=600&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
  'https://images.unsplash.com/photo-1515347619252-c8e62243d5bb?w=600&q=80'
];

export const PLACEHOLDER_IMAGES_LARGE = [
  'https://images.unsplash.com/photo-1583391733958-d25e07fac661?w=800&q=80',
  'https://images.unsplash.com/photo-1617260551069-45f899e32a67?w=800&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
  'https://images.unsplash.com/photo-1509631179647-0c114cbab000?w=800&q=80',
  'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80',
  'https://images.unsplash.com/photo-1502716115624-b565e0990d9b?w=800&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
  'https://images.unsplash.com/photo-1515347619252-c8e62243d5bb?w=800&q=80'
];

export function getProductImage(product, large = false) {
  const images = large ? PLACEHOLDER_IMAGES_LARGE : PLACEHOLDER_IMAGES;
  let url = product.image_url;
  if (url) {
    if (url.startsWith('uploads/')) url = '/' + url;
    if (url.startsWith('/uploads/')) return url;
  }
  const idx = product.id ? String(product.id).charCodeAt(0) % images.length : 0;
  return images[idx];
}
