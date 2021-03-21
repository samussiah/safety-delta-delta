export default function rendererSettings() {
    return {
        id_col: 'USUBJID',
        visit_col: 'VISIT',
        visit_order_col: 'VISITNUM',
        measure_col: 'TEST',
        measure_order_col: 'TESTN',
        value_col: 'STRESN',
        filters: null,
        details: null,
        measure: {
            x: null,
            y: null
        },
        visits: {
            timepoint1: [],
            timepoint2: [],
            stat: 'mean'
        },
        add_regression_line: true
    };
}
