import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import CommonLayout from "../../shared/packages/layout/root-layout.package";
import TaskManageComponent from "../../component/taskManage/taskManageComponent"

export default function TaskManagePage(props) {
    const { t } = useTranslation('common');
    return (
        <React.Fragment>
            <Head>
                <title>{t('Quản lý yêu cầu')}</title>
            </Head>
            <TaskManageComponent {...props} />
        </React.Fragment>
    );
}

export async function getServerSideProps(router) {
    try {
        const { id } = router.query;
        console.log("SSR Example-Page id: " + id);
        return {
            props: {
                id: id ?? null,
            }
        };
    }
    catch (e) {
    }
}

TaskManagePage.Layout = CommonLayout;
TaskManagePage.Title = "Quản lý yêu cầu";
TaskManagePage.Href = "/task-manage";
