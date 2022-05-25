import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Modal from "../../../../shared/packages/control/modal/index"
import BreadCrum from "../../../../component/common/BreadCrum/BreadCrum"
import TaskContainer from "../../common/taskContainer/taskContainer"
import HistoryStep from "../historyStep/historyStep";

function ContainerComponent(props) {
    const router = useRouter()
    const changeRoute = (route) => {
        router.replace(route ?? "/")
    }

    const [settingModal, setSettingModal] = useState({
        isOpen: true,
        category: props?.category ?? null,
        type: props?.id ? 'edit' : 'new',
        data: {
            id: props?.id
        }
    })

    return (
        <>
            <BreadCrum
                data={[
                    {
                        name: 'Tạo yêu cầu',
                        href: '/document-board'
                    }
                ]}
            />
            <section class="waiting-processing transfer-handle">
                <div class="wrapper-contianer">
                    {
                        props?.id &&
                        <div class="wrap-header">
                            <p class="title">Mã yêu cầu: {settingModal.data?.req_code}</p>
                        </div>
                    }

                    <div class="wrap-body">
                        <div class="infor-created">
                            <div class="title-created active">
                                <p>Thông tin người tạo</p>
                            </div>
                            <form class="wrap-form" style={{ display: 'block' }}>
                                <div class="form-row">
                                    <div class="form-group col-lg-4">
                                        <label for="">Người tạo yêu cầu:</label>
                                        <input class="form-control" disabled type="text" style={{ color: '#000 !important', opacity: '1 !important' }} value="Trần Hoàng Triều" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <TaskContainer id={props?.id} modalData={settingModal} setModelData={setSettingModal} />
                        {/* <HistoryStep /> */}
                    </div>
                </div>
            </section>

        </>
    );
}

export default ContainerComponent;