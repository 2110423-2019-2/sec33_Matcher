import React from 'react';
import "./index.scss";

interface ButtonProps {
    children?: React.ReactNode
    fullWidth?: boolean
    type?: "filled" | "outlined" | "invert"
}

export default ({ children, type = 'filled', fullWidth = false }: ButtonProps) =>
    <button className={`button ${type} ${fullWidth ? 'fullWidth' : ''}`}>
        {children}
    </button>