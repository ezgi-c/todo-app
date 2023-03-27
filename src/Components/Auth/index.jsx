import React, {useContext} from 'react';
import {LoginContext} from '../../Context/Auth';
import {When} from 'react-if';

function Auth (props) {

 // Doesn't work in a class...
 const context = useContext(LoginContext);

 // because of this ... we now get this.context
//  static contextType = LoginContext;

  // render() {
    let youAreLoggedIn = context.loggedIn;
    let canDo = props.capability ? context.can( props.capability ) :true;
    let okToRender = youAreLoggedIn && canDo;

    // Conditional Rendering
    // let content  =  okToRender ? this.props.children : null
    // return content;

    return (
      <When condition={okToRender}>
        {props.children}
      </When>
    );
  }

// }

export default Auth;