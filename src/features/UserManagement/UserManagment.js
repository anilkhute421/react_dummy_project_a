import React, { useEffect } from "react";
import styled from "styled-components";
import {
  BoxContainer,
  FilterButton,
  FilterSection,
  LoadingWrapper,
  NODATA,
  OrangeButton,
  SubHeader,
} from "../../style/Gobalstyle";
import UserManagementTable from "../UserManagement/UserManagementTable";
import { useState } from "react";
import CreateUser from "../UserManagement/CreateUser";
import {
  userManagmentListing,
  searchUserManagement,
  userManagmentRolePermission,
  updateRolePermission,
} from "../../services/Collection";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import PaginationRounded from "../../components/PaginationRounded";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../app/Auth/Login/LoginStore";
import IntlMessage from "../../Utils/IntlMessage";
import { ExportFeature } from "../../Utils/ExportFiles";
import FilterUser from "./FilterUser";
// import { Logout } from "@mui/icons-material";

export default function UserManagment() {
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [userManagmentData, setuserManagementData] = useState([]);
  const [userManagmentRolePermissionData, setuserManagementRolePermissionData] =
    useState([]);
  const [loading, setLoading] = useState(false);
  const [permissionloader, setPermissionLoader] = useState(false);
  const [userManagmentPage, setUserManagmentPage] = useState(null);
  const [pageNumber, setPagenumber] = useState(1);
  const [openFilterSection, setOpenFilterSection] = useState(false);
  const [filterSectionData, setfilterSectionData] = useState(null);
  const [userData, setUserData] = useState(null);

  const currentRoles = useSelector((state) => state.loginAuth);
  const dispatch = useDispatch();
  const userManagmentPermission = useSelector(
    (state) => state.loginAuth.permissions.user_management
  );
  const RestaurentID = useSelector(
    (state) => state?.profileDetails?.restaurantDetails?.id
  );

  const UserHeader = [
    {
      id: <IntlMessage id="userManagement.firstName" />,
      key: "first_name",
    },
    {
      id: <IntlMessage id="userManagement.lastName" />,
      key: "last_name",
    },
    {
      id: <IntlMessage id="userManagement.Email" />,
      key: "email",
    },
    {
      id: <IntlMessage id="userManagement.Role" />,
      key: "role",
    },
    {
      id: <IntlMessage id="userManagement.Action" />,
      key: "Action",
    },
  ];

  const RolePermissionHeader = [
    {
      id: <IntlMessage id="userManagement.rolePermission.user" />,
      key: "role",
    },
    {
      id: <IntlMessage id="userManagement.rolePermission.profile" />,
      key: "profile",
    },
    {
      id: <IntlMessage id="userManagement.rolePermission.dashboard" />,
      key: "dashboard",
    },

    {
      id: <IntlMessage id="userManagement.rolePermission.management" />,
      key: "user_management",
    },

    {
      id: <IntlMessage id="userManagement.rolePermission.menu" />,
      key: "menu",
    },
    {
      id: <IntlMessage id="userManagement.rolePermission.feedback" />,
      key: "feedback",
    },

    {
      id: <IntlMessage id="userManagement.rolePermission.qrMenu" />,
      key: "qr_menu",
    },

    {
      id: <IntlMessage id="userManagement.rolePermission.discount" />,
      key: "discount",
    },

    {
      id: <IntlMessage id="userManagement.rolePermission.invoice" />,
      key: "invoice_and_payments",
    },

    {
      id: <IntlMessage id="userManagement.rolePermission.integration" />,
      key: "integration",
    },
  ];

  const OpenCreateUser = () => {
    setOpenCreateUser(true);
  };

  const OpenFilterUser = () => {
    setOpenFilterSection(true);
  };

  const myValue = (pages) => {
    setPagenumber(pages);
  };

  const fetchData = async () => {
    setLoading(true);
    let req = {
      pageNumber: pageNumber,
      role: userData,
    };

    console.log();
    let res = await userManagmentListing(req);
    if (res.status === 200) {
      setuserManagementData(res.data);
      setUserManagmentPage(res.extraData);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getWord = async (word) => {
    setLoading(true);
    const req = {
      search: word,
      pageNumber: pageNumber,
    };

    let res = await searchUserManagement(req);
    if (res.status === 200) {
      setuserManagementData(res.data);
      setUserManagmentPage(res.extraData);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const fetchDataRolePermission = async () => {
    setPermissionLoader(true);
    let res = await userManagmentRolePermission();
    if (res.status === 200) {
      setuserManagementRolePermissionData(res.data);
      if (res.data) {
        res.data?.map((el) => {
          if (el?.role === currentRoles.permissions.role) {
            let loginAuth = {
              data: currentRoles.data,
              token: currentRoles.token,
              permissions: el,
            };
            dispatch(loginSuccess(loginAuth));
          }
          return 0;
        });
      }
      setPermissionLoader(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setPermissionLoader(false);
    }
  };

  const updateRoles = async (payload, selectedSection, status) => {
    let req = {
      permission_id: payload.id,
      module_name: selectedSection,
      status: !status,
    };
    setPermissionLoader(true);
    let res = await updateRolePermission(req);
    if (res.status === 200) {
      toast.info(res.message);
      fetchDataRolePermission();
      setPermissionLoader(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setPermissionLoader(false);
    }
  };

  const TableAction = {
    apply: userManagmentPermission ? true : false,
    view: false,
    edit: true,
    delete: true,
    alldata: fetchData,
  };

  const selectUser = (e) => {
    setfilterSectionData({ value: e.target.span });
    console.log(filterSectionData);
  };

  const callback = async (user , reset) => {
     if(!reset){
      setUserData(user);
     }
    setLoading(true);
    let req = {
      pageNumber: pageNumber,
      role: user,
    };

    console.log();
    let res = await userManagmentListing(req);
    if (res.status === 200) {
      setuserManagementData(res.data);
      setUserManagmentPage(res.extraData);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  //Runs only on the first render

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  //Runs only on the first render
  useEffect(() => {
    fetchDataRolePermission();
  }, []);

  return (
    <div>
      {openCreateUser && (
        <CreateUser
          open={openCreateUser}
          handleClose={() => setOpenCreateUser(false)}
          getAllsection={fetchData}
        />
      )}

      {openFilterSection && (
        <FilterUser
          open={openFilterSection}
          handleClose={() => setOpenFilterSection(false)}
          getAllsection={fetchData}
          callback={callback}
        />
      )}

      <SubHeader>
        <p>
          <IntlMessage id="userManagement.heading" />
        </p>

        {userManagmentPermission ? (
          <OrangeButton onClick={OpenCreateUser}>
            <IntlMessage id="button.addUser" />
          </OrangeButton>
        ) : (
          ""
        )}
      </SubHeader>

      <BoxContainer>
        <FilterSection>
          <ShowButton>
            <p>
              <IntlMessage id="button.show" />
            </p>
            <input type="number" value={10} />
          </ShowButton>
          <SearchFEwrapper>
            <SearchButton>
              <i className="icon-Search" />
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => getWord(e.target.value)}
              />
            </SearchButton>
            <FilterWrapper>
              <FilterButton onClick={OpenFilterUser}>
                <i className="icon-Filter" />
                <p>
                  <IntlMessage id="button.Filters" />
                </p>
              </FilterButton>

              <FilterButton
                onClick={() =>
                  ExportFeature(
                    `https://aqlutstorage.blob.core.windows.net/exportfile/Memberlist${RestaurentID}.xlsx`
                  )
                }
              >
                <i className="icon-Export" />
                <p>
                  <IntlMessage id="button.Export" />
                </p>
              </FilterButton>
            </FilterWrapper>
          </SearchFEwrapper>
        </FilterSection>

        {loading ? (
          <LoadingWrapper>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <>
            {userManagmentData?.length <= 0 ? (
              <NODATA>
                <IntlMessage id="noData" />
              </NODATA>
            ) : (
              <UserManagementTable
                header={UserHeader}
                tableData={userManagmentData}
                action={TableAction}
              />
            )}
          </>
        )}

        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <PaginationRounded
            PaginationRounded={userManagmentPage}
            onChangePage={(_page) => myValue(_page)}
          />
        </div>
      </BoxContainer>

      <BoxContainer>
        <TableNameSection>
          <p>
            <IntlMessage id="userManagement.rolePermission.heading" />
          </p>
        </TableNameSection>
        {permissionloader ? (
          <LoadingWrapper style={{ minHeight: "200px" }}>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <>
            {userManagmentRolePermissionData?.length === 0 ? (
              <NODATA>
                <IntlMessage id="noData" />
              </NODATA>
            ) : (
              <UserManagementTable
                style={{ width: "300px" }}
                header={RolePermissionHeader}
                tableData={userManagmentRolePermissionData}
                action={TableAction}
                updateRolesOfTrue={updateRoles}
              />
            )}
          </>
        )}
      </BoxContainer>
    </div>
  );
}

const TableNameSection = styled.div`
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    color: #000000;
  }
`;

const ShowButton = styled.div`
  display: flex;
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);
    width: 40px;
    margin-top: 25px;
  }

  input {
    width: 51px;
    height: 23px;
    background: #ffffff;
    margin: 20px 6px 0 6px;
    padding: 0 5px;
    border: 1px solid #e8e8e8;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const SearchButton = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.28);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 13px 10px;
  margin: 0 6px 0 6px;
  cursor: pointer;

  i {
    font-size: 14px;
    margin: 0 6px 0 6px;
  }

  input {
    width: 100%;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    margin: 0 5px 0 6px;
    opacity: 0.9;
  }

  input:focus {
    outline: none;
  }

  @media (max-width: 745px) {
    margin: 10px 0px;
  }
`;

const SearchFEwrapper = styled.div`
  display: flex;
  @media (max-width: 745px) {
    display: unset;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Staff = styled.div`
  width: 100px;
  height: 35px;
  cursor: pointer;
  border-radius: 7px;
  left: ${({ dir }) => dir === "rtl" && "40px"};
  right: ${({ dir }) => dir === "ltr" && "40px"};

  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 2px 2px 10px #000;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 0px 10px;

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #a1a1a1;
    margin: 0 6px 0 6px;
  }
`;

const Owner = styled.div`
  width: 100px;
  height: 35px;
  cursor: pointer;
  border-radius: 7px;
  left: ${({ dir }) => dir === "rtl" && "40px"};
  right: ${({ dir }) => dir === "ltr" && "40px"};

  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 2px 2px 10px #000;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 0px 10px;

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #a1a1a1;
    margin: 0 6px 0 6px;
  }
`;

const Reset = styled.div`
  width: 100px;
  height: 35px;
  cursor: pointer;
  border-radius: 7px;
  left: ${({ dir }) => dir === "rtl" && "40px"};
  right: ${({ dir }) => dir === "ltr" && "40px"};

  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 2px 2px 10px #000;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 0px 10px;

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: red;
    margin: 0 6px 0 6px;
  }
`;
