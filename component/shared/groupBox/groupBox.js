import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { InputControl } from "../../../shared/packages/control/input/inputControl"

function GroupBoxComponent(props) {
    const { data, isShowTextBox, setData, disabled, onSearch } = props;
    const router = useRouter()

    return (
        <div className='group-box-custom'>
            {
                onSearch &&
                <div className='item'>
                    <div className='form-group col-lg-12'>
                        <div className='row'>
                            <InputControl disabled={disabled === true} type="text" id="name" onChange={(e) => {
                                const value = e.target?.value;
                                if (onSearch) {
                                    onSearch(value)
                                }
                            }} />
                        </div>
                    </div>
                </div>
            }
            {
                data?.map((item, index) => {
                    return (
                        <div className='item'>
                            <div class="form-check">
                                <div className='row'>
                                    <div className={isShowTextBox ? 'form-group col-lg-3' : 'form-group col-lg-12'}>
                                        <div className='row'>
                                            <div className={isShowTextBox ? 'form-group col-lg-4' : 'form-group col-lg-2'}>
                                                <input disabled={disabled} class="form-check-input custom-chk"
                                                    type="checkbox"
                                                    id={item.id}
                                                    name={item.name}
                                                    onChange={(e) => {
                                                        const checked = e?.target?.checked;
                                                        item.checked = checked;
                                                        setData(data);
                                                    }}
                                                    checked={item.checked} />
                                            </div>
                                            <div className={isShowTextBox ? 'form-group col-lg-8' : 'form-group col-lg-10'}>
                                                <label class="form-check-label">
                                                    {item.name}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        isShowTextBox &&
                                        <div className='form-group col-lg-9'>
                                            <InputControl disabled={!item.checked || disabled === true} type="number" id="name" onChange={(e) => {
                                                const value = e.target.value ?? null;
                                                item.data = value;
                                                setData(data);
                                            }} defaultValue={item?.data} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default GroupBoxComponent;