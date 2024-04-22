import { Entity } from '../Entity';
import { Level } from '../Level';
import { SpriteSheet } from '../SpriteSheet';
import { createBackgroundLayer } from '../layers/background';
import { createSpriteLayer } from '../layers/sprites';
import { loadJSON, loadSpriteSheet } from '../loaders';
import { Matrix } from '../math';
import { LevelSpec, Patterns, Tile, TileName, TileRange, TileType } from '../types';

export function createLevelLoader(entityFactory: Record<string, () => Entity>) {
  return async function loadLevel(name: string) {
    const levelSpec = await loadJSON<LevelSpec>(`/levels/${name}.json`);
    const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet);

    const level = new Level();

    setupCollision(levelSpec, level);
    setupBackgrounds(levelSpec, level, backgroundSprites);
    setupEntities(levelSpec, level, entityFactory);

    return level;
  };
}

function setupEntities(levelSpec: LevelSpec, level: Level, entityFactory: Record<string, () => Entity>) {
  levelSpec.entities.forEach(({ name, pos: [x, y] }) => {
    const entity = entityFactory[name]?.();
    entity.pos.set(x, y);

    level.entities.add(entity);
  });

  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.layers.push(spriteLayer);
}

function setupBackgrounds(levelSpec: LevelSpec, level: Level, backgroundSprites: SpriteSheet) {
  levelSpec.layers.forEach((layer) => {
    const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
    const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
    level.comp.layers.push(backgroundLayer);
  });
}

function setupCollision(levelSpec: LevelSpec, level: Level) {
  const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
    return mergedTiles.concat(layerSpec.tiles);
  }, [] as Tile[]);
  const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
  level.setCollisionGrid(collisionGrid);
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
    yield* expandRange(range);
  }
}

function* expandTiles(tiles: Tile[], patterns: Patterns) {
  function* walkTiles(tiles: Tile[], offsetX: number, offsetY: number): Generator<{ tile: Tile; x: number; y: number }> {
    for (const tile of tiles) {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;

        if (tile.pattern) {
          const { tiles } = patterns[tile.pattern];
          yield* walkTiles(tiles, derivedX, derivedY);
        } else {
          yield { tile, x: derivedX, y: derivedY };
        }
      }
    }
  }

  yield* walkTiles(tiles, 0, 0);
}
