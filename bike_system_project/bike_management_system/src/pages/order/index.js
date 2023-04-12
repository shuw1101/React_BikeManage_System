import React from 'react';
import { Card, Button, Table, Form, Select, Modal, DatePicker, message} from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component{
    state  = {
        orderInfo:{},
        orderConfirmVisble:false
    }
    params = {
        page: 1
    }
    formList = [
        {
            type:'SELECT',
            label:'City',
            field:'city',
            placeholder:'All',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: 'All' }, { id: '1', name: 'Beijing' }, { id: '2', name: 'Tianjin' }, { id: '3', name: 'Shanghai' }]
        },
        {
            type: 'Select time'
        },
        {
            type: 'SELECT',
            label: 'Order status',
            field:'order_status',
            placeholder: 'All',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: 'All' }, { id: '1', name: 'in-progress' }, { id: '2', name: 'completed' }]
        }
    ]
    componentDidMount(){
        this.requestList()
    }

    handleFilter = values=>{
        this.params = values;
        this.requestList();
    }
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url:'/order/list',
            data:{
                params: this.params
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }
    // confirm the order ending
    handleConfirm = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: 'information',
                content: 'Please select an order to end.'
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code ==0 ){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }

    // end the order
    handleFinishOrder = ()=>{
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success('Order is ended.')
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }
    oClick = (record, index) => {
        console.log(record);
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: 'information',
                content: 'Please select an order to end.'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    render(){
        const columns = [
            {
                title:'Order ID',
                dataIndex:'order_sn'
            },
            {
                title: 'Bike ID',
                dataIndex: 'bike_sn'
            },
            {
                title: 'Username',
                dataIndex: 'user_name'
            },
            {
                title: 'Phone number',
                dataIndex: 'mobile'
            },
            {
                title: 'Distance',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: 'Period',
                dataIndex: 'total_time'
            },
            {
                title: 'Status',
                dataIndex: 'status'
            },
            {
                title: 'Starting time',
                dataIndex: 'start_time'
            },
            {
                title: 'Ending time',
                dataIndex: 'end_time'
            },
            {
                title: 'Order Amount',
                dataIndex: 'total_fee'
            },
            {
                title: 'Paid Amount',
                dataIndex: 'user_pay'
            }
        ]
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div style={{width:'100%'}} >
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        // onRow={(record, index) => {
                        //     return {
                        //         onClick: () => {
                        //             this.onRowClick(record, index);
                        //         }
                        //     };
                        // }}
                        onRowClick={
                            (record, index)=>{
                                console.log(JSON.stringify(record));
                                this.oClick(record,index);

                            } 
                           
                        }
                    />
                </div>
                <Modal
                    title="End the Order"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="Bike ID" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="Remaining battery capacity" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="Starting time" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="Current location" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}