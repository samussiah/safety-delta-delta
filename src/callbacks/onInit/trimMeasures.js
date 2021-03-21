export default function trimMeasures() {
    this.initial_data.forEach(d => {
        d[this.config.measure_col] = d[this.config.measure_col].trim();

        //Concatenate unit to measure if provided.
        d.sdd_measure = d.hasOwnProperty(this.config.unit_col)
            ? `${d[this.config.measure_col]} (${d[this.config.unit_col]})`
            : d[this.config.measure_col];
    });
}
