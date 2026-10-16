import Image from "next/image";

export function Photo({
  src,
  alt,
  caption,
  priority = false,
  className = "",
  imageClassName = "object-cover",
  aspect = "aspect-[3/2]",
  bleed = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  aspect?: string;
  bleed?: boolean;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-ex-line ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 70vw, 100vw"
          className={imageClassName}
        />
      </div>
      {caption ? (
        <figcaption
          className={`mt-3 border-t border-ex-line pt-3 text-sm text-ex-mute ${bleed ? "px-5 pb-4 md:px-8" : ""}`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
