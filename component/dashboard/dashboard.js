import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import DataGridControl from '../../shared/packages/control/grid/datagrid';
import DynamicLink from "../../component/common/DynamicLink/DynamicLink"
import { TaskCategory } from "./common/taskContainer/taskCategory"

function DashBoardComponent(props) {
    const router = useRouter()
    const changeRoute = (route) => {
        router.replace(route ?? "/")
    }

    const [selectedData, setSelectedData] = useState({
        category: TaskCategory.TIEPNOPQUY
    })

    const [programData, setProgramData] = useState([
        {
            id: 1,
            name: 'Tạo yêu cầu',
            quantity: null,
            icon: '/asset/images/icons/plus.svg',
            active: false,
            component: null,
            classbg: 'bg-blue',
            href: '/document-board'
        },
        {
            id: 2,
            name: 'Yêu cầu đến',
            quantity: 12,
            icon: '/asset/images/icons/mail.svg',
            active: true,
            component: null,
            classbg: 'bg-red',
            href: ""
        },
        {
            id: 3,
            name: 'Yêu cầu đi',
            quantity: 12,
            icon: '/asset/images/icons/mail-1.svg',
            active: false,
            component: null,
            classbg: 'bg-green',
            href: ""
        },
        {
            id: 4,
            name: 'Yêu cầu nháp',
            quantity: 12,
            icon: '/asset/images/icons/save-draft.svg',
            active: false,
            component: null,
            classbg: '',
            href: ""
        },
        {
            id: 5,
            name: 'Yêu cầu liên quan',
            quantity: 12,
            icon: '/asset/images/icons/product-documents.svg',
            active: false,
            component: null,
            classbg: 'bg-red',
            href: ""
        }
    ])

    const fakeData = [
        {
            id: 'YC0000001',
            name: 'Tiếp quỹ A',
            priority: 0,
            status: 'InProgress',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        },
        {
            id: 'YC0000002',
            priority: 1,
            status: 'Done',
            name: 'Tiếp quỹ B',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        }
    ]
    const renderActionGrid = (params) => {
        return (
            <div className="box-action-container">
                <DynamicLink
                    href={`/document-board?id=${params?.id}&category=${selectedData.category}`}
                    as={`/document-board?id=${params?.id}&category=${selectedData.category}`}
                >
                    <div className='item'>
                        <i class="fas fa-edit text-edit"></i>
                    </div>
                </DynamicLink>
            </div>
        )
    }

    const priorityRender = (value) => {
        switch (value) {
            case 0: return <span class="dot green"> </span>;
            case 1: return <span class="dot red"> </span>;
            default: return null;
        }
    }

    const statusRender = (value) => {
        switch (value) {
            case "InProgress": return <div class="status blue-3"> <span>Chờ hoàn tất</span></div>;
            case "Done": return <div class="status orange-2"> <span>Bổ sung hồ sơ</span></div>;
            default: return null;
        }
    }

    const columns = [
        {
            field: 'id',
            headerName: "Mã yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    <td>{priorityRender(cell?.row?.priority)}</td>
                    &nbsp;
                    &nbsp;
                    <DynamicLink
                        href={`/document-board?id=${cell?.row?.id}&category=${selectedData.category}`}
                        as={`/document-board?id=${cell?.row?.id}&category=${selectedData.category}`}
                    >
                        <a>
                            <td>
                                <p>{cell?.row?.id}</p>
                            </td>
                        </a>
                    </DynamicLink>
                </>
            }
        },
        {
            field: 'name',
            headerName: "Tên yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <p>{cell?.row?.name}</p>
                </td>

            }
        },
        {
            field: 'statusCode',
            headerName: "Trạng thái",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    {statusRender(cell?.row?.status)}
                </td>
            }
        },
        {
            field: 'date',
            headerName: "Ngày yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <div class="date-time"> <span>03/04/2022</span></div>
                </td>
            }
        },
        {
            field: 'createdBy',
            headerName: "Người tạo",
            headerAlign: 'left',
            headerClassName: 'headerColumn',
            minWidth: 50,
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    <td>
                        <div class="user-avatar">
                            <img src="/asset/images/icons/avatar.png" alt="" />
                        </div>
                    </td>
                    <td>
                        <p>Nguyễn Văn A</p>
                    </td>
                </>
            }
        },
        {
            field: 'action',
            headerName: 'Thao tác',
            sortable: false,
            headerClassName: 'headerColumn',
            headerAlign: 'center',
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (cell) => {
                return renderActionGrid(cell?.row)
            }
        },
    ];

    return (
        <>
            <section class="header-menu">
                <div class="wrapper-container">
                    <div class="tabs-menu">
                        <ul class="tab-list d-flex align-items-center">
                            {
                                programData?.map((item, index) => {
                                    return (
                                        <li class={`${item?.active ? 'active' : ''}`}>
                                            <DynamicLink href={item?.href} as={item?.href}>
                                                <a class={`wrapper-content ${item?.classbg} d-flex align-items-center`}>
                                                    <div class="icon">
                                                        <img src={item?.icon} alt="" /></div>
                                                    <p class="title-item">
                                                        {item?.name}
                                                        <span>{item?.quantity}</span>
                                                    </p>
                                                    <div class="arrow d-flex align-items-center">
                                                        <em class="material-icons">chevron_right</em>
                                                    </div>
                                                </a>
                                            </DynamicLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </section>
            <section class="section-main">
                <div class="wrapper-container d-flex align-items-start">
                    <div class="wrapper-left">
                        <div class="side-bar">
                            <div class="side-bar_top">
                                <h2 class="side-bar_top__title">Chọn trạng thái</h2>
                                <ul class="side-bar_top__list">
                                    <li class="active"> <a href=""> <em class="material-icons">mail_outline</em><span>Tất cả</span></a></li>
                                    <li> <a href=""> <em class="material-icons">done_all</em><span>Bổ sung hồ sơ</span></a></li>
                                    <li> <a href=""> <em class="material-icons">schedule</em><span>Chưa xử lý</span></a></li>
                                </ul>
                            </div>
                            <div class="side-bar_bottom">
                                <h2 class="side-bar_bottom__title">Mức độ ưu tiên</h2>
                                <ul class="side-bar_bottom__list">
                                    <li><a href=""> <span class="dot green"> </span><span class="txt">Thấp</span></a></li>
                                    <li><a href=""> <span class="dot yellow"> </span><span class="txt">Trung bình</span></a></li>
                                    <li><a href=""> <span class="dot red"> </span><span class="txt">Khẩn cấp</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="wrapper-right">
                        <div class="wrapper-right_header">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="wrapper-right_header--left d-flex align-items-center">
                                    <label class="txt" for="">Chủ đề/Loại yêu cầu </label>
                                    <select className='select-custom' defaultValue={selectedData.category} onChange={(e) => {
                                        selectedData.category = e?.target?.value ?? TaskCategory.TIEPNOPQUY;
                                        setSelectedData({ ...selectedData })
                                    }}>
                                        <option value={TaskCategory.TIEPNOPQUY}>Tiếp/nộp quỹ</option>
                                        <option value={TaskCategory.LENHXUATQUY}>Lệnh xuất quỹ</option>
                                        <option value={TaskCategory.HOTROXE}>Yêu cầu Hỗ trợ xe</option>
                                        <option value={TaskCategory.PHIEUHOTROXE}>Phiếu Hỗ trợ xe</option>
                                    </select>
                                </div>
                                <div class="wrapper-right_header--right wrap-tabs d-flex align-items-center ms-auto">
                                    <div class="wrapper-right_header--right__select d-flex align-items-center">
                                        <div class="panel active" id="year">
                                            <select className='select-custom'>
                                                <option value="hide">Năm</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                            </select>
                                        </div>
                                        <div class="panel" id="mounth">
                                            <select className='select-custom'>
                                                <option value="hide">Tháng</option>
                                                <option value="january">Tháng 1</option>
                                                <option value="february">Tháng 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <ul class="tab-list wrapper-right_header--right__sort">
                                        <li rel="mounth">Tháng </li>
                                        <li class="active" rel="year">Năm </li>
                                    </ul>
                                </div>
                            </div>
                            <form class="wrap-form">
                                <div class="form-group">
                                    <button><img src="/asset/images/icons/search-black.svg" alt="" /></button>
                                    <input class="form-control" type="text" placeholder="Tìm kiếm" />
                                </div>
                            </form>
                        </div>
                        <div class="wrapper-right_body">
                            <DataGridControl
                                rows={fakeData}
                                columns={columns}
                                count={fakeData.length}
                                disableSelectionOnClick
                            />
                        </div>
                    </div>
                </div>
            </section>
            <a onClick={() => {
                setSettingModal({ ...settingModal, type: 'new', isOpen: true })
            }} class="float" title="Tạo yêu cầu">
                <i class="fa fa-plus my-float"></i>
            </a>
        </>
    );
}

export default DashBoardComponent;