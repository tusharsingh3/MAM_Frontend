import React from 'react';
import { Form, GroupItem, ButtonItem, NumericRule, EmailRule, SimpleItem } from 'devextreme-react/form';

const FormComponent = (props) => {
    const { formConfig, submitButtonOptions, caption, handleChange } = props;
    return (
        <Form formData={formConfig} onFieldDataChanged={handleChange}>
            <GroupItem caption={caption}>
                {formConfig.map((ele) => {
                    const { name, lebel, type, isRequired = false, isNumberField = false, isEmailField = false } = ele;
                    const isEmailRule = isEmailField ? <EmailRule /> : null;
                    const renderRule = isNumberField ? <NumericRule /> : isEmailRule;
                    return (
                        <SimpleItem dataField={name} isRequired={isRequired} key={name} type={type} lebel={lebel}>
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