import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import TicketRequiredComponent from "../../../taskManage/subcomponent/fund/component/ticketRequired/ticketRequiredComponent"
import FundReleaseContainer from "../../../taskManage/subcomponent/fundRelease/component/fundRelaseContainer/fundRelaseContainer"
import VehicleRequiredComponent from "../../../taskManage/subcomponent/vehicle/subComponent/vehicleRequired/vehicleRequiredComponent"
import VehicleReleaseContainer from "../../../taskManage/subcomponent/vehicleRelease/component/vehicleReleaseContainer/vehicleReleaseContainer"
import { TaskCategory } from "./taskCategory"
import { GetYCTiepNopQuyById } from "../../../../services/dptm/yeucautiepnopquy"
import { GetYCXeById, GetModelByVersionSDBS } from "../../../../services/dptm/yeucauxe"
import { GetLXQById } from "../../../../services/dptm/lenhxuatquy"
import { useAuth } from "../../../../shared/packages/provider/authBase"
import { useDispatch, useSelector } from "react-redux";
import { loadCaptren } from "../../../../redux/actions/masterDataAction"

function TaskContainer(props) {
    const { id, modalData, setModelData } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useAuth();
    const [selectedType, setSelectedType] = useState(null)
    const [remoteData, setRemoteData] = useState({
        model: null
    })

    useEffect(() => {
        setSelectedType(modalData.category ?? TaskCategory.TIEPNOPQUY);
    }, [modalData])

    useEffect(() => {
        if (auth?.user) {
            dispatch(loadCaptren({
                manv: auth?.user?.manv
            }));
        }
    }, [auth?.user])



    const renderType = (type) => {
        switch (type) {
            case TaskCategory.TIEPNOPQUY: return <TicketRequiredComponent remoteData={remoteData} {...props} />
            case TaskCategory.LENHXUATQUY: return <FundReleaseContainer parentData={modalData} setParentData={setModelData} fromContainer={true} {...props} />
            case TaskCategory.HOTROXE: return <VehicleRequiredComponent remoteData={remoteData} parentData={modalData}  {...props} />
            case TaskCategory.PHIEUHOTROXE: return <VehicleReleaseContainer parentData={modalData} setParentData={setModelData} fromContainer={true} {...props} />
            default: return <></>
        }
    }

    useEffect(() => {
        if (id) {
            if (selectedType === TaskCategory.TIEPNOPQUY) {
                GetYCTiepNopQuyById(id).then((res) => {
                    const data = res?.data;
                    remoteData.model = data ?? null
                    setRemoteData({ ...remoteData })
                    setModelData({ ...modalData, data: { ...data } })
                }).catch(() => { })
            }
            if (selectedType === TaskCategory.HOTROXE) {
                if (modalData?.version) {
                    GetModelByVersionSDBS({
                        id: id,
                        version: modalData?.version
                    }).then((res) => {
                        const data = res?.data;
                        remoteData.model = { ...data, id: id } ?? null
                        setRemoteData({ ...remoteData })
                        setModelData({ ...modalData, data: { ...data } })
                    }).catch(() => { })
                }
                else
                    GetYCXeById(id).then((res) => {
                        const data = res?.data;
                        remoteData.model = data ?? null
                        setRemoteData({ ...remoteData })
                        setModelData({ ...modalData, data: { ...data } })
                    }).catch(() => { })
            }
        }
    }, [id, selectedType,modalData?.version])

    return (
        <form class="wrap-form">
            {
                modalData?.type === 'new' &&
                <div className='form-row row'>
                    <div class="form-group col-lg-2">
                        <label for="category">Danh mục yêu cầu</label>
                        <select id="category" className='select-custom' defaultValue={selectedType} onChange={(e) => {
                            setSelectedType(e.target.value)
                        }}>
                            <option value={TaskCategory.TIEPNOPQUY}>Tiếp/nộp quỹ</option>
                            <option value={TaskCategory.LENHXUATQUY}>Lệnh xuất quỹ</option>
                            <option value={TaskCategory.HOTROXE}>Hỗ trợ xe</option>
                            <option value={TaskCategory.PHIEUHOTROXE}>Phiếu hỗ trợ xe</option>
                        </select>
                    </div>
                </div>
            }
            {
                renderType(selectedType)
            }
        </form>
    );
}

export default TaskContainer;