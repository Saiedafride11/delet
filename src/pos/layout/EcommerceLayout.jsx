import React from 'react';
import { Outlet } from 'react-router-dom';
import EcommerceHeader from '../shared/EcommerceHeader/EcommerceHeader';
import EcommerceFooter from '../shared/EcommerceFooter/EcommerceFooter';

const EcommerceLayout = () => {
  return (
    <div>
      <EcommerceHeader />
      <div className="py-5">
        <Outlet />
      </div>
      <EcommerceFooter />
    </div>
  );
};

export default EcommerceLayout;