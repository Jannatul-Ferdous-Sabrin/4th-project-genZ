import React, { useState, useEffect } from "react";
import LoginDialog from "./LoginDialog";

const LoginPagePopUp = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpenLoginDialog(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const handleLogin = () => {
    handleCloseLoginDialog();
  };

  return (
    <>
      <LoginDialog open={openLoginDialog} onClose={handleCloseLoginDialog} onLogin={handleLogin} />
    </>
  );
};

export default LoginPagePopUp;
