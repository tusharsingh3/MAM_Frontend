import React, { useState, useRef } from 'react';
import { Form, GroupItem, ButtonItem, NumericRule, EmailRule, SimpleItem, PatternRule } from 'devextreme-react/form';
import { useNavigate } from 'react-router-dom';
import { getResponse } from '../common';
import { enums } from '../common/enums';

const FormComponent = ({ formModel }) => {
    const { fields, caption } = formModel;

    const [formData, setFormData] = useState(null);
    const formInstance = useRef(null);
    const navigate = useNavigate();

    function changePasswordMode(name) {
        const editor = formInstance.current.getEditor(name);
        editor.option('mode', editor.option('mode') === 'text' ? 'password' : 'text');
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

    const submitButtonOptions = {
        text: "Login",
        useSubmitBehavior: true,
        onClick: async function () {
            if (Object.entries(formData).length === fields.length) {
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

    const passwordOptions = {
        mode: 'password',
        buttons: [
            {
                name: 'password',
                location: 'after',
                options: {
                    icon: 'images/icons/eye.png',
                    type: 'default',
                    onClick: () => changePasswordMode('password'),
                },
            },
        ]
    }

    const confirmOptions = {
        mode: 'password',
        buttons: [
            {
                name: 'confirmPassword',
                location: 'after',
                options: {
                    icon: 'images/icons/eye.png',
                    type: 'default',
                    onClick: () => changePasswordMode('confirmPassword'),
                },
            },
        ],
    };

    return (
        <Form formData={fields} onFieldDataChanged={handleChange} onInitialized={(e) => (formInstance.current = e.component)} className='form-component'>
            <GroupItem caption={caption} cssClass='form'>
                {fields.map((ele) => {
                    const { name, label, type, isRequired = false, isNumberField = false, isEmailField = false, isForConfirmPassword = false, isForPassword = false } = ele;
                    let { editorOptions = { width: 400 } } = ele;
                    const isEmailRule = isEmailField ? <EmailRule /> : null;
                    let renderRule = isNumberField ? <NumericRule /> : isEmailRule;
                    if (isForPassword) {
                        renderRule = <PatternRule
                            message="Password must contains and uppercase, a lowercase, one digit and minimun of 8 characters."
                            pattern={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/}
                        />
                    }
                    const confirmPasswordEditorOptions = isForConfirmPassword ? confirmOptions : editorOptions;
                    editorOptions = { ...editorOptions, ...(isForPassword ? passwordOptions : confirmPasswordEditorOptions) };
                    return (
                        <SimpleItem dataField={name} isRequired={isRequired} key={name} type={type} label={label} editorOptions={editorOptions}>
                            {renderRule}
                        </SimpleItem>
                    )
                })}
                <ButtonItem buttonOptions={submitButtonOptions} cssClass='text-center' />
            </GroupItem>
        </Form>
    );
}

export default FormComponent;