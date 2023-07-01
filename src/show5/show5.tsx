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
          series: [
            {
              data: data.series1D,
              type: 'bar',
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示数值
                    position: 'top', //数值在上方显示
                    textStyle: {
                      //数值样式
                      color: '#D3D3D3', //字体颜色
                      fontSize: 14 //字体大小
                    }
                  }
                }
              }
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
              end: 50 //初始化时，滑动条宽度结束标度
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
