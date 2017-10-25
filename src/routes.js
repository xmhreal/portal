/**
 * author       : liuliyuan
 * createTime   : 2017/9/7 16:17
 * description  :
 */
import React from 'react'
import { Route,Redirect,Switch } from 'react-router-dom';
import {RouteWithSubRoutes} from './components'
import {Layout} from 'antd'
import Login from './modules/login'
import DashBoard from './modules/dashBoard';
import Sys from './modules/sys'

const PageNotFoundComponent =  ()=><div> 404 </div>;

//路由配置文件
const routes = [
    {
        path:'/login',
        component:Login,
        name:'登录'
    },{
        path:'/dashboard',
        component:DashBoard,
        name:'首页'
    },{
        path: '/sys',
        component: Sys,
        name: '后台管理',
    },{
        path: '*',
        component: PageNotFoundComponent
    }
];


const MainRoutes = () => (

    <Route render={({location})=>{

        const homeRoute = () => (
            <Redirect to="/login" />
        );
        return(
            <Layout>
                <Route exact strict path="/" render={homeRoute} />
                <Switch>
                    {routes.map((route, index) => (

                        <RouteWithSubRoutes key={index} {...route}/>
                    ))}
                </Switch>

            </Layout>
        )
    }} />

)
export default MainRoutes
