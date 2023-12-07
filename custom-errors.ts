export class AggregationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AggregationError';
    }
  }