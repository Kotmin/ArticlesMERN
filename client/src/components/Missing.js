import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Missing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Page not found', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const timer = setTimeout(() => {
        navigate('/', { state: { successMessage: 'Missing Resource. Redirected Home!' } });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist. You will be redirected to the homepage shortly.</p>
    </div>
  );
};

export default Missing;
