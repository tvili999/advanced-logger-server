import React from "react";

const Link = ({ children, onClick, ...props }) => (
    <a
        onClick={(e) => {
            onClick?.(e);
            e.preventDefault();
        }}
        {...props}
    >
        {children}
    </a>
)

export default Link;