import React from 'react';
import { CSSGrid, layout } from 'react-stonecutter';

function Stone() {
  return (
    <div>
      <CSSGrid
        component="ul"
        columns={5}
        columnWidth={150}
        gutterWidth={5}
        gutterHeight={5}
        layout={layout.pinterest}
        duration={800}
        easing="ease-out"
      >
        <li key="A" itemHeight={150}>
          A
        </li>
        <li key="B" itemHeight={120}>
          B
        </li>
        <li key="C" itemHeight={170}>
          C
        </li>
      </CSSGrid>
    </div>
  );
}

export default Stone;
