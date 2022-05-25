import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import CommonLayout from "../shared/packages/layout/root-layout.package";
import Utility from "../shared/packages/utils/common";
import DashBoardComponent from "../component/dashboard/dashboard"

function HomePage(props) {
  const { t } = useTranslation('common');
  return (
    <React.Fragment>
      <Head>
        <title>Điều phối tiền mặt</title>
      </Head>
      <DashBoardComponent {...props} />
    </React.Fragment>
  );
}

HomePage.Layout = CommonLayout;
HomePage.Title = Utility.trans('mainMenu.dashboard');
export default HomePage;
