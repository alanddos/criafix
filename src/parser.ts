import { format } from "date-fns";

interface MessageFormat {
  lon: string | number;
  lat: string | number;
  height: string | number;
  speed: string | number;
  course: string | number;
  satelites: string | number;
}

const posInfo = (buff: any) => {
  if (buff.length !== 29) {
    throw new Error(`Wrong posinfo block length (${buff.length})`);
  }

  let offset = 0;
  const posInf: MessageFormat = {
    lon: "",
    lat: "",
    height: "",
    speed: "",
    course: "",
    satelites: "",
  };

  // Double, 8 bytes
  posInf.lon = buff.readDoubleLE(offset);
  offset += 8;
  // Double, 8 bytes
  posInf.lat = buff.readDoubleLE(offset);
  offset += 8;
  // Double, 8 bytes
  posInf.height = buff.readDoubleLE(offset);
  offset += 8;
  // Short, 2 bytes
  posInf.speed = buff.readInt16BE(offset);
  offset += 2;
  // Short, 2 bytes
  posInf.course = buff.readInt16BE(offset);
  offset += 2;
  // Byte, 1 byte
  posInf.satelites = buff.readUInt8(offset);
  offset += 1;

  return posInf;
};

const parseText = (buf: any) => {
  if (buf[buf.length - 1] !== 0x00) {
    throw new Error("Text must end with 0x00");
  }

  const textBuf = buf.slice(0, buf.length - 1);
  const text = textBuf.toString();

  return text;
};

const dataBlock = (buff: any) => {
  if (buff.length === 0) {
    return false;
  }

  if (buff.length < 8) {
    throw new Error("Data block too small");
  }

  let offset = 0;

  const blockType = buff.readUInt16LE(offset);
  offset += 2;

  const blockSize = buff.readUInt32BE(offset);
  offset += 4;

  const visibility = buff.readUInt8(offset);
  offset += 1;

  const blockDataType = buff.readUInt8(offset);
  offset += 1;

  const blockNameEnd = buff.indexOf(0x00, offset);
  const blockNameBuf = buff.slice(offset, blockNameEnd);
  const blockName = blockNameBuf.toString();
  offset = blockNameEnd + 1;

  const blockValueSize = blockSize + 6 - offset;
  const blockValueBuf = buff.slice(offset, offset + blockValueSize);
  offset += blockValueSize;

  let blockValue;
  if (blockName === "posinfo") {
    blockValue = posInfo(blockValueBuf);
  } else {
    switch (blockDataType) {
      case 0x01: // text
        blockValue = parseText(blockValueBuf);
        break;

      case 0x02: // binary
        blockValue = blockValueBuf;
        break;

      case 0x03: // Int32
        blockValue = blockValueBuf.readInt32LE(0);
        break;

      case 0x04: // Double
        blockValue = blockValueBuf.readDoubleLE(0);
        break;

      case 0x05: // Int64
        blockValue = blockValueBuf.readIntLE(0, 8);
        break;

      case 0x06: // Image
        blockValue = blockValueBuf.base64();
        break;

      default:
        throw new Error(`Unknown block type code: ${blockType}`);
    }
  }

  return {
    block: {
      name: blockName,
      value: blockValue,
    },
    data: buff.slice(offset),
  };
};

const messageData = (buffer: any) => {
  const offset = 0;
  const data = [];

  while (true) {
    const result = dataBlock(buffer);
    if (!result) {
      console.log(data);
      return data;
    }

    data.push(result.block);
    buffer = result.data;
  }
};

const timestamp = (timestam: any) => {
  // Seconds to miliseconds
  return format(new Date(timestam * 1000), "yyyy-MM-dd HH:mm:ss");
};

const message = (buf: any) => {
  // const messag: any;
  let offset = 0;

  const simpleData = true;

  // Information about the identity of the driver.
  const controllerIdEnd = buf.indexOf(0x00, offset);
  const controllerIdBuf = buf.slice(offset, controllerIdEnd);
  // UID
  const controllerId = controllerIdBuf.toString();
  offset = controllerIdEnd + 1;
  // Time
  const timest = buf.readUInt32BE(offset);
  const time = timestamp(timest);
  offset += 4;

  const data = buf.readUInt32BE(offset);
  offset += 4;

  let messag: any = [];

  if (simpleData) {
    // Location information.
    messag.posInfo = Boolean(data & 0x01);
    // Information about digital inputs.
    messag.digInputInfo = Boolean(data & 0x02);
    // Information about digital outputs.
    messag.digOutInfo = Boolean(data & 0x04);
    // Alarm bit
    messag.alarm = Boolean(data & 0x10);
    // Driver ID
    messag.driversIdInfo = Boolean(data & 0x20);
    // Data
    messag.data = messageData(buf.slice(offset));
    // Time
    messag.time = time;
    // UID
    messag.controllerId = controllerId;
  } else {
    messag = {
      data: messageData(buf.slice(offset)),
      controllerId,
      time,
    };
  }

  return messag;
};

const buffer = (buff: any) => {
  if (buff.length < 4) {
    return { data: buff };
  }

  let offset = 0;
  // The size of the entire package, excluding the current field . Size 4 bytes.
  const packetSize = buff.readUInt32LE(offset);
  offset += 4;

  if (buff.length - offset < packetSize) {
    return { data: buff };
  }

  // Message
  const messageBuffer = buff.slice(offset, offset + packetSize);
  // A substructure that contains data blocks.
  const data = buff.slice(offset + packetSize);

  // Decoded message
  const messag = message(messageBuffer);

  return {
    message: messag,
    data,
  };
};

export default buffer;
