import {assert} from '../util/assert';

import {Block} from './byte-blocks';
import {Uint8, Uint32BE, FixedAsciiString} from './byte-primitives';

class PNGSignature extends Block.extend({
    support8Bit: Uint8,
    png: new FixedAsciiString(3),
    dosLineEnding: new FixedAsciiString(2),
    dosEndOfFile: new FixedAsciiString(1),
    unixLineEnding: new FixedAsciiString(1)
}) {
    static validate () {
        assert(this.equals({
            support8Bit: 0x89,
            png: 'PNG',
            dosLineEnding: '\r\n',
            dosEndOfFile: '\x1a',
            unixLineEnding: '\n'
        }), 'PNGSignature does not match the expected values');
    }
}

Block.initConstructor(PNGSignature);

export {PNGSignature};

class PNGChunkStart extends Block.extend({
    length: Uint32BE,
    chunkType: new FixedAsciiString(4)
}) {}

Block.initConstructor(PNGChunkStart);

export {PNGChunkStart};

class PNGChunkEnd extends Block.extend({
    checksum: Uint32BE
}) {}

Block.initConstructor(PNGChunkEnd);

export {PNGChunkEnd};

class PNGIHDRChunkBody extends Block.extend({
    width: Uint32BE,
    height: Uint32BE,
    bitDepth: Uint8,
    colorType: Uint8,
    compressionMethod: Uint8,
    filterMethod: Uint8,
    interlaceMethod: Uint8
}) {}

Block.initConstructor(PNGIHDRChunkBody);

export {PNGIHDRChunkBody};

class PNGFilterMethodByte extends Block.extend({
    method: Uint8
}) {}

Block.initConstructor(PNGFilterMethodByte);

export {PNGFilterMethodByte};
