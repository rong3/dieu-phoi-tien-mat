import React, { useEffect } from "react";
import { masterConfig } from "../../../config/master"
import Head from "next/head";
import withAuth from "../hocs/authHOC";

const CommonLayout = ({ children }) => {
    const commonProps = {}
    return (
        <React.Fragment>
            <body class="draw-page">
                {React.cloneElement(masterConfig.themeNavbar, { ...commonProps })}
                <main>
                    <div class="wrapper-main">
                        <div id="sidebar-nav">
                            <div class="open-sidebar"> <em class="material-icons">keyboard_arrow_right</em></div>
                            <div class="sidebar">
                                <div class="arrow-right"> <img src="/asset/images/icons/right.svg" alt="" /></div>
                                <div class="sidebar-title">
                                    <a href=""> <img class="icon" src="/asset/images/icons/sidebar-1.svg" alt="" /></a>
                                    <p>Điều phối tiền mặt</p>
                                </div>
                                <ul class="side-nav">
                                    <li class="side-item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-1.svg" alt="" /></a></li>
                                    <li class="side-item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-8.svg" alt="" /><span>Cấu hình</span></a></li>
                                    {/* <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-4.svg" alt="" /><span>Yêu cầu hỗ trợ xe</span></a></li> */}
                                </ul>
                                {/* <div class="all-reques"><span>Tất cả yêu cầu</span><img src="/asset/images/icons/right-1.svg" alt="" /></div>
                                <div class="side-dropdown"> <img class="close" src="/asset/images/icons/close.svg" alt="" />
                                    <ul class="side-child">
                                        <li class="side-child_item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-3.svg" alt="" /><span>TK tiết kiệm</span></a></li>
                                        <li class="side-child_item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-4.svg" alt="" /><span>Nộp tiền</span></a></li>
                                        <li class="side-child_item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-5.svg" alt="" /><span>Rút tiền</span></a></li>
                                        <li class="side-child_item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-6.svg" alt="" /><span>Mở thẻ</span></a></li>
                                        <li class="side-child_item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-7.svg" alt="" /><span>Gọi khách hàng</span></a></li>
                                        <li class="side-child_item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-8.svg" alt="" /><span>Yêu cầu khác</span></a></li>
                                    </ul>
                                </div> */}
                            </div>
                            <div class="sidebar-mega">
                                <div class="sidebar-mega_header">
                                    <div class="arrow-right"> <img src="/asset/images/icons/right.svg" alt="" /></div>
                                    <div class="sidebar-title"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-1.svg" alt="" /></a>
                                        <div class="back-side d-flex align-items-center"> <em class="material-icons">arrow_back</em><span>Quay lại</span></div>
                                        <form class="wrap-form" action="">
                                            <div class="form-group">
                                                <input class="form-control" type="text" placeholder="Tìm tạo yêu cầu" />
                                                <button><img src="/asset/images/icons/search-black.svg" alt="" /></button>
                                            </div>
                                        </form>
                                        <p>Tất cả các yêu cầu</p>
                                    </div>
                                </div>
                                <div class="sidebar-mega_body">
                                    <ul class="side-nav">
                                        <li class="side-item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-3.svg" alt="" /><span>TK tiết kiệm</span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-4.svg" alt="" /><span>Nộp tiền</span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-5.svg" alt="" /><span>Rút tiền</span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-6.svg" alt="" /><span>Mở thẻ </span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-7.svg" alt="" /><span>Gọi khách hàng </span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-8.svg" alt="" /><span>Yêu cầu khác</span></a></li>
                                        <li class="side-item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-2.svg" alt="" /><span>Mở CIF</span></a></li>
                                        <li class="side-item"><a href=""> <img class="icon" src="/asset/images/icons/sidebar-3.svg" alt="" /><span>TK tiết kiệm</span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-4.svg" alt="" /><span>Nộp tiền</span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-5.svg" alt="" /><span>Rút tiền</span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-6.svg" alt="" /><span>Mở thẻ </span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-7.svg" alt="" /><span>Gọi khách hàng </span></a></li>
                                        <li class="side-item"><a href=""><img class="icon" src="/asset/images/icons/sidebar-8.svg" alt="" /><span>Yêu cầu khác</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {children}
                    </div>
                </main>
                {/* <div className="app-content">
                    <div className="content-overlay" />
                    <div className="content-wrapper p-0">{children}</div>
                </div> */}

                <footer>
                    <div class="wrapper-container">
                        <ul class="coppyright d-flex">
                            <li>
                                <p>Bản quyền ©2022 thuộc về <a href="https://www.hdbank.com.vn/"> HDBank</a></p>
                            </li>
                            <li><a href="">Điều khoản sử dụng</a></li>
                            <li><a href="">An toàn và bảo mật</a></li>
                            <li><a href="">Sơ đồ trang</a></li>
                        </ul>
                    </div>
                </footer>
            </body>

        </React.Fragment>
    );
}
export default withAuth(CommonLayout);