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
                        <label for="category">Danh m???c y??u c???u</label>
                        <select id="category" className='select-custom' defaultValue={selectedType} onChange={(e) => {
                            setSelectedType(e.target.value)
                        }}>
                            <option value={TaskCategory.TIEPNOPQUY}>Ti???p/n???p qu???</option>
                            <option value={TaskCategory.LENHXUATQUY}>L???nh xu???t qu???</option>
                            <option value={TaskCategory.HOTROXE}>H??? tr??? xe</option>
                            <option value={TaskCategory.PHIEUHOTROXE}>Phi???u h??? tr??? xe</option>
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