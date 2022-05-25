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

function VehicleRequiredComponent(props) {
    const { id, remoteData } = props;
    const { addToast } = useToasts();

    const { masterData, relatedUser } = useSelector((state) => state.masterData);

    const [modelData, setModelData] = useState({
        masterAttributes: [],
        nguoiLienQuan: [],
    })

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
        modelData.nguoiLienQuan = data;
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
                //get list loai ye cau
                const lycList = masterData?.filter(x => x?.category === 'loaiyeucauhtx')
                const ycList = masterData?.filter(x => x?.category === 'yeucauhtx')
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

    const isDisabledControl = () => {
        const status = findStatusByID(modelData?.statusID)?.code ?? null
        if (['approved', 'waitapproved', 'cancel', 'received', 'inprogress'].includes(status)) {
            return true
        }
        return false;
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
                id &&
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
                    <span for="">Ưu tiên</span>
                    <PrioritySelect isDisabled={isDisabledControl()} value={modelData?.priorityID} data={componentData.uutien} onChange={(data) => {
                        overwriteModel('priorityID', data)
                    }} />
                </div>
                <div className="form-group col-md-4">
                    <span>Loại Yêu cầu</span>
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
                <div className="form-group col-md-4">
                    <span>Tên khách hàng</span>
                    <InputControl disabled={isDisabledControl()} type="text" id="name" onChange={(e) => {
                        const value = e.target.value ?? '';
                    }} defaultValue={null} />
                </div>
                <div className="form-group col-md-4">
                    <span>Tên yêu cầu</span>
                    <InputControl disabled={isDisabledControl()} type="text" id="name" onChange={(e) => {
                        const value = e.target.value ?? '';
                    }} defaultValue={null} />
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
                    <DateTimeInput selected={new Date()}
                        isDefaultEmpty
                        disabled={isDisabledControl()}
                        isPortal
                        id="startDate" isOnlyDate={false} onChange={(data) => {

                        }} />
                </div>
                <div className="form-group col-md-4">
                    <span>Địa điểm</span>
                    <InputControl disabled={isDisabledControl()} type="text" id="name" onChange={(e) => {
                        const value = e.target.value ?? '';
                    }} defaultValue={null} />
                </div>
                <div className="form-group col-md-4">
                    <span>Nộp quỹ</span>
                    <SelectBox disabled={isDisabledControl()} id="selectbox"
                        optionLabel="name"
                        optionValue="id"
                        onChange={(data) => {
                        }}
                        value={null}
                        isPortal
                        options={[{ id: true, name: 'Có' }, { id: false, name: 'Không' }]}
                    />
                </div>
                <div className="form-group col-md-12">
                    <span>Mô tả</span>
                    <InputControl disabled={isDisabledControl()} type="textarea" id="name" onChange={(e) => {
                        const value = e.target.value ?? '';
                    }} defaultValue={null} />
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
            {
                id &&
                <ListVehicleBelongs id={id} />
            }
        </section>
    );
}

export default VehicleRequiredComponent;