/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/mediaWorker/index.worker.ts":
/*!*********************************************!*\
  !*** ./src/lib/mediaWorker/index.worker.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rlottie_rlottie_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rlottie/rlottie.worker */ "./src/lib/rlottie/rlottie.worker.ts");
/* harmony import */ var _video_preview_video_preview_worker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../video-preview/video-preview.worker */ "./src/lib/video-preview/video-preview.worker.ts");



/***/ }),

/***/ "./src/lib/rlottie/rlottie.worker.ts":
/*!*******************************************!*\
  !*** ./src/lib/rlottie/rlottie.worker.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pako_dist_pako_inflate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pako/dist/pako_inflate */ "./node_modules/pako/dist/pako_inflate.js");
/* harmony import */ var pako_dist_pako_inflate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pako_dist_pako_inflate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_createPostMessageInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/createPostMessageInterface */ "./src/util/createPostMessageInterface.ts");


importScripts(new URL(/* asset import */ __webpack_require__(/*! ./rlottie-wasm.js */ "./src/lib/rlottie/rlottie-wasm.js"), __webpack_require__.b));
let rLottieApi;
const rLottieApiPromise = new Promise(resolve => {
  Module.onRuntimeInitialized = () => {
    rLottieApi = {
      init: Module.cwrap('lottie_init', '', []),
      destroy: Module.cwrap('lottie_destroy', '', ['number']),
      resize: Module.cwrap('lottie_resize', '', ['number', 'number', 'number']),
      buffer: Module.cwrap('lottie_buffer', 'number', ['number']),
      render: Module.cwrap('lottie_render', '', ['number', 'number']),
      loadFromData: Module.cwrap('lottie_load_from_data', 'number', ['number', 'number'])
    };
    resolve();
  };
});
const HIGH_PRIORITY_MAX_FPS = 60;
const LOW_PRIORITY_MAX_FPS = 30;
const DESTROY_REPEAT_DELAY = 1000;
const renderers = new Map();
async function init(key, tgsUrl, imgSize, isLowPriority, customColor, onInit) {
  if (!rLottieApi) {
    await rLottieApiPromise;
  }
  const json = await extractJson(tgsUrl);
  const stringOnWasmHeap = allocate(intArrayFromString(json), 'i8', 0);
  const handle = rLottieApi.init();
  const framesCount = rLottieApi.loadFromData(handle, stringOnWasmHeap);
  rLottieApi.resize(handle, imgSize, imgSize);
  const imageData = new ImageData(imgSize, imgSize);
  const {
    reduceFactor,
    msPerFrame,
    reducedFramesCount
  } = calcParams(json, isLowPriority, framesCount);
  renderers.set(key, {
    imgSize,
    reduceFactor,
    handle,
    imageData,
    customColor
  });
  onInit(reduceFactor, msPerFrame, reducedFramesCount);
}
async function changeData(key, tgsUrl, isLowPriority, onInit) {
  if (!rLottieApi) {
    await rLottieApiPromise;
  }
  const json = await extractJson(tgsUrl);
  const stringOnWasmHeap = allocate(intArrayFromString(json), 'i8', 0);
  const {
    handle
  } = renderers.get(key);
  const framesCount = rLottieApi.loadFromData(handle, stringOnWasmHeap);
  const {
    reduceFactor,
    msPerFrame,
    reducedFramesCount
  } = calcParams(json, isLowPriority, framesCount);
  onInit(reduceFactor, msPerFrame, reducedFramesCount);
}
async function extractJson(tgsUrl) {
  const response = await fetch(tgsUrl);
  const contentType = response.headers.get('Content-Type');

  // Support deprecated JSON format cached locally
  if (contentType?.startsWith('text/')) {
    return response.text();
  }
  const arrayBuffer = await response.arrayBuffer();
  return (0,pako_dist_pako_inflate__WEBPACK_IMPORTED_MODULE_0__.inflate)(arrayBuffer, {
    to: 'string'
  });
}
function calcParams(json, isLowPriority, framesCount) {
  const animationData = JSON.parse(json);
  const maxFps = isLowPriority ? LOW_PRIORITY_MAX_FPS : HIGH_PRIORITY_MAX_FPS;
  const sourceFps = animationData.fr || maxFps;
  const reduceFactor = sourceFps % maxFps === 0 ? sourceFps / maxFps : 1;
  return {
    reduceFactor,
    msPerFrame: 1000 / (sourceFps / reduceFactor),
    reducedFramesCount: Math.ceil(framesCount / reduceFactor)
  };
}
async function renderFrames(key, frameIndex, onProgress) {
  if (!rLottieApi) {
    await rLottieApiPromise;
  }
  const {
    imgSize,
    reduceFactor,
    handle,
    imageData,
    customColor
  } = renderers.get(key);
  const realIndex = frameIndex * reduceFactor;
  rLottieApi.render(handle, realIndex);
  const bufferPointer = rLottieApi.buffer(handle);
  const data = Module.HEAPU8.subarray(bufferPointer, bufferPointer + imgSize * imgSize * 4);
  if (customColor) {
    const arr = new Uint8ClampedArray(data);
    applyColor(arr, customColor);
    imageData.data.set(arr);
  } else {
    imageData.data.set(data);
  }
  const imageBitmap = await createImageBitmap(imageData);
  onProgress(frameIndex, imageBitmap);
}
function applyColor(arr, color) {
  for (let i = 0; i < arr.length; i += 4) {
    arr[i] = color[0];
    arr[i + 1] = color[1];
    arr[i + 2] = color[2];
  }
}
function destroy(key) {
  let isRepeated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  try {
    const renderer = renderers.get(key);
    rLottieApi.destroy(renderer.handle);
    renderers.delete(key);
  } catch (err) {
    // `destroy` sometimes can be called before the initialization is finished
    if (!isRepeated) {
      setTimeout(() => destroy(key, true), DESTROY_REPEAT_DELAY);
    }
  }
}
const api = {
  'rlottie:init': init,
  'rlottie:changeData': changeData,
  'rlottie:renderFrames': renderFrames,
  'rlottie:destroy': destroy
};
(0,_util_createPostMessageInterface__WEBPACK_IMPORTED_MODULE_1__.createWorkerInterface)(api);

