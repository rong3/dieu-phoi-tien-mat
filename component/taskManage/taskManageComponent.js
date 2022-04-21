import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FundComponent from "./subcomponent/fund/fundComponent"
import FundReleaseComponent from "./subcomponent/fundRelease/fundRelease"
import VehicleComponent from "./subcomponent/vehicle/vehicleComponent"
import VehicleReleaseComponent from "./subcomponent/vehicleRelease/vehicleRelease"

function TaskManageComponent(props) {
    const router = useRouter()

    useEffect(() => {
        $('.priority-user-content .item-customer .link-info').on('click', function (e) {
            let currentActive = $('.priority-user-content').find('.item-customer.active').first();
            let expectActive = $(this).parents(".item-customer").first();
            if (!$(this).parents(".item-customer").first().hasClass('active')) {
                currentActive.find(".right-box").slideUp();
                currentActive.removeClass('active');
                expectActive.addClass('active');
                expectActive.find(".right-box").slideDown();
            }
        })
    }, [])

    const menuTab = [
        {
            key: 'fund',
            title: "Yêu cầu Tiếp/Nộp quỹ",
            previewImg: 'https://img.etimg.com/thumb/msid-84727815,width-210,imgsize-41563,,resizemode-4,quality-100/is-investing-in-a-fund-of-funds-better-than-investing-in-a-mutual-fund.jpg',
            component: <FundComponent {...props} />
        },
        {
            key: 'vehicle',
            title: "Lệnh xuất quỹ",
            previewImg: 'https://img.etimg.com/thumb/msid-84727815,width-210,imgsize-41563,,resizemode-4,quality-100/is-investing-in-a-fund-of-funds-better-than-investing-in-a-mutual-fund.jpg',
            component: <FundReleaseComponent {...props} />
        },
        {
            key: 'vehicle',
            title: "Yêu cầu Hỗ trợ xe",
            previewImg: 'https://openapi.it/writable/uploads/1600353502_fd966fb5b68059423c68.jpg',
            component: <VehicleComponent {...props} />
        },
        {
            key: 'vehicle',
            title: "Phiếu hỗ trợ xe",
            previewImg: 'https://openapi.it/writable/uploads/1600353502_fd966fb5b68059423c68.jpg',
            component: <VehicleReleaseComponent {...props} />
        },
    ]

    return (
        <section className="section priority-user-content">
            <div className="container-fluid">
                <div className="customers-box">
                    <ul className="list-customers">
                        {
                            menuTab?.map((item, index) => {
                                return (
                                    <li className={`item-customer ${index === 0 ? 'active' : ''}`} key={item.key}>
                                        <div className="row">
                                            <div className="left-box col-12 col-lg-2 col-xl-2">
                                                <a className="link-info">
                                                    <img src={item.previewImg} />
                                                    <div className="name">
                                                        {item?.title}
                                                        <div className="arrow"></div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="right-box col-12 col-lg-10 col-xl-10">
                                                {
                                                    item.component &&
                                                    React.cloneElement(item.component)
                                                }
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default TaskManageComponent;