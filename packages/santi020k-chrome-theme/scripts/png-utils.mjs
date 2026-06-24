import { readFileSync, writeFileSync } from 'node:fs';

const PNG_SIGNATURE_HEX = '89504e470d0a1a0a';
const STORE_SAFE_PNG_CHUNKS = new Set(['IHDR', 'IDAT', 'IEND']);

export const readPngInfo = filePath => {
  const buffer = readFileSync(filePath);

  if (buffer.subarray(0, 8).toString('hex') !== PNG_SIGNATURE_HEX) {
    throw new Error('not a PNG file');
  }

  const chunks = [];
  let offset = 8;
  let hasEnd = false;

  while (offset < buffer.length) {
    if (offset + 8 > buffer.length) {
      throw new Error('truncated PNG chunk header');
    }

    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString('ascii');
    const nextOffset = offset + 12 + length;

    if (nextOffset > buffer.length) {
      throw new Error(`truncated PNG chunk: ${type}`);
    }

    chunks.push(type);

    offset = nextOffset;

    if (type === 'IEND') {
      hasEnd = true;

      break;
    }
  }

  if (!hasEnd) {
    throw new Error('missing IEND chunk');
  }

  return {
    bitDepth: buffer[24],
    chunks,
    colorType: buffer[25],
    compression: buffer[26],
    filter: buffer[27],
    height: buffer.readUInt32BE(20),
    interlace: buffer[28],
    width: buffer.readUInt32BE(16),
  };
};

export const stripPngAncillaryChunks = filePath => {
  const buffer = readFileSync(filePath);

  if (buffer.subarray(0, 8).toString('hex') !== PNG_SIGNATURE_HEX) {
    throw new Error('not a PNG file');
  }

  const parts = [buffer.subarray(0, 8)];
  let offset = 8;
  let hasEnd = false;

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString('ascii');
    const nextOffset = offset + 12 + length;

    if (STORE_SAFE_PNG_CHUNKS.has(type)) {
      parts.push(buffer.subarray(offset, nextOffset));
    }

    offset = nextOffset;

    if (type === 'IEND') {
      hasEnd = true;

      break;
    }
  }

  if (!hasEnd) {
    throw new Error('missing IEND chunk');
  }

  writeFileSync(filePath, Buffer.concat(parts));
};

export const assertStoreSafeNtpPng = (filePath, requirement = {}, label = filePath) => {
  const info = readPngInfo(filePath);
  const expectedWidth = requirement.width;
  const expectedHeight = requirement.height;
  const minWidth = requirement.minWidth;
  const minHeight = requirement.minHeight;
  const maxWidth = requirement.maxWidth;
  const maxHeight = requirement.maxHeight;

  if (expectedWidth && info.width !== expectedWidth) {
    throw new Error(`${label}: expected width ${expectedWidth}px, got ${info.width}px`);
  }

  if (expectedHeight && info.height !== expectedHeight) {
    throw new Error(`${label}: expected height ${expectedHeight}px, got ${info.height}px`);
  }

  if (minWidth && info.width < minWidth) {
    throw new Error(`${label}: width ${info.width}px is below ${minWidth}px`);
  }

  if (minHeight && info.height < minHeight) {
    throw new Error(`${label}: height ${info.height}px is below ${minHeight}px`);
  }

  if (maxWidth && info.width > maxWidth) {
    throw new Error(`${label}: width ${info.width}px is above ${maxWidth}px`);
  }

  if (maxHeight && info.height > maxHeight) {
    throw new Error(`${label}: height ${info.height}px is above ${maxHeight}px`);
  }

  if (info.bitDepth !== 8 || info.colorType !== 2) {
    throw new Error(`${label}: expected 8-bit RGB PNG, got bit depth ${info.bitDepth}, color type ${info.colorType}`);
  }

  if (info.compression !== 0 || info.filter !== 0 || info.interlace !== 0) {
    throw new Error(`${label}: expected standard non-interlaced PNG encoding`);
  }

  const extraChunks = [...new Set(info.chunks.filter(type => !STORE_SAFE_PNG_CHUNKS.has(type)))];

  if (extraChunks.length > 0) {
    throw new Error(`${label}: contains ancillary chunks (${extraChunks.join(', ')})`);
  }

  return info;
};
