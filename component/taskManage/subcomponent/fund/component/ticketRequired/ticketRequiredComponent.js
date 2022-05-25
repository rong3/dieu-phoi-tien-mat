import React, { useState, useEffect } from 'react'
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

function TicketRequiredComponent(props) {
    const { id, remoteData } = props;
    const { addToast } = useToasts();
    const router = useRouter();
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
    const { masterData, relatedUser } = useSelector((state) => state.masterData);
    const [componentData, setComponentData] = useState({
        dvkd: [],
        loaiyeucau: [],
        loaitien: [],
        khuvuc: [],
        uutien: [],
        trangthai: [],
        nguoilienquan: []
    })

    const [modelData, setModelData] = useState({
        //loaitien
        masterAttributes: [],
        nguoiLienQuan: [],
        chuyenthucthi_ID: null
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
                const currencyList = masterData?.filter(x => x?.category === 'loaitien')?.map((item) => {
                    return {
                        id: item?.id,
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



    const overwriteModel = (key, value) => {
        modelData[key] = value;
        setModelData({ ...modelData })
    }

    //func for groupbox
    const setTypeCurrencyData = (data) => {
        modelData.typeCurrency = data;
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
            ...model,
            masterAttributes: model?.typeCurrency?.map(y => {
                return {
                    "master_id": y?.id,
                    "category": "NopQuy",
                    "attributes": JSON.stringify({
                        amount: y?.data ? Number.parseInt(y?.data) : null,
                        checked: y?.checked ?? false
                    })
                }
            }),
            nguoiLienQuan: model?.nguoiLienQuan?.map(y => {
                return {
                    "nguoiLienQuan_ID": y?.id,
                    "category": "NopQuy"
                }
            }),
        }
        console.log({ convertModel });
        TaoMoiYCTiepNopQuy(convertModel).then((res) => {
            addToast(<div className="text-center">
                Lưu thành công
            </div>, { appearance: 'success' });
            router.replace("/")
        }).catch((err) => {
            addToast(<div className="text-center">
                Lưu thất bại
            </div>, { appearance: 'error' });
        })
    }

    const updateTicketRequired = (model) => {
        const convertModel = {
            ...model,
            masterAttributes: model?.typeCurrency?.map(y => {
                return {
                    "master_id": y?.id,
                    "category": "NopQuy",
                    "attributes": JSON.stringify({
                        amount: y?.data ? Number.parseInt(y?.data) : null,
                        checked: y?.checked ?? false
                    })
                }
            }),
            nguoiLienQuan: model?.nguoiLienQuan?.map(y => {
                return {
                    "nguoiLienQuan_ID": y?.id,
                    "category": "NopQuy"
                }
            }),
        }
        console.log({ convertModel });
        CapNhatYCTiepNopQuy(id, convertModel).then((res) => {
            addToast(<div className="text-center">
                Cập nhật thành công
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                Cập nhật thất bại
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
                Cập nhật thành công
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                Cập nhật thất bại
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

    const typeButtonRender = (type) => {
        if (type === 'draft') {
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const draftId = findStatus('draft')?.id;
                if (draftId) {
                    overwriteModel('statusID', draftId)
                    insertTicketRequired(modelData)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Lưu nháp</span>
            </button>
        }

        if (type === 'waitapproved') {
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("waitapproved")?.id;
                if (statusId) {
                    overwriteModel('statusID', statusId)
                    updateStatusTicketRequired(statusId);
                }
            }}>
                <img src="/asset/images/icons/send.svg" alt="" />
                <span>Chuyển duyệt</span>
            </button>
        }
        if (type === 'add') {
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
                    Tạo yêu cầu
                </span>
            </button>
        }
        if (type === 'update') {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    if (id) {
                        updateTicketRequired(modelData);
                    }
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Cập nhật yêu cầu
                </span>
            </button>
        }
        if (type === 'addition') {
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
                    Yêu cầu bổ sung
                </span>
            </button>
        }
        if (type === 'approved') {
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
                    Duyệt yêu cầu
                </span>
            </button>
        }
        if (type === 'inprogress') {
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
                    Tiếp nhận
                </span>
            </button>
        }
        if (type === 'cancel') {
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
        if (type === 'received') {
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
                    Tiếp nhận
                </span>
            </button>
        }
        if (type === 'taolxq') {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    setModalLXQ({ ...modalLXQ, isOpen: true, data: { quantity: null } })
                }}
            >
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>
                    Tạo lệnh xuất quỹ
                </span>
            </button>
        }
    }

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
                    && (x.maNhanVien?.toLowerCase()?.indexOf(data?.toLowerCase()) !== -1 || (x?.hoTenDemNhanVien + ' ' + x?.tenNhanVien)?.toLowerCase()?.indexOf(data?.toLowerCase()) !== -1))?.map(x => ({
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
                modelData?.lydotuchoi &&
                <div className='form-row row'>
                    <div class="form-group col-lg-12">
                        <label style={{ color: 'red' }} for=""><b>*Lý do từ chối</b></label>
                        <InputControl disabled={true} type="textarea" id="name" defaultValue={modelData?.lydotuchoi} onChange={(e) => {
                        }} />
                    </div>
                </div>
            }
            <div className='form-row row'>
                <div class="form-group col-lg-4">
                    <label for="">Ưu tiên</label>
                    <PrioritySelect isDisabled={isDisabledControl()} value={modelData?.priorityID} data={componentData.uutien} onChange={(data) => {
                        overwriteModel('priorityID', data)
                    }} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">ĐVKD yêu cầu</label>
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
            {/* <div class="form-group col-lg-4">
                    <label for="">Tên ĐVKD yêu cầu</label>
                    <InputControl type="text" id="name" disabled />
                </div> */}
            <div className='form-row row'>
                <div class="form-group col-lg-4">
                    <label for="">Tên yêu cầu</label>
                    <InputControl disabled={isDisabledControl()} type="text" id="name" defaultValue={modelData?.req_name} onChange={(e) => {
                        overwriteModel('req_name', e?.target?.value)
                    }} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Ngày yêu cầu</label>
                    {
                        <DateTimeInput selected={modelData?.req_date ? new Date(modelData?.req_date) : null}
                            disabled={isDisabledControl()}
                            isDefaultEmpty
                            isPortal
                            id="startDate" isOnlyDate={true} onChange={(data) => {
                                overwriteModel('req_date', data)
                            }} />
                    }

                </div>
                <div className="form-group col-lg-4">
                    <label for="">Loại Yêu cầu</label>
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
                    <label for="">Mô tả</label>
                    <InputControl disabled={isDisabledControl()} type="textarea" id="name" defaultValue={modelData?.desc} onChange={(e) => {
                        const value = e.target.value ?? '';
                        overwriteModel('desc', value)
                    }} defaultValue={modelData?.desc} />
                </div>
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
                <div class="form-group col-lg-4">
                    <label for="">Chuyển thực thi</label>
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
                    title="Lý do từ chối"
                    size="md"
                    centered
                >
                    <Modal.Body>
                        <section className="section priority-user-content">
                            <div className="form-row row">
                                <div className="form-group col-lg-12">
                                    <label for="">Mô tả</label>
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
                            }}>Đóng</button>

                            <button className="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                                const statusId = findStatus("cancel")?.id;
                                if (statusId) {
                                    overwriteModel('statusID', statusId)
                                    overwriteModel('lydotuchoi', modal.data?.lydotuchoi ?? null)
                                    updateStatusTicketRequired(statusId, modal.data?.lydotuchoi ?? null)
                                }
                                resetModal();
                            }}>
                                Xác nhận
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
                    title="Lệnh xuất quỹ"
                    size="md"
                    centered
                >
                    <Modal.Body>
                        <section className="section priority-user-content">
                            <div className="form-row row">
                                <div className="form-group col-lg-12">
                                    <label for="">Số lượng lệnh xuất quỹ cần tạo</label>
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
                                PostLXQQuantity({
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
            {/* //danh sach lenh xuat quy */}
            {
                (id && modelData?.lxq?.length > 0) &&
                <ListFundRelaseBelongs id={id} datalxq={modelData?.lxq} />
            }
        </section>
    );
}

export default TicketRequiredComponent;