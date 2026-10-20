import Image from "next/image";

export function Still({
  src,
  alt,
  className = "",
  imageClassName = "object-cover",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  crop,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Window onto pipe fittings. The full frame includes a kitchen mixer. */
  crop?: "pipes";
}) {
  if (crop === "pipes") {
    return (
      <div className={`al-pipes ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={1248}
          height={832}
          priority={priority}
          sizes={sizes}
          className="al-pipes-img"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[var(--al-still)] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={imageClassName}
      />
    </div>
  );
}
