export default function controlInputs() {
    return [
        {
            type: 'dropdown',
            values: [],
            label: 'Timepoint 1',
            //description: 'choose one or more',
            option: 'visits.timepoint1',
            require: true,
            multiple: true
        },
        {
            type: 'dropdown',
            values: [],
            label: 'Timepoint 2',
            //description: 'choose one or more',
            option: 'visits.timepoint2',
            require: true,
            multiple: true
        },
        {
            type: 'dropdown',
            values: [],
            label: 'X Measure',
            option: 'measure.x',
            require: true
        },
        {
            type: 'dropdown',
            values: [],
            label: 'Y Measure',
            option: 'measure.y',
            require: true
        }
    ];
}
