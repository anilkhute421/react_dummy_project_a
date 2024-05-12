import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MainSection } from "./OrderStyle";

function ExtraTable({
  intgration2,
  index,
  allData,
  allReadyExistExtra,
  sendValues,
}) {
  const [defaultQuantity, setDefaultQuantity] = useState(1);
  const [findExtra, setFindExtra] = useState(false);

  // const increaseQuantity = () => {
  //   manageData.extraquantity = defaultQuantity + 1;
  //   manageData.extraprice = Number(intgration2.price) * (defaultQuantity + 1);
  //   setDefaultQuantity(defaultQuantity + 1);
  //   sendValues(checked, manageData);
  // };

  // const decreaseQuantity = () => {
  //   if (defaultQuantity > 0) {
  //     manageData.extraquantity = defaultQuantity - 1;
  //     manageData.extraprice =
  //       Number(intgration2.price) * manageData.extraquantity;
  //     setDefaultQuantity(defaultQuantity - 1);
  //     sendValues(checked, manageData);
  //   }
  // };

  const getCheckboxValue = (e, manageData) => {
    manageData.extraquantity = 1;
    manageData.extraprice = Number(intgration2.price);
    manageData.realprice = Number(intgration2.price);
    setDefaultQuantity(defaultQuantity + 1);
    sendValues(e, manageData);
  };

  const ExistingExtra = () => {
    let result = allReadyExistExtra?.find((el) => {
      return el.option_item_id === intgration2.id;
    });
    setFindExtra(result ? true : false);

    if (result) {
      let sendNewObject = {
        extraprice: result.price,
        realprice: result.price / result.quantity,
        ...result,
      };
      
      sendValues(true, sendNewObject);
    }
  };

  useEffect(() => {
    ExistingExtra();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allReadyExistExtra]);

  return (
    <div>
      <MainSection>
        <div>
          <input
            type="checkbox"
            name={intgration2?.name}
            checked={findExtra ? findExtra : null}
            onChange={(e) => getCheckboxValue(e.target.checked, intgration2)}
          />
          <label>{intgration2?.name}</label>
        </div>

        <div style={{ display: "flex" }}>
          {/* <ExtraButton>
            <span onClick={increaseQuantity}>+</span>
            <p>{defaultQuantity}</p>
            <span onClick={decreaseQuantity}>-</span>
          </ExtraButton> */}
          <label className="labelPrice">QAR {intgration2.price}</label>
        </div>
      </MainSection>
    </div>
  );
}

export default ExtraTable;
