import { ascending, scale, quantile, mean, format, min, median, max, deviation } from 'd3';

export default function drawBoxPlot(
    svg,
    results,
    height,
    width,
    domain,
    boxPlotWidth,
    boxColor,
    boxInsideColor,
    fmt,
    horizontal
) {
    //set default orientation to "horizontal"
    var horizontal = horizontal == undefined ? true : horizontal;

    //make the results numeric and sort
    var results = results
        .map(function(d) {
            return +d;
        })
        .sort(ascending);

    //set up scales
    var y = scale.linear().range([height, 0]);

    var x = scale.linear().range([0, width]);

    if (horizontal) {
        y.domain(domain);
    } else {
        x.domain(domain);
    }

    var probs = [0.05, 0.25, 0.5, 0.75, 0.95];
    for (var i = 0; i < probs.length; i++) {
        probs[i] = quantile(results, probs[i]);
    }

    var boxplot = svg
        .append('g')
        .attr('class', 'boxplot')
        .datum({ values: results, probs: probs });

    //set bar width variable
    var left = horizontal ? 0.5 - boxPlotWidth / 2 : null;
    var right = horizontal ? 0.5 + boxPlotWidth / 2 : null;
    var top = horizontal ? null : 0.5 - boxPlotWidth / 2;
    var bottom = horizontal ? null : 0.5 + boxPlotWidth / 2;

    //draw rectangle from q1 to q3
    var box_x = horizontal ? x(0.5 - boxPlotWidth / 2) : x(probs[1]);
    var box_width = horizontal
        ? x(0.5 + boxPlotWidth / 2) - x(0.5 - boxPlotWidth / 2)
        : x(probs[3]) - x(probs[1]);
    var box_y = horizontal ? y(probs[3]) : y(0.5 + boxPlotWidth / 2);
    var box_height = horizontal
        ? -y(probs[3]) + y(probs[1])
        : y(0.5 - boxPlotWidth / 2) - y(0.5 + boxPlotWidth / 2);

    boxplot
        .append('rect')
        .attr('class', 'boxplot fill')
        .attr('x', box_x)
        .attr('width', box_width)
        .attr('y', box_y)
        .attr('height', box_height)
        .style('fill', boxColor);

    //draw dividing lines at median, 95% and 5%
    var iS = [0, 2, 4];
    var iSclass = ['', 'median', ''];
    var iSColor = [boxColor, boxInsideColor, boxColor];
    for (var i = 0; i < iS.length; i++) {
        boxplot
            .append('line')
            .attr('class', 'boxplot ' + iSclass[i])
            .attr('x1', horizontal ? x(0.5 - boxPlotWidth / 2) : x(probs[iS[i]]))
            .attr('x2', horizontal ? x(0.5 + boxPlotWidth / 2) : x(probs[iS[i]]))
            .attr('y1', horizontal ? y(probs[iS[i]]) : y(0.5 - boxPlotWidth / 2))
            .attr('y2', horizontal ? y(probs[iS[i]]) : y(0.5 + boxPlotWidth / 2))
            .style('fill', iSColor[i])
            .style('stroke', iSColor[i]);
    }

    //draw lines from 5% to 25% and from 75% to 95%
    var iS = [[0, 1], [3, 4]];
    for (var i = 0; i < iS.length; i++) {
        boxplot
            .append('line')
            .attr('class', 'boxplot')
            .attr('x1', horizontal ? x(0.5) : x(probs[iS[i][0]]))
            .attr('x2', horizontal ? x(0.5) : x(probs[iS[i][1]]))
            .attr('y1', horizontal ? y(probs[iS[i][0]]) : y(0.5))
            .attr('y2', horizontal ? y(probs[iS[i][1]]) : y(0.5))
            .style('stroke', boxColor);
    }

    boxplot
        .append('circle')
        .attr('class', 'boxplot mean')
        .attr('cx', horizontal ? x(0.5) : x(mean(results)))
        .attr('cy', horizontal ? y(mean(results)) : y(0.5))
        .attr('r', horizontal ? x(boxPlotWidth / 3) : y(1 - boxPlotWidth / 3))
        .style('fill', boxInsideColor)
        .style('stroke', boxColor);

    boxplot
        .append('circle')
        .attr('class', 'boxplot mean')
        .attr('cx', horizontal ? x(0.5) : x(mean(results)))
        .attr('cy', horizontal ? y(mean(results)) : y(0.5))
        .attr('r', horizontal ? x(boxPlotWidth / 6) : y(1 - boxPlotWidth / 6))
        .style('fill', boxColor)
        .style('stroke', 'None');

    var formatx = fmt ? format(fmt) : format('.2f');

    boxplot
        .selectAll('.boxplot')
        .append('title')
        .text(function(d) {
            return (
                'N = ' +
                d.values.length +
                '\n' +
                'Min = ' +
                min(d.values) +
                '\n' +
                '5th % = ' +
                formatx(quantile(d.values, 0.05)) +
                '\n' +
                'Q1 = ' +
                formatx(quantile(d.values, 0.25)) +
                '\n' +
                'Median = ' +
                formatx(median(d.values)) +
                '\n' +
                'Q3 = ' +
                formatx(quantile(d.values, 0.75)) +
                '\n' +
                '95th % = ' +
                formatx(quantile(d.values, 0.95)) +
                '\n' +
                'Max = ' +
                max(d.values) +
                '\n' +
                'Mean = ' +
                formatx(mean(d.values)) +
                '\n' +
                'StDev = ' +
                formatx(deviation(d.values))
            );
        });
}
