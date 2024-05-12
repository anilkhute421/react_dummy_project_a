import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ActionDiv, Table, TableWrapper, TBody, THead } from "../MenuStyle";
import { aqlutstorage, containerItem } from "../../../Utils/ContainerPath";
import { ProfilePicture } from "../../../Utils/Images";
import ToggleSwitch from "../../../components/ToggleSwitch";
import ViewSectionItem from "./ViewSectionItem";
import EditOptionModule from "../OptionModule/EditOptionModule";
import Delete from "../../../components/Delete";
import {
  changeStatusItemModule,
  changeStatusOptionModule,
  deleteOptionMenu,
  deleteSectionItem,
} from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";

export default function DragDropTable({
  header,
  tableData,
  action,
  moveCard,
  perPageListing,
}) {
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
            moveCard={moveCard}
            perPageListing={perPageListing}
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

const TableBody = ({
  body,
  header,
  action,
  index,
  id,
  dir,
  moveCard,
  perPageListing,
}) => {
  //   const [show, setShow] = useState();
  //   const navigate = useNavigate();
  //   const [openDelete, setOpenDelete] = useState();
  //   const [deleteData, setDeleteData] = useState({});
  //   const handleClickAway = () => {
  //     setShow(false);
  //   };

  const ref = useRef(null);

  const ItemTypes = {
    CARD: "card",
  };

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex, body, item, perPageListing);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <tbody
      className="tbody"
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <TBody dir={dir}>
        {header.map((el) => (
          <td style={{ padding: "0 5px" }}>
            {el.id === "Action" && action.apply ? (
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

const TableToggle = ({ data, action }) => {
  // const [isChecked, setIsChecked] = useState(false);

  const ApiCall = async (e, name, id) => {
    if (action.actionOfToggle === "actionOfToggleSectionItem") {
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
    if (action.actionOfToggle === "actionOfToggleOptionItem") {
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
    }
  };

  return (
    <>
      <ToggleSwitch
        label={data.id}
        isChecked={data.status}
        id={data.id}
        // onChange={(status) => setIsChecked(status)}
        ApiCall={(e, name, id) => ApiCall(e, name, id)}
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
