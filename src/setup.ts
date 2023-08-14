import P5, { Element } from "p5";
import World from "./lib/world";

export let world: World;

export default function setup(p5: P5): void {
  const canvasSize: number =
    [innerHeight, innerWidth].sort((a: number, b: number): number => a - b)[0] -
    10;
  p5.frameRate(30);
  p5.createCanvas(canvasSize, canvasSize);

  const cellCountSrqt: number = 125;
  const size: number = canvasSize / cellCountSrqt;
  p5.frameRate(20);
  world = new World(p5, cellCountSrqt, cellCountSrqt, size);
  world.show();
  world.findNeighbours();
}
