import Model from '../common/model';

const rolesModel = new Model({
    title: 'Roles',
    allowEdit: true,
    columns: [
        { dataField: 'RoleId', width: 100, caption: 'Role ID', dataType: 'number' },
        { dataField: 'RoleName', width: 100, caption: 'Name', dataType: 'string', fixed: true },
        { dataField: 'CreatedOn', width: 100, caption: 'Created On', dataType: 'datetime', format: 'M/d/yyyy, HH:mm' },
        { dataField: 'CreatedBy', width: 100, caption: 'Created By', dataType: 'string' }
    ]
});

export default rolesModel;