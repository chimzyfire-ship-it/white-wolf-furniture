# Product Listing Guide - White Wolf Furniture

To manually manage your products and gallery images, follow these steps:

### 1. Locate the Data File
The main configuration for your products and images is located at:
`/Users/apple/.gemini/antigravity/scratch/white-wolf-furniture/src/data/siteData.ts`

### 2. Updating Products
The `products` array contains the items listed in the "Featured Collection". Each product has the following fields:
- `id`: A unique number.
- `name`: The name of the furniture piece.
- `price`: The listing price (e.g., "$1,200"). Use "$TBD" if you're not ready to show a price.
- `image`: The path to the photo in the `public/assets/real-photos/` folder.
- `description`: A short, compelling description of the item.

**Example of adding a new product:**
```typescript
{
  id: 9,
  name: "New Custom Project",
  price: "$1,500",
  image: "/assets/real-photos/your-image-name.JPG",
  description: "A beautiful custom piece handcrafted with premium materials."
}
```

### 3. Updating the Gallery
The `galleryImages` array is a simple list of image paths. Any path you add here will automatically appear in the masonry grid on the website with the HD Lightbox effect.

### 4. Adding New Photos
To add new photos:
1. Copy the new image files into the following folder:
   `/Users/apple/.gemini/antigravity/scratch/white-wolf-furniture/public/assets/real-photos/`
2. Add the filename to the `galleryImages` or `products` list in `siteData.ts` as shown above.

> [!TIP]
> After saving your changes to `siteData.ts`, the development server will automatically refresh, and you'll see the updates live!
