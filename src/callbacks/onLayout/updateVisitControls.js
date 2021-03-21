export default function updateVisitControls() {
    const config = this.config;
    const timepoint1Select = this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'visits.timepoint1')
        .select('select');
    timepoint1Select
        .selectAll('option')
        .filter(f => this.config.visits.timepoint1.indexOf(f) > -1)
        .attr('selected', 'selected');

    const timepoint2Select = this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'visits.timepoint2')
        .select('select');
    timepoint2Select
        .selectAll('option')
          .filter(f => this.config.visits.timepoint2.indexOf(f) > -1)
        .attr('selected', 'selected');
}