/***/ }),

/***/ "./src/lib/video-preview/MP4Demuxer.ts":
/*!*********************************************!*\
  !*** ./src/lib/video-preview/MP4Demuxer.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MP4Demuxer: () => (/* binding */ MP4Demuxer)
/* harmony export */ });
/* harmony import */ var mp4box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mp4box */ "./node_modules/mp4box/dist/mp4box.all.js");
/* harmony import */ var _requestPart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./requestPart */ "./src/lib/video-preview/requestPart.ts");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


const META_PART_SIZE = 128 * 1024;
const MIN_PART_SIZE = 1024;
var Status = /*#__PURE__*/function (Status) {
  Status["loading"] = "loading";
  Status["ready"] = "ready";
  Status["closed"] = "closed";
  return Status;
}(Status || {});
class MP4Demuxer {
  constructor(url, _ref) {
    let {
      onConfig,
      onChunk,
      stepOffset,
      stepMultiplier,
      isPolyfill,
      maxFrames
    } = _ref;
    _defineProperty(this, "url", void 0);
    _defineProperty(this, "file", void 0);
    _defineProperty(this, "status", Status.loading);
    _defineProperty(this, "stepOffset", void 0);
    _defineProperty(this, "stepMultiplier", void 0);
    _defineProperty(this, "maxFrames", void 0);
    _defineProperty(this, "isPolyfill", void 0);
    _defineProperty(this, "decodedSamples", new Set());
    _defineProperty(this, "lastSample", 0);
    _defineProperty(this, "onConfig", void 0);
    _defineProperty(this, "onChunk", void 0);
    this.url = url;
    this.stepOffset = stepOffset;
    this.stepMultiplier = stepMultiplier;
    this.maxFrames = maxFrames;
    this.isPolyfill = isPolyfill;
    this.onConfig = onConfig;
    this.onChunk = onChunk;
    this.file = mp4box__WEBPACK_IMPORTED_MODULE_0__.createFile();
    this.file.onError = e => {
      // eslint-disable-next-line no-console
      console.error(e);
    };
    this.file.onReady = this.onReady.bind(this);
    this.file.onSamples = this.onSamples.bind(this);
    void this.loadMetadata();
  }
  async loadMetadata() {
    let offset = 0;
    while (offset !== undefined) {
      try {
        offset = await this.requestPart(offset, META_PART_SIZE);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
      if (this.status === Status.ready) break;
    }
  }
  async loadNextFrames(step, duration, partSize) {
    let tick = step * this.stepOffset;
    let lastSample = 0;
    let rap = this.file.seek(tick, true);
    while (this.status !== Status.closed) {
      try {
        await this.requestPart(rap.offset, partSize);
        if (tick > duration) break;
        if (this.lastSample > 1 && lastSample < this.lastSample) {
          tick += step * this.stepMultiplier;
          lastSample = this.lastSample;
        }
        rap = this.file.seek(tick, true);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
    this.file.flush();
  }
  async requestPart(offset, partSize) {
    let useRap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const reminder = offset % MIN_PART_SIZE;
    const start = offset - reminder;
    const end = start + partSize - 1;
    let arrayBuffer = await (0,_requestPart__WEBPACK_IMPORTED_MODULE_1__.requestPart)({
      url: this.url,
      start,
      end
    });
    if (!arrayBuffer) {
      return undefined;
    }
    if (reminder) {
      arrayBuffer = arrayBuffer.slice(reminder);
    }
    arrayBuffer.fileStart = offset;
    const nextOffset = this.file.appendBuffer(arrayBuffer);
    if (!useRap) return offset + arrayBuffer.byteLength;
    return nextOffset;
  }
  description(track) {
    const t = this.file.getTrackById(track.id);
    for (const entry of t.mdia.minf.stbl.stsd.entries) {
      if (entry.avcC || entry.hvcC || entry.av1C) {
        const stream = new mp4box__WEBPACK_IMPORTED_MODULE_0__.DataStream(undefined, 0, mp4box__WEBPACK_IMPORTED_MODULE_0__.DataStream.BIG_ENDIAN);
        if (entry.avcC) {
          entry.avcC.write(stream);
        } else if (entry.hvcC) {
          entry.hvcC.write(stream);
        } else if (entry.av1C) {
          entry.av1C.write(stream);
        }
        return new Uint8Array(stream.buffer, 8); // Remove the box header.
      }
    }
    throw new Error('avcC, hvcC ro av1C not found');
  }
  onReady(info) {
    const track = info.videoTracks[0];
    let codec = track.codec;
    if (codec.startsWith('avc1')) {
      // Somehow this is the only avc1 codec that works.
      codec = 'avc1.4d001f';
    }

    // Generate and emit an appropriate VideoDecoderConfig.
    this.onConfig({
      codec,
      codedHeight: track.video.height,
      codedWidth: track.video.width,
      description: this.description(track)
    });
    const duration = info.duration / info.timescale;

    // If we set a part size too small, the onSamples callback is not called.
    // If we use polyfill, we need to set a smaller part size to avoid decoding multiple frames.
    const partSizeDivider = this.isPolyfill ? 24 : 12;
    const partSize = roundPartSize(track.bitrate / partSizeDivider);
    const step = calculateStep(duration, this.maxFrames);

    // Start demuxing.
    this.file.setExtractionOptions(track.id, undefined, {
      nbSamples: 1
    });
    this.file.start();
    this.status = Status.ready;

    // // Load frames
    void this.loadNextFrames(step, duration, partSize);
  }
  onSamples(trackId, ref, samples) {
    if (this.status !== Status.ready) return;
    // Generate and emit an EncodedVideoChunk for each demuxed sample.
    for (const sample of samples) {
      const time = sample.cts / sample.timescale;
      const type = sample.is_sync ? 'key' : 'delta';
      const id = `${type}${sample.number}`;

      // Skip already decoded samples.
      if (this.decodedSamples.has(id)) continue;

      // @ts-ignore
      this.onChunk(new EncodedVideoChunk({
        type,
        timestamp: 1e6 * time,
        duration: 1e6 * sample.duration / sample.timescale,
        data: sample.data
      }));
      this.decodedSamples.add(id);
      this.lastSample = parseInt(sample.number, 10);
      if (sample.is_sync) {
        this.file.releaseUsedSamples(trackId, sample.number);
      }
    }
  }
  close() {
    this.file.flush();
    this.file.stop();
    this.status = Status.closed;
  }
}
function roundPartSize(size) {
  return size + MIN_PART_SIZE - size % MIN_PART_SIZE;
}
function calculateStep(duration, max) {
  return Math.round((duration + max) / max);
}

/***/ }),

/***/ "./src/lib/video-preview/requestPart.ts":
/*!**********************************************!*\
  !*** ./src/lib/video-preview/requestPart.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   requestPart: () => (/* binding */ requestPart)
