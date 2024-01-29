import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAdminUser,
  getPermissions,
  updateUser,
} from "../../remote/admin-user";

const AdminSettings = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [values, setValues] = useState({
    permissions: [],
    user: params.id,
  });

  const {} = values;

  useEffect(() => {
    getPermissions().then((response) => {
      if (response.statusCode === 200 || response.statusCode === 201) {
        let temp = [];
        response.data.map((data) => {
          temp = [...temp, { id: data._id, name: data.name }];
        });
        setPermissions(temp);
      }
    });
    getAdminUser(params.id).then((response) => {
      setLoading(false);
      if (response.statusCode === 200 || response.statusCode === 201) {
        setData(response.data);
        setValues({
          status: response.data.status,
          permissions: response.data.permissions.map(({ id }) => id),
          id: params.id,
        });
      }
    });
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    updateUser(values).then((response) => {
      if (response.statusCode === 200 || response.statusCode === 201) {
      }
      setLoading(false);
    });
  };

  return (
    <div className='row'>
      <div className='col col-lg-6'>
        <form
          action=''
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <div className='card mb-4 background-dark bprder-0'>
            <div className='card-header' style={{ background: "#ffffff20" }}>
              <strong>
                User - {data && data.first_name} {data && data.last_name}
              </strong>
            </div>
            <div className='card-body'>
              <div className='row mb-3'>
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
                    selectedValues={data ? data.permissions : []}
                    options={permissions}
                    displayValue='name'
                  />
                </div>
              </div>
              <div className='card-footer' style={{ background: "#ffffff20" }}>
                <div style={{ textAlign: "center" }}>
                  <button className='btn background-primary px-4'>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
