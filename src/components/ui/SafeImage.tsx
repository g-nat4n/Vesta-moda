import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const ALLOWED_HOSTS = new Set(["images.unsplash.com", "images.pexels.com", "res.cloudinary.com"]);

function canOptimize(src: string) {
  if (src.startsWith("/")) return true;
  try {
    return ALLOWED_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

export function SafeImage({
  src,
  alt,
  className,
  fill,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
}) {
  if (!canOptimize(src)) {
    return (
      // Native fallback for URLs outside next/image hosts
      <img
        src={src}
        alt={alt}
        className={cn(fill && "absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  const props = {
    src,
    alt,
    className,
    sizes,
  } satisfies Partial<ImageProps>;

  if (fill) {
    return <Image {...props} fill />;
  }

  return <Image {...props} width={400} height={500} />;
}
