import { postApi, getApi, putApi, deleteApi } from "./ApiMethod";

const AUTH_CHANGEPASSWORD = "restaurents/changePassword";

const PROFILE_DETAILS = "restaurents/restaurentDetails";

const CHANGE_PROFILEIMAGE = "restaurents/updateRestaurentProfile";

const PROFILE_UPDATE = "restaurents/updateRestaurent";

const PROFILE_CURRENCY = "restaurents/getCurrencyList";

const CREATE_MENU = "restaurents/addMenu";

const LISTING_MENU = "restaurents/getMenu";

const GETDETAILS_MENU = "restaurents/getMenuById";

const EDIT_MENU = "restaurents/editMenu";

const DELETE_MENU = "restaurents/deleteMenu";

const CHANGESTATUS_MENU = "restaurents/changeMenuStatus";

const ALLLISTING_SECTION = "restaurents/ListSections";

const CREATE_MENUSECTION = "restaurents/addSection";

const LISTING_SECTIONBYMENU = "restaurents/getMenuSections";

const INFO_SECTIONMENU = "restaurents/ListSections";

const EDIT_SECTIONMENU = "restaurents/editSection";

const DELETE_SECTIONMENU = "restaurents/deleteSection";

const CHANGESTATUS_MENUSECTION = "restaurents/changeSectionStatus";

const CREATE_MODIFIER = "restaurents/createModifierGroup";

const LISTING_OPTION = "restaurents/listOptionModifiers";

const INFO_OPTIONMENU = "restaurents/getOptionModifier";

const DELETE_OPTIONMENU = "restaurents/deleteOptionModifier";

const EDIT_OPTIONMENU = "restaurents/updateOptionGroupModule";

const CREATE_SECTIONITEM = "restaurents/createRestaurentItem";

const DELETE_MODIFIER_ITEM = "restaurents/deleteOptionGroupModule";

const LISTING_SECTION_ITEM = "restaurents/getRestaurentItemList";

const VIEW_SECTION_ITEM = "restaurents/getRestaurentItem";

const DELETE_SECTION_ITEM = "restaurents/deleteRestaurentItem";

const LISTING_ALL_ALLERGIES = "restaurents/getAllergies";

const CHANGESTATUS_OPTIONMODULE = "restaurents/updateOptionModifierStatus";

const CHANGESTATUS_SECTIONITEMMODULE =
  "restaurents/itemStatusEnableOrDisableByRestaurent";

const EDIT_SECTIONITEM = "restaurents/editRestaurentItem";

const SEARCH_SECTION_ITEM = "restaurents/searchRestauerentItem";

const CREATE_MENUGROUP = "restaurents/createQrMenuGroup";

const LISTING_MENUGROUP = "restaurents/getQrListing";

const VIEW_MENUGROUP = "restaurents/getQrGroupDetails";

const EDIT_MENUGROUP = "restaurents/editQrMenuGroup";

const DELETE_MENUGROUP = "restaurents/deleteQrMenuGroup";

const CREATE_QRCODE = "restaurents/createQrCode";

const LISTING_QR_CODE = "restaurents/listQrcode";

const VIEW_QR_CODE = "restaurents/getQrCodeDetails";

const EDIT_QR_CODE = "restaurents/editQrCode";

const DELETE_QR_CODE = "restaurents/deleteQrCode";

const MENU_BRANDING = "restaurents/getMenuBrandingByRestaurent";

const UPDATE_THEME = "restaurents/updateMenuPageBranding";

const EXISTING_MENU_BYSECTION = "restaurents/getExistingSectionMenus";

const QRGROUP_LISTING = "restaurents/getQrGroupListing";

const ACTIVE_MENU = "restaurents/activeMenuDetails";

const ADD_ORDER = "restaurents/addOrder";

const LISTING_ORDER = "restaurents/orderListByOrderType";

const ORDER_DETAILS = "restaurents/orderListByQrCode";

const ADD_ITEMS = "restaurents/addOrderItems";

const DELETE_ORDER_ITEM = "restaurents/deleteOrderItems";

const COMPLETED_ORDER_DETAILS = "restaurents/getOrderDetails";

const SEARCH_ORDER_COMPLETED = "restaurents/searchOrder";

const CHANGE_ORDER_STATUS = "restaurents/changeRealtimeOrderStatus";

const PROFILE_TIMEZONE = "restaurents/getTimeZones";

const UPDATE_ORDER_STATUS = "restaurents/updateOrderfullstatus";

const FEEDBACK_LISTING = "restaurents/ListFeedbacks";

const DISCOUNT_LISTING = "restaurents/ListRestaurentDiscounts";

