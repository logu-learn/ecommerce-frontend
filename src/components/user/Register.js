import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register , clearAuthError} from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, registerSuccess } = useSelector((state) => state.authState);
  console.log(registerSuccess)

  // Handle input change
  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]); // Setting the file directly for form data
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('avatar', avatar); // Attach avatar to form data

    // Dispatch register action
    dispatch(register(formData));
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate('/login');  // Navigate to login page after successful registration
    }

    if (error) {
      toast.error(error, {
        position: 'bottom-center',
        onOpen: ()=>{dispatch(clearAuthError)}
      });
    }
  }, [error, registerSuccess, dispatch,navigate]);

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
          <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              name="name"
              onChange={onChange}
              type="text"
              id="name_field"
              className="form-control"
              value={userData.name}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              name="email"
              onChange={onChange}
              id="email_field"
              className="form-control"
              value={userData.email}
              autoComplete='current-email'
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              id="password_field"
              className="form-control"
              value={userData.password}
              autoComplete='current-password'
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="avatar"
                    width="50"
                    height="50"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  onChange={onChange}
                  className="custom-file-input"
                  id="customFile"
                  accept="image/*"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'REGISTER'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
