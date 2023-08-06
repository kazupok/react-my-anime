import React from 'react';

const toggleListItem = (list, flag, target) => {
    return flag
      ? list.filter((elem) => elem !== target)
      : [...list, target];
  };

export default toggleListItem;