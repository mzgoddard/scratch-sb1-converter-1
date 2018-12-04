import {Block} from './byte-blocks';
import {Uint8, Uint16LE, Uint32LE} from './byte-primitives';

const DEFLATE_BLOCK_SIZE_MAX = 0xffff;

export {DEFLATE_BLOCK_SIZE_MAX};

class DeflateHeader extends Block.extend({
    cmf: Uint8,
    flag: Uint8
}) {}

Block.initConstructor(DeflateHeader);

export {DeflateHeader};

class DeflateChunkStart extends Block.extend({
    lastBlock: Uint8,
    length: Uint16LE,
    lengthCheck: Uint16LE
}) {}

Block.initConstructor(DeflateChunkStart);

export {DeflateChunkStart};

class DeflateEnd extends Block.extend({
    checksum: Uint32LE
}) {}

Block.initConstructor(DeflateEnd);

export {DeflateEnd};
