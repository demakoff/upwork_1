export class AggregationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AggregationError';
    }
  }