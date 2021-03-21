d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    function(data) {
        // Generate randomly ordered set of measures.
        const measures = [...new Set(data.map(d => d.TEST)).values()]
            .sort(() => .5 - Math.random());

        data.forEach(d => {
            d.TESTN = measures.findIndex(measure => measure === d.TEST);
        });

        var instance = safetyDeltaDelta(
            '#container', // element
            {
                filters: [
                    {value_col: 'SITE', label: 'Site ID'},
                    {value_col: 'SEX', label: 'Sex'},
                    {value_col: 'RACE', label: 'Race'},
                    {value_col: 'ARM', label: 'Treatment Group'},
                    {value_col: 'USUBJID', label: 'Participant ID'},
                ],
            } // settings
        );
        instance.init(data);
    }
);
