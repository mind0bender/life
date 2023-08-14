import P5 from "p5";
import { world } from "./setup";

export default function draw(p5: P5): void {
  p5.background("#000");
  world.show();
  world.next();
  world.overWrite();
  p5.noFill();
  p5.stroke("#fff");
  p5.strokeWeight(4);
}
