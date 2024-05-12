import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Delete from "../../components/Delete";
import ToggleSwitch from "../../components/ToggleSwitch";
import { ProfilePicture } from "../../Utils/Images";
import { ActionDiv, Table, TableWrapper, TBody, THead } from "./MenuStyle";
import EditOptionModule from "./OptionModule/EditOptionModule";
import ViewSectionItem from "./SectionItem/ViewSectionItem";
import { aqlutstorage, containerItem } from "../../Utils/ContainerPath";

import {
  deleteOptionMenu,
  deleteSectionItem,
  changeStatusOptionModule,
  changeStatusItemModule
} from "../../services/Collection";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { CircularProgress } from "@mui/material";
import { LoadingWrapper } from "../../style/Gobalstyle";

export default function MenuTable({ header, tableData, action }) {
  const direction = useSelector((state) => state.languageDirection.direction);

  return (
    <TableWrapper>
      <Table>
        <thead>
          <TableHeader data={header} dir={direction} />
        </thead>
        <div className="forMargin" />
        {tableData?.map((item, index) => (
          <TableBody
            header={header}
            body={item}
            action={action}
            index={index}
            id={item.id}
            dir={direction}
          />
        ))}
      </Table>
    </TableWrapper>
  );
}

const TableHeader = ({ data, dir }) => {
  return (
    <THead dir={dir}>
      {data.map((item, index) => (
        <th key={index}>{item.id}</th>
      ))}
    </THead>
  );
};

const TableBody = ({ body, header, action, index, id, dir }) => {
  //   const [show, setShow] = useState();
  //   const navigate = useNavigate();
  //   const [openDelete, setOpenDelete] = useState();
  //   const [deleteData, setDeleteData] = useState({});
  //   const handleClickAway = () => {
  //     setShow(false);
  //   };

  return (
    <tbody className="tbody">
      <TBody dir={dir}>
        {header.map((el) => (
          <td style={{ padding: "0 5px" }}>
            {el.key === "Action" && action.apply ? (
              <TableAction action={action} data={body} />
            ) : el.key === "status" && action.apply && action.toggle ? (
              <TableToggle data={body} action={action} />
            ) : el.id === "Names" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                }}
              >
                <ProfilePic>
                  {body.image !== null ? (
                    <img
                      src={`${aqlutstorage}${containerItem}${body?.image}`}
                      alt=""
                    />
                  ) : (
                    <div>
                      <img src={ProfilePicture} alt="" />
                    </div>
                  )}
                </ProfilePic>
                {body[el.key]}
              </div>
            ) : (
              body[el.key]
            )}
          </td>
        ))}
      </TBody>
      <div className="forMargin" />
    </tbody>
  );
};

const TableToggle = ({ data , action}) => {
  // const [isChecked, setIsChecked] = useState(false);

 

  const ApiCall = async (e, name, id) => {

    if(action.actionOfToggle === "actionOfToggleSectionItem"){
      let req = {
        itemId: id,
      };
      
      let res = await changeStatusItemModule(req);
      if (res.status === 200) { 
        toast.info(res.message);
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        toast.error(message);
      }


    } 
    if(action.actionOfToggle === "actionOfToggleOptionItem"){
      let req = {
        optionGroup_id: id,
      };
      
      let res = await changeStatusOptionModule(req);
      if (res.status === 200) { 
        toast.info(res.message);
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        toast.error(message);
      }
    };

    }


  return (
    <>
      <ToggleSwitch
        label={data.id}
        isChecked={data.status}
        id={data.id}
        // onChange={(status) => setIsChecked(status)}
        ApiCall={(e, name, id ) => ApiCall(e, name, id)}
      />
    </>
  );
};

const TableAction = ({ action, data }) => {
  const navigate = useNavigate();
  const [openViewSectionItem, setOpenViewSectionItem] = useState(false);
  const [openEditSectionItem, setOpenEditSectionItem] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleConfirm = async (id) => {
    if (action.actionOfDelete === "DeleteModifierGroup") {
      setLoading(true);

      let res = await deleteOptionMenu(id);
      if (res.status === 200) {
        setLoading(false);
        setOpenDelete(false);
        action.alldata();
        toast.info(res.message);
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        setLoading(false);
        setOpenDelete(false);
        toast.error(message);
      }
    }

    if (action.actionOfDelete === "DeleteSectionItem") {
      setLoading(true);

      let res = await deleteSectionItem(id);
      if (res.status === 200) {
        setLoading(false);
        setOpenDelete(false);
        action.alldata();
        toast.info(res.message);
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        setLoading(false);
        setOpenDelete(false);
        toast.error(message);
      }
    }
  };

  const OpenViewSection = () => {
    if (action.actionOfView === "CreateSectionItem") {
      setOpenViewSectionItem(true);
    }
    if (action.actionOfView === "CreateModifierGroup") {
      navigate(`/aglut/menu/optionModule/view/${data.id}`);
    }
  };

  const OpenEditSection = () => {
    if (action.actionOfEdit === "EditModifierGroup") {
      setOpenEditSectionItem(true);
    } else {
      navigate(`/aglut/menu/sectionItems/edit/${data.id}`);
    }
  };


  return (
    <ActionDiv>
      {openViewSectionItem && (
        <ViewSectionItem
          open={openViewSectionItem}
          handleClose={() => setOpenViewSectionItem(false)}
          payload={data}
          handleConfirm={handleConfirm}
        />
      )}

      {openEditSectionItem && (
        <EditOptionModule
          open={openEditSectionItem}
          handleClose={() => setOpenEditSectionItem(false)}
          payload={data}
          fetchdata={action.alldata}
        />
      )}

      {openDelete && (
        <Delete 
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          payload={data}
          handleConfirm={handleConfirm}
        />
      )}

      {action.view && <i className="icon-View" onClick={OpenViewSection} />}
      {action.edit && <i className="icon-Edit" onClick={OpenEditSection} />}
      {action.delete && (
        <i className="icon-Delete" onClick={() => setOpenDelete(true)} />
      )}
    </ActionDiv>
  );
};

const ProfilePic = styled.div`
  img {
    width: 25px;
    height: 25px;
    margin: 0 10px;
  }
`;
