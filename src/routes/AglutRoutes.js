import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import ForgetPassword from "../app/Auth/Forget/ForgetPassword";
import Login from "../app/Auth/Login/Login";
import DashboardAglut from "../features/Dashboard/DashboardAglut";
import CreateDiscount from "../features/Discount/CreateDiscount";
import Discount from "../features/Discount/Discount";
import Welcome from "../features/Welcome/Welcome";
import EditDiscount from "../features/Discount/EditDiscount";
import Feedback from "../features/Feedback/Feedback";
import FeedbackSummary from "../features/Feedback/FeedbackSummary";
import Integration from "../features/Integration/Integration";
import InvoicePlan from "../features/Invoices/InvoicePlan";
import Invoices from "../features/Invoices/Invoices";
import InvoicesView from "../features/Invoices/InvoicesView";
import MenuIndex from "../features/Menu/MenuIndex";
import Menu from "../features/Menu/Menus/Menu";
import OptionModule from "../features/Menu/OptionModule/OptionModule";
import ViewModifierGroup from "../features/Menu/OptionModule/ViewModifierGroup";

import CreateSectionItem from "../features/Menu/SectionItem/CreateSectionItem";
import EditSectionItem from "../features/Menu/SectionItem/EditSectionItem";
import SectionItem from "../features/Menu/SectionItem/SectionItem";
import Section from "../features/Menu/Sections/Section";
import AddOrderDetail from "../features/Orders/AddOrderDetail";
import CompletedShowDetails from "../features/Orders/COMPLETED/CompletedShowDetails";
import OrderDetails from "../features/Orders/OrderDetails";

import Orders from "../features/Orders/Orders";
import Profile from "../features/Profile/Profile";
import QRCode from "../features/QRMenu/QRCode/QRCode";
import QRMenuBranding from "../features/QRMenu/QRMenuBranding/QRMenuBranding";
import ORMenuGroup from "../features/QRMenu/QRMenuGroup/ORMenuGroup";
import QRMenuIndex from "../features/QRMenu/QRMenuIndex";
import CreateUser from "../features/UserManagement/CreateUser";
import UserManagment from "../features/UserManagement/UserManagment";
import Dashboard from "../layout/Dashboard/Dashboard";
import NotFound from "../components/NotFound";
import AddItems from "../features/Orders/AddItems";
import Test from "../Test/Test";
import POS from "../features/Integration/POS";

// import type { RootState } from '../../app/store'

// This function is used for Authentication when user's credentials will be valid.
function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated !== null) {
    return <Navigate to="/aglut/profile" replace />;
  }
  return <Outlet />;
}

// This function is used for Authentication when user's credentials will be invalid.
function PrivateRoute({ isAuthenticated }) {
  if (isAuthenticated === null) return <Navigate to="/" />;
  return <Outlet />;
}

export default function AglutRoutes() {
  const credentials = useSelector((state) => state.loginAuth.token);
  const Permission = useSelector((state) => state.loginAuth.permissions);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute isAuthenticated={credentials} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/forgotPassword" element={<ForgetPassword />} />
        </Route>

        <Route element={<PrivateRoute isAuthenticated={credentials} />}>
          <Route path="*" element={<NotFound />} />

          <Route path="/aglut" element={<Dashboard />}>
            <Route path="/aglut/test" element={<Test />} />
            <Route path="/aglut/profile" element={<Profile />} />
            <Route path="/aglut/dashboard" element={<DashboardAglut />} />
            <Route path="/aglut/user-Managment" element={<UserManagment />} />
            <Route
              path="/aglut/user-Managment/create"
              element={<CreateUser />}
            />
            <Route path="/aglut/menu" element={<MenuIndex />}>
              <Route path="/aglut/menu/menus" element={<Menu />} />
              <Route path="/aglut/menu/sections" element={<Section />} />
              <Route
                path="/aglut/menu/sectionItems"
                element={<SectionItem />}
              />
              {Permission?.menu ? (
                <>
                  <Route
                    path="/aglut/menu/sectionItems/create"
                    element={<CreateSectionItem />}
                  />
                  <Route
                    path="/aglut/menu/sectionItems/edit/:id"
                    element={<EditSectionItem />}
                  />
                </>
              ) : (
                <Route path="*" element={<NotFound />} />
              )}
              <Route
                path="/aglut/menu/optionModule"
                element={<OptionModule />}
              />

              <Route
                path="/aglut/menu/optionModule/view/:id"
                element={<ViewModifierGroup />}
              />
            </Route>
            <Route path="/aglut/feedback" element={<Feedback />} />
            <Route
              path="/aglut/feedback/summary/:id"
              element={<FeedbackSummary />}
            />
            <Route path="/aglut/qr-menu" element={<QRMenuIndex />}>
              <Route path="/aglut/qr-menu/code" element={<QRCode />} />
              <Route path="/aglut/qr-menu/group" element={<ORMenuGroup />} />
              <Route
                path="/aglut/qr-menu/branding"
                element={<QRMenuBranding />}
              />
            </Route>
            <Route path="/aglut/orders" element={<Orders />} />
            <Route
              path="/aglut/orders/completed/details/:id"
              element={<CompletedShowDetails />}
            />
            <Route
              path="/aglut/orders/OrderDetails/:id"
              element={<OrderDetails />}
            />

            <Route
              path="/aglut/orders/OrderDetails/addItems/:id"
              element={<AddItems />}
            />

            <Route
              path="/aglut/orders/addorder/details"
              element={<AddOrderDetail />}
            />
            <Route path="/aglut/discount" element={<Discount />} />
            {Permission?.discount ? (
              <>
                <Route
                  path="/aglut/discount/create"
                  element={<CreateDiscount />}
                />
                <Route
                  path="/aglut/discount/edit/:id"
                  element={<EditDiscount />}
                />
              </>
            ) : (
              <Route path="*" element={<NotFound />} />
            )}
            <Route path="/aglut/payment" element={<Invoices />} />
            <Route path="/aglut/payment/plan" element={<InvoicePlan />} />
            <Route
              path="/aglut/payment/invoicesdetails/:id"
              element={<InvoicesView />}
            />
            <Route path="/aglut/integration" element={<Integration />} />
            <Route
              path="/aglut/integration/microssimphonyPOS"
              element={<POS />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
