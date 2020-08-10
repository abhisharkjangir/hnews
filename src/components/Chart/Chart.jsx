/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from 'recharts';
import PropTypes from 'prop-types';
import styles from './Chart.scss';
// import isServer from '../../utils/isServer';

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}
export class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={5}
          fontSize={12}
          textAnchor="end"
          fill="#666"
          transform="rotate(-90)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

class Chart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    // const width = (!isServer && window && window.innerWidth) - 50 || 500;
    return (
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="97%" height={300}>
          <LineChart
            className={styles.chart}
            width={500}
            height={200}
            data={this.props.data}
            margin={{ top: 15, bottom: 60, left: 15, right: 15 }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis
              dataKey="id"
              tick={<CustomizedAxisTick />}
              interval={0}
              padding={{ left: 10, right: 10 }}
            >
              <Label value="Id" offset={-50} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="points">
              <Label value="Comments / Votes" offset={15} angle="-90" />
            </YAxis>

            <Tooltip />
            <Line type="monotone" dataKey="comments" stroke="blue" />
            <Line type="monotone" dataKey="points" stroke="red" />
            <Label dataKey="id" position="bottom" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.object,
};

export default Chart;
