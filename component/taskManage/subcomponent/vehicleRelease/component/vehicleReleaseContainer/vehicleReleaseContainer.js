import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import GroupBoxComponent from "../../../../../shared/groupBox/groupBox"
import SelectBox from "../../../../../../shared/packages/control/selectBox/selectBox"
import { InputControl } from "../../../../../../shared/packages/control/input/inputControl"
import DateTimeInput from "../../../../../../shared/packages/control/input/datetime"
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import PrioritySelect from "../../../../../common/PrioritySelect/PrioritySelect"
import { removeAccents } from "../../../../../../services/dptm/commonService"
import { GetPYCHTXById, UpdatePYCHTXById, UpdateStatusPYCHTX, PostPYCHTX } from "../../../../../../services/dptm/phieuychtx"
import { GetYCXe } from "../../../../../../services/dptm/yeucauxe"
import { useAuth } from "../../../../../../shared/packages/provider/authBase"
import { chucdanhenum } from "../../../../../../config/chucdanh"
import { patternLabelRelatedUser, onSeachCommon } from "../../../../../../utils/common"

function VehicleReleaseContainer(props) {
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
        chuyenthucthi_ID: null,
        perfome_date: new Date()
    })
    const nguoithuchiRef = useRef(null)

    useEffect(() => {
        if (id) {
            GetPYCHTXById(id).then((res) => {
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
            GetYCXe({
                "type": null,
                "req_code": null,
                "uutien": null
            }).then((res) => {
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
                const relatedUserList = [...relatedUser?.slice(0, 20)?.map(x => ({
                    id: x?.maNhanVien,
                    name: patternLabelRelatedUser(x),
                    checked: false
                }))]

                //get taixe kiemngan bao ve
                const baoveList = dsnv3kv?.filter(x => x?.chucdanh === 'B???o v???')?.map((item) => {
                    return {
                        id: item?.id,
                        name: `${item?.name} - ${item?.chucdanh} - ${item?.socmnd}`,
                    }
                })

                const kiemnganList = dsnv3kv?.filter(x => x?.chucdanh === 'Ki???m ng??n')?.map((item) => {
                    return {
                        id: item?.id,
                        name: `${item?.name} - ${item?.chucdanh} - ${item?.socmnd}`,
                    }
                })

                const taixeList = dsnv3kv?.filter(x => x?.chucdanh === 'T??i x???')?.map((item) => {
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
                                    name: patternLabelRelatedUser(find),
                                    checked: true
                                }
                            })
                        ]
                    })

                    componentData.nguoilienquan = [...relatedUser.filter(x => modelData?.nguoiLienQuan?.map(m => m?.nguoiLienQuan_ID || m?.id)?.includes(x?.maNhanVien))?.map((item => ({
                        id: item?.maNhanVien,
                        name: patternLabelRelatedUser(item),
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
                    name: patternLabelRelatedUser(findMerger),
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
        onSeachCommon(data, relatedUser, modelData, componentData, setComponentData)
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
        const machucdanh = auth?.user?.machucdanh;
        const roleData = modelData?.quanlytructiep === auth?.user?.manv ? 'qltt' : 'user';
        if (['qltt'].includes(roleData) || chucdanhenum.TBPDPTM.includes(machucdanh)) {
            return ['addition', 'approved']?.includes(type)
        }
        if (['user'].includes(roleData)) {
            if (chucdanhenum.CVDPTM.includes(machucdanh)
            ) {
                return ['update', 'waitapproved', 'complete', 'draft', 'add']?.includes(type)
            }
        }
        return false;
    }

    const typeButtonRender = (type) => {
        if (type === 'draft' && roleButton(type)) {
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const draftId = findStatus('draft')?.id;
                if (draftId) {
                    overwriteModel('status', draftId)
                    insertPYCHTX(modelData)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>L??u nh??p</span>
            </button>
        }
        if (type === 'add' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0"
                onClick={() => {
                    const statusId = findStatus("waitapproved")?.id;
                    if (statusId) {
                        overwriteModel('status', statusId)
                        insertPYCHTX(modelData)
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
            return <button class="btn btn-draw" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                updatePYCHTX(modelData)
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>C???p nh???t</span>
            </button>
        }
        if (type === 'waitapproved' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("waitapproved")?.id;
                if (statusId) {
                    overwriteModel('status', statusId)
                    updateStatusPYCHTX(statusId)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Chuy???n duy???t</span>
            </button>
        }

        if (type === 'addition' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("addition")?.id;
                if (statusId) {
                    overwriteModel('status', statusId)
                    updateStatusPYCHTX(statusId)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Y??u c???u b??? sung</span>
            </button>
        }

        if (type === 'approved' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("approved")?.id;
                if (statusId) {
                    overwriteModel('status', statusId)
                    updateStatusPYCHTX(statusId)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Ph?? duy???t</span>
            </button>
        }

        if (type === 'complete' && roleButton(type)) {
            return <button class="btn btn-done" style={{ marginLeft: '16px' }} type="button" tabindex="0" onClick={() => {
                const statusId = findStatus("complete")?.id;
                if (statusId) {
                    overwriteModel('status', statusId)
                    updateStatusPYCHTX(statusId)
                }
            }}>
                <img src="/asset/images/icons/draw.svg" alt="" />
                <span>Ho??n t???t</span>
            </button>
        }
    }

    const insertPYCHTX = (model) => {
        const convertModel = {
            ...model,
            quanlytructiep: captren?.maNhanVien,
            submit_by: auth?.user?.manv,
            masterAttributes: model?.masterAttributes?.map(y => {
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

        PostPYCHTX(convertModel).then((res) => {
            addToast(<div className="text-center">
                L??u th??nh c??ng
            </div>, { appearance: 'success' });
            router.replace("/")
        }).catch((err) => {
            addToast(<div className="text-center">
                L??u th???t b???i
            </div>, { appearance: 'error' });
        })
    }

    const updateStatusPYCHTX = (status) => {
        const data = {
            id: id,
            status: status,
        }
        UpdateStatusPYCHTX(data).then((res) => {
            addToast(<div className="text-center">
                C???p nh???t th??nh c??ng
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                C???p nh???t th???t b???i
            </div>, { appearance: 'error' });
        })
    }

    const updatePYCHTX = (model) => {
        const convertModel = {
            ...model,
            quanlytructiep: captren?.maNhanVien,
            masterAttributes: model?.masterAttributes?.map(y => {
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

        UpdatePYCHTXById(convertModel).then((res) => {
            addToast(<div className="text-center">
                C???p nh???t th??nh c??ng
            </div>, { appearance: 'success' });
        }).catch((err) => {
            addToast(<div className="text-center">
                C???p nh???t th???t b???i
            </div>, { appearance: 'error' });
        })
    }

    return (
        <section className="section priority-user-content">
            {
                id &&
                <div className='row'>
                    <span className='status-block'>
                        {`Tr???ng th??i: ${findStatusByID(modelData?.status)?.name ?? ""}`}
                    </span>
                </div>
            }
            {
                id === null &&
                <div className="form-row row">
                    <div className="form-group col-md-6">
                        <span>Y??u c???u h??? tr??? xe</span>
                        <SelectBox id="selectbox"
                            optionLabel="name"
                            optionValue="id"
                            isDisabled={isDisabledControl()}
                            onChange={(data) => {
                                overwriteModel('yc_hotroxe_id', data)
                            }}
                            value={modelData?.yc_hotroxe_id}
                            isPortal
                            options={componentData.listyctnq}
                        />
                    </div>
                </div>
            }
            <div className="form-row row">
                <div class="form-group col-md-6">
                    <span>??u ti??n</span>
                    <PrioritySelect isDisabled={isDisabledControl()} value={modelData?.priorityID} data={componentData.uutien} onChange={(data) => {
                        overwriteModel('priorityID', data)
                    }} />
                </div>
            </div>
            <div className="form-row row">
                <div class="form-group col-lg-6">
                    <span>Qu???n l?? tr???c ti???p</span>
                    <InputControl disabled={true} type="text" id="quanlytructiep"
                        defaultValue={modelData?.quanlytructiep ?
                            `${modelData?.quanlytructiepModel?.maNhanVien} - ${modelData?.quanlytructiepModel?.hoTenDemNhanVien} ${modelData?.quanlytructiepModel?.tenNhanVien} - ${modelData?.quanlytructiepModel?.tenChucDanhMoiNhat}`
                            : `${captren?.maNhanVien} - ${captren?.hoTenDemNhanVien} ${captren?.tenNhanVien} - ${captren?.tenChucDanhMoiNhat}`}
                    />
                </div>
                <div className="form-group col-md-6">
                    <span>??VKD th???c hi???n</span>
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
                <div className="form-group col-md-6">
                    <span>Ng??y th???c hi???n</span>
                    <DateTimeInput selected={modelData?.perfome_date ? new Date(modelData?.perfome_date) : new Date()}
                        disabled={isDisabledControl()}
                        isDefaultEmpty
                        isPortal
                        id="startDatePerform" isOnlyDate={true} onChange={(data) => {
                            overwriteModel('perfome_date', data)
                        }} />
                </div>
                <div className="form-group col-md-6">
                    <span>Bi???n s??? xe</span>
                    <InputControl rows={9} disabled={isDisabledControl()} type="text" id="platenumber" onChange={(e) => {
                        const value = e.target.value ?? '';
                        overwriteModel('platenumber', value)
                    }} defaultValue={modelData?.platenumber} />
                </div>
            </div>
            <div className='form-row row'>
                <div className="form-group col-md-4">
                    <span>Lo???i ti???n</span>
                    <GroupBoxComponent
                        disabled={isDisabledControl()}
                        isShowTextBox={true}
                        setData={setTypeCurrencyData}
                        data={componentData.loaitien} />
                </div>
                <div className="form-group col-md-4">
                    <span>Chuy???n th???c thi</span>
                    <GroupBoxComponent
                        onSearch={onSearchRelatedUser}
                        disabled={isDisabledControl()}
                        isShowTextBox={false}
                        setData={setTypeRelatedUserData}
                        data={componentData?.nguoilienquan} />
                </div>
                <div className="form-group col-md-4">
                    <span>M?? t???</span>
                    <InputControl rows={9} disabled={isDisabledControl()} type="textarea" id="name" onChange={(e) => {
                        const value = e.target.value ?? '';
                        overwriteModel('desc', value)
                    }} defaultValue={modelData?.desc} />
                </div>
            </div>
            <div className='form-row row'>
                <div className="form-group col-md-3">
                    <span>Ki???m ng??n</span>
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
                    <span>T??i x???</span>
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
                    <span>B???o v???</span>
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
                    <span>Ng?????i li??n quan</span>
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
                        value={modelData?.nguoi_lien_quan_id}
                        isPortal
                        options={componentData?.nguoilienquan2}
                    />
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

export default VehicleReleaseContainer;