import React, { useState, useRef } from 'react';
import Box, { Item, } from 'devextreme-react/box';
import FormComponent from '../components/form';
import { getResponse } from '../common';
import { useNavigate } from 'react-router-dom';
import { enums } from '../common/enums';

const loginFormConfig = [
    { name: 'email', label: 'Email', type: 'email', isEmailField: true },
    { name: 'password', label: 'Password', type: 'password', editorType: 'password' }
];

const Login = () => {
    const [formData, setFormData] = useState(null);
    const formInstance = useRef(null);
    const navigate = useNavigate();

    const submitButtonOptions = {
        text: "Login",
        useSubmitBehavior: true,
        onClick: async function () {
            if (Object.entries(formData).length === loginFormConfig.length) {
                const url = 'https://api.publicapis.org/entries';
                const response = await getResponse(url, formData);
                if (response.status === enums.statusCodes.success) {
                    navigate('/contact');
                } else {
                    console.log('erorr in login form')
                }
            }
        }
    };

    function handleChange(params) {
        const { dataField, value, component } = params;
        if (value.length) {
            if (component.validate().isValid) {
                const userData = { ...formData };
                userData[dataField] = value;
                setFormData(userData);
            }
        }
    }

    return (
        <div>
            <Box direction="col" width="100%" className='login-box'>
                <Item ratio={1}>
                    <FormComponent formInstance={formInstance} formConfig={loginFormConfig} handleChange={handleChange} submitButtonOptions={submitButtonOptions} caption='Login Form' />
                </Item>
            </Box>
        </div>
    );
};

export default Login;