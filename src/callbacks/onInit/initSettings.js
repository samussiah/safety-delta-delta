export default function initSettings() {
    //Set initial measures.
    this.config.measure.x = this.config.measure.x || this.sdd_measures[0];

    //  this.config.x.column = this.config.measure.x;
    this.config.measure.y = this.config.measure.y || this.sdd_measures[1];

    //Set timepoint 1 and timepoint 2 visits.
    this.config.visits.timepoint1 =
        this.config.visits.timepoint1.length > 0 ? this.config.visits.timepoint1 : [this.visits[0]];

    this.config.visits.timepoint2 =
        this.config.visits.timepoint2.length > 0
            ? this.config.visits.timepoint2
            : [this.visits[this.visits.length - 1]];
}
