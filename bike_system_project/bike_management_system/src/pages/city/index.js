import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component{

    state = {
        list:[],
        isShowOpenCity:false
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.requestList();
    }

   
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list:list,
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    
    handleOpenCity = ()=>{
        this.setState({
            isShowOpenCity:true
        })
    }
   
    handleSubmit = values=>{
        let cityInfo = values;
        // console.log(cityInfo);
        axios.ajax({
            url:'/city/open',
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            if(res.code == '0'){
                message.success('开通成功');
                this.setState({
                    isShowOpenCity:false
                })
                this.requestList();
            }
        })
    }
    render(){
        const columns = [
            {
                title:'City ID',
                dataIndex:'id'
            }, {
                title: 'City Name',
                dataIndex: 'name'
            }, {
                title: 'Bike Modal',
                dataIndex: 'mode',
                render(mode){
                    return mode ==1 ?'Part Lot':'invlid Lot';
                }
            }, {
                title: 'Operation mode',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? 'Office' : 'Client';
                }
            }, {
                title: 'franchisee',
                dataIndex: 'franchisee_name'
            }, {
                title: 'City Admin',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: 'City Open Time',
                dataIndex: 'open_time'
            }, {
                title: 'Last Update Time',
                dataIndex: 'update_time',
                render: Utils.formateDate
            }, {
                title: 'Operator',
                dataIndex: 'sys_user_name'
            }
        ]
        return (
            <div style={{width:'100%'}}>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>Open City</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal 
                    title="Open City"
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
                </Modal>
            </div>
        );
    }
}

class FilterForm extends React.Component{

    render(){
        return (
            <Form layout="inline">
                <FormItem label="City" name="city_id">
                    {
                        (
                            <Select
                                style={{width:100}}
                                placeholder="All"
                            >
                                <Option value="">All</Option>
                                <Option value="1">Beijing</Option>
                                <Option value="2">Tianjin</Option>
                                <Option value="3">Shenzhen</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="mode" name="mode">
                    {
                       (
                            <Select
                                style={{ width: 120 }}
                                placeholder="All"
                            >
                                <Option value="">All</Option>
                                <Option value="1">valid</Option>
                                <Option value="2">invalid</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Operation mode"
                name="op_mode"
                >
                    {
                        (
                            <Select
                                style={{ width: 80 }}
                                placeholder="All"
                            >
                                <Option value="">All</Option>
                                <Option value="1">Self</Option>
                                <Option value="2">Client</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Client Authentication Status"
                name='auth_status'
                
                >
                    {
                     (
                            <Select
                                style={{ width: 100 }}
                                placeholder="All"
                            >
                                <Option value="">All</Option>
                                <Option value="1">valid</Option>
                                <Option value="2">invalid</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>Search</Button>
                    <Button>Reset</Button>
                </FormItem>
            </Form>
        );
    }
}

class OpenCityForm extends React.Component{
    render(){
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        
        return (
            <Form layout="horizontal">
                <FormItem 
                initialValue='1'
                label="Select City" {...formItemLayout}
                
                >
                <Select style={{ width: 100 }}>
                    <Option value="">All</Option>
                    <Option value="1">Beijing</Option>
                    <Option value="2">Tianjin</Option>
                </Select>
                </FormItem>
                <FormItem label="operation mode" {...formItemLayout}
                name="op_mode" initialValue='1'
                
                >
                    {
                        (
                            <Select style={{ width: 100 }}>
                                <Option value="1">Self</Option>
                                <Option value="2">Client</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Bike Mode" {...formItemLayout}
                initialValue= '1'
                
                >
                    {
                    <Select style={{ width: 100 }}>
                        <Option value="1">valid lot</Option>
                        <Option value="2">invalid lot</Option>
                    </Select>
                
                    }
                </FormItem>
            </Form>
        );
    }
}
