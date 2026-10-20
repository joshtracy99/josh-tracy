import { areas } from "@/lib/example";

/**
 * Town centres from OpenStreetMap, October 2026.
 * The picture is the standard OSM raster for this one view. The browser requests
 * those tiles itself; they are not copied into the site.
 */
const centres = {
  Godalming: [51.1855806, -0.6126567],
  Farncombe: [51.1956925, -0.6056463],
  Milford: [51.1712267, -0.6479917],
  Busbridge: [51.1757846, -0.6035657],
  Shalford: [51.2122503, -0.565412],
  Bramley: [51.1945453, -0.5571497],
  Guildford: [51.2356068, -0.5732063],
  Cranleigh: [51.1407587, -0.4865787],
  Witley: [51.1494543, -0.647082],
  Haslemere: [51.0876062, -0.7097768],
} as const satisfies Record<(typeof areas)[number], readonly [number, number]>;

const ZOOM = 12;
const PAD = 0.2;

function project(lat: number, lon: number) {
  const scale = 2 ** ZOOM;
  const x = ((lon + 180) / 360) * scale;
  const rad = (lat * Math.PI) / 180;
  const y = (1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2 * scale;
  return { x, y };
}

function frameOf() {
  const points = areas.map((name) => {
    const [lat, lon] = centres[name];
    return { name, base: name === "Godalming", ...project(lat, lon) };
  });
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX;
  const spanY = maxY - minY;
  const viewMinX = minX - spanX * PAD;
  const viewMaxX = maxX + spanX * PAD;
  const viewMinY = minY - spanY * PAD;
  const viewMaxY = maxY + spanY * PAD;
  const x0 = Math.floor(viewMinX);
  const x1 = Math.floor(viewMaxX);
  const y0 = Math.floor(viewMinY);
  const y1 = Math.floor(viewMaxY);
  const viewW = viewMaxX - viewMinX;
  const viewH = viewMaxY - viewMinY;
  const cols = x1 - x0 + 1;
  const rows = y1 - y0 + 1;
  const tiles = [];
  for (let y = y0; y <= y1; y += 1) {
    for (let x = x0; x <= x1; x += 1) {
      tiles.push({ x, y, src: `https://tile.openstreetmap.org/${ZOOM}/${x}/${y}.png` });
    }
  }
  return {
    aspect: `${viewW} / ${viewH}`,
    mosaic: {
      left: ((x0 - viewMinX) / viewW) * 100,
      top: ((y0 - viewMinY) / viewH) * 100,
      width: (cols / viewW) * 100,
      height: (rows / viewH) * 100,
      cols,
      rows,
    },
    tiles,
    places: points.map((point) => ({
      name: point.name,
      base: point.base,
      left: ((point.x - viewMinX) / viewW) * 100,
      // Sit just north of the centre so the dot does not cover the place name drawn on the tile.
      top: ((point.y - viewMinY) / viewH) * 100 - (20 / (viewH * 256)) * 100,
    })),
  };
}

const frame = frameOf();

export function CoverageMap() {
  return (
    <figure className="min-w-0">
      <div className="al-map-stage al-frame" style={{ aspectRatio: frame.aspect }}>
        <div
          className="al-map-mosaic"
          style={{
            left: `${frame.mosaic.left}%`,
            top: `${frame.mosaic.top}%`,
            width: `${frame.mosaic.width}%`,
            height: `${frame.mosaic.height}%`,
            gridTemplateColumns: `repeat(${frame.mosaic.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${frame.mosaic.rows}, minmax(0, 1fr))`,
          }}
          aria-hidden="true"
        >
          {frame.tiles.map((tile) => (
            // Plain img. next/image would fetch the tile on this server and drop the browser Referer.
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`${tile.x}-${tile.y}`} src={tile.src} alt="" width={256} height={256} decoding="async" draggable={false} />
          ))}
        </div>
        {frame.places.map((place) => (
          <span
            key={place.name}
            className={place.base ? "al-map-pin is-base" : "al-map-pin"}
            style={{ left: `${place.left}%`, top: `${place.top}%` }}
            title={place.base ? `${place.name}, the base` : place.name}
          />
        ))}
        <a className="al-map-credit" href="https://www.openstreetmap.org/copyright">
          © OpenStreetMap contributors
        </a>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-[var(--al-mute)]">
        North at the top. The copper dot is Godalming. Town centres, not a circle.
        <span className="sr-only">
          {" "}
          Farncombe and Busbridge are close by. Guildford is north, Cranleigh is east, and Haslemere is furthest,
          to the south-west.
        </span>
      </figcaption>
    </figure>
  );
}
