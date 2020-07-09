import React from 'react';
import { Menu, Icon } from 'antd';
import MenuConfig from './../../config/menuConfig';
import { NavLink } from 'react-router-dom';
import './index.less'
const SubMenu = Menu.SubMenu;

export default class NavLeft extends React.Component{

    handleClick = ({ item, key }) => {
        // if (key == this.state.currentKey) {
        //     return false;
        // }
        // // 事件派发，自动调用reducer，通过reducer保存到store对象中
        // const { dispatch } = this.props;
        // dispatch(switchMenu(item.props.title));

        // this.setState({
        //     currentKey: key
        // });
        // hashHistory.push(key);
    };

    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);

        this.setState({
            menuTreeNode
        })
    }

    renderMenu =(data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }

    render(){
        return (
            <div>             
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Bike System</h1>
               </div>
           
                <Menu
                    onClick={this.handleClick}
                    theme="dark"
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
 
        );
    }
}