/* harmony export */ });
/* harmony import */ var _util_generateUniqueId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/generateUniqueId */ "./src/util/generateUniqueId.ts");
/* harmony import */ var _util_schedulers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/schedulers */ "./src/util/schedulers.ts");


const PART_TIMEOUT = 30000;
const requestStates = new Map();
function requestPart(params) {
  const messageId = (0,_util_generateUniqueId__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const requestState = {};
  let isResolved = false;
  const promise = Promise.race([(0,_util_schedulers__WEBPACK_IMPORTED_MODULE_1__.pause)(PART_TIMEOUT).then(() => isResolved ? undefined : Promise.reject(new Error('ERROR_PART_TIMEOUT'))), new Promise((resolve, reject) => {
    Object.assign(requestState, {
      resolve,
      reject
    });
  })]);
  requestStates.set(messageId, requestState);
  promise.catch(() => undefined).finally(() => {
    requestStates.delete(messageId);
    isResolved = true;
  });
  const message = {
    type: 'requestPart',
    messageId,
    params
  };
  postMessage(message);
  return promise;
}
self.addEventListener('message', e => {
  const {
    type,
    messageId,
    result
  } = e.data;
  if (type === 'partResponse') {
    const requestState = requestStates.get(messageId);
    if (requestState) {
      requestState.resolve(result);
    }
  }
});

/***/ }),

