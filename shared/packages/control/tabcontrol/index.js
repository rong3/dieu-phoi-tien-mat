import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, DragTabList, DragTab, PanelList, Panel, AsyncPanel } from 'alpaca-react-tabtab';
import { cloneDeep } from "lodash"
import * as customStyle from './style/style';

function TabControlCustom(props) {
    const { tabData, onAdd } = props;
    const [coreTab, setCoreTab] = useState({
        tabs: [],
        activeIndex: 0
    });
    let [tabTemplate, setTabTemplate] = useState([]);
    let [panelTemplate, setPanelTemplate] = useState([]);

    useEffect(() => {
        if (tabData?.length > 0) {
            tabData?.map(item => {
                pushToTab(item);
            })
        }
        setTimeout(() => {
            handleTabChange(0)
        }, 0);
    }, [])

    useEffect(() => {
        if (onAdd?.func?.id !== null) {
            pushToTab(onAdd?.func?.data);
            onAdd.set({
                id: null,
                data: null
            })
        }
    }, [onAdd?.func])

    useEffect(() => {
        if (coreTab.activeIndex >= 0 && coreTab.tabs.length === 1) {
            handleTabChange(0)
        }
        else {
            handleTabChange(coreTab.activeIndex)
        }
    }, [coreTab.activeIndex, coreTab.tabs])

    /*UTILS*/
    const removeTemplate = (index) => {
        if (index > -1) {
            let panelRef = cloneDeep(panelTemplate)
            tabTemplate.splice(index, 1);
            panelRef.filter(x => x.key !== 'main').forEach(element => {
                element.props.children = null;
                element.props.hidden = true;
            });
            panelRef.splice(index, 1);
            setPanelTemplate([...panelRef])
        }
    }

    const handleEdit = ({ type, index }) => {
        if (type === 'delete') {
            coreTab.tabs = [...coreTab.tabs.slice(0, index), ...coreTab.tabs.slice(index + 1)];
            setCoreTab({ ...coreTab });
            removeTemplate(index);
        }
        if (index - 1 >= 0) {
            coreTab.activeIndex = 0//index - 1;
            setCoreTab({ ...coreTab });
        } else {
            coreTab.activeIndex = 0;
            setCoreTab({ ...coreTab });
        }
    }

    const handleTabChange = (index) => {
        coreTab.activeIndex = index;
        if (coreTab.activeIndex > -1) {
            let item = coreTab.tabs.find((x, index) => index == coreTab.activeIndex)
            if (item) {
                if (panelTemplate[index]?.props?.hidden) {
                    panelTemplate[index] = <Panel key={item.key}>{React.cloneElement(item.children)}</Panel>;
                }
            }
        }
        setCoreTab({ ...coreTab });
    }

    const renderByKey = (data) => {
        switch (data.primary) {
            case true: return <i className="fas fa-list"></i>;
            default: return data.title;
        }
    }

    /**ADD TAB */
    const pushToTab = (tabData, activeIndexCustom = null, loadFromCache = false) => {
        const _find = coreTab.tabs?.findIndex(x => x.title === tabData?.title);
        if (_find !== -1) {
            handleTabChange(_find);
        }
        else {
            coreTab.tabs.push(tabData);
            const closable = !tabData.primary;
            tabTemplate.push(<Tab key={tabData.key} closable={closable}>{renderByKey(tabData)}</Tab>);
            panelTemplate.push(<Panel key={tabData.key}>{React.cloneElement(tabData.children)}</Panel>);
            handleTabChange(coreTab.tabs.length - 1)
        }
    }

    return (
        <Tabs
            onTabEdit={handleEdit}
            onTabChange={handleTabChange}
            showModalButton={false}
            activeIndex={coreTab.activeIndex}
            customStyle={customStyle}
        >
            <DragTabList>
                {tabTemplate}
            </DragTabList>
            <PanelList>
                {panelTemplate}
            </PanelList>
        </Tabs>
    );
};

TabControlCustom.propTypes = {
    EventBus: PropTypes.object,
};

TabControlCustom.defaultProps = {

};

export default TabControlCustom;
