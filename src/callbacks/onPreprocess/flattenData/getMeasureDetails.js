import { nest, mean } from 'd3';

export default function getMeasureDetails(pt_data) {
    var config = this.config;
    var measure_details = nest()
        .key(d => d[config.measure_col])
        .rollup(function(di) {
            var measure_obj = {};
            measure_obj.key = di[0][config.measure_col];
            measure_obj.spark = 'sparkline placeholder';
            measure_obj.toggle = '+';
            measure_obj.raw = di;
            measure_obj.axisFlag =
                measure_obj.key == config.measure.x
                    ? 'X'
                    : measure_obj.key == config.measure.y
                    ? 'Y'
                    : '';
            measure_obj.raw.forEach(function(dii) {
                dii.timepoint1 = config.visits.timepoint1.indexOf(dii[config.visit_col]) > -1;
                dii.timepoint2 = config.visits.timepoint2.indexOf(dii[config.visit_col]) > -1;
                dii.color = dii.timepoint1 ? 'blue' : dii.timepoint2 ? 'orange' : '#999';
            });

            ['timepoint1', 'timepoint2'].forEach(function(t) {
                measure_obj[t + '_records'] = di.filter(
                    f => config.visits[t].indexOf(f[config.visit_col]) > -1
                );

                measure_obj[t + '_value'] = mean(
                    measure_obj[t + '_records'],
                    d => d[config.value_col]
                );
            });
            measure_obj['delta'] = measure_obj.timepoint2_value - measure_obj.timepoint1_value;
            return measure_obj;
        })
        .entries(pt_data);
    measure_details = measure_details
        .map(m => m.values)
        .sort(function(a, b) {
            if (a.axisFlag == 'X') return -1;
            else if (b.axisFlag == 'X') return 1;
            else if (a.axisFlag == 'Y') return -1;
            else if (b.axisFlag == 'Y') return 1;
            else if (a.key < b.key) return -1;
            else if (b.key > a.key) return 1;
            else return 0;
        });
    return measure_details;
}
