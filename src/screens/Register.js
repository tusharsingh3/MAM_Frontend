import FormModel from '../common/formModel';

const registerModel = new FormModel({
    title: 'Register',
    fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email', isEmailField: true, required: true },
        { name: 'password', label: 'Password', type: 'password', editorType: 'password', required: true, isForPassword: true },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password', editorType: 'password', required: true, isForConfirmPassword: true }
    ]
});

export default registerModel;