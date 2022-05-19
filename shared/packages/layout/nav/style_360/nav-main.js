import React, { useEffect, useState } from 'react';
import { masterConfig } from "../../../../../config/master"
import { useAuth } from "../../../provider/authBase"
import { useRouter } from 'next/router'
import DynamicLink from "../../../../../component/common/DynamicLink/DynamicLink"

function NavBarStyle360(props) {
    const auth = useAuth();
    const router = useRouter();

    return (
        <header>
            <div class="wrap-header d-flex align-items-center">
                <div class="wrap-header-left d-flex align-items-center"><a class="wrap-header-left_icon d-flex align-items-center justify-content-center" href=""> <img src="/asset/images/icons/icons-windows.svg" alt="" /></a>
                    <h1>
                        <DynamicLink href="/" as="/">
                            <a class="wrap-header-left_logo">
                                <img src="/asset/images/logo.png" alt="" />
                            </a>
                        </DynamicLink>
                    </h1>
                </div>
                <div class="wrap-header-center" style={{ background: "none" }}>

                </div>
                <div class="wrap-header-right d-flex align-items-center">
                    <div class="wrap-search">
                        <div class="search-button"> <img src="/asset/images/icons/search.svg" alt="" /></div>
                    </div>
                    <div class="wrap-list-user">
                        <ul class="d-flex align-items-center">
                            <li class="nav-item"><a class="username d-flex align-items-center" href="thong-tin-khach-hang.html">
                                <p>Khoa </p><img src="/asset/images/header/avatar.jpg" alt="" /></a></li>
                            <li class="nav-item">
                                <div class="notification"> <img src="/asset/images/icons/bell.svg" alt="" />
                                    <div class="notification_number"> <span>99</span></div>
                                </div>
                                <div class="notification-wrapper">
                                    <div class="tabs">
                                        <div class="tabs-header d-flex align-items-center justify-content-between">
                                            <p class="title">Thông báo</p>
                                            <ul class="tabs-list d-flex align-items-center">
                                                <li class="active" rel="tab-1">
                                                    <p>Chưa đọc</p>
                                                </li>
                                                <li rel="tab-2">
                                                    <p>Đã đọc</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="panel active" id="tab-1">
                                            <ul class="panel-list">
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="panel" id="tab-2">
                                            <ul class="panel-list">
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="wrap-content">
                                                        <div class="date-time"> <span>11/12/2021</span></div>
                                                        <div class="content d-flex align-items-center justify-content-between"> <a href="">
                                                            <p>Amet minim mollit non deserunt ullamco aliqua ...</p></a><a href=""> <span>Chi tiết</span></a></div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item"> <a class="logout" onClick={() => {
                                auth.signout().then((res) => {
                                    setTimeout(() => {
                                        router.push("/login");
                                    }, 2000);
                                });
                            }}>
                                <img src="/asset/images/icons/logout.svg" alt="" />
                            </a></li>
                        </ul>
                    </div>
                    <div class="menu-toggle d-flex align-items-center">
                        <div class="btn btn-hamburger-lines"><span> </span><span> </span><span> </span><span></span></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

NavBarStyle360.propTypes = {
};

NavBarStyle360.defaultProps = {
};

export default NavBarStyle360;