const DISCOUNT_VIEW = "restaurents/ViewRestaurentDiscounts";

const OFFER_ITEM_LISTING = "restaurents/activeMenuItems";

const CREATE_DISCOUNT = "restaurents/createDiscount";

const EDIT_DISCOUNT = "restaurents/editDiscount";

const ITEM_SECTION_IN_ORDER = "restaurents/getItemDetails";

const EDIT_EXISTING_ORDER = "restaurents/editOrderItems";

const DELETE_DISCOUNT = "restaurents/deleteDiscount";

const CREATE_USER = "restaurents/addRestaurentMember";

const PROFILE_UPDATE_TIMING = "restaurents/updateRestaurent/operationalHours";

const LISTING_USER_MANAGMENT = "restaurents/getSubUserList";

const EDIT_USER = "restaurents/updateSubUser";

const DELETE_USER_MANAGEMENT = "restaurents/deleteSubUser";

const SEARCH_USER_MANAGMENT = "restaurents/searchSubUser";

const SEARCH_QRMENU_GROUPS = "restaurents/searchQrGroup";

const SEARCH_QRCODE = "restaurents/searchQrCode";

const USER_MANAGMENT_ROLE_PERMISSION = "restaurents/viewPermissions";

const UPDATE_USER_MANAGMENT_ROLE_PERMISSION = "restaurents/updatePermissions";

const UPDATE_SEEN_NOTIFICATIONSTATUS = "customer/statusUpdateByRestaurent";

const GET_MESSAGE_BY_IDENTIFIER = "customer/getMessageByIdentifier";

const PENDING_ITEM_PAYMENT = "restaurents/CompleteOrderStatus";

const UPDATE_SECTIONCARD_POSTION = "restaurents/updateSectionPosition";

const UPDATE_SECTIONITEM_POSTION = "restaurents/updateItemPosition";

const PROFILE_DELETE = "restaurents/deleteMenuBrandingImage";

const CREATE_POS_DETAILS = "restaurents/addPosDetails";

const GET_INFO_POS = "restaurents/getPosDetails";

const UPDATE_POS_INFO = "restaurents/updatePosDetails";

const GET_RESTUARENT_ALL_ITEMS = "restaurents/getRestaurentItemListPos";

const GET_POS_ALL_ITEMS = "restaurents/getPosListing";

const SEARCH_FEEDBACK = "restaurents/searchFeedback";

const SYNC_WITH_POSITEMS = "restaurents/PosIntegration";

const UNSYNC_WITH_POSITEMS = "restaurents/unlinkPos";



// Auth section

export const changePassword = (payload) => {
  return putApi(AUTH_CHANGEPASSWORD, payload);
};

//Profile

export function getCurrencyList() {
  return getApi(PROFILE_CURRENCY);
}

export function getTimeZoneList() {
  return getApi(PROFILE_TIMEZONE);
}

export const changeProfileImage = (payload) => {
  return putApi(CHANGE_PROFILEIMAGE, payload);
};

export function profileDetails() {
  return getApi(PROFILE_DETAILS);
}

export const updateProfile = (payload) => {
  return putApi(PROFILE_UPDATE, payload);
};

export const updateRestaurantTiming = (payload) => {
  return putApi(PROFILE_UPDATE_TIMING, payload);
};

// MENU
export function createMenu(payload) {
  return postApi(CREATE_MENU, payload);
}

export function menuListing() {
  return getApi(LISTING_MENU);
}

export const viewMenu = (id) => {
  return getApi(`${GETDETAILS_MENU}?menu_id=${id}`);
};

export const editMenu = (payload) => {
  return putApi(EDIT_MENU, payload);
};

export const deleteMenu = (id) => {
  return deleteApi(`${DELETE_MENU}?menu_id=${id}`);
};

export const changeMenuStatus = (payload) => {
  return putApi(CHANGESTATUS_MENU, payload);
};

// MENUS SECTION
export const alllistingSection = () => {
  return getApi(ALLLISTING_SECTION);
};

export const createMenuSection = (payload) => {
  return postApi(CREATE_MENUSECTION, payload);
};

export const sectionByMenu = (id) => {
  return getApi(`${LISTING_SECTIONBYMENU}?menu_id=${id}`);
};

export const viewSectionMenu = (id) => {
  return getApi(`${INFO_SECTIONMENU}?section_id=${id}`);
};

export const editSectionMenu = (payload) => {
  return putApi(EDIT_SECTIONMENU, payload);
};

export const deleteSectionMenu = (id) => {
  return deleteApi(`${DELETE_SECTIONMENU}?section_id=${id}`);
};

export const changeMenuSectionStatus = (payload) => {
  return putApi(CHANGESTATUS_MENUSECTION, payload);
};

