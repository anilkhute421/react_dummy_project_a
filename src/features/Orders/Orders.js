import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrangeButton, SubHeader } from "../../style/Gobalstyle";
import IntlMessage from "../../Utils/IntlMessage";
import AddOrder from "./AddOrder";
import Completed from "./COMPLETED/Completed";
import DineIn from "./DINEIN/DineIn";
import { orderSection } from "./OrderStore";
import { TabButton } from "./OrderStyle";
import Takeaway from "./TAKEAWAY/Takeaway";

export default function Orders() {
  const [openAddOrder, setOpenAddCreate] = useState();
  const dispatch = useDispatch();
  const selectTab = useSelector(
    (state) => state?.RestaurantOrder?.activeSelectedSection
  );

  const changeActiveTab = (tabValue) => {
    dispatch(orderSection({ tabValue }));
  };


  return (
    <div>
      {openAddOrder && (
        <AddOrder
          open={openAddOrder}
          handleClose={() => setOpenAddCreate(false)}
        />
      )}

     
      <SubHeader>
        <p>
          <IntlMessage id="Orders.heading" />
        </p>
        {selectTab !== 3 && (
          <OrangeButton onClick={() => setOpenAddCreate(true)}>
            + <IntlMessage id="button.ADDORDER" />
          </OrangeButton>
        )}
      </SubHeader>
      <TabButton>
        <div
          onClick={() => changeActiveTab(1)}
          className={selectTab === 1 && "active"}
        >
          <IntlMessage id="Orders.dineIn" />
        </div>
        <div
          onClick={() => changeActiveTab(2)}
          className={selectTab === 2 && "active"}
        >
          <IntlMessage id="Orders.takeaway" />
        </div>
        <div
          onClick={() => changeActiveTab(3)}
          className={selectTab === 3 && "active"}
        >
          <IntlMessage id="Orders.COMPLETED" />
        </div>
      </TabButton>

      {selectTab === 1 && <DineIn />}
      {selectTab === 2 && <Takeaway />}
      {selectTab === 3 && <Completed />}
    </div>
  );
}
