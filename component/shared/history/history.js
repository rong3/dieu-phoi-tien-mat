import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function HistoryComponent(props) {
    const { data } = props;
    const router = useRouter()
    const test = [
        {
            id: 'YC0000001',
            name: 'ab',
            date: '10/10/2022 10:34:50',
            operation: 'tạo mới',
            type: 'yêu cầu'
        },
        {
            id: 'YC0000001',
            name: 'ab',
            date: '10/10/2022 10:34:50',
            operation: 'cập nhật',
            type: 'yêu cầu'
        },
        {
            id: 'YC0000001',
            name: 'ab',
            date: '10/10/2022 10:34:50',
            operation: 'yêu cầu bổ sung',
            type: 'yêu cầu'
        },
        {
            id: 'YC0000001',
            name: 'ab',
            date: '10/10/2022 10:34:50',
            operation: 'cập nhật',
            type: 'yêu cầu'
        },
        {
            id: 'YC0000001',
            name: 'ab',
            date: '10/10/2022 10:34:50',
            operation: 'yêu cầu bổ sung',
            type: 'yêu cầu'
        },
        {
            id: 'YC0000001',
            name: 'ab',
            date: '10/10/2022 10:34:50',
            operation: 'cập nhật',
            type: 'yêu cầu'
        },
        {
            id: 'YC0000001',
            name: 'ab',
            date: '10/10/2022 10:34:50',
            operation: 'yêu cầu bổ sung',
            type: 'yêu cầu'
        },
        {
            id: 'YC0000001',
            name: 'ab',
            date: '10/10/2022 10:34:50',
            operation: 'tiếp nhận',
            type: 'yêu cầu'
        },
        {
            id: 'LXQ00001 - LXQ000002 -LXQ00003',
            name: 'ab',
            date: '10/10/2022 10:34:50',
            operation: 'tạo lệnh xuất quỹ',
            type: 'yêu cầu'
        }
    ]

    return (
        <div className='history-container'>
            <h4><center>Lịch sử</center></h4>
            {
                test?.map((item, index) => {
                    return (
                        <div className='item'>
                            <p dangerouslySetInnerHTML={
                                {
                                    __html:
                                        `<b>${item.name}</b> vừa <b>${item.operation}</b> <b>${item.id}</b> vào lúc <b>${item.date}</b>`
                                }
                            }>
                            </p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default HistoryComponent;