//Option Module

export const createModifier = (payload) => {
  return postApi(CREATE_MODIFIER, payload);
};

export const optionListing = () => {
  return getApi(LISTING_OPTION);
};

export const viewOptionMenu = (payload) => {
  return getApi(`${INFO_OPTIONMENU}?option_group_id=${payload}`);
};

export const deleteOptionMenu = (id) => {
  return deleteApi(`${DELETE_OPTIONMENU}?option_group_id=${id}`);
};

export const changeStatusOptionModule = (payload) => {
  // return putApi(CHANGESTATUS_OPTIONMODULE, payload);
  return putApi(CHANGESTATUS_OPTIONMODULE, payload);
};

export const changeStatusItemModule = (payload) => {
  // return putApi(CHANGESTATUS_OPTIONMODULE, payload);
  return putApi(CHANGESTATUS_SECTIONITEMMODULE, payload);
};

export const editOptionMenu = (payload) => {
  return putApi(EDIT_OPTIONMENU, payload);
};

export const deleteModifieritem = (payload) => {
  return deleteApi(`${DELETE_MODIFIER_ITEM}?modifier_item_id=${payload}`);
};

// Section Item Module

export const createRestaurentSectionItem = (payload) => {
  return postApi(CREATE_SECTIONITEM, payload);
};

export const getAllergiesList = () => {
  return getApi(LISTING_ALL_ALLERGIES);
};

export const sectionItemListing = (payload) => {
  return getApi(
    `${LISTING_SECTION_ITEM}?pageNumber=${payload.pageNumber}&perPage=${payload.perPage}`
  );
};

export const deleteSectionItem = (payload) => {
  return deleteApi(`${DELETE_SECTION_ITEM}?id=${payload}`);
};

export const viewSectionItem = (payload) => {
  return postApi(VIEW_SECTION_ITEM, payload);
};

export const editRestaurentSectionItem = (payload) => {
  return putApi(EDIT_SECTIONITEM, payload);
};

export const searchSectionItem = (payload) => {
  return postApi(SEARCH_SECTION_ITEM, payload);
};

//QR Menu Groups

export const createMenuGroups = (payload) => {
  return postApi(CREATE_MENUGROUP, payload);
};

export function listingMenuGroups(id) {
  return getApi(`${LISTING_MENUGROUP}?pageNumber= ${id}`);
}

export function showQrMenuListing(payload) {
  return getApi(
    `${LISTING_MENUGROUP}?pageNumber= ${payload.pageNumber}&perPage=${payload.perPage}`
  );
}

export const viewMenusGroup = (id) => {
  return getApi(`${VIEW_MENUGROUP}?qr_group_id=${id}`);
};

export const editMenuGroups = (payload) => {
  return putApi(EDIT_MENUGROUP, payload);
};

export const deleteMenuGroup = (payload) => {
  return deleteApi(`${DELETE_MENUGROUP}?qr_code_group_id=${payload}`);
};

export const searchQrcode = (payload) => {
  return postApi(SEARCH_QRCODE, payload);
};

// QR Code

export function createQrCode(payload) {
  return postApi(CREATE_QRCODE, payload);
}

export const qrCodeListing = (pageNumber) => {
  return getApi(`${LISTING_QR_CODE}?pageNumber=${pageNumber}`);
};

export const showQrCodeListing = (payload) => {
  return getApi(
    `${LISTING_QR_CODE}?pageNumber=${payload.pageNumber}&perPage=${payload.perPage}`
  );
};

export const viewQrCode = (id) => {
  return getApi(`${VIEW_QR_CODE}?qr_code_id=${id}`);
};

export const editQrCode = (payload) => {
  return putApi(EDIT_QR_CODE, payload);
};

export const deleteQRCode = (payload) => {
  return deleteApi(`${DELETE_QR_CODE}?qr_code_id=${payload}`);
};

export const searchQrMenuGroups = (payload) => {
  return postApi(SEARCH_QRMENU_GROUPS, payload);
};

// Branding QR module

export const brandingTheme = () => {
  return getApi(MENU_BRANDING);
};

export const updateBrandingTheme = (payload) => {
  return putApi(UPDATE_THEME, payload);
};

export function existingSectionMenusListing() {
  return getApi(EXISTING_MENU_BYSECTION);
}

export const profileDeleteTheme = (payload) => {
  return putApi(PROFILE_DELETE, payload);
};

// Order section

export function getQrGroupListing(type) {
  return getApi(`${QRGROUP_LISTING}?type=${type}`);
}

export function activeMenuDetails() {
  return getApi(ACTIVE_MENU);
}

