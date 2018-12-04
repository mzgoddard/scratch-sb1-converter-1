import {ByteStream} from './coders/byte-stream';

import {ByteTakeIterator} from './squeak/byte-take-iterator';
import {FieldIterator} from './squeak/field-iterator';

import {SB1BlockHeader, SB1Signature} from './sb1-file-blocks';

class SB1File {
    constructor (buffer) {
        this.buffer = buffer;
        this.stream = new ByteStream(buffer);

        this.signature = this.stream.readStruct(SB1Signature);
        this.signature.validate();

        this.infoBlockHeader = this.stream.readStruct(SB1BlockHeader);
        this.infoBlockHeader.validate();

        this.stream.position += this.signature.infoByteLength - SB1BlockHeader.size;

        this.dataBlockHeader = this.stream.readStruct(SB1BlockHeader);
        this.dataBlockHeader.validate();
    }

    view () {
        return {
            signature: this.signature,
            infoBlockHeader: this.infoBlockHeader,
            dataBlockHeader: this.dataBlockHeader,
            toString () {
                return 'SB1File';
            }
        };
    }

    infoRaw () {
        return new ByteTakeIterator(
            new FieldIterator(this.buffer, this.infoBlockHeader.offset + SB1BlockHeader.size),
            this.signature.infoByteLength + SB1Signature.size
        );
    }

    dataRaw () {
        return new ByteTakeIterator(
            new FieldIterator(this.buffer, this.dataBlockHeader.offset + SB1BlockHeader.size),
            this.stream.uint8.length
        );
    }
}

export {SB1File};
