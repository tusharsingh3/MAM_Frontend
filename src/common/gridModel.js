import GrideComponent from "../components/gridComponent";

const nonAlphaNumeric = /[^a-zA-Z0-9]/g;

class GridModel {
    constructor(modelConfig) {
        const { title, api = title.replace(nonAlphaNumeric, '-').toLowerCase(), idProperty = title.replace(' ', '') + 'Id' } = modelConfig;
        Object.assign(this, { idProperty, ...modelConfig, api });
    }

    Grid = ({ ...props }) => {
        return <GrideComponent gridModel={this} {...props} />
    }
}

export default GridModel;