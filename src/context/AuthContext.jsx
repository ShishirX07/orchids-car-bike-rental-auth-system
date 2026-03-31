import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingPhone, setPendingPhone] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [user, setUser] = useState(null);

  // Simulate OTP: always "123456" for demo
  const DEMO_OTP = '123456';

  const sendOtp = (emailOrPhone) => {
    // In real app: call API to send OTP
    console.log(`OTP sent to ${emailOrPhone}: ${DEMO_OTP}`);
    return true;
  };

  const verifyOtp = (otp) => {
    return otp === DEMO_OTP;
  };

  return (
    <AuthContext.Provider value={{
      pendingEmail, setPendingEmail,
      pendingPhone, setPendingPhone,
      forgotEmail, setForgotEmail,
      user, setUser,
      sendOtp, verifyOtp,
      DEMO_OTP
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
