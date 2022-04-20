import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { InputControl } from "../../../shared/packages/control/input/inputControl"

function GroupBoxComponent(props) {
    const { data, isShowTextBox, setData } = props;
    const router = useRouter()

    return (
        <div className='group-box-custom'>
            {
                data?.map((item, index) => {
                    return (
                        <div className='item'>
                            <div class="form-check">
                                <div className='row'>

                                    <div className={isShowTextBox ? 'col-md-2' : 'col-md-12'}>
                                        <input class="form-check-input"
                                            type="checkbox"
                                            id={item.id}
                                            name={item.name}
                                            onChange={(e) => {
                                                const checked = e?.target?.checked;
                                                item.checked = checked;
                                                setData(data);
                                            }}
                                            checked={item.checked} />
                                        <label class="form-check-label">
                                            {item.name}
                                        </label>
                                    </div>

                                    {
                                        isShowTextBox &&
                                        <div className='col-md-10'>
                                            <InputControl disabled={!item.checked} type="number" id="name" onChange={(e) => {
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