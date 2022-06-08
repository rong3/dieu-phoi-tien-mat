import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Modal from "../../../../shared/packages/control/modal/index"
import BreadCrum from "../../../../component/common/BreadCrum/BreadCrum"
import TaskContainer from "../../common/taskContainer/taskContainer"
import HistoryStep from "../historyStep/historyStep";
import { useAuth } from "../../../../shared/packages/provider/authBase"

function ContainerComponent(props) {
    const router = useRouter()
    const changeRoute = (route) => {
        router.replace(route ?? "/")
    }
    const auth = useAuth();
    const [settingModal, setSettingModal] = useState({
        isOpen: true,
        category: props?.category ?? null,
        version: props?.version ?? null,
        type: props?.id ? 'edit' : 'new',
        data: {
            id: props?.id
        }
    })

    useEffect(() => {
        setSettingModal({ ...settingModal, version: props?.version })
    }, [props?.version])

    return (
        <>
            <BreadCrum
                data={[
                    {
                        name: props?.id ? 'Xem yêu cầu' : 'Tạo yêu cầu',
                        href: props?.id ? `${router.asPath}` : '/document-board'
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
                                    <div class="form-group col-lg-6">
                                        <label for="">Người tạo yêu cầu:</label>
                                        <input class="form-control" disabled type="text" style={{ color: '#000 !important', opacity: '1 !important' }} value={
                                            settingModal?.data?.submitByModel ? `${settingModal?.data?.submitByModel?.maNhanVien} - ${settingModal?.data?.submitByModel?.hoTenDemNhanVien} ${settingModal?.data?.submitByModel?.tenNhanVien} - ${settingModal?.data?.submitByModel?.tenChucDanhMoiNhat}`
                                                : `${auth?.user?.manv} - ${auth?.user?.tennv} - ${auth?.user?.tenchucdanh}`
                                        } />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <TaskContainer id={props?.id} modalData={{...settingModal}} setModelData={setSettingModal} />
                        {/* <HistoryStep /> */}
                    </div>
                </div>
            </section>

        </>
    );
}

export default ContainerComponent;