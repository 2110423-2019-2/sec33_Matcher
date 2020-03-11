import React from 'react';
import './index.scss';

interface ButtonProps {
    children?: React.ReactNode
    type?: "filled" | "outlined" | "invert"
    className?: string
    onClick?: any
}

export default ({ children, type = 'filled', className = '', onClick = () => {} }: ButtonProps) => 
    <div className={`button ${type} ${className}`} onClick={onClick}>
        { children }
    </div>
