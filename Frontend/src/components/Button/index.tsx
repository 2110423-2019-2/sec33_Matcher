import React from 'react';
import './index.scss';

interface ButtonProps {
    children?: React.ReactNode;
    type?: 'filled' | 'outlined' | 'invert';
}

export default ({ children, type = 'filled' }: ButtonProps) => <button className={`button ${type}`}>{children}</button>;
