/**
 * author       : liuliyuan
 * createTime   : 2017/10/17 15:08
 * description  :
 */
import React,{Component} from 'react';
import {Modal,Form,Input,message,Row,Col} from 'antd';
import {request} from '../../../utils';

const FormItem = Form.Item;

class EditAddModel extends Component{
    state = {
        submitLoading:false,
        modelClassModalKey:Date.now(),
    }

    static defaultProps={
        modalType:'create'
    }

    handleOk = (e) => {
        this.handleSubmit()
    }
    handleCancel = (e) => {
        this.props.changeVisable(false);
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                //console.log('Received values of form: ', values);

                this.mounted && this.setState({
                    submitLoading:true
                })

                if(this.props.modalType === 'create') {

                    request.post('/userManage/saveUserInfo', {...values})
                        .then(({data}) => {
                            if (data.code === 200) {
                                message.success('新增成功！', 4)
                                //新增成功，关闭当前窗口,刷新父级组件
                                this.props.changeVisable(false);
                                this.props.refreshCurdTable();
                            } else {
                                message.error(data.msg, 4)
                            }
                        })
                        .catch(err => {
                            message.error(err.message)
                            this.mounted && this.setState({
                                submitLoading: false
                            })
                        })
                }

                if(this.props.modalType === 'edit'){

                    request.post('/userManage/modifyUserInfo', {...values})
                        .then(({data}) => {
                            if (data.code === 200) {
                                message.success('编辑成功！', 4);

                                //编辑成功，关闭当前窗口,刷新父级组件
                                this.props.changeVisable(false);
                                this.props.refreshCurdTable();

                            } else {
                                message.error(data.msg, 4)
                            }
                        })
                        .catch(err => {
                            message.error(err.message)
                            this.mounted && this.setState({
                                submitLoading: false
                            })
                        })
                }
            }
        });
    }

    componentDidMount() {

    }

    mounted = true;
    componentWillUnmount(){
        this.mounted = null;
    }

    componentWillReceiveProps(nextProps){

        //console.log(nextProps)
        if(nextProps.selectedKeys !== this.props.selectedKeys){

        }


    }

    render() {
        const {modalType} = this.props;
        const defaultValueDate = {...this.props.defaultValueDate};
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
        };
        return (
            <Modal
                key={this.state.modelClassModalKey}
                title={modalType ==='create' ? '新增' : '编辑' }
                visible={this.props.visible}
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width="800px"
            >
                <Form onSubmit={this.handleSubmit} className="form-item-required">
                    <Row gutter={24} style={{textAlign:'center',marginBottom: 14,marginTop:10}}>
                        <Col span={3}>

                        </Col>
                        <Col span={7}>
                            平台账号
                        </Col>
                        <Col span={7}>
                            单点登录key
                        </Col>
                        <Col span={7}>
                            企业号
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={3} style={{textAlign:'right',lineHeight:'32px'}}>
                            <label>供应商门户</label>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="&nbsp;"
                            >
                                {getFieldDecorator('sysUserWebParam.userName', {
                                    initialValue: defaultValueDate.gysUserName || '',
                                    rules: [
                                        {
                                            required: true, message: '请输入名称供应门户账号',
                                        },{
                                            pattern: /^[^ ]+$/, message: '不能包含空格'
                                        }
                                    ],
                                })(
                                    <Input disabled={modalType ==='edit'} placeholder="请输入名称供应门户账号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}  style={{textAlign:'center'}}>
                            —
                        </Col>
                        <Col span={7}  style={{textAlign:'center'}}>
                            —
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={3} style={{textAlign:'right',lineHeight:'32px'}}>
                            <label>喜盈佳</label>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="&nbsp;"
                            >
                                {getFieldDecorator('sysXYJUserWebParam.name', {
                                    initialValue: defaultValueDate.xyjUserName || '',
                                    rules: [
                                        {
                                            required: true, message: '请输入喜盈佳账号',
                                        },{
                                            pattern: /^[^ ]+$/, message: '不能包含空格'
                                        }
                                    ],
                                })(
                                    <Input disabled={modalType ==='edit'} placeholder="请输入喜盈佳账号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="&nbsp;"
                            >
                                {getFieldDecorator('sysXYJUserWebParam.tokenKey', {
                                    initialValue: defaultValueDate.xyjTokenKey || '',
                                    rules: [
                                        {
                                            required: true, message: '请输入喜盈佳单点登录key',
                                        },{
                                            pattern: /^[^ ]+$/, message: '不能包含空格'
                                        }
                                    ],
                                })(
                                    <Input placeholder="请输入喜盈佳单点登录key" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}  style={{textAlign:'center'}}>
                            —
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={3} style={{textAlign:'right',lineHeight:'32px'}}>
                            <label>供应链金融</label>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="&nbsp;"
                            >
                                {getFieldDecorator('sysGYLUserWebParam.phone', {
                                    initialValue: defaultValueDate.gylUserName || '',
                                    rules: [
                                        {
                                            required: true, message: '请输入供应链金融平台账号',
                                        },{
                                            pattern: /^[^ ]+$/, message: '不能包含空格'
                                        }
                                    ],
                                })(
                                    <Input disabled={modalType ==='edit'} placeholder="请输入供应链金融平台账号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="&nbsp;"
                            >
                                {getFieldDecorator('sysGYLUserWebParam.accessToken', {
                                    initialValue: defaultValueDate.gylTokenKey || '',
                                    rules: [
                                        {
                                            required: true, message: '请输入供应链金融单点登录Key',
                                        },{
                                            pattern:/^[^ ]+$/,message:'不能包含空格'
                                        }
                                    ],
                                })(
                                    <Input placeholder="请输入供应链金融单点登录Key" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}  style={{textAlign:'center'}}>
                            —
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={3} style={{textAlign:'right',lineHeight:'32px'}}>
                            <label>票易通</label>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="&nbsp;"
                            >
                                {getFieldDecorator('sysPYTUserWebParam.phone', {
                                    initialValue: defaultValueDate.pytUserName || '',
                                    rules: [
                                        {
                                            required: true, message: '请输入票易通平台账号',
                                        },{
                                            pattern: /^[^ ]+$/, message: '不能包含空格'
                                        }
                                    ],
                                })(
                                    <Input disabled={modalType ==='edit'} placeholder="请输入票易通平台账号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="&nbsp;"
                            >
                                {getFieldDecorator('sysPYTUserWebParam.tokenKey', {
                                    initialValue: defaultValueDate.pytTokenKey || '',
                                    rules: [
                                        {
                                            required: true, message: '请输入票易通单点登录key',
                                        },{
                                            pattern: /^[^ ]+$/, message: '不能包含空格'
                                        }
                                    ],
                                })(
                                    <Input placeholder="请输入票易通单点登录key" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="&nbsp;"
                            >
                                {getFieldDecorator('sysPYTUserWebParam.companyNo', {
                                    initialValue: defaultValueDate.pytCompanyNo || '',
                                    rules: [
                                        {
                                            required: true, message: '请输入票易通企业号',
                                        },{
                                            pattern: /^[^ ]+$/, message: '不能包含空格'
                                        }
                                    ],
                                })(
                                    <Input placeholder="请输入票易通企业号" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>

            </Modal>
        );
    }
}

export default Form.create()(EditAddModel)