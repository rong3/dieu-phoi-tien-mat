import React, { useEffect } from "react";
import { masterConfig } from "../../../config/master"
import Head from "next/head";
import withAuth from "../hocs/authHOC";
import SideBarComponent from "./sidebar/sidebar"

const CommonLayout = ({ children }) => {
    const commonProps = {}
    return (
        <React.Fragment>
            <body class="draw-page">
                {React.cloneElement(masterConfig.themeNavbar, { ...commonProps })}
                <main>
                    <div class="wrapper-main">
                        <div id="sidebar-nav">
                            {
                                <SideBarComponent />
                            }
                        </div>
                        {children}
                    </div>
                </main>
                <div id="overlay"></div>
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