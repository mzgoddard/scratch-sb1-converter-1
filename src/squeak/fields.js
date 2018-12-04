import {TYPES} from './ids';

class Field {
    constructor (classId, position) {
        this.classId = classId;
        this.position = position;
    }
}

export {Field};

export const value = obj => {
    if (typeof obj === 'object' && obj) return obj.valueOf();
    return obj;
};

class Value extends Field {
    constructor (classId, position, value) {
        super(classId, position);
        this.value = value;
    }

    valueOf () {
        return this.value;
    }

    toJSON () {
        if (
            this.classId === TYPES.TRANSLUCENT_COLOR ||
            this.classId === TYPES.COLOR
        ) {
            // TODO: Can colors be 32 bit in scratch-blocks?
            return this.value & 0xffffff;
        }
        return this.value;
    }

    toString () {
        return this.value;
    }
}

export {Value};

class Header extends Field {
    constructor (classId, position, size) {
        super(classId, position);
        this.size = size;
    }
}

export {Header};

class Reference extends Field {
    constructor (classId, position, index) {
        super(classId, position);
        this.index = index;
    }

    valueOf () {
        return `Ref(${this.index})`;
    }
}

export {Reference};

class BuiltinObjectHeader extends Header {
    constructor (classId, position) {
        super(classId, position, 0);
    }
}

export {BuiltinObjectHeader};

class FieldObjectHeader extends Header {
    constructor (classId, position, version, size) {
        super(classId, position, size);
        this.version = version;
    }
}

export {FieldObjectHeader};
