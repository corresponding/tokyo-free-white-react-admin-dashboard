import React, { PureComponent } from 'react';
import * as eCharts from 'echarts';
import axios from 'axios';
import cookie from 'react-cookies';

export default class Show extends PureComponent {
  eChartsRef: any = React.createRef();

  reqInstance = axios.create({
    headers: {
      token: cookie.load('token')
    }
  });

  componentDidMount() {
    // this.mostVisit();
    // this.timeAnalyze()
    this.visitPie();
  }

  render() {
    return (
      <div
        ref={this.eChartsRef}
        style={{
          width: 800,
          height: 600,
          margin: 0
        }}
      ></div>
    );
  }

  mostVisit = () => {
    this.reqInstance
      .post('api/mostVisit')
      .then((response) => {
        // handle success
        // console.log(response);
        let { data } = response.data;
        console.log(data);

        let option = {
          tooltip: {
            position: 'top'
          },
          grid: {
            top: '1%',
            bottom: '20%',
            containLabel: true
          },
          dataZoom: [
            {
              type: 'inside', // 放大和缩小
              orient: 'vertical'
            },
            {
              type: 'inside'
            }
          ],
          xAxis: {
            type: 'category',
            data: data.xlist,
            splitArea: {
              show: true
            },
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            type: 'category',
            axisLabel: {
              interval: 0
            },
            data: data.ylist,
            splitArea: {
              show: true
            }
          },
          visualMap: {
            min: 0,
            max: data.max,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%'
          },
          series: [
            {
              name: 'Punch Card',
              type: 'heatmap',
              data: data.series2D,
              label: {
                show: true
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
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

  mostDestinationProtocol = () => {
    this.reqInstance
      .post('api/mostDestinationProtocol')
      .then((response) => {
        // handle success
        // console.log(response);
        let { data } = response.data;
        console.log(data);

        let option = {
          tooltip: {
            position: 'top'
          },
          grid: {
            top: '1%',
            bottom: '20%',
            containLabel: true
          },
          dataZoom: [
            {
              type: 'inside', // 放大和缩小
              orient: 'vertical'
            },
            {
              type: 'inside'
            }
          ],
          xAxis: {
            type: 'category',
            data: data.xlist,
            splitArea: {
              show: true
            },
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            type: 'category',
            axisLabel: {
              interval: 0
            },
            data: data.ylist,
            splitArea: {
              show: true
            }
          },
          visualMap: {
            min: 0,
            max: data.max,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%'
          },
          series: [
            {
              name: 'Punch Card',
              type: 'heatmap',
              data: data.series2D,
              label: {
                show: true
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
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

  timeAnalyze = () => {
    this.reqInstance
      .post('api/timeAnalyze')
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

  visitPie = () => {
    this.reqInstance
      .post('/api/visitPie')
      .then((response) => {
        // handle success
        // console.log(response);
        let { data } = response.data;
        console.log(data);

        let option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: data.seriesNameValue,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
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
