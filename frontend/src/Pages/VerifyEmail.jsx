import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
 // Ensure this is set in your environment variables

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/verify-email/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Verification failed. The token may be invalid or expired.");
      }
    };

    verifyEmail();
  }, [token]);

  return <div>{message}</div>;
};

export default VerifyEmail;