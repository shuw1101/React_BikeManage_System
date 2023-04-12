import React from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme'
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
export default class Line extends React.Component {

    state = {}

    componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme);
    }

    getOption() {
        let option = {
            title: {
                text: 'User Bike Rental Orders Over Time'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursay',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Order Quantity',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }
        return option;
    }

    getOption2() {
        let option = {
            title: {
                text: 'User Bike Rental Orders Over Time'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:['OFO Order Quantity','Mobai Order Quantity']
            },
            xAxis: {
                data: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursay',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFOOrder Quantity',
                    type: 'line',
                    stack: 'Total Amount',
                    data: [
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: '摩拜Order Quantity',
                    type: 'line',
                    stack: 'Total Amount',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                },
            ]
        }
        return option;
    }

    getOption3() {
        let option = {
            title: {
                text: 'User Bike Rental Orders Over Time'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type:'category',
                boundaryGap: false,
                data: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursay',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Order Quantity',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div style={{width:'100%'}}>
                <Card title="Line chart">
                    <ReactEcharts
                        option={this.getOption()}
                        theme="Imooc"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 500
                    }}/>
                </Card>
                <Card title="Line chart2" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption2()}
                        theme="Imooc"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 500
                    }}/>
                </Card>
                <Card title="Line chart1" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption3()}
                        theme="Imooc"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 500
                    }}/>
                </Card>
            </div>
        );
    }
}