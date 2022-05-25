import { isEmpty, isNil } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Select, { components } from 'react-select';
import { isNotNullAndUndefined } from "../../utils/objectHelper"
import { useTranslation } from "react-i18next";

//https://react-select.com/home

const GroupHeading = props => (
    <div style={{
        color: 'white',
        backgroundColor: '#09327e',
        padding: '5px 0px',
        display: 'flex',
    }}>
        <components.GroupHeading {...props} />
    </div>
);

const SELECT_BOX_ACTION = {
    CLEAR: 'clear'
}

export const labelSearchOnlyFilterOption = (option, inputValue) => {
    return (option.label.toString().match(inputValue) || []).length > 0;
}

const SelectBox = ({ defaultValue, value, onChange: onChangeCallback, onBlur: onBlurCallback, options, ...props }) => {
    const { t } = useTranslation('common');
    const defaultOption = {
        [props.optionLabel]: props.defaultLabel || t('common.selectAll'),
        [props.optionValue]: null,
    }
    const defaultOptionValue = props.hasDefaultOption ? defaultOption : null;
    const [selectedValue, setSelectedValue] = useState(defaultOptionValue);
    const [_document, set_document] = React.useState(null)

    useEffect(() => {
        handleDefaultValue();
        if (props.isPortal || props.useDocument) {
            set_document(document)
        }
    }, [])

    useEffect(() => {
        if (isNil(value)) {
            setSelectedValue(defaultOptionValue);
            return;
        }

        if (!props.isAsync) {
            if (!props.isMulti) {
                const customSelectedValue = options.find((item) => {
                    return item[props.optionValue] === value
                });
                if (!customSelectedValue) {
                    setSelectedValue(defaultOptionValue);
                    return;
                }
                if (customSelectedValue && selectedValue !== customSelectedValue) {
                    setSelectedValue(customSelectedValue);
                }
            } else {
                let customSelectedMultiValue = [];
                options.map((item) => {
                    value.map(_item => {
                        if (item[props.optionValue] == _item) {
                            customSelectedMultiValue.push(item)
                        }
                    })
                }
                );
                if (isEmpty(customSelectedMultiValue)) {
                    setSelectedValue(defaultOptionValue);
                    return;
                }
                if (!isEmpty(customSelectedMultiValue)) {
                    setSelectedValue(customSelectedMultiValue);
                }
            }
        } else {
            if (!props.isMulti) {
                if (!isNil(props.defaultLabel)) {
                    setSelectedValue({
                        [props.optionLabel]: props.defaultLabel,
                        [props.optionValue]: defaultValue || value,
                    })
                }
            }
        }
    }, [value, options]);

    const handleDefaultValue = () => {

        if ((isNotNullAndUndefined(value) || isNotNullAndUndefined(defaultValue)) && !isEmpty(options)) {
            const customSelectedValue = options.find((item) => {
                return item[props.optionValue] == value
            });

            if (!isEmpty(customSelectedValue)) {
                setSelectedValue(customSelectedValue);
            }

            if (props.isMulti && Array.isArray(value)) {
                let customSelectedMultiValue = [];
                options.map((item) => {
                    value.map(_item => {
                        if (item[props.optionValue] == _item) {
                            customSelectedMultiValue.push(item)
                        }
                    })
                }
                );
                if (!isEmpty(customSelectedMultiValue)) {
                    setSelectedValue(customSelectedMultiValue);
                }
            }
        }
    }

    const callbackHandler = (callback, e, action) => {
        if (props.isMulti) {
            if (e === null || !e?.length) {
                callback([], [], action)
                return;
            }
            const result = {
                value: [],
                label: [],
            }
            e.forEach(item => {
                result.value.push(item[props.optionValue])
                result.label.push(item[props.optionLabel])
            })

            callback(result.value, result.label, action);
        } else {
            if (e === null) {
                callback(null, null, action);
                return;
            }
            if (!action.option) {
                action.option = e
            }
            callback(e[props.optionValue], e[props.optionLabel], action);
        }
    }

    const actionHandler = (action) => {
        switch (action.action) {
            case SELECT_BOX_ACTION.CLEAR: {
                if (props.hasDefaultOption) {
                    if (isNil(value)) {
                        setSelectedValue(defaultOptionValue);
                        return;
                    }
                }
                break
            }
            default:
                return false
        }
    }

    const handleChange = (e, action) => {
        if (props.isMulti && props.hasDefaultOption) {
            if (
                (selectedValue?.length == 1 && !selectedValue[0]?.[props.optionValue]) ||
                selectedValue?.[props.optionValue] === null
            ) {
                e = e?.filter((item) => item[props.optionValue]);
            }
            if (e?.find((item) => !item[props.optionValue])) {
                e = e?.filter((item) => !item[props.optionValue]);
            }
        }
        setSelectedValue(e);
        if (onChangeCallback) {
            callbackHandler(onChangeCallback, e, action)
        }

        actionHandler(action)
    }

    const configurations = () => {
        let finalOptions = options;
        if (props.hasDefaultOption) {
            finalOptions = [
                defaultOption,
                ...finalOptions
            ]
        }
        return {
            instanceId: 'default-select-box',
            options: finalOptions,
            getOptionLabel: opt => opt[props.optionLabel],
            getOptionValue: opt => opt[props.optionValue],
            value: selectedValue,
            noOptionsMessage: () => {
                return t('common.noData')
            },
            onChange: handleChange,
            classNamePrefix: 'select-box',
            className: `${props.isMulti ? 'basic-multi-select' : ''}`,
            maxMenuHeight: 150,
            menuPlacement: "auto",
            menuPosition: "auto",
            ...props,
        };
    }

    const customStyles = {
        control: (base) => ({
            ...base,
            border: (props.error && !props.isLoading) ? '1px solid #ff7588' : '1px solid #ccd6e6',
            background: '#fff',
            borderColor: '#9e9e9e',
            minHeight: '36px',
            height: '36px',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: '36px',
            padding: '0 6px',
            fontSize: '15px'
        }),

        input: (provided, state) => ({
            ...provided,
            margin: '0px',
        }),
        indicatorSeparator: state => ({
            display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '36px',
        }),
        menuPortal: provided => ({ ...provided, zIndex: 2000, position: 'absolute' }),
        groupHeading: base => ({
            ...base,
            flex: '1 1',
            color: 'white',
            marginTop: 0,
            paddingTop: 10,
            paddingBottom: 10,
        }),
        ...props?.customStyles
    };

    return (
        <div>
            {
                props.isAsync ? <AsyncSelect
                    cacheOptions
                    loadOptions={props.loadOptions}
                    defaultOptions
                    components={{ GroupHeading }}
                    menuPortalTarget={props.isPortal ? _document?.body : null}
                    styles={customStyles}
                    {...configurations()}
                    instanceId='default-async-select-box'
                /> :
                    <Select isMulti={props.isMulti}
                        styles={customStyles}
                        components={{ GroupHeading }}
                        menuPortalTarget={props.isPortal ? _document?.body : null}
                        {...configurations()}
                    />
            }
            {/* {
                props.error && <div className="form-control-position"><i className="far fa-exclamation-triangle" /></div>
            }

            <div className="invalid-feedback">{(props.error && !props.isLoading) && props.errMess}</div> */}
        </div>
    );
};

SelectBox.propTypes = {
    options: PropTypes.array,
    optionLabel: PropTypes.string,
    instanceId: PropTypes.string,
    errMess: PropTypes.string,
    optionValue: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    isLoading: PropTypes.bool,
    hasDefaultOption: PropTypes.bool,
    defaultLabel: PropTypes.string,
    isMulti: PropTypes.bool,
    isAsync: PropTypes.bool,
    isPortal: PropTypes.bool,
    useDocument: PropTypes.bool,
    loadOptions: PropTypes.func,
    filterOption: PropTypes.func,
    customStyles: PropTypes.any
};

SelectBox.defaultProps = {
    options: [],
    placeholder: "Chọn dữ liệu",
    optionLabel: 'label',
    optionValue: 'value',
    error: false,
    errMess: '',
    isLoading: false,
    hasDefaultOption: false,
    isMulti: false,
    isPortal: false,
    useDocument: true,
    isAsync: false
};

export default React.memo(SelectBox);
