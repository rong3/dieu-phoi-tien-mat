import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import GroupBoxComponent from "../../../../../shared/groupBox/groupBox"
import SelectBox from "../../../../../../shared/packages/control/selectBox/selectBox"
import { InputControl } from "../../../../../../shared/packages/control/input/inputControl"
import DateTimeInput from "../../../../../../shared/packages/control/input/datetime"
import ListFundRelaseBelongs from "../listFundRelaseBelongs/listFundRelaseBelongs"
import { useDispatch, useSelector } from "react-redux";
import PrioritySelect from "../../../../../common/PrioritySelect/PrioritySelect"
import { useToasts } from "react-toast-notifications";
import { TaoMoiYCTiepNopQuy, CapNhatYCTiepNopQuy, UpdateStatusYCTiepNopQuy } from "../../../../../../services/dptm/yeucautiepnopquy"
import { PostLXQQuantity } from "../../../../../../services/dptm/lenhxuatquy"
import Modal from "../../../../../../shared/packages/control/modal/index";
import { removeAccents } from "../../../../../../services/dptm/commonService"
import { TaskCategory, TypeCategory } from "../../../../../dashboard/common/taskContainer/taskCategory"
import { useAuth } from "../../../../../../shared/packages/provider/authBase"
import { chucdanhenum } from "../../../../../../config/chucdanh"
import { patternLabelRelatedUser, onSeachCommon } from "../../../../../../utils/common"

