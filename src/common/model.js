import GrideComponent from "../components/gridComponent";

const nonAlphaNumeric = /[^a-zA-Z0-9]/g;

class Model {
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
        return <GrideComponent model={this} {...props} />
    }
}

export default Model;