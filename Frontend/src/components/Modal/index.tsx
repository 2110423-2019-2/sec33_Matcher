import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

interface ModalProps {
    title?: string;
    description?: any;
    action?: any;
    open?: any;
    close?: any;
}



export default ({ title, description, action, open, close }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>
                <h3>
                    {title}
                </h3>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <h5>
                        {description}
                    </h5>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {action}
            </DialogActions>
        </Dialog>
    )
}