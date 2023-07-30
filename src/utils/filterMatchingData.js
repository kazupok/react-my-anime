import React from 'react';

function filterMatchingData(data1, data2, key) {
    const data2Values = new Set(data2.map(item => item[key]));
    const result = data1.filter(item => data2Values.has(item[key]));

    return result;
};

export default filterMatchingData;