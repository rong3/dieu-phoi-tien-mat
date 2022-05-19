import React, { useState, useEffect } from "react";
import DynamicLink from "../../../../component/common/DynamicLink/DynamicLink";

const SideBarComponent = (props) => {

    const menu = [
        {
            href: "/",
            as: '/',
            icon: '/asset/images/icons/side-2.svg',
            name: 'Trang chủ'
        },
        {
            href: "/",
            as: '/',
            icon: '/asset/images/icons/side-3.svg',
            name: 'Cấu hình'
        },
    ]

    return (
        <div class="sidebar">
            <ul class="side-nav">
                {
                    menu?.map((item, idx) => {
                        return (
                            <li class={`side-item ${idx === 0 ? ' active' : ''}`}>
                                <DynamicLink href={item.href} as={item?.as}>
                                    <a>
                                        <img class="icon" src={item?.icon} alt="" />
                                        <span>{item?.name}</span>
                                    </a>
                                </DynamicLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}
export default SideBarComponent;