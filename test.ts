type ModelParams = {
    timestamp: string;
    duration: number;
    [key: string]: any;
  };
  
  type AggregationParams = {
    'aggregation-metrics': string[];
    'aggregation-method': string;
  };
  
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
  async function execute(inputs: ModelParams[], params: AggregationParams) {
    if (inputs === undefined) {
      throw new Error('Input data is missing');
    }
  
    if (!Array.isArray(inputs)) {
      throw new Error('Input data is not an array');
    }
  
    const aggregates: Object[] = [];
    for (const metricName of params['aggregation-metrics']) {
      let accumulator = 0;
      inputs.forEach(input => {
        if (!(metricName in input)) {
          throw new Error(
            'aggregation metric ' + metricName + 'not found in input data'
          );
        }
        accumulator += parseFloat(input[`${metricName}`]);
      });
      aggregates.push({name: metricName, value: accumulator});
    }
  
    const denominator = inputs.length;
    const averages = ['av', 'avg', 'avrg', 'average', 'mean'];
  
    return inputs.map((input: ModelParams) => {
      aggregates.forEach(item => {
        const arr = Object.values(item);
        let outValue = arr[1];
        if (averages.includes(params['aggregation-method'])) {
          outValue = outValue / denominator;
        }
  
        input['aggregate-' + arr[0]] = outValue;
      });
      return input;
    });
  }