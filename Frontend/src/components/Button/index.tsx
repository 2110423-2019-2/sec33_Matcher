import React from 'react';
import './index.scss';

interface ButtonProps {
    children?: React.ReactNode;
    type?: 'filled' | 'outlined' | 'invert';
    className?: string;
    onClick?: any;
    fullWidth?: boolean;
    disable?: boolean;
}
export default ({ children, type = 'filled', className = '', onClick = () => { }, fullWidth = false, disable = false }: ButtonProps) => (
    <div className={`button ${type} ${fullWidth ? 'fullWidth' : ''} ${className} ${disable ? 'disable' : ''}`} onClick={onClick}>
        {children}
    </div>
);
