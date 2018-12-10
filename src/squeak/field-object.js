import {TYPE_NAMES} from './ids';

const toTitleCase = str => (
    str.toLowerCase().replace(/_(\w)/g, ([, letter]) => letter.toUpperCase())
);

/**
 * A object representation of a {@link Header} collecting the given {@link
 * Header#size} in fields.
 */
class FieldObject {
    /**
     * @param {number} classId
     * @param {number} version
     * @param {Array.<Field>} fields
     */
    constructor ({classId, version, fields}) {
        /** @type {number} */
        this.classId = classId;

        /** @type {number} */
        this.version = version;

        /** @type {Array.<Field>} */
        this.fields = fields;
    }

    /**
     * @type {Object.<string, number>}
     */
    get FIELDS () {
        return [];
    }

    /**
     * @type {Array.<Field>}
     */
    get RAW_FIELDS () {
        return this.fields;
    }

    string (field) {
        return String(this.fields[field]);
    }

    number (field) {
        return +this.fields[field];
    }

    boolean (field) {
        return !!this.fields[field];
    }

    toString () {
        if (this.constructor === FieldObject) {
            return `${this.constructor.name} ${this.classId} ${TYPE_NAMES[this.classId]}`;
        }
        return this.constructor.name;
    }

    /**
     * Define a FieldObject subclass by mapping field names to indices in
     * {@link FieldObject#fields}.
     * @param {Object.<string, number>} FIELDS
     * @param {function} Super
     * @returns {function}
     */
    static define (FIELDS, Super = FieldObject) {
        class DefinedObject extends Super {
            get FIELDS () {
                return FIELDS;
            }

            static get FIELDS () {
                return FIELDS;
            }
        }

        Object.keys(FIELDS).forEach(key => {
            const index = FIELDS[key];
            Object.defineProperty(DefinedObject.prototype, toTitleCase(key), {
                get () {
                    return this.fields[index];
                }
            });
        });

        return DefinedObject;
    }
}

export {FieldObject};
