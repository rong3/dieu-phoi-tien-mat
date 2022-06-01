import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import GroupBoxComponent from "../../../../../shared/groupBox/groupBox"
import SelectBox from "../../../../../../shared/packages/control/selectBox/selectBox"
import { InputControl } from "../../../../../../shared/packages/control/input/inputControl"
import DateTimeInput from "../../../../../../shared/packages/control/input/datetime"
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import PrioritySelect from "../../../../../common/PrioritySelect/PrioritySelect"
import { GetLXQById, UpdateLXQById, UpdateStatusLXQ, PostLXQ } from "../../../../../../services/dptm/lenhxuatquy"
import { GetYCTiepNopQuy } from "../../../../../../services/dptm/yeucautiepnopquy"
import { removeAccents } from "../../../../../../services/dptm/commonService"
import { useAuth } from "../../../../../../shared/packages/provider/authBase"

function FundReleaseContainer(props) {
    const { id, selected, parentData, setParentData } = props;
    const router = useRouter()
    const { addToast } = useToasts();
    const auth = useAuth();
    const { masterData, relatedUser, dsnv3kv, captren } = useSelector((state) => state.masterData);
    const [componentData, setComponentData] = useState({
        dvkd: [],
        loaiyeucau: [],
        loaitien: [],
        khuvuc: [],
        uutien: [],
        trangthai: [],
        nguoilienquan: [],
        nguoilienquan2: [],
        kiemngan: [],
        taixe: [],
        baove: [],
        listyctnq: []
    })
    const [modelData, setModelData] = useState({
        masterAttributes: [],
        nguoiLienQuan: [],
        chuyenthucthi_ID: null
    })
    const nguoithuchiRef = useRef(null)

    useEffect(() => {
        if (id) {
            GetLXQById(id).then((res) => {
                const data = res?.data ?? null;
                if (data) {
                    if (parentData && setParentData) {
                        setParentData({ ...parentData, data: { ...data } })
                    }
                    setModelData({ ...modelData, ...data })
                }
            })
        }
        else {
            GetYCTiepNopQuy().then((res) => {
                const statusFind = findStatus('received');
                const convert = res?.data?.filter(x => x.statusID === statusFind?.id)?.map(x => ({
                    id: x?.id,
                    name: `${x?.req_code} - ${x?.req_name}`
                })) ?? [];
                componentData.listyctnq = convert;
                setComponentData({ ...componentData })
            }).catch((err) => {
                console.log({ err });
            })
        }
    }, [id])

    useEffect(() => {
        try {
            if (relatedUser?.length > 0 && masterData?.length > 0 && dsnv3kv) {
                //get list don vi kinh doanh
                const dvkdList = masterData?.filter(x => x?.category === 'dvkd')?.sort((a, b) => a?.master_name - b?.master_name)?.map((item) => ({
                    id: item?.id,
                    label: `${item?.master_name} - ${JSON.parse(item?.extra_data)?.name ?? ''}`
                }));

                //get list loai ye cau
                const lycList = masterData?.filter(x => x?.category === 'yeucaulxq')

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
                const relatedUserList = [...relatedUser?.slice(0, 20)?.map(x => ({
                    id: x?.maNhanVien,
                    name: `${x?.maNhanVien} ${x?.hoTenDemNhanVien} ${x?.tenNhanVien} - ${x?.tenChucDanhMoiNhat}`,
                    checked: false
                }))]

                //get taixe kiemngan bao ve
                const baoveList = dsnv3kv?.filter(x => x?.chucdanh === 'Bảo vệ')?.map((item) => {
                    return {
                        id: item?.id,
                        name: `${item?.name} - ${item?.chucdanh} - ${item?.socmnd}`,
                    }
                })

                const kiemnganList = dsnv3kv?.filter(x => x?.chucdanh === 'Kiểm ngân')?.map((item) => {
                    return {
                        id: item?.id,
                        name: `${item?.name} - ${item?.chucdanh} - ${item?.socmnd}`,
                    }
                })

                const taixeList = dsnv3kv?.filter(x => x?.chucdanh === 'Tài xế')?.map((item) => {
                    return {
                        id: item?.id,
                        name: `${item?.name} - ${item?.chucdanh} - ${item?.socmnd}`,
                    }
                })

                componentData.dvkd = dvkdList;
                componentData.loaiyeucau = lycList;
                componentData.loaitien = currencyList;
                componentData.khuvuc = khuvucList;
                componentData.uutien = priorityList;
                componentData.trangthai = statusList;
                componentData.nguoilienquan = relatedUserList;
                componentData.baove = baoveList;
                componentData.kiemngan = kiemnganList;
                componentData.taixe = taixeList;

                //default value
                if (modelData) {
                    modelData?.masterAttributes?.map((x) => {
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
                        ...modelData, nguoiLienQuan: [
                            ...(modelData?.nguoiLienQuan ?? [])?.map((x) => {
                                const find = relatedUser?.find(m => m?.maNhanVien === x?.nguoiLienQuan_ID || m?.maNhanVien === x?.id) ?? null
                                return {
                                    id: find?.maNhanVien,
                                    name: `${find?.maNhanVien} ${find?.hoTenDemNhanVien} ${find?.tenNhanVien} - ${find?.tenChucDanhMoiNhat}`,
                                    checked: true
                                }
                            })
                        ]
                    })

                    componentData.nguoilienquan = [...relatedUser.filter(x => modelData?.nguoiLienQuan?.map(m => m?.nguoiLienQuan_ID || m?.id)?.includes(x?.maNhanVien))?.map((item => ({
                        id: item?.maNhanVien,
                        name: `${item?.maNhanVien} ${item?.hoTenDemNhanVien} ${item?.tenNhanVien} - ${item?.tenChucDanhMoiNhat}`,
                        checked: true
                    })))
                        , ...componentData.nguoilienquan?.filter(x => !modelData?.nguoiLienQuan?.map(y => y.nguoiLienQuan_ID)?.includes(x?.id))];
                }

                setComponentData({ ...componentData });
            }
        }
        catch (err) { console.log({ err }); }
    }, [masterData, relatedUser, dsnv3kv, modelData?.id])

    useEffect(() => {
        const findMerger = relatedUser?.find(x => x?.maNhanVien === modelData?.nguoi_lien_quan_id);
        if (findMerger) {
            componentData.nguoilienquan2 = [
                {
                    id: findMerger?.maNhanVien,
                    name: `${findMerger?.maNhanVien} ${findMerger?.hoTenDemNhanVien} ${findMerger?.tenNhanVien} - ${findMerger?.tenChucDanhMoiNhat}`,
                    checked: true
                }
                , ...componentData.nguoilienquan?.filter(x => x.id !== modelData?.nguoi_lien_quan_id)];
        }
        else {
            componentData.nguoilienquan2 = [...componentData.nguoilienquan];
        }
        setComponentData({ ...componentData });
    }, [modelData?.nguoi_lien_quan_id, relatedUser])

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
        const status = findStatusByID(modelData?.status)?.code ?? null
        if (['approved', 'waitapproved', 'cancel', 'received', 'complete'].includes(status)) {
            return true
        }
        return false;
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
        modelData[key] = value;
        setModelData({ ...modelData })
    }

    //logic button
    const statusRenderCTA = () => {
        const statusCode = findStatusByID(modelData?.status)?.code ?? null
        switch (statusCode) {
            case 'draft': return ['update', 'waitapproved']
            case 'inprogress': return ['update', 'waitapproved']
            case 'addition': return ['update', 'waitapproved']
            case 'waitapproved': return ['addition', 'approved']
            case 'approved': return ['complete']
            case 'complete': return []
            default: return ['draft', 'add']
        }
    }

    const roleButton = (type) => {
        const roleData = modelData?.quanlytructiep === auth?.user?.manv ? 'qltt' : 'user';
        if (['qltt'].includes(roleData)) {
            return ['addition', 'approved', 'complete']?.includes(type)
        }
        if (['user'].includes(roleData)) {
            return ['update', 'waitapproved', 'draft', 'add']?.includes(type)
        }
        return true;
    }

    const typeButtonRender = (type) => {
        if (type === 'draft' && roleButton(type)) {
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const draftId = findStatus('draft')?.id;
                if (draftId) {
                    overwriteModel('status', draftId)
                    insertLXQ(modelData)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Lưu nháp</span>
            </button>
        }
        if (type === 'add' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("waitapproved")?.id;
                    if (statusId) {
                        overwriteModel('status', statusId)
                        insertLXQ(modelData)
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
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                updateLXQ(modelData)
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Cập nhật</span>
            </button>
        }
        if (type === 'waitapproved' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("waitapproved")?.id;
                if (statusId) {
                    overwriteModel('status', statusId)
                    updateStatusLXQ(statusId)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Chuyển duyệt</span>
            </button>
        }

        if (type === 'addition' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("addition")?.id;
                if (statusId) {
                    overwriteModel('status', statusId)
                    updateStatusLXQ(statusId)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Yêu cầu bổ sung</span>
            </button>
        }

        if (type === 'approved' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("approved")?.id;
                if (statusId) {
                    overwriteModel('status', statusId)
                    updateStatusLXQ(statusId)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Phê duyệt</span>
            </button>
        }

        if (type === 'complete' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("complete")?.id;
                if (statusId) {
                    overwriteModel('status', statusId)
                    updateStatusLXQ(statusId)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Hoàn tất</span>
            </button>
        }
    }

    const insertLXQ = (model) => {
        const convertModel = {
            lxq: { ...model, quanlytructiep: captren?.maNhanVien, submit_by: auth?.user?.manv },
            MasterAttributes: model?.masterAttributes?.map(y => {
                return {
                    "master_id": y?.id,
                    "attributes": JSON.stringify({
                        amount: y?.data ? Number.parseInt(y?.data) : null,
                        checked: y?.checked ?? false
                    })
                }
            }),
            nguoiLienQuan: model?.nguoiLienQuan?.filter(x => x?.checked)?.map(y => {
                return {
                    "nguoiLienQuan_ID": y?.id,
                }
            }),
        }

        PostLXQ(convertModel).then((res) => {
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

    const updateStatusLXQ = (status) => {
        const data = {
            id: id,
            status: status,
        }
        UpdateStatusLXQ(data).then((res) => {
            addToast(<div className="text-center">
                Cập nhật thành công
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                Cập nhật thất bại
            </div>, { appearance: 'error' });
        })
    }

    const updateLXQ = (model) => {
        const convertModel = {
            LXQ: { ...model, quanlytructiep: captren?.maNhanVien },
            MasterAttributes: model?.masterAttributes?.map(y => {
                return {
                    "id": y?.primaryId ?? y?.id,
                    "attributes": y?.attributes ?? JSON.stringify({
                        amount: y?.data ? Number.parseInt(y?.data) : null,
                        checked: y?.checked ?? false
                    })
                }
            }),
            nguoiLienQuan: model?.nguoiLienQuan?.filter(x => x?.checked)?.map(y => {
                return {
                    "nguoiLienQuan_ID": y?.id,
                }
            }),
        }

        UpdateLXQById(convertModel).then((res) => {
            addToast(<div className="text-center">
                Cập nhật thành công
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                Cập nhật thất bại
            </div>, { appearance: 'error' });
        })
    }

    return (
        <section className="section priority-user-content">
            {
                id &&
                <div className='row'>
                    <span className='status-block'>
                        {`Trạng thái: ${findStatusByID(modelData?.status)?.name ?? ""}`}
                    </span>
                </div>
            }
            <div className='form-row row'>
                <div className='form-group col-md-12'>
                    {
                        id === null &&
                        <div className="form-row row">
                            <div className="col-md-4">
                                <span>Yêu cầu tiếp/nộp quỹ</span>
                                <SelectBox id="selectbox"
                                    optionLabel="name"
                                    optionValue="id"
                                    isDisabled={isDisabledControl()}
                                    onChange={(data) => {
                                        overwriteModel('yc_tiepnopquy_id', data)
                                    }}
                                    value={modelData?.yc_tiepnopquy_id}
                                    isPortal
                                    options={componentData.listyctnq}
                                />
                            </div>
                        </div>
                    }
                    <div className="form-row row">
                        <div class="form-group col-md-4">
                            <span>Ưu tiên</span>
                            <PrioritySelect isDisabled={isDisabledControl()} value={modelData?.priorityID} data={componentData.uutien} onChange={(data) => {
                                overwriteModel('priorityID', data)
                            }} />
                        </div>
                        <div class="form-group col-lg-4">
                            <span>Quản lý trực tiếp</span>
                            <InputControl disabled={true} type="text" id="quanlytructiep"
                                defaultValue={modelData?.quanlytructiep ?
                                    `${modelData?.quanlytructiep}`
                                    : `${captren?.maNhanVien} - ${captren?.hoTenDemNhanVien} ${captren?.tenNhanVien} - ${captren?.tenChucDanhMoiNhat}`}
                            />
                        </div>
                        <div className="form-group col-lg-4">
                            <span>Loại Yêu cầu</span>
                            <SelectBox id="selectbox"
                                isDisabled={isDisabledControl()}
                                optionLabel="master_name"
                                optionValue="id"
                                onChange={(data) => {
                                    overwriteModel('req_type', data)
                                }}
                                value={modelData?.req_type}
                                isPortal
                                options={componentData.loaiyeucau}
                            />
                        </div>
                    </div>
                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <span>Ngày yêu cầu</span>
                            <DateTimeInput selected={modelData?.req_date ? new Date(modelData?.req_date) : null}
                                disabled={isDisabledControl()}
                                isDefaultEmpty
                                isPortal
                                id="startDate" isOnlyDate={true} onChange={(data) => {
                                    overwriteModel('req_date', data)
                                }} />
                        </div>
                        <div className="form-group col-md-6">
                            <span>ĐVKD yêu cầu</span>
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

                        <div className="form-group col-md-6">
                            <span>Ngày thực hiện</span>
                            <DateTimeInput selected={modelData?.perfome_date ? new Date(modelData?.perfome_date) : null}
                                disabled={isDisabledControl()}
                                isDefaultEmpty
                                isPortal
                                id="startDatePerform" isOnlyDate={true} onChange={(data) => {
                                    overwriteModel('perfome_date', data)
                                }} />
                        </div>
                        <div className="form-group col-md-6">
                            <span>ĐVKD thực hiện</span>
                            <SelectBox id="selectboxdvkd"
                                isDisabled={isDisabledControl()}
                                optionLabel="label"
                                optionValue="id"
                                onChange={(data) => {
                                    const value = data ?? '';
                                    overwriteModel('dvkd_perfome', value)
                                }}
                                value={modelData?.dvkd_perfome}
                                isPortal
                                options={componentData.dvkd}
                            />
                        </div>
                    </div>
                    <div className='form-row row'>
                        <div className="form-group col-md-4">
                            <span>Loại tiền</span>
                            <GroupBoxComponent
                                disabled={isDisabledControl()}
                                isShowTextBox={true}
                                setData={setTypeCurrencyData}
                                data={componentData.loaitien} />
                        </div>
                        <div className="form-group col-md-4">
                            <span>Chuyển thực thi</span>
                            <GroupBoxComponent
                                onSearch={onSearchRelatedUser}
                                disabled={isDisabledControl()}
                                isShowTextBox={false}
                                setData={setTypeRelatedUserData}
                                data={componentData?.nguoilienquan} />
                        </div>
                        <div className="form-group col-md-4">
                            <span>Mô tả</span>
                            <InputControl rows={9} disabled={isDisabledControl()} type="textarea" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                                overwriteModel('desc', value)
                            }} defaultValue={modelData?.desc} />
                        </div>
                    </div>
                    <div className='form-row row'>
                        <div className="form-group col-md-3">
                            <span>Kiểm ngân</span>
                            <SelectBox id="selectbox"
                                optionLabel="name"
                                optionValue="id"
                                isDisabled={isDisabledControl()}
                                onChange={(data) => {
                                    const value = data ?? null;
                                    overwriteModel('kiemngan_id', value)
                                }}
                                value={modelData?.kiemngan_id}
                                isPortal
                                options={componentData.kiemngan}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <span>Tài xế</span>
                            <SelectBox id="selectbox"
                                optionLabel="name"
                                optionValue="id"
                                isDisabled={isDisabledControl()}
                                onChange={(data) => {
                                    const value = data ?? null;
                                    overwriteModel('taixe_id', value)
                                }}
                                value={modelData?.taixe_id}
                                isPortal
                                options={componentData.taixe}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <span>Bảo vệ</span>
                            <SelectBox id="selectbox"
                                optionLabel="name"
                                optionValue="id"
                                isDisabled={isDisabledControl()}
                                onChange={(data) => {
                                    const value = data ?? null;
                                    overwriteModel('baove_id', value)
                                }}
                                value={modelData?.baove_id}
                                isPortal
                                options={componentData.baove}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <span>Người liên quan</span>
                            <SelectBox id="selectbox"
                                optionLabel="name"
                                optionValue="id"
                                isDisabled={isDisabledControl()}
                                onChange={(data) => {
                                    overwriteModel('nguoi_lien_quan_id', data)
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
                                                    name: `${x?.maNhanVien} ${x?.hoTenDemNhanVien} ${x?.tenNhanVien} - ${x?.tenChucDanhMoiNhat}`,
                                                })), ...[{
                                                    id: selectedCache?.maNhanVien,
                                                    name: `${selectedCache?.maNhanVien} ${selectedCache?.hoTenDemNhanVien} ${selectedCache?.tenNhanVien} - ${selectedCache?.tenChucDanhMoiNhat}`,
                                                }]]
                                                componentData.nguoilienquan2 = relatedUserList;
                                                setComponentData({ ...componentData })
                                            }
                                            else {
                                                const relatedUserList = [...relatedUser?.slice(0, 20)?.map(x => ({
                                                    id: x?.maNhanVien,
                                                    name: `${x?.maNhanVien} ${x?.hoTenDemNhanVien} ${x?.tenNhanVien} - ${x?.tenChucDanhMoiNhat}`,
                                                }))]
                                                componentData.nguoilienquan2 = relatedUserList;
                                                setComponentData({ ...componentData })
                                            }
                                        }
                                        else {
                                            const relatedUserList = [...relatedUser?.filter(x =>
                                                (removeAccents(x.maNhanVien)?.toLowerCase()?.indexOf(removeAccents(data)?.toLowerCase()) !== -1 || removeAccents((x?.hoTenDemNhanVien + ' ' + x?.tenNhanVien))?.toLowerCase()?.indexOf(removeAccents(data)?.toLowerCase()) !== -1))?.map(x => ({
                                                    id: x?.maNhanVien,
                                                    name: `${x?.maNhanVien} ${x?.hoTenDemNhanVien} ${x?.tenNhanVien} - ${x?.tenChucDanhMoiNhat}`,
                                                }))]
                                            componentData.nguoilienquan2 = relatedUserList;
                                            setComponentData({ ...componentData });
                                        }
                                    }, 1000);
                                }}
                                value={modelData?.nguoi_lien_quan_id}
                                isPortal
                                options={componentData?.nguoilienquan2}
                            />
                        </div>
                    </div>
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
        </section>
    );
}

export default FundReleaseContainer;