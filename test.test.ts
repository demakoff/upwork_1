import { describe, it } from 'node:test';
import assert from 'node:assert';

import { AggregationParams, ModelParams, execute } from './test.ts';

describe('', () => {
    it('should aggregate metrics', () => {
      const inputs = [{
        timestamp: '',
        duration: 1,
        'metric-one': 10,
        'metric-two': 8,
      },{
        timestamp: '',
        duration: 1,
        'metric-one': 4,
        'metric-two': 10,
      }];
      const params = {
        'aggregation-metrics': ['metric-one', 'metric-two'],
        'aggregation-method': 'av',
      };
      const actualResult = execute(inputs, params);
      const expectedResult = {
        'aggregated-metric-one': 7,
        'aggregated-metric-two': 9,
      }
      assert.deepStrictEqual(actualResult, expectedResult);
    });
})