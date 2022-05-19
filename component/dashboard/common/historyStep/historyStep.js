import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function HistoryStep(props) {
    const { id, modalData } = props;
    const router = useRouter();

    return (
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
    );
}

export default HistoryStep;