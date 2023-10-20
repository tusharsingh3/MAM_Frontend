import React, { useRef } from 'react';
import { Form, GroupItem, ButtonItem, NumericRule, EmailRule, SimpleItem, CompareRule, PatternRule } from 'devextreme-react/form';
import Validator from 'devextreme/ui/validator';

const FormComponent = (props) => {
    const { formConfig, submitButtonOptions, caption, handleChange, formInstance } = props;

    const changePasswordMode = (name) => {
        const editor = formInstance.current.getEditor(name);
        editor.option('mode', editor.option('mode') === 'text' ? 'password' : 'text');
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

    const passwordComparison = () => {
        return formConfig.Password;
    };

    return (
        <Form formData={formConfig} onFieldDataChanged={handleChange} onInitialized={(e) => (formInstance.current = e.component)}>
            <GroupItem caption={caption}>
                {formConfig.map((ele) => {
                    const { name, lebel, type, isRequired = false, isNumberField = false, isEmailField = false, isForConfirmPassword = false, isForPassword = false } = ele;
                    const isEmailRule = isEmailField ? <EmailRule /> : null;
                    let renderRule = isNumberField ? <NumericRule /> : isEmailRule;
                    // if (isForConfirmPassword) {
                    //     renderRule = <CompareRule
                    //         message="Password and Confirm Password do not match"
                    //         comparisonTarget={passwordComparison}
                    //     />
                    // }
                    if (isForPassword) {
                        renderRule = <PatternRule
                            message="Password must contains and uppercase, a lowercase, one digit and minimun of 8 characters."
                            pattern={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/}
                        />
                    }
                    const confirmPasswordEditorOptions = isForConfirmPassword ? confirmOptions : null;
                    let editorOptions = isForPassword ? passwordOptions : confirmPasswordEditorOptions;
                    return (
                        <SimpleItem dataField={name} isRequired={isRequired} key={name} type={type} lebel={lebel} editorOptions={editorOptions} >
                            {renderRule}
                        </SimpleItem>
                    )
                })}
            </GroupItem>
            <ButtonItem buttonOptions={submitButtonOptions} cssClass='text-center' />
        </Form>
    );
}

export default FormComponent;