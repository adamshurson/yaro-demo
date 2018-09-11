import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Spending extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.options = {
            chart: {
                type: 'line'
            },
            title: {
                text: 'My Health Spending'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                title: {
                    text: 'Spent ($)'
                },
                min: 0
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.x:%e. %b}: ${point.y:.2f}'
            },
            colors: ['#6CF', '#39F', '#06C', '#036', '#000']
        };
    }
    calculateCost(visit) {
        let sum = 0.00;
        visit.procedures.map(proc => {
            sum += proc.cost;
        });
        return sum;
    }
    digestVisits(options) {
        const series = {};
        this.props.visits.map((visit) => {
            const date = new Date(visit.date);
            const time = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
            if (series[time] === undefined) {
                series[time] = [time, 0.00];
            }
            series[time][1] += this.calculateCost(visit);
        });
        options.series = [{
            data: []
        }];
        Object.keys(series).map((key) => {
            options.series[0].data.push(series[key]);
        });
        options.series[0].data.sort(function(a, b) {
            if (a[0] < b[0])
                return -1;
            if (a[0] > b[0])
                return 1;
            return 0;
        });
        return options;
    }
    render() {
        return <HighchartsReact
            highcharts={Highcharts}
            options={this.digestVisits(this.options)}
        />
    }
}
export default Spending;