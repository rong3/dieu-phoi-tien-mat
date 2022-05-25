import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import DataGridControl from '../../shared/packages/control/grid/datagrid';
import DynamicLink from "../../component/common/DynamicLink/DynamicLink"
import { TaskCategory, TypeCategory } from "./common/taskContainer/taskCategory"
import { GetYCTiepNopQuy } from "../../services/dptm/yeucautiepnopquy"
import { GetLXQ } from "../../services/dptm/lenhxuatquy"
import { useDispatch, useSelector } from "react-redux";

function DashBoardComponent(props) {
    const router = useRouter()
    const changeRoute = (route) => {
        router.replace(route ?? "/")
    }
    const [selectedData, setSelectedData] = useState({
        category: TaskCategory.TIEPNOPQUY,
        typeCategory: TypeCategory.YCDEN
    })

    const [componentData, setComponentData] = useState({
        datagrid: []
    })

    const { masterData } = useSelector((state) => state.masterData);

    useEffect(() => {
        selectedData.category = null;
        selectedData.typeCategory = null;
        setSelectedData({ ...selectedData })
        setTimeout(() => {
            selectedData.category = TaskCategory.TIEPNOPQUY;
            selectedData.typeCategory = TypeCategory.YCDEN;
            setSelectedData({ ...selectedData })
        }, 0);
    }, [])

    useEffect(() => {
        if (selectedData.category === TaskCategory.TIEPNOPQUY) {
            GetYCTiepNopQuy().then((res) => {
                console.log({ res });
                componentData.datagrid = res?.data ?? [];
                setComponentData({ ...componentData })
            }).catch((err) => {
                console.log({ err });
            })
        }
        if (selectedData.category === TaskCategory.LENHXUATQUY) {
            GetLXQ().then((res) => {
                console.log({ res });
                componentData.datagrid = res?.data ?? [];
                setComponentData({ ...componentData })
            }).catch((err) => {
                console.log({ err });
            })
        }
        else {
            componentData.datagrid = [];
            setComponentData({ ...componentData })
        }
    }, [selectedData])

    useEffect(() => {
        if (router?.query?.typeCategory) {
            selectedData.typeCategory = router?.query?.typeCategory;
            setSelectedData({ ...selectedData })
        }
    }, [router?.query])

    const [programData, setProgramData] = useState([
        {
            id: 1,
            name: 'Tạo yêu cầu',
            quantity: null,
            icon: '/asset/images/icons/plus.svg',
            active: false,
            typeCategory: TypeCategory.TAOYC,
            component: null,
            classbg: 'bg-blue',
            href: '/document-board'
        },
        {
            id: 2,
            name: 'Yêu cầu đến',
            quantity: 12,
            icon: '/asset/images/icons/mail.svg',
            active: false,
            typeCategory: TypeCategory.YCDEN,
            component: null,
            classbg: 'bg-red',
            href: `/?typeCategory=${TypeCategory.YCDEN}`
        },
        {
            id: 3,
            name: 'Yêu cầu đi',
            quantity: 12,
            icon: '/asset/images/icons/mail-1.svg',
            active: false,
            typeCategory: TypeCategory.YCDI,
            component: null,
            classbg: 'bg-green',
            href: `/?typeCategory=${TypeCategory.YCDI}`
        },
        {
            id: 4,
            name: 'Yêu cầu nháp',
            quantity: 12,
            icon: '/asset/images/icons/save-draft.svg',
            active: false,
            typeCategory: TypeCategory.YCNHAP,
            component: null,
            classbg: '',
            href: `/?typeCategory=${TypeCategory.YCNHAP}`
        },
        {
            id: 5,
            name: 'Yêu cầu liên quan',
            quantity: 12,
            icon: '/asset/images/icons/product-documents.svg',
            active: false,
            typeCategory: TypeCategory.YCLIENQUAN,
            component: null,
            classbg: 'bg-red',
            href: `/?typeCategory=${TypeCategory.YCLIENQUAN}`
        }
    ])

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
        const findPriority = masterData?.find(x => x?.id === value);
        if (findPriority) {
            return <span className="dot" style={{ background: findPriority?.master_attributes ?? "#8ec320" }}>
            </span>
        }
        return null;
    }

    const statusRender = (value) => {
        const findStatus = masterData?.find(x => x?.id === value);
        if (findStatus) {
            return <div class="status" style={{ background: findStatus?.master_attributes ?? "#80c2ff" }}><span>{findStatus?.master_name}</span></div>
        }
        return null;
    }

    const columns = [
        {
            field: 'req_code',
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
                                <p>{cell?.row?.req_code}</p>
                            </td>
                        </a>
                    </DynamicLink>
                </>
            }
        },
        {
            field: 'req_name',
            headerName: "Tên yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <p>{cell?.row?.req_name}</p>
                </td>

            }
        },
        {
            field: 'status',
            headerName: "Trạng thái",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    {statusRender(cell?.row?.statusID)}
                </td>
            }
        },
        {
            field: 'req_date',
            headerName: "Ngày yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <div class="date-time"> <span>{cell?.row?.req_date}</span></div>
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

    const columnsLXQ = [
        {
            field: 'req_code',
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
                                <p>{cell?.row?.req_code}</p>
                            </td>
                        </a>
                    </DynamicLink>
                </>
            }
        },
        {
            field: 'status',
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
            field: 'req_date',
            headerName: "Ngày yêu cầu",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <div class="date-time"> <span>{cell?.row?.req_date}</span></div>
                </td>
            }
        },
        {
            field: 'perfome_date',
            headerName: "Ngày thực hiện",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <div class="date-time"> <span>{cell?.row?.perfome_date}</span></div>
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

    const renderGridByCategory=()=>{
        if(selectedData.category===TaskCategory.TIEPNOPQUY){
            return columns
        }
        if(selectedData.category===TaskCategory.LENHXUATQUY){
            return columnsLXQ
        }
        return columns;
    }

    return (
        <>
            <section class="header-menu">
                <div class="wrapper-container">
                    <div class="tabs-menu">
                        <ul class="tab-list d-flex align-items-center">
                            {
                                programData?.map((item, index) => {
                                    return (
                                        <li onClick={() => {
                                            // selectedData.typeCategory = item.typeCategory;
                                            // setSelectedData({ ...selectedData })
                                        }} class={`${item?.typeCategory === selectedData.typeCategory ? 'active' : ''}`}>
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
                                rows={componentData.datagrid}
                                columns={renderGridByCategory()}
                                count={componentData.datagrid?.length}
                                disableSelectionOnClick
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* <a onClick={() => {
                setSettingModal({ ...settingModal, type: 'new', isOpen: true })
            }} class="float" title="Tạo yêu cầu">
                <i class="fa fa-plus my-float"></i>
            </a> */}
        </>
    );
}

export default DashBoardComponent;