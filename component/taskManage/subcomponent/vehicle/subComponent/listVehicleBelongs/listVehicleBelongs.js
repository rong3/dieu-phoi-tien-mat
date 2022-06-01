import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import TagifyComponent from "../../../../../../shared/packages/control/Tagify/Tagify"
import VehicleReleaseContainer from "../../../vehicleRelease/component/vehicleReleaseContainer/vehicleReleaseContainer"

function ListVehicleBelongs(props) {
    const { id, dataphtx } = props;
    const router = useRouter()
    const [selected, setSelected] = useState(null);
    const [dataHTXState, setDataHTXState] = useState({
        dataTag: [],
        selected: null
    })
    useEffect(() => {
        if (dataphtx?.length > 0) {
            const convert = dataphtx?.map((x) => ({
                id: x?.id,
                name: x?.req_code
            }))
            dataHTXState.dataTag = convert;
            setDataHTXState({ ...dataHTXState })
        }
    }, [dataphtx])
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
                                    dataHTXState.selected = null;
                                    setDataHTXState({ ...dataHTXState })
                                    setTimeout(() => {
                                        dataHTXState.selected = dataHTXState.dataTag?.find(x => x?.name === item[0]);
                                        setDataHTXState({ ...dataHTXState })
                                    }, 0);
                                }}
                                isFilter={false}
                                listTag={dataHTXState.dataTag ?? []}
                            />
                        }
                    </ul>
                </div>
                {
                    dataHTXState.selected &&
                    <VehicleReleaseContainer id={dataHTXState.selected?.id} selected={dataHTXState.selected} />
                }

            </div>
        </div>
    );
}

export default ListVehicleBelongs;