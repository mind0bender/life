import P5, { Vector } from "p5";

export default class Cell {
  private _p5: P5;
  private i: number;
  private j: number;
  private size: number;
  isAlive: boolean;
  private nextGenState: boolean = false;
  private neighbors: Set<Cell> = new Set<Cell>();

  constructor(p5: P5, i: number, j: number, size: number) {
    this._p5 = p5;
    this.i = i;
    this.j = j;
    this.size = size;
    this.isAlive = this._p5.random() < 0.15;
  }
  show(): void {
    // this._p5.fill(this.isAlive ? "#fff" : "#000");
    // this._p5.rect(this.i * this.size, this.j * this.size, this.size);

    this._p5.stroke("#fff");
    const aliveNeighs: Cell[] = this.aliveNeighbours();
    const pos: Vector = new Vector(
      this.i * this.size + this.size / 2,
      this.j * this.size + this.size / 2
    );
    if (this.isAlive && aliveNeighs.length <= 1) {
      for (const aliveNeighbour of aliveNeighs) {
        const aliveNeighPos: Vector = new Vector(
          aliveNeighbour.i * aliveNeighbour.size + aliveNeighbour.size / 2,
          aliveNeighbour.j * aliveNeighbour.size + aliveNeighbour.size / 2
        );
        this._p5.line(pos.x, pos.y, aliveNeighPos.x, aliveNeighPos.y);
        this._p5.fill("#000");
        this._p5.circle(aliveNeighPos.x, aliveNeighPos.y, 4);
        this._p5.circle(pos.x, pos.y, 4);
      }
    } else if (this.isAlive) {
      for (const aliveNeighbour of aliveNeighs) {
        const aliveNeighPos: Vector = new Vector(
          aliveNeighbour.i * aliveNeighbour.size + aliveNeighbour.size / 2,
          aliveNeighbour.j * aliveNeighbour.size + aliveNeighbour.size / 2
        );
        this._p5.line(pos.x, pos.y, aliveNeighPos.x, aliveNeighPos.y);
      }
    }
  }
  overWrite(): void {
    this.isAlive = this.nextGenState;
  }
  addNeighbor(neighbour: Cell): void {
    this.neighbors.add(neighbour);
  }
  next(): void {
    const aliveNeighCount: number = this.aliveNeighbours().length;
    if (this.isAlive) {
      if (aliveNeighCount < 2) {
        this.nextGenState = false;
      } else if (aliveNeighCount > 3) {
        this.nextGenState = false;
      }
    } else if (aliveNeighCount === 3) {
      this.nextGenState = true;
    }
  }
  private aliveNeighbours(): Cell[] {
    return Array.from(this.neighbors).filter(
      (neighbor: Cell): boolean => neighbor.isAlive
    );
  }
  switch(): void {
    this.isAlive = !this.isAlive;
    this.nextGenState = this.isAlive;
    this.show();
  }
}
