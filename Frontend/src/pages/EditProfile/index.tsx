import React, { useContext, useState } from 'react';
import './index.scss';
import { Input, Button } from '../../components';
import { ReactComponent as Chevron } from '../../assets/icons/chevron-right.svg';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { editProfile, whoami } from '../../api/user';

export default () => {
    const { auth, authDispatch } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState({
        firstname: auth.firstname,
        lastname: auth.lastname,
        password: '',
        passwordConfirm: '',
        // email: auth.email,
    });
    const [errorText, setErrorText] = useState({
        firstname: '',
        lastname: '',
        password: '',
        passwordConfirm: '',
        // email: '',
    });

    const history = useHistory();

    const validate = () => {
        setErrorText({
            ...errorText,
            firstname: userInfo.firstname.length === 0 ? 'Firstname cannot be empty.' : '',
            lastname: userInfo.lastname.length === 0 ? 'Lastname cannot be empty.' : '',
            // email: isEmail(userInfo.email) ? '' : 'Please input a proper email.',
            password: userInfo.password.length < 8 ? 'Password must no shorter than 8 character.' : '',
            passwordConfirm:
                userInfo.password === userInfo.passwordConfirm
                    ? ''
                    : 'Password confirmation must match the password entered.',
        });
        if (userInfo.password.length < 8) return false;
        if (userInfo.firstname.length === 0) return false;
        if (userInfo.lastname.length === 0) return false;
        // if (!isEmail(userInfo.email)) return false;
        if (userInfo.password !== userInfo.passwordConfirm) return false;
        return true;
    };

    const handleChange = (field: string) => (e: any) => {
        setUserInfo({
            ...userInfo,
            [field]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validate()) {
            editProfile(userInfo)
                .then(() => {
                    whoami()
                        .then(profile => {
                            authDispatch({ type: 'FETCH_AUTH_STATUS', payload: profile });
                            history.push('/');
                        })
                        .catch(() => {
                            console.log('Unauthenticated');
                        });
                })
                .catch(() => {
                    setErrorText({ ...errorText, password: 'Error' });
                });
        }
    };

    return (
        <div className="editProfilePage">
            <form>
                <div className="row editProfileTitle">
                    <div className="col-6">
                        <Input
                            variant="filled"
                            error={Boolean(errorText.firstname)}
                            helperText={errorText.firstname}
                            onChange={handleChange('firstname')}
                            type="text"
                            label="Name"
                            defaultValue={auth.firstname}
                            fullWidth
                        />
                    </div>
                    <div className="col-6">
                        <Input
                            variant="filled"
                            error={Boolean(errorText.lastname)}
                            helperText={errorText.lastname}
                            onChange={handleChange('lastname')}
                            type="text"
                            label="Lastname"
                            defaultValue={auth.lastname}
                            fullWidth
                        />
                    </div>
                </div>
                <div className="row editProfileTitle">
                    <div className="col-6">
                        <Input
                            variant="filled"
                            onChange={handleChange('password')}
                            type="password"
                            label="Password"
                            error={Boolean(errorText.password)}
                            helperText={errorText.password}
                            fullWidth
                        />
                    </div>
                    <div className="col-6">
                        <Input
                            variant="filled"
                            onChange={handleChange('passwordConfirm')}
                            type="password"
                            label="Re-enter password"
                            error={Boolean(errorText.passwordConfirm)}
                            helperText={errorText.passwordConfirm}
                            fullWidth
                        />
                    </div>
                </div>
                <div className="row editProfileTitle">
                    <div className="col-6">
                        <Input
                            variant="filled"
                            // onChange={handleChange('email')}
                            label="Email"
                            defaultValue={auth.email}
                            // error={Boolean(errorText.email)}
                            // helperText={errorText.email}
                            disabled={true}
                            fullWidth
                        />
                    </div>
                    <div className="col-6">
                        <Button type="invert" onClick={handleSubmit} fullWidth>
                            Save Changes
                            <Chevron style={{ strokeWidth: 1 }} />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
