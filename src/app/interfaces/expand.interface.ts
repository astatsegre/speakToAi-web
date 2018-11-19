export interface IExpand {
  examples: [string[], string, number][];
  inds: number[];
  late: boolean;
  pos: string;
  roundTime: number;
  sense: string;
  word: string;
}

export interface IGuess {
  first: boolean;
  roundTime: number;
  toGuess: string[];
}
