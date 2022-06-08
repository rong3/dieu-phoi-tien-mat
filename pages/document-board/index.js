import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import CommonLayout from "../../shared/packages/layout/root-layout.package";
import Utility from "../../shared/packages/utils/common";
import ContainerComponent from "../../component/dashboard/common/container-document/containerDocument"

function DocumentBoardPage(props) {
    const { t } = useTranslation('common');
    return (
        <React.Fragment>
            <Head>
                <title>Điều phối tiền mặt</title>
            </Head>
            <ContainerComponent {...props} />
        </React.Fragment>
    );
}

export async function getServerSideProps(router) {
    try {
        const { id } = router.query;
        const { category, version } = router.query;
        console.log("SSR Example-Page id: " + id);
        return {
            props: {
                id: id ?? null,
                category: category ?? null,
                version: version ?? null
            }
        };
    }
    catch (e) {
    }
}
DocumentBoardPage.Layout = CommonLayout;
DocumentBoardPage.Title = Utility.trans('mainMenu.dashboard');
export default DocumentBoardPage;
