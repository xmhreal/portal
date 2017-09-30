/**
 * author       : liuliyuan
 * createTime   : 2017/9/28 15:30
 * description  :
 */
import React,{Component} from 'react';
import {Table,Row,Col,Icon,Modal,Card} from 'antd';
import {request} from '../../../utils';
import TreeList from './TreeList'
import EditAddWithClass from './ModelClass'

const confirm = Modal.confirm;

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pagination: {
                showSizeChanger:true,
                showQuickJumper:true,
                current:1,
                pageSize:10,
                showTotal:(total, range) => `总数: ${total} 条`,
            },
            tableLoading: false,
            tableKeyDate: Date.now(),

            selectedRowKeys: [],  // Check here to configure the default column
            loading: false,

            editClassVisible: false,
            defaultValue: {},
            editClassKey:Date.now()+'1',
        };
    }



    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.results = pager.pageSize = pagination.pageSize;
        this.mounted &&  this.setState({
            pagination: pager,
        });
        //设置去掉排序默认设置的值
        let sor = sorter.order ? sorter.order.replace('end', '') : undefined;

        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sor,
            ...this.props.filters.values,

        });
    }

    fetch = (params = {}) => {

        this.mounted && this.setState({ tableLoading: true });
        //根据参数查询融资申请信息
        request.get('/companyType/queryCompanyTypeList',{
            params:{
                results: 10,
                ...params,
            }
        }).then(({data}) => {
            //console.log(data);
            if(data.code===200) {
                const pagination = {...this.state.pagination};
                // Read total count from server
                pagination.total = data.data.total;
                this.mounted && this.setState({
                    data: [...data.data.list],
                    tableLoading: false,
                    pagination,
                });
            }
        });
    }

    //选中多少条数据
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    onSelectChange = (selectedRowKeys) => {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    //弹出框
    showModal = data =>{
        this.setState({
            editClassVisible: true,
            defaultValue:data
        });
    }

    handleDelect = id =>{
        //console.log(id);
    }

    componentDidMount() {
        this.fetch();
    }

    mounted = true;
    componentWillUnmount(){
        this.mounted = null;
    }

    componentWillReceiveProps(nextProps){

        //console.log(nextProps.filters);


        //用来判断如果搜索字段是否有改变，改变了就需要把当前table选中页设置为1
        if(nextProps.filters.lastUpdated !== this.props.filters.lastUpdated){
            const currentPager = { ...this.state.pagination };
            currentPager.current = 1;
            this.mounted &&  this.setState({
                pagination: currentPager,
                tableKeyDate: nextProps.filters.lastUpdated,
            });
            this.mounted &&  this.fetch({
                ...nextProps.filters.values
            })
        }
    }

    render() {

        //跳转到详情页
        const columns = [
            {
                title: '分类代码',
                dataIndex: 'id',
            }, {
                title: '分类名称',
                dataIndex: 'name',
            }, {
                title: '分类来源',
                dataIndex: 'sourceType',
            }, {
                title: '分类关键字',
                dataIndex: 'keywords',
            }, {
                title: '分类描述',
                dataIndex: 'remark',
            }, {
                title: '操作',
                dataIndex: '6',
                className:"textc",
                render: (text, record) => {
                    return(
                        <div>
                            <Icon style={{ fontSize: 16,marginRight:10 }}
                                  onClick={(uuid)=>this.showModal(record)}
                                  type="edit"
                            />

                            <Icon type="delete"
                                  style={{ fontSize: 16, color: 'red' }}
                                  onClick={()=> {
                                      confirm({
                                          title: '提示',
                                          content: '确定要删除吗',
                                          onOk: () => this.handleDelect(record.id),
                                          onCancel() { },
                                      });
                                  }} />
                        </div>
                    )



                },
            }
        ];

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div>
                <Row className="title" style={{marginTop:20}}>
                    <Col span={24}>
                        <h2>供应商基础资料维护查询</h2>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6} className="resultWrap">
                        <Card noHovering>
                            <TreeList />
                        </Card>
                    </Col>
                    <Col span={18}>
                        <div className="resultWrap">
                            <Table columns={columns}
                                   rowSelection={rowSelection}
                                   key={this.state.tableKeyDate}
                                   rowKey={record => record.id}
                                   dataSource={this.state.data}
                                   pagination={this.state.pagination}
                                   loading={this.state.tableLoading}
                                   onChange={this.handleTableChange}
                            />
                        </div>
                    </Col>
                </Row>

                <EditAddWithClass
                    key={this.state.editClassKey}
                    modalType="edit"
                    defaultValue={this.state.defaultValue}
                    changeVisable={ status =>{
                        this.setState({
                            editClassVisible:status,
                            editClassKey:Date.now()
                        })
                    }}
                    fetch={this.fetch.bind(this)}
                    visible={this.state.editClassVisible} />

            </div>
        );
    }
}

export default Result