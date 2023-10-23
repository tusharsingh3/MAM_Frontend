import React, { useState, useCallback } from 'react';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import GridComponent from '../components/gridComponent';
import { roles } from '../components/data';
import { updateRecord, deleteRecord } from '../common';
import { enums } from '../common/enums';

const columns = [
    { dataField: 'RoleId', width: 100, caption: 'Role ID', dataType: 'number' },
    { dataField: 'RoleName', width: 100, caption: 'Name', dataType: 'string', fixed: true },
    { dataField: 'CreatedOn', width: 100, caption: 'Created On', dataType: 'datetime', format: 'M/d/yyyy, HH:mm' },
    { dataField: 'CreatedBy', width: 100, caption: 'Created By', dataType: 'string' }
]

const dataSource = new DataSource({
    store: new ArrayStore({
        data: roles,
        key: 'RoleId',
    }),
});

function Roles() {
    const [selectedItemKeys, setSelectedItemKeys] = useState([]);

    const fetchRecordByKey = async (key) => {
        return dataSource.load()
            .then((data) => {
                const record = data.find((item) => item.RoleId === key);
                if (record) {
                    return record;
                } else {
                    throw new Error(`Record with key ${key} not found`);
                }
            })
            .catch((error) => {
                console.error('Error fetching record:', error);
            });
    }

    const updateData = useCallback(async (recordUpdated) => {
        recordUpdated = recordUpdated[0];
        const { key, data, type } = recordUpdated;
        if (type === enums.updateDeleteEnums.Update) {
            dataSource.store().update(key, data);
            await fetchRecordByKey(key)
                .then(async (data) => {
                    const url = 'https://jsonplaceholder.typicode.com/posts';
                    await updateRecord(url, data);
                })
                .catch((error) => {
                    console.error('Error fetching record:', error);
                });
        } else if (type === enums.updateDeleteEnums.Delete) {
            const url = 'https://jsonplaceholder.typicode.com/posts';
            await deleteRecord(url);
        }
    }, []);

    const selectionChanged = (data) => {
        setSelectedItemKeys(data.selectedRowKeys);
    }

    const deleteRecords = useCallback(() => {
        selectedItemKeys.forEach((key) => {
            dataSource.store().remove(key);
        });
        setSelectedItemKeys([]);
        dataSource.reload();
    }, [selectedItemKeys]);

    return (
        <div>
            <GridComponent title='Roles' keyExpr='RoleId' allowEdit={true} allowSelection={true} columns={columns} dataSource={dataSource} selectionChanged={selectionChanged} deleteRecords={deleteRecords} selectedItemKeys={selectedItemKeys} onChangesChange={updateData} />
        </div>
    );
};

export default Roles;