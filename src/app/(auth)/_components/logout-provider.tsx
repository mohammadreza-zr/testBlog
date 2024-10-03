import React, { FC } from "react";
import { logoutAction } from "../_actions/logout-action";

export const LogoutProvider: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <form action={logoutAction}>
      <div {...props} />
    </form>
  );
};
