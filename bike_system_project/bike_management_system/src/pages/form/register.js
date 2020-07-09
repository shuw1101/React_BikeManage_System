import React from 'react'
import {Card,Form,Button,Input,Checkbox,Radio,Select,Switch,DatePicker,TimePicker,Upload,Icon,message, InputNumber} from 'antd'
import moment from 'moment';
import {PlusOutlined} from '@ant-design/icons';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class FormRegister extends React.Component{

    state={}


    handleSubmit = values=>{
        let userInfo = values;
        message.success(`${userInfo.userName} welcome to join in React study, your password is：${userInfo.password}`)
    }

    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }

    render(){
       
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }
        return (
            <div style={{width:'100%'}}>
                <Card title="注册表单">
                    <Form layout="horizontal" onFinish={this. handleSubmit}>
                        <FormItem 

                        name="username"
                        label = "Username"
                        rules={[
                            {
                                required:true,
                                message:'用户名不能为空'
                            },
                            {
                                min:5,max:10,
                                message:'长度不在范围内'
                            },
                            {
                                pattern:new RegExp('^\\w+$','g'),
                                message:'用户名必须为字母或者数字'
                            }
                        ]}
                         {...formItemLayout} >
                        <Input placeholder="请输入用户名" />


                        </FormItem>
                        <FormItem 
                            name="password"
                            label = "Password"
                            rules={[]}
                            {...formItemLayout} 
                        >
                        <Input type="password" placeholder="请输入密码" />                   
                        </FormItem>

                        <FormItem 
                        
                        name="gender"
                        label = "Gender"
                        rules={[]}
                        initialValue='1'
                        {...formItemLayout} 
                        
                        >
                        <RadioGroup>
                            <Radio value="1">男</Radio>
                            <Radio value="2">女</Radio>
                        </RadioGroup>
                        </FormItem>

                        <FormItem 
                            name="age"
                            label = "Age"
                            rules={[]}
                            initialValue='18'
                            {...formItemLayout} 
                        >
                            <InputNumber  />
                        </FormItem>

                        <FormItem 
                            name="status"
                            label = "Status"
                            rules={[]}
                            initialValue='2'
                            {...formItemLayout} 
                        >
                            <Select>
                                <Option value="1">SJTU</Option>
                                <Option value="2">React</Option>
                                <Option value="3">spring boot</Option>
                                <Option value="4">Java</Option>
                                <Option value="5">Data Structure</Option>
                            </Select>
                        </FormItem>


                        <FormItem 
                            name="interest"
                            label = "Interest"
                            rules={[]}
                            initialValue={['2','5']}
                            {...formItemLayout} 
                        >
                            <Select mode="multiple">
                                <Option value="1">游泳</Option>
                                <Option value="2">打篮球</Option>
                                <Option value="3">踢足球</Option>
                                <Option value="4">跑步</Option>
                                <Option value="5">爬山</Option>
                                <Option value="6">骑行</Option>
                                <Option value="7">桌球</Option>
                                <Option value="8">麦霸</Option>
                            </Select>
                        </FormItem>

                        <FormItem 
                            name="ismarried"
                            label = "IsMarried"
                            rules={[]}
                            initialValue={true}
                            {...formItemLayout} 
                        >
                            <Switch/>
                        </FormItem>

                        <FormItem 
                            name="birthday"
                            label = "Birthday"
                            rules={[]}
                            initialValue={moment('2018-08-08')}
                            {...formItemLayout} 
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </FormItem>

                        <FormItem 
                            name="address"
                            label = "Address"
                            rules={[]}
                            initialValue='Dongchuan Road 800'
                            {...formItemLayout} 
                        >
                            <TextArea
                                autosize={rowObject}
                            />
                        </FormItem>

                        <FormItem 
                            name="time"
                            label = "Time"
                            rules={[]}
                            {...formItemLayout} 
                        >
                        <TimePicker/>
                        </FormItem>

                        <FormItem 
                            name="userImg"
                            label = "UserImg"
                            rules={[]}
                            {...formItemLayout} 
                        >
                            <Upload
                                listType="picture-card"
                                showUploadList={false}
                                action="//jsonplaceholder.typicode.com/posts/"
                                onChange={this.handleChange}
                            >
                            {this.state.userImg?<img src={this.state.userImg}/>:<PlusOutlined/>}
                            </Upload>
                        </FormItem>

                        <FormItem 
                            {...offsetLayout}
                        >
                            <Checkbox>我已阅读过<a href="#">React协议</a></Checkbox>
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default FormRegister;