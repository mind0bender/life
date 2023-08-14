import P5 from "p5";
import Cell from "./cell";

export default class World {
  private grid: Cell[][] = [];
  private _p5: P5;
  private cellSize: number;
  constructor(p5: P5, gridI: number, gridJ: number, cellSize: number) {
    this._p5 = p5;
    this.cellSize = cellSize;
    for (let j: number = 0; j < gridJ; j++) {
      const row: Cell[] = [];
      for (let i: number = 0; i < gridI; i++) {
        const cell = new Cell(this._p5, i, j, this.cellSize);
        row.push(cell);
      }
      this.grid.push(row);
    }
  }
  show(): void {
    this._p5.strokeWeight(1);
    this._p5.stroke("#f0f0f0");
    for (const row of this.grid) {
      for (const cell of row) {
        cell.show();
      }
    }
  }
  overWrite(): void {
    for (const row of this.grid) {
      for (const cell of row) {
        cell.overWrite();
      }
    }
  }
  findNeighbours(): void {
    for (let j: number = 0; j < this.grid.length; j++) {
      const row: Cell[] = this.grid[j];
      for (let i: number = 0; i < row.length; i++) {
        const cell: Cell = row[i];
        for (let dj: number = -1; dj <= 1; dj++) {
          if (this.grid[j + dj]) {
            for (let di: number = -1; di <= 1; di++) {
              const neighbour: Cell | undefined = this.grid[j + dj][i + di];
              if (neighbour && neighbour !== cell) {
                cell.addNeighbor(neighbour);
              }
            }
          }
        }
      }
    }
  }
  next(): void {
    for (let j: number = 0; j < this.grid.length; j++) {
      const row: Cell[] = this.grid[j];
      for (let i: number = 0; i < row.length; i++) {
        const cell: Cell = row[i];
        cell.next();
      }
    }
  }
  mousePressed(): void {
    const j: number = Math.floor(this._p5.mouseY / this.cellSize);
    const i: number = Math.floor(this._p5.mouseX / this.cellSize);
    const cell: Cell = this.grid[j][i];
    if (cell) {
      cell.switch();
    }
  }
}
