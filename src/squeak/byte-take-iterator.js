/**
 * Let the passed iterator only take bytes up to a certain position.
 *
 * Take iterators constrain the number of times an inner iterator can return
 * values. Normally it constrains the number of returned values.
 * ByteTakeIterator instead constrains the number of bytes the inner iterator
 * may take from its stream before ByteTakeIterator returns done objects.
 *
 * Primarily used to wrap {@link FieldIterator}.
 */
class ByteTakeIterator {
    /**
     * @param {{stream: ByteStream}} iter
     * @param {number=} [maxPosition=Infinity]
     */
    constructor (iter, maxPosition = Infinity) {
        this.iter = iter;
        this.maxPosition = maxPosition;
    }

    /**
     * @returns {ByteTakeIterator}
     */
    [Symbol.iterator] () {
        return this;
    }

    /**
     * @returns {{value: *, done: boolean}}
     */
    next () {
        if (this.iter.stream.position >= this.maxPosition) {
            return {
                value: null,
                done: true
            };
        }

        return this.iter.next();
    }
}

export {ByteTakeIterator};
