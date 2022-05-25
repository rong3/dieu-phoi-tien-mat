import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FundReleaseContainer from "../../../fundRelease/component/fundRelaseContainer/fundRelaseContainer"
import TagifyComponent from "../../../../../../shared/packages/control/Tagify/Tagify"

function ListFundRelaseBelongs(props) {
    const { id, datalxq } = props;
    const router = useRouter()
    const [dataLXQState, setDataLXQState] = useState({
        dataTag: [],
        selected: null
    })

    useEffect(() => {
        if (datalxq?.length > 0) {
            const convert = datalxq?.map((x) => ({
                id: x?.id,
                name: x?.req_code
            }))
            dataLXQState.dataTag = convert;
            setDataLXQState({ ...dataLXQState })
        }
    }, [datalxq])

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
                                    dataLXQState.selected=null;
                                    setDataLXQState({ ...dataLXQState })
                                    setTimeout(() => {
                                        dataLXQState.selected = dataLXQState.dataTag?.find(x => x?.name === item[0]);
                                        setDataLXQState({ ...dataLXQState })
                                    }, 0);
                                }}
                                isFilter={false}
                                listTag={dataLXQState.dataTag ?? []}
                            />
                        }
                    </ul>
                </div>
                {
                    dataLXQState.selected &&
                    <FundReleaseContainer id={dataLXQState.selected?.id} selected={dataLXQState.selected} />
                }

            </div>
        </div>
    );
}

export default ListFundRelaseBelongs;