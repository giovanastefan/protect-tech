import { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { OrderHistory } from "../../components/orderHistory/OrderHistory";
import { Input } from "../../components/input/Input";
import { useAuth } from "../../contexts/authProvider";
import { getUserDetails } from "../../services/authService";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

export const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseUserDetails = await getUserDetails(user.userId);
        setProfile({
          email: responseUserDetails.email,
          firstName: responseUserDetails.firstName,
          lastName: responseUserDetails.lastName,
        });
      } catch (error) {
        setMessage("Error fetching user data, try again!");
        return null;
      }
    };

    fetchProfile();
  }, [user.userId]);

  const updateUser = async () => {
    try {
      setMessage("User updated with sucess!");
      setProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
      });
    } catch (err) {
      setMessage("Something is wrong, try again!", err);
    }
  };

  return (
    <div className="account-container">
      <div className="account-content">
        <div className="account-title">
          <h2>Account Settings</h2>
        </div>
        {message && <p>{message}</p>}
        <div className="form">
          <div>
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
            />
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              label="E-mail"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
            />

            <Input
              label="Phone"
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="button-container">
          <Button onClickButton={updateUser}>Save Changes</Button>
          {/* Fail A01 - Broken Access Control: The Admin Dashboard button is hidden on the frontend for non-admin users,  
          but this does not provide true security. A malicious user could still manually navigate to the "/dashboard" 
          route or make an API request, as there is no backend validation to check if the user is an admin. 
          Access control should be enforced on the server side to prevent unauthorized access. */}
          {user.isAdmin && (
            <Button onClickButton={() => navigate("/dashboard")}>
              Admin Dashboard
            </Button>
          )}
        </div>
      </div>
      <OrderHistory />
      <div>
        <Button onClickButton={() => navigate("/feedback")}>Give your feedback</Button>
      </div>
    </div>
  );
};
