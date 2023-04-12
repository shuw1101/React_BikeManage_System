import React from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme'
// import echarts from 'echarts'

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
export default class Bar extends React.Component {

    state={}

    componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme);
    }

    getOption(){
        let option = {
            title: {
                text: 'User Bike Rental Orders Over Time'
            },
            tooltip : {
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
                    type: 'bar',
                    data: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursay',
                        'Friday',
                        'Saturday',
                        'Sunday'
                    ]
                }
            ]
        }
        return option;
    }

    getOption2(){
        let option = {
            title: {
                text: 'User Bike Rental Orders Over Time'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data:['OFO','Mobai','Lan']
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
                    name: 'OFO',
                    type: 'bar',
                    data: [
                        2000,
                        3000,
                        5500,
                        7000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: 'Mobai',
                    type: 'bar',
                    data: [
                        1500,
                        3000,
                        4500,
                        6000,
                        8000,
                        10000,
                        15000
                    ]
                },
                {
                    name: 'Lan',
                    type: 'bar',
                    data: [
                        1000,
                        2000,
                        2500,
                        4000,
                        6000,
                        7000,
                        8000
                    ]
                },
            ]
        }
        return option;
    }

    render(){
        return (
            <div style={{width:'100%'}}>
                <Card title="bar chart1">
                    <ReactEcharts option={this.getOption()} theme="Imooc" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>
                <Card title="bar chart2" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>
            </div> 
        );
    }
}