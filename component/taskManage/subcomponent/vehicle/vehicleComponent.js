import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DataGridControl from '../../../../shared/packages/control/grid/datagrid';
import Modal from "../../../../shared/packages/control/modal/index";
import TabControlCustom from "../../../../shared/packages/control/tabcontrol/index"
import VehicleRequiredComponent from "./subComponent/vehicleRequired/vehicleRequiredComponent"

function VehicleComponent(props) {
    const router = useRouter();
    const [tabData, setTabData] = useState([])
    const [addData, setAddData] = useState({
        id: null,
        data: null
    })
    const addTabData = (id) => {
        setAddData({
            ...addData,
            id: id ?? "",
            data: {
                primary: false,
                title: id ?? "Bản nháp",
                key: 'tabPage',
                children: <VehicleRequiredComponent id={id} />
            }
        })
    }
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
            id: 'YC1234567',
            name: 'YC1',
            date: '20/01/2022 13:00',
        },
        {
            id: 'YC1234568',
            name: 'YC2',
            date: '20/01/2022 13:00',
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
            renderCell: (cell) => {
                return <a role={"button"} style={{ color: "#ffc107" }} onClick={() => {
                    addTabData(cell?.id)
                }}>
                    {cell?.id}
                </a>
            }
        },
        {
            field: 'name',
            headerName: "Tên yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: true,
        },
        {
            field: 'date',
            headerName: "Ngày yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: true,
        },
        {
            field: 'statusCode',
            headerName: "Trạng thái",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: true,
            renderCell: (cell) => {
                return <div className="text-success">
                    Đã duyệt
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

    useEffect(() => {
        const data = [
            {
                primary: true,
                title: "",
                key: 'tabPage',
                children: <DataGridControl
                    rows={fakeData}
                    columns={columns}
                    count={fakeData.length}
                    disableSelectionOnClick
                />
            },
        ]
        setTabData([...data]);
    }, [])

    return (
        <>
            <div className="info-box">
                <p className="name row">
                    <div className='col-md-6'>
                        Yêu cầu hỗ trợ xe
                    </div>
                    <div className='col-md-6'>
                        <div className='toolbar'>
                            <button className='btn btn-warning' onClick={() => {
                                addTabData(null)
                            }}>
                                Tạo yêu cầu HTX
                            </button>
                        </div>
                    </div>
                </p>
            </div>
            <hr />
            <div className="description">
                <div className='wrapper-tab'>
                    {
                        tabData.length > 0 &&
                        <TabControlCustom tabData={tabData} onAdd={{
                            func: { ...addData },
                            set: setAddData
                        }} />
                    }
                </div>
            </div>
        </>
    );
}

export default VehicleComponent;