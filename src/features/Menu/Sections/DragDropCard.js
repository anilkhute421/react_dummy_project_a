import React from "react";
import { useRef } from "react";
import { useDrag, useDragDropManager, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { OrangeButton, WhiteButton } from "../../../style/Gobalstyle";
import { aqlutstorage, containerSection } from "../../../Utils/ContainerPath";
import IntlMessage from "../../../Utils/IntlMessage";
import { MenuCard } from "../MenuStyle";

export default function DragDropCard({
  key,
  index,
  id,
  el,
  moveCard,
  infoMenu,
  editMenu,
  deletingMenu,
  activeMenu,
}) {
  const direction = useSelector((state) => state.languageDirection.direction);
  const menuPermission = useSelector(
    (state) => state.loginAuth.permissions.menu
  );

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

      moveCard(dragIndex, hoverIndex, el, item);
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
      return {
        id,
        index,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <>
      {direction === "ltr" ? (
        <MenuCard
          dir={direction}
          ref={ref}
          style={{ opacity }}
          data-handler-id={handlerId}
        >
          <div className="upperSection">
            {el.image !== null ? (
              <img
                src={`${aqlutstorage}` + `${containerSection}` + `${el?.image}`}
                alt=""
              />
            ) : (
              <div>
                <i className="icon-Menu" />
                <span>My Menu</span>
              </div>
            )}
          </div>
          <div className="hoverSection">
            <span>
              <i className="icon-Info" onClick={() => infoMenu(el)} />
            </span>
            {menuPermission && (
              <>
                <OrangeButton onClick={() => editMenu(el)}><IntlMessage id="button.EDIT"/></OrangeButton>
                <WhiteButton onClick={() => deletingMenu(el)}>
                <IntlMessage id="button.DELETE"/>
                </WhiteButton>
              </>
            )}
          </div>
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <header>{el.section_name}</header>
              {menuPermission && (
                <ToggleSwitch
                  id={el.id}
                  label={el.section_name}
                  isChecked={el.status}
                  ApiCall={activeMenu}
                />
              )}
            </div>
            <p>{el.desc}</p>
          </section>
        </MenuCard>
      ) : (
        <MenuCard
          dir={direction}
          ref={ref}
          style={{ opacity }}
          data-handler-id={handlerId}
        >
          <div className="upperSection">
            {el.image !== null ? (
              <img
                src={`${aqlutstorage}` + `${containerSection}` + `${el?.image}`}
                alt=""
              />
            ) : (
              <div>
                <i className="icon-Menu" />
                <span>My Menu</span>
              </div>
            )}
          </div>
          <div className="hoverSection">
            <span>
              <i className="icon-Info" onClick={() => infoMenu(el)} />
            </span>
            <OrangeButton onClick={() => editMenu(el)}>EDIT</OrangeButton>
            <WhiteButton onClick={() => deletingMenu(el)}>DELETE</WhiteButton>
          </div>
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <header>{el.ar_section_name}</header>
              <ToggleSwitch
                id={el.id}
                label={el.name}
                isChecked={el.status}
                ApiCall={activeMenu}
              />
            </div>
            <p>{el.ar_desc}</p>
          </section>
        </MenuCard>
      )}
    </>
  );
}
