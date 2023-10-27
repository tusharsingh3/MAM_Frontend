import React, { useRef, useState, useCallback } from 'react';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Pager, Paging, Editing, ColumnChooser, ColumnChooserSearch, ColumnChooserSelection, Position, Toolbar, Item, Selection, Export } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import Box from 'devextreme-react/box';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { enums } from '../common/enums';
import { updateRecord, deleteRecord } from '../common';

const showClearButtonProp = { showClearButton: true };
const allowedPageSizes = [5, 10, 15, 20, 'all'];

function GrideComponent({ gridModel }) {
    const dataGridRef = useRef(null);
    const [selectedItemKeys, setSelectedItemKeys] = useState([]);
    const { title, columns, keyId, keyExpr = 'ID', allowEdit = false, allowSelection = false } = gridModel;

    const dataSource = new DataSource({
        store: new ArrayStore({
            data: [],
            key: keyId,
        }),
    });

    const clearFilter = () => {
        dataGridRef.current.instance.clearFilter();
    };

    const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
        }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
            });
        });
    };

    const fetchRecordByKey = async (key) => {
        return dataSource.load()
            .then((data) => {
                const record = data.find((item) => item[keyId] === key);
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
            <Box className='grid-box'>
                <Item ratio={1} className='grid-box-container'>
                    <div className="long-title"><h3>{title}</h3></div>
                    <DataGrid
                        id="gridContainer"
                        ref={dataGridRef}
                        dataSource={dataSource}
                        columns={columns}
                        keyExpr={keyExpr}
                        showBorders={true}
                        repaintChangesOnly={true}
                        allowColumnResizing={true}
                        columnResizingMode='nextColumn'
                        columnMinWidth={50}
                        columnAutoWidth={true}
                        width="100%"
                        selectedRowKeys={selectedItemKeys}
                        onSelectionChanged={selectionChanged}
                        allowColumnReordering={true}
                        showColumnLines={true}
                        showRowLines={true}
                        rowAlternationEnabled={true}
                        onExporting={onExporting}
                    >
                        {allowEdit ?
                            <Editing refreshMode={'full'} mode="cell" allowAdding={true} allowDeleting={true} allowUpdating={true} startEditAction='dblClick' useIcons={true} onChangesChange={updateData} />
                            : null}
                        {allowSelection ?
                            <Selection mode="multiple" showCheckBoxesMode='always' selectAllMode='page' />
                            : null}

                        <FilterRow visible={true} applyFilter={'auto'} />
                        <HeaderFilter visible={true} />
                        <SearchPanel visible={true} width={240} placeholder="Search..." />

                        {columns?.length && columns.forEach(element => {
                            const { dataField, width, caption, dataType, alignment, editorOptions = showClearButtonProp, format, fixed = false } = element;
                            return <Column dataField={dataField} alignment={alignment} dataType={dataType} format={format} width={width} caption={caption} editorOptions={editorOptions} fixed={fixed} />
                        })}

                        <ColumnChooser enabled={true} mode='select' >
                            <Position my="right top" at="right bottom" of=".dx-datagrid-column-chooser-button" />
                            <ColumnChooserSearch enabled={true} editorOptions={{ placeholder: 'Search Column...' }} />
                            <ColumnChooserSelection allowSelectAll={true} selectByClick={false} recursive={true} />
                        </ColumnChooser>

                        <Toolbar>
                            <Item name="addRowButton" showText="always" location='before' />
                            <Item name='columnChooserButton' showText="always" location='before'></Item>
                            <Item name='searchPanel' showText="always" location='center' ></Item>
                            <Item location="center">
                                <Button onClick={clearFilter} icon="filter" text="Clear Filters" />
                            </Item>
                            <Item name='exportButton' showText="always" ></Item>
                            <Item location="after">
                                <Button onClick={deleteRecords} icon="trash" disabled={!selectedItemKeys?.length} text="Delete Selected Records" />
                            </Item>
                        </Toolbar>

                        <Paging defaultPageSize={10} />
                        <Pager visible={true} allowedPageSizes={allowedPageSizes} displayMode={'full'} showPageSizeSelector={true} showInfo={true} showNavigationButtons={true} />

                        <Export enabled={true} allowExportSelectedData={true} />
                    </DataGrid>
                </Item>
            </Box>
        </div>
    );
}

export default GrideComponent;