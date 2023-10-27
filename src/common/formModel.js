import FormComponent from '../components/formComponent';

const nonAlphaNumeric = /[^a-zA-Z0-9]/g;

class FormModel {
    constructor(formConfig) {
        const { title } = formConfig;
        let { api, idProperty = api + 'Id' } = formConfig;
        if (!api) {
            api = `${title.replaceAll(nonAlphaNumeric, '-').toLowerCase()}`;
            idProperty = title.replaceAll(' ', '') + 'Id';
        }
        Object.assign(this, { idProperty, ...formConfig, api });
    }

    Form = ({ ...props }) => {
        return <FormComponent formModel={this} {...props} />
    }
}

export default FormModel;