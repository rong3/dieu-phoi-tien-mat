import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FundReleaseContainer from "../../../fundRelease/component/fundRelaseContainer/fundRelaseContainer"
import TagifyComponent from "../../../../../../shared/packages/control/Tagify/Tagify"

function ListFundRelaseBelongs(props) {
    const router = useRouter()
    const [selected, setSelected] = useState(null);
    const masterData = [
        {
            id: 'LXQ0000001',
            name: 'LXQ0000001',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        },
        {
            id: 'LXQ0000002',
            name: 'LXQ0000002',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        },
        {
            id: 'LXQ0000003',
            name: 'LXQ0000003',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        },
        {
            id: 'LXQ0000004',
            name: 'LXQ0000004',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        },
        {
            id: 'LXQ0000005',
            name: 'LXQ0000005',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        },
        {
            id: 'LXQ0000006',
            name: 'LXQ0000006',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        }
    ]
    return (
        <div className='fundrelasecontainer row'>
            <div className='col-md-12 border-container'>
                <div className='row p-2'>
                    <span className='status-block' style={{ margin: 'auto', background: "#fff" }}>
                        Danh sách lệnh xuất quỹ
                    </span>
                </div>
                <div className="list-tabs">
                    <ul className="tab d-flex">
                        {
                            <TagifyComponent
                                liClassName="tab-item"
                                aClassName="tab-item_link"
                                onSelected={(item) => {
                                    setSelected(item)
                                }}
                                isFilter={false}
                                listTag={masterData ?? []}
                            />
                        }
                    </ul>
                </div>
                {
                    selected?.length > 0 &&
                    <FundReleaseContainer id={selected[0]} />
                }

            </div>
        </div>
    );
}

export default ListFundRelaseBelongs;