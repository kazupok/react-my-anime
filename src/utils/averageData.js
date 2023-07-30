import React from 'react';

const averageData = (data, key) => {
    if(!data.length) return 0; 

    // Filter out objects that do not have the key or are undefined
    const filteredData = data.filter(item => item && item.hasOwnProperty(key));

    const sum = filteredData.reduce((total, current) => total + current[key], 0);
    const average = filteredData.length > 0 ? sum / filteredData.length : 0;

    return average;
};

export default averageData;
