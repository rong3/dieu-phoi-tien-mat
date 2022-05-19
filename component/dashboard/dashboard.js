import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import ModalFancy from "../../shared/packages/control/modalFancy/index"
import Modal from "../../shared/packages/control/modal/index"
import TaskContainerModal from "../taskManage/taskContainerModal"
import DataGridControl from '../../shared/packages/control/grid/datagrid';
import DynamicLink from "../../component/common/DynamicLink/DynamicLink"

function DashBoardComponent(props) {
    const router = useRouter()
    const changeRoute = (route) => {
        router.replace(route ?? "/")
    }
    const setupModal = (type, data) => {
        settingModal.type = type;
        settingModal.data = data;
        setSettingModal({ ...settingModal })
    }

    const [programData, setProgramData] = useState([
        {
            id: 1,
            name: 'Tạo yêu cầu',
            quantity: 12,
            icon: '/asset/images/icons/plus.svg',
            active: false,
            component: null,
            href: '/document-board'
        },
        {
            id: 2,
            name: 'Yêu cầu đến',
            quantity: 12,
            icon: '/asset/images/icons/mail.svg',
            active: true,
            component: null,
            href: ""
        },
        {
            id: 3,
            name: 'Yêu cầu đi',
            quantity: 12,
            icon: '/asset/images/icons/mail-1.svg',
            active: false,
            component: null,
            href: ""
        },
        {
            id: 4,
            name: 'Yêu cầu nháp',
            quantity: 12,
            icon: '/asset/images/icons/save-draft.svg',
            active: false,
            component: null,
            href: ""
        },
        {
            id: 5,
            name: 'Yêu cầu liên quan',
            quantity: 12,
            icon: '/asset/images/icons/product-documents.svg',
            active: false,
            component: null,
            href: ""
        }
    ])

    const [settingModal, setSettingModal] = useState({
        isOpen: false,
        category: null,
        type: null,
        data: null
    })

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
                <div className='item' onClick={() => {
                    setSettingModal({ ...settingModal, isOpen: true })
                }}>
                    <i class="fas fa-edit text-edit"></i>
                </div>
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
            editable: true,
            renderCell: (cell) => {
                return <>
                    <td>{priorityRender(cell?.row?.priority)}</td>
                    &nbsp;
                    &nbsp;
                    <td onClick={() => {
                        setSettingModal({ ...settingModal, isOpen: true })
                    }}>
                        <p>{cell?.row?.id}</p>
                    </td>
                </>
            }
        },
        {
            field: 'name',
            headerName: "Tên yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: true,
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
            editable: true,
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
            editable: true,
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
            editable: true,
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
                                                <a class="wrapper-content bg-red d-flex align-items-center">
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
                                    <label class="txt" for="">Chủ đề / Loại yêu cầu </label>
                                    <select className='select-custom' defaultValue={"call"} onChange={() => {
                                    }}>
                                        <option value="call">Yêu cầu Tiếp/nộp quỹ</option>
                                        <option value="call2">Lệnh xuất quỹ</option>
                                        <option value="call3">Yêu cầu Hỗ trợ xe</option>
                                        <option value="call4">Phiếu Hỗ trợ xe</option>
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
            {/* {
                <ModalFancy
                    idModal={"popup-detail"}
                    title={modalData.type === 'new' ? "Tạo yêu cầu" : "Cập nhật yêu cầu"}
                    children={
                        <TaskContainerModal id={""} modalData={modalData} />
                    }
                />
            }*/}
            <Modal
                isOpen={settingModal.isOpen}
                showCloseButton={true}
                modalName="role-modal"
                size={"md"}
                showOverlay={true}
                onClose={() => setSettingModal({ ...settingModal, isOpen: false })}
                title={settingModal.type === 'new' ? "Tạo yêu cầu" : "Cập nhật yêu cầu"}
                centered
            >
                <Modal.Body>
                    <TaskContainerModal id={""} modalData={settingModal} />
                </Modal.Body>
            </Modal>
            <a onClick={() => {
                setSettingModal({ ...settingModal, type: 'new', isOpen: true })
            }} class="float" title="Tạo yêu cầu">
                <i class="fa fa-plus my-float"></i>
            </a>
        </>
    );
}

export default DashBoardComponent;