import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { discountListing } from "../../services/Collection";
import {
  BoxContainer,
  LoadingWrapper,
  NODATA,
  OrangeButton,
  SubHeader,
} from "../../style/Gobalstyle";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import IntlMessage from "../../Utils/IntlMessage";
import DiscountTable from "./DiscountTable";

export default function Discount() {
  // const direction = useSelector((state) => state.languageDirection.direction);
  // const [selectedDiscount, setSelectedDiscount] = useState("itemFree");
  const [loading, setLoading] = useState(false);
  const [discountList, setDiscountList] = useState([]);

  const navigate = useNavigate();

  const discountPermission = useSelector((state) => state.loginAuth.permissions.discount);

  const UserHeader = [
    {
      id: <IntlMessage id="invoicePayment.srNo"/>,
      key: "SrNo",
    },
    {
      id: <IntlMessage id="disFreeItems.offerTitle"/>,
      key: "title",
    },
    {
      id: <IntlMessage id="disFreeItems.Type"/>,
      key: "discount_type",
    },
    {
      id: <IntlMessage id="Menu.createItem.Description"/>,
      key: "description",
    },
    {
      id: <IntlMessage id="Menu.sectionItem.Action"/>,
      key: "action",
    },
  ];



  const getDiscountListing = async () => {
    setLoading(true);
    let res = await discountListing();
    if (res.status === 200) {
      setDiscountList(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };


  const TableAction = {
    apply: true,
    view: true,
    edit: discountPermission,
    delete: discountPermission,
    fetchdata: getDiscountListing
  };


  useEffect(() => {
    getDiscountListing();
  }, []);

  return (
    <div>
      <SubHeader>
        <p><IntlMessage id="disFreeItems.Heading"/></p>
        { discountPermission && 
        <OrangeButton onClick={() => navigate("/aglut/discount/create")}>
         <IntlMessage id="button.createDis"/>
        </OrangeButton>
        }
      </SubHeader>
      <BoxContainer>
        {loading ? (
          <LoadingWrapper>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <>
            {discountList?.length === 0 ? (
              <NODATA><IntlMessage id="noData"/></NODATA>
            ) : (
              <DiscountTable
                header={UserHeader}
                tableData={discountList}
                action={TableAction}
              />
            )}
          </>
        )}
      </BoxContainer>
    </div>
  );
}
