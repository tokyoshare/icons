import React from "react";
import HeaderMenu from "components/HeaderMenu";

const HeaderMenuLayout = (props) => {
    return (
        <div className={props.className}>
            <HeaderMenu {...props} />
            <div className="main">
                {props.children}
            </div>
        </div>
    )
}

export default HeaderMenuLayout;
