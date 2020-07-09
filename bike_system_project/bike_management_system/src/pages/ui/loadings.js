import React from 'react';
import { Card, Button, Spin, Icon, Alert} from  'antd';
import {PlusOutlined} from '@ant-design/icons';
import './ui.less';

export default class Loadings extends React.Component{

    render(){
        const icon = <PlusOutlined  style={{fontSize:24}} spin/>
        const iconLoading = <PlusOutlined type="loading" style={{ fontSize: 24 }} spin/>
        return (
            <div style={{width:'100%'}}>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{ marginLeft: 10 }} spinning={true}/>
                </Card>
                <Card title="内容遮罩,将整个弹框显示loading" className="card-wrap">
                    <Alert
                        message="React"
                        description="学习react loading 图标"
                        type="info"
                        style={{ marginBottom: 10 }}
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="一起学习React"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="一起学习React"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin indicator={iconLoading}>
                        <Alert
                            message="React"
                            description="一起学习React"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}