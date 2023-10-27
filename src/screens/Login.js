import FormModel from '../common/formModel';

const loginModel = new FormModel({
    title: 'Login',
    fields: [
        { name: 'email', label: 'Email', type: 'email', isEmailField: true },
        { name: 'password', label: 'Password', type: 'password', editorType: 'password' }
    ]
});

export default loginModel;