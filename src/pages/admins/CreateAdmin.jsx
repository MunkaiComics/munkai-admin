import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { createAdminUser, getPermissions } from "../../remote/admin-user";

const CreateAdmin = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [validated, setValidated] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    permissions: [],
    status: "ACTIVE",
    user: params.id,
  });

  const { first_name, last_name, permissions, status } = values;

  useEffect(() => {
    getPermissions().then((response) => {
      if (response.statusCode === 200 || response.statusCode === 201) {
        let temp = [];
        response.data.map((data) => {
          temp = [...temp, { id: data._id, name: data.name }];
        });
        setOptions(temp);
        setLoading(false);
      }
    });
  }, []);

  const redirectUser = () => {
    if (successful) {
      return <Navigate to={"/admin-users"} />;
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setLoading(true);
      createAdminUser(values).then((response) => {
        if (response.statusCode === 200 || response.statusCode === 201) {
          setLoading(false);
          setSuccessful(true);
        }
      });
    }
  };

  return (
    <div className='row'>
      {redirectUser()}
      <div className='col col-lg-6'>
        <form action='' onSubmit={clickSubmit}>
          <div className='card mb-4 background-dark bprder-0'>
            <div className='card-header' style={{ background: "#ffffff20" }}>
              <strong>Create User ({params.id})</strong>
            </div>
            <div className='card-body'>
              <div className='row g-3 mb-3'>
                <div className='col-12 col-md-6'>
                  <label htmlFor='#firstNameInput' className='form-label'>
                    First name
                  </label>
                  <input
                    id='firstNameInput'
                    className='form-control'
                    type='text'
                    required
                    placeholder='first name'
                    autoComplete='name'
                    value={first_name}
                    onChange={handleChange("first_name")}
                  />
                </div>
                <div className='col-12 col-md-6'>
                  <label htmlFor='#lastNameInput' className='form-label'>
                    Last name
                  </label>
                  <input
                    id='lastNameInput'
                    className='form-control'
                    type='text'
                    required
                    placeholder='last name'
                    autoComplete='name'
                    value={last_name}
                    onChange={handleChange("last_name")}
                  />
                </div>
              </div>
              <div className='form-row mb-3'>
                <div className='form-group'>
                  <label className=''>Permissions</label>
                  <Multiselect
                    onSelect={(e) =>
                      setValues({
                        ...values,
                        permissions: [...e.map(({ id }) => id)],
                      })
                    }
                    className='form-control'
                    onRemove={(e) =>
                      setValues({
                        ...values,
                        permissions: e.map(({ id }) => id),
                      })
                    }
                    options={options}
                    displayValue='name'
                  />
                </div>
              </div>
              <div className='card-footer' style={{ background: "#ffffff20" }}>
                <div style={{ textAlign: "center" }}>
                  <button className='btn background-primary px-4'>Save</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
