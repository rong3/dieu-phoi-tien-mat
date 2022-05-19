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
                            <p class="title">Mã yêu cầu: {props?.id}</p>
                        </div>
                    }

                    <div class="wrap-body">
                        <div class="infor-created">
                            <div class="title-created">
                                <p>Thông tin người tạo</p>
                            </div>
                            <form class="wrap-form" action="">
                                <div class="form-row">
                                    <div class="form-group col-lg-4">
                                        <label for="">Người tạo yêu cầu:</label>
                                        <input class="form-control" type="text" value="Phạm Ngọc Thanh Hương" />
                                    </div>

                                </div>
                            </form>
                        </div>
                        <TaskContainer id={""} modalData={settingModal} />
                        <HistoryStep />
                    </div>
                </div>
            </section>

        </>
    );
}

export default ContainerComponent;