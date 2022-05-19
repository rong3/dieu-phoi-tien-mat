import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GroupBoxComponent from "../../../../../shared/groupBox/groupBox"
import SelectBox from "../../../../../../shared/packages/control/selectBox/selectBox"
import { InputControl } from "../../../../../../shared/packages/control/input/inputControl"
import DateTimeInput from "../../../../../../shared/packages/control/input/datetime"
import ListFundRelaseBelongs from "../listFundRelaseBelongs/listFundRelaseBelongs"

function TicketRequiredComponent(props) {
    const { id } = props;
    const router = useRouter()

    useEffect(() => {

    }, [])
    const masterData = [
        {
            id: 1,
            name: 'Hồ Chí Minh'
        },
        {
            id: 2,
            name: 'Hà Nội'
        },
        {
            id: 3,
            name: 'Đồng Nai'
        }
    ]
    const [modelData, setModelData] = useState({
        typeCurrency: [
            {
                id: 1,
                name: 'USD',
                data: null,
                checked: true
            },
            {
                id: 2,
                name: 'AUD',
                data: null,
                checked: false,
            },
            {
                id: 3,
                name: 'VND',
                data: null,
                checked: false
            },
        ],
        relatedUser: [
            {
                id: 1,
                name: 'Nguyen Van A',
                data: null,
                checked: true
            },
            {
                id: 2,
                name: 'Nguyen Van B',
                data: null,
                checked: true
            },
            {
                id: 3,
                name: 'Nguyen Van C',
                data: null,
                checked: true
            },
        ]
    })

    //func for groupbox
    const setTypeCurrencyData = (data) => {
        modelData.typeCurrency = data;
        setModelData({ ...modelData });
    }
    const setTypeRelatedUserData = (data) => {
        modelData.relatedUser = data;
        setModelData({ ...modelData });
    }

    return (
        <>
            <div className='form-row row'>
                <div class="form-group col-lg-4">
                    <label for="">Ưu tiên</label>
                    <select className='select-custom'>
                        <option value="">&#128994; Thấp</option>
                        <option value="">&#128308; Khẩn cấp</option>
                    </select>
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Mã ĐVKD yêu cầu</label>
                    <InputControl type="text" id="name" onChange={(e) => {
                        const value = e.target.value ?? '';
                    }} defaultValue={null} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Tên ĐVKD yêu cầu</label>
                    <InputControl type="text" id="name" disabled />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Tên yêu cầu</label>
                    <InputControl type="text" id="name" />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Ngày yêu cầu</label>
                    <input class="form-control" type="date" value="03/04/2022" placeholder="dd/mm/yyyy" />
                </div>
                <div className="form-group col-lg-4">
                    <label for="">Loại Yêu cầu</label>
                    <select className='select-custom'>

                    </select>
                </div>
            </div>
            <div className='form-row row'>
                <div class="form-group col-lg-12">
                    <label for="">Mô tả</label>
                    <InputControl type="textarea" id="name" onChange={(e) => {
                        const value = e.target.value ?? '';
                    }} defaultValue={null} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Loại tiền</label>
                    <GroupBoxComponent
                        isShowTextBox={true}
                        setData={setTypeCurrencyData}
                        data={modelData.typeCurrency} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Người liên quan</label>
                    <GroupBoxComponent
                        isShowTextBox={false}
                        setData={setTypeRelatedUserData}
                        data={modelData.relatedUser} />
                </div>
                <div class="form-group col-lg-4">
                    <label for="">Chuyển thực thi</label>
                    {
                        masterData?.map(item => {
                            return (
                                <div class="form-check">
                                    <input
                                        type="radio"
                                        class="form-check-input"
                                        id={`radio_${item.id}`}
                                        name={`thucthi_${id}`}
                                    />
                                    &nbsp;{item?.name}
                                    <label class="form-check-label" for={`radio_${item.id}`}></label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div class="button-bottom">
                <button class="btn btn-draw" tabindex="0"><img src="/asset/images/icons/draw.svg" alt="" /><span>Lưu nháp</span></button>
                <button class="btn btn-done" tabindex="0"> <img src="/asset/images/icons/send.svg" alt="" /><span>Tạo yêu cầu</span></button>
            </div>
            {/* <div className='row p-2'>
                <div className='col-md-11'>
                    <div className="row">
                        <div className="col-md-4">
                            <span>Mã ĐVKD yêu cầu</span>
                            <InputControl type="text" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                            }} defaultValue={null} />
                        </div>
                        <div className="col-md-4">
                            <span>Tên ĐVKD yêu cầu</span>
                            <InputControl type="text" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                            }} defaultValue={null} />
                        </div>
                        <div className="col-md-4">
                            <span>Tên yêu cầu</span>
                            <InputControl type="text" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                            }} defaultValue={null} />
                        </div>
                        <div className="col-md-4">
                            <span>Ngày yêu cầu</span>
                            <DateTimeInput selected={new Date()}
                                isDefaultEmpty
                                isPortal
                                id="startDate" isOnlyDate={false} onChange={(data) => {

                                }} />
                        </div>
                        <div className="col-md-4">
                            <span>Loại Yêu cầu</span>
                            <SelectBox id="selectbox"
                                optionLabel="name"
                                optionValue="id"
                                onChange={(data) => {

                                }}
                                value={null}
                                isPortal
                                options={[]}
                            />
                        </div>
                        <div className="col-md-4">
                            <span>Mô tả</span>
                            <InputControl type="text" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                            }} defaultValue={null} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-4">
                            <span>Loại tiền</span>
                            <GroupBoxComponent
                                isShowTextBox={true}
                                setData={setTypeCurrencyData}
                                data={modelData.typeCurrency} />
                        </div>
                        <div className="col-md-4">
                            <span>Người liên quan</span>
                            <GroupBoxComponent
                                isShowTextBox={false}
                                setData={setTypeRelatedUserData}
                                data={modelData.relatedUser} />
                        </div>
                        <div className="col-md-4">
                            <span>Chuyển thực thi</span>
                            {
                                masterData?.map(item => {
                                    return (
                                        <div class="form-check">
                                            <input
                                                type="radio"
                                                class="form-check-input"
                                                id={`radio_${item.id}`}
                                                name={`thucthi_${id}`}
                                            />
                                            {item?.name}
                                            <label class="form-check-label" for={`radio_${item.id}`}></label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>

                <div className='col-md-1'>
                    <div className='toolbar'>
                        <div className='container-item'>
                            <div className='item'>
                                <i className='fas fa-history' title='Lịch sử'
                                    onClick={toggleDrawer(!stateSlide[keyMenuFloat])}
                                >
                                </i>
                            </div>
                            <div className='item'>
                                <i className='fas fa-save text-info' title='Lưu'
                                    onClick={() => {
                                        console.log({ modelData });
                                    }}
                                >
                                </i>
                            </div>
                            <div className='item'>
                                <i className='fas fa-check text-success' title='Duyệt'>
                                </i>
                            </div>
                            <div className='item'>
                                <i className='fas fa-ban text-danger' title='Từ chối'>
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* {
                id &&
                <>
                    <ListFundRelaseBelongs id={id} />
                </>
            } */}
        </>
    );
}

export default TicketRequiredComponent;