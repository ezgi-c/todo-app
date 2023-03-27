import React, { useContext } from "react";
import { LoginContext } from "../../Context/Auth";
import { When } from "react-if";

function Auth(props) {
  const context = useContext(LoginContext);

  let youAreLoggedIn = context.loggedIn;
  let canDo = props.capability ? context.can(props.capability) : true;
  let okToRender = youAreLoggedIn && canDo;

  return <When condition={okToRender}>{props.children}</When>;
}

export default Auth;
