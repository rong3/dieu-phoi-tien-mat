import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import DataGridControl from '../../shared/packages/control/grid/datagrid';
import DynamicLink from "../../component/common/DynamicLink/DynamicLink"
import { TaskCategory, TypeCategory } from "./common/taskContainer/taskCategory"
import { GetYCTiepNopQuy, GetQuantityTNQ } from "../../services/dptm/yeucautiepnopquy"
import { GetLXQ, GetQuantityLXQ } from "../../services/dptm/lenhxuatquy"
import { GetYCXe, GetQuantityYCX } from "../../services/dptm/yeucauxe"
import { GetPYCHTX, GetQuantityPYCHTX } from "../../services/dptm/phieuychtx"
import { useDispatch, useSelector } from "react-redux";
// import { Category } from "@material-ui/icons";

function DashBoardComponent(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const changeRoute = (route) => {
        router.replace(route ?? "/")
    }

    const [selectedData, setSelectedData] = useState({
        category: TaskCategory.TIEPNOPQUY,
        typeCategory: null,
        req_code: null,
        uutien: null
    })

    const [componentData, setComponentData] = useState({
        datagrid: [],
        uutien: []
    })

    const { masterData } = useSelector((state) => state.masterData);

    // useEffect(() => {
    //     selectedData.category = null;
    //     selectedData.typeCategory = null;
    //     setSelectedData({ ...selectedData })
    //     setTimeout(() => {
    //         selectedData.category = TaskCategory.TIEPNOPQUY;
    //         setSelectedData({ ...selectedData })
    //     }, 0);
    // }, [])

    const getQuantityRender = (data) => {
        const ycden = programData?.find(x => x.id === 2);
        const ycdi = programData?.find(x => x.id === 3);
        const ycnhap = programData?.find(x => x.id === 4);
        const yclq = programData?.find(x => x.id === 5);
        if (ycden) {
            ycden.quantity = data?.quantityIn ?? 0
        }
        if (ycdi) {
            ycdi.quantity = data?.quantityOut ?? 0
        }
        if (ycnhap) {
            ycnhap.quantity = data?.quantityDraft ?? 0
        }
        if (yclq) {
            yclq.quantity = data?.quantityRelate ?? 0
        }
        setProgramData([...programData])
    }

    const commonParam = (data) => {
        return {
            type: data?.typeCategory,
            req_code: data?.req_code ?? null,
            uutien: data?.uutien ?? null
        }
    }

    useEffect(() => {
        if (selectedData.typeCategory) {
            if (selectedData.category === TaskCategory.TIEPNOPQUY) {
                GetQuantityTNQ().then((res) => {
                    const data = res?.data;
                    getQuantityRender(data);
                })

                GetYCTiepNopQuy(commonParam(selectedData)).then((res) => {
                    console.log({ res });
                    componentData.datagrid = res?.data ?? [];
                    setComponentData({ ...componentData })
                }).catch((err) => {
                    console.log({ err });
                })
            }
            if (selectedData.category === TaskCategory.LENHXUATQUY) {
                GetQuantityLXQ().then((res) => {
                    const data = res?.data;
                    getQuantityRender(data);
                })
                GetLXQ(commonParam(selectedData)).then((res) => {
                    console.log({ res });
                    componentData.datagrid = res?.data ?? [];
                    setComponentData({ ...componentData })
                }).catch((err) => {
                    console.log({ err });
                })
            }
            if (selectedData.category === TaskCategory.HOTROXE) {
                GetQuantityYCX().then((res) => {
                    const data = res?.data;
                    getQuantityRender(data);
                })
                GetYCXe(commonParam(selectedData)).then((res) => {
                    console.log({ res });
                    componentData.datagrid = res?.data ?? [];
                    setComponentData({ ...componentData })
                }).catch((err) => {
                    console.log({ err });
                })
            }
            if (selectedData.category === TaskCategory.PHIEUHOTROXE) {
                GetQuantityPYCHTX().then((res) => {
                    const data = res?.data;
                    getQuantityRender(data);
                })

                GetPYCHTX(commonParam(selectedData)).then((res) => {
                    console.log({ res });
                    componentData.datagrid = res?.data ?? [];
                    setComponentData({ ...componentData })
                }).catch((err) => {
                    console.log({ err });
                })
            }
        }
        else {
            componentData.datagrid = [];
            setComponentData({ ...componentData })
        }
    }, [selectedData?.typeCategory,selectedData?.category,selectedData?.req_code,selectedData?.uutien])

    useEffect(() => {
        if (router?.query?.typeCategory) {
            selectedData.typeCategory = router?.query?.typeCategory;
            setSelectedData({ ...selectedData })
        }
        if (router?.query?.category) {
            selectedData.category = router?.query?.category;
            setSelectedData({ ...selectedData })
        }
        if (router?.query?.typeCategory === undefined && router?.query?.category === undefined) {
            selectedData.typeCategory = TypeCategory.YCDEN;
            selectedData.category = TaskCategory.TIEPNOPQUY;
            setSelectedData({ ...selectedData })
        }
    }, [router?.query])

    const [programData, setProgramData] = useState([
        {
            id: 1,
            name: 'T???o y??u c???u',
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
            name: 'Y??u c???u ?????n',
            quantity: 0,
            icon: '/asset/images/icons/mail.svg',
            active: false,
            typeCategory: TypeCategory.YCDEN,
            component: null,
            classbg: 'bg-red',
            href: `/?typeCategory=${TypeCategory.YCDEN}`
        },
        {
            id: 3,
            name: 'Y??u c???u ??i',
            quantity: 0,
            icon: '/asset/images/icons/mail-1.svg',
            active: false,
            typeCategory: TypeCategory.YCDI,
            component: null,
            classbg: 'bg-green',
            href: `/?typeCategory=${TypeCategory.YCDI}`
        },
        {
            id: 4,
            name: 'Y??u c???u nh??p',
            quantity: 0,
            icon: '/asset/images/icons/save-draft.svg',
            active: false,
            typeCategory: TypeCategory.YCNHAP,
            component: null,
            classbg: '',
            href: `/?typeCategory=${TypeCategory.YCNHAP}`
        },
        {
            id: 5,
            name: 'Y??u c???u li??n quan',
            quantity: 0,
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

    const colorEnum = (data) => {
        if (data === "1") {
            return "#fff100"
        }
        if (data === "2") {
            return "#8ec320"
        }
        if (data === "3") {
            return "##eb2629"
        }
        return null;
    }

    const priorityRender = (value) => {
        const findPriority = masterData?.find(x => x?.id === value);
        if (findPriority) {
            return <span className="dot" style={{ background: colorEnum(findPriority?.extra_data) ?? "#8ec320" }}>
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

    const findPrioriryId = (value) => {
        const findPriority = masterData?.filter(x=>x?.category==='uutien')?.find(x => x?.extra_data === value);
        if (findPriority) {
            return findPriority?.id ?? null
        }
        return null;
    }

    const columns = [
        {
            field: 'req_code',
            headerName: "M?? y??u c???u",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    <td>{priorityRender(cell?.row?.priorityID)}</td>
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
            headerName: "T??n y??u c???u",
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
            headerName: "Tr???ng th??i",
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
            headerName: "Ng??y y??u c???u",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <div class="date-time"> <span>{new Date(cell?.row?.req_date)?.toLocaleDateString('vi') ?? ""}</span></div>
                </td>
            }
        },
        {
            field: 'createdBy',
            headerName: "Ng?????i t???o",
            headerAlign: 'left',
            headerClassName: 'headerColumn',
            minWidth: 50,
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    <td>
                        <p>{`${cell?.row?.submitByModel?.hoTenDemNhanVien} ${cell?.row?.submitByModel?.tenNhanVien}`}</p>
                    </td>
                </>
            }
        },
        {
            field: 'action',
            headerName: 'Thao t??c',
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
            headerName: "M?? y??u c???u",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    <td>{priorityRender(cell?.row?.priorityID)}</td>
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
            headerName: "Tr???ng th??i",
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
            headerName: "Ng??y y??u c???u",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <div class="date-time"><span>{new Date(cell?.row?.req_date)?.toLocaleDateString('vi') ?? ""}</span></div>
                </td>
            }
        },
        {
            field: 'perfome_date',
            headerName: "Ng??y th???c hi???n",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <div class="date-time"> <span>{new Date(cell?.row?.perfome_date)?.toLocaleDateString('vi') ?? ""}</span></div>
                </td>
            }
        },
        {
            field: 'createdBy',
            headerName: "Ng?????i t???o",
            headerAlign: 'left',
            headerClassName: 'headerColumn',
            minWidth: 50,
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    <td>
                        <p>{`${cell?.row?.submitByModel?.hoTenDemNhanVien} ${cell?.row?.submitByModel?.tenNhanVien}`}</p>
                    </td>
                </>
            }
        },
        {
            field: 'action',
            headerName: 'Thao t??c',
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

    const columnsYCHTX = [
        {
            field: 'req_code',
            headerName: "M?? y??u c???u",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    <td>{priorityRender(cell?.row?.priorityID)}</td>
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
            headerName: "T??n y??u c???u",
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
            field: 'req_place',
            headerName: "?????a ??i???m",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <p>{cell?.row?.req_place}</p>
                </td>

            }
        },
        {
            field: 'statusID',
            headerName: "Tr???ng th??i",
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
            headerName: "Ng??y y??u c???u",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <div class="date-time"> <span>{new Date(cell?.row?.req_date)?.toLocaleDateString('vi') ?? ""}</span></div>
                </td>
            }
        },
        {
            field: 'createdBy',
            headerName: "Ng?????i t???o",
            headerAlign: 'left',
            headerClassName: 'headerColumn',
            minWidth: 50,
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    <td>
                        <p>{`${cell?.row?.submitByModel?.hoTenDemNhanVien} ${cell?.row?.submitByModel?.tenNhanVien}`}</p>
                    </td>
                </>
            }
        },
        {
            field: 'action',
            headerName: 'Thao t??c',
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

    const columnsPYCHTX = [
        {
            field: 'req_code',
            headerName: "M?? y??u c???u",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    <td>{priorityRender(cell?.row?.priorityID)}</td>
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
            field: 'dvkd_id',
            headerName: "????n v??? kinh doanh",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <p>{JSON.parse(cell?.row?.dvkd?.extra_data)?.name}</p>
                </td>

            }
        },
        {
            field: 'status',
            headerName: "Tr???ng th??i",
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
            headerName: "Ng??y y??u c???u",
            headerClassName: 'headerColumn',
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <td>
                    <div class="date-time"> <span>{new Date(cell?.row?.req_date)?.toLocaleDateString('vi') ?? ""}</span></div>
                </td>
            }
        },
        {
            field: 'createdBy',
            headerName: "Ng?????i t???o",
            headerAlign: 'left',
            headerClassName: 'headerColumn',
            minWidth: 50,
            flex: 1,
            editable: false,
            renderCell: (cell) => {
                return <>
                    {/* <td>
                        <div class="user-avatar">
                            <img src="/asset/images/icons/avatar.png" alt="" />
                        </div>
                    </td> */}
                    <td>
                        <p>{`${cell?.row?.submitByModel?.hoTenDemNhanVien} ${cell?.row?.submitByModel?.tenNhanVien}`}</p>
                    </td>
                </>
            }
        },
        {
            field: 'action',
            headerName: 'Thao t??c',
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

    const renderGridByCategory = () => {
        if (selectedData.category === TaskCategory.TIEPNOPQUY) {
            return columns
        }
        if (selectedData.category === TaskCategory.LENHXUATQUY) {
            return columnsLXQ
        }
        if (selectedData.category === TaskCategory.HOTROXE) {
            return columnsYCHTX
        }
        if (selectedData.category === TaskCategory.PHIEUHOTROXE) {
            return columnsPYCHTX
        }
        return columns;
    }

    const onSearchReq_code = (data) => {
        const timeOutId = setTimeout(() => {
            if (data?.trim()?.length === 0) {
                selectedData.req_code = null;
            }
            else {
                selectedData.req_code = data;
            }
            setSelectedData({ ...selectedData })
        }, 1000);

        return () => clearTimeout(timeOutId);
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
                                            <DynamicLink href={`${index === 0 ? item?.href : item?.href + `&category=${selectedData.category}`}`}
                                                as={`${index === 0 ? item?.href : item?.href + `&category=${selectedData.category}`}`}
                                            >
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
                            {/* <div class="side-bar_top">
                                <h2 class="side-bar_top__title">Ch???n tr???ng th??i</h2>
                                <ul class="side-bar_top__list">
                                    <li class="active"> <a href=""> <em class="material-icons">mail_outline</em><span>T???t c???</span></a></li>
                                    <li> <a href=""> <em class="material-icons">done_all</em><span>B??? sung h??? s??</span></a></li>
                                    <li> <a href=""> <em class="material-icons">schedule</em><span>Ch??a x??? l??</span></a></li>
                                </ul>
                            </div> */}
                            <div class="side-bar_bottom">
                                <h2 class="side-bar_bottom__title">M???c ????? ??u ti??n</h2>
                                <ul class="side-bar_bottom__list">
                                    <li className={selectedData.uutien === null ? 'active' : ''} onClick={() => {
                                        selectedData.uutien = null;
                                        setSelectedData({ ...selectedData })
                                    }}>
                                        <a><span class="dot blue"> </span><span class="txt">T???t c???</span></a>
                                    </li>

                                    <li className={selectedData.uutien === findPrioriryId("1") ? 'active' : ''} onClick={() => {
                                        const id = findPrioriryId("1");
                                        selectedData.uutien = id;
                                        setSelectedData({ ...selectedData })
                                    }}>
                                        <a><span class="dot yellow"> </span><span class="txt">Th???p</span></a>
                                    </li>

                                    <li className={selectedData.uutien === findPrioriryId("2") ? 'active' : ''} onClick={() => {
                                        const id = findPrioriryId("2");
                                        selectedData.uutien = id;
                                        setSelectedData({ ...selectedData })
                                    }}>
                                        <a><span class="dot green"> </span><span class="txt">B??nh th?????ng</span></a>
                                    </li>

                                    <li className={selectedData.uutien === findPrioriryId("3") ? 'active' : ''} onClick={() => {
                                        const id = findPrioriryId("3");
                                        selectedData.uutien = id;
                                        setSelectedData({ ...selectedData })
                                    }}>
                                        <a><span class="dot red"> </span><span class="txt">Cao</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="wrapper-right">
                        <div class="wrapper-right_header">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="wrapper-right_header--left d-flex align-items-center">
                                    <label class="txt" for="">Lo???i y??u c???u </label>
                                    <select className='select-custom' value={selectedData.category} onChange={(e) => {
                                        // selectedData.category = e?.target?.value ?? TaskCategory.TIEPNOPQUY;
                                        // setSelectedData({ ...selectedData })
                                        selectedData.req_code = null;
                                        setSelectedData({ ...selectedData })
                                        router.push(`?typeCategory=${selectedData.typeCategory}&category=${e?.target?.value ?? TaskCategory.TIEPNOPQUY}`)
                                    }}>
                                        <option value={TaskCategory.TIEPNOPQUY}>Ti???p/n???p qu???</option>
                                        <option value={TaskCategory.LENHXUATQUY}>L???nh xu???t qu???</option>
                                        <option value={TaskCategory.HOTROXE}>H??? tr??? xe</option>
                                        <option value={TaskCategory.PHIEUHOTROXE}>Phi???u H??? tr??? xe</option>
                                    </select>
                                </div>
                                {/* <div class="wrapper-right_header--right wrap-tabs d-flex align-items-center ms-auto">
                                    <div class="wrapper-right_header--right__select d-flex align-items-center">
                                        <div class="panel active" id="year">
                                            <select className='select-custom'>
                                                <option value="hide">N??m</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                            </select>
                                        </div>
                                        <div class="panel" id="mounth">
                                            <select className='select-custom'>
                                                <option value="hide">Th??ng</option>
                                                <option value="january">Th??ng 1</option>
                                                <option value="february">Th??ng 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <ul class="tab-list wrapper-right_header--right__sort">
                                        <li rel="mounth">Th??ng </li>
                                        <li class="active" rel="year">N??m </li>
                                    </ul>
                                </div> */}
                            </div>
                            <form class="wrap-form">
                                <div class="form-group">
                                    <button><img src="/asset/images/icons/search-black.svg" alt="" /></button>
                                    <input class="form-control" type="text" onChange={(e) => onSearchReq_code(e.target.value)} placeholder="T??m ki???m" />
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
            }} class="float" title="T???o y??u c???u">
                <i class="fa fa-plus my-float"></i>
            </a> */}
        </>
    );
}

export default DashBoardComponent;