function TicketRequiredComponent(props) {
    const { id, remoteData } = props;
    const { addToast } = useToasts();
    const auth = useAuth();
    const router = useRouter();
    const nguoithuchiRef = useRef(null)
    const [modal, setModal] = useState({
        isOpen: false,
        data: null,
        type: null
    })

    const [modalLXQ, setModalLXQ] = useState({
        isOpen: false,
        data: null,
        type: null
    })

    const { masterData, relatedUser, captren } = useSelector((state) => state.masterData);
    const [componentData, setComponentData] = useState({
        dvkd: [],
        loaiyeucau: [],
        loaitien: [],
        khuvuc: [],
        uutien: [],
        trangthai: [],
        nguoilienquan: [],
        nguoilienquan2: [],
    })

    const [modelData, setModelData] = useState({
        //loaitien
        masterAttributes: [],
        nguoiLienQuan: [],
        chuyenthucthi_ID: null,
        req_date: new Date()
    })

    const resetModal = () => {
        setModal({ ...modal, isOpen: false, data: null, type: null })
    }

    const resetModalLXQ = () => {
        setModalLXQ({ ...modalLXQ, isOpen: false, data: null, type: null })
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
                const lycList = masterData?.filter(x => x?.category === 'yeucautnq')

                //get list loai tien
                const currencyList = masterData?.filter(x => x?.category === 'loaitien')?.sort((a, b) => a?.extra_data - b?.extra_data)?.map((item) => {
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
                    name: patternLabelRelatedUser(x),
                    checked: false
                }))

                componentData.dvkd = dvkdList;
                componentData.loaiyeucau = lycList;
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
                                    name: patternLabelRelatedUser(find),
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

    useEffect(() => {
        const findMerger = relatedUser?.find(x => x?.maNhanVien === modelData?.approved_by);
        if (findMerger) {
            componentData.nguoilienquan2 = [
                {
                    id: findMerger?.maNhanVien,
                    name: patternLabelRelatedUser(findMerger),
                    checked: true
                }
                , ...componentData.nguoilienquan?.filter(x => x.id !== modelData?.approved_by)];
        }
        else {
            componentData.nguoilienquan2 = [...componentData.nguoilienquan];
        }
        setComponentData({ ...componentData });
    }, [modelData?.approved_by, relatedUser])

    const overwriteModel = (key, value) => {
        modelData[key] = value;
        setModelData({ ...modelData })
    }

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

    const isDisabledControl = () => {
        const status = findStatusByID(modelData?.statusID)?.code ?? null
        if (['approved', 'waitapproved', 'cancel', 'received', 'inprogress'].includes(status)) {
            return true
        }
        return false;
    }

    const insertTicketRequired = (model) => {
        const convertModel = {
            ycTiepNopQuy: { ...model, quanlytructiep: captren?.maNhanVien, submit_by: auth?.user?.manv },
            masterAttributes: model?.masterAttributes?.map(y => {
                return {
                    "master_id": y?.id,
                    "category": "NopQuy",
                    "attributes": JSON.stringify({
                        amount: y?.data ? Number.parseInt(y?.data) : null,
                        checked: y?.checked ?? false
                    })
                }
            }),
            nguoiLienQuan: model?.nguoiLienQuan?.filter(x => x?.checked)?.map(y => {
                return {
                    "nguoiLienQuan_ID": y?.id,
                    "category": "NopQuy"
                }
            }),
        }
        console.log({ convertModel });
        TaoMoiYCTiepNopQuy(convertModel).then((res) => {
            addToast(<div className="text-center">
                L??u th??nh c??ng
            </div>, { appearance: 'success' });
            router.replace(`/?typeCategory=${TypeCategory.YCDEN}&category=${TaskCategory.TIEPNOPQUY}`)
        }).catch((err) => {
            addToast(<div className="text-center">
                L??u th???t b???i
            </div>, { appearance: 'error' });
        })
    }

    const updateTicketRequired = (model) => {
        const convertModel = {
            ycTiepNopQuy: { ...model, quanlytructiep: captren?.maNhanVien },
            masterAttributes: model?.masterAttributes?.map(y => {
                return {
                    "id": y?.primaryId ?? y?.id,
                    // "master_id": y?.master_id ?? ,
                    "category": "NopQuy",
                    "attributes": y?.attributes ?? JSON.stringify({
                        amount: y?.data ? Number.parseInt(y?.data) : null,
                        checked: y?.checked ?? false
                    })
                }
            }),
            nguoiLienQuan: model?.nguoiLienQuan?.filter(x => x?.checked)?.map(y => {
                return {
                    "nguoiLienQuan_ID": y?.id,
                    "category": "NopQuy"
                }
            }),
        }
        console.log({ convertModel });
        CapNhatYCTiepNopQuy(convertModel).then((res) => {
            addToast(<div className="text-center">
                C???p nh???t th??nh c??ng
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                C???p nh???t th???t b???i
            </div>, { appearance: 'error' });
        })
    }

    const updateStatusTicketRequired = (status, lydotuchoi = null) => {
        const data = {
            id: id,
            status: status,
            lydotuchoi: lydotuchoi
        }
        UpdateStatusYCTiepNopQuy(data).then((res) => {
            addToast(<div className="text-center">
                C???p nh???t th??nh c??ng
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                C???p nh???t th???t b???i
            </div>, { appearance: 'error' });
        })
    }

    //logic button
    const statusRenderCTA = () => {
        const statusCode = findStatusByID(modelData?.statusID)?.code ?? null
        switch (statusCode) {
            case 'draft': return ['update', 'waitapproved']
            case 'addition': return ['update', 'waitapproved']
            case 'waitapproved': return ['addition', 'approved']
            case 'approved': return ['inprogress']
            case 'inprogress': return ['cancel', 'received']
            case 'cancel': return []
            case 'received': return ['taolxq']
            default: return ['draft', 'add']
        }
    }

    const roleButton = (type) => {
        const machucdanh = auth?.user?.machucdanh;
        const roleData = modelData?.quanlytructiep === auth?.user?.manv ? 'qltt' : 'user';
        if (['qltt'].includes(roleData) || chucdanhenum.TBPDPTM.includes(machucdanh)) {
            return ['addition', 'approved']?.includes(type)
        }
        if (['user'].includes(roleData)) {
            if (chucdanhenum.THUQUY.includes(machucdanh)
                || chucdanhenum.GDV.includes(machucdanh)
            ) {
                return ['draft', 'add', 'update', 'waitapproved']?.includes(type)
            }
            if (chucdanhenum.TDV.includes(machucdanh)
                || modelData?.approved_by === auth?.user?.manv
                || chucdanhenum.CVDPTM.includes(machucdanh)
            ) {
                return ['addition', 'approved', 'taolxq', 'received']?.includes(type)
            }
            // return ['update', 'waitapproved', 'inprogress', 'received', 'cancel', 'taolxq']?.includes(type)
        }
        return false;
    }

    const typeButtonRender = (type) => {
        if (type === 'draft' && roleButton(type)) {
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const draftId = findStatus('draft')?.id;
                if (draftId) {
                    overwriteModel('statusID', draftId)
                    insertTicketRequired(modelData)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>L??u nh??p</span>
            </button>
        }

        if (type === 'waitapproved' && roleButton(type)) {
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("waitapproved")?.id;
                if (statusId) {
                    overwriteModel('statusID', statusId)
                    updateStatusTicketRequired(statusId);
                }
            }}>
                <img src="/asset/images/icons/send.svg" alt="" />
                <span>Chuy???n duy???t</span>
            </button>
        }
        if (type === 'add' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("waitapproved")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        insertTicketRequired(modelData)
                    }
                }}
            >
                <img src="/asset/images/icons/send.svg" alt="" />
                <span>
                    T???o y??u c???u
                </span>
            </button>
        }
        if (type === 'update' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    if (id) {
                        updateTicketRequired(modelData);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    C???p nh???t y??u c???u
                </span>
            </button>
        }
        if (type === 'addition' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("addition")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        updateStatusTicketRequired(statusId);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Y??u c???u b??? sung
                </span>
            </button>
        }
        if (type === 'approved' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("inprogress")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        updateStatusTicketRequired(statusId);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Duy???t y??u c???u
                </span>
            </button>
        }
        if (type === 'inprogress' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("received")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        updateStatusTicketRequired(statusId);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Ti???p nh???n
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
                    T??? ch???i
                </span>
            </button>
        }
        if (type === 'received' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("received")?.id;
                    if (statusId) {
                        overwriteModel('statusID', statusId)
                        updateStatusTicketRequired(statusId);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Ti???p nh???n
                </span>
            </button>
        }
        if (type === 'taolxq' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    setModalLXQ({ ...modalLXQ, isOpen: true, data: { quantity: null } })
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    T???o l???nh xu???t qu???
                </span>
            </button>
        }
    }

    const onSearchRelatedUser = (data) => {
        onSeachCommon(data, relatedUser, modelData, componentData, setComponentData)
    }

    return (
        <section className="section priority-user-content">
            {
                id &&
                <div className='row'>
                    <span className='status-block'>
                        {`Tr???ng th??i: ${findStatusByID(modelData?.statusID)?.name ?? ""}`}
                    </span>
                </div>
            }
            {
                modelData?.lydotuchoi &&
                <div className='form-row row'>
                    <div class="form-group col-lg-12">
                        <label style={{ color: 'red' }} for=""><b>*L?? do t??? ch???i</b></label>
                        <InputControl disabled={true} type="textarea" id="name" defaultValue={modelData?.lydotuchoi} onChange={(e) => {
                        }} />
                    </div>
                </div>
            }
            <div className='form-row row'>
                <div class="form-group col-lg-4">
                    <label for="">??u ti??n</label>
                    <PrioritySelect isDisabled={isDisabledControl()} value={modelData?.priorityID} data={componentData.uutien} onChange={(data) => {
                        overwriteModel('priorityID', data)
                    }} />
                </div>
            </div>
            <div className='form-row row'>
                <div className="form-group col-lg-4">
                    <label>Ng?????i u??? quy???n</label>
                    <SelectBox id="selectbox"
                        optionLabel="name"
                        optionValue="id"
                        isDisabled={isDisabledControl()}
                        onChange={(data) => {
                            overwriteModel('approved_by', data)
                            nguoithuchiRef.current = data
                        }}
                        onInputChange={(data) => {
                            const timeOutId = setTimeout(() => {
                                //get list nguoi uu tien
                                if (data?.trim()?.length === 0) {
                                    const selectedCache = relatedUser?.find(x => x.maNhanVien === nguoithuchiRef?.current);
                                    if (selectedCache) {
                                        const relatedUserList = [...relatedUser?.slice(0, 20)?.map(x => ({
                                            id: x?.maNhanVien,
                                            name: patternLabelRelatedUser(x),
                                        })), ...[{
                                            id: selectedCache?.maNhanVien,
                                            name: patternLabelRelatedUser(selectedCache),
                                        }]]
                                        componentData.nguoilienquan2 = relatedUserList;
                                        setComponentData({ ...componentData })
                                    }
                                    else {
                                        const relatedUserList = [...relatedUser?.slice(0, 20)?.map(x => ({
                                            id: x?.maNhanVien,
                                            name: patternLabelRelatedUser(x),
                                        }))]
                                        componentData.nguoilienquan2 = relatedUserList;
                                        setComponentData({ ...componentData })
                                    }
                                }
                                else {
                                    const relatedUserList = [...relatedUser?.filter(x =>
                                        (x?.email?.indexOf(data) !== -1 || removeAccents(x.maNhanVien)?.toLowerCase()?.indexOf(removeAccents(data)?.toLowerCase()) !== -1 || removeAccents((x?.hoTenDemNhanVien + ' ' + x?.tenNhanVien))?.toLowerCase()?.indexOf(removeAccents(data)?.toLowerCase()) !== -1))?.map(x => ({
                                            id: x?.maNhanVien,
                                            name: patternLabelRelatedUser(x),
                                        }))]
                                    componentData.nguoilienquan2 = relatedUserList;
                                    setComponentData({ ...componentData });
                                }
                            }, 1000);
                        }}
                        value={modelData?.approved_by}
                        isPortal
                        options={componentData?.nguoilienquan2}
                    />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Qu???n l?? tr???c ti???p</label>
                    <InputControl disabled={true} type="text" id="quanlytructiep"
                        defaultValue={modelData?.quanlytructiep ?
                            `${modelData?.quanlytructiepModel?.maNhanVien} - ${modelData?.quanlytructiepModel?.hoTenDemNhanVien} ${modelData?.quanlytructiepModel?.tenNhanVien} - ${modelData?.quanlytructiepModel?.tenChucDanhMoiNhat}`
                            : `${captren?.maNhanVien} - ${captren?.hoTenDemNhanVien} ${captren?.tenNhanVien} - ${captren?.tenChucDanhMoiNhat}`}
                    />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">??VKD y??u c???u</label>
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
            </div>
            <div className='form-row row'>
                <div class="form-group col-lg-4">
                    <label for="">T??n y??u c???u</label>
                    <InputControl disabled={isDisabledControl()} type="text" id="name" defaultValue={modelData?.req_name} onChange={(e) => {
                        overwriteModel('req_name', e?.target?.value)
                    }} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Ng??y y??u c???u</label>
                    {
                        <DateTimeInput selected={modelData?.req_date ? new Date(modelData?.req_date) : new Date()}
                            disabled={isDisabledControl()}
                            isDefaultEmpty
                            isPortal
                            id="startDate" isOnlyDate={true} onChange={(data) => {
                                overwriteModel('req_date', data)
                            }} />
                    }

                </div>
                <div className="form-group col-lg-4">
                    <label for="">Lo???i Y??u c???u</label>
                    <SelectBox id="selectbox"
                        isDisabled={isDisabledControl()}
                        optionLabel="master_name"
                        optionValue="id"
                        onChange={(data) => {
                            overwriteModel('type_req_ID', data)
                        }}
                        value={modelData?.type_req_ID}
                        isPortal
                        options={componentData.loaiyeucau}
                    />
                </div>
            </div>
            <div className='form-row row'>
                <div class="form-group col-lg-12">
                    <label for="">M?? t???</label>
                    <InputControl disabled={isDisabledControl()} type="textarea" id="name" defaultValue={modelData?.desc} onChange={(e) => {
                        const value = e.target.value ?? '';
                        overwriteModel('desc', value)
                    }} defaultValue={modelData?.desc} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Lo???i ti???n</label>
                    <GroupBoxComponent
                        disabled={isDisabledControl()}
                        isShowTextBox={true}
                        setData={setTypeCurrencyData}
                        data={componentData.loaitien} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Ng?????i li??n quan</label>
                    <GroupBoxComponent
                        onSearch={onSearchRelatedUser}
                        disabled={isDisabledControl()}
                        isShowTextBox={false}
                        setData={setTypeRelatedUserData}
                        data={componentData?.nguoilienquan} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Chuy???n th???c thi</label>
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
            {
                <Modal
                    isOpen={modal.isOpen}
                    modalName="role-modal"
                    showOverlay={true}
                    onClose={() => resetModal()}
                    title="L?? do t??? ch???i"
                    size="md"
                    centered
                >
                    <Modal.Body>
                        <section className="section priority-user-content">
                            <div className="form-row row">
                                <div className="form-group col-lg-12">
                                    <label for="">M?? t???</label>
                                    <InputControl type="textarea" id="name" onChange={(e) => {
                                        const value = e.target.value ?? '';
                                        modal.data = { lydotuchoi: value };
                                        setModal({ ...modal })
                                    }} />
                                </div>
                            </div>
                        </section>
                    </Modal.Body>
                    <Modal.Footer>
                        <div class="button-bottom">
                            <button className="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                                resetModal()
                            }}>????ng</button>

                            <button className="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                                const statusId = findStatus("cancel")?.id;
                                if (statusId) {
                                    overwriteModel('statusID', statusId)
                                    overwriteModel('lydotuchoi', modal.data?.lydotuchoi ?? null)
                                    updateStatusTicketRequired(statusId, modal.data?.lydotuchoi ?? null)
                                }
                                resetModal();
                            }}>
                                X??c nh???n
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            }
            {/* //modal LXQ */}
            {
                <Modal
                    isOpen={modalLXQ.isOpen}
                    modalName="role-modal"
                    showOverlay={true}
                    onClose={() => resetModalLXQ()}
                    title="L???nh xu???t qu???"
                    size="md"
                    centered
                >
                    <Modal.Body>
                        <section className="section priority-user-content">
                            <div className="form-row row">
                                <div className="form-group col-lg-12">
                                    <label for="">S??? l?????ng l???nh xu???t qu??? c???n t???o</label>
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
                            }}>????ng</button>

                            <button className="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                                PostLXQQuantity({
                                    id: id,
                                    quantity: modalLXQ.data?.quantity
                                }).then((res) => {
                                    addToast(<div className="text-center">
                                        T???o l??nh xu???t qu??? th??nh c??ng
                                    </div>, { appearance: 'success' });
                                    setTimeout(() => {
                                        router.reload();
                                    }, 0);
                                }).catch((err) => {
                                    addToast(<div className="text-center">
                                        L??u th???t b???i
                                    </div>, { appearance: 'error' });
                                })
                                resetModalLXQ();
                            }}>
                                T???o
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            }
            {/* //danh sach lenh xuat quy */}
            {
                (id && modelData?.lxq?.length > 0) &&
                <ListFundRelaseBelongs id={id} datalxq={modelData?.lxq} />
            }
        </section>
    );
}

export default TicketRequiredComponent;