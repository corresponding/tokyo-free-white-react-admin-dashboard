import React, { PureComponent } from 'react';
import * as eCharts from 'echarts';
import axios from 'axios';
import cookie from 'react-cookies';

export default class Show5 extends PureComponent {
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
      .post('/api/lengthColumn')
      .then((response) => {
        // handle success
        // console.log(response);
        let { data } = response.data;
        console.log(data);

        let option = {
          xAxis: {
            type: 'category',
            data: data.xlist
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },

          series: [
            {
              data: data.series1D,
              type: 'bar'
            }
          ],
          dataZoom: [
            //X轴滑动条
            {
              type: 'slider', //滑动条
              show: true, //开启
              xAxisIndex: [0],
              left: '10%', //滑动条位置
              start: 1, //初始化时，滑动条宽度开始标度
              end: 10 //初始化时，滑动条宽度结束标度
            }, //X轴内置滑动
            {
              type: 'inside', //内置滑动，随鼠标滚轮展示
              xAxisIndex: [0],
              start: 1, //初始化时，滑动条宽度开始标度
              end: 100 //初始化时，滑动条宽度结束标度
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
