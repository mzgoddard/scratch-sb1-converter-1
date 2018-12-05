class JSPrimitiveRenderer {
    static check (data) {
        return ['undefined', 'string', 'number', 'boolean'].includes(typeof data) || data === null;
    }

    render (data, view) {
        view.renderTitle(String(data));
    }
}

export {JSPrimitiveRenderer};
