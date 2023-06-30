import React, { PureComponent } from 'react';
import * as eCharts from 'echarts';
import axios from 'axios';
import cookie from 'react-cookies';

export default class Show4 extends PureComponent {
  eChartsRef: any = React.createRef();

  reqInstance = axios.create({
    headers: {
      token: cookie.load('token')
    }
  });

  componentDidMount() {
    this.timeAnalyze();
  }

  render() {
    return (
      <div
        ref={this.eChartsRef}
        style={{
          width: 1400,
          height: 600,
          marginTop: 50
        }}
      ></div>
    );
  }

  timeAnalyze = () => {
    this.reqInstance
      .post('/api/timeAnalyze')
      .then((response) => {
        // handle success
        // console.log(response);
        let { data } = response.data;
        console.log(data);

        let option = {
          title: {
            text: 'Number of Accessed within an hour',
            subtext: '',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: data.xlist
          },
          yAxis: {
            type: 'value',
            name: 'Count'
          },
          series: [
            {
              data: data.series1D,
              type: 'line'
            }
          ]
        };
        const myChart = eCharts.init(this.eChartsRef.current);
        myChart.clear();
        myChart.setOption(option, true);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
}
