import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import TicketRequiredComponent from "../../../taskManage/subcomponent/fund/component/ticketRequired/ticketRequiredComponent"
import FundReleaseContainer from "../../../taskManage/subcomponent/fundRelease/component/fundRelaseContainer/fundRelaseContainer"
import VehicleRequiredComponent from "../../../taskManage/subcomponent/vehicle/subComponent/vehicleRequired/vehicleRequiredComponent"
import VehicleReleaseContainer from "../../../taskManage/subcomponent/vehicleRelease/component/vehicleReleaseContainer/vehicleReleaseContainer"

import { TaskCategory } from "./taskCategory"

function TaskContainer(props) {
    const { id, modalData } = props;
    const router = useRouter();
    const [selectedType, setSelectedType] = useState(null)

    useEffect(() => {
        setSelectedType(modalData.category ?? TaskCategory.TIEPNOPQUY);
    }, [modalData])

    const renderType = (type) => {
        switch (type) {
            case TaskCategory.TIEPNOPQUY: return <TicketRequiredComponent {...props} />
            case TaskCategory.LENHXUATQUY: return <FundReleaseContainer {...props} />
            case TaskCategory.HOTROXE: return <VehicleRequiredComponent {...props} />
            case TaskCategory.PHIEUHOTROXE: return <VehicleReleaseContainer {...props} />
            default: return <></>
        }
    }

    return (
        <form class="wrap-form">
            {
                modalData?.type === 'new' &&
                <div className='form-row row'>
                    <div class="form-group col-lg-4">
                        <label for="category">Danh mục</label>
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