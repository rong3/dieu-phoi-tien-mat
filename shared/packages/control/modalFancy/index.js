import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

const ModalFancy = ({ idModal, title, children, ...props }) => {
    const { t } = useTranslation('common');

    return (
        <div class="popup-detail popup-savedraft" id={idModal}>
            <div class="popup-header wide">
                <h2 class="title">{title}</h2>
            </div>
            <div class="popup-main">
                {children}
            </div>
        </div>
    );
};

ModalFancy.propTypes = {

};

ModalFancy.defaultProps = {

};

export default React.memo(ModalFancy);
