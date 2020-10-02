import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti({ options }) {
  console.log(options[1]);
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={options[1]}
      isMulti
      options={options}
    />
  );
}
