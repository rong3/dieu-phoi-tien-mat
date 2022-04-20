import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DataGridControl from '../../../../shared/packages/control/grid/datagrid';
import Modal from "../../../../shared/packages/control/modal/index";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function FundComponent(props) {
    const router = useRouter();
    //modal
    const [modalCustom, setModalCustom] = useState({
        isOpen: false,
        data: null,
        type: null
    })
    const resetModal = () => {
        setModalCustom({ ...modalCustom, isOpen: false, data: null, type: null })
    }

    //end modal

    const fakeData = [
        {
            id: 1,
            name: 'test'
        },
        {
            id: 2,
            name: 'test2'
        }
    ]
    const renderActionGrid = (params) => {
        return (
            <div className="box-action-container">
                <div className='item'>
                    <i class="fas fa-check text-success"> Duyệt</i>
                </div>
                <div className='item'>
                    <i class="fas fa-ban text-danger"> Từ chối</i>
                </div>
            </div>
        )
    }

    const columns = [
        {
            field: 'id',
            headerName: "Mã yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: true,
        },
        {
            field: 'name',
            headerName: "Tên yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: true,
        },
        {
            field: 'statusCode',
            headerName: "Trạng thái",
            headerClassName: 'headerColumn',
            headerAlign: 'center',
            flex: 1,
            editable: true,
            renderCell: (cell) => {
                return <div className="box-action-container">
                    <div className='item text-success'>
                        Đã duyệt
                    </div>
                </div>
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            headerClassName: 'headerColumn',
            headerAlign: 'center',
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (cell) => {
                return renderActionGrid(cell)
            }
        },
    ];

    return (
        <div className="right-box col-12 col-lg-9 col-xl-9">
            <div className="info-box">
                <p className="name row">
                    <div className='col-md-6'>
                        Tiếp/nộp quỹ
                    </div>
                    <div className='col-md-6'>
                        <div className='toolbar'>
                            <button className='btn btn-warning' onClick={() => {
                                setModalCustom({ ...modalCustom, isOpen: true })
                            }}>
                                Tạo mới
                            </button>
                        </div>
                    </div>
                </p>
                <hr />
                <div className="description mt-2">
                    <div className='col-md-12'>
                        <div className='wrapper-tab'>
                            <Tabs>
                                <TabList>
                                    <Tab>Danh sách</Tab>
                                    <Tab>Nháp</Tab>
                                </TabList>
                                <TabPanel>
                                    <DataGridControl
                                        rows={fakeData}
                                        columns={columns}
                                        count={fakeData.length}
                                        disableSelectionOnClick
                                    />
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FundComponent;