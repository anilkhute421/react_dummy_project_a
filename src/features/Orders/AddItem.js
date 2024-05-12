import React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  ButtonWrapper,
  Cancel,
  OrangeButton,
  WhiteButton,
} from "../../style/Gobalstyle";
import styled from "styled-components";
import {
  BoxContent,
  //   DetailBox,
  //   FieldGrid3,
  OptionSetWrap,
} from "./OrderStyle";

export default function AddItem({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Cancel onClick={handleClose}>
          <i className="icon-CloseCross" />
        </Cancel>

        <DialogWrapper>
          <BoxContent>
            <header>Add Item</header>
          </BoxContent>

          <DetailBox>
            <div>
              <section style={{ width: "100%" }}>
                <FieldGrid3>
                  <InputWrap>
                    <label>Name</label>
                    <input dir="ltr" type="text" placeholder="Name" />
                  </InputWrap>

                  <InputWrap>
                    <label>Phone Number</label>
                    <input dir="ltr" type="text" placeholder="Phone Number" />
                  </InputWrap>

                  <OptionSetWrap>
                    <p>Status</p>
                    <select>
                      <option selected="true" disabled hidden></option>
                      <option>Pending</option>
                      <option>Paid</option>
                    </select>
                  </OptionSetWrap>
                </FieldGrid3>
              </section>

              <section style={{ width: "100%" }}>
                <FieldGrid3>
                  <OptionSetWrap>
                    <p>Section</p>
                    <select>
                      <option selected="true" disabled hidden></option>
                      <option>Extras chesses</option>
                      <option>Extras topping</option>
                    </select>
                  </OptionSetWrap>

                  <OptionSetWrap>
                    <p>Section Item</p>
                    <select>
                      <option selected="true" disabled hidden></option>
                      <option>Extras chesses</option>
                      <option>Extras topping</option>
                    </select>
                  </OptionSetWrap>

                  <InputWrap>
                    <label>Quantity</label>
                    <input type="number" placeholder="Quantity" />
                  </InputWrap>
                </FieldGrid3>
                <InputWrap style={{ margin: "10px 0" }}>
                  <label>Special Note</label>

                  <input dir="ltr" type="text" placeholder="Special Note" />
                </InputWrap>
              </section>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <DeleteButton>
                <i className="icon-Delete" />
              </DeleteButton>
            </div>
          </DetailBox>

          <div className="justifyLeft">
            <WhiteButton>+ Add Order</WhiteButton>
          </div>

          <ButtonWrapper>
            <OrangeButton>SUBMIT</OrangeButton>
          </ButtonWrapper>
        </DialogWrapper>
      </Dialog>
    </div>
  );
}

export const DetailBox = styled.div`
  width: 100%;
  background: #f7f7f7;
  border: 1px solid #dddddd;
  border-radius: 16px;
  margin: 0 0 20px 0;
  padding: 20px;
  position: relative;
  display: flex;

  section {
    width: 90%;
  }
`;

export const FieldGrid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const DeleteButton = styled.div`
  width: 35px;
  height: 35px;
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;

  i {
    font-size: 18px;
    color: #f55a2c;
  }
`;

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  section {
    display: flex;
  }

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    margin: 5px 0 0 0;
  }

  input {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 10px;
    margin: 5px 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  input:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }
`;

const DialogWrapper = styled.div`
  width: 600px;
  padding: 10px 20px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`;
