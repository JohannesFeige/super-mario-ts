import { Level } from '../Level';
import { createBackgroundLayer, createSpriteLayer } from '../layers';
import { loadJSON, loadSpriteSheet } from '../loaders';
import { Matrix } from '../math';
import { LevelSpec, Patterns, Tile, TileName, TileRange, TileType } from '../types';

export async function loadLevel(name: string) {
  const levelSpec = await loadJSON<LevelSpec>(`/levels/${name}.json`);
  const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet);

  const level = new Level();

  const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
    return mergedTiles.concat(layerSpec.tiles);
  }, [] as Tile[]);
  const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
  level.setCollisionGrid(collisionGrid);

  levelSpec.layers.forEach((layer) => {
    const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
    const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
    level.comp.layers.push(backgroundLayer);
  });

  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.layers.push(spriteLayer);

  return level;
}

function createCollisionGrid(tiles: Tile[], patterns: Patterns) {
  const grid = new Matrix<{ type?: TileType }>();

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, { ...tile });
  }

  return grid;
}

function createBackgroundGrid(tiles: Tile[], patterns: Patterns) {
  const grid = new Matrix<{ name: TileName }>();

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, { name: tile.name });
  }

  return grid;
}

function* expandSpan(xStart: number, xLength: number, yStart: number, yLength: number) {
  const xEnd = xStart + xLength;
  const yEnd = yStart + yLength;

  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      yield { x, y };
    }
  }
}

function expandRange(range: TileRange) {
  if (range.length === 4) {
    return expandSpan(...range);
  } else if (range.length === 3) {
    const [xStart, xLen, yStart] = range;
    return expandSpan(xStart, xLen, yStart, 1);
  } else if (range.length === 2) {
    const [xStart, yStart] = range;
    return expandSpan(xStart, 1, yStart, 1);
  } else {
    throw 'unexpected range length';
  }
}

function* expandRanges(ranges: TileRange[]) {
  for (const range of ranges) {
    for (const item of expandRange(range)) {
      yield item;
    }
  }
}

function expandTiles(tiles: Tile[], patterns: Patterns) {
  const expandedTiles: { tile: Tile; x: number; y: number }[] = [];

  function walkTiles(tiles: Tile[], offsetX: number, offsetY: number) {
    for (const tile of tiles) {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;

        if (tile.pattern) {
          const { tiles } = patterns[tile.pattern];
          walkTiles(tiles, derivedX, derivedY);
        } else {
          expandedTiles.push({ tile, x: derivedX, y: derivedY });
        }
      }
    }
  }

  walkTiles(tiles, 0, 0);

  return expandedTiles;
}
