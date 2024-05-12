import styled from "styled-components";
import { AglutBackground } from "../../Utils/Images";

export const Page = styled.div`
  position: relative;
  width: calc(100% - 240px);
  margin-top: 80px;
  position: absolute;
  padding: 20px;
  right: ${(dir) => dir.dir === "ltr" && 0};
  left: ${(dir) => dir.dir === "rtl" && 0};

  @media (max-width: 991px) {
    width: 100%;
  }
`;

export const DashboardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: url(${AglutBackground}) #fff;
  background-repeat: repeat-y;
  background-size: cover;
`;
