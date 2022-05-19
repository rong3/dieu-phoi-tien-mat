import React, { useState, useEffect } from "react";
import DynamicLink from "../DynamicLink/DynamicLink";

function BreadCrum(props) {
    return (
        <div class="breadcrumb-wrapper">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <DynamicLink href="/" as="/">
                        <a href="/">
                            <img src="/asset/images/icons/home.svg" alt="" />
                            Trang chủ
                        </a>
                    </DynamicLink>
                </li>
                {
                    props?.data?.map((item, index) => {
                        return (
                            <li class="breadcrumb-item">
                                <DynamicLink key={index} href={item?.href} as={item?.href}>
                                    <a>{item?.name}</a>
                                </DynamicLink>
                            </li>
                        )
                    })
                }
            </ol>
            {/* <a class="back-up" href=""> 
            <em class="material-icons">arrow_back</em>
            <span>Quay lại</span></a> */}
        </div>
    );
}

export default BreadCrum;