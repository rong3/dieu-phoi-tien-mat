import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GroupBoxComponent from "../../../../../shared/groupBox/groupBox"
import SelectBox from "../../../../../../shared/packages/control/selectBox/selectBox"
import { InputControl } from "../../../../../../shared/packages/control/input/inputControl"
import DateTimeInput from "../../../../../../shared/packages/control/input/datetime"
import ListVehicleBelongs from "../listVehicleBelongs/listVehicleBelongs"
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import PrioritySelect from "../../../../../common/PrioritySelect/PrioritySelect"
import { removeAccents } from "../../../../../../services/dptm/commonService"
import { TaoMoiYCXe, UpdateStatusYCXe, CapNhatYCXe, PostYCHTXQuantity } from "../../../../../../services/dptm/yeucauxe"
import Modal from "../../../../../../shared/packages/control/modal/index";
import { TaskCategory, TypeCategory } from "../../../../../dashboard/common/taskContainer/taskCategory"
import { useAuth } from "../../../../../../shared/packages/provider/authBase"

function VehicleRequiredComponent(props) {
    const { id, remoteData } = props;
    const { addToast } = useToasts();
    const router = useRouter();
    const auth = useAuth();
    const { masterData, relatedUser, captren } = useSelector((state) => state.masterData);

    const [modelData, setModelData] = useState({
        masterAttributes: [],
        nguoiLienQuan: [],
    })

    const [isUpdateChange, setIsUpdateChange] = useState(false)

    const [modalLXQ, setModalLXQ] = useState({
        isOpen: false,
        data: null,
        type: null
    })

    const resetModalLXQ = () => {
        setModalLXQ({ ...modalLXQ, isOpen: false, data: null, type: null })
    }

    const [componentData, setComponentData] = useState({
        dvkd: [],
        loaiyeucau: [],
        yeucau: [],
        loaitien: [],
        khuvuc: [],
        uutien: [],
        trangthai: [],
        nguoilienquan: []
    })

    //func for groupbox
    const setTypeCurrencyData = (data) => {
        modelData.masterAttributes = data;
        setModelData({ ...modelData });
    }
    const setTypeRelatedUserData = (data) => {
        modelData.nguoiLienQuan = data?.filter(x => x?.checked);
        setModelData({ ...modelData });
    }


    const findStatus = (statusName) => {
        const find = componentData.trangthai?.find(x => x.code === statusName) ?? null
        if (find) {
            return find
        }
        return null;
    }

    const findStatusByID = (id) => {
        const find = componentData.trangthai?.find(x => x.id === id) ?? null
        if (find) {
            return find
        }
        return null;
    }


    useEffect(() => {
        try {
            if (relatedUser && masterData?.length > 0) {
                //get list don vi kinh doanh
                const dvkdList = masterData?.filter(x => x?.category === 'dvkd')?.sort((a, b) => a?.master_name - b?.master_name)?.map((item) => ({
                    id: item?.id,
                    label: `${item?.master_name} - ${JSON.parse(item?.extra_data)?.name ?? ''}`
                }));

                //get list loai ye cau
                const lycList = masterData?.filter(x => x?.category === 'loaiyeucauhtx')
                const ycList = masterData?.filter(x => x?.category === 'yeucauhtx')

                //get list loai tien
                const currencyList = masterData?.filter(x => x?.category === 'loaitien')?.map((item) => {
                    return {
                        id: item?.id,
                        primaryId: null,
                        name: item?.master_name,
                        data: null,
                        checked: false
                    }
                })

                //get lsit khu vuc
                const khuvucList = masterData?.filter(x => x?.category === 'khuvuc')?.map((item) => {
                    return {
                        id: item?.id,
                        name: item?.master_name,
                    }
                })

                //get lsit khu vuc
                const priorityList = masterData?.filter(x => x?.category === 'uutien')?.map((item) => {
                    return {
                        id: item?.id,
                        name: item?.master_name,
                    }
                })

                //get list trang thai
                const statusList = masterData?.filter(x => x?.category === 'trangthai')?.map((item) => {
                    return {
                        id: item?.id,
                        name: item?.master_name,
                        code: item?.extra_data
                    }
                })

                //get list nguoi uu tien
                const relatedUserList = [...relatedUser]?.slice(0, 20)?.map(x => ({
                    id: x?.maNhanVien,
                    name: `${x?.maNhanVien} ${x?.hoTenDemNhanVien} ${x?.tenNhanVien} - ${x?.tenChucDanhMoiNhat}`,
                    checked: false
                }))

                componentData.dvkd = dvkdList;
                componentData.loaiyeucau = lycList;
                componentData.yeucau = ycList;
                componentData.loaitien = currencyList;
                componentData.khuvuc = khuvucList;
                componentData.uutien = priorityList;
                if (priorityList?.length > 1) {
                    modelData['priorityID'] = priorityList[2]?.id
                }

                componentData.trangthai = statusList;
                componentData.nguoilienquan = relatedUserList;
                setComponentData({ ...componentData });

                //default value
                if (remoteData?.model) {
                    remoteData?.model?.masterAttributes?.map((x) => {
                        const find = componentData.loaitien?.find(m => m.id === x?.master_id) ?? null
                        if (find) {
                            const convertAttributes = JSON.parse(x?.attributes) ?? null;
                            if (convertAttributes) {
                                find.primaryId = x?.id;
                                find.data = convertAttributes?.amount;
                                find.checked = convertAttributes?.checked ?? false
                            }
                        }
                    })

                    setModelData({
                        ...modelData, ...remoteData?.model, nguoiLienQuan: [
                            ...(remoteData?.model?.nguoiLienQuan ?? [])?.map((x) => {
                                const find = relatedUser?.find(m => m?.maNhanVien === x?.nguoiLienQuan_ID) ?? null
                                return {
                                    id: find?.maNhanVien,
                                    name: `${find?.maNhanVien} ${find?.hoTenDemNhanVien} ${find?.tenNhanVien} - ${find?.tenChucDanhMoiNhat}`,
                                    checked: true
                                }
                            })
                        ]
                    })

                }
            }
        }
        catch (err) { console.log({ err }); }
    }, [masterData, relatedUser, remoteData?.model])

    useEffect(() => {
        componentData.nguoilienquan = [...modelData?.nguoiLienQuan, ...componentData.nguoilienquan?.filter(x => !modelData?.nguoiLienQuan?.map(y => y.id)?.includes(x?.id))];
        setComponentData({ ...componentData });
    }, [modelData?.nguoiLienQuan])

    const onSearchRelatedUser = (data) => {
        const timeOutId = setTimeout(() => {
            //get list nguoi uu tien
            if (data?.trim()?.length === 0) {
                const relatedUserList = [...relatedUser?.filter(x => !modelData?.nguoiLienQuan?.map(x => x?.id)?.includes(x?.maNhanVien))?.slice(0, 20)?.map(x => ({
                    id: x?.maNhanVien,
                    name: `${x?.maNhanVien} ${x?.hoTenDemNhanVien} ${x?.tenNhanVien} - ${x?.tenChucDanhMoiNhat}`,
                    checked: x?.checked ?? false
                })), ...modelData?.nguoiLienQuan]?.sort((a, b) => a?.checked ? -1 : 1)
                componentData.nguoilienquan = relatedUserList;
                setComponentData({ ...componentData })
            }
            else {
                const relatedUserList = [...relatedUser?.filter(x => !modelData?.nguoiLienQuan?.map(x => x?.id)?.includes(x?.maNhanVien)
                    && (removeAccents(x.maNhanVien)?.toLowerCase()?.indexOf(removeAccents(data)?.toLowerCase()) !== -1 || removeAccents((x?.hoTenDemNhanVien + ' ' + x?.tenNhanVien))?.toLowerCase()?.indexOf(removeAccents(data)?.toLowerCase()) !== -1))?.map(x => ({
                        id: x?.maNhanVien,
                        name: `${x?.maNhanVien} ${x?.hoTenDemNhanVien} ${x?.tenNhanVien} - ${x?.tenChucDanhMoiNhat}`,
                        checked: x?.checked ?? false
                    })), ...modelData?.nguoiLienQuan]?.sort((a, b) => a?.checked ? -1 : 1)
                componentData.nguoilienquan = relatedUserList;
                setComponentData({ ...componentData });
            }
        }, 1000);

        return () => clearTimeout(timeOutId);
    }

    const overwriteModel = (key, value) => {
        if (!showControlTheoThucTe()) {
            if (modelData[key] !== value) {
                setIsUpdateChange(true);
            }
        }
        modelData[key] = value;
        setModelData({ ...modelData })
    }

    const isDisabledControl = () => {
        const status = findStatusByID(modelData?.statusID)?.code ?? null
        if (['approved', 'waitapproved', 'cancel', 'received', 'inprogress'].includes(status)) {
            if (status === 'approved' && showControlTheoThucTe() === false) {
                return false
            }
            return true
        }
        return false;
    }

    const insertYeuCauxeFunction = (model) => {
        const convertModel = {
            ...model,
            quanlytructiep: captren?.maNhanVien,
            submit_by: auth?.user?.manv,
            masterAttributes: model?.masterAttributes?.map(y => {
                return {
                    "master_id": y?.id,
                    "category": "Yeucauxe",
                    "attributes": JSON.stringify({
                        amount: y?.data ? Number.parseInt(y?.data) : null,
                        checked: y?.checked ?? false
                    })
                }
            }),
            nguoiLienQuan: model?.nguoiLienQuan?.filter(x => x?.checked)?.map(y => {
                return {
                    "nguoiLienQuan_ID": y?.id,
                    "category": "Yeucauxe"
                }
            }),
        }

        TaoMoiYCXe(convertModel).then((res) => {
            addToast(<div className="text-center">
                Lưu thành công
            </div>, { appearance: 'success' });
            router.replace(`/?typeCategory=${TypeCategory.YCDEN}&category=${TaskCategory.HOTROXE}`)
        }).catch((err) => {
            addToast(<div className="text-center">
                Lưu thất bại
            </div>, { appearance: 'error' });
        })
    }

    const updateYCXeFunction = (model) => {
        const convertModel = {
            ...model,
            quanlytructiep: captren?.maNhanVien,
            masterAttributes: model?.masterAttributes?.map(y => {
                return {
                    "id": y?.primaryId ?? y?.id,
                    // "master_id": y?.master_id ?? ,
                    "category": "Yeucauxe",
                    "attributes": y?.attributes ?? JSON.stringify({
                        amount: y?.data ? Number.parseInt(y?.data) : null,
                        checked: y?.checked ?? false
                    })
                }
            }),
            nguoiLienQuan: model?.nguoiLienQuan?.filter(x => x?.checked)?.map(y => {
                return {
                    "nguoiLienQuan_ID": y?.id,
                    "category": "Yeucauxe"
                }
            }),
        }
        console.log({ convertModel });
        CapNhatYCXe(convertModel).then((res) => {
            addToast(<div className="text-center">
                Cập nhật thành công
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                Cập nhật thất bại
            </div>, { appearance: 'error' });
        })
    }

    const updateStatusycxFunction = (status, lydotuchoi = null) => {
        const data = {
            id: id,
            status: status,
            lydotuchoi: lydotuchoi
        }
        UpdateStatusYCXe(data).then((res) => {
            addToast(<div className="text-center">
                Cập nhật thành công
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                Cập nhật thất bại
            </div>, { appearance: 'error' });
        })
    }

    //logic button
    const showControlTheoThucTe = () => {
        if (modelData?.categoryID) {
            const find = componentData.loaiyeucau?.find(x => x?.id === modelData?.categoryID);
            return find?.extra_data === 'real'
        }
        return true;
    }

    const statusRenderCTA = () => {
        const statusCode = findStatusByID(modelData?.statusID)?.code ?? null
        const isThuHoTheoHopDong = showControlTheoThucTe() === false;
        //thu ho theo hop dong
        switch (statusCode) {
            case 'draft': return ['update', 'waitapproved']
            case 'addition': return ['update', 'waitapproved']
            case 'waitapproved': return ['addition', 'approved']
            case 'approved': return isThuHoTheoHopDong ? ['publish'] : ['inprogress']
            case 'inprogress': return ['received']
            case 'received': return ['taophieuychtx']
            default: return ['draft', 'add']
        }
    }

    const roleButton = (type) => {
        const roleData = modelData?.quanlytructiep === auth?.user?.manv ? 'qltt' : 'user';
        if (['qltt'].includes(roleData)) {
            return ['addition', 'approved']?.includes(type)
        }
        if (['user'].includes(roleData)) {
            return ['update', 'waitapproved', 'inprogress', 'inprogress', 'received', 'taophieuychtx', 'draft', 'add','publish']?.includes(type)
        }
        return true;
    }

    const typeButtonRender = (type) => {
        if (type === 'draft' && roleButton(type)) {
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const draftId = findStatus('draft')?.id;
                if (draftId) {
                    overwriteModel('statusID', draftId)
                    insertYeuCauxeFunction(modelData)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Lưu nháp</span>
            </button>
        }

        if (type === 'waitapproved' && roleButton(type)) {
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("waitapproved")?.id;
                if (statusId) {
                    overwriteModel('statusID', statusId)
                    updateStatusycxFunction(statusId);
                }
            }}>
                <img src="/asset/images/icons/send.svg" alt="" />
                <span>Chuyển duyệt</span>
            </button>
        }
        if (type === 'add' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("waitapproved")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        insertYeuCauxeFunction(modelData)
                    }
                }}
            >
                <img src="/asset/images/icons/send.svg" alt="" />
                <span>
                    Tạo yêu cầu
                </span>
            </button>
        }
        if (type === 'update' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    if (id) {
                        updateYCXeFunction(modelData);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Cập nhật yêu cầu
                </span>
            </button>
        }
        if (type === 'addition' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("addition")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        updateStatusycxFunction(statusId);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Yêu cầu bổ sung
                </span>
            </button>
        }
        if (type === 'approved' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus(showControlTheoThucTe() ? "inprogress" : "approved")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        updateStatusycxFunction(statusId);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Duyệt yêu cầu
                </span>
            </button>
        }
        if (type === 'inprogress' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("received")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        updateStatusycxFunction(statusId);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Tiếp nhận
                </span>
            </button>
        }
        if (type === 'cancel' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    setModal({ ...modal, isOpen: true, data: { lydotuchoi: null } })
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Từ chối
                </span>
            </button>
        }
        if (type === 'received' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("received")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        updateStatusycxFunction(statusId);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Tiếp nhận
                </span>
            </button>
        }
        if (type === 'taophieuychtx' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    setModalLXQ({ ...modalLXQ, isOpen: true, data: { quantity: null } })
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Tạo phiếu yêu cầu hỗ trợ xe
                </span>
            </button>
        }
        if (type === 'publish' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    if (isUpdateChange) {

                    }
                    else {
                        addToast(<div className="text-center">
                            Không có nội dung nào được cập nhật
                        </div>, { appearance: 'info' });
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Publish thông tin sửa đổi
                </span>
            </button>
        }
    }



    return (
        <section className="section priority-user-content">
            {
                id &&
                <div className='row'>
                    <span className='status-block'>
                        {`Trạng thái: ${findStatusByID(modelData?.statusID)?.name ?? ""}`}
                    </span>
                </div>
            }
            {
                (id && !showControlTheoThucTe()) &&
                <div className="form-row row">
                    <div className="form-group col-md-2">
                        <span>Bản sửa đổi bổ sung</span>
                        <SelectBox id="selectbox"
                            optionLabel="name"
                            optionValue="id"
                            onChange={(data) => {

                            }}
                            value={null}
                            isPortal
                            options={[]}
                        />
                    </div>
                </div>
            }
            <div className='form-row row'>
                <div class="form-group col-md-4">
                    <label for="">Ưu tiên</label>
                    <PrioritySelect isDisabled={isDisabledControl()} value={modelData?.priorityID} data={componentData.uutien} onChange={(data) => {
                        overwriteModel('priorityID', data)
                    }} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Quản lý trực tiếp</label>
                    <InputControl disabled={true} type="text" id="quanlytructiep"
                        defaultValue={modelData?.quanlytructiep ?
                            `${modelData?.quanlytructiep}`
                            : `${captren?.maNhanVien} - ${captren?.hoTenDemNhanVien} ${captren?.tenNhanVien} - ${captren?.tenChucDanhMoiNhat}`}
                    />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">ĐVKD</label>
                    <SelectBox id="selectboxdvkd"
                        isDisabled={isDisabledControl()}
                        optionLabel="label"
                        optionValue="id"
                        onChange={(data) => {
                            const value = data ?? '';
                            overwriteModel('dvkd_req', value)
                        }}
                        value={modelData?.dvkd_req}
                        isPortal
                        options={componentData.dvkd}
                    />
                </div>
                <div className="form-group col-md-4">
                    <label>Loại Yêu cầu</label>
                    <SelectBox id="selectbox"
                        isDisabled={isDisabledControl()}
                        optionLabel="master_name"
                        optionValue="id"
                        onChange={(data) => {
                            overwriteModel('categoryID', data)
                        }}
                        value={modelData?.categoryID}
                        isPortal
                        options={componentData.loaiyeucau}
                    />
                </div>
                {
                    showControlTheoThucTe() ||
                    <div className="form-group col-md-4">
                        <span>Tên khách hàng</span>
                        <InputControl disabled={isDisabledControl()} defaultValue={modelData?.customer_name} type="text" id="name" onChange={(e) => {
                            overwriteModel('customer_name', e?.target?.value)
                        }} />
                    </div>
                }
                <div className="form-group col-md-4">
                    <span>Tên yêu cầu</span>
                    <InputControl disabled={isDisabledControl()} type="text" id="name" onChange={(e) => {
                        overwriteModel('req_name', e?.target?.value)
                    }} defaultValue={modelData?.req_name} />
                </div>
                <div className="form-group col-md-4">
                    <span>Yêu cầu</span>
                    <SelectBox id="selectbox"
                        isDisabled={isDisabledControl()}
                        optionLabel="master_name"
                        optionValue="id"
                        onChange={(data) => {
                            overwriteModel('type_req_ID', data)
                        }}
                        value={modelData?.type_req_ID}
                        isPortal
                        options={componentData.yeucau}
                    />
                </div>
                <div className="form-group col-md-4">
                    <span>Thời gian</span>
                    <DateTimeInput selected={modelData?.req_date ? new Date(modelData?.req_date) : null}
                        disabled={isDisabledControl()}
                        isDefaultEmpty
                        isPortal
                        id="startDate" isOnlyDate={true} onChange={(data) => {
                            overwriteModel('req_date', data)
                        }} />
                </div>
                <div className="form-group col-md-4">
                    <span>Địa điểm</span>
                    <InputControl disabled={isDisabledControl()} type="text" id="name" onChange={(e) => {
                        overwriteModel('req_place', e?.target?.value)
                    }} defaultValue={modelData?.req_place} />
                </div>
                {
                    showControlTheoThucTe() ||
                    <div className="form-group col-md-4">
                        <span>Nộp quỹ</span>
                        <SelectBox isDisabled={isDisabledControl()} id="selectbox"
                            optionLabel="name"
                            optionValue="id"
                            onChange={(data) => {
                                overwriteModel('nopQuy', data)
                            }}
                            value={modelData?.nopQuy}
                            isPortal
                            options={[{ id: true, name: 'Có' }, { id: false, name: 'Không' }]}
                        />
                    </div>
                }
                <div className="form-group col-md-12">
                    <span>Mô tả</span>
                    <InputControl disabled={isDisabledControl()} type="textarea" id="name" defaultValue={modelData?.desc} onChange={(e) => {
                        const value = e.target.value ?? '';
                        overwriteModel('desc', value)
                    }} defaultValue={modelData?.desc} />
                </div>
            </div>

            <div className='form-row row'>
                <div class="form-group col-lg-4">
                    <label for="">Loại tiền</label>
                    <GroupBoxComponent
                        disabled={isDisabledControl()}
                        isShowTextBox={true}
                        setData={setTypeCurrencyData}
                        data={componentData.loaitien} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Người liên quan</label>
                    <GroupBoxComponent
                        onSearch={onSearchRelatedUser}
                        disabled={isDisabledControl()}
                        isShowTextBox={false}
                        setData={setTypeRelatedUserData}
                        data={componentData?.nguoilienquan} />
                </div>
                <div className="form-group col-lg-4">
                    <label>Chuyển thực thi</label>
                    {
                        componentData.khuvuc?.map(item => {
                            return (
                                <div class="form-check">
                                    <input
                                        disabled={isDisabledControl()}
                                        type="radio"
                                        value={item?.id}
                                        checked={modelData?.chuyenthucthi_ID === item?.id}
                                        class="form-check-input"
                                        id={`radio_${item.id}`}
                                        name={`thucthi_${id}`}
                                        onChange={(e) => {
                                            overwriteModel('chuyenthucthi_ID', item?.id)
                                        }}
                                    />
                                    &nbsp;{item?.name}
                                    <label class="form-check-label" for={`radio_${item.id}`}></label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div class="button-bottom">
                {
                    statusRenderCTA()?.map(x => {
                        return (
                            typeButtonRender(x)
                        )
                    })
                }
            </div>
            {/* //modal LXQ */}
            {
                <Modal
                    isOpen={modalLXQ.isOpen}
                    modalName="role-modal"
                    showOverlay={true}
                    onClose={() => resetModalLXQ()}
                    title="Phiếu hỗ trợ xe"
                    size="md"
                    centered
                >
                    <Modal.Body>
                        <section className="section priority-user-content">
                            <div className="form-row row">
                                <div className="form-group col-lg-12">
                                    <label for="">Số lượng phiếu hỗ trợ xe cần tạo</label>
                                    <InputControl type="number" id="name" onChange={(e) => {
                                        const value = e.target.value ?? null;
                                        modalLXQ.data = { quantity: value };
                                        setModalLXQ({ ...modalLXQ })
                                    }} />
                                </div>
                            </div>
                        </section>
                    </Modal.Body>
                    <Modal.Footer>
                        <div class="button-bottom">
                            <button className="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                                resetModalLXQ()
                            }}>Đóng</button>

                            <button className="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                                PostYCHTXQuantity({
                                    id: id,
                                    quantity: modalLXQ.data?.quantity
                                }).then((res) => {
                                    addToast(<div className="text-center">
                                        Tạo lênh xuất quỹ thành công
                                    </div>, { appearance: 'success' });
                                    setTimeout(() => {
                                        router.reload();
                                    }, 0);
                                }).catch((err) => {
                                    addToast(<div className="text-center">
                                        Lưu thất bại
                                    </div>, { appearance: 'error' });
                                })
                                resetModalLXQ();
                            }}>
                                Tạo
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            }
            {
                (id && modelData?.phieuHoTroXe?.length > 0 && showControlTheoThucTe()) &&
                <ListVehicleBelongs id={id} dataphtx={modelData?.phieuHoTroXe} />
            }
        </section>
    );
}

export default VehicleRequiredComponent;