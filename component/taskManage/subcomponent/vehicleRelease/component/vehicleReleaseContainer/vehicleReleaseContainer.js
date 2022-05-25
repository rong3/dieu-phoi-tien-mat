import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import GroupBoxComponent from "../../../../../shared/groupBox/groupBox"
import SelectBox from "../../../../../../shared/packages/control/selectBox/selectBox"
import { InputControl } from "../../../../../../shared/packages/control/input/inputControl"
import DateTimeInput from "../../../../../../shared/packages/control/input/datetime"
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import PrioritySelect from "../../../../../common/PrioritySelect/PrioritySelect"

function VehicleReleaseContainer(props) {
    const { id } = props;
    const router = useRouter()
    const { addToast } = useToasts();

    const { masterData, relatedUser, dsnv3kv } = useSelector((state) => state.masterData);
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
        try {
            if (relatedUser && masterData?.length > 0 && dsnv3kv) {
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

                const findMerger = relatedUser?.find(x => x?.maNhanVien === modelData?.nguoi_lien_quan_id);
                if (findMerger) {
                    componentData.nguoilienquan2 = [
                        {
                            id: findMerger?.maNhanVien,
                            name: `${findMerger?.maNhanVien} ${findMerger?.hoTenDemNhanVien} ${findMerger?.tenNhanVien} - ${findMerger?.tenChucDanhMoiNhat}`,
                            checked: true
                        }
                        , ...relatedUserList?.filter(x => x.id !== modelData?.nguoi_lien_quan_id)];
                }
                else {
                    componentData.nguoilienquan2 = relatedUserList;
                }
                componentData.baove = baoveList;
                componentData.kiemngan = kiemnganList;
                componentData.taixe = taixeList;
                setComponentData({ ...componentData });
                //default value
            }
        }
        catch (err) { console.log({ err }); }
    }, [masterData, relatedUser, dsnv3kv, modelData?.nguoi_lien_quan_id])

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
        if (['approved', 'waitapproved', 'cancel', 'received', 'inprogress'].includes(status)) {
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
        modelData.nguoiLienQuan = data;
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

    const overwriteModel = (key, value) => {
        modelData[key] = value;
        setModelData({ ...modelData })
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
            {
                id === null &&
                <div className="form-row row">
                    <div className="form-group col-md-4">
                        <span>Yêu cầu HTX</span>
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
            <div className="form-row row">
                <div class="form-group col-md-4">
                    <span>Ưu tiên</span>
                    <PrioritySelect isDisabled={isDisabledControl()} value={modelData?.priorityID} data={componentData.uutien} onChange={(data) => {
                        overwriteModel('priorityID', data)
                    }} />
                </div>
                <div className="form-group col-md-4">
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

                <div className="form-group col-md-4">
                    <span>Ngày thực hiện</span>
                    <DateTimeInput selected={modelData?.perfome_date ? new Date(modelData?.perfome_date) : null}
                        disabled={isDisabledControl()}
                        isDefaultEmpty
                        isPortal
                        id="startDatePerform" isOnlyDate={true} onChange={(data) => {
                            overwriteModel('perfome_date', data)
                        }} />
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
                                        (x.maNhanVien?.toLowerCase()?.indexOf(data?.toLowerCase()) !== -1 || (x?.hoTenDemNhanVien + ' ' + x?.tenNhanVien)?.toLowerCase()?.indexOf(data?.toLowerCase()) !== -1))?.map(x => ({
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
        </section>
    );
}

export default VehicleReleaseContainer;