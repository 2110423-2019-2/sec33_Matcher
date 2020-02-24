import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./index.scss";
import { Input, Button } from "../../components";
import { ReactComponent as Chevron } from "../../assets/icons/chevron-right.svg";
export default () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="editProfilePage">
      <div className="row editProfileTitle">
        <div className="col-7 helloMessage">
          <h5>{`Good morning, ${auth.username}`}</h5>
        </div>
        <div className="col lineAfterHello" />
        <div className="row editProfileMenu">
          <div className="col-4">
            <p>Edit Profile</p>
          </div>
          <div className="col-4">
            <p>Your tasks</p>
          </div>
        </div>
      </div>
      <div className="row">
        <p>You can edit your Profile here. Click save changes after that.</p>
      </div>
      <div className="row editProfileForm">
        <div className="col-6">
          <Input variant="filled" defaultValue="test" fullWidth />
        </div>
        <div className="col-6">
          <Input variant="filled" defaultValue="test" fullWidth />
        </div>
      </div>
      <div className="row editProfileForm">
        <div className="col-6">
          <Input variant="filled" defaultValue="test" fullWidth />
        </div>
        <div className="col-6">
          <Input variant="filled" defaultValue="test" fullWidth />
        </div>
      </div>
      <div className="row editProfileForm">
        <div className="col-6">
          <Input variant="filled" defaultValue="test" fullWidth />
        </div>
        <div className="col-6">
          <Button type="filled">
            Save Changes <Chevron style={{ strokeWidth: 1 }} />
          </Button>
        </div>
      </div>
    </div>
  );
};
