import React, { useEffect, useState } from "react";

const PrioritySelect = React.memo(function PrioritySelect(props) {
    const { data, onChange, value, isDisabled } = props;
    const findId = (text) => {
        const find = data?.find(x => x.name === text);
        if (find) {
            return find?.id
        }
        return null;
    }
    return (
        <select className='select-custom' disabled={isDisabled} value={value} onChange={(e) => {
            const data = e.target.value ?? null;
            onChange(data);
        }}>

            <option value={findId('Thấp')}>&#128993; Thấp</option>
            <option value={findId('Trung bình')}>&#128994; Bình thường</option>
            <option value={findId('Khẩn cấp')}>&#128308; Cao</option>
        </select>
    );
});

export default PrioritySelect;
