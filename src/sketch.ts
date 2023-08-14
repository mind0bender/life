import P5 from "p5";
import setup from "./setup";
import draw from "./draw";

function sketch(p5: P5): void {
  p5.setup = function (): void {
    setup(p5);
  };
  p5.draw = function (): void {
    draw(p5);
  };
}

new P5(sketch);