export const takeOrder = (payload) => {
  return postApi(ADD_ORDER, payload);
};

export function getOrderListing(type) {
  // Type =>  1 for Dine In 2 for Takeaway 3 for completed
  return getApi(`${LISTING_ORDER}?order_type=${type}`);
}

export function getOrderDetail(id) {
  return getApi(`${ORDER_DETAILS}?qr_code_id=${id}`);
}

export const addItemsInExistingOrder = (payload) => {
  return putApi(ADD_ITEMS, payload);
};

export const deleteOrderItem = (id) => {
  return deleteApi(`${DELETE_ORDER_ITEM}?order_item_id=${id}`);
};

export function getCompletedOrderDetails(id) {
  return getApi(`${COMPLETED_ORDER_DETAILS}?order_id=${id}`);
}

export const searchCompletedOrder = (payload) => {
  return postApi(SEARCH_ORDER_COMPLETED, payload);
};

export const getCurrentOrderStatus = (payload) => {
  return putApi(CHANGE_ORDER_STATUS, payload);
};

export function feedbackListing() {
  return getApi(FEEDBACK_LISTING);
}

export const pendingItemPayment = (payload) => {
  return putApi(PENDING_ITEM_PAYMENT, payload);
};

export const getUpdateOrderStatus = (payload) => {
  return putApi(UPDATE_ORDER_STATUS, payload);
};

// DISCOUNT & FREE ITEMS MODULE

export function createDiscount(payload) {
  return postApi(CREATE_DISCOUNT, payload);
}

export function editDiscount(payload) {
  return putApi(EDIT_DISCOUNT, payload);
}

export function offerItemDeatils() {
  return getApi(OFFER_ITEM_LISTING);
}

export function discountListing() {
  return getApi(DISCOUNT_LISTING);
}

export function viewDiscountDetails(id) {
  return getApi(`${DISCOUNT_VIEW}?discount_id=${id}`);
}

export function getItemDetails(id) {
  return getApi(`${ITEM_SECTION_IN_ORDER}?item_id=${id}`);
}

export const editExistingItemsinOrder = (payload) => {
  return putApi(EDIT_EXISTING_ORDER, payload);
};

export const deleteDiscount = (id) => {
  return deleteApi(`${DELETE_DISCOUNT}?discount_id=${id}`);
};

// USER-MANAGMENT APIS

export function createUser(payload) {
  return postApi(CREATE_USER, payload);
}

export function userManagmentListing(id) {
  return getApi(`${LISTING_USER_MANAGMENT}?pageNumber= ${id}`);
}

export function editUser(payload) {
  return putApi(EDIT_USER, payload);
}

export const deleteUserManagement = (id) => {
  return deleteApi(`${DELETE_USER_MANAGEMENT}?id=${id}`);
};

export const searchUserManagement = (payload) => {
  return postApi(SEARCH_USER_MANAGMENT, payload);
};

export const userManagmentRolePermission = (payload) => {
  return getApi(USER_MANAGMENT_ROLE_PERMISSION, payload);
};

export const updateRolePermission = (payload) => {
  return putApi(UPDATE_USER_MANAGMENT_ROLE_PERMISSION, payload);
};

export const updateSeenNotificationStatus = (payload) => {
  return putApi(UPDATE_SEEN_NOTIFICATIONSTATUS, payload);
};

export const getMessageIdentifier = () => {
  return postApi(GET_MESSAGE_BY_IDENTIFIER);
};

export const updateSectionPosition = (payload) => {
  return putApi(UPDATE_SECTIONCARD_POSTION, payload);
};

export const updateSectionItemPosition = (payload) => {
  return putApi(UPDATE_SECTIONITEM_POSTION, payload);
};

export const CreatePosDetails = (payload) => {
  return postApi(CREATE_POS_DETAILS, payload);
};

export const getPosDetails = (payload) => {
  return getApi(GET_INFO_POS, payload);
};

export const EditPosDetails = (payload) => {
  return putApi(UPDATE_POS_INFO, payload);
};

export const getRestaurentItemListing = (payload) => {
  return getApi(`${GET_RESTUARENT_ALL_ITEMS}?pageNumber=${payload.pageNumber}&type=${payload.type}`);
};

export const getPosItemListing = () => {
  return getApi(`${GET_POS_ALL_ITEMS}`);
};

export const searchFeedback = (payload) => {
  return getApi(`${SEARCH_FEEDBACK}?search=${payload}`);
};

export const SyncingResItemWithPosItem = (payload) => {
  return postApi(SYNC_WITH_POSITEMS, payload);
};

export const UnsyncingResItemWithPosItem = (payload) => {
  return postApi(UNSYNC_WITH_POSITEMS, payload);
};



