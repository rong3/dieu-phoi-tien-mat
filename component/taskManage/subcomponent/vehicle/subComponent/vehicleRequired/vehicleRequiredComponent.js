import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GroupBoxComponent from "../../../../../shared/groupBox/groupBox"
import SelectBox from "../../../../../../shared/packages/control/selectBox/selectBox"
import { InputControl } from "../../../../../../shared/packages/control/input/inputControl"
import DateTimeInput from "../../../../../../shared/packages/control/input/datetime"
import ListVehicleBelongs from "../listVehicleBelongs/listVehicleBelongs"
import {
    Box,
    Divider,
    Drawer
} from "@material-ui/core";
import HistoryComponent from "../../../../../shared/history/history"

function VehicleRequiredComponent(props) {
    const { id } = props;
    const router = useRouter()
    const keyMenuFloat = 'right';
    const [stateSlide, setStateSlide] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setStateSlide({ ...stateSlide, [keyMenuFloat]: open });
    };

    const closeSideBar = (open) => {
        setStateSlide({ ...stateSlide, [keyMenuFloat]: open });
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 320 }}
            role="presentation"
        >
            <HistoryComponent data={[]} />
        </Box>
    );


    const masterData = {
        type: [
            {
                id: 1,
                name: 'Theo thực tế'
            },
            {
                id: 2,
                name: 'Theo hợp đồng'
            }
        ],
        question: [
            {
                id: 1,
                name: 'Có'
            },
            {
                id: 2,
                name: 'Không'
            }
        ],
        required: [
            {
                id: 1,
                name: 'Thu hộ'
            },
            {
                id: 2,
                name: 'Chi hộ'
            },
            {
                id: 3,
                name: 'Tiếp ATM'
            },
        ],
        city: [
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
    }
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
            {
                id: 4,
                name: 'KRW',
                data: null,
                checked: false
            }
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
        <section className="section priority-user-content">
            <div className='row'>
                <span className='status-block'>
                    {`Trạng thái: ${id ? 'Tiếp nhận' : 'Nháp'}`}
                </span>
            </div>
            {
                id &&
                <div className="form-row row">
                    <div className="col-md-2">
                        <span>Bản sửa đổi bổ sung</span>
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
                </div>
            }
            <div className='form-row row'>
                <div className='form-group col-md-12'>
                    <div className="form-row row">
                        <div className="col-md-4">
                            <span>Loại Yêu cầu</span>
                            <SelectBox id="selectbox"
                                optionLabel="name"
                                optionValue="id"
                                onChange={(data) => {
                                }}
                                value={null}
                                isPortal
                                options={masterData.type}
                            />
                        </div>
                        <div className="col-md-4">
                            <span>Tên khách hàng</span>
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
                            <span>Yêu cầu</span>
                            <SelectBox id="selectbox"
                                optionLabel="name"
                                optionValue="id"
                                onChange={(data) => {
                                }}
                                value={null}
                                isPortal
                                options={masterData.required}
                            />
                        </div>
                        <div className="col-md-4">
                            <span>Thời gian</span>
                            <DateTimeInput selected={new Date()}
                                isDefaultEmpty
                                isPortal
                                id="startDate" isOnlyDate={false} onChange={(data) => {

                                }} />
                        </div>
                        <div className="col-md-4">
                            <span>Địa điểm</span>
                            <InputControl type="text" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                            }} defaultValue={null} />
                        </div>
                        <div className="col-md-4">
                            <span>Mô tả</span>
                            <InputControl type="text" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                            }} defaultValue={null} />
                        </div>
                        <div className="col-md-4">
                            <span>Nộp quỹ</span>
                            <SelectBox id="selectbox"
                                optionLabel="name"
                                optionValue="id"
                                onChange={(data) => {
                                }}
                                value={null}
                                isPortal
                                options={masterData.question}
                            />
                        </div>
                    </div>

                    <div className='form-row row'>
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
                                masterData.city?.map(item => {
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
            </div>
            {
                id &&
                <ListVehicleBelongs id={id} />
            }
        </section>
    );
}

export default VehicleRequiredComponent;