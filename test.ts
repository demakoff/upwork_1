import { AggregationError } from './custom-errors';

type Metric = string;

export type ModelBaseParams = {
  timestamp: string;
  duration: number;
};

export type ModelMetricParams = {
  [K in Metric]: K extends keyof ModelBaseParams ? never : string;
};

export type ModelParams = ModelBaseParams | ModelMetricParams;

export type AggregationParams = {
  "aggregation-metrics": Metric[];
  "aggregation-method": string;
};

export type AggregatedMetrics = Record<`aggregated-${Metric}`, number>

const AVERAGES = ["av", "avg", "avrg", "average", "mean"];

/**
 * @todo Refactor this function according to your best practices.
 * Input should stay the same. Feel free to introduce structure you like.
 * Desired output should be
 * {
 *  aggregated-${aggregation-metrics[0]}: <calculated output here>
 *  aggregated-${aggregation-metrics[1]}: <calculated output here>
 *  ...
 * }
 */

// return type
export function execute(inputs: ModelParams[], params: AggregationParams): AggregatedMetrics {
  
  _validateInputParams(inputs, params);

  const aggregates: AggregatedMetrics = {};

  for (const metricName of params['aggregation-metrics']) {
    aggregates[`aggregated-${metricName}`] = 0;

    for (const input of inputs) {
      if (!(metricName in input)) {
        throw new AggregationError(`aggregation metric ${metricName} not found in input data`);
      }
      aggregates[`aggregated-${metricName}`] += parseFloat(input[metricName]);
    };
  }

  if (AVERAGES.includes(params['aggregation-method'])) {
    for (const metricName in aggregates) {
      aggregates[metricName] /= inputs.length;
    }
  }

  return aggregates;
}

function _validateInputParams(inputs: ModelParams[], params: AggregationParams) {
  if (inputs === undefined) {
    throw new AggregationError("Input data is missing");
  }

  if (!Array.isArray(inputs)) {
    throw new AggregationError("Input data is not an array");
  }

  if (params === undefined) {
    throw new AggregationError("Parameters data is missing");
  }
  
  if (!Array.isArray(params['aggregation-metrics'])) {
    throw new AggregationError("Parameters aggregation metrics data is not an array");
  }

  if (params['aggregation-metrics'].length === 0) {
    throw new AggregationError("Parameters aggregation metrics data array is empty");
  }

  if (typeof params['aggregation-method'] !== 'string') {
    throw new AggregationError("Parameters aggregation method data is invalid");
  }
}
