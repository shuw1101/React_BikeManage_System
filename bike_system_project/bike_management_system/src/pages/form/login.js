import React from "react";

import { Card, Form, Input, Button, message, Select, Icon, Checkbox } from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
const FormItem = Form.Item;
const { Option } = Select;
// const form = Form.useForm;

class Formlogin extends React.Component{

    
    onReset = () => {
        Form.useForm.resetFields();
    };

    // onGenderChange = value => {
    //     switch (value) {
    //       case 'male':
    //         form.setFieldsValue({
    //           note: 'Hi, man!',
    //         });
    //         return;
    
    //       case 'female':
    //         form.setFieldsValue({
    //           note: 'Hi, lady!',
    //         });
    //         return;
    
    //       case 'other':
    //         form.setFieldsValue({
    //           note: 'Hi there!',
    //         });
    //     }
    // };
    onFinish = values => {
        console.log(values);
        message.success(`Hi ${values.username}, welcome to join in React study, your password is: ${values.password}`)
    };
    onFill = () => {
        Form.useForm.setFieldsValue({
          username: 'Hello world!',
          gender: 'female',
        });
    };

    render(){
        return (
            <div style={{width:'100%'}}>
                <Card title="inline form">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="username"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="password" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">Login</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="horizontal form" style={{marginTop:10}}>
                    <Form style={{width:300}} onFinish={this.onFinish}>
                        <FormItem
                        name="username"
                        label = "Username"
                        rules={[
                            {
                                required:true,
                                message:'Username cannot be null'
                            },
                            {
                                min:5,max:10,
                                message:'Username length is not in valid range'
                            },
                            {
                                pattern:new RegExp('^\\w+$','g'),
                                message:'Username must be either letters or digits'
                            }
                        ]}>
                        <Input prefix={<UserOutlined />} placeholder="username" />

                        </FormItem>


                        <FormItem
                        name="password"
                        label = "Password"
                        rules={[
                            {
                                required:true
                            }
                            ]}                       
                        
                        >
                        <Input prefix={<LockOutlined />} placeholder="password" />

                        </FormItem>

                        <FormItem
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                               required: true,
                            },
                        ]}>
                        <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                        >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                        </Select>
                        </FormItem>

                        <FormItem>
                            
                                
                            <Checkbox>remember password</Checkbox>                           
                            <a href="#" style={{float:'right'}}>forget password</a>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" htmlType="submit">Login</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Formlogin;