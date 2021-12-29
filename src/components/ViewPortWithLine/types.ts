export interface ViewPortData {
  zoom: number;
  top: number;
  left: number;
}

interface Line {}

export interface AlignmentLine {
  horizontal: Line[];
  vertical: Line[];
}

export interface CanvasCenterLine {
  horizontal: Line;
  vertical: Line;
}

export const InitViewPort = {
  zoom: 1,
  top: 0,
  left: 0,
};
