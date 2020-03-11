export const makeRequestWithToken = (
  postUrl,
  payloadCreateFn,
  token,
  requestOptionsOverride = {}
) => {
  const payload = payloadCreateFn();
  const payloadStr = JSON.stringify(payload);
  const reqOpts = Object.assign(
    {
      url: postUrl,
      method: "POST",
      body: payloadStr,
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        authorization: "Bearer " + token,
        "cache-control": "no-cache",
        "content-type": "application/json;charset=UTF-8",
        pragma: "no-cache"
      }
    },
    requestOptionsOverride
  );
  return cy.request(reqOpts);
};
export const uuid = (() => {
  // https://github.com/broofa/node-uuid
  // Maps for number <-> hex string conversion
  let byteToHex = [];
  for (var i = 0; i < 256; i++) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }
  const unparse = (buf, offset) => {
    var i = offset || 0,
      bth = byteToHex;
    return (
      bth[buf[i++]] +
      bth[buf[i++]] +
      bth[buf[i++]] +
      bth[buf[i++]] +
      "-" +
      bth[buf[i++]] +
      bth[buf[i++]] +
      "-" +
      bth[buf[i++]] +
      bth[buf[i++]] +
      "-" +
      bth[buf[i++]] +
      bth[buf[i++]] +
      "-" +
      bth[buf[i++]] +
      bth[buf[i++]] +
      bth[buf[i++]] +
      bth[buf[i++]] +
      bth[buf[i++]] +
      bth[buf[i++]]
    );
  };
  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html
  // random #'s we need to init node and clockseq
  let seedBytes = new Array(16);
  for (let i = 0, r; i < 16; i++) {
    if ((i & 0x03) === 0) {
      r = Math.random() * 0x100000000;
    }
    seedBytes[i] = (r >>> ((i & 0x03) << 3)) & 0xff;
  }
  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  let nodeId = [
    seedBytes[0] | 0x01,
    seedBytes[1],
    seedBytes[2],
    seedBytes[3],
    seedBytes[4],
    seedBytes[5]
  ];
  // Per 4.2.2, randomize (14 bit) clockseq
  let clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 0x3fff;
  // Previous uuid creation time
  let lastMSecs = 0;
  let lastNSecs = 0;
  return () => {
    let i = 0;
    let b = [];
    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    let msecs = new Date().getTime();
    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    let nsecs = lastNSecs + 1;
    // Time since last uuid creation (in msecs)
    let dt = msecs - lastMSecs + (nsecs - lastNSecs) / 10000;
    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0) {
      clockseq = (clockseq + 1) & 0x3fff;
    }
    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if (dt < 0 || msecs > lastMSecs) {
      nsecs = 0;
    }
    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    lastMSecs = msecs;
    lastNSecs = nsecs;
    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;
    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = (tl >>> 24) & 0xff;
    b[i++] = (tl >>> 16) & 0xff;
    b[i++] = (tl >>> 8) & 0xff;
    b[i++] = tl & 0xff;
    // `time_mid`
    var tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
    b[i++] = (tmh >>> 8) & 0xff;
    b[i++] = tmh & 0xff;
    // `time_high_and_version`
    b[i++] = ((tmh >>> 24) & 0xf) | 0x10; // include version
    b[i++] = (tmh >>> 16) & 0xff;
    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = (clockseq >>> 8) | 0x80;
    // `clock_seq_low`
    b[i++] = clockseq & 0xff;
    // `node`
    for (let n = 0; n < 6; n++) {
      b[i + n] = nodeId[n];
    }
    return unparse(b);
  };
})();
