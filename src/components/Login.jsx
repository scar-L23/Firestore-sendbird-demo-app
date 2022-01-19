import React from 'react';
import "./_login.css";

export default function Login({ defaultNickName, defaultUserId, setLoginDetails }) {
  const [{ user_id, nickname }, setLocalLoginDetails] = React.useState({ user_id: defaultUserId, nickname: defaultNickName });

  const handleInputChange = ({ target: { name, value } }) => {
    setLocalLoginDetails((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="login_container">
      <form className="login__wrapper" onSubmit={(e) => {
        e.preventDefault();
        setLoginDetails({ userId: user_id, nickname });
      }}>
        <div className="row">
          <label htmlFor="user_id">User ID</label>
          <input id="user_id" name="user_id" value={user_id} onChange={handleInputChange} />
        </div>
        <div className="row">
          <label htmlFor="nickname">Nick Name</label>
          <input id="nickname" name="nickname" value={nickname} onChange={handleInputChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}