/***/ "./src/lib/video-preview/video-preview.worker.ts":
/*!*******************************************************!*\
  !*** ./src/lib/video-preview/video-preview.worker.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_createPostMessageInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/createPostMessageInterface */ "./src/util/createPostMessageInterface.ts");
/* harmony import */ var _MP4Demuxer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MP4Demuxer */ "./src/lib/video-preview/MP4Demuxer.ts");


let decoder;
let demuxer;
let onDestroy;
function init(url, maxFrames, workerIndex, workersTotal, onFrame) {
  const hasWebCodecs = ('VideoDecoder' in globalThis);
  if (!hasWebCodecs) {
    // eslint-disable-next-line no-console
    console.log('[Video Preview] WebCodecs not supported');
    return new Promise(resolve => {
      onDestroy = resolve;
    });
  }
  const decodedFrames = new Set();

  // @ts-ignore
  decoder = new VideoDecoder({
    async output(frame) {
      const time = frame.timestamp / 1e6;
      const seconds = Math.floor(time);
      // Only render whole second frames
      if (!decodedFrames.has(seconds)) {
        const bitmap = await createImageBitmap(frame);
        decodedFrames.add(seconds);
        onFrame(seconds, bitmap);
      }
      frame.close();
    },
    error(e) {
      // eslint-disable-next-line no-console
      console.error('[Video Preview] error', e);
    }
  });
  demuxer = new _MP4Demuxer__WEBPACK_IMPORTED_MODULE_1__.MP4Demuxer(url, {
    stepOffset: workerIndex,
    stepMultiplier: workersTotal,
    isPolyfill: !hasWebCodecs,
    maxFrames,
    onConfig(config) {
      decoder?.configure(config);
    },
    onChunk(chunk) {
      if (decoder?.state !== 'configured') return;
      decoder?.decode(chunk);
    }
  });
  return new Promise(resolve => {
    onDestroy = resolve;
  });
}
function destroy() {
  try {
    decoder?.close();
    demuxer?.close();
  } catch {
    // Ignore
  }
  decoder = undefined;
  demuxer = undefined;
  onDestroy?.();
}
const api = {
  'video-preview:init': init,
  'video-preview:destroy': destroy
};
(0,_util_createPostMessageInterface__WEBPACK_IMPORTED_MODULE_0__.createWorkerInterface)(api);

