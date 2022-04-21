import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GroupBoxComponent from "../../../../../shared/groupBox/groupBox"
import SelectBox from "../../../../../../shared/packages/control/selectBox/selectBox"
import { InputControl } from "../../../../../../shared/packages/control/input/inputControl"
import DateTimeInput from "../../../../../../shared/packages/control/input/datetime"
import {
    Box,
    Divider,
    Drawer
} from "@material-ui/core";
import HistoryComponent from "../../../../../shared/history/history"


function VehicleReleaseContainer(props) {
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
        <section className="section priority-user-content">
            <div className='row p-2'>
                <span className='status-block'>
                    {`Trạng thái: ${id ? 'Tiếp nhận' : 'Nháp'}`}
                </span>
            </div>
            <div className='row p-2'>
                <div className='col-md-11'>
                    {
                        id === null &&
                        <div className="row">
                            <div className="col-md-4">
                                <span>Yêu cầu HTX</span>
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

                    <div className="row">
                        <div className="col-md-4">
                            <span>Mã ĐVKD thực hiện</span>
                            <InputControl type="text" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                            }} defaultValue={null} />
                        </div>
                        <div className="col-md-4">
                            <span>Tên ĐVKD thực hiện</span>
                            <InputControl type="text" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                            }} defaultValue={null} />
                        </div>
                        <div className="col-md-4">
                            <span>Ngày thực hiện</span>
                            <DateTimeInput selected={new Date()}
                                isDefaultEmpty
                                isPortal
                                id="startDate" isOnlyDate={false} onChange={(data) => {

                                }} />
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
                            <span>Chuyển thực thi</span>
                            <GroupBoxComponent
                                isShowTextBox={false}
                                setData={setTypeRelatedUserData}
                                data={modelData.relatedUser} />
                        </div>
                        <div className="col-md-4">
                            <span>Mô tả</span>
                            <InputControl rows={9} type="textarea" id="name" onChange={(e) => {
                                const value = e.target.value ?? '';
                            }} defaultValue={null} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-3">
                            <span>Kiểm ngân</span>
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
                        <div className="col-md-3">
                            <span>Tài xế</span>
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
                        <div className="col-md-3">
                            <span>Bảo vệ</span>
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
                        <div className="col-md-3">
                            <span>Người liên quan</span>
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
            </div>
            {
                <Drawer
                    anchor={keyMenuFloat}
                    open={stateSlide[keyMenuFloat]}
                    BackdropProps={{ invisible: true }}
                    onClose={toggleDrawer(false)}
                >
                    {list(keyMenuFloat)}
                </Drawer>
            }
        </section>
    );
}

export default VehicleReleaseContainer;