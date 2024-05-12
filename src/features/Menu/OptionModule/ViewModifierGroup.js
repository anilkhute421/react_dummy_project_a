import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  BoxContainer,
  HorizontalLines,
  SubHeader,
  LoadingWrapper,
} from "../../../style/Gobalstyle";
import { OrangeOutput, InnerUpperViewModifier } from "../MenuStyle";
import { viewOptionMenu } from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export default function ViewModifierGroup() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [optionData, setOptionData] = useState({});
  const direction = useSelector((state) => state.languageDirection.direction);

  const getDetails = async () => {
    setLoading(true);
    let res = await viewOptionMenu(params.id);
    if (res.status === 200) {
      setOptionData(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress sx={{ color: "#f55a2c" }} />
      </LoadingWrapper>
    );
  }

  return (
    <div>
      <SubHeader>
        <p>View Modifier </p>
      </SubHeader>

      <BoxContainer>
        <InnerUpperViewModifier>
          <header>Modifiers</header>
          <HorizontalLines />
          <section>
            <InputWrap>
              <section>
                <label>Name</label>
              </section>
              <input placeholder="Extras" disabled value={optionData?.name} />
            </InputWrap>

            {optionData?.OptionItemModules?.map((index) => {
              return (
                <>
                  <InputWrap>
                    <section style={{ marginBottom: -18 }}>
                      <label>Modifiers</label>
                    </section>
                  </InputWrap>

                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <ModifiersWrapper>
                      <InputWrap>
                        <input
                          disabled
                          placeholder="Chees"
                          value={index?.name}
                        />
                      </InputWrap>

                      <OrangeOutput dir={direction}>
                        <input
                          dir="ltr"
                          type="number"
                          placeholder="1.00"
                          value={index?.price}
                        />
                        <span>{optionData?.Restaurent?.currency}</span>
                      </OrangeOutput>

                      <OrangeOutput dir={direction}>
                        <input
                          dir="ltr"
                          type="number"
                          placeholder="0"
                          value={index?.calories}
                        />
                        <span>Cal</span>
                      </OrangeOutput>
                    </ModifiersWrapper>
                  </div>
                </>
              );
            })}
          </section>
        </InnerUpperViewModifier>
      </BoxContainer>

      {/* <BoxContainer>
        <InnerLowerViewModifier>
          <header>Linked Items</header>

          <LinkedItems>
            <img src={MenusectionImage1} />

            <div>
              <h1>Burger</h1>
              <h4>Veg n Crisp Burger</h4>
            </div>
          </LinkedItems>

          <LinkedItems>
            <img src={MenusectionImage1} />

            <div>
              <h1>Burger</h1>
              <h4>Veg n Crisp Burger</h4>
            </div>
          </LinkedItems>

          <LinkedItems>
            <img src={MenusectionImage1} />

            <div>
              <h1>Burger</h1>
              <h4>Veg n Crisp Burger</h4>
            </div>
          </LinkedItems>

          <LinkedItems>
            <img src={MenusectionImage1} />

            <div>
              <h1>Burger</h1>
              <h4>Veg n Crisp Burger</h4>
            </div>
          </LinkedItems>
        </InnerLowerViewModifier>
      </BoxContainer> */}
    </div>
  );
}

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

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
  }
`;

const ModifiersWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (max-width: 550px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 5px;
  }
`;