/***/ }),

/***/ "./src/util/callbacks.ts":
/*!*******************************!*\
  !*** ./src/util/callbacks.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCallbackManager: () => (/* binding */ createCallbackManager)
/* harmony export */ });
function createCallbackManager() {
  const callbacks = new Set();
  function addCallback(cb) {
    callbacks.add(cb);
    return () => {
      removeCallback(cb);
    };
  }
  function removeCallback(cb) {
    callbacks.delete(cb);
  }
  function runCallbacks() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    callbacks.forEach(callback => {
      callback(...args);
    });
  }
  function hasCallbacks() {
    return Boolean(callbacks.size);
  }
  return {
    runCallbacks,
    addCallback,
    removeCallback,
    hasCallbacks
  };
}

/***/ }),

/***/ "./src/util/createPostMessageInterface.ts":
/*!************************************************!*\
  !*** ./src/util/createPostMessageInterface.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWorkerInterface: () => (/* binding */ createWorkerInterface)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./callbacks */ "./src/util/callbacks.ts");


const callbackState = new Map();
const messageHandlers = (0,_callbacks__WEBPACK_IMPORTED_MODULE_1__.createCallbackManager)();
onmessage = messageHandlers.runCallbacks;
function createWorkerInterface(api, channel) {
  function sendToOrigin(data, transferables) {
    data.channel = channel;
    if (transferables) {
      postMessage(data, transferables);
    } else {
      postMessage(data);
    }
  }
  handleErrors(sendToOrigin);
  messageHandlers.addCallback(message => {
    if (message.data?.channel === channel) {
      onMessage(api, message.data, sendToOrigin);
    }
  });
}
async function onMessage(api, data, sendToOrigin, onUpdate) {
  if (!onUpdate) {
    onUpdate = update => {
      sendToOrigin({
        type: 'update',
        update
      });
    };
  }
  switch (data.type) {
    case 'init':
      {
        const {
          args
        } = data;
        const promise = typeof api === 'function' ? api('init', onUpdate, ...args) : api.init?.(onUpdate, ...args);
        await promise;
        break;
      }
    case 'callMethod':
      {
        const {
          messageId,
          name,
          args,
          withCallback
        } = data;
        try {
          if (typeof api !== 'function' && !api[name]) return;
          if (messageId && withCallback) {
            const callback = function () {
              for (var _len = arguments.length, callbackArgs = new Array(_len), _key = 0; _key < _len; _key++) {
                callbackArgs[_key] = arguments[_key];
              }
              const lastArg = callbackArgs[callbackArgs.length - 1];
              sendToOrigin({
                type: 'methodCallback',
                messageId,
                callbackArgs
              }, isTransferable(lastArg) ? [lastArg] : undefined);
            };
            callbackState.set(messageId, callback);
            args.push(callback);
          }
          const response = typeof api === 'function' ? await api(name, ...args) : await api[name](...args);
          const {
            arrayBuffer
          } = typeof response === 'object' && 'arrayBuffer' in response && response || {};
          if (messageId) {
            sendToOrigin({
              type: 'methodResponse',
              messageId,
              response
            }, arrayBuffer ? [arrayBuffer] : undefined);
          }
        } catch (error) {
          if (_config__WEBPACK_IMPORTED_MODULE_0__.DEBUG) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
          if (messageId) {
            sendToOrigin({
              type: 'methodResponse',
              messageId,
              error: {
                message: error.message
              }
            });
          }
        }
        if (messageId) {
          callbackState.delete(messageId);
        }
        break;
      }
    case 'cancelProgress':
      {
        const callback = callbackState.get(data.messageId);
        if (callback) {
          callback.isCanceled = true;
        }
        break;
      }
  }
}
function isTransferable(obj) {
  return obj instanceof ArrayBuffer || obj instanceof ImageBitmap;
}
function handleErrors(sendToOrigin) {
  self.onerror = e => {
    // eslint-disable-next-line no-console
    console.error(e);
    sendToOrigin({
      type: 'unhandledError',
      error: {
        message: e.error.message || 'Uncaught exception in worker'
      }
    });
  };
  self.addEventListener('unhandledrejection', e => {
    // eslint-disable-next-line no-console
    console.error(e);
    sendToOrigin({
      type: 'unhandledError',
      error: {
        message: e.reason.message || 'Uncaught rejection in worker'
      }
    });
  });
}

