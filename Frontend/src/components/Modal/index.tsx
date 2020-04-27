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
    return (
        <Dialog open={open} onClose={close} fullWidth>
            <DialogTitle>
                <h4>
                    {title}
                </h4>
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