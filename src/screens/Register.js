import React, { useState, useRef } from 'react';
import Box, { Item, } from 'devextreme-react/box';
import FormComponent from '../components/formComponent';
import { getResponse } from '../common';
import { useNavigate } from 'react-router-dom';
import { enums } from '../common/enums';

const registerFormConfig = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', isEmailField: true, required: true },
    { name: 'password', label: 'Password', type: 'password', editorType: 'password', required: true, isForPassword: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', editorType: 'password', required: true, isForConfirmPassword: true }
];

const Register = () => {
    const [formData, setFormData] = useState(null);
    const formInstance = useRef(null);
    const navigate = useNavigate();

    const submitButtonOptions = {
        text: "Register",
        useSubmitBehavior: true,
        // disabled: true,
        onClick: async function () {
            if (Object.entries(formData || {}).length === registerFormConfig.length) {
                const url = 'https://api.publicapis.org/entries';
                const response = await getResponse(url, formData);
                if (response.status === enums.statusCodes.success) {
                    navigate('/contact');
                } else {
                    console.log('erorr in register form')
                }
            }
        }
    };

    function handleChange(params) {
        const { dataField, value, component } = params;
        if (value.length) {
            const column = registerFormConfig.find(ele => ele.name === params.dataField);
            if (column?.isForPassword || column?.isForConfirmPassword) {
                if (component.validate().isValid) {
                    const userData = { ...formData };
                    userData[dataField] = value;
                    setFormData(userData);
                }
            } else {
                const userData = { ...formData };
                userData[dataField] = value;
                setFormData(userData);
            }
        }
    }

    return (
        <div>
            <Box direction="col" width="100%" className='register-box'>
                <Item ratio={1}>
                    <FormComponent formInstance={formInstance} formConfig={registerFormConfig} handleChange={handleChange} submitButtonOptions={submitButtonOptions} caption='Register Form' />
                </Item>
            </Box>
        </div>
    );
};

export default Register;