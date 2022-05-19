import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import TicketRequiredComponent from "./subcomponent/fund/component/ticketRequired/ticketRequiredComponent"
import { TaskCategory } from "./taskCategory"

function TaskContainerModal(props) {
    const { id, modalData } = props;
    const router = useRouter();
    const [selectedType, setSelectedType] = useState(null)

    useEffect(() => {
        setSelectedType(modalData.category ?? TaskCategory.TIEPNOPQUY);
    }, [modalData])

    const renderType = (type) => {
        switch (type) {
            case TaskCategory.TIEPNOPQUY: return <TicketRequiredComponent {...props} />
            default: return <></>
        }
    }

    return (
        <form class="wrap-form wide">
            {
                modalData?.type === 'new' &&
                <div className='form-row row'>
                    <div class="form-group col-lg-4">
                        <label for="category">Danh mục</label>
                        <select id="category" className='select-custom' defaultValue={selectedType} onChange={(e) => {
                            setSelectedType(e.target.value)
                        }}>
                            <option value={TaskCategory.TIEPNOPQUY}>Tiếp/nộp quỹ</option>
                            <option value="">Lệnh xuất quỹ</option>
                            <option value="">Hỗ trợ xe</option>
                            <option value="">Phiếu hỗ trợ xe</option>
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

export default TaskContainerModal;