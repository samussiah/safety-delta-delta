export default function updateControlInputs() {
    const x_control = this.controls.config.inputs.find(input => input.option === 'measure.x');
    x_control.values = this.measures;
    x_control.start = this.config.measure.x;

    const y_control = this.controls.config.inputs.find(input => input.option === 'measure.y');
    y_control.values = this.measures;
    y_control.start = this.config.measure.y;

    const timepoint1_control = this.controls.config.inputs.find(
        input => input.option === 'visits.timepoint1'
    );
    timepoint1_control.values = this.visits;
    timepoint1_control.start = this.config.visits.timepoint1;

    const timepoint2_control = this.controls.config.inputs.find(
        input => input.option === 'visits.timepoint2'
    );
    timepoint2_control.values = this.visits;
    timepoint2_control.start = this.config.visits.comprarison;
}
