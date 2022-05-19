import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Modal from "../../../../shared/packages/control/modal/index"
import BreadCrum from "../../../../component/common/BreadCrum/BreadCrum"
import TaskContainer from "../../common/taskContainer/taskContainer"

function ContainerComponent(props) {
    const router = useRouter()
    const changeRoute = (route) => {
        router.replace(route ?? "/")
    }

    const [settingModal, setSettingModal] = useState({
        isOpen: true,
        category: null,
        type: 'new',
        data: null
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
                    <div class="wrap-header">
                        <p class="title">Mã yêu cầu: 202203310250xxx</p>
                    </div>
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
                        <div class="history-list">
                            <div class="history-list_header d-flex align-items-center justify-content-between">
                                <p>Lịch sử phê duyệt</p><em class="material-icons">expand_more</em>
                            </div>
                            <div class="history-list_main">
                                <ul class="list-history">
                                    <li class="active">
                                        <div class="date-time">
                                            <p class="date">13/09/2020</p>
                                            <p class="time">14:00</p>
                                        </div>
                                        <div class="content">
                                            <div class="title">
                                                <p>HD000775 Nguyễn Tấn Lực - KCNTT-NHĐT - Đang đợi xử lý</p>
                                            </div>
                                            <div class="sub-title">
                                                <p>Amet minim mollit non de....</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="date-time">
                                            <p class="date">13/09/2020</p>
                                            <p class="time">14:00</p>
                                        </div>
                                        <div class="content">
                                            <div class="title">
                                                <p>HD000775 Nguyễn Tấn Lực - KCNTT-NHĐT - Đang đợi xử lý</p>
                                            </div>
                                            <div class="sub-title">
                                                <p>Amet minim mollit non de....</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="date-time">
                                            <p class="date">13/09/2020</p>
                                            <p class="time">14:00</p>
                                        </div>
                                        <div class="content">
                                            <div class="title">
                                                <p>HD000775 Nguyễn Tấn Lực - KCNTT-NHĐT - Đang đợi xử lý</p>
                                            </div>
                                            <div class="sub-title">
                                                <p>Amet minim mollit non de....</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="date-time">
                                            <p class="date">13/09/2020</p>
                                            <p class="time">14:00</p>
                                        </div>
                                        <div class="content">
                                            <div class="title">
                                                <p>HD000775 Nguyễn Tấn Lực - KCNTT-NHĐT - Đang đợi xử lý</p>
                                            </div>
                                            <div class="sub-title">
                                                <p>Amet minim mollit non de....</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default ContainerComponent;