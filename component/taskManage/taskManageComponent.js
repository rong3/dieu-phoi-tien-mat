import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { map } from "jquery";
import FundComponent from "./subcomponent/fund/fundComponent"

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
            title: "Tiếp/ Nộp quỹ",
            previewImg: 'https://img.etimg.com/thumb/msid-84727815,width-210,imgsize-41563,,resizemode-4,quality-100/is-investing-in-a-fund-of-funds-better-than-investing-in-a-mutual-fund.jpg',
            component: <FundComponent {...props} />
        },
        {
            key: 'vehicle',
            title: "Hỗ trợ xe",
            previewImg: 'https://openapi.it/writable/uploads/1600353502_fd966fb5b68059423c68.jpg',
            component: null
        },
        {
            key: 'vehicle',
            title: "Lệnh xuất quỹ",
            previewImg: 'https://img.etimg.com/thumb/msid-84727815,width-210,imgsize-41563,,resizemode-4,quality-100/is-investing-in-a-fund-of-funds-better-than-investing-in-a-mutual-fund.jpg',
            component: null
        }
    ]

    return (
        <section className="section priority-user-content">
            <div className="container-fluid">
                <div className="customers-box">
                    <ul className="list-customers">
                        {
                            menuTab?.map((item, index) => {
                                return (
                                    <li className={`item-customer`} key={item.key}>
                                        <div className="row">
                                            <div className="left-box col-12 col-lg-3 col-xl-3">
                                                <a className="link-info">
                                                    <img src={item.previewImg} />
                                                    <div className="name">
                                                        {item?.title}
                                                        <div className="arrow"></div>
                                                    </div>
                                                </a>
                                            </div>
                                            {
                                                item.component &&
                                                React.cloneElement(item.component, { ...props })
                                            }
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