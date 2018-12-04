import {Block} from './byte-blocks';
import {Uint16LE, Uint32LE, FixedAsciiString} from './byte-primitives';

class WAVESignature extends Block.extend({
    riff: new FixedAsciiString(4),
    length: Uint32LE,
    wave: new FixedAsciiString(4)
}) {}

Block.initConstructor(WAVESignature);

export {WAVESignature};

class WAVEChunkStart extends Block.extend({
    chunkType: new FixedAsciiString(4),
    length: Uint32LE
}) {}

Block.initConstructor(WAVEChunkStart);

export {WAVEChunkStart};

class WAVEFMTChunkBody extends Block.extend({
    format: Uint16LE,
    channels: Uint16LE,
    sampleRate: Uint32LE,
    bytesPerSec: Uint32LE,
    blockAlignment: Uint16LE,
    bitsPerSample: Uint16LE
}) {}

Block.initConstructor(WAVEFMTChunkBody);

export {WAVEFMTChunkBody};
