import React from 'react';
import './index.scss';

interface ButtonProps {
    children?: React.ReactNode
    type?: "filled" | "outlined" | "invert"
    className?: string
}

export default ({ children, type = 'filled', className = '' }: ButtonProps) => 
    <div className={`button ${type} ${className}`}>
        { children }
    </div>
