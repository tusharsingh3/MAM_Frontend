import FormComponent from '../components/formComponent';

const nonAlphaNumeric = /[^a-zA-Z0-9]/g;

class FormModel {
    constructor(formConfig) {
        const { title, api = title.replace(nonAlphaNumeric, '-').toLowerCase(), idProperty = title.replace(' ', '') + 'Id' } = formConfig;
        Object.assign(this, { idProperty, ...formConfig, api });
    }

    Form = ({ ...props }) => {
        return <FormComponent formModel={this} {...props} />
    }
}

export default FormModel;