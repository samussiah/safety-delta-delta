export default function syncControlInputs(controlInputs, settings) {
    //Add filters to default controls.
    if (Array.isArray(settings.filters) && settings.filters.length > 0) {
        settings.filters.forEach(filter => {
            const filterObj = {
                type: 'subsetter',
                value_col: filter.value_col || filter,
                label: filter.label || filter.value_col || filter,
                start: filter.start || null,
                all: filter.all || true,
            };
            controlInputs.push(filterObj);
        });
    } else delete settings.filters;
    return controlInputs;
}
