import GrideComponent from "../components/gridComponent";

const nonAlphaNumeric = /[^a-zA-Z0-9]/g;

class GridModel {
    constructor(modelConfig) {
        const { title } = modelConfig;
        let { api, idProperty = api + 'Id' } = modelConfig;
        if (!api) {
            api = `${title.replaceAll(nonAlphaNumeric, '-').toLowerCase()}`;
            idProperty = title.replaceAll(' ', '') + 'Id';
        }
        Object.assign(this, { idProperty, ...modelConfig, api });
    }

    Grid = ({ ...props }) => {
        return <GrideComponent gridModel={this} {...props} />
    }
}

export default GridModel;