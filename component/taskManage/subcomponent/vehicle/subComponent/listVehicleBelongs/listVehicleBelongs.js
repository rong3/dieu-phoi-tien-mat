import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import TagifyComponent from "../../../../../../shared/packages/control/Tagify/Tagify"
import VehicleReleaseContainer from "../../../vehicleRelease/component/vehicleReleaseContainer/vehicleReleaseContainer"

function ListVehicleBelongs(props) {
    const router = useRouter()
    const [selected, setSelected] = useState(null);
    const masterData = [
        {
            id: 'HTX0000001',
            name: 'HTX0000001',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        },
        {
            id: 'HTX0000002',
            name: 'HTX0000002',
            ticketKey: 'YC1',
            date: '20/01/2022 13:00',
        },
    ]
    return (
        <div className='fundrelasecontainer row'>
            <div className='col-md-12 border-container'>
                <div className='row p-2'>
                    <span className='status-block' style={{ margin: 'auto', background: "#fff" }}>
                        Danh sách phiếu hỗ trợ xe
                    </span>
                </div>
                <div className="list-tabs">
                    <ul className="tab d-flex">
                        {
                            <TagifyComponent
                                liClassName="tab-item"
                                aClassName="tab-item_link"
                                onSelected={(item) => {
                                    setTimeout(() => {
                                        setSelected(item)
                                    }, 0);
                                }}
                                isFilter={false}
                                listTag={masterData ?? []}
                            />
                        }
                    </ul>
                </div>
                {
                    selected?.length > 0 &&
                    <VehicleReleaseContainer id={selected[0]} />
                }

            </div>
        </div>
    );
}

export default ListVehicleBelongs;