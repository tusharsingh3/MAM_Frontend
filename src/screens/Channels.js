import Model from '../common/model';

const channelModel = new Model({
    title: 'Channels',
    allowEdit: true,
    columns: [
        { dataField: 'ChannelId', width: 100, caption: 'Channel ID', dataType: 'number' },
        { dataField: 'ChannelName', width: 100, caption: 'Name', dataType: 'string', fixed: true },
        { dataField: 'CreatedOn', width: 100, caption: 'Created On', dataType: 'datetime', format: 'M/d/yyyy, HH:mm' },
        { dataField: 'CreatedBy', width: 100, caption: 'Created By', dataType: 'string' }
    ]
});

export default channelModel;