/***/ }),

/***/ "./src/util/generateUniqueId.ts":
/*!**************************************!*\
  !*** ./src/util/generateUniqueId.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateUniqueId)
/* harmony export */ });
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/***/ }),

/***/ "./src/util/schedulers.ts":
/*!********************************!*\
  !*** ./src/util/schedulers.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   fastRaf: () => (/* binding */ fastRaf),
/* harmony export */   onBeforeUnload: () => (/* binding */ onBeforeUnload),
/* harmony export */   onIdle: () => (/* binding */ onIdle),
/* harmony export */   onTickEnd: () => (/* binding */ onTickEnd),
/* harmony export */   pause: () => (/* binding */ pause),
/* harmony export */   rafPromise: () => (/* binding */ rafPromise),
/* harmony export */   throttle: () => (/* binding */ throttle),
/* harmony export */   throttleWith: () => (/* binding */ throttleWith),
/* harmony export */   throttleWithTickEnd: () => (/* binding */ throttleWithTickEnd)
/* harmony export */ });
function debounce(fn, ms) {
  let shouldRunFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  let shouldRunLast = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  let waitingTimeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (waitingTimeout) {
      clearTimeout(waitingTimeout);
      waitingTimeout = undefined;
    } else if (shouldRunFirst) {
      fn(...args);
    }

    // eslint-disable-next-line no-restricted-globals
    waitingTimeout = self.setTimeout(() => {
      if (shouldRunLast) {
        fn(...args);
      }
      waitingTimeout = undefined;
    }, ms);
  };
}
function throttle(fn, ms) {
  let shouldRunFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  let interval;
  let isPending;
  let args;
  return function () {
    isPending = true;
    for (var _len2 = arguments.length, _args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _args[_key2] = arguments[_key2];
    }
    args = _args;
    if (!interval) {
      if (shouldRunFirst) {
        isPending = false;
        fn(...args);
      }

      // eslint-disable-next-line no-restricted-globals
      interval = self.setInterval(() => {
        if (!isPending) {
          // eslint-disable-next-line no-restricted-globals
          self.clearInterval(interval);
          interval = undefined;
          return;
        }
        isPending = false;
        fn(...args);
      }, ms);
    }
  };
}
function throttleWithTickEnd(fn) {
  return throttleWith(onTickEnd, fn);
}
function throttleWith(schedulerFn, fn) {
  let waiting = false;
  let args;
  return function () {
    for (var _len3 = arguments.length, _args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      _args[_key3] = arguments[_key3];
    }
    args = _args;
    if (!waiting) {
      waiting = true;
      schedulerFn(() => {
        waiting = false;
        fn(...args);
      });
    }
  };
}
function onIdle(cb, timeout) {
  // eslint-disable-next-line no-restricted-globals
  if (self.requestIdleCallback) {
    // eslint-disable-next-line no-restricted-globals
    self.requestIdleCallback(cb, {
      timeout
    });
  } else {
    onTickEnd(cb);
  }
}
const pause = ms => new Promise(resolve => {
  setTimeout(() => resolve(), ms);
});
function rafPromise() {
  return new Promise(resolve => {
    fastRaf(resolve);
  });
}
const FAST_RAF_TIMEOUT_FALLBACK_MS = 35; // < 30 FPS

