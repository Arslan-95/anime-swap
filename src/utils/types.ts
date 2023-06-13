export enum LOADING_STATUS {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  SUCCESSED = 'SUCCESSED',
  FAILED = 'FAILED',
}

export type QueryParams = {
  [key: string]: string;
};
