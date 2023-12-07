import { describe, it } from 'node:test';
import assert from 'node:assert';

import { AggregationParams, ModelParams, execute } from './test';


describe('Metric aggregator', () => {
    it('should aggregate model metrics based on specified params metrics with "av" method', async () => {
      const inputs: ModelParams[] = [{
        timestamp: '',
        duration: 1,
        'metric-one': '10',
        'metric-two': '8',
        'metric-three': '1',
      },{
        timestamp: '',
        duration: 1,
        'metric-one': '4',
        'metric-two': '10',
        'metric-three': '3',
      }];
      const params: AggregationParams = {
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

    it('should sum model metrics based on specified params metrics with no method', async () => {
      const inputs: ModelParams[] = [{
        timestamp: '',
        duration: 1,
        'metric-one': '10',
        'metric-two': '8',
        'metric-three': '1',
      },{
        timestamp: '',
        duration: 1,
        'metric-one': '4',
        'metric-two': '10',
        'metric-three': '3',
      }];
      const params: AggregationParams = {
        'aggregation-metrics': ['metric-one', 'metric-two'],
        'aggregation-method': '',
      };

      const actualResult = execute(inputs, params);
      const expectedResult = {
        'aggregated-metric-one': 14,
        'aggregated-metric-two': 18,
      }
      assert.deepStrictEqual(actualResult, expectedResult);
    });
})