import React, { useState } from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [email, setEmail] = useState(user.email);
  const [profileImage, setProfileImage] = useState("");

  const handleImageUpload = (event) => {
    setProfileImage(event.target.files[0]);
  };

  return (
    <div className='container text-center align-items-center'>
      <div>
        <img src='/assets/images/profile.png' alt='' />
      </div>
      <h3>
        Welcome,{" "}
        <strong>
          {user.fname} {user.lname}
        </strong>
      </h3>
      <p>{user.email}</p>
      <button
        type='button'
        className='btn btn-primary'
        data-mdb-toggle='modal'
        data-mdb-target='#exampleModal'
      >
        Edit profile <i className='fas fa-user-edit'></i>
      </button>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Editing profile
              </h5>
              <button
                type='button'
                className='btn-close'
                data-mdb-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form action=''>
                <label htmlFor='fname'>Firstname</label>
                <input
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  type='text'
                  name='fname'
                  id='fname'
                  className='form-control'
                />

                <label htmlFor='lname'>Lastname</label>
                <input
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  type='text'
                  name='lname'
                  id='lname'
                  className='form-control'
                />

                <label htmlFor='email'>Email Address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='text'
                  name='email'
                  id='email'
                  className='form-control'
                />

                <label htmlFor='profile'>Profile</label>
                <input
                  onChange={handleImageUpload}
                  type='file'
                  className='form-control'
                />
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-mdb-dismiss='modal'
              >
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
