import React from "react";
import { AglutLogo } from "../../../Utils/Images";
import { AuthBox, AuthWrapper, BoxContent, LogoWrapper } from "./Forgetstyle";

export default function ForgetPassword() {
  return (
    <AuthWrapper>
      <section>
        <AuthBox>
          <LogoWrapper>
            <img src={AglutLogo} alt="AGLUT LOGO" />
          </LogoWrapper>
          <BoxContent>
            <header>Forgot Password</header>
            <div>
              <label>Email</label>
              <input type="email" placeholder="Email" />
            </div>
            <button>Reset</button>
          </BoxContent>
        </AuthBox>
      </section>
    </AuthWrapper>
  );
}
