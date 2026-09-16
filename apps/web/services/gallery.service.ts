import type { GalleryItem } from "@shafiq-info/types";
import galleryData from "@data/gallery.json";

const galleryItems = galleryData as GalleryItem[];

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return galleryItems;
}