let fastRafCallbacks;
let fastRafFallbackCallbacks;
let fastRafFallbackTimeout;

// May result in an immediate execution if called from another RAF callback which was scheduled
// (and therefore is executed) earlier than RAF callback scheduled by `fastRaf`
function fastRaf(callback) {
  let withTimeoutFallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!fastRafCallbacks) {
    fastRafCallbacks = new Set([callback]);
    requestAnimationFrame(() => {
      const currentCallbacks = fastRafCallbacks;
      fastRafCallbacks = undefined;
      fastRafFallbackCallbacks = undefined;
      if (fastRafFallbackTimeout) {
        clearTimeout(fastRafFallbackTimeout);
        fastRafFallbackTimeout = undefined;
      }
      currentCallbacks.forEach(cb => cb());
    });
  } else {
    fastRafCallbacks.add(callback);
  }
  if (withTimeoutFallback) {
    if (!fastRafFallbackCallbacks) {
      fastRafFallbackCallbacks = new Set([callback]);
    } else {
      fastRafFallbackCallbacks.add(callback);
    }
    if (!fastRafFallbackTimeout) {
      fastRafFallbackTimeout = window.setTimeout(() => {
        const currentTimeoutCallbacks = fastRafFallbackCallbacks;
        if (fastRafCallbacks) {
          currentTimeoutCallbacks.forEach(fastRafCallbacks.delete, fastRafCallbacks);
        }
        fastRafFallbackCallbacks = undefined;
        if (fastRafFallbackTimeout) {
          clearTimeout(fastRafFallbackTimeout);
          fastRafFallbackTimeout = undefined;
        }
        currentTimeoutCallbacks.forEach(cb => cb());
      }, FAST_RAF_TIMEOUT_FALLBACK_MS);
    }
  }
}
let onTickEndCallbacks;
function onTickEnd(callback) {
  if (!onTickEndCallbacks) {
    onTickEndCallbacks = [callback];
    Promise.resolve().then(() => {
      const currentCallbacks = onTickEndCallbacks;
      onTickEndCallbacks = undefined;
      currentCallbacks.forEach(cb => cb());
    });
  } else {
    onTickEndCallbacks.push(callback);
  }
}
let beforeUnloadCallbacks;
function onBeforeUnload(callback) {
  let isLast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!beforeUnloadCallbacks) {
    beforeUnloadCallbacks = [];
    // eslint-disable-next-line no-restricted-globals
    self.addEventListener('beforeunload', () => {
      beforeUnloadCallbacks.forEach(cb => cb());
    });
  }
  if (isLast) {
    beforeUnloadCallbacks.push(callback);
  } else {
    beforeUnloadCallbacks.unshift(callback);
  }
  return () => {
    beforeUnloadCallbacks = beforeUnloadCallbacks.filter(cb => cb !== callback);
  };
}

/***/ }),

/***/ "./src/lib/rlottie/rlottie-wasm.js":
/*!*****************************************!*\
  !*** ./src/lib/rlottie/rlottie-wasm.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "rlottie-wasm.51d175377b5332e82d64.js";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_pako_dist_pako_inflate_js","vendors-node_modules_mp4box_dist_mp4box_all_js","src_config_ts"], () => (__webpack_require__("./src/lib/mediaWorker/index.worker.ts")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + {"vendors-node_modules_pako_dist_pako_inflate_js":"5f75bdcaf063c6c088d2","vendors-node_modules_mp4box_dist_mp4box_all_js":"ae4c1ac754ab954b0df3","src_config_ts":"d91d981f0690dbfe91a9"}[chunkId] + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = self.location + "";
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_lib_mediaWorker_index_worker_ts": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktelegram_t"] = self["webpackChunktelegram_t"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return Promise.all(["vendors-node_modules_pako_dist_pako_inflate_js","vendors-node_modules_mp4box_dist_mp4box_all_js","src_config_ts"].map(__webpack_require__.e, __webpack_require__)).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=src_lib_mediaWorker_index_worker_ts.d3090a551348f5ee68da.js.map