(self["webpackChunktelegram_t"] = self["webpackChunktelegram_t"] || []).push([["src_api_gramjs_apiBuilders_messages_ts"],{

/***/ "./src/api/gramjs/apiBuilders/calls.ts":
/*!*********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/calls.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiCallDiscardReason: () => (/* binding */ buildApiCallDiscardReason),
/* harmony export */   buildApiCallProtocol: () => (/* binding */ buildApiCallProtocol),
/* harmony export */   buildApiGroupCall: () => (/* binding */ buildApiGroupCall),
/* harmony export */   buildApiGroupCallParticipant: () => (/* binding */ buildApiGroupCallParticipant),
/* harmony export */   buildCallProtocol: () => (/* binding */ buildCallProtocol),
/* harmony export */   buildPhoneCall: () => (/* binding */ buildPhoneCall),
/* harmony export */   getGroupCallId: () => (/* binding */ getGroupCallId)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");


function buildApiGroupCallParticipant(participant) {
  const {
    self,
    min,
    about,
    date,
    versioned,
    canSelfUnmute,
    justJoined,
    left,
    muted,
    mutedByYou,
    source,
    volume,
    volumeByAdmin,
    videoJoined,
    peer,
    video,
    presentation,
    raiseHandRating
  } = participant;
  return {
    isSelf: self,
    isMin: min,
    canSelfUnmute,
    isLeft: left,
    isMuted: muted,
    isMutedByMe: mutedByYou,
    hasJustJoined: justJoined,
    isVolumeByAdmin: volumeByAdmin,
    isVersioned: versioned,
    isVideoJoined: videoJoined,
    about,
    source,
    raiseHandRating: raiseHandRating?.toString(),
    volume,
    date: new Date(date),
    isUser: (0,_peers__WEBPACK_IMPORTED_MODULE_1__.isPeerUser)(peer),
    id: (0,_peers__WEBPACK_IMPORTED_MODULE_1__.getApiChatIdFromMtpPeer)(peer),
    video: video ? buildApiGroupCallParticipantVideo(video) : undefined,
    presentation: presentation ? buildApiGroupCallParticipantVideo(presentation) : undefined
  };
}
function buildApiGroupCallParticipantVideo(participantVideo) {
  const {
    audioSource,
    endpoint,
    paused,
    sourceGroups
  } = participantVideo;
  return {
    audioSource,
    endpoint,
    isPaused: paused,
    sourceGroups: sourceGroups.map(buildApiGroupCallParticipantVideoSourceGroup)
  };
}
function buildApiGroupCallParticipantVideoSourceGroup(participantVideoSourceGroup) {
  return {
    semantics: participantVideoSourceGroup.semantics,
    sources: participantVideoSourceGroup.sources
  };
}
function buildApiGroupCall(groupCall) {
  const {
    id,
    accessHash
  } = groupCall;
  if (groupCall instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.GroupCallDiscarded) {
    return {
      connectionState: 'discarded',
      id: id.toString(),
      accessHash: accessHash.toString(),
      participantsCount: 0,
      version: 0,
      participants: {}
    };
  }
  const {
    version,
    participantsCount,
    streamDcId,
    scheduleDate,
    canChangeJoinMuted,
    joinMuted,
    canStartVideo,
    scheduleStartSubscribed
  } = groupCall;
  return {
    connectionState: 'disconnected',
    isLoaded: true,
    id: id.toString(),
    accessHash: accessHash.toString(),
    version,
    participantsCount,
    streamDcId,
    scheduleDate,
    canChangeJoinMuted,
    joinMuted,
    canStartVideo,
    scheduleStartSubscribed,
    participants: {}
  };
}
function getGroupCallId(groupCall) {
  return groupCall.id.toString();
}
function buildPhoneCall(call) {
  const {
    id
  } = call;
  let phoneCall = {
    id: id.toString()
  };
  if (call instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallAccepted || call instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallWaiting || call instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCall || call instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallRequested) {
    const {
      accessHash,
      adminId,
      date,
      video,
      participantId,
      protocol
    } = call;
    phoneCall = {
      ...phoneCall,
      accessHash: accessHash.toString(),
      adminId: adminId.toString(),
      participantId: participantId.toString(),
      date,
      isVideo: video,
      protocol: buildApiCallProtocol(protocol)
    };
  }
  if (call instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCall) {
    const {
      p2pAllowed,
      gAOrB,
      keyFingerprint,
      connections,
      startDate
    } = call;
    phoneCall = {
      ...phoneCall,
      state: 'active',
      gAOrB: Array.from(gAOrB),
      keyFingerprint: keyFingerprint.toString(),
      startDate,
      isP2pAllowed: Boolean(p2pAllowed),
      connections: connections.map(buildApiCallConnection).filter(Boolean)
    };
  }
  if (call instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallDiscarded) {
    phoneCall = {
      ...phoneCall,
      state: 'discarded',
      duration: call.duration,
      reason: buildApiCallDiscardReason(call.reason),
      needRating: call.needRating,
      needDebug: call.needDebug
    };
  }
  if (call instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallWaiting) {
    phoneCall = {
      ...phoneCall,
      state: 'waiting',
      receiveDate: call.receiveDate
    };
  }
  if (call instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallAccepted) {
    phoneCall = {
      ...phoneCall,
      state: 'accepted',
      gB: Array.from(call.gB)
    };
  }
  if (call instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallRequested) {
    phoneCall = {
      ...phoneCall,
      state: 'requested',
      gAHash: Array.from(call.gAHash)
    };
  }
  return phoneCall;
}
function buildApiCallDiscardReason(discardReason) {
  if (discardReason instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallDiscardReasonMissed) {
    return 'missed';
  } else if (discardReason instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallDiscardReasonBusy) {
    return 'busy';
  } else if (discardReason instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallDiscardReasonHangup) {
    return 'hangup';
  } else {
    return 'disconnect';
  }
}
function buildApiCallConnection(connection) {
  if (connection instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneConnectionWebrtc) {
    const {
      username,
      password,
      turn,
      stun,
      ip,
      ipv6,
      port
    } = connection;
    return {
      username,
      password,
      isTurn: turn,
      isStun: stun,
      ip,
      ipv6,
      port
    };
  } else {
    return undefined;
  }
}
function buildApiCallProtocol(protocol) {
  const {
    libraryVersions,
    minLayer,
    maxLayer,
    udpP2p,
    udpReflector
  } = protocol;
  return {
    libraryVersions,
    minLayer,
    maxLayer,
    isUdpP2p: udpP2p,
    isUdpReflector: udpReflector
  };
}
function buildCallProtocol() {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhoneCallProtocol({
    libraryVersions: ['4.0.0'],
    minLayer: 92,
    maxLayer: 92,
    udpReflector: true,
    udpP2p: true
  });
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/common.ts":
/*!**********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/common.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiFormattedText: () => (/* binding */ buildApiFormattedText),
/* harmony export */   buildApiMessageEntity: () => (/* binding */ buildApiMessageEntity),
/* harmony export */   buildApiPhoto: () => (/* binding */ buildApiPhoto),
/* harmony export */   buildApiPhotoSize: () => (/* binding */ buildApiPhotoSize),
/* harmony export */   buildApiThumbnailFromCached: () => (/* binding */ buildApiThumbnailFromCached),
/* harmony export */   buildApiThumbnailFromPath: () => (/* binding */ buildApiThumbnailFromPath),
/* harmony export */   buildApiThumbnailFromStripped: () => (/* binding */ buildApiThumbnailFromStripped),
/* harmony export */   buildApiUsernames: () => (/* binding */ buildApiUsernames),
/* harmony export */   buildApiVideoSize: () => (/* binding */ buildApiVideoSize),
/* harmony export */   buildPrivacyRules: () => (/* binding */ buildPrivacyRules)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs/Utils */ "./src/lib/gramjs/Utils.js");
/* harmony import */ var _lib_gramjs_Utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_Utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types */ "./src/api/types/index.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers */ "./src/api/gramjs/apiBuilders/helpers.ts");
/* harmony import */ var _pathBytesToSvg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pathBytesToSvg */ "./src/api/gramjs/apiBuilders/pathBytesToSvg.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");








const DEFAULT_THUMB_SIZE = {
  w: 100,
  h: 100
};
function buildApiThumbnailFromStripped(sizes, mimeType) {
  if (!sizes || !sizes.length) {
    return undefined;
  }
  const thumb = sizes.find(s => s instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoStrippedSize);
  if (!thumb) {
    return undefined;
  }
  const realSizes = sizes.filter(s => s instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoSize);
  const {
    w,
    h
  } = realSizes.length ? realSizes[realSizes.length - 1] : DEFAULT_THUMB_SIZE;
  const {
    bytes
  } = thumb;
  const dataUri = (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.bytesToDataUri)(!mimeType || mimeType === 'image/jpeg' ? (0,_lib_gramjs_Utils__WEBPACK_IMPORTED_MODULE_1__.strippedPhotoToJpg)(bytes) : bytes, undefined, mimeType);
  return {
    dataUri,
    width: w,
    height: h
  };
}
function buildApiThumbnailFromCached(photoSize) {
  const {
    w,
    h,
    bytes
  } = photoSize;
  const dataUri = (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.bytesToDataUri)(bytes, undefined, 'image/webp');
  return {
    dataUri,
    width: w,
    height: h
  };
}
function buildApiThumbnailFromPath(photoSize, sizeAttribute) {
  const {
    w,
    h
  } = sizeAttribute;
  const dataUri = `data:image/svg+xml;utf8,${(0,_pathBytesToSvg__WEBPACK_IMPORTED_MODULE_6__.pathBytesToSvg)(photoSize.bytes, w, h)}`;
  return {
    dataUri,
    width: w,
    height: h
  };
}
function buildApiPhoto(photo, isSpoiler) {
  const sizes = photo.sizes.filter(s => {
    return s instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoSize || s instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoSizeProgressive;
  }).map(buildApiPhotoSize);
  return {
    mediaType: 'photo',
    id: String(photo.id),
    thumbnail: buildApiThumbnailFromStripped(photo.sizes),
    sizes,
    isSpoiler,
    date: photo.date,
    ...(photo.videoSizes && {
      videoSizes: (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_3__.compact)(photo.videoSizes.map(buildApiVideoSize)),
      isVideo: true
    })
  };
}
function buildApiVideoSize(videoSize) {
  if (!(videoSize instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.VideoSize)) return undefined;
  const {
    videoStartTs,
    size,
    h,
    w,
    type
  } = videoSize;
  return {
    videoStartTs,
    size,
    height: h,
    width: w,
    type: type
  };
}
function buildApiPhotoSize(photoSize) {
  const {
    w,
    h,
    type
  } = photoSize;
  return {
    width: w,
    height: h,
    type: type
  };
}
function buildApiUsernames(mtpPeer) {
  if (!mtpPeer.usernames && !('username' in mtpPeer && mtpPeer.username)) {
    return undefined;
  }
  const usernames = [];
  if ('username' in mtpPeer && mtpPeer.username) {
    usernames.push({
      username: mtpPeer.username,
      isActive: true,
      isEditable: true
    });
  }
  if (mtpPeer.usernames) {
    mtpPeer.usernames.forEach(_ref => {
      let {
        username,
        active,
        editable
      } = _ref;
      usernames.push({
        username,
        ...(active && {
          isActive: true
        }),
        ...(editable && {
          isEditable: true
        })
      });
    });
  }
  return usernames;
}
function buildPrivacyRules(rules) {
  let visibility;
  let isUnspecified;
  let allowUserIds;
  let allowChatIds;
  let blockUserIds;
  let blockChatIds;
  let shouldAllowPremium;
  const localChats = _localDb__WEBPACK_IMPORTED_MODULE_4__["default"].chats;
  rules.forEach(rule => {
    if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueAllowAll) {
      visibility || (visibility = 'everybody');
    } else if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueAllowContacts) {
      visibility || (visibility = 'contacts');
    } else if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueAllowCloseFriends) {
      visibility || (visibility = 'closeFriends');
    } else if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueDisallowContacts) {
      visibility || (visibility = 'nonContacts');
    } else if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueDisallowAll) {
      visibility || (visibility = 'nobody');
    } else if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueAllowUsers) {
      allowUserIds = rule.users.map(chatId => (0,_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(chatId, 'user'));
    } else if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueDisallowUsers) {
      blockUserIds = rule.users.map(chatId => (0,_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(chatId, 'user'));
    } else if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueAllowChatParticipants) {
      // Server allows channel ids here, so we need to check
      allowChatIds = rule.chats.map(chatId => {
        const dialogId = (0,_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(chatId, 'chat');
        const channelId = (0,_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(chatId, 'channel');
        if (localChats[dialogId]) return dialogId;
        return channelId;
      });
    } else if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueDisallowChatParticipants) {
      blockChatIds = rule.chats.map(chatId => {
        const dialogId = (0,_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(chatId, 'chat');
        const channelId = (0,_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(chatId, 'channel');
        if (localChats[dialogId]) return dialogId;
        return channelId;
      });
    } else if (rule instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PrivacyValueAllowPremium) {
      shouldAllowPremium = true;
    }
  });
  if (!visibility) {
    // Disallow by default
    visibility = 'nobody';
    isUnspecified = true;
  }
  return {
    visibility,
    isUnspecified,
    allowUserIds: allowUserIds || [],
    allowChatIds: allowChatIds || [],
    blockUserIds: blockUserIds || [],
    blockChatIds: blockChatIds || [],
    shouldAllowPremium
  };
}
function buildApiFormattedText(textWithEntities) {
  const {
    text,
    entities
  } = textWithEntities;
  return {
    text,
    entities: entities.map(buildApiMessageEntity)
  };
}
function buildApiMessageEntity(entity) {
  const {
    className: type,
    offset,
    length
  } = entity;
  if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageEntityMentionName) {
    return {
      type: _types__WEBPACK_IMPORTED_MODULE_2__.ApiMessageEntityTypes.MentionName,
      offset,
      length,
      userId: (0,_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(entity.userId, 'user')
    };
  }
  if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageEntityTextUrl) {
    return {
      type: _types__WEBPACK_IMPORTED_MODULE_2__.ApiMessageEntityTypes.TextUrl,
      offset,
      length,
      url: entity.url
    };
  }
  if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageEntityPre) {
    return {
      type: _types__WEBPACK_IMPORTED_MODULE_2__.ApiMessageEntityTypes.Pre,
      offset,
      length,
      language: entity.language
    };
  }
  if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageEntityCustomEmoji) {
    return {
      type: _types__WEBPACK_IMPORTED_MODULE_2__.ApiMessageEntityTypes.CustomEmoji,
      offset,
      length,
      documentId: entity.documentId.toString()
    };
  }
  if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageEntityBlockquote) {
    return {
      type: _types__WEBPACK_IMPORTED_MODULE_2__.ApiMessageEntityTypes.Blockquote,
      canCollapse: entity.collapsed,
      offset,
      length
    };
  }
  return {
    type: type,
    offset,
    length
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/helpers.ts":
/*!***********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/helpers.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bytesToDataUri: () => (/* binding */ bytesToDataUri),
/* harmony export */   omitVirtualClassFields: () => (/* binding */ omitVirtualClassFields)
/* harmony export */ });
function bytesToDataUri(bytes) {
  let shouldOmitPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let mimeType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image/jpeg';
  const prefix = shouldOmitPrefix ? '' : `data:${mimeType};base64,`;
  return `${prefix}${btoa(String.fromCharCode(...bytes))}`;
}
function omitVirtualClassFields(instance) {
  const {
    flags,
    CONSTRUCTOR_ID,
    SUBCLASS_OF_ID,
    className,
    classType,
    getBytes,
    ...rest
  } = instance;
  return rest;
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/messageContent.ts":
/*!******************************************************!*\
  !*** ./src/api/gramjs/apiBuilders/messageContent.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiDocument: () => (/* binding */ buildApiDocument),
/* harmony export */   buildApiMessageExtendedMediaPreview: () => (/* binding */ buildApiMessageExtendedMediaPreview),
/* harmony export */   buildApiWebDocument: () => (/* binding */ buildApiWebDocument),
/* harmony export */   buildAudioFromDocument: () => (/* binding */ buildAudioFromDocument),
/* harmony export */   buildBoughtMediaContent: () => (/* binding */ buildBoughtMediaContent),
/* harmony export */   buildGeoPoint: () => (/* binding */ buildGeoPoint),
/* harmony export */   buildInvoice: () => (/* binding */ buildInvoice),
/* harmony export */   buildMessageContent: () => (/* binding */ buildMessageContent),
/* harmony export */   buildMessageMediaContent: () => (/* binding */ buildMessageMediaContent),
/* harmony export */   buildMessageStoryData: () => (/* binding */ buildMessageStoryData),
/* harmony export */   buildMessageTextContent: () => (/* binding */ buildMessageTextContent),
/* harmony export */   buildPoll: () => (/* binding */ buildPoll),
/* harmony export */   buildPollResults: () => (/* binding */ buildPollResults),
/* harmony export */   buildVideoFromDocument: () => (/* binding */ buildVideoFromDocument),
/* harmony export */   buildWebPage: () => (/* binding */ buildWebPage)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _symbols__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./symbols */ "./src/api/gramjs/apiBuilders/symbols.ts");







function buildMessageContent(mtpMessage) {
  let content = {};
  if (mtpMessage.media) {
    content = {
      ...buildMessageMediaContent(mtpMessage.media)
    };
  }
  const hasUnsupportedMedia = mtpMessage.media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaUnsupported;
  if (mtpMessage.message && !hasUnsupportedMedia && !content.sticker && !content.poll && !content.contact && !content.video?.isRound) {
    content = {
      ...content,
      text: buildMessageTextContent(mtpMessage.message, mtpMessage.entities)
    };
  }
  return content;
}
function buildMessageTextContent(message, entities) {
  return {
    text: message,
    ...(entities && {
      entities: entities.map(_common__WEBPACK_IMPORTED_MODULE_4__.buildApiMessageEntity)
    })
  };
}
function buildMessageMediaContent(media) {
  (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.addMediaToLocalDb)(media);
  const ttlSeconds = 'ttlSeconds' in media ? media.ttlSeconds : undefined;
  const isExpiredVoice = isExpiredVoiceMessage(media);
  if (isExpiredVoice) {
    return {
      isExpiredVoice
    };
  }
  const isExpiredRoundVideo = isExpiredRoundVideoMessage(media);
  if (isExpiredRoundVideo) {
    return {
      isExpiredRoundVideo
    };
  }
  const voice = buildVoice(media);
  if (voice) return {
    voice,
    ttlSeconds
  };
  if ('round' in media && media.round) {
    const video = buildVideo(media);
    if (video) return {
      video,
      ttlSeconds
    };
  }

  // Other disappearing media types are not supported
  if (ttlSeconds !== undefined) {
    return undefined;
  }
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaInvoice && media.extendedMedia instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMedia) {
    return buildMessageMediaContent(media.extendedMedia.media);
  }
  const sticker = buildSticker(media);
  if (sticker) return {
    sticker
  };
  const photo = buildPhoto(media);
  if (photo) return {
    photo
  };
  const video = buildVideo(media);
  const altVideo = buildAltVideo(media);
  if (video) return {
    video,
    altVideo
  };
  const audio = buildAudio(media);
  if (audio) return {
    audio
  };
  const document = buildDocumentFromMedia(media);
  if (document) return {
    document
  };
  const contact = buildContact(media);
  if (contact) return {
    contact
  };
  const poll = buildPollFromMedia(media);
  if (poll) return {
    poll
  };
  const webPage = buildWebPage(media);
  if (webPage) return {
    webPage
  };
  const invoice = buildInvoiceFromMedia(media);
  if (invoice) return {
    invoice
  };
  const location = buildLocationFromMedia(media);
  if (location) return {
    location
  };
  const game = buildGameFromMedia(media);
  if (game) return {
    game
  };
  const storyData = buildMessageStoryData(media);
  if (storyData) return {
    storyData
  };
  const giveaway = buildGiweawayFromMedia(media);
  if (giveaway) return {
    giveaway
  };
  const giveawayResults = buildGiweawayResultsFromMedia(media);
  if (giveawayResults) return {
    giveawayResults
  };
  const paidMedia = buildPaidMedia(media);
  if (paidMedia) return {
    paidMedia
  };
  return undefined;
}
function buildSticker(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument) || !media.document || !(media.document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document)) {
    return undefined;
  }
  return (0,_symbols__WEBPACK_IMPORTED_MODULE_6__.buildStickerFromDocument)(media.document, media.nopremium);
}
function buildPhoto(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaPhoto) || !media.photo || !(media.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo)) {
    return undefined;
  }
  return (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiPhoto)(media.photo, media.spoiler);
}
function buildVideoFromDocument(document, isSpoiler) {
  if (document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentEmpty) {
    return undefined;
  }
  const {
    id,
    mimeType,
    thumbs,
    size,
    attributes
  } = document;

  // eslint-disable-next-line no-restricted-globals
  if (mimeType === _config__WEBPACK_IMPORTED_MODULE_1__.VIDEO_WEBM_TYPE && !self.isWebmSupported) {
    return undefined;
  }
  const videoAttr = attributes.find(a => a instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeVideo);
  if (!videoAttr) {
    return undefined;
  }
  const gifAttr = attributes.find(a => a instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeAnimated);
  const {
    duration,
    w: width,
    h: height,
    supportsStreaming = false,
    roundMessage: isRound = false,
    nosound
  } = videoAttr;
  return {
    mediaType: 'video',
    id: String(id),
    mimeType,
    duration,
    fileName: getFilenameFromDocument(document, 'video'),
    width,
    height,
    supportsStreaming,
    isRound,
    isGif: Boolean(gifAttr),
    thumbnail: (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiThumbnailFromStripped)(thumbs),
    size: size.toJSNumber(),
    isSpoiler,
    ...(nosound && {
      noSound: true
    })
  };
}
function buildAudioFromDocument(document) {
  if (document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentEmpty) {
    return undefined;
  }
  const {
    id,
    mimeType,
    size,
    attributes
  } = document;
  const audioAttributes = attributes.find(a => a instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeAudio);
  if (!audioAttributes) {
    return undefined;
  }
  const {
    duration,
    title,
    performer
  } = audioAttributes;
  return {
    mediaType: 'audio',
    id: String(id),
    mimeType,
    duration,
    fileName: getFilenameFromDocument(document, 'audio'),
    title,
    performer,
    size: size.toJSNumber()
  };
}
function buildVideo(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument) || !(media.document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document) || !media.document.mimeType.startsWith('video')) {
    return undefined;
  }
  return buildVideoFromDocument(media.document, media.spoiler);
}
function buildAltVideo(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument) || !(media.altDocument instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document) || !media.altDocument.mimeType.startsWith('video')) {
    return undefined;
  }
  return buildVideoFromDocument(media.altDocument, media.spoiler);
}
function buildAudio(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument) || !media.document || !(media.document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document)) {
    return undefined;
  }
  const audioAttribute = media.document.attributes.find(attr => attr instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeAudio);
  if (!audioAttribute || audioAttribute.voice) {
    return undefined;
  }
  const thumbnailSizes = media.document.thumbs && media.document.thumbs.filter(thumb => thumb instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoSize).map(thumb => (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiPhotoSize)(thumb));
  return {
    mediaType: 'audio',
    id: String(media.document.id),
    fileName: getFilenameFromDocument(media.document, 'audio'),
    thumbnailSizes,
    size: media.document.size.toJSNumber(),
    ...(0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.pick)(media.document, ['mimeType']),
    ...(0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.pick)(audioAttribute, ['duration', 'performer', 'title'])
  };
}
function isExpiredVoiceMessage(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument)) {
    return false;
  }
  return !media.document && media.voice;
}
function isExpiredRoundVideoMessage(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument)) {
    return false;
  }
  return !media.document && media.round;
}
function buildVoice(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument) || !media.document || !(media.document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document)) {
    return undefined;
  }
  const audioAttribute = media.document.attributes.find(attr => attr instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeAudio);
  if (!audioAttribute || !audioAttribute.voice) {
    return undefined;
  }
  const {
    duration,
    waveform
  } = audioAttribute;
  return {
    mediaType: 'voice',
    id: String(media.document.id),
    size: media.document.size.toJSNumber(),
    duration,
    waveform: waveform ? Array.from(waveform) : undefined
  };
}
function buildDocumentFromMedia(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument) || !media.document) {
    return undefined;
  }
  return buildApiDocument(media.document);
}
function buildApiDocument(document) {
  if (!(document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document)) {
    return undefined;
  }
  const {
    id,
    size,
    mimeType,
    date,
    thumbs,
    attributes
  } = document;
  const photoSize = thumbs && thumbs.find(s => s instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoSize);
  let thumbnail = thumbs && (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiThumbnailFromStripped)(thumbs);
  if (!thumbnail && thumbs && photoSize) {
    const photoPath = thumbs.find(s => s instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoPathSize);
    if (photoPath) {
      thumbnail = (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiThumbnailFromPath)(photoPath, photoSize);
    }
  }
  let innerMediaType;
  let mediaSize;
  if (photoSize) {
    mediaSize = {
      width: photoSize.w,
      height: photoSize.h
    };
    if (_config__WEBPACK_IMPORTED_MODULE_1__.SUPPORTED_IMAGE_CONTENT_TYPES.has(mimeType)) {
      innerMediaType = 'photo';
      const imageAttribute = attributes.find(a => a instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeImageSize);
      if (imageAttribute) {
        const {
          w: width,
          h: height
        } = imageAttribute;
        mediaSize = {
          width,
          height
        };
      }
    } else if (_config__WEBPACK_IMPORTED_MODULE_1__.SUPPORTED_VIDEO_CONTENT_TYPES.has(mimeType)) {
      innerMediaType = 'video';
      const videoAttribute = attributes.find(a => a instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeVideo);
      if (videoAttribute) {
        const {
          w: width,
          h: height
        } = videoAttribute;
        mediaSize = {
          width,
          height
        };
      }
    }
  }
  return {
    mediaType: 'document',
    id: String(id),
    size: size.toJSNumber(),
    mimeType,
    timestamp: date,
    fileName: getFilenameFromDocument(document),
    thumbnail,
    innerMediaType,
    mediaSize
  };
}
function buildContact(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaContact)) {
    return undefined;
  }
  const {
    firstName,
    lastName,
    phoneNumber,
    userId
  } = media;
  return {
    mediaType: 'contact',
    firstName,
    lastName,
    phoneNumber,
    userId: (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(userId, 'user')
  };
}
function buildPollFromMedia(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaPoll)) {
    return undefined;
  }
  return buildPoll(media.poll, media.results);
}
function buildInvoiceFromMedia(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaInvoice)) {
    return undefined;
  }
  return buildInvoice(media);
}
function buildLocationFromMedia(media) {
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaGeo) {
    return buildGeo(media);
  }
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaVenue) {
    return buildVenue(media);
  }
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaGeoLive) {
    return buildGeoLive(media);
  }
  return undefined;
}
function buildGeo(media) {
  const point = buildGeoPoint(media.geo);
  return point && {
    mediaType: 'geo',
    geo: point
  };
}
function buildVenue(media) {
  const {
    geo,
    title,
    provider,
    address,
    venueId,
    venueType
  } = media;
  const point = buildGeoPoint(geo);
  return point && {
    mediaType: 'venue',
    geo: point,
    title,
    provider,
    address,
    venueId,
    venueType
  };
}
function buildGeoLive(media) {
  const {
    geo,
    period,
    heading
  } = media;
  const point = buildGeoPoint(geo);
  return point && {
    mediaType: 'geoLive',
    geo: point,
    period,
    heading
  };
}
function buildGeoPoint(geo) {
  if (geo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.GeoPointEmpty) return undefined;
  const {
    long,
    lat,
    accuracyRadius,
    accessHash
  } = geo;
  return {
    long,
    lat,
    accessHash: accessHash.toString(),
    accuracyRadius
  };
}
function buildGameFromMedia(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaGame)) {
    return undefined;
  }
  return buildGame(media);
}
function buildGame(media) {
  const {
    id,
    accessHash,
    shortName,
    title,
    description,
    photo: apiPhoto,
    document: apiDocument
  } = media.game;
  const photo = apiPhoto instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo ? (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiPhoto)(apiPhoto) : undefined;
  const document = apiDocument instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document ? buildApiDocument(apiDocument) : undefined;
  return {
    mediaType: 'game',
    id: id.toString(),
    accessHash: accessHash.toString(),
    shortName,
    title,
    description,
    photo,
    document
  };
}
function buildGiweawayFromMedia(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaGiveaway)) {
    return undefined;
  }
  return buildGiveaway(media);
}
function buildGiveaway(media) {
  const {
    channels,
    months,
    quantity,
    untilDate,
    countriesIso2,
    onlyNewSubscribers,
    prizeDescription
  } = media;
  const channelIds = channels.map(channel => (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(channel, 'channel'));
  return {
    mediaType: 'giveaway',
    channelIds,
    months,
    quantity,
    untilDate,
    countries: countriesIso2,
    isOnlyForNewSubscribers: onlyNewSubscribers,
    prizeDescription
  };
}
function buildGiweawayResultsFromMedia(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaGiveawayResults)) {
    return undefined;
  }
  return buildGiveawayResults(media);
}
function buildGiveawayResults(media) {
  const {
    months,
    untilDate,
    onlyNewSubscribers,
    launchMsgId,
    unclaimedCount,
    winners,
    winnersCount,
    additionalPeersCount,
    prizeDescription,
    refunded,
    channelId
  } = media;
  const winnerIds = winners.map(winner => (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(winner, 'user'));
  return {
    mediaType: 'giveawayResults',
    months,
    untilDate,
    isOnlyForNewSubscribers: onlyNewSubscribers,
    launchMessageId: launchMsgId,
    channelId: (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(channelId, 'channel'),
    unclaimedCount,
    additionalPeersCount,
    isRefunded: refunded,
    prizeDescription,
    winnerIds,
    winnersCount
  };
}
function buildMessageStoryData(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaStory)) {
    return undefined;
  }
  const peerId = (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(media.peer);
  return {
    mediaType: 'storyData',
    id: media.id,
    peerId,
    ...(media.viaMention && {
      isMention: true
    })
  };
}
function buildPoll(poll, pollResults) {
  const {
    id,
    answers: rawAnswers
  } = poll;
  const answers = rawAnswers.map(answer => ({
    text: (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiFormattedText)(answer.text),
    option: (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.serializeBytes)(answer.option)
  }));
  return {
    mediaType: 'poll',
    id: String(id),
    summary: {
      isPublic: poll.publicVoters,
      question: (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiFormattedText)(poll.question),
      ...(0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.pick)(poll, ['closed', 'multipleChoice', 'quiz', 'closePeriod', 'closeDate']),
      answers
    },
    results: buildPollResults(pollResults)
  };
}
function buildInvoice(media) {
  const {
    description: text,
    title,
    photo,
    test,
    totalAmount,
    currency,
    receiptMsgId,
    extendedMedia
  } = media;
  const preview = extendedMedia instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMediaPreview ? buildApiMessageExtendedMediaPreview(extendedMedia) : undefined;
  return {
    mediaType: 'invoice',
    title,
    text,
    photo: buildApiWebDocument(photo),
    receiptMsgId,
    amount: Number(totalAmount),
    currency,
    isTest: test,
    extendedMedia: preview
  };
}
function buildPollResults(pollResults) {
  const {
    results: rawResults,
    totalVoters,
    recentVoters,
    solution,
    solutionEntities: entities,
    min
  } = pollResults;
  const results = rawResults?.map(_ref => {
    let {
      option,
      chosen,
      correct,
      voters
    } = _ref;
    return {
      isChosen: chosen,
      isCorrect: correct,
      option: (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.serializeBytes)(option),
      votersCount: voters
    };
  });
  return {
    isMin: min,
    totalVoters,
    recentVoterIds: recentVoters?.map(peer => (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(peer)),
    results,
    solution,
    ...(entities && {
      solutionEntities: entities.map(_common__WEBPACK_IMPORTED_MODULE_4__.buildApiMessageEntity)
    })
  };
}
function buildWebPage(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaWebPage) || !(media.webpage instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.WebPage)) {
    return undefined;
  }
  const {
    id,
    photo,
    document,
    attributes
  } = media.webpage;
  let video;
  let audio;
  if (document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document && document.mimeType.startsWith('video/')) {
    video = buildVideoFromDocument(document);
  }
  if (document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document && document.mimeType.startsWith('audio/')) {
    audio = buildAudioFromDocument(document);
  }
  let story;
  let stickers;
  const attributeStory = attributes?.find(a => a instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.WebPageAttributeStory);
  if (attributeStory) {
    const peerId = (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(attributeStory.peer);
    story = {
      id: attributeStory.id,
      peerId
    };
    if (attributeStory.story instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StoryItem) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.addStoryToLocalDb)(attributeStory.story, peerId);
    }
  }
  const attributeStickers = attributes?.find(a => a instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.WebPageAttributeStickerSet);
  if (attributeStickers) {
    stickers = {
      documents: (0,_symbols__WEBPACK_IMPORTED_MODULE_6__.processStickerResult)(attributeStickers.stickers),
      isEmoji: attributeStickers.emojis,
      isWithTextColor: attributeStickers.textColor
    };
  }
  return {
    mediaType: 'webpage',
    id: Number(id),
    ...(0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.pick)(media.webpage, ['url', 'displayUrl', 'type', 'siteName', 'title', 'description', 'duration']),
    photo: photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo ? (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiPhoto)(photo) : undefined,
    document: !video && !audio && document ? buildApiDocument(document) : undefined,
    video,
    audio,
    story,
    stickers
  };
}
function buildPaidMedia(media) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaPaidMedia)) {
    return undefined;
  }
  const {
    starsAmount,
    extendedMedia
  } = media;
  const isBought = extendedMedia[0] instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMedia;
  if (isBought) {
    return {
      mediaType: 'paidMedia',
      starsAmount: starsAmount.toJSNumber(),
      isBought,
      extendedMedia: extendedMedia.filter(paidMedia => paidMedia instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMedia).map(paidMedia => buildMessageMediaContent(paidMedia.media)).filter(Boolean)
    };
  }
  return {
    mediaType: 'paidMedia',
    starsAmount: starsAmount.toJSNumber(),
    extendedMedia: extendedMedia.filter(paidMedia => paidMedia instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMediaPreview).map(paidMedia => buildApiMessageExtendedMediaPreview(paidMedia))
  };
}
function getFilenameFromDocument(document) {
  let defaultBase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'file';
  const {
    mimeType,
    attributes
  } = document;
  const filenameAttribute = attributes.find(a => a instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeFilename);
  if (filenameAttribute) {
    return filenameAttribute.fileName;
  }
  const extension = mimeType.split('/')[1];
  return `${defaultBase}${String(document.id)}.${extension}`;
}
function buildApiMessageExtendedMediaPreview(preview) {
  const {
    w,
    h,
    thumb,
    videoDuration
  } = preview;
  return {
    mediaType: 'extendedMediaPreview',
    width: w,
    height: h,
    duration: videoDuration,
    thumbnail: thumb ? (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiThumbnailFromStripped)([thumb]) : undefined
  };
}
function buildApiWebDocument(document) {
  if (!document) return undefined;
  const {
    url,
    size,
    mimeType
  } = document;
  const accessHash = document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.WebDocument ? document.accessHash.toString() : undefined;
  const sizeAttr = document.attributes.find(attr => attr instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeImageSize);
  const dimensions = sizeAttr && {
    width: sizeAttr.w,
    height: sizeAttr.h
  };
  return {
    mediaType: 'webDocument',
    url,
    accessHash,
    size,
    mimeType,
    dimensions
  };
}
function buildBoughtMediaContent(media) {
  const boughtMedia = media.filter(m => m instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMedia).map(m => buildMessageMediaContent(m.media)).filter(Boolean);
  if (!boughtMedia.length) {
    return undefined;
  }
  return boughtMedia;
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/messages.ts":
/*!************************************************!*\
  !*** ./src/api/gramjs/apiBuilders/messages.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiFactCheck: () => (/* binding */ buildApiFactCheck),
/* harmony export */   buildApiMessage: () => (/* binding */ buildApiMessage),
/* harmony export */   buildApiMessageFromNotification: () => (/* binding */ buildApiMessageFromNotification),
/* harmony export */   buildApiMessageFromShort: () => (/* binding */ buildApiMessageFromShort),
/* harmony export */   buildApiMessageFromShortChat: () => (/* binding */ buildApiMessageFromShortChat),
/* harmony export */   buildApiMessageWithChatId: () => (/* binding */ buildApiMessageWithChatId),
/* harmony export */   buildApiQuickReply: () => (/* binding */ buildApiQuickReply),
/* harmony export */   buildApiSponsoredMessage: () => (/* binding */ buildApiSponsoredMessage),
/* harmony export */   buildApiThreadInfo: () => (/* binding */ buildApiThreadInfo),
/* harmony export */   buildApiThreadInfoFromMessage: () => (/* binding */ buildApiThreadInfoFromMessage),
/* harmony export */   buildLocalForwardedMessage: () => (/* binding */ buildLocalForwardedMessage),
/* harmony export */   buildLocalMessage: () => (/* binding */ buildLocalMessage),
/* harmony export */   buildMessageDraft: () => (/* binding */ buildMessageDraft),
/* harmony export */   buildUploadingMedia: () => (/* binding */ buildUploadingMedia),
/* harmony export */   setMessageBuilderCurrentUserId: () => (/* binding */ setMessageBuilderCurrentUserId)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types */ "./src/api/types/index.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _global_helpers_getEmojiOnlyCountForMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../global/helpers/getEmojiOnlyCountForMessage */ "./src/global/helpers/getEmojiOnlyCountForMessage.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _util_serverTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../util/serverTime */ "./src/util/serverTime.ts");
/* harmony import */ var _util_waveform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../util/waveform */ "./src/util/waveform.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _calls__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./calls */ "./src/api/gramjs/apiBuilders/calls.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _messageContent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _reactions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./reactions */ "./src/api/gramjs/apiBuilders/reactions.ts");














const LOCAL_MESSAGES_LIMIT = 1e6; // 1M

const LOCAL_MEDIA_UPLOADING_TEMP_ID = 'temp';
const INPUT_WAVEFORM_LENGTH = 63;
const MIN_SCHEDULED_PERIOD = 10;
let localMessageCounter = 0;
function getNextLocalMessageId() {
  let lastMessageId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return lastMessageId + ++localMessageCounter / LOCAL_MESSAGES_LIMIT;
}
let currentUserId;
function setMessageBuilderCurrentUserId(_currentUserId) {
  currentUserId = _currentUserId;
}
function buildApiSponsoredMessage(mtpMessage) {
  const {
    message,
    entities,
    randomId,
    recommended,
    sponsorInfo,
    additionalInfo,
    buttonText,
    canReport,
    title,
    url,
    color
  } = mtpMessage;
  let photo;
  if (mtpMessage.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addPhotoToLocalDb)(mtpMessage.photo);
    photo = (0,_common__WEBPACK_IMPORTED_MODULE_10__.buildApiPhoto)(mtpMessage.photo);
  }
  return {
    randomId: (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.serializeBytes)(randomId),
    text: (0,_messageContent__WEBPACK_IMPORTED_MODULE_11__.buildMessageTextContent)(message, entities),
    expiresAt: Math.round(Date.now() / 1000) + _config__WEBPACK_IMPORTED_MODULE_2__.SPONSORED_MESSAGE_CACHE_MS,
    isRecommended: recommended,
    sponsorInfo,
    additionalInfo,
    buttonText,
    canReport,
    title,
    url,
    peerColor: color && (0,_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerColor)(color),
    photo
  };
}
function buildApiMessage(mtpMessage) {
  const chatId = (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.resolveMessageApiChatId)(mtpMessage);
  if (!chatId || !(mtpMessage instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Message || mtpMessage instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageService)) {
    return undefined;
  }
  return buildApiMessageWithChatId(chatId, mtpMessage);
}
function buildApiMessageFromShort(mtpMessage) {
  const chatId = (0,_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(mtpMessage.userId, 'user');
  return buildApiMessageWithChatId(chatId, {
    ...mtpMessage,
    fromId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildPeer)(mtpMessage.out ? currentUserId : (0,_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(mtpMessage.userId, 'user'))
  });
}
function buildApiMessageFromShortChat(mtpMessage) {
  const chatId = (0,_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(mtpMessage.chatId, 'chat');
  return buildApiMessageWithChatId(chatId, {
    ...mtpMessage,
    fromId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildPeer)((0,_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(mtpMessage.fromId, 'user'))
  });
}
function buildApiMessageFromNotification(notification, currentDate) {
  const localId = getNextLocalMessageId(currentDate);
  const content = (0,_messageContent__WEBPACK_IMPORTED_MODULE_11__.buildMessageContent)(notification);
  return {
    id: localId,
    chatId: _config__WEBPACK_IMPORTED_MODULE_2__.SERVICE_NOTIFICATIONS_USER_ID,
    date: notification.inboxDate || currentDate,
    content,
    isOutgoing: false
  };
}
function buildApiMessageWithChatId(chatId, mtpMessage) {
  const fromId = mtpMessage.fromId ? (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(mtpMessage.fromId) : undefined;
  const peerId = mtpMessage.peerId ? (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(mtpMessage.peerId) : undefined;
  const isChatWithSelf = !fromId && chatId === currentUserId;
  const isOutgoing = mtpMessage.out && !mtpMessage.post || isChatWithSelf && !mtpMessage.fwdFrom;
  const content = (0,_messageContent__WEBPACK_IMPORTED_MODULE_11__.buildMessageContent)(mtpMessage);
  const action = mtpMessage.action && buildAction(mtpMessage.action, fromId, peerId, Boolean(mtpMessage.post), isOutgoing);
  if (action) {
    content.action = action;
  }
  const isScheduled = mtpMessage.date > (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_5__.getServerTime)() + MIN_SCHEDULED_PERIOD;
  const isInvoiceMedia = mtpMessage.media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaInvoice && Boolean(mtpMessage.media.extendedMedia);
  const isEdited = Boolean(mtpMessage.editDate) && !mtpMessage.editHide;
  const {
    inlineButtons,
    keyboardButtons,
    keyboardPlaceholder,
    isKeyboardSingleUse,
    isKeyboardSelective
  } = buildReplyButtons(mtpMessage, isInvoiceMedia) || {};
  const forwardInfo = mtpMessage.fwdFrom && buildApiMessageForwardInfo(mtpMessage.fwdFrom, isChatWithSelf);
  const {
    mediaUnread: isMediaUnread,
    postAuthor
  } = mtpMessage;
  const groupedId = mtpMessage.groupedId && String(mtpMessage.groupedId);
  const isInAlbum = Boolean(groupedId) && !(content.document || content.audio || content.sticker);
  const shouldHideKeyboardButtons = mtpMessage.replyMarkup instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReplyKeyboardHide;
  const isHideKeyboardSelective = mtpMessage.replyMarkup instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReplyKeyboardHide && mtpMessage.replyMarkup.selective;
  const isProtected = mtpMessage.noforwards || isInvoiceMedia;
  const isForwardingAllowed = !mtpMessage.noforwards;
  const emojiOnlyCount = (0,_global_helpers_getEmojiOnlyCountForMessage__WEBPACK_IMPORTED_MODULE_3__.getEmojiOnlyCountForMessage)(content, groupedId);
  const hasComments = mtpMessage.replies?.comments;
  const senderBoosts = mtpMessage.fromBoostsApplied;
  const factCheck = mtpMessage.factcheck && buildApiFactCheck(mtpMessage.factcheck);
  const isInvertedMedia = mtpMessage.invertMedia;
  const savedPeerId = mtpMessage.savedPeerId && (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(mtpMessage.savedPeerId);
  return (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_4__.omitUndefined)({
    id: mtpMessage.id,
    chatId,
    isOutgoing,
    content,
    date: mtpMessage.date,
    senderId: fromId || mtpMessage.out && mtpMessage.post && currentUserId || chatId,
    viewsCount: mtpMessage.views,
    forwardsCount: mtpMessage.forwards,
    isScheduled,
    isFromScheduled: mtpMessage.fromScheduled,
    isSilent: mtpMessage.silent,
    isPinned: mtpMessage.pinned,
    reactions: mtpMessage.reactions && (0,_reactions__WEBPACK_IMPORTED_MODULE_13__.buildMessageReactions)(mtpMessage.reactions),
    emojiOnlyCount,
    ...(mtpMessage.replyTo && {
      replyInfo: buildApiReplyInfo(mtpMessage.replyTo)
    }),
    forwardInfo,
    isEdited,
    editDate: mtpMessage.editDate,
    isMediaUnread,
    hasUnreadMention: mtpMessage.mentioned && isMediaUnread,
    isMentioned: mtpMessage.mentioned,
    ...(groupedId && {
      groupedId,
      isInAlbum
    }),
    inlineButtons,
    ...(keyboardButtons && {
      keyboardButtons,
      keyboardPlaceholder,
      isKeyboardSingleUse,
      isKeyboardSelective
    }),
    ...(shouldHideKeyboardButtons && {
      shouldHideKeyboardButtons,
      isHideKeyboardSelective
    }),
    ...(mtpMessage.viaBotId && {
      viaBotId: (0,_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(mtpMessage.viaBotId, 'user')
    }),
    postAuthorTitle: postAuthor,
    isProtected,
    isForwardingAllowed,
    hasComments,
    savedPeerId,
    senderBoosts,
    viaBusinessBotId: mtpMessage.viaBusinessBotId?.toString(),
    factCheck,
    effectId: mtpMessage.effect?.toString(),
    isInvertedMedia
  });
}
function buildMessageDraft(draft) {
  if (draft instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DraftMessageEmpty) {
    return undefined;
  }
  const {
    message,
    entities,
    replyTo,
    date,
    effect
  } = draft;
  const replyInfo = replyTo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputReplyToMessage ? {
    type: 'message',
    replyToMsgId: replyTo.replyToMsgId,
    replyToTopId: replyTo.topMsgId,
    replyToPeerId: replyTo.replyToPeerId && (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(replyTo.replyToPeerId),
    quoteText: replyTo.quoteText ? (0,_messageContent__WEBPACK_IMPORTED_MODULE_11__.buildMessageTextContent)(replyTo.quoteText, replyTo.quoteEntities) : undefined
  } : undefined;
  return {
    text: message ? (0,_messageContent__WEBPACK_IMPORTED_MODULE_11__.buildMessageTextContent)(message, entities) : undefined,
    replyInfo,
    date,
    effectId: effect?.toString()
  };
}
function buildApiMessageForwardInfo(fwdFrom) {
  let isChatWithSelf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const savedFromPeerId = fwdFrom.savedFromPeer && (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(fwdFrom.savedFromPeer);
  const fromId = fwdFrom.fromId && (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(fwdFrom.fromId);
  return {
    date: fwdFrom.date,
    savedDate: fwdFrom.savedDate,
    isImported: fwdFrom.imported,
    isChannelPost: Boolean(fwdFrom.channelPost),
    channelPostId: fwdFrom.channelPost,
    isLinkedChannelPost: Boolean(fwdFrom.channelPost && savedFromPeerId && !isChatWithSelf),
    savedFromPeerId,
    fromId,
    fromChatId: fromId || savedFromPeerId,
    fromMessageId: fwdFrom.savedFromMsgId || fwdFrom.channelPost,
    hiddenUserName: fwdFrom.fromName,
    postAuthorTitle: fwdFrom.postAuthor
  };
}
function buildApiReplyInfo(replyHeader) {
  if (replyHeader instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageReplyStoryHeader) {
    return {
      type: 'story',
      peerId: (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(replyHeader.peer),
      storyId: replyHeader.storyId
    };
  }
  if (replyHeader instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageReplyHeader) {
    const {
      replyFrom,
      replyToMsgId,
      replyToTopId,
      replyMedia,
      replyToPeerId,
      forumTopic,
      quote,
      quoteText,
      quoteEntities
    } = replyHeader;
    return {
      type: 'message',
      replyToMsgId,
      replyToTopId,
      isForumTopic: forumTopic,
      replyFrom: replyFrom && buildApiMessageForwardInfo(replyFrom),
      replyToPeerId: replyToPeerId && (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(replyToPeerId),
      replyMedia: replyMedia && (0,_messageContent__WEBPACK_IMPORTED_MODULE_11__.buildMessageMediaContent)(replyMedia),
      isQuote: quote,
      quoteText: quoteText ? (0,_messageContent__WEBPACK_IMPORTED_MODULE_11__.buildMessageTextContent)(quoteText, quoteEntities) : undefined
    };
  }
  return undefined;
}
function buildApiFactCheck(factCheck) {
  return {
    shouldFetch: factCheck.needCheck,
    hash: factCheck.hash.toString(),
    text: factCheck.text && (0,_common__WEBPACK_IMPORTED_MODULE_10__.buildApiFormattedText)(factCheck.text),
    countryCode: factCheck.country
  };
}
function buildAction(action, senderId, targetPeerId, isChannelPost, isOutgoing) {
  if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionEmpty) {
    return undefined;
  }
  let phoneCall;
  let call;
  let amount;
  let currency;
  let giftCryptoInfo;
  let text;
  const translationValues = [];
  let type = 'other';
  let photo;
  let score;
  let months;
  let topicEmojiIconId;
  let isTopicAction;
  let slug;
  let isGiveaway;
  let isUnclaimed;
  let pluralValue;
  const targetUserIds = 'users' in action ? action.users && action.users.map(id => (0,_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(id, 'user')) : 'userId' in action && [(0,_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(action.userId, 'user')] || [];
  let targetChatId;
  if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatCreate) {
    text = 'Notification.CreatedChatWithTitle';
    translationValues.push('%action_origin%', action.title);
    type = 'chatCreate';
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatEditTitle) {
    if (isChannelPost) {
      text = 'Channel.MessageTitleUpdated';
      translationValues.push(action.title);
    } else {
      text = 'Notification.ChangedGroupName';
      translationValues.push('%action_origin%', action.title);
    }
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatEditPhoto) {
    if (isChannelPost) {
      text = 'Channel.MessagePhotoUpdated';
    } else {
      text = 'Notification.ChangedGroupPhoto';
      translationValues.push('%action_origin%');
    }
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatDeletePhoto) {
    if (isChannelPost) {
      text = 'Channel.MessagePhotoRemoved';
    } else {
      text = 'Group.MessagePhotoRemoved';
    }
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatAddUser) {
    if (!senderId || targetUserIds.includes(senderId)) {
      text = 'Notification.JoinedChat';
      translationValues.push('%target_user%');
    } else {
      text = 'Notification.Invited';
      translationValues.push('%action_origin%', '%target_user%');
    }
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatDeleteUser) {
    if (!senderId || targetUserIds.includes(senderId)) {
      text = 'Notification.LeftChat';
      translationValues.push('%target_user%');
    } else {
      text = 'Notification.Kicked';
      translationValues.push('%action_origin%', '%target_user%');
    }
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatJoinedByLink) {
    text = 'Notification.JoinedGroupByLink';
    translationValues.push('%action_origin%');
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChannelCreate) {
    text = 'Notification.CreatedChannel';
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatMigrateTo) {
    targetChatId = (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(action);
    text = 'Migrated to %target_chat%';
    translationValues.push('%target_chat%');
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChannelMigrateFrom) {
    targetChatId = (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(action);
    text = 'Migrated from %target_chat%';
    translationValues.push('%target_chat%');
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionPinMessage) {
    text = 'Chat.Service.Group.UpdatedPinnedMessage1';
    translationValues.push('%action_origin%', '%message%');
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionHistoryClear) {
    text = 'HistoryCleared';
    type = 'historyClear';
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionPhoneCall) {
    const withDuration = Boolean(action.duration);
    text = [withDuration ? 'ChatList.Service' : 'Chat', action.video ? 'VideoCall' : 'Call', isOutgoing ? withDuration ? 'outgoing' : 'Outgoing' : withDuration ? 'incoming' : 'Incoming'].join('.');
    if (withDuration) {
      const mins = Math.max(Math.round(action.duration / 60), 1);
      translationValues.push(`${mins} min${mins > 1 ? 's' : ''}`);
    }
    phoneCall = {
      isOutgoing,
      isVideo: action.video,
      duration: action.duration,
      reason: (0,_calls__WEBPACK_IMPORTED_MODULE_9__.buildApiCallDiscardReason)(action.reason)
    };
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionInviteToGroupCall) {
    text = 'Notification.VoiceChatInvitation';
    call = {
      id: action.call.id.toString(),
      accessHash: action.call.accessHash.toString()
    };
    translationValues.push('%action_origin%', '%target_user%');
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionContactSignUp) {
    text = 'Notification.Joined';
    translationValues.push('%action_origin%');
    type = 'contactSignUp';
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionPaymentSent) {
    amount = Number(action.totalAmount);
    currency = action.currency;
    text = 'PaymentSuccessfullyPaid';
    type = 'receipt';
    if (targetPeerId) {
      targetUserIds.push(targetPeerId);
    }
    translationValues.push('%payment_amount%', '%target_user%', '%product%');
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionGroupCall) {
    if (action.duration) {
      const mins = Math.max(Math.round(action.duration / 60), 1);
      text = 'Notification.VoiceChatEnded';
      translationValues.push(`${mins} min${mins > 1 ? 's' : ''}`);
    } else {
      text = 'Notification.VoiceChatStartedChannel';
      call = {
        id: action.call.id.toString(),
        accessHash: action.call.accessHash.toString()
      };
    }
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionBotAllowed) {
    if (action.domain) {
      text = 'ActionBotAllowed';
      translationValues.push(action.domain);
    } else if (action.fromRequest) {
      text = 'lng_action_webapp_bot_allowed';
    } else {
      text = 'ActionAttachMenuBotAllowed';
    }
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionCustomAction) {
    text = action.message;
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatJoinedByRequest) {
    text = 'ChatService.UserJoinedGroupByRequest';
    translationValues.push('%action_origin%');
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionGameScore) {
    text = senderId === currentUserId ? 'ActionYouScoredInGame' : 'ActionUserScoredInGame';
    translationValues.push('%score%');
    score = action.score;
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionWebViewDataSent) {
    text = 'Notification.WebAppSentData';
    translationValues.push(action.text);
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionGiftPremium) {
    text = isOutgoing ? 'ActionGiftOutbound' : 'ActionGiftInbound';
    if (isOutgoing) {
      translationValues.push('%gift_payment_amount%');
    } else {
      translationValues.push('%action_origin%', '%gift_payment_amount%');
    }
    if (targetPeerId) {
      targetUserIds.push(targetPeerId);
    }
    currency = action.currency;
    if (action.cryptoCurrency) {
      giftCryptoInfo = {
        currency: action.cryptoCurrency,
        amount: action.cryptoAmount.toJSNumber()
      };
    }
    amount = action.amount.toJSNumber();
    months = action.months;
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionTopicCreate) {
    text = 'TopicWasCreatedAction';
    type = 'topicCreate';
    translationValues.push(action.title);
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionTopicEdit) {
    if (action.closed !== undefined) {
      text = action.closed ? 'TopicWasClosedAction' : 'TopicWasReopenedAction';
      translationValues.push('%action_origin%', '%action_topic%');
    } else if (action.hidden !== undefined) {
      text = action.hidden ? 'TopicHidden2' : 'TopicShown';
    } else if (action.title) {
      text = 'TopicRenamedTo';
      translationValues.push('%action_origin%', action.title);
    } else if (action.iconEmojiId) {
      text = 'TopicWasIconChangedToAction';
      translationValues.push('%action_origin%', '%action_topic_icon%');
      topicEmojiIconId = action.iconEmojiId.toString();
    } else {
      text = 'ChatList.UnsupportedMessage';
    }
    isTopicAction = true;
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionSuggestProfilePhoto) {
    const isVideo = action.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo && action.photo.videoSizes?.length;
    text = senderId === currentUserId ? isVideo ? 'ActionSuggestVideoFromYouDescription' : 'ActionSuggestPhotoFromYouDescription' : isVideo ? 'ActionSuggestVideoToYouDescription' : 'ActionSuggestPhotoToYouDescription';
    type = 'suggestProfilePhoto';
    translationValues.push('%target_user%');
    if (targetPeerId) targetUserIds.push(targetPeerId);
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionGiveawayLaunch) {
    text = 'BoostingGiveawayJustStarted';
    translationValues.push('%action_origin%');
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionGiftCode) {
    text = isOutgoing ? 'ActionGiftOutbound' : 'BoostingReceivedGiftNoName';
    slug = action.slug;
    months = action.months;
    amount = action.amount?.toJSNumber();
    isGiveaway = Boolean(action.viaGiveaway);
    isUnclaimed = Boolean(action.unclaimed);
    if (isOutgoing) {
      translationValues.push('%gift_payment_amount%');
    }
    currency = action.currency;
    if (action.cryptoCurrency) {
      giftCryptoInfo = {
        currency: action.cryptoCurrency,
        amount: action.cryptoAmount.toJSNumber()
      };
    }
    if (action.boostPeer) {
      targetChatId = (0,_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(action.boostPeer);
    }
    if (targetPeerId) {
      targetUserIds.push(targetPeerId);
    }
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionGiveawayResults) {
    if (!action.winnersCount) {
      text = 'lng_action_giveaway_results_none';
    } else if (action.unclaimedCount) {
      text = 'lng_action_giveaway_results_some';
    } else {
      text = 'BoostingGiveawayServiceWinnersSelected';
      translationValues.push('%amount%');
      amount = action.winnersCount;
      pluralValue = action.winnersCount;
    }
  } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionBoostApply) {
    type = 'chatBoost';
    if (action.boosts === 1) {
      text = senderId === currentUserId ? 'BoostingBoostsGroupByYouServiceMsg' : 'BoostingBoostsGroupByUserServiceMsg';
      translationValues.push('%action_origin%');
    } else {
      text = senderId === currentUserId ? 'BoostingBoostsGroupByYouServiceMsgCount' : 'BoostingBoostsGroupByUserServiceMsgCount';
      translationValues.push(action.boosts.toString());
      if (senderId !== currentUserId) {
        translationValues.unshift('%action_origin%');
      }
      pluralValue = action.boosts;
    }
  } else {
    text = 'ChatList.UnsupportedMessage';
  }
  if ('photo' in action && action.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addPhotoToLocalDb)(action.photo);
    photo = (0,_common__WEBPACK_IMPORTED_MODULE_10__.buildApiPhoto)(action.photo);
  }
  return {
    mediaType: 'action',
    text,
    type,
    targetUserIds,
    targetChatId,
    photo,
    // TODO Only used internally now, will be used for the UI in future
    amount,
    currency,
    giftCryptoInfo,
    isGiveaway,
    slug,
    translationValues,
    call,
    phoneCall,
    score,
    months,
    topicEmojiIconId,
    isTopicAction,
    isUnclaimed,
    pluralValue
  };
}
function buildReplyButtons(message, shouldSkipBuyButton) {
  const {
    replyMarkup,
    media
  } = message;
  if (!(replyMarkup instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReplyKeyboardMarkup || replyMarkup instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReplyInlineMarkup)) {
    return undefined;
  }
  const markup = replyMarkup.rows.map(_ref => {
    let {
      buttons
    } = _ref;
    return buttons.map(button => {
      const {
        text
      } = button;
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButton) {
        return {
          type: 'command',
          text
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonUrl) {
        if (button.url.includes('?startgroup=')) {
          return {
            type: 'unsupported',
            text
          };
        }
        return {
          type: 'url',
          text,
          url: button.url
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonCallback) {
        if (button.requiresPassword) {
          return {
            type: 'unsupported',
            text
          };
        }
        return {
          type: 'callback',
          text,
          data: (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.serializeBytes)(button.data)
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonRequestPoll) {
        return {
          type: 'requestPoll',
          text,
          isQuiz: button.quiz
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonRequestPhone) {
        return {
          type: 'requestPhone',
          text
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonBuy) {
        if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaInvoice && media.receiptMsgId) {
          return {
            type: 'receipt',
            receiptMessageId: media.receiptMsgId
          };
        }
        if (shouldSkipBuyButton) return undefined;
        return {
          type: 'buy',
          text
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonGame) {
        return {
          type: 'game',
          text
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonSwitchInline) {
        return {
          type: 'switchBotInline',
          text,
          query: button.query,
          isSamePeer: button.samePeer
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonUserProfile) {
        return {
          type: 'userProfile',
          text,
          userId: button.userId.toString()
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonSimpleWebView) {
        return {
          type: 'simpleWebView',
          text,
          url: button.url
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonWebView) {
        return {
          type: 'webView',
          text,
          url: button.url
        };
      }
      if (button instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.KeyboardButtonUrlAuth) {
        return {
          type: 'urlAuth',
          text,
          url: button.url,
          buttonId: button.buttonId
        };
      }
      return {
        type: 'unsupported',
        text
      };
    }).filter(Boolean);
  });
  if (markup.every(row => !row.length)) return undefined;
  return {
    [replyMarkup instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReplyKeyboardMarkup ? 'keyboardButtons' : 'inlineButtons']: markup,
    ...(replyMarkup instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReplyKeyboardMarkup && {
      keyboardPlaceholder: replyMarkup.placeholder,
      isKeyboardSingleUse: replyMarkup.singleUse,
      isKeyboardSelective: replyMarkup.selective
    })
  };
}
function buildNewPoll(poll, localId) {
  return {
    mediaType: 'poll',
    id: String(localId),
    summary: (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_4__.pick)(poll.summary, ['question', 'answers']),
    results: {}
  };
}
function buildLocalMessage(chat, lastMessageId, text, entities, replyInfo, attachment, sticker, gif, poll, contact, groupedId, scheduledAt, sendAs, story, isInvertedMedia, effectId) {
  const localId = getNextLocalMessageId(lastMessageId);
  const media = attachment && buildUploadingMedia(attachment);
  const isChannel = chat.type === 'chatTypeChannel';
  const resultReplyInfo = replyInfo && buildReplyInfo(replyInfo, chat.isForum);
  const message = {
    id: localId,
    chatId: chat.id,
    content: {
      ...(text && {
        text: {
          text,
          entities
        }
      }),
      ...media,
      ...(sticker && {
        sticker
      }),
      ...(gif && {
        video: gif
      }),
      poll: poll && buildNewPoll(poll, localId),
      contact,
      storyData: story && {
        mediaType: 'storyData',
        ...story
      }
    },
    date: scheduledAt || Math.round(Date.now() / 1000) + (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_5__.getServerTimeOffset)(),
    isOutgoing: !isChannel,
    senderId: sendAs?.id || currentUserId,
    replyInfo: resultReplyInfo,
    ...(groupedId && {
      groupedId,
      ...(media && (media.photo || media.video) && {
        isInAlbum: true
      })
    }),
    ...(scheduledAt && {
      isScheduled: true
    }),
    isForwardingAllowed: true,
    isInvertedMedia,
    effectId
  };
  const emojiOnlyCount = (0,_global_helpers_getEmojiOnlyCountForMessage__WEBPACK_IMPORTED_MODULE_3__.getEmojiOnlyCountForMessage)(message.content, message.groupedId);
  return {
    ...message,
    ...(emojiOnlyCount && {
      emojiOnlyCount
    })
  };
}
function buildLocalForwardedMessage(_ref2) {
  let {
    toChat,
    toThreadId,
    message,
    scheduledAt,
    noAuthors,
    noCaptions,
    isCurrentUserPremium,
    lastMessageId
  } = _ref2;
  const localId = getNextLocalMessageId(lastMessageId);
  const {
    content,
    chatId: fromChatId,
    id: fromMessageId,
    senderId,
    groupedId,
    isInAlbum,
    isInvertedMedia
  } = message;
  const isAudio = content.audio;
  const asIncomingInChatWithSelf = toChat.id === currentUserId && (fromChatId !== toChat.id || message.forwardInfo) && !isAudio;
  const shouldHideText = Object.keys(content).length > 1 && content.text && noCaptions;
  const shouldDropCustomEmoji = !isCurrentUserPremium;
  const strippedText = content.text?.entities && shouldDropCustomEmoji ? {
    text: content.text.text,
    entities: content.text.entities.filter(entity => entity.type !== _types__WEBPACK_IMPORTED_MODULE_1__.ApiMessageEntityTypes.CustomEmoji)
  } : content.text;
  const emojiOnlyCount = (0,_global_helpers_getEmojiOnlyCountForMessage__WEBPACK_IMPORTED_MODULE_3__.getEmojiOnlyCountForMessage)(content, groupedId);
  const updatedContent = {
    ...content,
    text: !shouldHideText ? strippedText : undefined
  };

  // TODO Prepare reply info between forwarded messages locally, to prevent height jumps
  const isToMainThread = toThreadId === _types__WEBPACK_IMPORTED_MODULE_1__.MAIN_THREAD_ID;
  const replyInfo = toThreadId && !isToMainThread ? {
    type: 'message',
    replyToMsgId: toThreadId,
    replyToTopId: toThreadId,
    isForumTopic: toChat.isForum || undefined
  } : undefined;
  return {
    id: localId,
    chatId: toChat.id,
    content: updatedContent,
    date: scheduledAt || Math.round(Date.now() / 1000) + (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_5__.getServerTimeOffset)(),
    isOutgoing: !asIncomingInChatWithSelf && toChat.type !== 'chatTypeChannel',
    senderId: currentUserId,
    sendingState: 'messageSendingStatePending',
    groupedId,
    isInAlbum,
    isForwardingAllowed: true,
    replyInfo,
    isInvertedMedia,
    ...(toThreadId && toChat?.isForum && {
      isTopicReply: true
    }),
    ...(emojiOnlyCount && {
      emojiOnlyCount
    }),
    // Forward info doesn't get added when users forwards his own messages, also when forwarding audio
    ...(message.chatId !== currentUserId && !isAudio && !noAuthors && {
      forwardInfo: {
        date: message.forwardInfo?.date || message.date,
        savedDate: message.date,
        isChannelPost: false,
        fromChatId,
        fromMessageId,
        fromId: senderId,
        savedFromPeerId: message.chatId
      }
    }),
    ...(message.chatId === currentUserId && !noAuthors && {
      forwardInfo: message.forwardInfo
    }),
    ...(scheduledAt && {
      isScheduled: true
    })
  };
}
function buildReplyInfo(inputInfo, isForum) {
  if (inputInfo.type === 'story') {
    return {
      type: 'story',
      peerId: inputInfo.peerId,
      storyId: inputInfo.storyId
    };
  }
  return {
    type: 'message',
    replyToMsgId: inputInfo.replyToMsgId,
    replyToTopId: inputInfo.replyToTopId,
    replyToPeerId: inputInfo.replyToPeerId,
    quoteText: inputInfo.quoteText,
    isForumTopic: isForum && inputInfo.replyToTopId ? true : undefined,
    ...(Boolean(inputInfo.quoteText) && {
      isQuote: true
    })
  };
}
function buildUploadingMedia(attachment) {
  const {
    filename: fileName,
    blobUrl,
    previewBlobUrl,
    mimeType,
    size,
    audio,
    shouldSendAsFile,
    shouldSendAsSpoiler,
    ttlSeconds
  } = attachment;
  if (!shouldSendAsFile) {
    if (attachment.quick) {
      // TODO Handle GIF as video, but support playback in <video>
      if (_config__WEBPACK_IMPORTED_MODULE_2__.SUPPORTED_IMAGE_CONTENT_TYPES.has(mimeType)) {
        const {
          width,
          height
        } = attachment.quick;
        return {
          photo: {
            mediaType: 'photo',
            id: LOCAL_MEDIA_UPLOADING_TEMP_ID,
            sizes: [],
            thumbnail: {
              width,
              height,
              dataUri: previewBlobUrl || blobUrl
            },
            blobUrl,
            date: Math.round(Date.now() / 1000),
            isSpoiler: shouldSendAsSpoiler
          }
        };
      }
      if (_config__WEBPACK_IMPORTED_MODULE_2__.SUPPORTED_VIDEO_CONTENT_TYPES.has(mimeType)) {
        const {
          width,
          height,
          duration
        } = attachment.quick;
        return {
          video: {
            mediaType: 'video',
            id: LOCAL_MEDIA_UPLOADING_TEMP_ID,
            mimeType,
            duration: duration || 0,
            fileName,
            width,
            height,
            blobUrl,
            ...(previewBlobUrl && {
              thumbnail: {
                width,
                height,
                dataUri: previewBlobUrl
              }
            }),
            size,
            isSpoiler: shouldSendAsSpoiler
          }
        };
      }
    }
    if (attachment.voice) {
      const {
        duration,
        waveform
      } = attachment.voice;
      const {
        data: inputWaveform
      } = (0,_util_waveform__WEBPACK_IMPORTED_MODULE_6__.interpolateArray)(waveform, INPUT_WAVEFORM_LENGTH);
      return {
        voice: {
          mediaType: 'voice',
          id: LOCAL_MEDIA_UPLOADING_TEMP_ID,
          duration,
          waveform: inputWaveform,
          size
        },
        ttlSeconds
      };
    }
    if (_config__WEBPACK_IMPORTED_MODULE_2__.SUPPORTED_AUDIO_CONTENT_TYPES.has(mimeType)) {
      const {
        duration,
        performer,
        title
      } = audio || {};
      return {
        audio: {
          mediaType: 'audio',
          id: LOCAL_MEDIA_UPLOADING_TEMP_ID,
          mimeType,
          fileName,
          size,
          duration: duration || 0,
          title,
          performer
        }
      };
    }
  }
  return {
    document: {
      mediaType: 'document',
      mimeType,
      fileName,
      size,
      ...(previewBlobUrl && {
        previewBlobUrl
      })
    }
  };
}
function buildApiThreadInfoFromMessage(mtpMessage) {
  const chatId = (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.resolveMessageApiChatId)(mtpMessage);
  if (!chatId || !(mtpMessage instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Message) || !mtpMessage.replies) {
    return undefined;
  }
  return buildApiThreadInfo(mtpMessage.replies, mtpMessage.id, chatId);
}
function buildApiThreadInfo(messageReplies, messageId, chatId) {
  const {
    channelId,
    replies,
    maxId,
    readMaxId,
    recentRepliers,
    comments
  } = messageReplies;
  const apiChannelId = channelId ? (0,_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(channelId, 'channel') : undefined;
  if (apiChannelId === _config__WEBPACK_IMPORTED_MODULE_2__.DELETED_COMMENTS_CHANNEL_ID) {
    return undefined;
  }
  const baseThreadInfo = {
    messagesCount: replies,
    ...(maxId && {
      lastMessageId: maxId
    }),
    ...(readMaxId && {
      lastReadMessageId: readMaxId
    }),
    ...(recentRepliers && {
      recentReplierIds: recentRepliers.map(_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)
    })
  };
  if (comments) {
    return {
      ...baseThreadInfo,
      isCommentsInfo: true,
      chatId: apiChannelId,
      originChannelId: chatId,
      originMessageId: messageId
    };
  }
  return {
    ...baseThreadInfo,
    isCommentsInfo: false,
    chatId,
    threadId: messageId
  };
}
function buildApiQuickReply(reply) {
  const {
    shortcutId,
    shortcut,
    topMessage
  } = reply;
  return {
    id: shortcutId,
    shortcut,
    topMessageId: topMessage
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/pathBytesToSvg.ts":
/*!******************************************************!*\
  !*** ./src/api/gramjs/apiBuilders/pathBytesToSvg.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pathBytesToSvg: () => (/* binding */ pathBytesToSvg)
/* harmony export */ });
/* eslint-disable no-bitwise */

// eslint-disable-next-line max-len
const TEMPLATE = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {{width}} {{height}}" xml:space="preserve"><path fill-opacity="0.1" d="{{path}}" /></svg>';
const LOOKUP = 'AACAAAAHAAALMAAAQASTAVAAAZaacaaaahaaalmaaaqastava.az0123456789-,';
function pathBytesToSvg(bytes, width, height) {
  return TEMPLATE.replace('{{path}}', buildPath(bytes)).replace('{{width}}', String(width)).replace('{{height}}', String(height));
}
function buildPath(bytes) {
  let path = 'M';
  const len = bytes.length;
  for (let i = 0; i < len; i++) {
    const num = bytes[i];
    if (num >= 128 + 64) {
      path += LOOKUP[num - 128 - 64];
    } else {
      if (num >= 128) {
        path += ',';
      } else if (num >= 64) {
        path += '-';
      }
      path += String(num & 63);
    }
  }
  path += 'z';
  return path;
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/peers.ts":
/*!*********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/peers.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiEmojiStatus: () => (/* binding */ buildApiEmojiStatus),
/* harmony export */   buildApiPeerColor: () => (/* binding */ buildApiPeerColor),
/* harmony export */   buildApiPeerId: () => (/* binding */ buildApiPeerId),
/* harmony export */   getApiChatIdFromMtpPeer: () => (/* binding */ getApiChatIdFromMtpPeer),
/* harmony export */   isPeerChannel: () => (/* binding */ isPeerChannel),
/* harmony export */   isPeerChat: () => (/* binding */ isPeerChat),
/* harmony export */   isPeerUser: () => (/* binding */ isPeerUser)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");


function isPeerUser(peer) {
  return peer.hasOwnProperty('userId');
}
function isPeerChat(peer) {
  return peer.hasOwnProperty('chatId');
}
function isPeerChannel(peer) {
  return peer.hasOwnProperty('channelId');
}
function buildApiPeerId(id, type) {
  if (type === 'user') {
    return id.toString();
  }
  if (type === 'channel') {
    // Simulates TDLib https://github.com/tdlib/td/blob/d7203eb719304866a7eb7033ef03d421459335b8/td/telegram/DialogId.cpp#L54
    // But using only string operations. Should be fine until channel ids reach 10^12
    // Example: 12345678 -> -1000012345678
    return `-1${id.toString().padStart(_config__WEBPACK_IMPORTED_MODULE_1__.CHANNEL_ID_LENGTH - 2, '0')}`;
  }
  return `-${id}`;
}
function getApiChatIdFromMtpPeer(peer) {
  if (isPeerUser(peer)) {
    return buildApiPeerId(peer.userId, 'user');
  } else if (isPeerChat(peer)) {
    return buildApiPeerId(peer.chatId, 'chat');
  } else {
    return buildApiPeerId(peer.channelId, 'channel');
  }
}
function buildApiPeerColor(peerColor) {
  const {
    color,
    backgroundEmojiId
  } = peerColor;
  return {
    color,
    backgroundEmojiId: backgroundEmojiId?.toString()
  };
}
function buildApiEmojiStatus(mtpEmojiStatus) {
  if (mtpEmojiStatus instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.EmojiStatus) {
    return {
      documentId: mtpEmojiStatus.documentId.toString()
    };
  }
  if (mtpEmojiStatus instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.EmojiStatusUntil) {
    return {
      documentId: mtpEmojiStatus.documentId.toString(),
      until: mtpEmojiStatus.until
    };
  }
  return undefined;
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/reactions.ts":
/*!*************************************************!*\
  !*** ./src/api/gramjs/apiBuilders/reactions.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiAvailableEffect: () => (/* binding */ buildApiAvailableEffect),
/* harmony export */   buildApiAvailableReaction: () => (/* binding */ buildApiAvailableReaction),
/* harmony export */   buildApiReaction: () => (/* binding */ buildApiReaction),
/* harmony export */   buildApiSavedReactionTag: () => (/* binding */ buildApiSavedReactionTag),
/* harmony export */   buildMessagePeerReaction: () => (/* binding */ buildMessagePeerReaction),
/* harmony export */   buildMessageReactions: () => (/* binding */ buildMessageReactions),
/* harmony export */   buildReactionCount: () => (/* binding */ buildReactionCount)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _messageContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");



function buildMessageReactions(reactions) {
  const {
    recentReactions,
    results,
    canSeeList,
    reactionsAsTags
  } = reactions;
  return {
    areTags: reactionsAsTags,
    canSeeList,
    results: results.map(buildReactionCount).filter(Boolean).sort(reactionCountComparator),
    recentReactions: recentReactions?.map(buildMessagePeerReaction).filter(Boolean)
  };
}
function reactionCountComparator(a, b) {
  const diff = b.count - a.count;
  if (diff) return diff;
  if (a.chosenOrder !== undefined && b.chosenOrder !== undefined) {
    return a.chosenOrder - b.chosenOrder;
  }
  if (a.chosenOrder !== undefined) return 1;
  if (b.chosenOrder !== undefined) return -1;
  return 0;
}
function buildReactionCount(reactionCount) {
  const {
    chosenOrder,
    count,
    reaction
  } = reactionCount;
  const apiReaction = buildApiReaction(reaction);
  if (!apiReaction) return undefined;
  return {
    chosenOrder,
    count,
    reaction: apiReaction
  };
}
function buildMessagePeerReaction(userReaction) {
  const {
    peerId,
    reaction,
    big,
    unread,
    date,
    my
  } = userReaction;
  const apiReaction = buildApiReaction(reaction);
  if (!apiReaction) return undefined;
  return {
    peerId: (0,_peers__WEBPACK_IMPORTED_MODULE_2__.getApiChatIdFromMtpPeer)(peerId),
    reaction: apiReaction,
    addedDate: date,
    isUnread: unread,
    isBig: big,
    isOwn: my
  };
}
function buildApiReaction(reaction) {
  if (reaction instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReactionEmoji) {
    return {
      emoticon: reaction.emoticon
    };
  }
  if (reaction instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReactionCustomEmoji) {
    return {
      documentId: reaction.documentId.toString()
    };
  }
  return undefined;
}
function buildApiSavedReactionTag(tag) {
  const {
    reaction,
    title,
    count
  } = tag;
  const apiReaction = buildApiReaction(reaction);
  if (!apiReaction) return undefined;
  return {
    reaction: apiReaction,
    title,
    count
  };
}
function buildApiAvailableReaction(availableReaction) {
  const {
    selectAnimation,
    staticIcon,
    reaction,
    title,
    appearAnimation,
    inactive,
    aroundAnimation,
    centerIcon,
    effectAnimation,
    activateAnimation,
    premium
  } = availableReaction;
  return {
    selectAnimation: (0,_messageContent__WEBPACK_IMPORTED_MODULE_1__.buildApiDocument)(selectAnimation),
    appearAnimation: (0,_messageContent__WEBPACK_IMPORTED_MODULE_1__.buildApiDocument)(appearAnimation),
    activateAnimation: (0,_messageContent__WEBPACK_IMPORTED_MODULE_1__.buildApiDocument)(activateAnimation),
    effectAnimation: (0,_messageContent__WEBPACK_IMPORTED_MODULE_1__.buildApiDocument)(effectAnimation),
    staticIcon: (0,_messageContent__WEBPACK_IMPORTED_MODULE_1__.buildApiDocument)(staticIcon),
    aroundAnimation: aroundAnimation ? (0,_messageContent__WEBPACK_IMPORTED_MODULE_1__.buildApiDocument)(aroundAnimation) : undefined,
    centerIcon: centerIcon ? (0,_messageContent__WEBPACK_IMPORTED_MODULE_1__.buildApiDocument)(centerIcon) : undefined,
    reaction: {
      emoticon: reaction
    },
    title,
    isInactive: inactive,
    isPremium: premium
  };
}
function buildApiAvailableEffect(availableEffect) {
  const {
    id,
    emoticon,
    premiumRequired,
    staticIconId,
    effectStickerId,
    effectAnimationId
  } = availableEffect;
  return {
    id: id.toString(),
    emoticon,
    isPremium: premiumRequired,
    staticIconId: staticIconId?.toString(),
    effectStickerId: effectStickerId.toString(),
    effectAnimationId: effectAnimationId?.toString()
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/symbols.ts":
/*!***********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/symbols.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiEmojiInteraction: () => (/* binding */ buildApiEmojiInteraction),
/* harmony export */   buildStickerFromDocument: () => (/* binding */ buildStickerFromDocument),
/* harmony export */   buildStickerSet: () => (/* binding */ buildStickerSet),
/* harmony export */   buildStickerSetCovered: () => (/* binding */ buildStickerSetCovered),
/* harmony export */   processStickerPackResult: () => (/* binding */ processStickerPackResult),
/* harmony export */   processStickerResult: () => (/* binding */ processStickerResult)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "./src/api/gramjs/apiBuilders/common.ts");





function buildStickerFromDocument(document, isNoPremium, isPremium) {
  if (document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentEmpty) {
    return undefined;
  }
  const {
    mimeType,
    videoThumbs
  } = document;
  const stickerAttribute = document.attributes.find(attr => attr instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeSticker);
  const customEmojiAttribute = document.attributes.find(attr => attr instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeCustomEmoji);
  if (!(stickerAttribute || customEmojiAttribute)) {
    return undefined;
  }
  const isLottie = mimeType === _config__WEBPACK_IMPORTED_MODULE_1__.LOTTIE_STICKER_MIME_TYPE;
  const isVideo = mimeType === _config__WEBPACK_IMPORTED_MODULE_1__.VIDEO_STICKER_MIME_TYPE;
  const isCustomEmoji = Boolean(customEmojiAttribute);
  const shouldUseTextColor = isCustomEmoji && customEmojiAttribute.textColor;
  const imageSizeAttribute = document.attributes.find(attr => attr instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeImageSize);
  const videoSizeAttribute = document.attributes.find(attr => attr instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DocumentAttributeVideo);
  const sizeAttribute = imageSizeAttribute || videoSizeAttribute;
  const stickerOrEmojiAttribute = stickerAttribute || customEmojiAttribute;
  const stickerSetInfo = buildApiStickerSetInfo(stickerOrEmojiAttribute?.stickerset);
  const emoji = stickerOrEmojiAttribute?.alt;
  const isFree = Boolean(customEmojiAttribute?.free ?? true) && !isPremium;
  const cachedThumb = document.thumbs && document.thumbs.find(s => s instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoCachedSize);

  // eslint-disable-next-line no-restricted-globals
  if (mimeType === _config__WEBPACK_IMPORTED_MODULE_1__.VIDEO_STICKER_MIME_TYPE && !self.isWebmSupported && !cachedThumb) {
    const staticThumb = document.thumbs && document.thumbs.find(s => s instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoSize);
    if (!staticThumb) {
      return undefined;
    }
  }
  const pathThumb = document.thumbs && document.thumbs.find(s => s instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PhotoPathSize);
  const thumbnail = cachedThumb ? (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiThumbnailFromCached)(cachedThumb) : pathThumb && sizeAttribute ? (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiThumbnailFromPath)(pathThumb, sizeAttribute) : undefined;
  const {
    w: width,
    h: height
  } = cachedThumb || sizeAttribute || {};
  const hasEffect = !isNoPremium && videoThumbs && (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.compact)(videoThumbs?.filter(thumb => thumb instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.VideoSize)).some(_ref => {
    let {
      type
    } = _ref;
    return type === 'f';
  });
  return {
    mediaType: 'sticker',
    id: String(document.id),
    stickerSetInfo,
    emoji,
    isCustomEmoji,
    isLottie,
    isVideo,
    width,
    height,
    thumbnail,
    hasEffect,
    isFree,
    shouldUseTextColor
  };
}
function buildStickerSet(set) {
  const {
    archived,
    installedDate,
    id,
    accessHash,
    title,
    thumbs,
    count,
    shortName,
    emojis,
    thumbDocumentId
  } = set;
  const hasStaticThumb = thumbs?.some(thumb => thumb.type === 's');
  const hasAnimatedThumb = thumbs?.some(thumb => thumb.type === 'a');
  const hasVideoThumb = thumbs?.some(thumb => thumb.type === 'v');
  const thumbCustomEmojiId = thumbDocumentId && String(thumbDocumentId);
  const hasThumbnail = hasStaticThumb || hasAnimatedThumb || hasVideoThumb || Boolean(thumbCustomEmojiId);
  return {
    isArchived: archived,
    isEmoji: emojis,
    installedDate,
    id: String(id),
    accessHash: String(accessHash),
    title,
    hasStaticThumb,
    hasAnimatedThumb,
    hasVideoThumb,
    hasThumbnail,
    thumbCustomEmojiId,
    count,
    shortName
  };
}
function buildApiStickerSetInfo(inputSet) {
  if (inputSet instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputStickerSetID) {
    return {
      id: String(inputSet.id),
      accessHash: String(inputSet.accessHash)
    };
  }
  if (inputSet instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputStickerSetShortName) {
    return {
      shortName: inputSet.shortName
    };
  }
  return {
    isMissing: true
  };
}
function buildStickerSetCovered(coveredStickerSet) {
  const stickerSet = buildStickerSet(coveredStickerSet.set);
  if (coveredStickerSet instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StickerSetNoCovered) {
    return stickerSet;
  }
  const stickerSetCovers = coveredStickerSet instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StickerSetCovered ? [coveredStickerSet.cover] : coveredStickerSet instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StickerSetMultiCovered ? coveredStickerSet.covers : coveredStickerSet.documents;
  const stickers = processStickerResult(stickerSetCovers);
  if (coveredStickerSet instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StickerSetFullCovered) {
    return {
      ...stickerSet,
      stickers,
      packs: processStickerPackResult(coveredStickerSet.packs)
    };
  }
  return {
    ...stickerSet,
    covers: stickers
  };
}
function buildApiEmojiInteraction(json) {
  return {
    timestamps: json.a.map(_ref2 => {
      let {
        t
      } = _ref2;
      return t;
    })
  };
}
function processStickerPackResult(packs) {
  return packs.reduce((acc, _ref3) => {
    let {
      emoticon,
      documents
    } = _ref3;
    acc[emoticon] = documents.map(documentId => {
      const document = _localDb__WEBPACK_IMPORTED_MODULE_3__["default"].documents[String(documentId)];
      if (!document) return undefined;
      return buildStickerFromDocument(document);
    }).filter(Boolean);
    return acc;
  }, {});
}
function processStickerResult(stickers) {
  return stickers.map(document => {
    if (document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document) {
      const sticker = buildStickerFromDocument(document);
      if (sticker) {
        _localDb__WEBPACK_IMPORTED_MODULE_3__["default"].documents[String(document.id)] = document;
        return sticker;
      }
    }
    return undefined;
  }).filter(Boolean);
}

/***/ }),

/***/ "./src/api/gramjs/gramjsBuilders/index.ts":
/*!************************************************!*\
  !*** ./src/api/gramjs/gramjsBuilders/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildChatAdminRights: () => (/* binding */ buildChatAdminRights),
/* harmony export */   buildChatBannedRights: () => (/* binding */ buildChatBannedRights),
/* harmony export */   buildChatPhotoForLocalDb: () => (/* binding */ buildChatPhotoForLocalDb),
/* harmony export */   buildFilterFromApiFolder: () => (/* binding */ buildFilterFromApiFolder),
/* harmony export */   buildInputBotApp: () => (/* binding */ buildInputBotApp),
/* harmony export */   buildInputChatReactions: () => (/* binding */ buildInputChatReactions),
/* harmony export */   buildInputContact: () => (/* binding */ buildInputContact),
/* harmony export */   buildInputDocument: () => (/* binding */ buildInputDocument),
/* harmony export */   buildInputEmojiStatus: () => (/* binding */ buildInputEmojiStatus),
/* harmony export */   buildInputEntity: () => (/* binding */ buildInputEntity),
/* harmony export */   buildInputGroupCall: () => (/* binding */ buildInputGroupCall),
/* harmony export */   buildInputInvoice: () => (/* binding */ buildInputInvoice),
/* harmony export */   buildInputMediaDocument: () => (/* binding */ buildInputMediaDocument),
/* harmony export */   buildInputPeer: () => (/* binding */ buildInputPeer),
/* harmony export */   buildInputPeerFromLocalDb: () => (/* binding */ buildInputPeerFromLocalDb),
/* harmony export */   buildInputPhoneCall: () => (/* binding */ buildInputPhoneCall),
/* harmony export */   buildInputPhoto: () => (/* binding */ buildInputPhoto),
/* harmony export */   buildInputPoll: () => (/* binding */ buildInputPoll),
/* harmony export */   buildInputPollFromExisting: () => (/* binding */ buildInputPollFromExisting),
/* harmony export */   buildInputPrivacyKey: () => (/* binding */ buildInputPrivacyKey),
/* harmony export */   buildInputPrivacyRules: () => (/* binding */ buildInputPrivacyRules),
/* harmony export */   buildInputReaction: () => (/* binding */ buildInputReaction),
/* harmony export */   buildInputReplyTo: () => (/* binding */ buildInputReplyTo),
/* harmony export */   buildInputReportReason: () => (/* binding */ buildInputReportReason),
/* harmony export */   buildInputStickerSet: () => (/* binding */ buildInputStickerSet),
/* harmony export */   buildInputStickerSetShortName: () => (/* binding */ buildInputStickerSetShortName),
/* harmony export */   buildInputStorePaymentPurpose: () => (/* binding */ buildInputStorePaymentPurpose),
/* harmony export */   buildInputStory: () => (/* binding */ buildInputStory),
/* harmony export */   buildInputTextWithEntities: () => (/* binding */ buildInputTextWithEntities),
/* harmony export */   buildInputThemeParams: () => (/* binding */ buildInputThemeParams),
/* harmony export */   buildMessageFromUpdate: () => (/* binding */ buildMessageFromUpdate),
/* harmony export */   buildMtpMessageEntity: () => (/* binding */ buildMtpMessageEntity),
/* harmony export */   buildMtpPeerId: () => (/* binding */ buildMtpPeerId),
/* harmony export */   buildPeer: () => (/* binding */ buildPeer),
/* harmony export */   buildSendMessageAction: () => (/* binding */ buildSendMessageAction),
/* harmony export */   buildShippingInfo: () => (/* binding */ buildShippingInfo),
/* harmony export */   generateRandomBigInt: () => (/* binding */ generateRandomBigInt),
/* harmony export */   generateRandomInt: () => (/* binding */ generateRandomInt),
/* harmony export */   getEntityTypeById: () => (/* binding */ getEntityTypeById)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/gramjs/Helpers */ "./src/lib/gramjs/Helpers.js");
/* harmony import */ var _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types */ "./src/api/types/index.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");








function checkIfChannelId(id) {
  return id.length === _config__WEBPACK_IMPORTED_MODULE_4__.CHANNEL_ID_LENGTH && id.startsWith('-1');
}
function getEntityTypeById(chatOrUserId) {
  if (!chatOrUserId.startsWith('-')) {
    return 'user';
  } else if (checkIfChannelId(chatOrUserId)) {
    return 'channel';
  } else {
    return 'chat';
  }
}
function buildPeer(chatOrUserId) {
  const type = getEntityTypeById(chatOrUserId);
  if (type === 'user') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PeerUser({
      userId: buildMtpPeerId(chatOrUserId, 'user')
    });
  } else if (type === 'channel') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PeerChannel({
      channelId: buildMtpPeerId(chatOrUserId, 'channel')
    });
  } else {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PeerChat({
      chatId: buildMtpPeerId(chatOrUserId, 'chat')
    });
  }
}
function buildInputPeer(chatOrUserId, accessHash) {
  const type = getEntityTypeById(chatOrUserId);
  if (type === 'user') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerUser({
      userId: buildMtpPeerId(chatOrUserId, 'user'),
      accessHash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(accessHash)
    });
  } else if (type === 'channel') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerChannel({
      channelId: buildMtpPeerId(chatOrUserId, 'channel'),
      accessHash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(accessHash)
    });
  } else {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerChat({
      chatId: buildMtpPeerId(chatOrUserId, 'chat')
    });
  }
}
function buildInputPeerFromLocalDb(chatOrUserId) {
  const type = getEntityTypeById(chatOrUserId);
  let accessHash;
  if (type === 'user') {
    accessHash = _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].users[chatOrUserId]?.accessHash;
    if (!accessHash) {
      return undefined;
    }
  } else if (type === 'channel') {
    accessHash = _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].chats[chatOrUserId]?.accessHash;
    if (!accessHash) {
      return undefined;
    }
  }
  return buildInputPeer(chatOrUserId, String(accessHash));
}
function buildInputEntity(chatOrUserId, accessHash) {
  const type = getEntityTypeById(chatOrUserId);
  if (type === 'user') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputUser({
      userId: buildMtpPeerId(chatOrUserId, 'user'),
      accessHash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(accessHash)
    });
  } else if (type === 'channel') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChannel({
      channelId: buildMtpPeerId(chatOrUserId, 'channel'),
      accessHash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(accessHash)
    });
  } else {
    return buildMtpPeerId(chatOrUserId, 'chat');
  }
}
function buildInputStickerSet(id, accessHash) {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStickerSetID({
    id: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(id),
    accessHash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(accessHash)
  });
}
function buildInputStickerSetShortName(shortName) {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStickerSetShortName({
    shortName
  });
}
function buildInputDocument(media) {
  const document = _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].documents[media.id];
  if (!document) {
    return undefined;
  }
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputDocument((0,_util_iteratees__WEBPACK_IMPORTED_MODULE_5__.pick)(document, ['id', 'accessHash', 'fileReference']));
}
function buildInputMediaDocument(media) {
  const inputDocument = buildInputDocument(media);
  if (!inputDocument) {
    return undefined;
  }
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaDocument({
    id: inputDocument
  });
}
function buildInputPoll(pollParams, randomId) {
  const {
    summary,
    quiz
  } = pollParams;
  const poll = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Poll({
    id: randomId,
    publicVoters: summary.isPublic,
    question: buildInputTextWithEntities(summary.question),
    answers: summary.answers.map(_ref => {
      let {
        text,
        option
      } = _ref;
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PollAnswer({
        text: buildInputTextWithEntities(text),
        option: (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.deserializeBytes)(option)
      });
    }),
    quiz: summary.quiz,
    multipleChoice: summary.multipleChoice
  });
  if (!quiz) {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaPoll({
      poll
    });
  }
  const correctAnswers = quiz.correctAnswers.map(_helpers__WEBPACK_IMPORTED_MODULE_6__.deserializeBytes);
  const {
    solution
  } = quiz;
  const solutionEntities = quiz.solutionEntities ? quiz.solutionEntities.map(buildMtpMessageEntity) : [];
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaPoll({
    poll,
    correctAnswers,
    ...(solution && {
      solution,
      solutionEntities
    })
  });
}
function buildInputPollFromExisting(poll) {
  let shouldClose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaPoll({
    poll: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Poll({
      id: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(poll.id),
      publicVoters: poll.summary.isPublic,
      question: buildInputTextWithEntities(poll.summary.question),
      answers: poll.summary.answers.map(_ref2 => {
        let {
          text,
          option
        } = _ref2;
        return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PollAnswer({
          text: buildInputTextWithEntities(text),
          option: (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.deserializeBytes)(option)
        });
      }),
      quiz: poll.summary.quiz,
      multipleChoice: poll.summary.multipleChoice,
      closeDate: poll.summary.closeDate,
      closePeriod: poll.summary.closePeriod,
      closed: shouldClose ? true : poll.summary.closed
    }),
    correctAnswers: poll.results.results?.filter(o => o.isCorrect).map(o => (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.deserializeBytes)(o.option)),
    solution: poll.results.solution,
    solutionEntities: poll.results.solutionEntities?.map(buildMtpMessageEntity)
  });
}
function buildFilterFromApiFolder(folder) {
  const {
    emoticon,
    contacts,
    nonContacts,
    groups,
    channels,
    bots,
    excludeArchived,
    excludeMuted,
    excludeRead,
    pinnedChatIds,
    includedChatIds,
    excludedChatIds
  } = folder;
  const pinnedPeers = pinnedChatIds ? pinnedChatIds.map(buildInputPeerFromLocalDb).filter(Boolean) : [];
  const includePeers = includedChatIds ? includedChatIds.map(buildInputPeerFromLocalDb).filter(Boolean) : [];
  const excludePeers = excludedChatIds ? excludedChatIds.map(buildInputPeerFromLocalDb).filter(Boolean) : [];
  if (folder.isChatList) {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DialogFilterChatlist({
      id: folder.id,
      title: folder.title,
      emoticon: emoticon || undefined,
      pinnedPeers,
      includePeers,
      hasMyInvites: folder.hasMyInvites
    });
  }
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DialogFilter({
    id: folder.id,
    title: folder.title,
    emoticon: emoticon || undefined,
    contacts: contacts || undefined,
    nonContacts: nonContacts || undefined,
    groups: groups || undefined,
    bots: bots || undefined,
    excludeArchived: excludeArchived || undefined,
    excludeMuted: excludeMuted || undefined,
    excludeRead: excludeRead || undefined,
    broadcasts: channels || undefined,
    pinnedPeers,
    includePeers,
    excludePeers
  });
}
function buildInputStory(story) {
  const peer = buildInputPeerFromLocalDb(story.peerId);
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaStory({
    peer,
    id: story.id
  });
}
function generateRandomBigInt() {
  return (0,_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_2__.readBigIntFromBuffer)((0,_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_2__.generateRandomBytes)(8), true, true);
}
function generateRandomInt() {
  return (0,_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_2__.readBigIntFromBuffer)((0,_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_2__.generateRandomBytes)(4), true, true).toJSNumber();
}
function buildMessageFromUpdate(id, chatId, update) {
  // This is not a proper message, but we only need these fields for downloading media through `localDb`.
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Message({
    id,
    peerId: buildPeer(chatId),
    fromId: buildPeer(chatId),
    media: update.media
  });
}
function buildMtpMessageEntity(entity) {
  const {
    type,
    offset,
    length
  } = entity;
  const user = 'userId' in entity ? _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].users[entity.userId] : undefined;
  switch (type) {
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Bold:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityBold({
        offset,
        length
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Italic:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityItalic({
        offset,
        length
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Underline:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityUnderline({
        offset,
        length
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Strike:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityStrike({
        offset,
        length
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Code:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityCode({
        offset,
        length
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Pre:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityPre({
        offset,
        length,
        language: entity.language || ''
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Blockquote:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityBlockquote({
        offset,
        length
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.TextUrl:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityTextUrl({
        offset,
        length,
        url: entity.url
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Url:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityUrl({
        offset,
        length
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Hashtag:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityHashtag({
        offset,
        length
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.MentionName:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessageEntityMentionName({
        offset,
        length,
        userId: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputUser({
          userId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(user.id),
          accessHash: user.accessHash
        })
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.Spoiler:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntitySpoiler({
        offset,
        length
      });
    case _types__WEBPACK_IMPORTED_MODULE_3__.ApiMessageEntityTypes.CustomEmoji:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityCustomEmoji({
        offset,
        length,
        documentId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(entity.documentId)
      });
    default:
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEntityUnknown({
        offset,
        length
      });
  }
}
function buildChatPhotoForLocalDb(photo) {
  if (photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PhotoEmpty) {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatPhotoEmpty();
  }
  const {
    dcId,
    id: photoId
  } = photo;
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatPhoto({
    dcId,
    photoId
  });
}
function buildInputPhoto(photo) {
  const localPhoto = _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].photos[photo?.id];
  if (!localPhoto) {
    return undefined;
  }
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPhoto((0,_util_iteratees__WEBPACK_IMPORTED_MODULE_5__.pick)(localPhoto, ['id', 'accessHash', 'fileReference']));
}
function buildInputContact(_ref3) {
  let {
    phone,
    firstName,
    lastName
  } = _ref3;
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPhoneContact({
    clientId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(1),
    phone,
    firstName,
    lastName
  });
}
function buildChatBannedRights(bannedRights) {
  let untilDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatBannedRights({
    ...bannedRights,
    untilDate
  });
}
function buildChatAdminRights(adminRights) {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatAdminRights(adminRights);
}
function buildShippingInfo(info) {
  const {
    shippingAddress
  } = info;
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PaymentRequestedInfo({
    ...info,
    shippingAddress: shippingAddress ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PostAddress(shippingAddress) : undefined
  });
}
function buildInputPrivacyKey(privacyKey) {
  switch (privacyKey) {
    case 'phoneNumber':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyPhoneNumber();
    case 'addByPhone':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyAddedByPhone();
    case 'lastSeen':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyStatusTimestamp();
    case 'profilePhoto':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyProfilePhoto();
    case 'forwards':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyForwards();
    case 'chatInvite':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyChatInvite();
    case 'phoneCall':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyPhoneCall();
    case 'phoneP2P':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyPhoneP2P();
    case 'voiceMessages':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyVoiceMessages();
    case 'bio':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyAbout();
    case 'birthday':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyKeyBirthday();
  }
  return undefined;
}
function buildInputReportReason(reason) {
  switch (reason) {
    case 'spam':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonSpam();
    case 'violence':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonViolence();
    case 'childAbuse':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonChildAbuse();
    case 'pornography':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonPornography();
    case 'copyright':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonCopyright();
    case 'fake':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonFake();
    case 'geoIrrelevant':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonGeoIrrelevant();
    case 'illegalDrugs':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonIllegalDrugs();
    case 'personalDetails':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonPersonalDetails();
    case 'other':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReportReasonOther();
  }
  return undefined;
}
function buildSendMessageAction(action) {
  switch (action.type) {
    case 'cancel':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.SendMessageCancelAction();
    case 'typing':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.SendMessageTypingAction();
    case 'recordAudio':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.SendMessageRecordAudioAction();
    case 'chooseSticker':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.SendMessageChooseStickerAction();
    case 'playingGame':
      return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.SendMessageGamePlayAction();
  }
  return undefined;
}
function buildInputThemeParams(params) {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DataJSON({
    data: JSON.stringify(params)
  });
}
function buildMtpPeerId(id, type) {
  if (type === 'user') {
    return big_integer__WEBPACK_IMPORTED_MODULE_0___default()(id);
  }
  if (type === 'channel') {
    return big_integer__WEBPACK_IMPORTED_MODULE_0___default()(id.slice(2)); // Slice "-1", zeroes are trimmed when converting to BigInt
  }
  return big_integer__WEBPACK_IMPORTED_MODULE_0___default()(id.slice(1));
}
function buildInputGroupCall(groupCall) {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputGroupCall({
    id: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(groupCall.id),
    accessHash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(groupCall.accessHash)
  });
}
function buildInputPhoneCall(_ref4) {
  let {
    id,
    accessHash
  } = _ref4;
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPhoneCall({
    id: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(id),
    accessHash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(accessHash)
  });
}
function buildInputStorePaymentPurpose(purpose) {
  if (purpose.type === 'giftcode') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStorePaymentPremiumGiftCode({
      users: purpose.users.map(user => buildInputEntity(user.id, user.accessHash)),
      boostPeer: purpose.boostChannel ? buildInputPeer(purpose.boostChannel.id, purpose.boostChannel.accessHash) : undefined,
      currency: purpose.currency,
      amount: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(purpose.amount)
    });
  }
  const randomId = generateRandomBigInt();
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStorePaymentPremiumGiveaway({
    boostPeer: buildInputPeer(purpose.chat.id, purpose.chat.accessHash),
    additionalPeers: purpose.additionalChannels?.map(chat => buildInputPeer(chat.id, chat.accessHash)),
    countriesIso2: purpose.countries,
    prizeDescription: purpose.prizeDescription,
    onlyNewSubscribers: purpose.isOnlyForNewSubscribers || undefined,
    winnersAreVisible: purpose.areWinnersVisible || undefined,
    untilDate: purpose.untilDate,
    currency: purpose.currency,
    amount: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(purpose.amount),
    randomId
  });
}
function buildPremiumGiftCodeOption(optionData) {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PremiumGiftCodeOption({
    users: optionData.users,
    months: optionData.months,
    currency: optionData.currency,
    amount: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(optionData.amount)
  });
}
function buildInputStarsTopupOption(option) {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.StarsTopupOption({
    stars: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(option.stars),
    amount: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(option.amount),
    currency: option.currency,
    extended: option.isExtended
  });
}
function buildInputInvoice(invoice) {
  switch (invoice.type) {
    case 'message':
      {
        return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputInvoiceMessage({
          peer: buildInputPeer(invoice.chat.id, invoice.chat.accessHash),
          msgId: invoice.messageId
        });
      }
    case 'slug':
      {
        return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputInvoiceSlug({
          slug: invoice.slug
        });
      }
    case 'stars':
      {
        return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputInvoiceStars({
          option: buildInputStarsTopupOption(invoice.option)
        });
      }
    case 'giveaway':
    default:
      {
        const purpose = buildInputStorePaymentPurpose(invoice.purpose);
        const option = buildPremiumGiftCodeOption(invoice.option);
        return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputInvoicePremiumGiftCode({
          purpose,
          option
        });
      }
  }
}
function buildInputReaction(reaction) {
  if (reaction && 'emoticon' in reaction) {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ReactionEmoji({
      emoticon: reaction.emoticon
    });
  }
  if (reaction && 'documentId' in reaction) {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ReactionCustomEmoji({
      documentId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(reaction.documentId)
    });
  }
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ReactionEmpty();
}
function buildInputChatReactions(chatReactions) {
  if (chatReactions?.type === 'all') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatReactionsAll({
      allowCustom: chatReactions.areCustomAllowed
    });
  }
  if (chatReactions?.type === 'some') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatReactionsSome({
      reactions: chatReactions.allowed.map(buildInputReaction)
    });
  }
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatReactionsNone();
}
function buildInputEmojiStatus(emojiStatus, expires) {
  if (emojiStatus.id === _config__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_STATUS_ICON_ID) {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.EmojiStatusEmpty();
  }
  if (expires) {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.EmojiStatusUntil({
      documentId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(emojiStatus.id),
      until: expires
    });
  }
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.EmojiStatus({
    documentId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(emojiStatus.id)
  });
}
function buildInputTextWithEntities(formatted) {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.TextWithEntities({
    text: formatted.text,
    entities: formatted.entities?.map(buildMtpMessageEntity) || []
  });
}
function buildInputBotApp(app) {
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputBotAppID({
    id: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(app.id),
    accessHash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(app.accessHash)
  });
}
function buildInputReplyTo(replyInfo) {
  if (replyInfo.type === 'story') {
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReplyToStory({
      peer: buildInputPeerFromLocalDb(replyInfo.peerId),
      storyId: replyInfo.storyId
    });
  }
  if (replyInfo.type === 'message') {
    const {
      replyToMsgId,
      replyToTopId,
      replyToPeerId,
      quoteText
    } = replyInfo;
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputReplyToMessage({
      replyToMsgId,
      topMsgId: replyToTopId,
      replyToPeerId: replyToPeerId ? buildInputPeerFromLocalDb(replyToPeerId) : undefined,
      quoteText: quoteText?.text,
      quoteEntities: quoteText?.entities?.map(buildMtpMessageEntity)
    });
  }
  return undefined;
}
function buildInputPrivacyRules(rules) {
  const privacyRules = [];
  if (rules.allowedUsers?.length) {
    privacyRules.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyValueAllowUsers({
      users: rules.allowedUsers.map(_ref5 => {
        let {
          id,
          accessHash
        } = _ref5;
        return buildInputEntity(id, accessHash);
      })
    }));
  }
  if (rules.allowedChats?.length) {
    privacyRules.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyValueAllowChatParticipants({
      chats: rules.allowedChats.map(_ref6 => {
        let {
          id,
          type
        } = _ref6;
        return buildMtpPeerId(id, type === 'chatTypeBasicGroup' ? 'chat' : 'channel');
      })
    }));
  }
  if (rules.blockedUsers?.length) {
    privacyRules.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyValueDisallowUsers({
      users: rules.blockedUsers.map(_ref7 => {
        let {
          id,
          accessHash
        } = _ref7;
        return buildInputEntity(id, accessHash);
      })
    }));
  }
  if (rules.blockedChats?.length) {
    privacyRules.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyValueDisallowChatParticipants({
      chats: rules.blockedChats.map(_ref8 => {
        let {
          id,
          type
        } = _ref8;
        return buildMtpPeerId(id, type === 'chatTypeBasicGroup' ? 'chat' : 'channel');
      })
    }));
  }
  if (rules.shouldAllowPremium) {
    privacyRules.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyValueAllowPremium());
  }
  if (!rules.isUnspecified) {
    switch (rules.visibility) {
      case 'everybody':
        privacyRules.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyValueAllowAll());
        break;
      case 'contacts':
        privacyRules.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyValueAllowContacts());
        break;
      case 'nonContacts':
        privacyRules.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyValueDisallowContacts());
        break;
      case 'nobody':
        privacyRules.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPrivacyValueDisallowAll());
        break;
    }
  }
  return privacyRules;
}

/***/ }),

/***/ "./src/api/gramjs/helpers.ts":
/*!***********************************!*\
  !*** ./src/api/gramjs/helpers.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addChatToLocalDb: () => (/* binding */ addChatToLocalDb),
/* harmony export */   addDocumentToLocalDb: () => (/* binding */ addDocumentToLocalDb),
/* harmony export */   addEntitiesToLocalDb: () => (/* binding */ addEntitiesToLocalDb),
/* harmony export */   addMediaToLocalDb: () => (/* binding */ addMediaToLocalDb),
/* harmony export */   addMessageRepairInfo: () => (/* binding */ addMessageRepairInfo),
/* harmony export */   addMessageToLocalDb: () => (/* binding */ addMessageToLocalDb),
/* harmony export */   addPhotoToLocalDb: () => (/* binding */ addPhotoToLocalDb),
/* harmony export */   addStoryRepairInfo: () => (/* binding */ addStoryRepairInfo),
/* harmony export */   addStoryToLocalDb: () => (/* binding */ addStoryToLocalDb),
/* harmony export */   addUserToLocalDb: () => (/* binding */ addUserToLocalDb),
/* harmony export */   addWebDocumentToLocalDb: () => (/* binding */ addWebDocumentToLocalDb),
/* harmony export */   deserializeBytes: () => (/* binding */ deserializeBytes),
/* harmony export */   isChatFolder: () => (/* binding */ isChatFolder),
/* harmony export */   isResponseUpdate: () => (/* binding */ isResponseUpdate),
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   resolveMessageApiChatId: () => (/* binding */ resolveMessageApiChatId),
/* harmony export */   serializeBytes: () => (/* binding */ serializeBytes)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localDb */ "./src/api/gramjs/localDb.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];



const LOG_BACKGROUND = '#111111DD';
const LOG_PREFIX_COLOR = '#E4D00A';
const LOG_SUFFIX = {
  INVOKE: '#49DBF5',
  BEACON: '#F549DB',
  RESPONSE: '#6887F7',
  CONNECTING: '#E4D00A',
  CONNECTED: '#26D907',
  'CONNECTING ERROR': '#D1191C',
  'INVOKE ERROR': '#D1191C',
  UPDATE: '#0DD151',
  'UNEXPECTED UPDATE': '#9C9C9C',
  'UNEXPECTED RESPONSE': '#D1191C'
};
function resolveMessageApiChatId(mtpMessage) {
  if (!(mtpMessage instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Message || mtpMessage instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageService)) {
    return undefined;
  }
  return (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_1__.getApiChatIdFromMtpPeer)(mtpMessage.peerId);
}
function isChatFolder(filter) {
  return filter instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogFilter || filter instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogFilterChatlist;
}
function addMessageToLocalDb(message) {
  if (message instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Message) {
    if (message.media) addMediaToLocalDb(message.media, message);
    if (message.replyTo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageReplyHeader && message.replyTo.replyMedia) {
      addMediaToLocalDb(message.replyTo.replyMedia, message);
    }
  }
  if (message instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageService && 'photo' in message.action) {
    const photo = addMessageRepairInfo(message.action.photo, message);
    addPhotoToLocalDb(photo);
  }
  if (message instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SponsoredMessage && message.photo) {
    addPhotoToLocalDb(message.photo);
  }
}
function addMediaToLocalDb(media, message) {
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument && media.document) {
    const document = addMessageRepairInfo(media.document, message);
    addDocumentToLocalDb(document);
  }
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaWebPage && media.webpage instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.WebPage) {
    if (media.webpage.document) {
      const document = addMessageRepairInfo(media.webpage.document, message);
      addDocumentToLocalDb(document);
    }
    if (media.webpage.photo) {
      const photo = addMessageRepairInfo(media.webpage.photo, message);
      addPhotoToLocalDb(photo);
    }
  }
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaGame) {
    if (media.game.document) {
      const document = addMessageRepairInfo(media.game.document, message);
      addDocumentToLocalDb(document);
    }
    const photo = addMessageRepairInfo(media.game.photo, message);
    addPhotoToLocalDb(photo);
  }
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaPhoto && media.photo) {
    const photo = addMessageRepairInfo(media.photo, message);
    addPhotoToLocalDb(photo);
  }
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaInvoice) {
    if (media.photo) {
      const photo = addMessageRepairInfo(media.photo, message);
      addWebDocumentToLocalDb(photo);
    }
    if (media.extendedMedia instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMedia) {
      addMediaToLocalDb(media.extendedMedia.media, message);
    }
  }
  if (media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaPaidMedia) {
    media.extendedMedia.forEach(extendedMedia => {
      if (extendedMedia instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMedia) {
        addMediaToLocalDb(extendedMedia.media, message);
      }
    });
  }
}
function addStoryToLocalDb(story, peerId) {
  if (!(story instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StoryItem)) {
    return;
  }
  if (story.media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaPhoto && story.media.photo) {
    const photo = addStoryRepairInfo(story.media.photo, peerId, story);
    addPhotoToLocalDb(photo);
  }
  if (story.media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageMediaDocument) {
    if (story.media.document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document) {
      const doc = addStoryRepairInfo(story.media.document, peerId, story);
      addDocumentToLocalDb(doc);
    }
    if (story.media.altDocument instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document) {
      const doc = addStoryRepairInfo(story.media.altDocument, peerId, story);
      addDocumentToLocalDb(doc);
    }
  }
}
function addPhotoToLocalDb(photo) {
  if (photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo) {
    _localDb__WEBPACK_IMPORTED_MODULE_2__["default"].photos[String(photo.id)] = photo;
  }
}
function addDocumentToLocalDb(document) {
  if (document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document) {
    _localDb__WEBPACK_IMPORTED_MODULE_2__["default"].documents[String(document.id)] = document;
  }
}
function addStoryRepairInfo(media, peerId, story) {
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document && media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo)) return media;
  const repairableMedia = media;
  repairableMedia.localRepairInfo = {
    type: 'story',
    peerId,
    id: story.id
  };
  return repairableMedia;
}
function addMessageRepairInfo(media, message) {
  if (!message?.peerId) return media;
  if (!(media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document && media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo && media instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.WebDocument)) {
    return media;
  }
  const repairableMedia = media;
  repairableMedia.localRepairInfo = {
    type: 'message',
    peerId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_1__.getApiChatIdFromMtpPeer)(message.peerId),
    id: message.id
  };
  return repairableMedia;
}
function addChatToLocalDb(chat) {
  const id = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_1__.buildApiPeerId)(chat.id, chat instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Chat ? 'chat' : 'channel');
  const storedChat = _localDb__WEBPACK_IMPORTED_MODULE_2__["default"].chats[id];
  const isStoredMin = storedChat && 'min' in storedChat && storedChat.min;
  const isChatMin = 'min' in chat && chat.min;
  if (storedChat && !isStoredMin && isChatMin) return;
  _localDb__WEBPACK_IMPORTED_MODULE_2__["default"].chats[id] = chat;
}
function addUserToLocalDb(user) {
  const id = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_1__.buildApiPeerId)(user.id, 'user');
  const storedUser = _localDb__WEBPACK_IMPORTED_MODULE_2__["default"].users[id];
  if (user.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo) {
    addPhotoToLocalDb(user.photo);
  }
  if (storedUser && !storedUser.min && user.min) return;
  _localDb__WEBPACK_IMPORTED_MODULE_2__["default"].users[id] = user;
}
function addEntitiesToLocalDb(entities) {
  entities.forEach(entity => {
    if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User) {
      addUserToLocalDb(entity);
    } else if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Chat || entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Channel) {
      addChatToLocalDb(entity);
    }
  });
}
function addWebDocumentToLocalDb(webDocument) {
  _localDb__WEBPACK_IMPORTED_MODULE_2__["default"].webDocuments[webDocument.url] = webDocument;
}
function serializeBytes(value) {
  return String.fromCharCode(...value);
}
function deserializeBytes(value) {
  return Buffer.from(value, 'binary');
}
function log(suffix) {
  /* eslint-disable max-len */
  /* eslint-disable no-console */
  const func = suffix === 'UNEXPECTED RESPONSE' ? console.error : suffix === 'INVOKE ERROR' || suffix === 'UNEXPECTED UPDATE' ? console.warn : console.log;
  /* eslint-enable no-console */
  for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    data[_key - 1] = arguments[_key];
  }
  func(`%cGramJS%c${suffix}`, `color: ${LOG_PREFIX_COLOR}; background: ${LOG_BACKGROUND}; padding: 0.25rem; border-radius: 0.25rem;`, `color: ${LOG_SUFFIX[suffix]}; background: ${LOG_BACKGROUND}; padding: 0.25rem; border-radius: 0.25rem; margin-left: 0.25rem;`, ...data);
  /* eslint-enable max-len */
}
function isResponseUpdate(result) {
  return result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatesTooLong || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateShortMessage || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateShortChatMessage || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateShort || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatesCombined || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Updates || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateShortSentMessage;
}

/***/ }),

/***/ "./src/api/gramjs/localDb.ts":
/*!***********************************!*\
  !*** ./src/api/gramjs/localDb.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   broadcastLocalDbUpdateFull: () => (/* binding */ broadcastLocalDbUpdateFull),
/* harmony export */   clearLocalDb: () => (/* binding */ clearLocalDb),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   updateFullLocalDb: () => (/* binding */ updateFullLocalDb)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs_tl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/gramjs/tl */ "./src/lib/gramjs/tl/index.js");
/* harmony import */ var _lib_gramjs_tl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_tl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config */ "./src/config.ts");
/* harmony import */ var _util_schedulers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/schedulers */ "./src/util/schedulers.ts");
/* harmony import */ var _apiBuilders_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./apiBuilders/helpers */ "./src/api/gramjs/apiBuilders/helpers.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];






// eslint-disable-next-line no-restricted-globals
const IS_MULTITAB_SUPPORTED = ('BroadcastChannel' in self);
const channel = IS_MULTITAB_SUPPORTED ? new BroadcastChannel(_config__WEBPACK_IMPORTED_MODULE_2__.DATA_BROADCAST_CHANNEL_NAME) : undefined;
let batchedUpdates = [];
const throttledLocalDbUpdate = (0,_util_schedulers__WEBPACK_IMPORTED_MODULE_3__.throttle)(() => {
  channel.postMessage({
    type: 'localDbUpdate',
    batchedUpdates
  });
  batchedUpdates = [];
}, 100);
function createProxy(name, object) {
  return new Proxy(object, {
    get(target, prop, value) {
      return Reflect.get(target, prop, value);
    },
    set(target, prop, value) {
      batchedUpdates.push({
        name,
        prop,
        value
      });
      throttledLocalDbUpdate();
      return Reflect.set(target, prop, value);
    }
  });
}
function convertToVirtualClass(value) {
  if (value instanceof Uint8Array) return Buffer.from(value);
  if (typeof value === 'object' && Object.keys(value).length === 1 && Object.keys(value)[0] === 'value') {
    return big_integer__WEBPACK_IMPORTED_MODULE_0___default()(value.value);
  }
  if (Array.isArray(value)) {
    return value.map(convertToVirtualClass);
  }
  if (typeof value !== 'object' || !('CONSTRUCTOR_ID' in value)) {
    return value;
  }
  const path = value.className.split('.');
  const VirtualClass = path.reduce((acc, field) => {
    return acc[field];
  }, _lib_gramjs_tl__WEBPACK_IMPORTED_MODULE_1__.constructors);
  const valueOmited = (0,_apiBuilders_helpers__WEBPACK_IMPORTED_MODULE_4__.omitVirtualClassFields)(value);
  const valueConverted = Object.keys(valueOmited).reduce((acc, key) => {
    acc[key] = convertToVirtualClass(valueOmited[key]);
    return acc;
  }, {});
  return new VirtualClass(valueConverted);
}
function createLocalDbInitial(initial) {
  return ['localMessages', 'chats', 'users', 'messages', 'documents', 'stickerSets', 'photos', 'webDocuments', 'stories', 'commonBoxState', 'channelPtsById'].reduce((acc, key) => {
    const value = initial?.[key] ?? {};
    const convertedValue = Object.keys(value).reduce((acc2, key2) => {
      if (key === 'commonBoxState' || key === 'channelPtsById') {
        const typedValue = value;
        acc2[key2] = typedValue[key2];
        return acc2;
      }
      acc2[key2] = convertToVirtualClass(value[key2]);
      return acc2;
    }, {});
    acc[key] = IS_MULTITAB_SUPPORTED ? createProxy(key, convertedValue) : convertedValue;
    return acc;
  }, {});
}
const localDb = createLocalDbInitial();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localDb);
function broadcastLocalDbUpdateFull() {
  if (!channel) return;
  channel.postMessage({
    type: 'localDbUpdateFull',
    localDb: Object.keys(localDb).reduce((acc, key) => {
      acc[key] = {
        ...localDb[key]
      };
      return acc;
    }, {})
  });
}
function updateFullLocalDb(initial) {
  Object.assign(localDb, createLocalDbInitial(initial));
}
function clearLocalDb() {
  Object.assign(localDb, createLocalDbInitial());
}

/***/ }),

/***/ "./src/api/gramjs/updates/UpdatePremiumFloodWait.ts":
/*!**********************************************************!*\
  !*** ./src/api/gramjs/updates/UpdatePremiumFloodWait.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocalUpdatePremiumFloodWait)
/* harmony export */ });
class LocalUpdatePremiumFloodWait {
  constructor(isUpload) {
    this.isUpload = isUpload;
  }
}

/***/ }),

/***/ "./src/global/helpers/getEmojiOnlyCountForMessage.ts":
/*!***********************************************************!*\
  !*** ./src/global/helpers/getEmojiOnlyCountForMessage.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEmojiOnlyCountForMessage: () => (/* binding */ getEmojiOnlyCountForMessage)
/* harmony export */ });
/* harmony import */ var _api_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/types */ "./src/api/types/index.ts");
/* harmony import */ var _util_emoji_parseEmojiOnlyString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/emoji/parseEmojiOnlyString */ "./src/util/emoji/parseEmojiOnlyString.ts");


function getEmojiOnlyCountForMessage(content, groupedId) {
  if (!content.text) return undefined;
  return !groupedId && Object.keys(content).length === 1 // Only text is present
  && !content.text.entities?.some(entity => entity.type !== _api_types__WEBPACK_IMPORTED_MODULE_0__.ApiMessageEntityTypes.CustomEmoji) && (0,_util_emoji_parseEmojiOnlyString__WEBPACK_IMPORTED_MODULE_1__["default"])(content.text.text) || undefined;
}

/***/ }),

/***/ "./src/lib/gramjs/Helpers.js":
/*!***********************************!*\
  !*** ./src/lib/gramjs/Helpers.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const BigInt = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
const crypto = __webpack_require__(/*! ./crypto/crypto */ "./src/lib/gramjs/crypto/crypto.js");

/**
 * converts a buffer to big int
 * @param buffer
 * @param little
 * @param signed
 * @returns {bigInt.BigInteger}
 */
function readBigIntFromBuffer(buffer) {
  let little = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let signed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let randBuffer = Buffer.from(buffer);
  const bytesNumber = randBuffer.length;
  if (little) {
    randBuffer = randBuffer.reverse();
  }
  let bigInt = BigInt(randBuffer.toString('hex'), 16);
  if (signed && Math.floor(bigInt.toString(2).length / 8) >= bytesNumber) {
    bigInt = bigInt.subtract(BigInt(2).pow(BigInt(bytesNumber * 8)));
  }
  return bigInt;
}

/**
 * Special case signed little ints
 * @param big
 * @param number
 * @returns {Buffer}
 */
function toSignedLittleBuffer(big) {
  let number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  const bigNumber = BigInt(big);
  const byteArray = [];
  for (let i = 0; i < number; i++) {
    byteArray[i] = bigNumber.shiftRight(8 * i).and(255);
  }
  return Buffer.from(byteArray);
}

/**
 * converts a big int to a buffer
 * @param bigInt {bigInt.BigInteger}
 * @param bytesNumber
 * @param little
 * @param signed
 * @returns {Buffer}
 */
function readBufferFromBigInt(bigInt, bytesNumber) {
  let little = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  let signed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  bigInt = BigInt(bigInt);
  const bitLength = bigInt.bitLength().toJSNumber();
  const bytes = Math.ceil(bitLength / 8);
  if (bytesNumber < bytes) {
    throw new Error('OverflowError: int too big to convert');
  }
  if (!signed && bigInt.lesser(BigInt(0))) {
    throw new Error('Cannot convert to unsigned');
  }
  let below = false;
  if (bigInt.lesser(BigInt(0))) {
    below = true;
    bigInt = bigInt.abs();
  }
  const hex = bigInt.toString(16).padStart(bytesNumber * 2, '0');
  let buffer = Buffer.from(hex, 'hex');
  if (signed && below) {
    buffer[buffer.length - 1] = 256 - buffer[buffer.length - 1];
    for (let i = 0; i < buffer.length - 1; i++) {
      buffer[i] = 255 - buffer[i];
    }
  }
  if (little) {
    buffer = buffer.reverse();
  }
  return buffer;
}

/**
 * Generates a random long integer (8 bytes), which is optionally signed
 * @returns {BigInteger}
 */
function generateRandomLong() {
  let signed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return readBigIntFromBuffer(generateRandomBytes(8), true, signed);
}

/**
 * .... really javascript
 * @param n {number}
 * @param m {number}
 * @returns {number}
 */
function mod(n, m) {
  return (n % m + m) % m;
}

/**
 * returns a positive bigInt
 * @param n {BigInt}
 * @param m {BigInt}
 * @returns {BigInt}
 */
function bigIntMod(n, m) {
  return n.remainder(m).add(m).remainder(m);
}

/**
 * Generates a random bytes array
 * @param count
 * @returns {Buffer}
 */
function generateRandomBytes(count) {
  return Buffer.from(crypto.randomBytes(count));
}

/**
 * Calculate the key based on Telegram guidelines, specifying whether it's the client or not
 * @param sharedKey
 * @param msgKey
 * @param client
 * @returns {{iv: Buffer, key: Buffer}}
 */

/* CONTEST
this is mtproto 1 (mostly used for secret chats)
async function calcKey(sharedKey, msgKey, client) {
    const x = client === true ? 0 : 8
    const [sha1a, sha1b, sha1c, sha1d] = await Promise.all([
        sha1(Buffer.concat([msgKey, sharedKey.slice(x, x + 32)])),
        sha1(Buffer.concat([sharedKey.slice(x + 32, x + 48), msgKey, sharedKey.slice(x + 48, x + 64)])),
        sha1(Buffer.concat([sharedKey.slice(x + 64, x + 96), msgKey])),
        sha1(Buffer.concat([msgKey, sharedKey.slice(x + 96, x + 128)]))
    ])
    const key = Buffer.concat([sha1a.slice(0, 8), sha1b.slice(8, 20), sha1c.slice(4, 16)])
    const iv = Buffer.concat([sha1a.slice(8, 20), sha1b.slice(0, 8), sha1c.slice(16, 20), sha1d.slice(0, 8)])
    return {
        key,
        iv
    }
}

 */

/**
 * Generates the key data corresponding to the given nonces
 * @param serverNonce
 * @param newNonce
 * @returns {{key: Buffer, iv: Buffer}}
 */
async function generateKeyDataFromNonce(serverNonce, newNonce) {
  serverNonce = toSignedLittleBuffer(serverNonce, 16);
  newNonce = toSignedLittleBuffer(newNonce, 32);
  const [hash1, hash2, hash3] = await Promise.all([sha1(Buffer.concat([newNonce, serverNonce])), sha1(Buffer.concat([serverNonce, newNonce])), sha1(Buffer.concat([newNonce, newNonce]))]);
  const keyBuffer = Buffer.concat([hash1, hash2.slice(0, 12)]);
  const ivBuffer = Buffer.concat([hash2.slice(12, 20), hash3, newNonce.slice(0, 4)]);
  return {
    key: keyBuffer,
    iv: ivBuffer
  };
}
function convertToLittle(buf) {
  const correct = Buffer.alloc(buf.length * 4);
  for (let i = 0; i < buf.length; i++) {
    correct.writeUInt32BE(buf[i], i * 4);
  }
  return correct;
}

/**
 * Calculates the SHA1 digest for the given data
 * @param data
 * @returns {Promise}
 */
function sha1(data) {
  const shaSum = crypto.createHash('sha1');
  shaSum.update(data);
  return shaSum.digest();
}

/**
 * Calculates the SHA256 digest for the given data
 * @param data
 * @returns {Promise}
 */
function sha256(data) {
  const shaSum = crypto.createHash('sha256');
  shaSum.update(data);
  return shaSum.digest();
}

/**
 * Fast mod pow for RSA calculation. a^b % n
 * @param a
 * @param b
 * @param n
 * @returns {bigInt.BigInteger}
 */
function modExp(a, b, n) {
  a = a.remainder(n);
  let result = BigInt.one;
  let x = a;
  while (b.greater(BigInt.zero)) {
    const leastSignificantBit = b.remainder(BigInt(2));
    b = b.divide(BigInt(2));
    if (leastSignificantBit.eq(BigInt.one)) {
      result = result.multiply(x);
      result = result.remainder(n);
    }
    x = x.multiply(x);
    x = x.remainder(n);
  }
  return result;
}

/**
 * Gets the arbitrary-length byte array corresponding to the given integer
 * @param integer {any}
 * @param signed {boolean}
 * @returns {Buffer}
 */
function getByteArray(integer) {
  let signed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const bits = integer.toString(2).length;
  const byteLength = Math.floor((bits + 8 - 1) / 8);
  return readBufferFromBigInt(BigInt(integer), byteLength, false, signed);
}

/**
 * returns a random int from min (inclusive) and max (inclusive)
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sleeps a specified amount of time
 * @param ms time in milliseconds
 * @returns {Promise}
 */
const sleep = ms => new Promise(resolve => {
  setTimeout(resolve, ms);
});

/**
 * Helper to export two buffers of same length
 * @returns {Buffer}
 */

function bufferXor(a, b) {
  const res = [];
  for (let i = 0; i < a.length; i++) {
    res.push(a[i] ^ b[i]);
  }
  return Buffer.from(res);
}

/**
 * Checks if the obj is an array
 * @param obj
 * @returns {boolean}
 */
/*
CONTEST
we do'nt support array requests anyway
function isArrayLike(obj) {
    if (!obj) return false
    const l = obj.length
    if (typeof l != 'number' || l < 0) return false
    if (Math.floor(l) !== l) return false
    // fast check
    if (l > 0 && !(l - 1 in obj)) return false
    // more complete check (optional)
    for (let i = 0; i < l; ++i) {
        if (!(i in obj)) return false
    }
    return true
}
*/

// Taken from https://stackoverflow.com/questions/18638900/javascript-crc32/18639999#18639999
function makeCRCTable() {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
}
let crcTable;
function crc32(buf) {
  if (!crcTable) {
    crcTable = makeCRCTable();
  }
  if (!Buffer.isBuffer(buf)) {
    buf = Buffer.from(buf);
  }
  let crc = -1;
  for (let index = 0; index < buf.length; index++) {
    const byte = buf[index];
    crc = crcTable[(crc ^ byte) & 0xff] ^ crc >>> 8;
  }
  return (crc ^ -1) >>> 0;
}
module.exports = {
  readBigIntFromBuffer,
  readBufferFromBigInt,
  generateRandomLong,
  mod,
  crc32,
  generateRandomBytes,
  // calcKey,
  generateKeyDataFromNonce,
  sha1,
  sha256,
  bigIntMod,
  modExp,
  getRandomInt,
  sleep,
  getByteArray,
  // isArrayLike,
  toSignedLittleBuffer,
  convertToLittle,
  bufferXor
};

/***/ }),

/***/ "./src/lib/gramjs/Password.js":
/*!************************************!*\
  !*** ./src/lib/gramjs/Password.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const BigInt = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
const {
  constructors
} = __webpack_require__(/*! ./tl */ "./src/lib/gramjs/tl/index.js");
const {
  readBigIntFromBuffer,
  readBufferFromBigInt,
  sha256,
  bigIntMod,
  modExp,
  generateRandomBytes
} = __webpack_require__(/*! ./Helpers */ "./src/lib/gramjs/Helpers.js");
const crypto = __webpack_require__(/*! ./crypto/crypto */ "./src/lib/gramjs/crypto/crypto.js");
const SIZE_FOR_HASH = 256;

/**
 *
 *
 * @param prime{BigInteger}
 * @param g{BigInteger}
 */

/*
We don't support changing passwords yet
function checkPrimeAndGoodCheck(prime, g) {
    console.error('Unsupported function `checkPrimeAndGoodCheck` call. Arguments:', prime, g)

    const goodPrimeBitsCount = 2048
    if (prime < 0 || prime.bitLength() !== goodPrimeBitsCount) {
        throw new Error(`bad prime count ${prime.bitLength()},expected ${goodPrimeBitsCount}`)
    }
    // TODO this is kinda slow
    if (Factorizator.factorize(prime)[0] !== 1) {
        throw new Error('give "prime" is not prime')
    }
    if (g.eq(BigInt(2))) {
        if ((prime.remainder(BigInt(8))).neq(BigInt(7))) {
            throw new Error(`bad g ${g}, mod8 ${prime % 8}`)
        }
    } else if (g.eq(BigInt(3))) {
        if ((prime.remainder(BigInt(3))).neq(BigInt(2))) {
            throw new Error(`bad g ${g}, mod3 ${prime % 3}`)
        }
        // eslint-disable-next-line no-empty
    } else if (g.eq(BigInt(4))) {

    } else if (g.eq(BigInt(5))) {
        if (!([ BigInt(1), BigInt(4) ].includes(prime.remainder(BigInt(5))))) {
            throw new Error(`bad g ${g}, mod8 ${prime % 5}`)
        }
    } else if (g.eq(BigInt(6))) {
        if (!([ BigInt(19), BigInt(23) ].includes(prime.remainder(BigInt(24))))) {
            throw new Error(`bad g ${g}, mod8 ${prime % 24}`)
        }
    } else if (g.eq(BigInt(7))) {
        if (!([ BigInt(3), BigInt(5), BigInt(6) ].includes(prime.remainder(BigInt(7))))) {
            throw new Error(`bad g ${g}, mod8 ${prime % 7}`)
        }
    } else {
        throw new Error(`bad g ${g}`)
    }
    const primeSub1Div2 = (prime.subtract(BigInt(1))).divide(BigInt(2))
    if (Factorizator.factorize(primeSub1Div2)[0] !== 1) {
        throw new Error('(prime - 1) // 2 is not prime')
    }
}
*/
/**
 *
 * @param primeBytes{Buffer}
 * @param g{number}
 */
function checkPrimeAndGood(primeBytes, g) {
  const goodPrime = Buffer.from([0xC7, 0x1C, 0xAE, 0xB9, 0xC6, 0xB1, 0xC9, 0x04, 0x8E, 0x6C, 0x52, 0x2F, 0x70, 0xF1, 0x3F, 0x73, 0x98, 0x0D, 0x40, 0x23, 0x8E, 0x3E, 0x21, 0xC1, 0x49, 0x34, 0xD0, 0x37, 0x56, 0x3D, 0x93, 0x0F, 0x48, 0x19, 0x8A, 0x0A, 0xA7, 0xC1, 0x40, 0x58, 0x22, 0x94, 0x93, 0xD2, 0x25, 0x30, 0xF4, 0xDB, 0xFA, 0x33, 0x6F, 0x6E, 0x0A, 0xC9, 0x25, 0x13, 0x95, 0x43, 0xAE, 0xD4, 0x4C, 0xCE, 0x7C, 0x37, 0x20, 0xFD, 0x51, 0xF6, 0x94, 0x58, 0x70, 0x5A, 0xC6, 0x8C, 0xD4, 0xFE, 0x6B, 0x6B, 0x13, 0xAB, 0xDC, 0x97, 0x46, 0x51, 0x29, 0x69, 0x32, 0x84, 0x54, 0xF1, 0x8F, 0xAF, 0x8C, 0x59, 0x5F, 0x64, 0x24, 0x77, 0xFE, 0x96, 0xBB, 0x2A, 0x94, 0x1D, 0x5B, 0xCD, 0x1D, 0x4A, 0xC8, 0xCC, 0x49, 0x88, 0x07, 0x08, 0xFA, 0x9B, 0x37, 0x8E, 0x3C, 0x4F, 0x3A, 0x90, 0x60, 0xBE, 0xE6, 0x7C, 0xF9, 0xA4, 0xA4, 0xA6, 0x95, 0x81, 0x10, 0x51, 0x90, 0x7E, 0x16, 0x27, 0x53, 0xB5, 0x6B, 0x0F, 0x6B, 0x41, 0x0D, 0xBA, 0x74, 0xD8, 0xA8, 0x4B, 0x2A, 0x14, 0xB3, 0x14, 0x4E, 0x0E, 0xF1, 0x28, 0x47, 0x54, 0xFD, 0x17, 0xED, 0x95, 0x0D, 0x59, 0x65, 0xB4, 0xB9, 0xDD, 0x46, 0x58, 0x2D, 0xB1, 0x17, 0x8D, 0x16, 0x9C, 0x6B, 0xC4, 0x65, 0xB0, 0xD6, 0xFF, 0x9C, 0xA3, 0x92, 0x8F, 0xEF, 0x5B, 0x9A, 0xE4, 0xE4, 0x18, 0xFC, 0x15, 0xE8, 0x3E, 0xBE, 0xA0, 0xF8, 0x7F, 0xA9, 0xFF, 0x5E, 0xED, 0x70, 0x05, 0x0D, 0xED, 0x28, 0x49, 0xF4, 0x7B, 0xF9, 0x59, 0xD9, 0x56, 0x85, 0x0C, 0xE9, 0x29, 0x85, 0x1F, 0x0D, 0x81, 0x15, 0xF6, 0x35, 0xB1, 0x05, 0xEE, 0x2E, 0x4E, 0x15, 0xD0, 0x4B, 0x24, 0x54, 0xBF, 0x6F, 0x4F, 0xAD, 0xF0, 0x34, 0xB1, 0x04, 0x03, 0x11, 0x9C, 0xD8, 0xE3, 0xB9, 0x2F, 0xCC, 0x5B]);
  if (goodPrime.equals(primeBytes)) {
    if ([3, 4, 5, 7].includes(g)) {
      return; // It's good
    }
  }
  throw new Error('Changing passwords unsupported');
  // checkPrimeAndGoodCheck(readBigIntFromBuffer(primeBytes, false), g)
}

/**
 *
 * @param number{BigInteger}
 * @param p{BigInteger}
 * @returns {boolean}
 */
function isGoodLarge(number, p) {
  return number.greater(BigInt(0)) && p.subtract(number).greater(BigInt(0));
}

/**
 *
 * @param number {Buffer}
 * @returns {Buffer}
 */
function numBytesForHash(number) {
  return Buffer.concat([Buffer.alloc(SIZE_FOR_HASH - number.length), number]);
}

/**
 *
 * @param g {Buffer}
 * @returns {Buffer}
 */
function bigNumForHash(g) {
  return readBufferFromBigInt(g, SIZE_FOR_HASH, false);
}

/**
 *
 * @param modexp {BigInteger}
 * @param prime {BigInteger}
 * @returns {Boolean}
 */
function isGoodModExpFirst(modexp, prime) {
  const diff = prime.subtract(modexp);
  const minDiffBitsCount = 2048 - 64;
  const maxModExpSize = 256;
  return !(diff.lesser(BigInt(0)) || diff.bitLength() < minDiffBitsCount || modexp.bitLength() < minDiffBitsCount || Math.floor((modexp.bitLength() + 7) / 8) > maxModExpSize);
}
function xor(a, b) {
  const length = Math.min(a.length, b.length);
  for (let i = 0; i < length; i++) {
    a[i] ^= b[i];
  }
  return a;
}

/**
 *
 * @param password{Buffer}
 * @param salt{Buffer}
 * @param iterations{number}
 * @returns {*}
 */

function pbkdf2sha512(password, salt, iterations) {
  return crypto.pbkdf2(password, salt, iterations, 64, 'sha512');
}

/**
 *
 * @param algo {constructors.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow}
 * @param password
 * @returns {Buffer|*}
 */
async function computeHash(algo, password) {
  const hash1 = await sha256(Buffer.concat([algo.salt1, Buffer.from(password, 'utf-8'), algo.salt1]));
  const hash2 = await sha256(Buffer.concat([algo.salt2, hash1, algo.salt2]));
  const hash3 = await pbkdf2sha512(hash2, algo.salt1, 100000);
  return sha256(Buffer.concat([algo.salt2, hash3, algo.salt2]));
}

/**
 *
 * @param algo {constructors.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow}
 * @param password
 */
async function computeDigest(algo, password) {
  try {
    checkPrimeAndGood(algo.p, algo.g);
  } catch (e) {
    throw new Error('bad p/g in password');
  }
  const value = modExp(BigInt(algo.g), readBigIntFromBuffer(await computeHash(algo, password), false), readBigIntFromBuffer(algo.p, false));
  return bigNumForHash(value);
}

/**
 *
 * @param request {constructors.account.Password}
 * @param password {string}
 */
async function computeCheck(request, password) {
  const algo = request.currentAlgo;
  if (!(algo instanceof constructors.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow)) {
    throw new Error(`Unsupported password algorithm ${algo.className}`);
  }
  const pwHash = await computeHash(algo, password);
  const p = readBigIntFromBuffer(algo.p, false);
  const {
    g
  } = algo;
  const B = readBigIntFromBuffer(request.srp_B, false);
  try {
    checkPrimeAndGood(algo.p, g);
  } catch (e) {
    throw new Error('bad /g in password');
  }
  if (!isGoodLarge(B, p)) {
    throw new Error('bad b in check');
  }
  const x = readBigIntFromBuffer(pwHash, false);
  const pForHash = numBytesForHash(algo.p);
  const gForHash = bigNumForHash(g);
  const bForHash = numBytesForHash(request.srp_B);
  const gX = modExp(BigInt(g), x, p);
  const k = readBigIntFromBuffer(await sha256(Buffer.concat([pForHash, gForHash])), false);
  const kgX = bigIntMod(k.multiply(gX), p);
  const generateAndCheckRandom = async () => {
    const randomSize = 256;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const random = generateRandomBytes(randomSize);
      const a = readBigIntFromBuffer(random, false);
      const A = modExp(BigInt(g), a, p);
      if (isGoodModExpFirst(A, p)) {
        const aForHash = bigNumForHash(A);
        const u = readBigIntFromBuffer(await sha256(Buffer.concat([aForHash, bForHash])), false);
        if (u.greater(BigInt(0))) {
          return [a, aForHash, u];
        }
      }
    }
  };
  const [a, aForHash, u] = await generateAndCheckRandom();
  const gB = bigIntMod(B.subtract(kgX), p);
  if (!isGoodModExpFirst(gB, p)) {
    throw new Error('bad gB');
  }
  const ux = u.multiply(x);
  const aUx = a.add(ux);
  const S = modExp(gB, aUx, p);
  const [K, pSha, gSha, salt1Sha, salt2Sha] = await Promise.all([sha256(bigNumForHash(S)), sha256(pForHash), sha256(gForHash), sha256(algo.salt1), sha256(algo.salt2)]);
  const M1 = await sha256(Buffer.concat([xor(pSha, gSha), salt1Sha, salt2Sha, aForHash, bForHash, K]));
  return new constructors.InputCheckPasswordSRP({
    srpId: request.srpId,
    A: Buffer.from(aForHash),
    M1
  });
}
module.exports = {
  computeCheck,
  computeDigest
};

/***/ }),

/***/ "./src/lib/gramjs/Utils.js":
/*!*********************************!*\
  !*** ./src/lib/gramjs/Utils.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const {
  constructors
} = __webpack_require__(/*! ./tl */ "./src/lib/gramjs/tl/index.js");

// eslint-disable-next-line max-len
const JPEG_HEADER = Buffer.from('ffd8ffe000104a46494600010100000100010000ffdb004300281c1e231e19282321232d2b28303c64413c37373c7b585d4964918099968f808c8aa0b4e6c3a0aadaad8a8cc8ffcbdaeef5ffffff9bc1fffffffaffe6fdfff8ffdb0043012b2d2d3c353c76414176f8a58ca5f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8ffc00011080000000003012200021101031101ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffc4001f0100030101010101010101010000000000000102030405060708090a0bffc400b51100020102040403040705040400010277000102031104052131061241510761711322328108144291a1b1c109233352f0156272d10a162434e125f11718191a262728292a35363738393a434445464748494a535455565758595a636465666768696a737475767778797a82838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae2e3e4e5e6e7e8e9eaf2f3f4f5f6f7f8f9faffda000c03010002110311003f00', 'hex');
const JPEG_FOOTER = Buffer.from('ffd9', 'hex');

// eslint-disable-next-line @typescript-eslint/naming-convention
function _raiseCastFail(entity, target) {
  throw new Error(`Cannot cast ${entity.className} to any kind of ${target}`);
}

/**
 Gets the input peer for the given "entity" (user, chat or channel).

 A ``TypeError`` is raised if the given entity isn't a supported type
 or if ``check_hash is True`` but the entity's ``accessHash is None``
 *or* the entity contains ``min`` information. In this case, the hash
 cannot be used for general purposes, and thus is not returned to avoid
 any issues which can derive from invalid access hashes.

 Note that ``check_hash`` **is ignored** if an input peer is already
 passed since in that case we assume the user knows what they're doing.
 This is key to getting entities by explicitly passing ``hash = 0``.

 * @param entity
 * @param allowSelf
 * @param checkHash
 */
function getInputPeer(entity) {
  let allowSelf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let checkHash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (entity.SUBCLASS_OF_ID === undefined) {
    // e.g. custom.Dialog (can't cyclic import).

    if (allowSelf && 'inputEntity' in entity) {
      return entity.inputEntity;
    } else if ('entity' in entity) {
      return getInputPeer(entity.entity);
    } else {
      _raiseCastFail(entity, 'InputPeer');
    }
  }
  if (entity.SUBCLASS_OF_ID === 0xc91c90b6) {
    // crc32(b'InputPeer')
    return entity;
  }
  if (entity instanceof constructors.User) {
    if (entity.isSelf && allowSelf) {
      return new constructors.InputPeerSelf();
    } else if (entity.accessHash !== undefined || !checkHash) {
      return new constructors.InputPeerUser({
        userId: entity.id,
        accessHash: entity.accessHash
      });
    } else {
      throw new Error('User without accessHash or min info cannot be input');
    }
  }
  if (entity instanceof constructors.Chat || entity instanceof constructors.ChatEmpty || entity instanceof constructors.ChatForbidden) {
    return new constructors.InputPeerChat({
      chatId: entity.id
    });
  }
  if (entity instanceof constructors.Channel) {
    if (entity.accessHash !== undefined || !checkHash) {
      return new constructors.InputPeerChannel({
        channelId: entity.id,
        accessHash: entity.accessHash
      });
    } else {
      throw new TypeError('Channel without accessHash or min info cannot be input');
    }
  }
  if (entity instanceof constructors.ChannelForbidden) {
    // "channelForbidden are never min", and since their hash is
    // also not optional, we assume that this truly is the case.
    return new constructors.InputPeerChannel({
      channelId: entity.id,
      accessHash: entity.accessHash
    });
  }
  if (entity instanceof constructors.InputUser) {
    return new constructors.InputPeerUser({
      userId: entity.userId,
      accessHash: entity.accessHash
    });
  }
  if (entity instanceof constructors.InputChannel) {
    return new constructors.InputPeerChannel({
      channelId: entity.channelId,
      accessHash: entity.accessHash
    });
  }
  if (entity instanceof constructors.UserEmpty) {
    return new constructors.InputPeerEmpty();
  }
  if (entity instanceof constructors.UserFull) {
    return getInputPeer(entity.user);
  }
  if (entity instanceof constructors.ChatFull) {
    return new constructors.InputPeerChat({
      chatId: entity.id
    });
  }
  if (entity instanceof constructors.PeerChat) {
    return new constructors.InputPeerChat(entity.chatId);
  }
  _raiseCastFail(entity, 'InputPeer');
  return undefined;
}

/**
 Similar to :meth:`get_input_peer`, but for :tl:`InputChannel`'s alone.

 .. important::

 This method does not validate for invalid general-purpose access
 hashes, unlike `get_input_peer`. Consider using instead:
 ``get_input_channel(get_input_peer(channel))``.

 * @param entity
 * @returns {InputChannel|*}
 */
/* CONTEST
function getInputChannel(entity) {
    if (entity.SUBCLASS_OF_ID === undefined) {
        _raiseCastFail(entity, 'InputChannel')
    }

    if (entity.SUBCLASS_OF_ID === 0x40f202fd) { // crc32(b'InputChannel')
        return entity
    }
    if (entity instanceof constructors.Channel || entity instanceof constructors.ChannelForbidden) {
        return new constructors.InputChannel({
            channelId: entity.id,
            accessHash: entity.accessHash || 0
        })
    }

    if (entity instanceof constructors.InputPeerChannel) {
        return new constructors.InputChannel({
            channelId: entity.channelId,
            accessHash: entity.accessHash
        })
    }
    _raiseCastFail(entity, 'InputChannel')
}
*/
/**
 Similar to :meth:`get_input_peer`, but for :tl:`InputUser`'s alone.

 .. important::

 This method does not validate for invalid general-purpose access
 hashes, unlike `get_input_peer`. Consider using instead:
 ``get_input_channel(get_input_peer(channel))``.

 * @param entity
 */
/* CONTEST
function getInputUser(entity) {
    if (entity.SUBCLASS_OF_ID === undefined) {
        _raiseCastFail(entity, 'InputUser')
    }
    if (entity.SUBCLASS_OF_ID === 0xe669bf46) { // crc32(b'InputUser')
        return entity
    }

    if (entity instanceof constructors.User) {
        if (entity.isSelf) {
            return new constructors.InputPeerSelf()
        } else {
            return new constructors.InputUser({
                userId: entity.id,
                accessHash: entity.accessHash || 0,
            })
        }
    }
    if (entity instanceof constructors.InputPeerSelf) {
        return new constructors.InputPeerSelf()
    }
    if (entity instanceof constructors.UserEmpty || entity instanceof constructors.InputPeerEmpty) {
        return new constructors.InputUserEmpty()
    }

    if (entity instanceof constructors.UserFull) {
        return getInputUser(entity.user)
    }

    if (entity instanceof constructors.InputPeerUser) {
        return new constructors.InputUser({
            userId: entity.userId,
            accessHash: entity.accessHash
        })
    }

    _raiseCastFail(entity, 'InputUser')
}
*/
/**
 Similar to :meth:`get_input_peer`, but for dialogs
 * @param dialog
 */
/* CONTEST
function getInputDialog(dialog) {
    try {
        if (dialog.SUBCLASS_OF_ID === 0xa21c9795) { // crc32(b'InputDialogPeer')
            return dialog
        }
        if (dialog.SUBCLASS_OF_ID === 0xc91c90b6) { // crc32(b'InputPeer')
            return new constructors.InputDialogPeer({ peer: dialog })
        }
    } catch (e) {
        _raiseCastFail(dialog, 'InputDialogPeer')
    }

    try {
        return new constructors.InputDialogPeer(getInputPeer(dialog))
        // eslint-disable-next-line no-empty
    } catch (e) {

    }
    _raiseCastFail(dialog, 'InputDialogPeer')
}
*/

/* CONTEST

function getInputMessage(message) {
    try {
        if (typeof message == 'number') { // This case is really common too
            return new constructors.InputMessageID({
                id: message,
            })
        } else if (message.SUBCLASS_OF_ID === 0x54b6bcc5) { // crc32(b'InputMessage')
            return message
        } else if (message.SUBCLASS_OF_ID === 0x790009e3) { // crc32(b'Message')
            return new constructors.InputMessageID(message.id)
        }
        // eslint-disable-next-line no-empty
    } catch (e) {
    }

    _raiseCastFail(message, 'InputMessage')
}
*/

/**
 * Adds the JPG header and footer to a stripped image.
 * Ported from https://github.com/telegramdesktop/
 * tdesktop/blob/bec39d89e19670eb436dc794a8f20b657cb87c71/Telegram/SourceFiles/ui/image/image.cpp#L225

 * @param stripped{Buffer}
 * @returns {Buffer}
 */
function strippedPhotoToJpg(stripped) {
  // Note: Changes here should update _stripped_real_length
  if (stripped.length < 3 || stripped[0] !== 1) {
    return stripped;
  }
  const header = Buffer.from(JPEG_HEADER);
  // eslint-disable-next-line prefer-destructuring
  header[164] = stripped[1];
  // eslint-disable-next-line prefer-destructuring
  header[166] = stripped[2];
  return Buffer.concat([header, stripped.slice(3), JPEG_FOOTER]);
}

/* CONTEST
function getInputLocation(location) {
    try {
        if (!location.SUBCLASS_OF_ID) {
            throw new Error()
        }
        if (location.SUBCLASS_OF_ID === 0x1523d462) {
            return {
                dcId: null,
                inputLocation: location
            }
        }
    } catch (e) {
        _raiseCastFail(location, 'InputFileLocation')
    }
    if (location instanceof constructors.Message) {
        location = location.media
    }

    if (location instanceof constructors.MessageMediaDocument) {
        location = location.document
    } else if (location instanceof constructors.MessageMediaPhoto) {
        location = location.photo
    }

    if (location instanceof constructors.Document) {
        return {
            dcId: location.dcId,
            inputLocation: new constructors.InputDocumentFileLocation({
                id: location.id,
                accessHash: location.accessHash,
                fileReference: location.fileReference,
                thumbSize: '', // Presumably to download one of its thumbnails
            }),
        }
    } else if (location instanceof constructors.Photo) {
        return {
            dcId: location.dcId,
            inputLocation: new constructors.InputPhotoFileLocation({
                id: location.id,
                accessHash: location.accessHash,
                fileReference: location.fileReference,
                thumbSize: location.sizes[location.sizes.length - 1].type,
            }),
        }
    }

    if (location instanceof constructors.FileLocationToBeDeprecated) {
        throw new Error('Unavailable location cannot be used as input')
    }
    _raiseCastFail(location, 'InputFileLocation')
}
*/

/**
 * Gets the appropriated part size when downloading files,
 * given an initial file size.
 * @param fileSize
 * @returns {Number}
 */
function getDownloadPartSize(fileSize) {
  if (fileSize <= 65536) {
    // 64KB
    return 64;
  }
  if (fileSize <= 104857600) {
    // 100MB
    return 128;
  }
  if (fileSize <= 786432000) {
    // 750MB
    return 256;
  }
  if (fileSize <= 2097152000) {
    // 2000MB
    return 512;
  }
  if (fileSize <= 4194304000) {
    // 4000MB
    return 1024;
  }
  throw new Error('File size too large');
}

/**
 * Gets the appropriated part size when uploading files,
 * given an initial file size.
 * @param fileSize
 * @returns {Number}
 */
function getUploadPartSize(fileSize) {
  if (fileSize <= 104857600) {
    // 100MB
    return 128;
  }
  if (fileSize <= 786432000) {
    // 750MB
    return 256;
  }
  if (fileSize <= 2097152000) {
    // 2000MB
    return 512;
  }
  if (fileSize <= 4194304000) {
    // 4000MB
    return 512;
  }
  throw new Error('File size too large');
}

/* CONTEST
function getPeer(peer) {
    try {
        if (typeof peer === 'number') {
            const res = resolveId(peer)

            if (res[1] === constructors.PeerChannel) {
                return new res[1]({ channelId: res[0] })
            } else if (res[1] === constructors.PeerChat) {
                return new res[1]({ chatId: res[0] })
            } else {
                return new res[1]({ userId: res[0] })
            }
        }
        if (peer.SUBCLASS_OF_ID === undefined) {
            throw new Error()
        }
        if (peer.SUBCLASS_OF_ID === 0x2d45687) {
            return peer
        } else if (peer instanceof constructors.contacts.ResolvedPeer ||
            peer instanceof constructors.InputNotifyPeer || peer instanceof constructors.TopPeer ||
            peer instanceof constructors.Dialog || peer instanceof constructors.DialogPeer) {
            return peer.peer
        } else if (peer instanceof constructors.ChannelFull) {
            return new constructors.PeerChannel({ channelId: peer.id })
        }
        if (peer.SUBCLASS_OF_ID === 0x7d7c6f86 || peer.SUBCLASS_OF_ID === 0xd9c7fc18) {
            // ChatParticipant, ChannelParticipant
            return new constructors.PeerUser({ userId: peer.userId })
        }
        peer = getInputPeer(peer, false, false)

        if (peer instanceof constructors.InputPeerUser) {
            return new constructors.PeerUser({ userId: peer.userId })
        } else if (peer instanceof constructors.InputPeerChat) {
            return new constructors.PeerChat({ chatId: peer.chatId })
        } else if (peer instanceof constructors.InputPeerChannel) {
            return new constructors.PeerChannel({ channelId: peer.channelId })
        }
        // eslint-disable-next-line no-empty
    } catch (e) {
        console.log(e)
    }
    _raiseCastFail(peer, 'peer')
}
*/

/**
 Convert the given peer into its marked ID by default.

 This "mark" comes from the "bot api" format, and with it the peer type
 can be identified back. User ID is left unmodified, chat ID is negated,
 and channel ID is prefixed with -100:

 * ``userId``
 * ``-chatId``
 * ``-100channel_id``

 The original ID and the peer type class can be returned with
 a call to :meth:`resolve_id(marked_id)`.
 * @param peer
 * @param addMark
 */
/* CONTEST
function getPeerId(peer, addMark = true) {
    // First we assert it's a Peer TLObject, or early return for integers
    if (typeof peer == 'number') {
        return addMark ? peer : resolveId(peer)[0]
    }

    // Tell the user to use their client to resolve InputPeerSelf if we got one
    if (peer instanceof constructors.InputPeerSelf) {
        _raiseCastFail(peer, 'int (you might want to use client.get_peer_id)')
    }

    try {
        peer = getPeer(peer)
    } catch (e) {
        _raiseCastFail(peer, 'int')
    }
    if (peer instanceof constructors.PeerUser) {
        return peer.userId
    } else if (peer instanceof constructors.PeerChat) {
        // Check in case the user mixed things up to avoid blowing up
        if (!(0 < peer.chatId <= 0x7fffffff)) {
            peer.chatId = resolveId(peer.chatId)[0]
        }

        return addMark ? -(peer.chatId) : peer.chatId
    } else { // if (peer instanceof constructors.PeerChannel)
        // Check in case the user mixed things up to avoid blowing up
        if (!(0 < peer.channelId <= 0x7fffffff)) {
            peer.channelId = resolveId(peer.channelId)[0]
        }
        if (!addMark) {
            return peer.channelId
        }
        // Concat -100 through math tricks, .to_supergroup() on
        // Madeline IDs will be strictly positive -> log works.
        try {
            return -(peer.channelId + Math.pow(10, Math.floor(Math.log10(peer.channelId) + 3)))
        } catch (e) {
            throw new Error('Cannot get marked ID of a channel unless its ID is strictly positive')
        }
    }
}
*/
/**
 * Given a marked ID, returns the original ID and its :tl:`Peer` type.
 * @param markedId
 */
/* CONTEST
function resolveId(markedId) {
    if (markedId >= 0) {
        return [markedId, constructors.PeerUser]
    }

    // There have been report of chat IDs being 10000xyz, which means their
    // marked version is -10000xyz, which in turn looks like a channel but
    // it becomes 00xyz (= xyz). Hence, we must assert that there are only
    // two zeroes.
    const m = markedId.toString()
        .match(/-100([^0]\d*)/)
    if (m) {
        return [parseInt(m[1]), constructors.PeerChannel]
    }
    return [-markedId, constructors.PeerChat]
}
*/

/**
 * returns an entity pair
 * @param entityId
 * @param entities
 * @param cache
 * @param getInputPeer
 * @returns {{inputEntity: *, entity: *}}
 * @private
 */

/* CONTEST

function _getEntityPair(entityId, entities, cache, getInputPeer = getInputPeer) {
    const entity = entities.get(entityId)
    let inputEntity = cache[entityId]
    if (inputEntity === undefined) {
        try {
            inputEntity = getInputPeer(inputEntity)
        } catch (e) {
            inputEntity = null
        }
    }
    return {
        entity,
        inputEntity
    }
}
*/

function getMessageId(message) {
  if (message === undefined) {
    return undefined;
  }
  if (typeof message === 'number') {
    return message;
  }
  if (message.SUBCLASS_OF_ID === 0x790009e3) {
    // crc32(b'Message')
    return message.id;
  }
  throw new Error(`Invalid message type: ${message.constructor.name}`);
}

/**
 Parses the given username or channel access hash, given
 a string, username or URL. Returns a tuple consisting of
 both the stripped, lowercase username and whether it is
 a joinchat/ hash (in which case is not lowercase'd).

 Returns ``(None, False)`` if the ``username`` or link is not valid.

 * @param username {string}
 */

/* CONTEST

function parseUsername(username) {
    username = username.trim()
    const m = username.match(USERNAME_RE) || username.match(TG_JOIN_RE)
    if (m) {
        username = username.replace(m[0], '')
        if (m[1]) {
            return {
                username: username,
                isInvite: true
            }
        } else {
            username = rtrim(username, '/')
        }
    }
    if (username.match(VALID_USERNAME_RE)) {
        return {
            username: username.toLowerCase(),
            isInvite: false
        }
    } else {
        return {
            username: null,
            isInvite: false
        }
    }
}

function rtrim(s, mask) {
    while (~mask.indexOf(s[s.length - 1])) {
        s = s.slice(0, -1)
    }
    return s
}

 */

/**
 * Gets the display name for the given :tl:`User`,
 :tl:`Chat` or :tl:`Channel`. Returns an empty string otherwise
 * @param entity
 */
function getDisplayName(entity) {
  if (entity instanceof constructors.User) {
    if (entity.lastName && entity.firstName) {
      return `${entity.firstName} ${entity.lastName}`;
    } else if (entity.firstName) {
      return entity.firstName;
    } else if (entity.lastName) {
      return entity.lastName;
    } else {
      return '';
    }
  } else if (entity instanceof constructors.Chat || entity instanceof constructors.Channel) {
    return entity.title;
  }
  return '';
}

/**
 * check if a given item is an array like or not
 * @param item
 * @returns {boolean}
 */

/* CONTEST
Duplicate ?
function isListLike(item) {
    return (
        Array.isArray(item) ||
        (Boolean(item) &&
            typeof item === 'object' &&
            typeof (item.length) === 'number' &&
            (item.length === 0 ||
                (item.length > 0 &&
                    (item.length - 1) in item)
            )
        )
    )
}
*/
/**
 * Returns the appropriate DC based on the id
 * @param dcId the id of the DC.
 * @param downloadDC whether to use -1 DCs or not
 * (These only support downloading/uploading and not creating a new AUTH key)
 * @return {{port: number, ipAddress: string, id: number}}
 */
function getDC(dcId) {
  let downloadDC = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // TODO Move to external config
  switch (dcId) {
    case 1:
      return {
        id: 1,
        ipAddress: `zws1${downloadDC ? '-1' : ''}.web.telegram.org`,
        port: 443
      };
    case 2:
      return {
        id: 2,
        ipAddress: `zws2${downloadDC ? '-1' : ''}.web.telegram.org`,
        port: 443
      };
    case 3:
      return {
        id: 3,
        ipAddress: `zws3${downloadDC ? '-1' : ''}.web.telegram.org`,
        port: 443
      };
    case 4:
      return {
        id: 4,
        ipAddress: `zws4${downloadDC ? '-1' : ''}.web.telegram.org`,
        port: 443
      };
    case 5:
      return {
        id: 5,
        ipAddress: `zws5${downloadDC ? '-1' : ''}.web.telegram.org`,
        port: 443
      };
    default:
      throw new Error(`Cannot find the DC with the ID of ${dcId}`);
  }
  // TODO chose based on current connection method
  /*
  if (!this._config) {
      this._config = await this.invoke(new requests.help.GetConfig())
  }
  if (cdn && !this._cdnConfig) {
      this._cdnConfig = await this.invoke(new requests.help.GetCdnConfig())
      for (const pk of this._cdnConfig.publicKeys) {
          addKey(pk.publicKey)
      }
  }
  for (const DC of this._config.dcOptions) {
      if (DC.id === dcId && Boolean(DC.ipv6) === this._useIPV6 && Boolean(DC.cdn) === cdn) {
          return DC
      }
  } */
}
module.exports = {
  getMessageId,
  // _getEntityPair,
  // getInputMessage,
  // getInputDialog,
  // getInputUser,
  // getInputChannel,
  getInputPeer,
  // parsePhone,
  // parseUsername,
  // getPeer,
  // getPeerId,
  getDisplayName,
  // resolveId,
  // isListLike,
  getDownloadPartSize,
  getUploadPartSize,
  // getInputLocation,
  strippedPhotoToJpg,
  getDC
};

/***/ }),

/***/ "./src/lib/gramjs/Version.js":
/*!***********************************!*\
  !*** ./src/lib/gramjs/Version.js ***!
  \***********************************/
/***/ ((module) => {

module.exports = '0.0.2';

/***/ }),

/***/ "./src/lib/gramjs/client/2fa.ts":
/*!**************************************!*\
  !*** ./src/lib/gramjs/client/2fa.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTmpPassword: () => (/* binding */ getTmpPassword),
/* harmony export */   updateTwoFaSettings: () => (/* binding */ updateTwoFaSettings)
/* harmony export */ });
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tl/api */ "./src/lib/gramjs/tl/api.js");
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tl_api__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Password__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Password */ "./src/lib/gramjs/Password.js");
/* harmony import */ var _Password__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Password__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errors */ "./src/lib/gramjs/errors/index.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_errors__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
// eslint-disable-next-line import/no-named-default




/**
 * Changes the 2FA settings of the logged in user.
 Note that this method may be *incredibly* slow depending on the
 prime numbers that must be used during the process to make sure
 that everything is safe.

 Has no effect if both current and new password are omitted.

 * @param client: The telegram client instance
 * @param isCheckPassword: Must be ``true`` if you want to check the current password
 * @param currentPassword: The current password, to authorize changing to ``new_password``.
 Must be set if changing existing 2FA settings.
 Must **not** be set if 2FA is currently disabled.
 Passing this by itself will remove 2FA (if correct).
 * @param newPassword: The password to set as 2FA.
 If 2FA was already enabled, ``currentPassword`` **must** be set.
 Leaving this blank or `undefined` will remove the password.
 * @param hint: Hint to be displayed by Telegram when it asks for 2FA.
 Must be set when changing or creating a new password.
 Has no effect if ``newPassword`` is not set.
 * @param email: Recovery and verification email. If present, you must also
 set `emailCodeCallback`, else it raises an Error.
 * @param emailCodeCallback: If an email is provided, a callback that returns the code sent
 to it must also be set. This callback may be asynchronous.
 It should return a string with the code. The length of the
 code will be passed to the callback as an input parameter.

 If the callback returns an invalid code, it will raise an rpc error with the message
 ``CODE_INVALID``

 * @returns Promise<void>
 * @throws this method can throw:
 "PASSWORD_HASH_INVALID" if you entered a wrong password (or set it to undefined).
 "EMAIL_INVALID" if the entered email is wrong
 "EMAIL_HASH_EXPIRED" if the user took too long to verify their email
 */
async function updateTwoFaSettings(client, _ref) {
  let {
    isCheckPassword,
    currentPassword,
    newPassword,
    hint = '',
    email,
    emailCodeCallback,
    onEmailCodeError
  } = _ref;
  if (!newPassword && !currentPassword) {
    throw new Error('Neither `currentPassword` nor `newPassword` is present');
  }
  if (email && !(emailCodeCallback && onEmailCodeError)) {
    throw new Error('`email` present without `emailCodeCallback` and `onEmailCodeError`');
  }
  const pwd = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().account).GetPassword());
  if (!(pwd.newAlgo instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().PasswordKdfAlgoUnknown))) {
    pwd.newAlgo.salt1 = Buffer.concat([pwd.newAlgo.salt1, (0,_Helpers__WEBPACK_IMPORTED_MODULE_1__.generateRandomBytes)(32)]);
  }
  if (!pwd.hasPassword && currentPassword) {
    currentPassword = undefined;
  }
  const password = currentPassword ? await (0,_Password__WEBPACK_IMPORTED_MODULE_2__.computeCheck)(pwd, currentPassword) : new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().InputCheckPasswordEmpty)();
  if (isCheckPassword) {
    await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).CheckPassword({
      password
    }));
    return;
  }
  try {
    await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().account).UpdatePasswordSettings({
      password,
      newSettings: new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().account).PasswordInputSettings({
        newAlgo: pwd.newAlgo,
        newPasswordHash: newPassword ? await (0,_Password__WEBPACK_IMPORTED_MODULE_2__.computeDigest)(pwd.newAlgo, newPassword) : Buffer.alloc(0),
        hint,
        email,
        // not explained what it does and it seems to always be set to empty in tdesktop
        newSecureSettings: undefined
      })
    }));
  } catch (e) {
    if (e instanceof (_errors__WEBPACK_IMPORTED_MODULE_3___default().EmailUnconfirmedError)) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const code = await emailCodeCallback(e.codeLength);
          if (!code) {
            throw new Error('Code is empty');
          }
          await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().account).ConfirmPasswordEmail({
            code
          }));
          break;
        } catch (err) {
          onEmailCodeError(err);
        }
      }
    } else {
      throw e;
    }
  }
}
async function getTmpPassword(client, currentPassword) {
  let ttl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;
  const pwd = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().account).GetPassword());
  if (!pwd) {
    return undefined;
  }
  const inputPassword = await (0,_Password__WEBPACK_IMPORTED_MODULE_2__.computeCheck)(pwd, currentPassword);
  try {
    const result = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().account).GetTmpPassword({
      password: inputPassword,
      period: ttl
    }));
    return result;
  } catch (err) {
    if (err.message === 'PASSWORD_HASH_INVALID') {
      return {
        error: err.message
      };
    }
    throw err;
  }
}

/***/ }),

/***/ "./src/lib/gramjs/client/TelegramClient.js":
/*!*************************************************!*\
  !*** ./src/lib/gramjs/client/TelegramClient.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const os = __webpack_require__(/*! os */ "./node_modules/os-browserify/browser.js");
const Logger = __webpack_require__(/*! ../extensions/Logger */ "./src/lib/gramjs/extensions/Logger.js");
const {
  sleep
} = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
const errors = __webpack_require__(/*! ../errors */ "./src/lib/gramjs/errors/index.js");
const MemorySession = __webpack_require__(/*! ../sessions/Memory */ "./src/lib/gramjs/sessions/Memory.js");
const Helpers = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
const utils = __webpack_require__(/*! ../Utils */ "./src/lib/gramjs/Utils.js");
const Session = __webpack_require__(/*! ../sessions/Abstract */ "./src/lib/gramjs/sessions/Abstract.js");
const {
  LAYER
} = __webpack_require__(/*! ../tl/AllTLObjects */ "./src/lib/gramjs/tl/AllTLObjects.js");
const {
  constructors,
  requests
} = __webpack_require__(/*! ../tl */ "./src/lib/gramjs/tl/index.js");
const {
  ConnectionTCPObfuscated,
  MTProtoSender,
  UpdateConnectionState,
  HttpConnection
} = __webpack_require__(/*! ../network */ "./src/lib/gramjs/network/index.js");
const {
  authFlow,
  checkAuthorization
} = __webpack_require__(/*! ./auth */ "./src/lib/gramjs/client/auth.ts");
const {
  downloadFile
} = __webpack_require__(/*! ./downloadFile */ "./src/lib/gramjs/client/downloadFile.ts");
const {
  uploadFile
} = __webpack_require__(/*! ./uploadFile */ "./src/lib/gramjs/client/uploadFile.ts");
const {
  updateTwoFaSettings,
  getTmpPassword
} = __webpack_require__(/*! ./2fa */ "./src/lib/gramjs/client/2fa.ts");
const RequestState = __webpack_require__(/*! ../network/RequestState */ "./src/lib/gramjs/network/RequestState.js");
const Deferred = (__webpack_require__(/*! ../../../util/Deferred */ "./src/util/Deferred.ts")["default"]);
const DEFAULT_DC_ID = 2;
const DEFAULT_WEBDOCUMENT_DC_ID = 4;
const EXPORTED_SENDER_RECONNECT_TIMEOUT = 1000; // 1 sec
const EXPORTED_SENDER_RELEASE_TIMEOUT = 30000; // 30 sec
const WEBDOCUMENT_REQUEST_PART_SIZE = 131072; // 128kb

const PING_INTERVAL = 3000; // 3 sec
const PING_TIMEOUT = 5000; // 5 sec
const PING_FAIL_ATTEMPTS = 3;
const PING_FAIL_INTERVAL = 100; // ms

// An unusually long interval is a sign of returning from background mode...
const PING_INTERVAL_TO_WAKE_UP = 5000; // 5 sec
// ... so we send a quick "wake-up" ping to confirm than connection was dropped ASAP
const PING_WAKE_UP_TIMEOUT = 3000; // 3 sec
// We also send a warning to the user even a bit more quickly
const PING_WAKE_UP_WARNING_TIMEOUT = 1000; // 1 sec

const PING_DISCONNECT_DELAY = 60000; // 1 min

// All types
const sizeTypes = ['u', 'v', 'w', 'y', 'd', 'x', 'c', 'm', 'b', 'a', 's', 'f'];
class TelegramClient {
  /**
   *
   * @param session {StringSession|LocalStorageSession}
   * @param apiId
   * @param apiHash
   * @param opts
   */
  constructor(session, apiId, apiHash) {
    let opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TelegramClient.DEFAULT_OPTIONS;
    if (!apiId || !apiHash) {
      throw Error('Your API ID or Hash are invalid. Please read "Requirements" on README.md');
    }
    const args = {
      ...TelegramClient.DEFAULT_OPTIONS,
      ...opts
    };
    this.apiId = apiId;
    this.apiHash = apiHash;
    this.defaultDcId = args.dcId || DEFAULT_DC_ID;
    this._useIPV6 = args.useIPV6;
    this._shouldForceHttpTransport = args.shouldForceHttpTransport;
    this._shouldAllowHttpTransport = args.shouldAllowHttpTransport;
    this._shouldDebugExportedSenders = args.shouldDebugExportedSenders;
    // this._entityCache = new Set()
    if (typeof args.baseLogger === 'string') {
      this._log = new Logger();
    } else {
      this._log = args.baseLogger;
    }
    // Determine what session we will use
    if (typeof session === 'string' || !session) {
      try {
        throw new Error('not implemented');
      } catch (e) {
        session = new MemorySession();
      }
    } else if (!(session instanceof Session)) {
      throw new Error('The given session must be str or a session instance');
    }
    this.floodSleepLimit = args.floodSleepLimit;
    this._eventBuilders = [];
    this._phoneCodeHash = {};
    this.session = session;
    // this._entityCache = EntityCache();
    this.apiId = parseInt(apiId, 10);
    this.apiHash = apiHash;
    this._requestRetries = args.requestRetries;
    this._connectionRetries = args.connectionRetries;
    this._connectionRetriesToFallback = args.connectionRetriesToFallback;
    this._retryDelay = args.retryDelay || 0;
    this._retryMainConnectionDelay = args.retryMainConnectionDelay || 0;
    if (args.proxy) {
      this._log.warn('proxies are not supported');
    }
    this._proxy = args.proxy;
    this._timeout = args.timeout;
    this._autoReconnect = args.autoReconnect;
    this._connection = args.connection;
    this._fallbackConnection = args.fallbackConnection;
    // TODO add proxy support

    this._floodWaitedRequests = {};
    this._initWith = x => {
      return new requests.InvokeWithLayer({
        layer: LAYER,
        query: new requests.InitConnection({
          apiId: this.apiId,
          deviceModel: args.deviceModel || os.type().toString() || 'Unknown',
          systemVersion: args.systemVersion || os.release().toString() || '1.0',
          appVersion: args.appVersion || '1.0',
          langCode: args.langCode,
          langPack: 'weba',
          systemLangCode: args.systemLangCode,
          query: x,
          proxy: undefined // no proxies yet.
        })
      });
    };
    this._args = args;
    // These will be set later
    this._config = undefined;
    this.phoneCodeHashes = [];
    this._exportedSenderPromises = {};
    this._exportedSenderRefCounter = {};
    this._waitingForAuthKey = {};
    this._exportedSenderReleaseTimeouts = {};
    this._additionalDcsDisabled = args.additionalDcsDisabled;
    this._loopStarted = false;
    this._isSwitchingDc = false;
    this._destroyed = false;
    this._connectedDeferred = new Deferred();
  }

  // region Connecting

  /**
   * Connects to the Telegram servers, executing authentication if required.
   * Note that authenticating to the Telegram servers is not the same as authenticating
   * the app, which requires to send a code first.
   * @returns {Promise<void>}
   */
  async connect() {
    await this._initSession();
    if (this._sender === undefined) {
      // only init sender once to avoid multiple loops.
      this._sender = new MTProtoSender(this.session.getAuthKey(), {
        logger: this._log,
        dcId: this.session.dcId,
        retries: this._connectionRetries,
        retriesToFallback: this._connectionRetriesToFallback,
        shouldForceHttpTransport: this._shouldForceHttpTransport,
        shouldAllowHttpTransport: this._shouldAllowHttpTransport,
        delay: this._retryDelay,
        retryMainConnectionDelay: this._retryMainConnectionDelay,
        autoReconnect: this._autoReconnect,
        connectTimeout: this._timeout,
        authKeyCallback: this._authKeyCallback.bind(this),
        updateCallback: this._handleUpdate.bind(this),
        getShouldDebugExportedSenders: this.getShouldDebugExportedSenders.bind(this),
        isMainSender: true
      });
    }
    // set defaults vars
    this._sender.userDisconnected = false;
    this._sender._user_connected = false;
    this._sender.isReconnecting = false;
    this._sender._disconnected = true;
    const connection = new this._connection(this.session.serverAddress, this.session.port, this.session.dcId, this._log, this._args.testServers);
    const fallbackConnection = new this._fallbackConnection(this.session.serverAddress, this.session.port, this.session.dcId, this._log, this._args.testServers);
    const newConnection = await this._sender.connect(connection, undefined, fallbackConnection);
    if (!newConnection) {
      // we're already connected so no need to reset auth key.
      if (!this._loopStarted) {
        this._updateLoop();
        this._loopStarted = true;
      }
      return;
    }
    this.session.setAuthKey(this._sender.authKey);
    await this._sender.send(this._initWith(new requests.help.GetConfig({})));
    if (!this._loopStarted) {
      this._updateLoop();
      this._loopStarted = true;
    }
    this._connectedDeferred.resolve();
    this._isSwitchingDc = false;

    // Prepare file connection on current DC to speed up initial media loading
    const mediaSender = await this._borrowExportedSender(this.session.dcId, false, undefined, 0, this.isPremium);
    if (mediaSender) this.releaseExportedSender(mediaSender);
  }
  async _initSession() {
    await this.session.load();
    if (!this.session.serverAddress || this.session.serverAddress.includes(':') !== this._useIPV6) {
      const DC = utils.getDC(this.defaultDcId);
      // TODO Fill IP addresses for when `this._useIPV6` is used
      this.session.setDC(this.defaultDcId, DC.ipAddress, this._args.useWSS ? 443 : 80);
    }
  }
  setPingCallback(callback) {
    this.pingCallback = callback;
  }
  async setForceHttpTransport(forceHttpTransport) {
    this._shouldForceHttpTransport = forceHttpTransport;
    await this.disconnect();
    this._sender = undefined;
    await this.connect();
  }
  async setAllowHttpTransport(allowHttpTransport) {
    this._shouldAllowHttpTransport = allowHttpTransport;
    await this.disconnect();
    this._sender = undefined;
    await this.connect();
  }
  setShouldDebugExportedSenders(shouldDebugExportedSenders) {
    this._shouldDebugExportedSenders = shouldDebugExportedSenders;
  }
  getShouldDebugExportedSenders() {
    return this._shouldDebugExportedSenders;
  }
  async _updateLoop() {
    let lastPongAt;
    while (!this._destroyed) {
      await Helpers.sleep(PING_INTERVAL);
      if (this._sender.isReconnecting || this._isSwitchingDc) {
        lastPongAt = undefined;
        continue;
      }
      try {
        const ping = () => {
          if (this._destroyed) {
            return undefined;
          }
          return this._sender.send(new requests.PingDelayDisconnect({
            pingId: Helpers.getRandomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
            disconnectDelay: PING_DISCONNECT_DELAY
          }));
        };
        const pingAt = Date.now();
        const lastInterval = lastPongAt ? pingAt - lastPongAt : undefined;
        if (!lastInterval || lastInterval < PING_INTERVAL_TO_WAKE_UP) {
          await attempts(() => timeout(ping, PING_TIMEOUT), PING_FAIL_ATTEMPTS, PING_FAIL_INTERVAL);
        } else {
          let wakeUpWarningTimeout = setTimeout(() => {
            this._handleUpdate(new UpdateConnectionState(UpdateConnectionState.disconnected));
            wakeUpWarningTimeout = undefined;
          }, PING_WAKE_UP_WARNING_TIMEOUT);
          await timeout(ping, PING_WAKE_UP_TIMEOUT);
          if (wakeUpWarningTimeout) {
            clearTimeout(wakeUpWarningTimeout);
            wakeUpWarningTimeout = undefined;
          }
          this._handleUpdate(new UpdateConnectionState(UpdateConnectionState.connected));
        }
        lastPongAt = Date.now();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);
        lastPongAt = undefined;
        if (this._sender.isReconnecting || this._isSwitchingDc) {
          continue;
        }
        if (this._destroyed) {
          break;
        }
        this._sender.reconnect();
      }

      // We need to send some content-related request at least hourly
      // for Telegram to keep delivering updates, otherwise they will
      // just stop even if we're connected. Do so every 30 minutes.

      if (Date.now() - this._lastRequest > 30 * 60 * 1000) {
        try {
          await this.pingCallback();
        } catch (e) {
          // we don't care about errors here
        }
        lastPongAt = undefined;
      }
    }
    await this.disconnect();
  }

  /**
   * Disconnects from the Telegram server
   * @returns {Promise<void>}
   */
  async disconnect() {
    if (this._sender) {
      await this._sender.disconnect();
    }
    await Promise.all(Object.values(this._exportedSenderPromises).map(promises => {
      return Object.values(promises).map(promise => {
        return promise && promise.then(sender => {
          if (sender) {
            return sender.disconnect();
          }
          return undefined;
        });
      });
    }).flat());
    Object.values(this._exportedSenderReleaseTimeouts).forEach(timeouts => {
      Object.values(timeouts).forEach(releaseTimeout => {
        clearTimeout(releaseTimeout);
      });
    });
    this._exportedSenderRefCounter = {};
    this._exportedSenderPromises = {};
    this._waitingForAuthKey = {};
  }

  /**
   * Disconnects all senders and removes all handlers
   * @returns {Promise<void>}
   */
  async destroy() {
    this._destroyed = true;
    try {
      await this.disconnect();
      this._sender.destroy();
    } catch (err) {
      // Do nothing
    }
    this.session.delete();
    this._eventBuilders = [];
  }
  async _switchDC(newDc) {
    this._log.info(`Reconnecting to new data center ${newDc}`);
    const DC = utils.getDC(newDc);
    this.session.setDC(newDc, DC.ipAddress, DC.port);
    // authKey's are associated with a server, which has now changed
    // so it's not valid anymore. Set to None to force recreating it.
    await this._sender.authKey.setKey(undefined);
    this.session.setAuthKey(undefined);
    this._isSwitchingDc = true;
    await this.disconnect();
    this._sender = undefined;
    return this.connect();
  }
  _authKeyCallback(authKey, dcId) {
    this.session.setAuthKey(authKey, dcId);
  }

  // endregion
  // export region

  async _cleanupExportedSender(dcId, index) {
    if (this.session.dcId !== dcId) {
      this.session.setAuthKey(undefined, dcId);
    }
    // eslint-disable-next-line no-console
    if (this._shouldDebugExportedSenders) console.log(`🧹 Cleanup idx=${index} dcId=${dcId}`);
    const sender = await this._exportedSenderPromises[dcId][index];
    delete this._exportedSenderPromises[dcId][index];
    delete this._exportedSenderRefCounter[dcId][index];
    await sender.disconnect();
  }
  async _cleanupExportedSenders(dcId) {
    const promises = Object.values(this._exportedSenderPromises[dcId]);
    if (!promises.length) {
      return;
    }
    if (this.session.dcId !== dcId) {
      this.session.setAuthKey(undefined, dcId);
    }
    this._exportedSenderPromises[dcId] = {};
    this._exportedSenderRefCounter[dcId] = {};
    await Promise.all(promises.map(async promise => {
      const sender = await promise;
      await sender.disconnect();
    }));
  }
  async _connectSender(sender, dcId, index) {
    let isPremium = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    // if we don't already have an auth key we want to use normal DCs not -1
    let hasAuthKey = Boolean(sender.authKey.getKey());
    let firstConnectResolver;
    if (!hasAuthKey) {
      if (this._waitingForAuthKey[dcId]) {
        await this._waitingForAuthKey[dcId];
        const authKey = this.session.getAuthKey(dcId);
        await sender.authKey.setKey(authKey.getKey());
        hasAuthKey = Boolean(sender.authKey.getKey());
      } else {
        this._waitingForAuthKey[dcId] = new Promise(resolve => {
          firstConnectResolver = resolve;
        });
      }
    }
    const dc = utils.getDC(dcId, hasAuthKey);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        await sender.connect(new this._connection(dc.ipAddress, dc.port, dcId, this._log, this._args.testServers,
        // Premium DCs are not stable for obtaining auth keys, so need to we first connect to regular ones
        hasAuthKey ? isPremium : false), undefined, new this._fallbackConnection(dc.ipAddress, dc.port, dcId, this._log, this._args.testServers, hasAuthKey ? isPremium : false));
        if (this.session.dcId !== dcId && !sender._authenticated) {
          this._log.info(`Exporting authorization for data center ${dc.ipAddress}`);
          const auth = await this.invoke(new requests.auth.ExportAuthorization({
            dcId
          }));
          const req = this._initWith(new requests.auth.ImportAuthorization({
            id: auth.id,
            bytes: auth.bytes
          }));
          await sender.send(req);
          sender._authenticated = true;
        }
        sender.dcId = dcId;
        sender.userDisconnected = false;
        if (firstConnectResolver) {
          firstConnectResolver();
          delete this._waitingForAuthKey[dcId];
        }
        if (this._shouldDebugExportedSenders) {
          // eslint-disable-next-line no-console
          console.warn(`✅ Connected to exported sender idx=${index} dc=${dcId}`);
        }
        return sender;
      } catch (err) {
        if (this._shouldDebugExportedSenders) {
          // eslint-disable-next-line no-console
          console.error(`☠️ ERROR! idx=${index} dcId=${dcId} ${err.message}`);
        }
        // eslint-disable-next-line no-console
        console.error(err);
        await Helpers.sleep(1000);
        await sender.disconnect();
      }
    }
  }
  releaseExportedSender(sender) {
    const dcId = sender._dcId;
    const index = sender._senderIndex;
    if (!this._exportedSenderRefCounter[dcId]) return;
    if (!this._exportedSenderRefCounter[dcId][index]) return;
    this._exportedSenderRefCounter[dcId][index] -= 1;
    if (this._exportedSenderRefCounter[dcId][index] <= 0) {
      if (!this._exportedSenderReleaseTimeouts[dcId]) this._exportedSenderReleaseTimeouts[dcId] = {};
      this._exportedSenderReleaseTimeouts[dcId][index] = setTimeout(() => {
        // eslint-disable-next-line no-console
        if (this._shouldDebugExportedSenders) console.log(`[CC] [idx=${index} dcId=${dcId}] 🚪 Release`);
        sender.disconnect();
        this._exportedSenderReleaseTimeouts[dcId][index] = undefined;
        this._exportedSenderPromises[dcId][index] = undefined;
      }, EXPORTED_SENDER_RELEASE_TIMEOUT);
    }
  }
  async _borrowExportedSender(dcId, shouldReconnect, existingSender, index, isPremium) {
    if (this._additionalDcsDisabled) {
      return undefined;
    }
    const i = index || 0;
    if (!this._exportedSenderPromises[dcId]) this._exportedSenderPromises[dcId] = {};
    if (!this._exportedSenderRefCounter[dcId]) this._exportedSenderRefCounter[dcId] = {};
    if (!this._exportedSenderPromises[dcId][i] || shouldReconnect) {
      if (this._shouldDebugExportedSenders) {
        // eslint-disable-next-line no-console
        console.warn(`🕒 Connecting to exported sender idx=${i} dc=${dcId}` + ` ${shouldReconnect ? '(reconnect)' : ''}`);
      }
      this._exportedSenderRefCounter[dcId][i] = 0;
      this._exportedSenderPromises[dcId][i] = this._connectSender(existingSender || this._createExportedSender(dcId, i), dcId, index, isPremium);
    }
    let sender;
    try {
      sender = await this._exportedSenderPromises[dcId][i];
      if (!sender.isConnected()) {
        if (sender.isConnecting) {
          await Helpers.sleep(EXPORTED_SENDER_RECONNECT_TIMEOUT);
          return this._borrowExportedSender(dcId, false, sender, i, isPremium);
        } else {
          return this._borrowExportedSender(dcId, true, sender, i, isPremium);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return this._borrowExportedSender(dcId, true, undefined, i, isPremium);
    }
    this._exportedSenderRefCounter[dcId][i] += 1;
    if (!this._exportedSenderReleaseTimeouts[dcId]) this._exportedSenderReleaseTimeouts[dcId] = {};
    if (this._exportedSenderReleaseTimeouts[dcId][i]) {
      clearTimeout(this._exportedSenderReleaseTimeouts[dcId][i]);
      this._exportedSenderReleaseTimeouts[dcId][i] = undefined;
    }
    return sender;
  }
  _createExportedSender(dcId, index) {
    return new MTProtoSender(this.session.getAuthKey(dcId), {
      logger: this._log,
      dcId,
      senderIndex: index,
      retries: this._connectionRetries,
      retriesToFallback: this._connectionRetriesToFallback,
      delay: this._retryDelay,
      retryMainConnectionDelay: this._retryMainConnectionDelay,
      shouldForceHttpTransport: this._shouldForceHttpTransport,
      shouldAllowHttpTransport: this._shouldAllowHttpTransport,
      autoReconnect: this._autoReconnect,
      connectTimeout: this._timeout,
      authKeyCallback: this._authKeyCallback.bind(this),
      isMainSender: dcId === this.session.dcId,
      isExported: true,
      updateCallback: this._handleUpdate.bind(this),
      getShouldDebugExportedSenders: this.getShouldDebugExportedSenders.bind(this),
      onConnectionBreak: () => this._cleanupExportedSender(dcId, index)
    });
  }
  getSender(dcId, index, isPremium) {
    return dcId ? this._borrowExportedSender(dcId, undefined, undefined, index, isPremium) : Promise.resolve(this._sender);
  }

  // end region

  // download region

  /**
   * Complete flow to download a file.
   * @param inputLocation {constructors.InputFileLocation}
   * @param [args[partSizeKb] {number}]
   * @param [args[fileSize] {number}]
   * @param [args[progressCallback] {Function}]
   * @param [args[start] {number}]
   * @param [args[end] {number}]
   * @param [args[dcId] {number}]
   * @param [args[workers] {number}]
   * @returns {Promise<Buffer>}
   */
  downloadFile(inputLocation) {
    let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return downloadFile(this, inputLocation, args, this._shouldDebugExportedSenders);
  }
  downloadMedia(entityOrMedia, args) {
    let media;
    if (entityOrMedia instanceof constructors.Message || entityOrMedia instanceof constructors.StoryItem) {
      media = entityOrMedia.media;
    } else if (entityOrMedia instanceof constructors.MessageService) {
      media = entityOrMedia.action.photo;
    } else {
      media = entityOrMedia;
    }
    if (typeof media === 'string') {
      throw new Error('not implemented');
    }
    if (media instanceof constructors.MessageMediaWebPage) {
      if (media.webpage instanceof constructors.WebPage) {
        media = media.webpage.document || media.webpage.photo;
      }
    }
    if (media instanceof constructors.MessageMediaPhoto || media instanceof constructors.Photo) {
      return this._downloadPhoto(media, args);
    } else if (media instanceof constructors.MessageMediaDocument || media instanceof constructors.Document) {
      return this._downloadDocument(media, args);
    } else if (media instanceof constructors.MessageMediaContact) {
      return this._downloadContact(media, args);
    } else if (media instanceof constructors.WebDocument || media instanceof constructors.WebDocumentNoProxy) {
      return this._downloadWebDocument(media, args);
    }
    return undefined;
  }
  downloadProfilePhoto(entity) {
    let isBig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    // ('User', 'Chat', 'UserFull', 'ChatFull')
    const ENTITIES = [0x2da17977, 0xc5af5d94, 0x1f4661b9, 0xd49a2697];
    // ('InputPeer', 'InputUser', 'InputChannel')
    // const INPUTS = [0xc91c90b6, 0xe669bf46, 0x40f202fd]
    // Todo account for input methods
    const sizeType = isBig ? 'x' : 'm';
    let photo;
    if (!ENTITIES.includes(entity.SUBCLASS_OF_ID)) {
      photo = entity;
    } else {
      if (!entity.photo) {
        // Special case: may be a ChatFull with photo:Photo
        if (!entity.chatPhoto) {
          return undefined;
        }
        return this._downloadPhoto(entity.chatPhoto, {
          sizeType
        });
      }
      photo = entity.photo;
    }
    let dcId;
    let loc;
    if (photo instanceof constructors.UserProfilePhoto || photo instanceof constructors.ChatPhoto) {
      dcId = photo.dcId;
      loc = new constructors.InputPeerPhotoFileLocation({
        peer: utils.getInputPeer(entity),
        photoId: photo.photoId,
        big: isBig
      });
    } else {
      // It doesn't make any sense to check if `photo` can be used
      // as input location, because then this method would be able
      // to "download the profile photo of a message", i.e. its
      // media which should be done with `download_media` instead.
      return undefined;
    }
    return this.downloadFile(loc, {
      dcId
    });
  }
  downloadStickerSetThumb(stickerSet) {
    if (!stickerSet.thumbs?.length && !stickerSet.thumbDocumentId) {
      return undefined;
    }
    const {
      thumbVersion
    } = stickerSet;
    if (!stickerSet.thumbDocumentId) {
      return this.downloadFile(new constructors.InputStickerSetThumb({
        stickerset: new constructors.InputStickerSetID({
          id: stickerSet.id,
          accessHash: stickerSet.accessHash
        }),
        thumbVersion
      }), {
        dcId: stickerSet.thumbDcId
      });
    }
    return this.invoke(new constructors.messages.GetCustomEmojiDocuments({
      documentId: [stickerSet.thumbDocumentId]
    })).then(docs => {
      const doc = docs[0];
      return this.downloadFile(new constructors.InputDocumentFileLocation({
        id: doc.id,
        accessHash: doc.accessHash,
        fileReference: doc.fileReference,
        thumbSize: ''
      }), {
        fileSize: doc.size.toJSNumber(),
        dcId: doc.dcId
      });
    });
  }
  _pickFileSize(sizes, sizeType) {
    if (!sizeType || !sizes || !sizes.length) {
      return undefined;
    }
    const indexOfSize = sizeTypes.indexOf(sizeType);
    let size;
    for (let i = indexOfSize; i < sizeTypes.length; i++) {
      size = sizes.find(s => s.type === sizeTypes[i]);
      if (size) {
        return size;
      }
    }
    return undefined;
  }
  _downloadCachedPhotoSize(size) {
    // No need to download anything, simply write the bytes
    let data;
    if (size instanceof constructors.PhotoStrippedSize) {
      data = utils.strippedPhotoToJpg(size.bytes);
    } else {
      data = size.bytes;
    }
    return data;
  }
  _downloadPhoto(photo, args) {
    if (photo instanceof constructors.MessageMediaPhoto) {
      photo = photo.photo;
    }
    if (!(photo instanceof constructors.Photo)) {
      return undefined;
    }
    const maxSize = photo.sizes.reduce((max, current) => {
      if (!current.w) return max;
      return max.w > current.w ? max : current;
    });
    const isVideoSize = args.sizeType === 'u' || args.sizeType === 'v';
    const size = !args.sizeType ? maxSize : this._pickFileSize(isVideoSize ? [...photo.videoSizes, ...photo.sizes] : photo.sizes, args.sizeType);
    if (!size || size instanceof constructors.PhotoSizeEmpty) {
      return undefined;
    }
    if (size instanceof constructors.PhotoCachedSize || size instanceof constructors.PhotoStrippedSize) {
      return this._downloadCachedPhotoSize(size);
    }
    return this.downloadFile(new constructors.InputPhotoFileLocation({
      id: photo.id,
      accessHash: photo.accessHash,
      fileReference: photo.fileReference,
      thumbSize: size.type
    }), {
      dcId: photo.dcId,
      fileSize: size.size || Math.max(...(size.sizes || [])),
      progressCallback: args.progressCallback
    });
  }
  _downloadDocument(doc, args) {
    if (doc instanceof constructors.MessageMediaDocument) {
      doc = doc.document;
    }
    if (!(doc instanceof constructors.Document)) {
      return undefined;
    }
    let size;
    if (args.sizeType) {
      size = doc.thumbs ? this._pickFileSize([...(doc.videoThumbs || []), ...doc.thumbs], args.sizeType) : undefined;
      if (!size && doc.mimeType.startsWith('video/')) {
        return undefined;
      }
      if (size && (size instanceof constructors.PhotoCachedSize || size instanceof constructors.PhotoStrippedSize)) {
        return this._downloadCachedPhotoSize(size);
      }
    }
    return this.downloadFile(new constructors.InputDocumentFileLocation({
      id: doc.id,
      accessHash: doc.accessHash,
      fileReference: doc.fileReference,
      thumbSize: size ? size.type : ''
    }), {
      fileSize: size ? size.size : doc.size.toJSNumber(),
      progressCallback: args.progressCallback,
      start: args.start,
      end: args.end,
      dcId: doc.dcId,
      workers: args.workers
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _downloadContact(media, args) {
    throw new Error('not implemented');
  }
  async _downloadWebDocument(media) {
    if (media.url && !('accessHash' in media)) {
      const arrayBuff = await fetch(media.url).then(res => res.arrayBuffer());
      return Buffer.from(arrayBuff);
    }
    try {
      const buff = [];
      let offset = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const downloaded = new requests.upload.GetWebFile({
          location: new constructors.InputWebFileLocation({
            url: media.url,
            accessHash: media.accessHash
          }),
          offset,
          limit: WEBDOCUMENT_REQUEST_PART_SIZE
        });
        const sender = await this._borrowExportedSender(this._config?.webfileDcId || DEFAULT_WEBDOCUMENT_DC_ID);
        const res = await sender.send(downloaded);
        this.releaseExportedSender(sender);
        offset += 131072;
        if (res.bytes.length) {
          buff.push(res.bytes);
          if (res.bytes.length < WEBDOCUMENT_REQUEST_PART_SIZE) {
            break;
          }
        } else {
          break;
        }
      }
      return Buffer.concat(buff);
    } catch (e) {
      // the file is no longer saved in telegram's cache.
      if (e.message === 'WEBFILE_NOT_AVAILABLE') {
        return Buffer.alloc(0);
      } else {
        throw e;
      }
    }
  }
  async downloadStaticMap(accessHash, long, lat, w, h, zoom, scale, accuracyRadius) {
    try {
      const buff = [];
      let offset = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const downloaded = new requests.upload.GetWebFile({
            location: new constructors.InputWebFileGeoPointLocation({
              geoPoint: new constructors.InputGeoPoint({
                lat,
                long,
                accuracyRadius
              }),
              accessHash,
              w,
              h,
              zoom,
              scale
            }),
            offset,
            limit: WEBDOCUMENT_REQUEST_PART_SIZE
          });
          const sender = await this._borrowExportedSender(DEFAULT_WEBDOCUMENT_DC_ID);
          const res = await sender.send(downloaded);
          this.releaseExportedSender(sender);
          offset += 131072;
          if (res.bytes.length) {
            buff.push(res.bytes);
            if (res.bytes.length < WEBDOCUMENT_REQUEST_PART_SIZE) {
              break;
            }
          } else {
            break;
          }
        } catch (err) {
          if (err instanceof errors.FloodWaitError) {
            // eslint-disable-next-line no-console
            console.warn(`getWebFile: sleeping for ${err.seconds}s on flood wait`);
            await sleep(err.seconds * 1000);
            continue;
          }
        }
      }
      return Buffer.concat(buff);
    } catch (e) {
      // the file is no longer saved in telegram's cache.
      if (e.message === 'WEBFILE_NOT_AVAILABLE') {
        return Buffer.alloc(0);
      } else {
        throw e;
      }
    }
  }

  // region Invoking Telegram request
  /**
   * Invokes a MTProtoRequest (sends and receives it) and returns its result
   * @param request
   * @param dcId Optional dcId to use when sending the request
   * @param abortSignal Optional AbortSignal to cancel the request
   * @param shouldRetryOnTimeout Whether to retry the request if it times out
   * @returns {Promise}
   */

  async invoke(request, dcId, abortSignal) {
    let shouldRetryOnTimeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (request.classType !== 'request') {
      throw new Error('You can only invoke MTProtoRequests');
    }
    const isExported = dcId !== undefined;
    let sender = !isExported ? this._sender : await this.getSender(dcId);
    this._lastRequest = Date.now();
    await this._connectedDeferred.promise;
    const state = new RequestState(request, abortSignal);
    let attempt = 0;
    for (attempt = 0; attempt < this._requestRetries; attempt++) {
      sender.addStateToQueue(state);
      try {
        const result = await state.promise;
        state.finished.resolve();
        if (isExported) this.releaseExportedSender(sender);
        return result;
      } catch (e) {
        if (e instanceof errors.ServerError || e.message === 'RPC_CALL_FAIL' || e.message === 'RPC_MCGET_FAIL') {
          this._log.warn(`Telegram is having internal issues ${e.constructor.name}`);
          await sleep(2000);
        } else if (e instanceof errors.FloodWaitError || e instanceof errors.FloodTestPhoneWaitError) {
          if (e.seconds <= this.floodSleepLimit) {
            this._log.info(`Sleeping for ${e.seconds}s on flood wait`);
            await sleep(e.seconds * 1000);
          } else {
            state.finished.resolve();
            if (isExported) this.releaseExportedSender(sender);
            throw e;
          }
        } else if (e instanceof errors.PhoneMigrateError || e instanceof errors.NetworkMigrateError || e instanceof errors.UserMigrateError) {
          this._log.info(`Phone migrated to ${e.newDc}`);
          const shouldRaise = e instanceof errors.PhoneMigrateError || e instanceof errors.NetworkMigrateError;
          if (shouldRaise && (await checkAuthorization(this))) {
            state.finished.resolve();
            if (isExported) this.releaseExportedSender(sender);
            throw e;
          }
          await this._switchDC(e.newDc);
          if (isExported) this.releaseExportedSender(sender);
          sender = dcId === undefined ? this._sender : await this.getSender(dcId);
        } else if (e instanceof errors.MsgWaitError) {
          // We need to resend this after the old one was confirmed.
          await state.isReady();
          state.after = undefined;
        } else if (e.message === 'CONNECTION_NOT_INITED') {
          await this.disconnect();
          await sleep(2000);
          await this.connect();
        } else if (e instanceof errors.TimedOutError) {
          if (!shouldRetryOnTimeout) {
            state.finished.resolve();
            if (isExported) this.releaseExportedSender(sender);
            throw e;
          }
        } else {
          state.finished.resolve();
          if (isExported) this.releaseExportedSender(sender);
          throw e;
        }
      }
      state.resetPromise();
    }
    if (isExported) this.releaseExportedSender(sender);
    throw new Error(`Request was unsuccessful ${attempt} time(s)`);
  }
  async invokeBeacon(request, dcId) {
    if (request.classType !== 'request') {
      throw new Error('You can only invoke MTProtoRequests');
    }
    const isExported = dcId !== undefined;
    const sender = !isExported ? this._sender : await this.getSender(dcId);
    sender.sendBeacon(request);
    if (isExported) this.releaseExportedSender(sender);
  }
  setIsPremium(isPremium) {
    this.isPremium = isPremium;
  }
  async getMe() {
    try {
      return (await this.invoke(new requests.users.GetUsers({
        id: [new constructors.InputUserSelf()]
      })))[0];
    } catch (e) {
      this._log.warn('error while getting me');
      this._log.warn(e);
    }
    return undefined;
  }
  async loadConfig() {
    if (!this._config) {
      this._config = await this.invoke(new requests.help.GetConfig());
    }
  }
  async start(authParams) {
    if (!this.isConnected()) {
      await this.connect();
    }
    this.loadConfig();
    if (await checkAuthorization(this, authParams.shouldThrowIfUnauthorized)) {
      return;
    }
    const apiCredentials = {
      apiId: this.apiId,
      apiHash: this.apiHash
    };
    await authFlow(this, apiCredentials, authParams);
  }
  uploadFile(fileParams) {
    return uploadFile(this, fileParams, this._shouldDebugExportedSenders);
  }
  updateTwoFaSettings(params) {
    return updateTwoFaSettings(this, params);
  }
  getTmpPassword(currentPassword, ttl) {
    return getTmpPassword(this, currentPassword, ttl);
  }

  // event region
  addEventHandler(callback, event) {
    this._eventBuilders.push([event, callback]);
  }
  _handleUpdate(update) {
    // this.session.processEntities(update)
    // this._entityCache.add(update)

    if (update instanceof constructors.Updates || update instanceof constructors.UpdatesCombined) {
      // TODO deal with entities
      const entities = [];
      for (const x of [...update.users, ...update.chats]) {
        entities.push(x);
      }
      this._processUpdate(update, entities);
    } else if (update instanceof constructors.UpdateShort) {
      this._processUpdate(update.update, undefined);
    } else {
      this._processUpdate(update, undefined);
    }
  }
  _processUpdate(update, entities) {
    update._entities = entities || [];
    const args = {
      update
    };
    this._dispatchUpdate(args);
  }

  // endregion

  // region private methods

  /**
   Gets a full entity from the given string, which may be a phone or
   a username, and processes all the found entities on the session.
   The string may also be a user link, or a channel/chat invite link.
    This method has the side effect of adding the found users to the
   session database, so it can be queried later without API calls,
   if this option is enabled on the session.
    Returns the found entity, or raises TypeError if not found.
   * @param string {string}
   * @returns {Promise<void>}
   * @private
   */
  /* CONTEST
  async _getEntityFromString(string) {
      const phone = utils.parsePhone(string)
      if (phone) {
          try {
              for (const user of (await this.invoke(
                  new requests.contacts.GetContacts(0))).users) {
                  if (user.phone === phone) {
                      return user
                  }
              }
          } catch (e) {
              if (e.message === 'BOT_METHOD_INVALID') {
                  throw new Error('Cannot get entity by phone number as a ' +
                      'bot (try using integer IDs, not strings)')
              }
              throw e
          }
      } else if (['me', 'this'].includes(string.toLowerCase())) {
          return this.getMe()
      } else {
          const { username, isJoinChat } = utils.parseUsername(string)
          if (isJoinChat) {
              const invite = await this.invoke(new requests.messages.CheckChatInvite({
                  'hash': username,
              }))
              if (invite instanceof constructors.ChatInvite) {
                  throw new Error('Cannot get entity from a channel (or group) ' +
                      'that you are not part of. Join the group and retry',
                  )
              } else if (invite instanceof constructors.ChatInviteAlready) {
                  return invite.chat
              }
          } else if (username) {
              try {
                  const result = await this.invoke(
                      new requests.contacts.ResolveUsername(username))
                  const pid = utils.getPeerId(result.peer, false)
                  if (result.peer instanceof constructors.PeerUser) {
                      for (const x of result.users) {
                          if (x.id === pid) {
                              return x
                          }
                      }
                  } else {
                      for (const x of result.chats) {
                          if (x.id === pid) {
                              return x
                          }
                      }
                  }
              } catch (e) {
                  if (e.message === 'USERNAME_NOT_OCCUPIED') {
                      throw new Error(`No user has "${username}" as username`)
                  }
                  throw e
              }
          }
      }
      throw new Error(`Cannot find any entity corresponding to "${string}"`)
  }
  */
  // endregion

  // users region
  /**
   Turns the given entity into its input entity version.
    Most requests use this kind of :tl:`InputPeer`, so this is the most
   suitable call to make for those cases. **Generally you should let the
   library do its job** and don't worry about getting the input entity
   first, but if you're going to use an entity often, consider making the
   call:
    Arguments
   entity (`str` | `int` | :tl:`Peer` | :tl:`InputPeer`):
   If a username or invite link is given, **the library will
   use the cache**. This means that it's possible to be using
   a username that *changed* or an old invite link (this only
   happens if an invite link for a small group chat is used
   after it was upgraded to a mega-group).
    If the username or ID from the invite link is not found in
   the cache, it will be fetched. The same rules apply to phone
   numbers (``'+34 123456789'``) from people in your contact list.
    If an exact name is given, it must be in the cache too. This
   is not reliable as different people can share the same name
   and which entity is returned is arbitrary, and should be used
   only for quick tests.
    If a positive integer ID is given, the entity will be searched
   in cached users, chats or channels, without making any call.
    If a negative integer ID is given, the entity will be searched
   exactly as either a chat (prefixed with ``-``) or as a channel
   (prefixed with ``-100``).
    If a :tl:`Peer` is given, it will be searched exactly in the
   cache as either a user, chat or channel.
    If the given object can be turned into an input entity directly,
   said operation will be done.
    Unsupported types will raise ``TypeError``.
    If the entity can't be found, ``ValueError`` will be raised.
    Returns
   :tl:`InputPeerUser`, :tl:`InputPeerChat` or :tl:`InputPeerChannel`
   or :tl:`InputPeerSelf` if the parameter is ``'me'`` or ``'self'``.
    If you need to get the ID of yourself, you should use
   `get_me` with ``input_peer=True``) instead.
    Example
   .. code-block:: python
    // If you're going to use "username" often in your code
   // (make a lot of calls), consider getting its input entity
   // once, and then using the "user" everywhere instead.
   user = await client.get_input_entity('username')
    // The same applies to IDs, chats or channels.
   chat = await client.get_input_entity(-123456789)
    * @param peer
   * @returns {Promise<>}
   */

  /* CONTEST
  async getInputEntity(peer) {
      // Short-circuit if the input parameter directly maps to an InputPeer
      try {
          return utils.getInputPeer(peer)
          // eslint-disable-next-line no-empty
      } catch (e) {
      }
      // Next in priority is having a peer (or its ID) cached in-memory
      try {
          // 0x2d45687 == crc32(b'Peer')
          if (typeof peer === 'number' || peer.SUBCLASS_OF_ID === 0x2d45687) {
              if (this._entityCache.has(peer)) {
                  return this._entityCache[peer]
              }
          }
          // eslint-disable-next-line no-empty
      } catch (e) {
      }
      // Then come known strings that take precedence
      if (['me', 'this'].includes(peer)) {
          return new constructors.InputPeerSelf()
      }
      // No InputPeer, cached peer, or known string. Fetch from disk cache
      try {
          return this.session.getInputEntity(peer)
          // eslint-disable-next-line no-empty
      } catch (e) {
      }
      // Only network left to try
      if (typeof peer === 'string') {
          return utils.getInputPeer(await this._getEntityFromString(peer))
      }
      // If we're a bot and the user has messaged us privately users.getUsers
      // will work with accessHash = 0. Similar for channels.getChannels.
      // If we're not a bot but the user is in our contacts, it seems to work
      // regardless. These are the only two special-cased requests.
      peer = utils.getPeer(peer)
      if (peer instanceof constructors.PeerUser) {
          const users = await this.invoke(new requests.users.GetUsers({
              id: [new constructors.InputUser({
                  userId: peer.userId,
                  accessHash: 0,
              })],
          }))
          if (users && !(users[0] instanceof constructors.UserEmpty)) {
              // If the user passed a valid ID they expect to work for
              // channels but would be valid for users, we get UserEmpty.
              // Avoid returning the invalid empty input peer for that.
              //
              // We *could* try to guess if it's a channel first, and if
              // it's not, work as a chat and try to validate it through
              // another request, but that becomes too much work.
              return utils.getInputPeer(users[0])
          }
      } else if (peer instanceof constructors.PeerChat) {
          return new constructors.InputPeerChat({
              chatId: peer.chatId,
          })
      } else if (peer instanceof constructors.PeerChannel) {
          try {
              const channels = await this.invoke(new requests.channels.GetChannels({
                  id: [new constructors.InputChannel({
                      channelId: peer.channelId,
                      accessHash: 0,
                  })],
              }))
               return utils.getInputPeer(channels.chats[0])
              // eslint-disable-next-line no-empty
          } catch (e) {
              console.log(e)
          }
      }
      throw new Error(`Could not find the input entity for ${peer.id || peer.channelId || peer.chatId || peer.userId}.
       Please read https://` +
          'docs.telethon.dev/en/latest/concepts/entities.html to' +
          ' find out more details.',
      )
  }
  */
  async _dispatchUpdate() {
    let args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      update: undefined
    };
    for (const [builder, callback] of this._eventBuilders) {
      const event = builder.build(args.update);
      if (event) {
        await callback(event);
      }
    }
  }
  isConnected() {
    if (this._sender) {
      if (this._sender.isConnected()) {
        return true;
      }
    }
    return false;
  }
}
_defineProperty(TelegramClient, "DEFAULT_OPTIONS", {
  connection: ConnectionTCPObfuscated,
  fallbackConnection: HttpConnection,
  useIPV6: false,
  proxy: undefined,
  timeout: 10,
  requestRetries: 5,
  connectionRetries: Infinity,
  connectionRetriesToFallback: 1,
  retryDelay: 1000,
  retryMainConnectionDelay: 10000,
  autoReconnect: true,
  sequentialUpdates: false,
  floodSleepLimit: 60,
  deviceModel: undefined,
  systemVersion: undefined,
  appVersion: undefined,
  langCode: 'en',
  systemLangCode: 'en',
  baseLogger: 'gramjs',
  useWSS: false,
  additionalDcsDisabled: false,
  testServers: false,
  dcId: DEFAULT_DC_ID,
  shouldAllowHttpTransport: false,
  shouldForceHttpTransport: false,
  shouldDebugExportedSenders: false
});
function timeout(cb, ms) {
  let isResolved = false;
  return Promise.race([cb(), Helpers.sleep(ms).then(() => isResolved ? undefined : Promise.reject(new Error('TIMEOUT')))]).finally(() => {
    isResolved = true;
  });
}
async function attempts(cb, times, pause) {
  for (let i = 0; i < times; i++) {
    try {
      // We need to `return await` here so it can be caught locally
      // eslint-disable-next-line @typescript-eslint/return-await
      return await cb();
    } catch (err) {
      if (i === times - 1) {
        throw err;
      }
      await Helpers.sleep(pause);
    }
  }
  return undefined;
}
module.exports = TelegramClient;

/***/ }),

/***/ "./src/lib/gramjs/client/auth.ts":
/*!***************************************!*\
  !*** ./src/lib/gramjs/client/auth.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authFlow: () => (/* binding */ authFlow),
/* harmony export */   checkAuthorization: () => (/* binding */ checkAuthorization),
/* harmony export */   signInUserWithPreferredMethod: () => (/* binding */ signInUserWithPreferredMethod)
/* harmony export */ });
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tl/api */ "./src/lib/gramjs/tl/api.js");
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tl_api__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Password__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Password */ "./src/lib/gramjs/Password.js");
/* harmony import */ var _Password__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Password__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils */ "./src/lib/gramjs/Utils.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Utils__WEBPACK_IMPORTED_MODULE_3__);




const DEFAULT_INITIAL_METHOD = 'phoneNumber';
const QR_CODE_TIMEOUT = 30000;
async function authFlow(client, apiCredentials, authParams) {
  let me;
  if ('botAuthToken' in authParams) {
    me = await signInBot(client, apiCredentials, authParams);
  } else if ('webAuthToken' in authParams && authParams.webAuthToken) {
    me = await signInUserWithWebToken(client, apiCredentials, authParams);
  } else {
    me = await signInUserWithPreferredMethod(client, apiCredentials, authParams);
  }
  client._log.info('Signed in successfully as', _Utils__WEBPACK_IMPORTED_MODULE_3___default().getDisplayName(me));
}
function signInUserWithPreferredMethod(client, apiCredentials, authParams) {
  const {
    initialMethod = DEFAULT_INITIAL_METHOD
  } = authParams;
  if (initialMethod === 'phoneNumber') {
    return signInUser(client, apiCredentials, authParams);
  } else {
    return signInUserWithQrCode(client, apiCredentials, authParams);
  }
}
async function checkAuthorization(client) {
  let shouldThrow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  try {
    await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().updates).GetState());
    return true;
  } catch (e) {
    if (e.message === 'Disconnect' || shouldThrow) throw e;
    return false;
  }
}
async function signInUserWithWebToken(client, apiCredentials, authParams) {
  try {
    const {
      apiId,
      apiHash
    } = apiCredentials;
    const sendResult = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).ImportWebTokenAuthorization({
      webAuthToken: authParams.webAuthToken,
      apiId,
      apiHash
    }));
    if (sendResult instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).Authorization) {
      return sendResult.user;
    } else {
      throw new Error('SIGN_UP_REQUIRED');
    }
  } catch (err) {
    if (err.message === 'SESSION_PASSWORD_NEEDED') {
      return signInWithPassword(client, apiCredentials, authParams, true);
    } else {
      client._log.error(`Failed to login with web token: ${err}`);
      authParams.webAuthTokenFailed();
      return signInUserWithPreferredMethod(client, apiCredentials, {
        ...authParams,
        webAuthToken: undefined
      });
    }
  }
}
async function signInUser(client, apiCredentials, authParams) {
  let phoneNumber;
  let phoneCodeHash;
  let isCodeViaApp = false;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      if (typeof authParams.phoneNumber === 'function') {
        try {
          phoneNumber = await authParams.phoneNumber();
        } catch (err) {
          if (err.message === 'RESTART_AUTH_WITH_QR') {
            return signInUserWithQrCode(client, apiCredentials, authParams);
          }
          throw err;
        }
      } else {
        phoneNumber = authParams.phoneNumber;
      }
      const sendCodeResult = await sendCode(client, apiCredentials, phoneNumber, authParams.forceSMS);
      phoneCodeHash = sendCodeResult.phoneCodeHash;
      isCodeViaApp = sendCodeResult.isCodeViaApp;
      if (typeof phoneCodeHash !== 'string') {
        throw new Error('Failed to retrieve phone code hash');
      }
      break;
    } catch (err) {
      if (typeof authParams.phoneNumber !== 'function') {
        throw err;
      }
      authParams.onError(err);
    }
  }
  let phoneCode;
  let isRegistrationRequired = false;
  let termsOfService;

  // eslint-disable-next-line no-constant-condition
  while (1) {
    try {
      try {
        phoneCode = await authParams.phoneCode(isCodeViaApp);
      } catch (err) {
        // This is the support for changing phone number from the phone code screen.
        if (err.message === 'RESTART_AUTH') {
          return signInUser(client, apiCredentials, authParams);
        }
      }
      if (!phoneCode) {
        throw new Error('Code is empty');
      }

      // May raise PhoneCodeEmptyError, PhoneCodeExpiredError,
      // PhoneCodeHashEmptyError or PhoneCodeInvalidError.
      const result = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).SignIn({
        phoneNumber,
        phoneCodeHash,
        phoneCode
      }));
      if (result instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).AuthorizationSignUpRequired) {
        isRegistrationRequired = true;
        termsOfService = result.termsOfService;
        break;
      }
      return result.user;
    } catch (err) {
      if (err.message === 'SESSION_PASSWORD_NEEDED') {
        return signInWithPassword(client, apiCredentials, authParams);
      } else {
        authParams.onError(err);
      }
    }
  }
  if (isRegistrationRequired) {
    // eslint-disable-next-line no-constant-condition
    while (1) {
      try {
        const [firstName, lastName] = await authParams.firstAndLastNames();
        if (!firstName) {
          throw new Error('First name is required');
        }
        const {
          user
        } = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).SignUp({
          phoneNumber,
          phoneCodeHash,
          firstName,
          lastName
        }));
        if (termsOfService) {
          // This is a violation of Telegram rules: the user should be presented with and accept TOS.
          await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().help).AcceptTermsOfService({
            id: termsOfService.id
          }));
        }
        return user;
      } catch (err) {
        authParams.onError(err);
      }
    }
  }
  authParams.onError(new Error('Auth failed'));
  return signInUser(client, apiCredentials, authParams);
}
async function signInUserWithQrCode(client, apiCredentials, authParams) {
  let isScanningComplete = false;
  const inputPromise = (async () => {
    // eslint-disable-next-line no-constant-condition
    while (1) {
      if (isScanningComplete) {
        break;
      }
      const result = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).ExportLoginToken({
        apiId: Number("1025907"),
        apiHash: "452b0359b988148995f22ff0f4229750",
        exceptIds: []
      }));
      if (!(result instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).LoginToken)) {
        throw new Error('Unexpected');
      }
      const {
        token,
        expires
      } = result;
      await Promise.race([authParams.qrCode({
        token,
        expires
      }), (0,_Helpers__WEBPACK_IMPORTED_MODULE_1__.sleep)(QR_CODE_TIMEOUT)]);
    }
  })();
  const updatePromise = new Promise(resolve => {
    client.addEventHandler(update => {
      if (update instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().UpdateLoginToken)) {
        resolve();
      }
    }, {
      build: update => update
    });
  });
  try {
    // Either we receive an update that QR is successfully scanned,
    // or we receive a rejection caused by user going back to the regular auth form
    await Promise.race([updatePromise, inputPromise]);
  } catch (err) {
    if (err.message === 'RESTART_AUTH') {
      return await signInUser(client, apiCredentials, authParams);
    }
    throw err;
  } finally {
    isScanningComplete = true;
  }
  try {
    const result2 = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).ExportLoginToken({
      apiId: Number("1025907"),
      apiHash: "452b0359b988148995f22ff0f4229750",
      exceptIds: []
    }));
    if (result2 instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).LoginTokenSuccess && result2.authorization instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).Authorization) {
      return result2.authorization.user;
    } else if (result2 instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).LoginTokenMigrateTo) {
      await client._switchDC(result2.dcId);
      const migratedResult = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).ImportLoginToken({
        token: result2.token
      }));
      if (migratedResult instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).LoginTokenSuccess && migratedResult.authorization instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).Authorization) {
        return migratedResult.authorization.user;
      }
    }
  } catch (err) {
    if (err.message === 'SESSION_PASSWORD_NEEDED') {
      return signInWithPassword(client, apiCredentials, authParams);
    }
    throw err;
  }

  // This is a workaround for TypeScript (never actually reached)
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw undefined;
}
async function sendCode(client, apiCredentials, phoneNumber) {
  let forceSMS = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  try {
    const {
      apiId,
      apiHash
    } = apiCredentials;
    const sendResult = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).SendCode({
      phoneNumber,
      apiId,
      apiHash,
      settings: new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().CodeSettings)()
    }));
    if (!(sendResult instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).SentCode)) {
      throw Error('Unexpected SentCodeSuccess');
    }

    // If we already sent a SMS, do not resend the phoneCode (hash may be empty)
    if (!forceSMS || sendResult.type instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).SentCodeTypeSms) {
      return {
        phoneCodeHash: sendResult.phoneCodeHash,
        isCodeViaApp: sendResult.type instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).SentCodeTypeApp
      };
    }
    const resendResult = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).ResendCode({
      phoneNumber,
      phoneCodeHash: sendResult.phoneCodeHash
    }));
    if (!(resendResult instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).SentCode)) {
      throw Error('Unexpected SentCodeSuccess');
    }
    return {
      phoneCodeHash: resendResult.phoneCodeHash,
      isCodeViaApp: resendResult.type instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).SentCodeTypeApp
    };
  } catch (err) {
    if (err.message === 'AUTH_RESTART') {
      return sendCode(client, apiCredentials, phoneNumber, forceSMS);
    } else {
      throw err;
    }
  }
}
async function signInWithPassword(client, apiCredentials, authParams) {
  let noReset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // eslint-disable-next-line no-constant-condition
  while (1) {
    try {
      const passwordSrpResult = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().account).GetPassword());
      const password = await authParams.password(passwordSrpResult.hint, noReset);
      if (!password) {
        throw new Error('Password is empty');
      }
      const passwordSrpCheck = await (0,_Password__WEBPACK_IMPORTED_MODULE_2__.computeCheck)(passwordSrpResult, password);
      const {
        user
      } = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).CheckPassword({
        password: passwordSrpCheck
      }));
      return user;
    } catch (err) {
      authParams.onError(err);
    }
  }

  // eslint-disable-next-line no-unreachable
  return undefined; // Never reached (TypeScript fix)
}
async function signInBot(client, apiCredentials, authParams) {
  const {
    apiId,
    apiHash
  } = apiCredentials;
  const {
    botAuthToken
  } = authParams;
  const {
    user
  } = await client.invoke(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().auth).ImportBotAuthorization({
    apiId,
    apiHash,
    botAuthToken
  }));
  return user;
}

/***/ }),

/***/ "./src/lib/gramjs/client/downloadFile.ts":
/*!***********************************************!*\
  !*** ./src/lib/gramjs/client/downloadFile.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadFile: () => (/* binding */ downloadFile)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_Deferred__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/Deferred */ "./src/util/Deferred.ts");
/* harmony import */ var _util_foreman__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/foreman */ "./src/util/foreman.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errors */ "./src/lib/gramjs/errors/index.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_errors__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tl/api */ "./src/lib/gramjs/tl/api.js");
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_tl_api__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api_gramjs_updates_UpdatePremiumFloodWait__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../api/gramjs/updates/UpdatePremiumFloodWait */ "./src/api/gramjs/updates/UpdatePremiumFloodWait.ts");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Helpers__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Utils */ "./src/lib/gramjs/Utils.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Utils__WEBPACK_IMPORTED_MODULE_7__);
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }








// Chunk sizes for `upload.getFile` must be multiple of the smallest size
const MIN_CHUNK_SIZE = 4096;
const DEFAULT_CHUNK_SIZE = 64; // kb
const ONE_MB = 1024 * 1024;
const DISCONNECT_SLEEP = 1000;

// when the sender requests hangs for 60 second we will reimport
const SENDER_TIMEOUT = 60 * 1000;
// Telegram may have server issues so we try several times
const SENDER_RETRIES = 5;
class FileView {
  constructor(size) {
    _defineProperty(this, "type", void 0);
    _defineProperty(this, "size", void 0);
    _defineProperty(this, "buffer", void 0);
    _defineProperty(this, "largeFile", void 0);
    _defineProperty(this, "largeFileAccessHandle", void 0);
    this.size = size;
    // eslint-disable-next-line no-restricted-globals
    this.type = size && size > self.maxBufferSize ? 'opfs' : 'memory';
  }
  async init() {
    if (this.type === 'opfs') {
      if (!FileSystemFileHandle?.prototype.createSyncAccessHandle) {
        throw new Error('`createSyncAccessHandle` is not available. Cannot download files larger than 2GB.');
      }
      const directory = await navigator.storage.getDirectory();
      const downloadsFolder = await directory.getDirectoryHandle('downloads', {
        create: true
      });
      this.largeFile = await downloadsFolder.getFileHandle(Math.random().toString(), {
        create: true
      });
      this.largeFileAccessHandle = await this.largeFile.createSyncAccessHandle();
    } else {
      this.buffer = this.size ? Buffer.alloc(this.size) : Buffer.alloc(0);
    }
  }
  write(data, offset) {
    if (this.type === 'opfs') {
      this.largeFileAccessHandle.write(data, {
        at: offset
      });
    } else if (this.size) {
      for (let i = 0; i < data.length; i++) {
        if (offset + i >= this.buffer.length) return;
        this.buffer.writeUInt8(data[i], offset + i);
      }
    } else {
      this.buffer = Buffer.concat([this.buffer, data]);
    }
  }
  getData() {
    if (this.type === 'opfs') {
      return this.largeFile.getFile();
    } else {
      return Promise.resolve(this.buffer);
    }
  }
}
async function downloadFile(client, inputLocation, fileParams, shouldDebugExportedSenders) {
  const {
    dcId
  } = fileParams;
  for (let i = 0; i < SENDER_RETRIES; i++) {
    try {
      return await downloadFile2(client, inputLocation, fileParams, shouldDebugExportedSenders);
    } catch (err) {
      if ((err.message.startsWith('SESSION_REVOKED') || err.message.startsWith('CONNECTION_NOT_INITED')) && i < SENDER_RETRIES - 1) {
        await client._cleanupExportedSenders(dcId);
      } else {
        throw err;
      }
    }
  }
  return undefined;
}
const MAX_CONCURRENT_CONNECTIONS = 3;
const MAX_CONCURRENT_CONNECTIONS_PREMIUM = 6;
const MAX_WORKERS_PER_CONNECTION = 10;
const MULTIPLE_CONNECTIONS_MIN_FILE_SIZE = 10485760; // 10MB

const foremans = Array(MAX_CONCURRENT_CONNECTIONS_PREMIUM).fill(undefined).map(() => new _util_foreman__WEBPACK_IMPORTED_MODULE_2__.Foreman(MAX_WORKERS_PER_CONNECTION));
async function downloadFile2(client, inputLocation, fileParams, shouldDebugExportedSenders) {
  let {
    partSizeKb,
    end
  } = fileParams;
  const {
    fileSize
  } = fileParams;
  const fileId = 'id' in inputLocation ? inputLocation.id : undefined;
  const logWithId = function () {
    if (!shouldDebugExportedSenders) return;
    // eslint-disable-next-line no-console
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    console.log(`⬇️ [${fileId}/${fileParams.dcId}]`, ...args);
  };
  logWithId('Downloading file...');
  const isPremium = Boolean(client.isPremium);
  const {
    dcId,
    progressCallback,
    start = 0
  } = fileParams;
  end = end && end < fileSize ? end : fileSize - 1;
  if (!partSizeKb) {
    partSizeKb = fileSize ? (0,_Utils__WEBPACK_IMPORTED_MODULE_7__.getDownloadPartSize)(start ? end - start + 1 : fileSize) : DEFAULT_CHUNK_SIZE;
  }
  const partSize = partSizeKb * 1024;
  const partsCount = end ? Math.ceil((end + 1 - start + 1) / partSize) : 1;
  const noParallel = !end;
  const shouldUseMultipleConnections = fileSize && fileSize >= MULTIPLE_CONNECTIONS_MIN_FILE_SIZE && !noParallel;
  let deferred;
  if (partSize % MIN_CHUNK_SIZE !== 0) {
    throw new Error(`The part size must be evenly divisible by ${MIN_CHUNK_SIZE}`);
  }
  client._log.info(`Downloading file in chunks of ${partSize} bytes`);
  const fileView = new FileView(end - start + 1);
  const promises = [];
  let offset = start;
  // Pick the least busy foreman
  // For some reason, fresh connections give out a higher speed for the first couple of seconds
  // I have no idea why, but this may speed up the download of small files
  const activeCounts = foremans.map(_ref => {
    let {
      activeWorkers
    } = _ref;
    return activeWorkers;
  });
  let currentForemanIndex = activeCounts.indexOf(Math.min(...activeCounts));
  // Used for files with unknown size and for manual cancellations
  let hasEnded = false;
  let progress = 0;
  if (progressCallback) {
    progressCallback(progress);
  }

  // Limit updates to one per file
  let isPremiumFloodWaitSent = false;

  // Allocate memory
  await fileView.init();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    let limit = partSize;
    let isPrecise = false;
    if (Math.floor(offset / ONE_MB) !== Math.floor((offset + limit - 1) / ONE_MB)) {
      limit = ONE_MB - offset % ONE_MB;
      isPrecise = true;
    }
    if (offset % MIN_CHUNK_SIZE !== 0 || limit % MIN_CHUNK_SIZE !== 0) {
      isPrecise = true;
    }

    // Use only first connection for avatars, because no size is known and we don't want to
    // download empty parts using all connections at once
    const senderIndex = !shouldUseMultipleConnections ? 0 : currentForemanIndex % (isPremium ? MAX_CONCURRENT_CONNECTIONS_PREMIUM : MAX_CONCURRENT_CONNECTIONS);
    await foremans[senderIndex].requestWorker();
    if (deferred) await deferred.promise;
    if (noParallel) deferred = new _util_Deferred__WEBPACK_IMPORTED_MODULE_1__["default"]();
    if (hasEnded) {
      foremans[senderIndex].releaseWorker();
      break;
    }
    const logWithSenderIndex = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      logWithId(`[${senderIndex}/${dcId}]`, ...args);
    };

    // eslint-disable-next-line no-loop-func, @typescript-eslint/no-loop-func
    promises.push((async offsetMemo => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        let sender;
        try {
          let isDone = false;
          if (shouldDebugExportedSenders) {
            setTimeout(() => {
              if (isDone) return;
              logWithSenderIndex(`❗️️ getSender took too long ${offsetMemo}`);
            }, 8000);
          }
          sender = await client.getSender(dcId, senderIndex, isPremium);
          isDone = true;
          let isDone2 = false;
          if (shouldDebugExportedSenders) {
            setTimeout(() => {
              if (isDone2) return;
              logWithSenderIndex(`❗️️ sender.send took too long ${offsetMemo}`);
            }, 6000);
          }
          // sometimes a session is revoked and will cause this to hang.
          const result = await Promise.race([sender.send(new (_tl_api__WEBPACK_IMPORTED_MODULE_4___default().upload).GetFile({
            location: inputLocation,
            offset: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(offsetMemo),
            limit,
            precise: isPrecise || undefined
          })), (0,_Helpers__WEBPACK_IMPORTED_MODULE_6__.sleep)(SENDER_TIMEOUT).then(() => {
            // If we're on the main DC we just cancel the download and let the user retry later
            if (dcId === client.session.dcId) {
              logWithSenderIndex(`Download timed out ${offsetMemo}`);
              return Promise.reject(new Error('USER_CANCELED'));
            } else {
              logWithSenderIndex(`Download timed out [not main] ${offsetMemo}`);
              return Promise.reject(new Error('SESSION_REVOKED'));
            }
          })]);
          client.releaseExportedSender(sender);
          isDone2 = true;
          if (progressCallback) {
            if (progressCallback.isCanceled) {
              throw new Error('USER_CANCELED');
            }
            progress += 1 / partsCount;
            logWithSenderIndex(`⬇️️ ${progress * 100}%`);
            progressCallback(progress);
          }
          if (!end && result.bytes.length < limit) {
            hasEnded = true;
          }
          foremans[senderIndex].releaseWorker();
          if (deferred) deferred.resolve();
          fileView.write(result.bytes, offsetMemo - start);
          return;
        } catch (err) {
          if (sender && !sender.isConnected()) {
            await (0,_Helpers__WEBPACK_IMPORTED_MODULE_6__.sleep)(DISCONNECT_SLEEP);
            continue;
          } else if (err instanceof (_errors__WEBPACK_IMPORTED_MODULE_3___default().FloodWaitError)) {
            if (err instanceof (_errors__WEBPACK_IMPORTED_MODULE_3___default().FloodPremiumWaitError) && !isPremiumFloodWaitSent) {
              sender?._updateCallback(new _api_gramjs_updates_UpdatePremiumFloodWait__WEBPACK_IMPORTED_MODULE_5__["default"](false));
              isPremiumFloodWaitSent = true;
            }
            await (0,_Helpers__WEBPACK_IMPORTED_MODULE_6__.sleep)(err.seconds * 1000);
            continue;
          }
          logWithSenderIndex(`Ended not gracefully ${offsetMemo}`);
          foremans[senderIndex].releaseWorker();
          if (deferred) deferred.resolve();
          hasEnded = true;
          client.releaseExportedSender(sender);
          throw err;
        }
      }
    })(offset));
    offset += limit;
    currentForemanIndex++;
    if (end && offset > end) {
      break;
    }
  }
  await Promise.all(promises);
  return fileView.getData();
}

/***/ }),

/***/ "./src/lib/gramjs/client/uploadFile.ts":
/*!*********************************************!*\
  !*** ./src/lib/gramjs/client/uploadFile.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uploadFile: () => (/* binding */ uploadFile)
/* harmony export */ });
/* harmony import */ var _util_foreman__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/foreman */ "./src/util/foreman.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/lib/gramjs/errors/index.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_errors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tl/api */ "./src/lib/gramjs/tl/api.js");
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tl_api__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_gramjs_updates_UpdatePremiumFloodWait__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../api/gramjs/updates/UpdatePremiumFloodWait */ "./src/api/gramjs/updates/UpdatePremiumFloodWait.ts");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Helpers__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Utils */ "./src/lib/gramjs/Utils.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Utils__WEBPACK_IMPORTED_MODULE_5__);
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];






const KB_TO_BYTES = 1024;
const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024;
const DISCONNECT_SLEEP = 1000;
const MAX_CONCURRENT_CONNECTIONS = 3;
const MAX_CONCURRENT_CONNECTIONS_PREMIUM = 6;
const MAX_WORKERS_PER_CONNECTION = 10;
const foremans = Array(MAX_CONCURRENT_CONNECTIONS_PREMIUM).fill(undefined).map(() => new _util_foreman__WEBPACK_IMPORTED_MODULE_0__.Foreman(MAX_WORKERS_PER_CONNECTION));
async function uploadFile(client, fileParams, shouldDebugExportedSenders) {
  const {
    file,
    onProgress
  } = fileParams;
  const isPremium = Boolean(client.isPremium);
  const {
    name,
    size
  } = file;
  const fileId = (0,_Helpers__WEBPACK_IMPORTED_MODULE_4__.readBigIntFromBuffer)((0,_Helpers__WEBPACK_IMPORTED_MODULE_4__.generateRandomBytes)(8), true, true);
  const isLarge = size > LARGE_FILE_THRESHOLD;
  const logWithId = function () {
    if (!shouldDebugExportedSenders) return;
    // eslint-disable-next-line no-console
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    console.log(`⬆️ [${fileId}]`, ...args);
  };
  logWithId('Uploading file...');
  const partSize = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.getUploadPartSize)(size) * KB_TO_BYTES;
  const partCount = Math.floor((size + partSize - 1) / partSize);

  // Pick the least busy foreman
  // For some reason, fresh connections give out a higher speed for the first couple of seconds
  // I have no idea why, but this may speed up the download of small files
  const activeCounts = foremans.map(_ref => {
    let {
      activeWorkers
    } = _ref;
    return activeWorkers;
  });
  let currentForemanIndex = activeCounts.indexOf(Math.min(...activeCounts));
  let progress = 0;
  if (onProgress) {
    onProgress(progress);
  }

  // Limit updates to one per file
  let isPremiumFloodWaitSent = false;
  const promises = [];
  for (let i = 0; i < partCount; i++) {
    const senderIndex = currentForemanIndex % (isPremium ? MAX_CONCURRENT_CONNECTIONS_PREMIUM : MAX_CONCURRENT_CONNECTIONS);
    await foremans[senderIndex].requestWorker();
    if (onProgress?.isCanceled) {
      foremans[senderIndex].releaseWorker();
      break;
    }
    const logWithSenderIndex = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      logWithId(`[${senderIndex}]`, ...args);
    };
    const blobSlice = file.slice(i * partSize, (i + 1) * partSize);
    // eslint-disable-next-line no-loop-func, @typescript-eslint/no-loop-func
    promises.push((async (jMemo, blobSliceMemo) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        let sender;
        try {
          // We always upload from the DC we are in
          let isDone = false;
          if (shouldDebugExportedSenders) {
            setTimeout(() => {
              if (isDone) return;
              logWithSenderIndex(`❗️️ getSender took too long j=${jMemo}`);
            }, 8000);
          }
          sender = await client.getSender(client.session.dcId, senderIndex, isPremium);
          isDone = true;
          let isDone2 = false;
          const partBytes = await blobSliceMemo.arrayBuffer();
          if (shouldDebugExportedSenders) {
            setTimeout(() => {
              if (isDone2) return;
              logWithSenderIndex(`❗️️ sender.send took too long j=${jMemo}`);
            }, 6000);
          }
          await sender.send(isLarge ? new (_tl_api__WEBPACK_IMPORTED_MODULE_2___default().upload).SaveBigFilePart({
            fileId,
            filePart: jMemo,
            fileTotalParts: partCount,
            bytes: Buffer.from(partBytes)
          }) : new (_tl_api__WEBPACK_IMPORTED_MODULE_2___default().upload).SaveFilePart({
            fileId,
            filePart: jMemo,
            bytes: Buffer.from(partBytes)
          }));
          client.releaseExportedSender(sender);
          isDone2 = true;
        } catch (err) {
          logWithSenderIndex(`❗️️️Upload part failed ${err?.toString()} j=${jMemo}`);
          if (sender && !sender.isConnected()) {
            await (0,_Helpers__WEBPACK_IMPORTED_MODULE_4__.sleep)(DISCONNECT_SLEEP);
            continue;
          } else if (err instanceof (_errors__WEBPACK_IMPORTED_MODULE_1___default().FloodWaitError)) {
            if (err instanceof (_errors__WEBPACK_IMPORTED_MODULE_1___default().FloodPremiumWaitError) && !isPremiumFloodWaitSent) {
              sender?._updateCallback(new _api_gramjs_updates_UpdatePremiumFloodWait__WEBPACK_IMPORTED_MODULE_3__["default"](true));
              isPremiumFloodWaitSent = true;
            }
            await (0,_Helpers__WEBPACK_IMPORTED_MODULE_4__.sleep)(err.seconds * 1000);
            continue;
          }
          foremans[senderIndex].releaseWorker();
          client.releaseExportedSender(sender);
          throw err;
        }
        foremans[senderIndex].releaseWorker();
        if (onProgress) {
          if (onProgress.isCanceled) {
            throw new Error('USER_CANCELED');
          }
          progress += 1 / partCount;
          logWithSenderIndex(`${progress * 100}%`);
          onProgress(progress);
        }
        break;
      }
    })(i, blobSlice));
    currentForemanIndex++;
  }
  await Promise.all(promises);
  return isLarge ? new (_tl_api__WEBPACK_IMPORTED_MODULE_2___default().InputFileBig)({
    id: fileId,
    parts: partCount,
    name
  }) : new (_tl_api__WEBPACK_IMPORTED_MODULE_2___default().InputFile)({
    id: fileId,
    parts: partCount,
    name,
    md5Checksum: '' // This is not a "flag", so not sure if we can make it optional.
  });
}

/***/ }),

/***/ "./src/lib/gramjs/crypto/AuthKey.js":
/*!******************************************!*\
  !*** ./src/lib/gramjs/crypto/AuthKey.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const {
  sha1,
  toSignedLittleBuffer,
  readBufferFromBigInt,
  readBigIntFromBuffer
} = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
const BinaryReader = __webpack_require__(/*! ../extensions/BinaryReader */ "./src/lib/gramjs/extensions/BinaryReader.js");
const {
  sleep
} = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
class AuthKey {
  constructor(value, hash) {
    if (!hash || !value) {
      return;
    }
    this._key = value;
    this._hash = hash;
    const reader = new BinaryReader(hash);
    this.auxHash = reader.readLong(false);
    reader.read(4);
    this.keyId = reader.readLong(false);
  }
  async setKey(value) {
    if (!value) {
      this._key = undefined;
      this.auxHash = undefined;
      this.keyId = undefined;
      this._hash = undefined;
      return;
    }
    if (value instanceof AuthKey) {
      this._key = value._key;
      this.auxHash = value.auxHash;
      this.keyId = value.keyId;
      this._hash = value._hash;
      return;
    }
    this._key = value;
    this._hash = await sha1(this._key);
    const reader = new BinaryReader(this._hash);
    this.auxHash = reader.readLong(false);
    reader.read(4);
    this.keyId = reader.readLong(false);
  }
  async waitForKey() {
    while (!this.keyId) {
      await sleep(20);
    }
  }
  getKey() {
    return this._key;
  }

  // TODO : This doesn't really fit here, it's only used in authentication

  /**
   * Calculates the new nonce hash based on the current class fields' values
   * @param newNonce
   * @param number
   * @returns {bigint}
   */
  async calcNewNonceHash(newNonce, number) {
    newNonce = toSignedLittleBuffer(newNonce, 32);
    const n = Buffer.alloc(1);
    n.writeUInt8(number, 0);
    const data = Buffer.concat([newNonce, Buffer.concat([n, readBufferFromBigInt(this.auxHash, 8, true)])]);

    // Calculates the message key from the given data
    const shaData = (await sha1(data)).slice(4, 20);
    return readBigIntFromBuffer(shaData, true, true);
  }
  equals(other) {
    return other instanceof this.constructor && this._key && other.getKey() && other.getKey().equals(this._key);
  }
}
module.exports = AuthKey;

/***/ }),

/***/ "./src/lib/gramjs/crypto/CTR.js":
/*!**************************************!*\
  !*** ./src/lib/gramjs/crypto/CTR.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const crypto = __webpack_require__(/*! ./crypto */ "./src/lib/gramjs/crypto/crypto.js");
class CTR {
  constructor(key, iv) {
    if (!Buffer.isBuffer(key) || !Buffer.isBuffer(iv) || iv.length !== 16) {
      throw new Error('Key and iv need to be a buffer');
    }
    this.cipher = crypto.createCipheriv('AES-256-CTR', key, iv);
  }
  encrypt(data) {
    return Buffer.from(this.cipher.update(data));
  }
}
module.exports = CTR;

/***/ }),

/***/ "./src/lib/gramjs/crypto/Factorizator.js":
/*!***********************************************!*\
  !*** ./src/lib/gramjs/crypto/Factorizator.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const BigInt = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
const {
  modExp
} = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
class Factorizator {
  /**
   * Calculates the greatest common divisor
   * @param a {BigInteger}
   * @param b {BigInteger}
   * @returns {BigInteger}
   */
  static gcd(a, b) {
    while (b.neq(BigInt.zero)) {
      const temp = b;
      b = a.remainder(b);
      a = temp;
    }
    return a;
  }

  /**
   * Factorizes the given number and returns both the divisor and the number divided by the divisor
   * @param pq {BigInteger}
   * @returns {{p: *, q: *}}
   */
  static factorize(pq) {
    if (pq.remainder(2).equals(BigInt.zero)) {
      return {
        p: BigInt(2),
        q: pq.divide(BigInt(2))
      };
    }
    let y = BigInt.randBetween(BigInt(1), pq.minus(1));
    const c = BigInt.randBetween(BigInt(1), pq.minus(1));
    const m = BigInt.randBetween(BigInt(1), pq.minus(1));
    let g = BigInt.one;
    let r = BigInt.one;
    let q = BigInt.one;
    let x = BigInt.zero;
    let ys = BigInt.zero;
    let k;
    while (g.eq(BigInt.one)) {
      x = y;
      for (let i = 0; BigInt(i).lesser(r); i++) {
        y = modExp(y, BigInt(2), pq).add(c).remainder(pq);
      }
      k = BigInt.zero;
      while (k.lesser(r) && g.eq(BigInt.one)) {
        ys = y;
        const condition = BigInt.min(m, r.minus(k));
        for (let i = 0; BigInt(i).lesser(condition); i++) {
          y = modExp(y, BigInt(2), pq).add(c).remainder(pq);
          q = q.multiply(x.minus(y).abs()).remainder(pq);
        }
        g = Factorizator.gcd(q, pq);
        k = k.add(m);
      }
      r = r.multiply(2);
    }
    if (g.eq(pq)) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        ys = modExp(ys, BigInt(2), pq).add(c).remainder(pq);
        g = Factorizator.gcd(x.minus(ys).abs(), pq);
        if (g.greater(1)) {
          break;
        }
      }
    }
    const p = g;
    q = pq.divide(g);
    return p < q ? {
      p,
      q
    } : {
      p: q,
      q: p
    };
  }
}
module.exports = Factorizator;

/***/ }),

/***/ "./src/lib/gramjs/crypto/IGE.js":
/*!**************************************!*\
  !*** ./src/lib/gramjs/crypto/IGE.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const {
  IGE: AESIGE
} = __webpack_require__(/*! @cryptography/aes */ "./node_modules/@cryptography/aes/dist/es/aes.js");
const Helpers = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
class IGENEW {
  constructor(key, iv) {
    this.ige = new AESIGE(key, iv);
  }

  /**
   * Decrypts the given text in 16-bytes blocks by using the given key and 32-bytes initialization vector
   * @param cipherText {Buffer}
   * @returns {Buffer}
   */
  decryptIge(cipherText) {
    return Helpers.convertToLittle(this.ige.decrypt(cipherText));
  }

  /**
   * Encrypts the given text in 16-bytes blocks by using the given key and 32-bytes initialization vector
   * @param plainText {Buffer}
   * @returns {Buffer}
   */
  encryptIge(plainText) {
    const padding = plainText.length % 16;
    if (padding) {
      plainText = Buffer.concat([plainText, Helpers.generateRandomBytes(16 - padding)]);
    }
    return Helpers.convertToLittle(this.ige.encrypt(plainText));
  }
}
module.exports = IGENEW;

/***/ }),

/***/ "./src/lib/gramjs/crypto/RSA.ts":
/*!**************************************!*\
  !*** ./src/lib/gramjs/crypto/RSA.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SERVER_KEYS: () => (/* binding */ SERVER_KEYS),
/* harmony export */   encrypt: () => (/* binding */ encrypt)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Helpers__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];


const SERVER_KEYS = [{
  fingerprint: big_integer__WEBPACK_IMPORTED_MODULE_0___default()('-3414540481677951611'),
  n: big_integer__WEBPACK_IMPORTED_MODULE_0___default()('2937959817066933702298617714945612856538843112005886376816255642404751219133084745514657634448776440866' + '1701890505066208632169112269581063774293102577308490531282748465986139880977280302242772832972539403531' + '3160108704012876427630091361567343395380424193887227773571344877461690935390938502512438971889287359033' + '8945177273024525306296338410881284207988753897636046529094613963869149149606209957083647645485599631919' + '2747663615955633778034897140982517446405334423701359108810182097749467210509584293428076654573384828809' + '574217079944388301239431309115013843331317877374435868468779972014486325557807783825502498215169806323'),
  e: 65537
}, {
  fingerprint: big_integer__WEBPACK_IMPORTED_MODULE_0___default()('-5595554452916591101'),
  n: big_integer__WEBPACK_IMPORTED_MODULE_0___default()('2534288944884041556497168959071347320689884775908477905258202659454602246385394058588521595116849196570' + '8222649399180603818074200620463776135424884632162512403163793083921641631564740959529419359595852941166' + '8489405859523376133330223960965841179548922160312292373029437018775884567383353986024616752250817918203' + '9315375750495263623495132323782003654358104782690612092797248736680529211579223142368426126233039432475' + '0785450942589751755390156647751460719351439969059949569615302809050721500330239005077889855323917509948' + '255722081644689442127297605422579707142646660768825302832201908302295573257427896031830742328565032949'),
  e: 65537
}].reduce((acc, _ref) => {
  let {
    fingerprint,
    ...keyInfo
  } = _ref;
  acc.set(fingerprint.toString(), keyInfo);
  return acc;
}, new Map());

/**
 * Encrypts the given data known the fingerprint to be used
 * in the way Telegram requires us to do so (sha1(data) + data + padding)

 * @param fingerprint the fingerprint of the RSA key.
 * @param data the data to be encrypted.
 * @returns {Buffer|*|undefined} the cipher text, or undefined if no key matching this fingerprint is found.
 */
async function encrypt(fingerprint, data) {
  const key = SERVER_KEYS.get(fingerprint.toString());
  if (!key) {
    return undefined;
  }

  // len(sha1.digest) is always 20, so we're left with 255 - 20 - x padding
  const rand = (0,_Helpers__WEBPACK_IMPORTED_MODULE_1__.generateRandomBytes)(235 - data.length);
  const toEncrypt = Buffer.concat([await (0,_Helpers__WEBPACK_IMPORTED_MODULE_1__.sha1)(data), data, rand]);

  // rsa module rsa.encrypt adds 11 bits for padding which we don't want
  // rsa module uses rsa.transform.bytes2int(to_encrypt), easier way:
  const payload = (0,_Helpers__WEBPACK_IMPORTED_MODULE_1__.readBigIntFromBuffer)(toEncrypt, false);
  const encrypted = (0,_Helpers__WEBPACK_IMPORTED_MODULE_1__.modExp)(payload, big_integer__WEBPACK_IMPORTED_MODULE_0___default()(key.e), key.n);
  // rsa module uses transform.int2bytes(encrypted, keylength), easier:
  return (0,_Helpers__WEBPACK_IMPORTED_MODULE_1__.readBufferFromBigInt)(encrypted, 256, false);
}

/***/ }),

/***/ "./src/lib/gramjs/crypto/converters.ts":
/*!*********************************************!*\
  !*** ./src/lib/gramjs/crypto/converters.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ab2i: () => (/* binding */ ab2i),
/* harmony export */   ab2iBig: () => (/* binding */ ab2iBig),
/* harmony export */   ab2iLow: () => (/* binding */ ab2iLow),
/* harmony export */   i2ab: () => (/* binding */ i2ab),
/* harmony export */   i2abBig: () => (/* binding */ i2abBig),
/* harmony export */   i2abLow: () => (/* binding */ i2abLow),
/* harmony export */   isBigEndian: () => (/* binding */ isBigEndian)
/* harmony export */ });
/**
 * Uint32Array -> ArrayBuffer (low-endian os)
 */
function i2abLow(buf) {
  const uint8 = new Uint8Array(buf.length * 4);
  let i = 0;
  for (let j = 0; j < buf.length; j++) {
    const int = buf[j];
    uint8[i++] = int >>> 24;
    uint8[i++] = int >> 16 & 0xFF;
    uint8[i++] = int >> 8 & 0xFF;
    uint8[i++] = int & 0xFF;
  }
  return uint8.buffer;
}

/**
 * Uint32Array -> ArrayBuffer (big-endian os)
 */
function i2abBig(buf) {
  return buf.buffer;
}

/**
 * ArrayBuffer -> Uint32Array (low-endian os)
 */
function ab2iLow(ab) {
  const uint8 = new Uint8Array(ab);
  const buf = new Uint32Array(uint8.length / 4);
  for (let i = 0; i < uint8.length; i += 4) {
    buf[i / 4] = uint8[i] << 24 ^ uint8[i + 1] << 16 ^ uint8[i + 2] << 8 ^ uint8[i + 3];
  }
  return buf;
}

/**
 * ArrayBuffer -> Uint32Array (big-endian os)
 */
function ab2iBig(ab) {
  return new Uint32Array(ab);
}
const isBigEndian = new Uint8Array(new Uint32Array([0x01020304]))[0] === 0x01;
const i2ab = isBigEndian ? i2abBig : i2abLow;
const ab2i = isBigEndian ? ab2iBig : ab2iLow;

/***/ }),

/***/ "./src/lib/gramjs/crypto/crypto.js":
/*!*****************************************!*\
  !*** ./src/lib/gramjs/crypto/crypto.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const AES = (__webpack_require__(/*! @cryptography/aes */ "./node_modules/@cryptography/aes/dist/es/aes.js")["default"]);
const {
  i2ab,
  ab2i
} = __webpack_require__(/*! ./converters */ "./src/lib/gramjs/crypto/converters.ts");
const {
  getWords
} = __webpack_require__(/*! ./words */ "./src/lib/gramjs/crypto/words.ts");
class Counter {
  constructor(initialValue) {
    this.setBytes(initialValue);
  }
  setBytes(bytes) {
    bytes = Buffer.from(bytes);
    this._counter = bytes;
  }
  increment() {
    for (let i = 15; i >= 0; i--) {
      if (this._counter[i] === 255) {
        this._counter[i] = 0;
      } else {
        this._counter[i]++;
        break;
      }
    }
  }
}
class CTR {
  constructor(key, counter) {
    if (!(counter instanceof Counter)) {
      counter = new Counter(counter);
    }
    this._counter = counter;
    this._remainingCounter = undefined;
    this._remainingCounterIndex = 16;
    this._aes = new AES(getWords(key));
  }
  update(plainText) {
    return this.encrypt(plainText);
  }
  encrypt(plainText) {
    const encrypted = Buffer.from(plainText);
    for (let i = 0; i < encrypted.length; i++) {
      if (this._remainingCounterIndex === 16) {
        this._remainingCounter = Buffer.from(i2ab(this._aes.encrypt(ab2i(this._counter._counter))));
        this._remainingCounterIndex = 0;
        this._counter.increment();
      }
      encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
    }
    return encrypted;
  }
}

// endregion
function createDecipheriv(algorithm, key, iv) {
  if (algorithm.includes('ECB')) {
    throw new Error('Not supported');
  } else {
    return new CTR(key, iv);
  }
}
function createCipheriv(algorithm, key, iv) {
  if (algorithm.includes('ECB')) {
    throw new Error('Not supported');
  } else {
    return new CTR(key, iv);
  }
}
function randomBytes(count) {
  const bytes = new Uint8Array(count);
  crypto.getRandomValues(bytes);
  return bytes;
}
class Hash {
  constructor(algorithm) {
    this.algorithm = algorithm;
  }
  update(data) {
    // We shouldn't be needing new Uint8Array but it doesn't
    // work without it
    this.data = new Uint8Array(data);
  }
  async digest() {
    if (this.algorithm === 'sha1') {
      // eslint-disable-next-line no-restricted-globals
      return Buffer.from(await self.crypto.subtle.digest('SHA-1', this.data));
    } else if (this.algorithm === 'sha256') {
      // eslint-disable-next-line no-restricted-globals
      return Buffer.from(await self.crypto.subtle.digest('SHA-256', this.data));
    }
    return undefined;
  }
}
async function pbkdf2(password, salt, iterations) {
  const passwordKey = await crypto.subtle.importKey('raw', password, {
    name: 'PBKDF2'
  }, false, ['deriveBits']);
  return Buffer.from(await crypto.subtle.deriveBits({
    name: 'PBKDF2',
    hash: 'SHA-512',
    salt,
    iterations
  }, passwordKey, 512));
}
function createHash(algorithm) {
  return new Hash(algorithm);
}
module.exports = {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
  pbkdf2
};

/***/ }),

/***/ "./src/lib/gramjs/crypto/words.ts":
/*!****************************************!*\
  !*** ./src/lib/gramjs/crypto/words.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWords: () => (/* binding */ getWords),
/* harmony export */   s2i: () => (/* binding */ s2i),
/* harmony export */   xor: () => (/* binding */ xor)
/* harmony export */ });
/*
 * Imported from https://github.com/spalt08/cryptography/blob/master/packages/aes/src/utils/words.ts
 */

function s2i(str, pos) {
  return str.charCodeAt(pos) << 24 ^ str.charCodeAt(pos + 1) << 16 ^ str.charCodeAt(pos + 2) << 8 ^ str.charCodeAt(pos + 3);
}

/**
 * Helper function for transforming string key to Uint32Array
 */
function getWords(key) {
  if (key instanceof Uint32Array) {
    return key;
  }
  if (typeof key === 'string') {
    if (key.length % 4 !== 0) for (let i = key.length % 4; i <= 4; i++) key += '\0x00';
    const buf = new Uint32Array(key.length / 4);
    for (let i = 0; i < key.length; i += 4) buf[i / 4] = s2i(key, i);
    return buf;
  }
  if (key instanceof Uint8Array) {
    const buf = new Uint32Array(key.length / 4);
    for (let i = 0; i < key.length; i += 4) {
      buf[i / 4] = key[i] << 24 ^ key[i + 1] << 16 ^ key[i + 2] << 8 ^ key[i + 3];
    }
    return buf;
  }
  throw new Error('Unable to create 32-bit words');
}
function xor(left, right) {
  let to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : left;
  for (let i = 0; i < left.length; i++) to[i] = left[i] ^ right[i];
}

/***/ }),

/***/ "./src/lib/gramjs/errors/Common.js":
/*!*****************************************!*\
  !*** ./src/lib/gramjs/errors/Common.js ***!
  \*****************************************/
/***/ ((module) => {

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Errors not related to the Telegram API itself
 */

/**
 * Occurs when a read operation was cancelled.
 */
class ReadCancelledError extends Error {
  constructor() {
    super('The read operation was cancelled.');
  }
}

/**
 * Occurs when a type is not found, for example,
 * when trying to read a TLObject with an invalid constructor code.
 */
class TypeNotFoundError extends Error {
  constructor(invalidConstructorId, remaining) {
    super(`Could not find a matching Constructor ID for the TLObject that was supposed to be
        read with ID ${invalidConstructorId}. Most likely, a TLObject was trying to be read when
         it should not be read. Remaining bytes: ${remaining.length}`);
    if (typeof alert !== 'undefined') {
      // eslint-disable-next-line no-alert
      alert(`Missing MTProto Entity: Please, make sure to add TL definition for ID ${invalidConstructorId}`);
    }
    this.invalidConstructorId = invalidConstructorId;
    this.remaining = remaining;
  }
}

/**
 * Occurs when using the TCP full mode and the checksum of a received
 * packet doesn't match the expected checksum.
 */
class InvalidChecksumError extends Error {
  constructor(checksum, validChecksum) {
    super(`Invalid checksum (${checksum} when ${validChecksum} was expected). This packet should be skipped.`);
    this.checksum = checksum;
    this.validChecksum = validChecksum;
  }
}

/**
 * Occurs when the buffer is invalid, and may contain an HTTP error code.
 * For instance, 404 means "forgotten/broken authorization key", while
 */
class InvalidBufferError extends Error {
  constructor(payload) {
    let code;
    if (payload.length === 4) {
      code = -payload.readInt32LE(0);
      super(`Invalid response buffer (HTTP code ${code})`);
    } else {
      super(`Invalid response buffer (too short ${payload})`);
    }
    this.code = code;
    this.payload = payload;
  }
}

/**
 * Generic security error, mostly used when generating a new AuthKey.
 */
class SecurityError extends Error {
  constructor() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (!args.length) {
      args = ['A security check failed.'];
    }
    super(...args);
  }
}

/**
 * Occurs when there's a hash mismatch between the decrypted CDN file
 * and its expected hash.
 */
class CdnFileTamperedError extends SecurityError {
  constructor() {
    super('The CDN file has been altered and its download cancelled.');
  }
}

/**
 * Occurs when handling a badMessageNotification
 */
class BadMessageError extends Error {
  constructor(request, code) {
    let errorMessage = BadMessageError.ErrorMessages[code] || `Unknown error code (this should not happen): ${code}.`;
    errorMessage += `  Caused by ${request.className}`;
    super(errorMessage);
    this.message = errorMessage;
    this.code = code;
  }
}

// TODO : Support multi errors.
_defineProperty(BadMessageError, "ErrorMessages", {
  16: 'msg_id too low (most likely, client time is wrong it would be worthwhile to ' + 'synchronize it using msg_id notifications and re-send the original message ' + 'with the “correct” msg_id or wrap it in a container with a new msg_id if the ' + 'original message had waited too long on the client to be transmitted).',
  17: 'msg_id too high (similar to the previous case, the client time has to be ' + 'synchronized, and the message re-sent with the correct msg_id).',
  18: 'Incorrect two lower order msg_id bits (the server expects client message msg_id ' + 'to be divisible by 4).',
  19: 'Container msg_id is the same as msg_id of a previously received message (this must never happen).',
  20: 'Message too old, and it cannot be verified whether the server has received a ' + 'message with this msg_id or not.',
  32: 'msg_seqno too low (the server has already received a message with a lower ' + 'msg_id but with either a higher or an equal and odd seqno).',
  33: 'msg_seqno too high (similarly, there is a message with a higher msg_id but with ' + 'either a lower or an equal and odd seqno).',
  34: 'An even msg_seqno expected (irrelevant message), but odd received.',
  35: 'Odd msg_seqno expected (relevant message), but even received.',
  48: 'Incorrect server salt (in this case, the bad_server_salt response is received with ' + 'the correct salt, and the message is to be re-sent with it).',
  64: 'Invalid container.'
});
module.exports = {
  ReadCancelledError,
  TypeNotFoundError,
  InvalidChecksumError,
  InvalidBufferError,
  SecurityError,
  CdnFileTamperedError,
  BadMessageError
};

/***/ }),

/***/ "./src/lib/gramjs/errors/RPCBaseErrors.js":
/*!************************************************!*\
  !*** ./src/lib/gramjs/errors/RPCBaseErrors.js ***!
  \************************************************/
/***/ ((module) => {

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Base class for all Remote Procedure Call errors.
 */
class RPCError extends Error {
  constructor(message, request) {
    let code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    super('RPCError {0}: {1}{2}'.replace('{0}', code).replace('{1}', message).replace('{2}', RPCError._fmtRequest(request)));
    this.code = code;
    this.message = message;
  }
  static _fmtRequest(request) {
    // TODO fix this
    if (request) {
      return ` (caused by ${request.className})`;
    } else {
      return '';
    }
  }
}

/**
 * The request must be repeated, but directed to a different data center.
 */
class InvalidDCError extends RPCError {
  constructor(request, message, code) {
    super(message, request, code);
    this.code = code || 303;
    this.message = message || 'ERROR_SEE_OTHER';
  }
}

/**
 * The query contains errors. In the event that a request was created
 * using a form and contains user generated data, the user should be
 * notified that the data must be corrected before the query is repeated.
 */
class BadRequestError extends RPCError {
  constructor() {
    super(...arguments);
    _defineProperty(this, "code", 400);
    _defineProperty(this, "message", 'BAD_REQUEST');
  }
}

/**
 * There was an unauthorized attempt to use functionality available only
 * to authorized users.
 */
class UnauthorizedError extends RPCError {
  constructor() {
    super(...arguments);
    _defineProperty(this, "code", 401);
    _defineProperty(this, "message", 'UNAUTHORIZED');
  }
}

/**
 * Privacy violation. For example, an attempt to write a message to
 * someone who has blacklisted the current user.
 */
class ForbiddenError extends RPCError {
  constructor() {
    super(...arguments);
    _defineProperty(this, "code", 403);
    _defineProperty(this, "message", 'FORBIDDEN');
  }
}

/**
 * An attempt to invoke a non-existent object, such as a method.
 */
class NotFoundError extends RPCError {
  constructor() {
    super(...arguments);
    _defineProperty(this, "code", 404);
    _defineProperty(this, "message", 'NOT_FOUND');
  }
}

/**
 * Errors related to invalid authorization key, like
 * AUTH_KEY_DUPLICATED which can cause the connection to fail.
 */
class AuthKeyError extends RPCError {
  constructor() {
    super(...arguments);
    _defineProperty(this, "code", 406);
    _defineProperty(this, "message", 'AUTH_KEY');
  }
}

/**
 * The maximum allowed number of attempts to invoke the given method
 * with the given input parameters has been exceeded. For example, in an
 * attempt to request a large number of text messages (SMS) for the same
 * phone number.
 */
class FloodError extends RPCError {
  constructor() {
    super(...arguments);
    _defineProperty(this, "code", 420);
    _defineProperty(this, "message", 'FLOOD');
  }
}

/**
 * An internal server error occurred while a request was being processed
 * for example, there was a disruption while accessing a database or file
 * storage
 */
class ServerError extends RPCError {
  constructor() {
    super(...arguments);
    _defineProperty(this, "code", 500);
    // Also witnessed as -500
    _defineProperty(this, "message", 'INTERNAL');
  }
}

/**
 * Clicking the inline buttons of bots that never (or take to long to)
 * call ``answerCallbackQuery`` will result in this "special" RPCError.
 */
class TimedOutError extends RPCError {
  constructor() {
    super(...arguments);
    _defineProperty(this, "code", 503);
    // Only witnessed as -503
    _defineProperty(this, "message", 'Timeout');
  }
}
module.exports = {
  RPCError,
  InvalidDCError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  AuthKeyError,
  FloodError,
  ServerError,
  TimedOutError
};

/***/ }),

/***/ "./src/lib/gramjs/errors/RPCErrorList.js":
/*!***********************************************!*\
  !*** ./src/lib/gramjs/errors/RPCErrorList.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  RPCError,
  InvalidDCError,
  FloodError,
  BadRequestError,
  TimedOutError
} = __webpack_require__(/*! ./RPCBaseErrors */ "./src/lib/gramjs/errors/RPCBaseErrors.js");
class UserMigrateError extends InvalidDCError {
  constructor(args) {
    const newDc = Number(args.capture || 0);
    // eslint-disable-next-line max-len
    super(`The user whose identity is being used to execute queries is associated with DC ${newDc}${RPCError._fmtRequest(args.request)}`);
    // eslint-disable-next-line max-len
    this.message = `The user whose identity is being used to execute queries is associated with DC ${newDc}${RPCError._fmtRequest(args.request)}`;
    this.newDc = newDc;
  }
}
class PhoneMigrateError extends InvalidDCError {
  constructor(args) {
    const newDc = Number(args.capture || 0);
    // eslint-disable-next-line max-len
    super(`The phone number a user is trying to use for authorization is associated with DC ${newDc}${RPCError._fmtRequest(args.request)}`);
    // eslint-disable-next-line max-len
    this.message = `The phone number a user is trying to use for authorization is associated with DC ${newDc}${RPCError._fmtRequest(args.request)}`;
    this.newDc = newDc;
  }
}
class SlowModeWaitError extends FloodError {
  constructor(args) {
    const seconds = Number(args.capture || 0);
    // eslint-disable-next-line max-len
    super(`A wait of ${seconds} seconds is required before sending another message in this chat${RPCError._fmtRequest(args.request)}`);
    // eslint-disable-next-line max-len
    this.message = `A wait of ${seconds} seconds is required before sending another message in this chat${RPCError._fmtRequest(args.request)}`;
    this.seconds = seconds;
  }
}
class FloodWaitError extends FloodError {
  constructor(args) {
    const seconds = Number(args.capture || 0);
    super(`A wait of ${seconds} seconds is required${RPCError._fmtRequest(args.request)}`);
    this.message = `A wait of ${seconds} seconds is required${RPCError._fmtRequest(args.request)}`;
    this.seconds = seconds;
  }
}
class FloodPremiumWaitError extends FloodWaitError {
  constructor(args) {
    const seconds = Number(args.capture || 0);
    super(`A wait of ${seconds} seconds is required${RPCError._fmtRequest(args.request)}`);
    this.message = `A wait of ${seconds} seconds is required${RPCError._fmtRequest(args.request)}`;
    this.seconds = seconds;
  }
}
class MsgWaitError extends FloodError {
  constructor(args) {
    super(`Message failed to be sent.${RPCError._fmtRequest(args.request)}`);
    this.message = `Message failed to be sent.${RPCError._fmtRequest(args.request)}`;
  }
}
class FloodTestPhoneWaitError extends FloodError {
  constructor(args) {
    const seconds = Number(args.capture || 0);
    super(`A wait of ${seconds} seconds is required in the test servers${RPCError._fmtRequest(args.request)}`);
    // eslint-disable-next-line max-len
    this.message = `A wait of ${seconds} seconds is required in the test servers${RPCError._fmtRequest(args.request)}`;
    this.seconds = seconds;
  }
}
class FileMigrateError extends InvalidDCError {
  constructor(args) {
    const newDc = Number(args.capture || 0);
    super(`The file to be accessed is currently stored in DC ${newDc}${RPCError._fmtRequest(args.request)}`);
    // eslint-disable-next-line max-len
    this.message = `The file to be accessed is currently stored in DC ${newDc}${RPCError._fmtRequest(args.request)}`;
    this.newDc = newDc;
  }
}
class NetworkMigrateError extends InvalidDCError {
  constructor(args) {
    const newDc = Number(args.capture || 0);
    super(`The source IP address is associated with DC ${newDc}${RPCError._fmtRequest(args.request)}`);
    this.message = `The source IP address is associated with DC ${newDc}${RPCError._fmtRequest(args.request)}`;
    this.newDc = newDc;
  }
}
class EmailUnconfirmedError extends BadRequestError {
  constructor(args) {
    const codeLength = Number(args.capture || 0);
    super(`Email unconfirmed, the length of the code must be ${codeLength}${RPCError._fmtRequest(args.request)}`);
    // eslint-disable-next-line max-len
    this.message = `Email unconfirmed, the length of the code must be ${codeLength}${RPCError._fmtRequest(args.request)}`;
    this.codeLength = codeLength;
  }
}
const rpcErrorRe = [[/FILE_MIGRATE_(\d+)/, FileMigrateError], [/FLOOD_TEST_PHONE_WAIT_(\d+)/, FloodTestPhoneWaitError], [/FLOOD_WAIT_(\d+)/, FloodWaitError], [/FLOOD_PREMIUM_WAIT_(\d+)/, FloodPremiumWaitError], [/MSG_WAIT_(.*)/, MsgWaitError], [/PHONE_MIGRATE_(\d+)/, PhoneMigrateError], [/SLOWMODE_WAIT_(\d+)/, SlowModeWaitError], [/USER_MIGRATE_(\d+)/, UserMigrateError], [/NETWORK_MIGRATE_(\d+)/, NetworkMigrateError], [/EMAIL_UNCONFIRMED_(\d+)/, EmailUnconfirmedError], [/^Timeout$/, TimedOutError]];
module.exports = {
  rpcErrorRe,
  FileMigrateError,
  FloodTestPhoneWaitError,
  FloodWaitError,
  FloodPremiumWaitError,
  PhoneMigrateError,
  SlowModeWaitError,
  UserMigrateError,
  NetworkMigrateError,
  MsgWaitError,
  EmailUnconfirmedError
};

/***/ }),

/***/ "./src/lib/gramjs/errors/index.js":
/*!****************************************!*\
  !*** ./src/lib/gramjs/errors/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Converts a Telegram's RPC Error to a Python error.
 * @param rpcError the RPCError instance
 * @param request the request that caused this error
 * @constructor the RPCError as a Python exception that represents this error
 */
const {
  RPCError
} = __webpack_require__(/*! ./RPCBaseErrors */ "./src/lib/gramjs/errors/RPCBaseErrors.js");
const {
  rpcErrorRe
} = __webpack_require__(/*! ./RPCErrorList */ "./src/lib/gramjs/errors/RPCErrorList.js");
function RPCMessageToError(rpcError, request) {
  for (const [msgRegex, Cls] of rpcErrorRe) {
    const m = rpcError.errorMessage.match(msgRegex);
    if (m) {
      const capture = m.length === 2 ? parseInt(m[1], 10) : undefined;
      return new Cls({
        request,
        capture
      });
    }
  }
  return new RPCError(rpcError.errorMessage, request);
}
const Common = __webpack_require__(/*! ./Common */ "./src/lib/gramjs/errors/Common.js");
const RPCBaseErrors = __webpack_require__(/*! ./RPCBaseErrors */ "./src/lib/gramjs/errors/RPCBaseErrors.js");
const RPCErrorList = __webpack_require__(/*! ./RPCErrorList */ "./src/lib/gramjs/errors/RPCErrorList.js");
module.exports = {
  RPCMessageToError,
  ...Common,
  ...RPCBaseErrors,
  ...RPCErrorList
};

/***/ }),

/***/ "./src/lib/gramjs/events/NewMessage.js":
/*!*********************************************!*\
  !*** ./src/lib/gramjs/events/NewMessage.js ***!
  \*********************************************/
/***/ (() => {

/* CONTEST
const { EventBuilder, EventCommon } = require('./common')
const { constructors } = require('../tl')

class NewMessage extends EventBuilder {
    constructor(args = {
        chats: null,
        func: null,
    }) {
        super(args)

        this.chats = args.chats
        this.func = args.func
        this._noCheck = true
    }

    async _resolve(client) {
        await super._resolve(client)
        // this.fromUsers = await _intoIdSet(client, this.fromUsers)
    }

    build(update, others = null, thisId = null) {
        let event
        if (update instanceof constructors.UpdateNewMessage || update instanceof constructors.UpdateNewChannelMessage) {
            if (!(update.message instanceof constructors.Message)) {
                return
            }
            event = new Event(update.message)
        } else if (update instanceof constructors.UpdateShortMessage) {
            event = new Event(new constructors.Message({
                out: update.out,
                mentioned: update.mentioned,
                mediaUnread: update.mediaUnread,
                silent: update.silent,
                id: update.id,
                // Note that to_id/from_id complement each other in private
                // messages, depending on whether the message was outgoing.
                toId: new constructors.PeerUser(update.out ? update.userId : thisId),
                fromId: update.out ? thisId : update.userId,
                message: update.message,
                date: update.date,
                fwdFrom: update.fwdFrom,
                viaBotId: update.viaBotId,
                replyToMsgId: update.replyToMsgId,
                entities: update.entities,
            }))
        } else if (update instanceof constructors.UpdateShortChatMessage) {
            event = new this.Event(new constructors.Message({
                out: update.out,
                mentioned: update.mentioned,
                mediaUnread: update.mediaUnread,
                silent: update.silent,
                id: update.id,
                toId: new constructors.PeerChat(update.chatId),
                fromId: update.fromId,
                message: update.message,
                date: update.date,
                fwdFrom: update.fwdFrom,
                viaBotId: update.viaBotId,
                replyToMsgId: update.replyToMsgId,
                entities: update.entities,
            }))
        } else {
            return
        }

        // Make messages sent to ourselves outgoing unless they're forwarded.
        // This makes it consistent with official client's appearance.
        const ori = event.message
        if (ori.toId instanceof constructors.PeerUser) {
            if (ori.fromId === ori.toId.userId && !ori.fwdFrom) {
                event.message.out = true
            }
        }
        return event
    }

    filter(event) {
        if (this._noCheck) {
            return event
        }
        return event
    }
}

class Event extends EventCommon {
    constructor(message) {
        super()
        this.message = message
    }
}

module.exports = NewMessage
*/

/***/ }),

/***/ "./src/lib/gramjs/events/Raw.js":
/*!**************************************!*\
  !*** ./src/lib/gramjs/events/Raw.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  EventBuilder
} = __webpack_require__(/*! ./common */ "./src/lib/gramjs/events/common.js");
class Raw extends EventBuilder {
  constructor() {
    let args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      types: undefined,
      func: undefined
    };
    super();
    if (!args.types) {
      this.types = true;
    } else {
      this.types = args.types;
    }
  }
  build(update) {
    return update;
  }
}
module.exports = Raw;

/***/ }),

/***/ "./src/lib/gramjs/events/common.js":
/*!*****************************************!*\
  !*** ./src/lib/gramjs/events/common.js ***!
  \*****************************************/
/***/ ((module) => {

class EventBuilder {
  constructor() {
    let args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      chats: undefined,
      blacklistChats: undefined,
      func: undefined
    };
    this.chats = args.chats;
    this.blacklistChats = Boolean(args.blacklistChats);
    this.resolved = false;
    this.func = args.func;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(update) {}
}
module.exports = {
  EventBuilder
};

/***/ }),

/***/ "./src/lib/gramjs/events/index.js":
/*!****************************************!*\
  !*** ./src/lib/gramjs/events/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const NewMessage = __webpack_require__(/*! ./NewMessage */ "./src/lib/gramjs/events/NewMessage.js");
const Raw = __webpack_require__(/*! ./Raw */ "./src/lib/gramjs/events/Raw.js");
class StopPropagation extends Error {}
module.exports = {
  NewMessage,
  StopPropagation,
  Raw
};

/***/ }),

/***/ "./src/lib/gramjs/extensions/AsyncQueue.js":
/*!*************************************************!*\
  !*** ./src/lib/gramjs/extensions/AsyncQueue.js ***!
  \*************************************************/
/***/ ((module) => {

class AsyncQueue {
  constructor() {
    this._queue = [];
    this.canGet = new Promise(resolve => {
      this.resolveGet = resolve;
    });
    this.canPush = true;
  }
  async push(value) {
    await this.canPush;
    this._queue.push(value);
    this.resolveGet(true);
    this.canPush = new Promise(resolve => {
      this.resolvePush = resolve;
    });
  }
  async pop() {
    await this.canGet;
    const returned = this._queue.pop();
    this.resolvePush(true);
    this.canGet = new Promise(resolve => {
      this.resolveGet = resolve;
    });
    return returned;
  }
}
module.exports = AsyncQueue;

/***/ }),

/***/ "./src/lib/gramjs/extensions/BinaryReader.js":
/*!***************************************************!*\
  !*** ./src/lib/gramjs/extensions/BinaryReader.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  TypeNotFoundError
} = __webpack_require__(/*! ../errors/Common */ "./src/lib/gramjs/errors/Common.js");
const {
  coreObjects
} = __webpack_require__(/*! ../tl/core */ "./src/lib/gramjs/tl/core/index.js");
const {
  tlobjects
} = __webpack_require__(/*! ../tl/AllTLObjects */ "./src/lib/gramjs/tl/AllTLObjects.js");
const {
  readBigIntFromBuffer
} = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
class BinaryReader {
  /**
   * Small utility class to read binary data.
   * @param data {Buffer}
   */
  constructor(data) {
    this.stream = data;
    this._last = undefined;
    this.offset = 0;
  }

  // region Reading

  // "All numbers are written as little endian."
  // https://core.telegram.org/mtproto
  /**
   * Reads a single byte value.
   */
  readByte() {
    return this.read(1)[0];
  }

  /**
   * Reads an integer (4 bytes or 32 bits) value.
   * @param signed {Boolean}
   */
  readInt() {
    let signed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    let res;
    if (signed) {
      res = this.stream.readInt32LE(this.offset);
    } else {
      res = this.stream.readUInt32LE(this.offset);
    }
    this.offset += 4;
    return res;
  }

  /**
   * Reads a long integer (8 bytes or 64 bits) value.
   * @param signed
   * @returns {BigInteger}
   */
  readLong() {
    let signed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return this.readLargeInt(64, signed);
  }

  /**
   * Reads a real floating point (4 bytes) value.
   * @returns {number}
   */
  readFloat() {
    return this.read(4).readFloatLE(0);
  }

  /**
   * Reads a real floating point (8 bytes) value.
   * @returns {BigInteger}
   */
  readDouble() {
    // was this a bug ? it should have been <d
    return this.read(8).readDoubleLE(0);
  }

  /**
   * Reads a n-bits long integer value.
   * @param bits
   * @param signed {Boolean}
   */
  readLargeInt(bits) {
    let signed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const buffer = this.read(Math.floor(bits / 8));
    return readBigIntFromBuffer(buffer, true, signed);
  }

  /**
   * Read the given amount of bytes, or -1 to read all remaining.
   * @param length {number}
   */
  read() {
    let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
    if (length === -1) {
      length = this.stream.length - this.offset;
    }
    const result = this.stream.slice(this.offset, this.offset + length);
    this.offset += length;
    if (result.length !== length) {
      throw Error(`No more data left to read (need ${length}, got ${result.length}: ${result}); last read ${this._last}`);
    }
    this._last = result;
    return result;
  }

  /**
   * Gets the byte array representing the current buffer as a whole.
   * @returns {Buffer}
   */
  getBuffer() {
    return this.stream;
  }

  // endregion

  // region Telegram custom reading
  /**
   * Reads a Telegram-encoded byte array, without the need of
   * specifying its length.
   * @returns {Buffer}
   */
  tgReadBytes() {
    const firstByte = this.readByte();
    let padding;
    let length;
    if (firstByte === 254) {
      length = this.readByte() | this.readByte() << 8 | this.readByte() << 16;
      padding = length % 4;
    } else {
      length = firstByte;
      padding = (length + 1) % 4;
    }
    const data = this.read(length);
    if (padding > 0) {
      padding = 4 - padding;
      this.read(padding);
    }
    return data;
  }

  /**
   * Reads a Telegram-encoded string.
   * @returns {string}
   */
  tgReadString() {
    return this.tgReadBytes().toString('utf-8');
  }

  /**
   * Reads a Telegram boolean value.
   * @returns {boolean}
   */
  tgReadBool() {
    const value = this.readInt(false);
    if (value === 0x997275b5) {
      // boolTrue
      return true;
    } else if (value === 0xbc799737) {
      // boolFalse
      return false;
    } else {
      throw new Error(`Invalid boolean code ${value.toString('16')}`);
    }
  }

  /**
   * Reads and converts Unix time (used by Telegram)
   * into a Javascript {Date} object.
   * @returns {Date}
   */
  tgReadDate() {
    const value = this.readInt();
    return new Date(value * 1000);
  }

  /**
   * Reads a Telegram object.
   */
  tgReadObject() {
    const constructorId = this.readInt(false);
    let clazz = tlobjects[constructorId];
    if (clazz === undefined) {
      /**
       * The class was None, but there's still a
       * chance of it being a manually parsed value like bool!
       */
      const value = constructorId;
      if (value === 0x997275b5) {
        // boolTrue
        return true;
      } else if (value === 0xbc799737) {
        // boolFalse
        return false;
      } else if (value === 0x1cb5c415) {
        // Vector
        const temp = [];
        const length = this.readInt();
        for (let i = 0; i < length; i++) {
          temp.push(this.tgReadObject());
        }
        return temp;
      }
      clazz = coreObjects[constructorId];
      if (clazz === undefined) {
        // If there was still no luck, give up
        this.seek(-4); // Go back
        const pos = this.tellPosition();
        const error = new TypeNotFoundError(constructorId, this.read());
        this.setPosition(pos);
        throw error;
      }
    }
    return clazz.fromReader(this);
  }

  /**
   * Reads a vector (a list) of Telegram objects.
   * @returns {[Buffer]}
   */
  tgReadVector() {
    if (this.readInt(false) !== 0x1cb5c415) {
      throw new Error('Invalid constructor code, vector was expected');
    }
    const count = this.readInt();
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(this.tgReadObject());
    }
    return temp;
  }

  // endregion

  /**
   * Closes the reader.
   */
  close() {
    this.stream = undefined;
  }

  // region Position related

  /**
   * Tells the current position on the stream.
   * @returns {number}
   */
  tellPosition() {
    return this.offset;
  }

  /**
   * Sets the current position on the stream.
   * @param position
   */
  setPosition(position) {
    this.offset = position;
  }

  /**
   * Seeks the stream position given an offset from the current position.
   * The offset may be negative.
   * @param offset
   */
  seek(offset) {
    this.offset += offset;
  }

  // endregion
}
module.exports = BinaryReader;

/***/ }),

/***/ "./src/lib/gramjs/extensions/BinaryWriter.js":
/*!***************************************************!*\
  !*** ./src/lib/gramjs/extensions/BinaryWriter.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
class BinaryWriter {
  constructor(stream) {
    this._stream = stream;
  }
  write(buffer) {
    this._stream = Buffer.concat([this._stream, buffer]);
  }
  getValue() {
    return this._stream;
  }
}
module.exports = BinaryWriter;

/***/ }),

/***/ "./src/lib/gramjs/extensions/HttpStream.ts":
/*!*************************************************!*\
  !*** ./src/lib/gramjs/extensions/HttpStream.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
var _AbortSignal;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const closeError = new Error('HttpStream was closed');
const REQUEST_TIMEOUT = 10000;
(_AbortSignal = AbortSignal).timeout ?? (_AbortSignal.timeout = function timeout(ms) {
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), ms);
  return ctrl.signal;
});
class HttpStream {
  constructor(disconnectedCallback) {
    _defineProperty(this, "url", void 0);
    _defineProperty(this, "isClosed", void 0);
    _defineProperty(this, "stream", []);
    _defineProperty(this, "canRead", Promise.resolve());
    _defineProperty(this, "resolveRead", void 0);
    _defineProperty(this, "rejectRead", void 0);
    _defineProperty(this, "disconnectedCallback", void 0);
    this.isClosed = true;
    this.disconnectedCallback = disconnectedCallback;
  }
  async read() {
    await this.canRead;
    const data = this.stream.shift();
    if (this.stream.length === 0) {
      this.canRead = new Promise((resolve, reject) => {
        this.resolveRead = resolve;
        this.rejectRead = reject;
      });
    }
    return data;
  }
  static getURL(ip, port, testServers, isPremium) {
    if (port === 443) {
      return `https://${ip}:${port}/apiw1${testServers ? '_test' : ''}${isPremium ? '_premium' : ''}`;
    } else {
      return `http://${ip}:${port}/apiw1${testServers ? '_test' : ''}${isPremium ? '_premium' : ''}`;
    }
  }
  async connect(port, ip) {
    let testServers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let isPremium = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    this.stream = [];
    this.canRead = new Promise((resolve, reject) => {
      this.resolveRead = resolve;
      this.rejectRead = reject;
    });
    this.url = HttpStream.getURL(ip, port, testServers, isPremium);
    await fetch(this.url, {
      method: 'POST',
      body: Buffer.from([]),
      mode: 'cors',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT)
    });
    this.isClosed = false;
  }
  write(data) {
    if (this.isClosed || !this.url) {
      this.handleDisconnect();
      throw closeError;
    }
    return fetch(this.url, {
      method: 'POST',
      body: data,
      mode: 'cors',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT)
    }).then(async response => {
      if (this.isClosed) {
        this.handleDisconnect();
        return;
      }
      if (response.status !== 200) {
        throw closeError;
      }
      const arrayBuffer = await response.arrayBuffer();
      this.stream = this.stream.concat(Buffer.from(arrayBuffer));
      if (this.resolveRead && !this.isClosed) this.resolveRead();
    }).catch(err => {
      this.handleDisconnect();
      throw err;
    });
  }
  handleDisconnect() {
    this.disconnectedCallback?.();
    if (this.rejectRead) this.rejectRead();
  }
  close() {
    this.isClosed = true;
    this.handleDisconnect();
    this.disconnectedCallback = undefined;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HttpStream);

/***/ }),

/***/ "./src/lib/gramjs/extensions/Logger.js":
/*!*********************************************!*\
  !*** ./src/lib/gramjs/extensions/Logger.js ***!
  \*********************************************/
/***/ ((module) => {

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// eslint-disable-next-line @typescript-eslint/naming-convention
let _level;
class Logger {
  constructor(level) {
    if (!_level) {
      _level = level || 'debug';
    }
    this.colors = {
      start: '%c',
      warn: 'color : #ff00ff',
      info: 'color : #ffff00',
      debug: 'color : #00ffff',
      error: 'color : #ff0000',
      end: ''
    };
    this.messageFormat = '[%t] [%l] - [%m]';
  }
  static setLevel(level) {
    _level = level;
  }

  /**
   *
   * @param level {string}
   * @returns {boolean}
   */
  canSend(level) {
    return Logger.LEVEL_MAP.get(_level).has(level);
  }

  /**
   * @param message {string}
   */
  warn(message) {
    this._log('warn', message, this.colors.warn);
  }

  /**
   * @param message {string}
   */
  info(message) {
    this._log('info', message, this.colors.info);
  }

  /**
   * @param message {string}
   */
  debug(message) {
    this._log('debug', message, this.colors.debug);
  }

  /**
   * @param message {string}
   */
  error(message) {
    this._log('error', message, this.colors.error);
  }
  format(message, level) {
    return this.messageFormat.replace('%t', new Date().toISOString()).replace('%l', level.toUpperCase()).replace('%m', message);
  }

  /**
   * @param level {string}
   * @param message {string}
   * @param color {string}
   */
  _log(level, message, color) {
    if (!_level) {
      return;
    }
    if (this.canSend(level)) {
      // eslint-disable-next-line no-console
      console.log(this.colors.start + this.format(message, level), color);
    }
  }
}
_defineProperty(Logger, "LEVEL_MAP", new Map([['error', new Set(['error'])], ['warn', new Set(['error', 'warn'])], ['info', new Set(['error', 'warn', 'info'])], ['debug', new Set(['error', 'warn', 'info', 'debug'])]]));
module.exports = Logger;

/***/ }),

/***/ "./src/lib/gramjs/extensions/MessagePacker.js":
/*!****************************************************!*\
  !*** ./src/lib/gramjs/extensions/MessagePacker.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const MessageContainer = __webpack_require__(/*! ../tl/core/MessageContainer */ "./src/lib/gramjs/tl/core/MessageContainer.js");
const TLMessage = __webpack_require__(/*! ../tl/core/TLMessage */ "./src/lib/gramjs/tl/core/TLMessage.js");
const BinaryWriter = __webpack_require__(/*! ./BinaryWriter */ "./src/lib/gramjs/extensions/BinaryWriter.js");
const USE_INVOKE_AFTER_WITH = new Set(['messages.SendMessage', 'messages.SendMedia', 'messages.SendMultiMedia', 'messages.ForwardMessages', 'messages.SendInlineBotResult']);
class MessagePacker {
  constructor(state, logger) {
    this._state = state;
    this._queue = [];
    this._pendingStates = [];
    this._ready = new Promise(resolve => {
      this.setReady = resolve;
    });
    this._log = logger;
  }
  values() {
    return this._queue;
  }
  clear() {
    this._queue = [];
    this.append(undefined);
  }
  append(state) {
    let setReady = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let atStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    // We need to check if there is already a `USE_INVOKE_AFTER_WITH` request
    if (state && USE_INVOKE_AFTER_WITH.has(state.request.className)) {
      if (atStart) {
        // Assign `after` for the previously first `USE_INVOKE_AFTER_WITH` request
        for (let i = 0; i < this._queue.length; i++) {
          if (USE_INVOKE_AFTER_WITH.has(this._queue[i]?.request.className)) {
            this._queue[i].after = state;
            break;
          }
        }
      } else {
        // Assign after for the previous `USE_INVOKE_AFTER_WITH` request
        for (let i = this._queue.length - 1; i >= 0; i--) {
          if (USE_INVOKE_AFTER_WITH.has(this._queue[i]?.request.className)) {
            state.after = this._queue[i];
            break;
          }
        }
      }
    }
    if (atStart) {
      this._queue.unshift(state);
    } else {
      this._queue.push(state);
    }
    if (setReady) {
      this.setReady(true);
    }

    // 1658238041=MsgsAck, we don't care about MsgsAck here because they never resolve anyway.
    if (state && state.request.CONSTRUCTOR_ID !== 1658238041) {
      this._pendingStates.push(state);
      state.promise
      // Using finally causes triggering `unhandledrejection` event
      .catch(() => {}).finally(() => {
        this._pendingStates = this._pendingStates.filter(s => s !== state);
      });
    }
  }
  prepend(states) {
    states.reverse().forEach(state => {
      this.append(state, false, true);
    });
    this.setReady(true);
  }
  extend(states) {
    states.forEach(state => {
      this.append(state, false);
    });
    this.setReady(true);
  }
  async getBeacon(state) {
    const buffer = new BinaryWriter(Buffer.alloc(0));
    const size = state.data.length + TLMessage.SIZE_OVERHEAD;
    if (size <= MessageContainer.MAXIMUM_SIZE) {
      let afterId;
      if (state.after) {
        afterId = state.after.msgId;
      }
      state.msgId = await this._state.writeDataAsMessage(buffer, state.data, state.request.classType === 'request', afterId);
      this._log.debug(`Assigned msgId = ${state.msgId} to ${state.request.className || state.request.constructor.name}`);
      return buffer.getValue();
    }
    this._log.warn(`Message payload for ${state.request.className || state.request.constructor.name} is too long ${state.data.length} and cannot be sent`);
    state.reject('Request Payload is too big');
    return undefined;
  }
  async wait() {
    if (!this._queue.length) {
      this._ready = new Promise(resolve => {
        this.setReady = resolve;
      });
      await this._ready;
    }
  }
  async get() {
    if (!this._queue[this._queue.length - 1]) {
      this._queue = this._queue.filter(Boolean);
      return undefined;
    }
    let data;
    let buffer = new BinaryWriter(Buffer.alloc(0));
    const batch = [];
    let size = 0;
    while (this._queue.length && batch.length <= MessageContainer.MAXIMUM_LENGTH) {
      const state = this._queue.shift();
      if (!state) {
        continue;
      }
      if (state.abortSignal?.aborted) {
        state.reject(new Error('Request aborted'));
        continue;
      }
      size += state.data.length + TLMessage.SIZE_OVERHEAD;
      if (size <= MessageContainer.MAXIMUM_SIZE) {
        let afterId;
        if (state.after) {
          afterId = state.after.msgId;
        }
        state.msgId = await this._state.writeDataAsMessage(buffer, state.data, state.request.classType === 'request', afterId);
        this._log.debug(`Assigned msgId = ${state.msgId} to ${state.request.className || state.request.constructor.name}`);
        batch.push(state);
        continue;
      }
      if (batch.length) {
        this._queue.unshift(state);
        break;
      }
      this._log.warn(`Message payload for ${state.request.className || state.request.constructor.name} is too long ${state.data.length} and cannot be sent`);
      state.reject('Request Payload is too big');
      size = 0;
    }
    if (!batch.length) {
      return undefined;
    }
    if (batch.length > 1) {
      const b = Buffer.alloc(8);
      b.writeUInt32LE(MessageContainer.CONSTRUCTOR_ID, 0);
      b.writeInt32LE(batch.length, 4);
      data = Buffer.concat([b, buffer.getValue()]);
      buffer = new BinaryWriter(Buffer.alloc(0));
      const containerId = await this._state.writeDataAsMessage(buffer, data, false);
      for (const s of batch) {
        s.containerId = containerId;
      }
    }
    data = buffer.getValue();
    return {
      batch,
      data
    };
  }
}
module.exports = MessagePacker;

/***/ }),

/***/ "./src/lib/gramjs/extensions/PendingState.js":
/*!***************************************************!*\
  !*** ./src/lib/gramjs/extensions/PendingState.js ***!
  \***************************************************/
/***/ ((module) => {

class PendingState {
  constructor() {
    this._pending = new Map();
  }
  set(msgId, state) {
    this._pending.set(msgId.toString(), state);
  }
  get(msgId) {
    return this._pending.get(msgId.toString());
  }
  getAndDelete(msgId) {
    const state = this.get(msgId);
    this.delete(msgId);
    return state;
  }
  values() {
    return Array.from(this._pending.values());
  }
  delete(msgId) {
    this._pending.delete(msgId.toString());
  }
  clear() {
    this._pending.clear();
  }
}
module.exports = PendingState;

/***/ }),

/***/ "./src/lib/gramjs/extensions/PromisedWebSockets.js":
/*!*********************************************************!*\
  !*** ./src/lib/gramjs/extensions/PromisedWebSockets.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const {
  Mutex
} = __webpack_require__(/*! async-mutex */ "./node_modules/async-mutex/lib/index.js");
const mutex = new Mutex();
const closeError = new Error('WebSocket was closed');
const CONNECTION_TIMEOUT = 3000;
const MAX_TIMEOUT = 30000;
class PromisedWebSockets {
  constructor(disconnectedCallback) {
    /* CONTEST
    this.isBrowser = typeof process === 'undefined' ||
        process.type === 'renderer' ||
        process.browser === true ||
        process.__nwjs
      */
    this.client = undefined;
    this.closed = true;
    this.disconnectedCallback = disconnectedCallback;
    this.timeout = CONNECTION_TIMEOUT;
  }
  async readExactly(number) {
    let readData = Buffer.alloc(0);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const thisTime = await this.read(number);
      readData = Buffer.concat([readData, thisTime]);
      number -= thisTime.length;
      if (!number) {
        return readData;
      }
    }
  }
  async read(number) {
    if (this.closed) {
      throw closeError;
    }
    await this.canRead;
    if (this.closed) {
      throw closeError;
    }
    const toReturn = this.stream.slice(0, number);
    this.stream = this.stream.slice(number);
    if (this.stream.length === 0) {
      this.canRead = new Promise(resolve => {
        this.resolveRead = resolve;
      });
    }
    return toReturn;
  }
  async readAll() {
    if (this.closed || !(await this.canRead)) {
      throw closeError;
    }
    const toReturn = this.stream;
    this.stream = Buffer.alloc(0);
    this.canRead = new Promise(resolve => {
      this.resolveRead = resolve;
    });
    return toReturn;
  }
  getWebSocketLink(ip, port, testServers, isPremium) {
    if (port === 443) {
      return `wss://${ip}:${port}/apiws${testServers ? '_test' : ''}${isPremium ? '_premium' : ''}`;
    } else {
      return `ws://${ip}:${port}/apiws${testServers ? '_test' : ''}${isPremium ? '_premium' : ''}`;
    }
  }
  connect(port, ip) {
    let testServers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let isPremium = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    this.stream = Buffer.alloc(0);
    this.canRead = new Promise(resolve => {
      this.resolveRead = resolve;
    });
    this.closed = false;
    this.website = this.getWebSocketLink(ip, port, testServers, isPremium);
    this.client = new WebSocket(this.website, 'binary');
    return new Promise((resolve, reject) => {
      let hasResolved = false;
      let timeout;
      this.client.onopen = () => {
        this.receive();
        resolve(this);
        hasResolved = true;
        if (timeout) clearTimeout(timeout);
      };
      this.client.onerror = error => {
        // eslint-disable-next-line no-console
        console.error('WebSocket error', error);
        reject(error);
        hasResolved = true;
        if (timeout) clearTimeout(timeout);
      };
      this.client.onclose = event => {
        const {
          code,
          reason,
          wasClean
        } = event;
        if (code !== 1000) {
          // eslint-disable-next-line no-console
          console.error(`Socket ${ip} closed. Code: ${code}, reason: ${reason}, was clean: ${wasClean}`);
        }
        this.resolveRead(false);
        this.closed = true;
        if (this.disconnectedCallback) {
          this.disconnectedCallback();
        }
        hasResolved = true;
        if (timeout) clearTimeout(timeout);
      };
      timeout = setTimeout(() => {
        if (hasResolved) return;
        reject(new Error('WebSocket connection timeout'));
        this.resolveRead(false);
        this.closed = true;
        if (this.disconnectedCallback) {
          this.disconnectedCallback();
        }
        this.client.close();
        this.timeout *= 2;
        this.timeout = Math.min(this.timeout, MAX_TIMEOUT);
        timeout = undefined;
      }, this.timeout);

      // CONTEST
      // Seems to not be working, at least in a web worker
      // eslint-disable-next-line no-restricted-globals
      self.addEventListener('offline', async () => {
        await this.close();
        this.resolveRead(false);
      });
    });
  }
  write(data) {
    if (this.closed) {
      throw closeError;
    }
    this.client.send(data);
  }
  async close() {
    await this.client.close();
    this.closed = true;
  }
  receive() {
    this.client.onmessage = async message => {
      await mutex.runExclusive(async () => {
        const data = message.data instanceof ArrayBuffer ? Buffer.from(message.data) : Buffer.from(await new Response(message.data).arrayBuffer());
        this.stream = Buffer.concat([this.stream, data]);
        this.resolveRead(true);
      });
    };
  }
}
module.exports = PromisedWebSockets;

/***/ }),

/***/ "./src/lib/gramjs/extensions/index.js":
/*!********************************************!*\
  !*** ./src/lib/gramjs/extensions/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Logger = __webpack_require__(/*! ./Logger */ "./src/lib/gramjs/extensions/Logger.js");
const BinaryWriter = __webpack_require__(/*! ./BinaryWriter */ "./src/lib/gramjs/extensions/BinaryWriter.js");
const BinaryReader = __webpack_require__(/*! ./BinaryReader */ "./src/lib/gramjs/extensions/BinaryReader.js");
const PromisedWebSockets = __webpack_require__(/*! ./PromisedWebSockets */ "./src/lib/gramjs/extensions/PromisedWebSockets.js");
const MessagePacker = __webpack_require__(/*! ./MessagePacker */ "./src/lib/gramjs/extensions/MessagePacker.js");
const AsyncQueue = __webpack_require__(/*! ./AsyncQueue */ "./src/lib/gramjs/extensions/AsyncQueue.js");
module.exports = {
  BinaryWriter,
  BinaryReader,
  MessagePacker,
  AsyncQueue,
  Logger,
  PromisedWebSockets
};

/***/ }),

/***/ "./src/lib/gramjs/index.js":
/*!*********************************!*\
  !*** ./src/lib/gramjs/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Api = __webpack_require__(/*! ./tl/api */ "./src/lib/gramjs/tl/api.js");
const TelegramClient = __webpack_require__(/*! ./client/TelegramClient */ "./src/lib/gramjs/client/TelegramClient.js");
const connection = __webpack_require__(/*! ./network */ "./src/lib/gramjs/network/index.js");
const tl = __webpack_require__(/*! ./tl */ "./src/lib/gramjs/tl/index.js");
const version = __webpack_require__(/*! ./Version */ "./src/lib/gramjs/Version.js");
const events = __webpack_require__(/*! ./events */ "./src/lib/gramjs/events/index.js");
const utils = __webpack_require__(/*! ./Utils */ "./src/lib/gramjs/Utils.js");
const errors = __webpack_require__(/*! ./errors */ "./src/lib/gramjs/errors/index.js");
const sessions = __webpack_require__(/*! ./sessions */ "./src/lib/gramjs/sessions/index.js");
const extensions = __webpack_require__(/*! ./extensions */ "./src/lib/gramjs/extensions/index.js");
const helpers = __webpack_require__(/*! ./Helpers */ "./src/lib/gramjs/Helpers.js");
module.exports = {
  Api,
  TelegramClient,
  sessions,
  connection,
  extensions,
  tl,
  version,
  events,
  utils,
  errors,
  helpers
};

/***/ }),

/***/ "./src/lib/gramjs/network/Authenticator.ts":
/*!*************************************************!*\
  !*** ./src/lib/gramjs/network/Authenticator.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   doAuthentication: () => (/* binding */ doAuthentication)
/* harmony export */ });
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tl/api */ "./src/lib/gramjs/tl/api.js");
/* harmony import */ var _tl_api__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tl_api__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/lib/gramjs/errors/index.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_errors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _crypto_RSA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../crypto/RSA */ "./src/lib/gramjs/crypto/RSA.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
/**
 * Executes the authentication process with the Telegram servers.
 * @param sender a connected {MTProtoPlainSender}.
 * @param log
 * @returns {Promise<{authKey: *, timeOffset: *}>}
 */
// eslint-disable-next-line import/no-named-default


// eslint-disable-next-line import/no-named-default


const bigInt = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
const IGE = __webpack_require__(/*! ../crypto/IGE */ "./src/lib/gramjs/crypto/IGE.js");
const AuthKey = __webpack_require__(/*! ../crypto/AuthKey */ "./src/lib/gramjs/crypto/AuthKey.js");
const Factorizator = __webpack_require__(/*! ../crypto/Factorizator */ "./src/lib/gramjs/crypto/Factorizator.js");
const Helpers = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
const BinaryReader = __webpack_require__(/*! ../extensions/BinaryReader */ "./src/lib/gramjs/extensions/BinaryReader.js");
const RETRIES = 20;
async function doAuthentication(sender, log) {
  // Step 1 sending: PQ Request, endianness doesn't matter since it's random
  let bytes = Helpers.generateRandomBytes(16);
  const nonce = Helpers.readBigIntFromBuffer(bytes, false, true);
  const resPQ = await sender.send(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().ReqPqMulti)({
    nonce
  }));
  log.debug('Starting authKey generation step 1');
  if (!(resPQ instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().ResPQ))) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError(`Step 1 answer was ${resPQ}`);
  }
  if (resPQ.nonce.neq(nonce)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 1 invalid nonce from server');
  }
  const pq = Helpers.readBigIntFromBuffer(resPQ.pq, false, true);
  log.debug('Finished authKey generation step 1');
  // Step 2 sending: DH Exchange
  const {
    p,
    q
  } = Factorizator.factorize(pq);
  const pBuffer = Helpers.getByteArray(p);
  const qBuffer = Helpers.getByteArray(q);
  bytes = Helpers.generateRandomBytes(32);
  const newNonce = Helpers.readBigIntFromBuffer(bytes, true, true);
  const pqInnerData = new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().PQInnerData)({
    pq: Helpers.getByteArray(pq),
    // unsigned
    p: pBuffer,
    q: qBuffer,
    nonce: resPQ.nonce,
    serverNonce: resPQ.serverNonce,
    newNonce
  }).getBytes();
  if (pqInnerData.length > 144) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 1 invalid nonce from server');
  }
  let targetFingerprint;
  let targetKey;
  for (const fingerprint of resPQ.serverPublicKeyFingerprints) {
    targetKey = _crypto_RSA__WEBPACK_IMPORTED_MODULE_2__.SERVER_KEYS.get(fingerprint.toString());
    if (targetKey !== undefined) {
      targetFingerprint = fingerprint;
      break;
    }
  }
  if (targetFingerprint === undefined || targetKey === undefined) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 2 could not find a valid key for fingerprints');
  }
  // Value should be padded to be made 192 exactly
  const padding = Helpers.generateRandomBytes(192 - pqInnerData.length);
  const dataWithPadding = Buffer.concat([pqInnerData, padding]);
  const dataPadReversed = Buffer.from(dataWithPadding).reverse();
  let encryptedData;
  for (let i = 0; i < RETRIES; i++) {
    const tempKey = Helpers.generateRandomBytes(32);
    const shaDigestKeyWithData = await Helpers.sha256(Buffer.concat([tempKey, dataWithPadding]));
    const dataWithHash = Buffer.concat([dataPadReversed, shaDigestKeyWithData]);
    const ige = new IGE(tempKey, Buffer.alloc(32));
    const aesEncrypted = ige.encryptIge(dataWithHash);
    const tempKeyXor = Helpers.bufferXor(tempKey, await Helpers.sha256(aesEncrypted));
    const keyAesEncrypted = Buffer.concat([tempKeyXor, aesEncrypted]);
    const keyAesEncryptedInt = Helpers.readBigIntFromBuffer(keyAesEncrypted, false, false);
    if (keyAesEncryptedInt.greaterOrEquals(targetKey.n)) {
      log.debug('Aes key greater than RSA. retrying');
      continue;
    }
    const encryptedDataBuffer = Helpers.modExp(keyAesEncryptedInt, bigInt(targetKey.e), targetKey.n);
    encryptedData = Helpers.readBufferFromBigInt(encryptedDataBuffer, 256, false, false);
    break;
  }
  if (encryptedData === undefined) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 2 could create a secure encrypted key');
  }
  log.debug('Step 2 : Generated a secure aes encrypted data');
  const serverDhParams = await sender.send(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().ReqDHParams)({
    nonce: resPQ.nonce,
    serverNonce: resPQ.serverNonce,
    p: pBuffer,
    q: qBuffer,
    publicKeyFingerprint: targetFingerprint,
    encryptedData
  }));
  if (!(serverDhParams instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().ServerDHParamsOk) || serverDhParams instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().ServerDHParamsFail))) {
    throw new Error(`Step 2.1 answer was ${serverDhParams}`);
  }
  if (serverDhParams.nonce.neq(resPQ.nonce)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 2 invalid nonce from server');
  }
  if (serverDhParams.serverNonce.neq(resPQ.serverNonce)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 2 invalid server nonce from server');
  }
  if (serverDhParams instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().ServerDHParamsFail)) {
    const sh = await Helpers.sha1(Helpers.toSignedLittleBuffer(newNonce, 32).slice(4, 20));
    const nnh = Helpers.readBigIntFromBuffer(sh, true, true);
    if (serverDhParams.newNonceHash.neq(nnh)) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 2 invalid DH fail nonce from server');
    }
  }
  if (!(serverDhParams instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().ServerDHParamsOk))) {
    throw new Error(`Step 2.2 answer was ${serverDhParams}`);
  }
  log.debug('Finished authKey generation step 2');
  log.debug('Starting authKey generation step 3');

  // Step 3 sending: Complete DH Exchange
  const {
    key,
    iv
  } = await Helpers.generateKeyDataFromNonce(resPQ.serverNonce, newNonce);
  if (serverDhParams.encryptedAnswer.length % 16 !== 0) {
    // See PR#453
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 AES block size mismatch');
  }
  const ige = new IGE(key, iv);
  const plainTextAnswer = ige.decryptIge(serverDhParams.encryptedAnswer);
  const reader = new BinaryReader(plainTextAnswer);
  const hash = reader.read(20); // hash sum
  const serverDhInner = reader.tgReadObject();
  if (!(serverDhInner instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().ServerDHInnerData))) {
    throw new Error(`Step 3 answer was ${serverDhInner}`);
  }
  const sha1Answer = await Helpers.sha1(serverDhInner.getBytes());
  if (!hash.equals(sha1Answer)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 Invalid hash answer');
  }
  if (serverDhInner.nonce.neq(resPQ.nonce)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 Invalid nonce in encrypted answer');
  }
  if (serverDhInner.serverNonce.neq(resPQ.serverNonce)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 Invalid server nonce in encrypted answer');
  }
  if (serverDhInner.g !== 3 || serverDhInner.dhPrime.toString('hex') !== 'c71caeb9c6b1c9048e6c522f70f13' + 'f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd5' + '1f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3' + 'c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd4' + '6582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce9298' + '51f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b') {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 invalid dhPrime or g');
  }
  const dhPrime = Helpers.readBigIntFromBuffer(serverDhInner.dhPrime, false, false);
  const ga = Helpers.readBigIntFromBuffer(serverDhInner.gA, false, false);
  const timeOffset = serverDhInner.serverTime - Math.floor(Date.now() / 1000);
  const b = Helpers.readBigIntFromBuffer(Helpers.generateRandomBytes(256), false, false);
  const gb = Helpers.modExp(bigInt(serverDhInner.g), b, dhPrime);
  const gab = Helpers.modExp(ga, b, dhPrime);
  if (ga.lesserOrEquals(1)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 failed ga > 1 check');
  }
  if (gb.lesserOrEquals(1)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 failed gb > 1 check');
  }
  if (ga.greater(dhPrime.minus(1))) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 failed ga > dh_prime - 1 check');
  }
  const toCheckAgainst = bigInt(2).pow(2048 - 64);
  if (!(ga.greaterOrEquals(toCheckAgainst) && ga.lesserOrEquals(dhPrime.minus(toCheckAgainst)))) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 failed dh_prime - 2^{2048-64} < ga < 2^{2048-64} check');
  }
  if (!(gb.greaterOrEquals(toCheckAgainst) && gb.lesserOrEquals(dhPrime.minus(toCheckAgainst)))) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 failed dh_prime - 2^{2048-64} < gb < 2^{2048-64} check');
  }

  // Prepare client DH Inner Data
  const clientDhInner = new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().ClientDHInnerData)({
    nonce: resPQ.nonce,
    serverNonce: resPQ.serverNonce,
    retryId: bigInt.zero,
    // TODO Actual retry ID
    gB: Helpers.getByteArray(gb, false)
  }).getBytes();
  const clientDdhInnerHashed = Buffer.concat([await Helpers.sha1(clientDhInner), clientDhInner]);
  // Encryption

  const clientDhEncrypted = ige.encryptIge(clientDdhInnerHashed);
  const dhGen = await sender.send(new (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().SetClientDHParams)({
    nonce: resPQ.nonce,
    serverNonce: resPQ.serverNonce,
    encryptedData: clientDhEncrypted
  }));
  const nonceTypes = [(_tl_api__WEBPACK_IMPORTED_MODULE_0___default().DhGenOk), (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().DhGenRetry), (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().DhGenFail)];
  // TS being weird again.
  const nonceTypesString = ['DhGenOk', 'DhGenRetry', 'DhGenFail'];
  if (!(dhGen instanceof nonceTypes[0] || dhGen instanceof nonceTypes[1] || dhGen instanceof nonceTypes[2])) {
    throw new Error(`Step 3.1 answer was ${dhGen}`);
  }
  const {
    name
  } = dhGen.constructor;
  if (dhGen.nonce.neq(resPQ.nonce)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError(`Step 3 invalid ${name} nonce from server`);
  }
  if (dhGen.serverNonce.neq(resPQ.serverNonce)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError(`Step 3 invalid ${name} server nonce from server`);
  }
  const authKey = new AuthKey();
  await authKey.setKey(Helpers.getByteArray(gab));
  const nonceNumber = 1 + nonceTypesString.indexOf(dhGen.className);
  const newNonceHash = await authKey.calcNewNonceHash(newNonce, nonceNumber);
  // @ts-ignore
  const dhHash = dhGen[`newNonceHash${nonceNumber}`];
  if (dhHash.neq(newNonceHash)) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.SecurityError('Step 3 invalid new nonce hash');
  }
  if (!(dhGen instanceof (_tl_api__WEBPACK_IMPORTED_MODULE_0___default().DhGenOk))) {
    throw new Error(`Step 3.2 answer was ${dhGen}`);
  }
  log.debug('Finished authKey generation step 3');
  return {
    authKey,
    timeOffset
  };
}

/***/ }),

/***/ "./src/lib/gramjs/network/MTProtoPlainSender.js":
/*!******************************************************!*\
  !*** ./src/lib/gramjs/network/MTProtoPlainSender.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
/**
 *  This module contains the class used to communicate with Telegram's servers
 *  in plain text, when no authorization key has been created yet.
 */
const BigInt = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
const MTProtoState = __webpack_require__(/*! ./MTProtoState */ "./src/lib/gramjs/network/MTProtoState.js");
const BinaryReader = __webpack_require__(/*! ../extensions/BinaryReader */ "./src/lib/gramjs/extensions/BinaryReader.js");
const {
  InvalidBufferError
} = __webpack_require__(/*! ../errors/Common */ "./src/lib/gramjs/errors/Common.js");
const {
  toSignedLittleBuffer
} = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");

/**
 * MTProto Mobile Protocol plain sender (https://core.telegram.org/mtproto/description#unencrypted-messages)
 */

class MTProtoPlainSender {
  /**
   * Initializes the MTProto plain sender.
   * @param connection connection: the Connection to be used.
   * @param loggers
   */
  constructor(connection, loggers) {
    this._state = new MTProtoState(connection, loggers);
    this._connection = connection;
  }

  /**
   * Sends and receives the result for the given request.
   * @param request
   */
  async send(request) {
    let body = request.getBytes();
    let msgId = this._state._getNewMsgId();
    const m = toSignedLittleBuffer(msgId, 8);
    const b = Buffer.alloc(4);
    b.writeInt32LE(body.length, 0);
    const res = Buffer.concat([Buffer.concat([Buffer.alloc(8), m, b]), body]);
    await this._connection.send(res);
    body = await this._connection.recv();
    if (body.length < 8) {
      throw new InvalidBufferError(body);
    }
    const reader = new BinaryReader(body);
    const authKeyId = reader.readLong();
    if (authKeyId.neq(BigInt(0))) {
      throw new Error('Bad authKeyId');
    }
    msgId = reader.readLong();
    if (msgId.eq(BigInt(0))) {
      throw new Error('Bad msgId');
    }
    /** ^ We should make sure that the read ``msg_id`` is greater
     * than our own ``msg_id``. However, under some circumstances
     * (bad system clock/working behind proxies) this seems to not
     * be the case, which would cause endless assertion errors.
     */

    const length = reader.readInt();
    if (length <= 0) {
      throw new Error('Bad length');
    }
    /**
     * We could read length bytes and use those in a new reader to read
     * the next TLObject without including the padding, but since the
     * reader isn't used for anything else after this, it's unnecessary.
     */
    return reader.tgReadObject();
  }
}
module.exports = MTProtoPlainSender;

/***/ }),

/***/ "./src/lib/gramjs/network/MTProtoSender.js":
/*!*************************************************!*\
  !*** ./src/lib/gramjs/network/MTProtoSender.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  RPCError
} = __webpack_require__(/*! ../errors */ "./src/lib/gramjs/errors/index.js");
const MtProtoPlainSender = __webpack_require__(/*! ./MTProtoPlainSender */ "./src/lib/gramjs/network/MTProtoPlainSender.js");
const MTProtoState = __webpack_require__(/*! ./MTProtoState */ "./src/lib/gramjs/network/MTProtoState.js");
const Helpers = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
const AuthKey = __webpack_require__(/*! ../crypto/AuthKey */ "./src/lib/gramjs/crypto/AuthKey.js");
const {
  doAuthentication
} = __webpack_require__(/*! ./Authenticator */ "./src/lib/gramjs/network/Authenticator.ts");
const RPCResult = __webpack_require__(/*! ../tl/core/RPCResult */ "./src/lib/gramjs/tl/core/RPCResult.js");
const MessageContainer = __webpack_require__(/*! ../tl/core/MessageContainer */ "./src/lib/gramjs/tl/core/MessageContainer.js");
const GZIPPacked = __webpack_require__(/*! ../tl/core/GZIPPacked */ "./src/lib/gramjs/tl/core/GZIPPacked.js");
const RequestState = __webpack_require__(/*! ./RequestState */ "./src/lib/gramjs/network/RequestState.js");
const {
  MsgsAck,
  upload,
  MsgsStateInfo,
  Pong
} = (__webpack_require__(/*! ../tl */ "./src/lib/gramjs/tl/index.js").constructors);
const MessagePacker = __webpack_require__(/*! ../extensions/MessagePacker */ "./src/lib/gramjs/extensions/MessagePacker.js");
const BinaryReader = __webpack_require__(/*! ../extensions/BinaryReader */ "./src/lib/gramjs/extensions/BinaryReader.js");
const PendingState = __webpack_require__(/*! ../extensions/PendingState */ "./src/lib/gramjs/extensions/PendingState.js");
const {
  UpdateConnectionState,
  UpdateServerTimeOffset
} = __webpack_require__(/*! ./updates */ "./src/lib/gramjs/network/updates.js");
const {
  BadMessageError
} = __webpack_require__(/*! ../errors/Common */ "./src/lib/gramjs/errors/Common.js");
const {
  BadServerSalt,
  BadMsgNotification,
  MsgDetailedInfo,
  MsgNewDetailedInfo,
  NewSessionCreated,
  FutureSalts,
  MsgsStateReq,
  MsgResendReq,
  MsgsAllInfo,
  HttpWait
} = (__webpack_require__(/*! ../tl */ "./src/lib/gramjs/tl/index.js").constructors);
const {
  SecurityError
} = __webpack_require__(/*! ../errors/Common */ "./src/lib/gramjs/errors/Common.js");
const {
  InvalidBufferError
} = __webpack_require__(/*! ../errors/Common */ "./src/lib/gramjs/errors/Common.js");
const {
  RPCMessageToError
} = __webpack_require__(/*! ../errors */ "./src/lib/gramjs/errors/index.js");
const {
  TypeNotFoundError
} = __webpack_require__(/*! ../errors/Common */ "./src/lib/gramjs/errors/Common.js");
const LONGPOLL_MAX_WAIT = 3000;
const LONGPOLL_MAX_DELAY = 500;
const LONGPOLL_WAIT_AFTER = 150;

/**
 * MTProto Mobile Protocol sender
 * (https://core.telegram.org/mtproto/description)
 * This class is responsible for wrapping requests into `TLMessage`'s,
 * sending them over the network and receiving them in a safe manner.
 *
 * Automatic reconnection due to temporary network issues is a concern
 * for this class as well, including retry of messages that could not
 * be sent successfully.
 *
 * A new authorization key will be generated on connection if no other
 * key exists yet.
 */
class MTProtoSender {
  /**
   * @param authKey
   * @param opts
   */
  constructor(authKey, opts) {
    _defineProperty(this, "logWithIndex", {
      debug: this.logWithIndexCallback('debug'),
      log: this.logWithIndexCallback('log'),
      warn: this.logWithIndexCallback('warn'),
      error: this.logWithIndexCallback('error')
    });
    const args = {
      ...MTProtoSender.DEFAULT_OPTIONS,
      ...opts
    };
    this._connection = undefined;
    this._fallbackConnection = undefined;
    this._shouldForceHttpTransport = args.shouldForceHttpTransport;
    this._shouldAllowHttpTransport = args.shouldAllowHttpTransport;
    this._log = args.logger;
    this._dcId = args.dcId;
    this._senderIndex = args.senderIndex;
    this._retries = args.retries;
    this._retriesToFallback = args.retriesToFallback;
    this._delay = args.delay;
    this._retryMainConnectionDelay = args.retryMainConnectionDelay;
    this._autoReconnect = args.autoReconnect;
    this._connectTimeout = args.connectTimeout;
    this._authKeyCallback = args.authKeyCallback;
    this._updateCallback = args.updateCallback;
    this._autoReconnectCallback = args.autoReconnectCallback;
    this._isMainSender = args.isMainSender;
    this._isExported = args.isExported;
    this._onConnectionBreak = args.onConnectionBreak;
    this._isFallback = false;
    this._getShouldDebugExportedSenders = args.getShouldDebugExportedSenders;

    /**
     * whether we disconnected ourself or telegram did it.
     */
    this.userDisconnected = false;

    /**
     * Whether the user has explicitly connected or disconnected.
     *
     * If a disconnection happens for any other reason and it
     * was *not* user action then the pending messages won't
     * be cleared but on explicit user disconnection all the
     * pending futures should be cancelled.
     */
    this._user_connected = false;
    this.isReconnecting = false;
    this._disconnected = true;

    /**
     * We need to join the loops upon disconnection
     */
    this._send_loop_handle = undefined;
    this._long_poll_loop_handle = undefined;
    this._recv_loop_handle = undefined;

    /**
     * Preserving the references of the AuthKey and state is important
     */
    this.authKey = authKey || new AuthKey();
    this._state = new MTProtoState(this.authKey, this._log);

    /**
     * Outgoing messages are put in a queue and sent in a batch.
     * Note that here we're also storing their ``_RequestState``.
     */
    this._send_queue = new MessagePacker(this._state, this._log);
    this._send_queue_long_poll = new MessagePacker(this._state, this._log);

    /**
     * Sent states are remembered until a response is received.
     */
    this._pending_state = new PendingState();

    /**
     * Responses must be acknowledged, and we can also batch these.
     */
    this._pending_ack = new Set();

    /**
     * Similar to pending_messages but only for the last acknowledges.
     * These can't go in pending_messages because no acknowledge for them
     * is received, but we may still need to resend their state on bad salts.
     */
    this._last_acks = [];

    /**
     * Jump table from response ID to method that handles it
     */

    this._handlers = {
      [RPCResult.CONSTRUCTOR_ID]: this._handleRPCResult.bind(this),
      [MessageContainer.CONSTRUCTOR_ID]: this._handleContainer.bind(this),
      [GZIPPacked.CONSTRUCTOR_ID]: this._handleGzipPacked.bind(this),
      [Pong.CONSTRUCTOR_ID]: this._handlePong.bind(this),
      [BadServerSalt.CONSTRUCTOR_ID]: this._handleBadServerSalt.bind(this),
      [BadMsgNotification.CONSTRUCTOR_ID]: this._handleBadNotification.bind(this),
      [MsgDetailedInfo.CONSTRUCTOR_ID]: this._handleDetailedInfo.bind(this),
      [MsgNewDetailedInfo.CONSTRUCTOR_ID]: this._handleNewDetailedInfo.bind(this),
      [NewSessionCreated.CONSTRUCTOR_ID]: this._handleNewSessionCreated.bind(this),
      [MsgsAck.CONSTRUCTOR_ID]: this._handleAck.bind(this),
      [FutureSalts.CONSTRUCTOR_ID]: this._handleFutureSalts.bind(this),
      [MsgsStateReq.CONSTRUCTOR_ID]: this._handleStateForgotten.bind(this),
      [MsgResendReq.CONSTRUCTOR_ID]: this._handleStateForgotten.bind(this),
      [MsgsAllInfo.CONSTRUCTOR_ID]: this._handleMsgAll.bind(this)
    };
  }

  // Public API

  logWithIndexCallback(level) {
    var _this = this;
    return function () {
      if (!_this._getShouldDebugExportedSenders || !_this._getShouldDebugExportedSenders()) return;
      // eslint-disable-next-line no-console
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      console[level](`[${_this._isExported ? `idx=${_this._senderIndex} ` : 'M '}dcId=${_this._dcId}]`, ...args);
    };
  }
  getConnection() {
    return this._isFallback ? this._fallbackConnection : this._connection;
  }

  /**
   * Connects to the specified given connection using the given auth key.
   * @param connection
   * @param [force]
   * @param fallbackConnection
   * @returns {Promise<boolean>}
   */
  async connect(connection, force, fallbackConnection) {
    this.userDisconnected = false;
    if (this._user_connected && !force) {
      this._log.info('User is already connected!');
      return false;
    }
    this.isConnecting = true;
    this._isFallback = this._shouldForceHttpTransport && this._shouldAllowHttpTransport;
    this._connection = connection;
    this._fallbackConnection = fallbackConnection;
    for (let attempt = 0; attempt < this._retries + this._retriesToFallback; attempt++) {
      try {
        if (attempt >= this._retriesToFallback && this._shouldAllowHttpTransport) {
          this._isFallback = true;
          this.logWithIndex.warn('Using fallback connection');
          this._log.warn('Using fallback connection');
        }
        this.logWithIndex.warn('Connecting...');
        await this._connect(this.getConnection());
        this.logWithIndex.warn('Connected!');
        if (!this._isExported) {
          this._updateCallback?.(new UpdateConnectionState(UpdateConnectionState.connected));
        }
        break;
      } catch (err) {
        if (!this._isExported && attempt === 0) {
          this._updateCallback?.(new UpdateConnectionState(UpdateConnectionState.disconnected));
        }
        this._log.error(`${this._isFallback ? 'HTTP' : 'WebSocket'} connection failed attempt: ${attempt + 1}`);
        // eslint-disable-next-line no-console
        console.error(err);
        await Helpers.sleep(this._delay);
      }
    }
    this.isConnecting = false;
    if (this._isFallback && !this._shouldForceHttpTransport) {
      void this.tryReconnectToMain();
    }
    return true;
  }
  async tryReconnectToMain() {
    if (!this.isConnecting && this._isFallback && !this._isReconnectingToMain && !this.isReconnecting && !this._shouldForceHttpTransport && !this._isExported) {
      this._log.debug('Trying to reconnect to main connection');
      this._isReconnectingToMain = true;
      try {
        await this._connection.connect();
        this._log.info('Reconnected to main connection');
        this.logWithIndex.warn('Reconnected to main connection');
        this.isReconnecting = true;
        await this._disconnect(this._fallbackConnection);
        await this.connect(this._connection, true, this._fallbackConnection);
        this.isReconnecting = false;
        this._isReconnectingToMain = false;
      } catch (e) {
        this.isReconnecting = false;
        this._isReconnectingToMain = false;
        this._log.error(`Failed to reconnect to main connection, retrying in ${this._retryMainConnectionDelay}ms`);
        await Helpers.sleep(this._retryMainConnectionDelay);
        void this.tryReconnectToMain();
      }
    } else {
      await Helpers.sleep(this._retryMainConnectionDelay);
    }
  }
  isConnected() {
    return this._user_connected;
  }

  /**
   * Cleanly disconnects the instance from the network, cancels
   * all pending requests, and closes the send and receive loops.
   */
  async disconnect() {
    this.userDisconnected = true;
    this.logWithIndex.warn('Disconnecting...');
    await this._disconnect(this.getConnection());
  }
  destroy() {
    this._send_queue.clear();
  }

  /**
   *
   This method enqueues the given request to be sent. Its send
   state will be saved until a response arrives, and a ``Future``
   that will be resolved when the response arrives will be returned:
    .. code-block:: javascript
    async def method():
   # Sending (enqueued for the send loop)
   future = sender.send(request)
   # Receiving (waits for the receive loop to read the result)
   result = await future
    Designed like this because Telegram may send the response at
   any point, and it can send other items while one waits for it.
   Once the response for this future arrives, it is set with the
   received result, quite similar to how a ``receive()`` call
   would otherwise work.
    Since the receiving part is "built in" the future, it's
   impossible to await receive a result that was never sent.
   * @param request
   * @param abortSignal
   * @param isLongPoll
   * @returns {RequestState}
   */
  send(request, abortSignal) {
    let isLongPoll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const state = new RequestState(request, abortSignal);
    if (!isLongPoll) {
      this.logWithIndex.debug(`Send ${request.className}`);
      this._send_queue.append(state);
    } else {
      this._send_queue_long_poll.append(state);
    }
    return state.promise;
  }
  addStateToQueue(state) {
    this._send_queue.append(state);
  }
  async sendBeacon(request) {
    if (!this._user_connected) {
      throw new Error('Cannot send requests while disconnected');
    }
    const state = new RequestState(request, undefined);
    const data = await this._send_queue.getBeacon(state);
    const encryptedData = await this._state.encryptMessageData(data);
    postMessage({
      type: 'sendBeacon',
      data: encryptedData,
      url: this._fallbackConnection.href
    });
  }

  /**
   * Performs the actual connection, retrying, generating the
   * authorization key if necessary, and starting the send and
   * receive loops.
   * @returns {Promise<void>}
   * @private
   */
  async _connect(connection) {
    if (!connection.isConnected()) {
      this._log.info('Connecting to {0}...'.replace('{0}', connection));
      await connection.connect();
      this._log.debug('Connection success!');
    }
    if (!this.authKey.getKey()) {
      const plain = new MtProtoPlainSender(connection, this._log);
      this._log.debug('New auth_key attempt ...');
      const res = await doAuthentication(plain, this._log);
      this._log.debug('Generated new auth_key successfully');
      await this.authKey.setKey(res.authKey);
      this._state.timeOffset = res.timeOffset;
      if (!this._isExported) {
        this._updateCallback?.(new UpdateServerTimeOffset(this._state.timeOffset));
      }

      /**
       * This is *EXTREMELY* important since we don't control
       * external references to the authorization key, we must
       * notify whenever we change it. This is crucial when we
       * switch to different data centers.
       */
      if (this._authKeyCallback) {
        await this._authKeyCallback(this.authKey, this._dcId);
      }
    } else {
      this._authenticated = true;
      this._log.debug('Already have an auth key ...');
    }
    this._user_connected = true;
    this.isReconnecting = false;
    if (!this._send_loop_handle) {
      this._log.debug('Starting send loop');
      this._send_loop_handle = this._sendLoop();
    }
    if (!this._recv_loop_handle) {
      this._log.debug('Starting receive loop');
      this._recv_loop_handle = this._recvLoop();
    }
    if (!this._long_poll_loop_handle && connection.shouldLongPoll) {
      this._log.debug('Starting long-poll loop');
      this._long_poll_loop_handle = this._longPollLoop();
    }

    // _disconnected only completes after manual disconnection
    // or errors after which the sender cannot continue such
    // as failing to reconnect or any unexpected error.

    this._log.info('Connection to %s complete!'.replace('%s', connection.toString()));
  }
  async _disconnect(connection) {
    if (!this._isExported) {
      this._updateCallback?.(new UpdateConnectionState(UpdateConnectionState.disconnected));
    }
    if (connection === undefined) {
      this._log.info('Not disconnecting (already have no connection)');
      return;
    }
    this._log.info('Disconnecting from %s...'.replace('%s', connection.toString()));
    this._user_connected = false;
    this._log.debug('Closing current connection...');
    this.logWithIndex.warn('Disconnecting');
    await connection.disconnect();
  }
  async _longPollLoop() {
    while (this._user_connected && !this.isReconnecting && this._isFallback && this.getConnection().shouldLongPoll) {
      await this._send_queue_long_poll.wait();
      const res = await this._send_queue_long_poll.get();
      if (this.isReconnecting || !this._isFallback) {
        this._long_poll_loop_handle = undefined;
        return;
      }
      if (!res) {
        continue;
      }
      let {
        data
      } = res;
      const {
        batch
      } = res;
      this._log.debug(`Encrypting ${batch.length} message(s) in ${data.length} bytes for sending`);
      data = await this._state.encryptMessageData(data);
      try {
        await this._fallbackConnection.send(data);
      } catch (e) {
        this._log.error(e);
        this._log.info('Connection closed while sending data');
        this._long_poll_loop_handle = undefined;
        this.isSendingLongPoll = false;
        if (!this.userDisconnected) {
          this.reconnect();
        }
        return;
      }
      this.isSendingLongPoll = false;
      this.checkLongPoll();
    }
    this._long_poll_loop_handle = undefined;
  }

  /**
   * This loop is responsible for popping items off the send
   * queue, encrypting them, and sending them over the network.
   * Besides `connect`, only this method ever sends data.
   * @returns {Promise<void>}
   * @private
   */
  async _sendLoop() {
    // Retry previous pending requests
    this._send_queue.prepend(this._pending_state.values());
    this._pending_state.clear();
    while (this._user_connected && !this.isReconnecting) {
      const appendAcks = () => {
        if (this._pending_ack.size) {
          const ack = new RequestState(new MsgsAck({
            msgIds: Array(...this._pending_ack)
          }));
          this._send_queue.append(ack);
          this._last_acks.push(ack);
          if (this._last_acks.length >= 10) {
            this._last_acks.shift();
          }
          this._pending_ack.clear();
        }
      };
      appendAcks();
      this.logWithIndex.debug(`Waiting for messages to send... ${this.isReconnecting}`);
      this._log.debug(`Waiting for messages to send... ${this.isReconnecting}`);
      // TODO Wait for the connection send queue to be empty?
      // This means that while it's not empty we can wait for
      // more messages to be added to the send queue.
      await this._send_queue.wait();
      if (this._isFallback) {
        // We don't long-poll on main loop, instead we have a separate loop for that
        this.send(new HttpWait({
          maxDelay: 0,
          waitAfter: 0,
          maxWait: 0
        }));
      }

      // If we've had new ACKs appended while waiting for messages to send, add them to queue
      appendAcks();
      const res = await this._send_queue.get();
      this.logWithIndex.debug(`Got ${res?.batch.length} message(s) to send`);
      if (!res) {
        continue;
      }
      let {
        data
      } = res;
      const {
        batch
      } = res;
      for (const state of batch) {
        if (!Array.isArray(state)) {
          if (state.request.classType === 'request' && state.request.className !== 'HttpWait') {
            this._pending_state.set(state.msgId, state);
          }
        } else {
          for (const s of state) {
            if (s.request.classType === 'request' && s.request.className !== 'HttpWait') {
              this._pending_state.set(s.msgId, s);
            }
          }
        }
      }
      if (this.isReconnecting) {
        this.logWithIndex.debug('Reconnecting :(');
        this._send_loop_handle = undefined;
        return;
      }
      this._log.debug(`Encrypting ${batch.length} message(s) in ${data.length} bytes for sending`);
      this.logWithIndex.debug('Sending', batch.map(m => m.request.className));
      data = await this._state.encryptMessageData(data);
      try {
        await this.getConnection().send(data);
      } catch (e) {
        this.logWithIndex.debug(`Connection closed while sending data ${e}`);
        this._log.error(e);
        this._log.info('Connection closed while sending data');
        this._send_loop_handle = undefined;
        if (!this.userDisconnected) {
          this.reconnect();
        }
        return;
      } finally {
        for (const state of batch) {
          if (!Array.isArray(state)) {
            if (state.request.className === 'HttpWait') {
              state.resolve();
            }
          } else {
            for (const s of state) {
              if (s.request.className === 'HttpWait') {
                state.resolve();
              }
            }
          }
        }
        this.logWithIndex.debug('Encrypted messages put in a queue to be sent');
        this._log.debug('Encrypted messages put in a queue to be sent');
      }
    }
    this._send_loop_handle = undefined;
  }
  async _recvLoop() {
    let body;
    let message;
    while (this._user_connected && !this.isReconnecting) {
      this._log.debug('Receiving items from the network...');
      this.logWithIndex.debug('Receiving items from the network...');
      try {
        body = await this.getConnection().recv();
      } catch (e) {
        // this._log.info('Connection closed while receiving data');
        /** when the server disconnects us we want to reconnect */
        if (!this.userDisconnected) {
          this._log.error(e);
          this._log.warn('Connection closed while receiving data');
          this.reconnect();
        }
        this._recv_loop_handle = undefined;
        return;
      }
      try {
        message = await this._state.decryptMessageData(body);
      } catch (e) {
        this.logWithIndex.debug(`Error while receiving items from the network ${e.toString()}`);
        if (e instanceof TypeNotFoundError) {
          // Received object which we don't know how to deserialize
          this._log.info(`Type ${e.invalidConstructorId} not found, remaining data ${e.remaining}`);
          continue;
        } else if (e instanceof SecurityError) {
          // A step while decoding had the incorrect data. This message
          // should not be considered safe and it should be ignored.
          this._log.warn(`Security error while unpacking a received message: ${e}`);
          continue;
        } else if (e instanceof InvalidBufferError) {
          // 404 means that the server has "forgotten" our auth key and we need to create a new one.
          if (e.code === 404) {
            this._handleBadAuthKey();
          } else {
            // this happens sometimes when telegram is having some internal issues.
            // reconnecting should be enough usually
            // since the data we sent and received is probably wrong now.
            this._log.warn(`Invalid buffer ${e.code} for dc ${this._dcId}`);
            this.reconnect();
          }
          this._recv_loop_handle = undefined;
          return;
        } else {
          this._log.error('Unhandled error while receiving data');
          this._log.error(e);
          this.reconnect();
          this._recv_loop_handle = undefined;
          return;
        }
      }
      try {
        await this._processMessage(message);
      } catch (e) {
        // `RPCError` errors except for 'AUTH_KEY_UNREGISTERED' should be handled by the client
        if (e instanceof RPCError) {
          if (e.message === 'AUTH_KEY_UNREGISTERED' || e.message === 'SESSION_REVOKED') {
            // 'AUTH_KEY_UNREGISTERED' for the main sender is thrown when unauthorized and should be ignored
            this._handleBadAuthKey(true);
          }
        } else {
          this._log.error('Unhandled error while receiving data');
          this._log.error(e);
        }
      }
      void this.checkLongPoll();
    }
    this._recv_loop_handle = undefined;
  }
  checkLongPoll() {
    if (this.isSendingLongPoll || !this._isFallback) return;
    this.isSendingLongPoll = true;
    this.send(new HttpWait({
      maxDelay: LONGPOLL_MAX_DELAY,
      waitAfter: LONGPOLL_WAIT_AFTER,
      maxWait: LONGPOLL_MAX_WAIT
    }), undefined, true);
  }
  _handleBadAuthKey(shouldSkipForMain) {
    if (shouldSkipForMain && this._isMainSender) {
      return;
    }
    this._log.warn(`Broken authorization key for dc ${this._dcId}, resetting...`);
    if (this._isMainSender && !this._isExported) {
      this._updateCallback?.(new UpdateConnectionState(UpdateConnectionState.broken));
    } else if (!this._isMainSender && this._onConnectionBreak) {
      this._onConnectionBreak(this._dcId);
    }
  }

  // Response Handlers

  /**
   * Adds the given message to the list of messages that must be
   * acknowledged and dispatches control to different ``_handle_*``
   * method based on its type.
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  async _processMessage(message) {
    if (message.obj.className === 'MsgsAck') return;
    this.logWithIndex.debug(`Process message ${message.obj.className}`);
    this._pending_ack.add(message.msgId);
    if (this.getConnection().shouldLongPoll) {
      this._send_queue.setReady(true);
    }
    // eslint-disable-next-line require-atomic-updates
    message.obj = await message.obj;
    let handler = this._handlers[message.obj.CONSTRUCTOR_ID];
    if (!handler) {
      handler = this._handleUpdate.bind(this);
    }
    await handler(message);
  }

  /**
   * Pops the states known to match the given ID from pending messages.
   * This method should be used when the response isn't specific.
   * @param msgId
   * @returns {*[]}
   * @private
   */
  _popStates(msgId) {
    const state = this._pending_state.getAndDelete(msgId);
    if (state) {
      return [state];
    }
    const toPop = [];
    for (const pendingState of this._pending_state.values()) {
      if (pendingState.containerId?.equals(msgId)) {
        toPop.push(pendingState.msgId);
      }
    }
    if (toPop.length) {
      const temp = [];
      for (const x of toPop) {
        temp.push(this._pending_state.getAndDelete(x));
      }
      return temp;
    }
    for (const ack of this._last_acks) {
      if (ack.msgId === msgId) {
        return [ack];
      }
    }
    return [];
  }

  /**
   * Handles the result for Remote Procedure Calls:
   * rpc_result#f35c6d01 req_msg_id:long result:bytes = RpcResult;
   * This is where the future results for sent requests are set.
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  _handleRPCResult(message) {
    const result = message.obj;
    const state = this._pending_state.getAndDelete(result.reqMsgId);
    this._log.debug(`Handling RPC result for message ${result.reqMsgId}`);
    if (!state) {
      // TODO We should not get responses to things we never sent
      // However receiving a File() with empty bytes is "common".
      // See #658, #759 and #958. They seem to happen in a container
      // which contain the real response right after.
      try {
        const reader = new BinaryReader(result.body);
        if (!(reader.tgReadObject() instanceof upload.File)) {
          throw new TypeNotFoundError('Not an upload.File');
        }
      } catch (e) {
        if (e instanceof TypeNotFoundError) {
          this._log.info(`Received response without parent request: ${result.body}`);
          return;
        } else if (this._isFallback) {
          // If we're using HTTP transport, there might be a chance that the response comes through
          // multiple times if didn't send acknowledgment in time, so we should just ignore it
          return;
        }
        throw e;
      }
      return;
    }
    if (result.error) {
      // eslint-disable-next-line new-cap
      const error = RPCMessageToError(result.error, state.request);
      this._send_queue.append(new RequestState(new MsgsAck({
        msgIds: [state.msgId]
      })));
      state.reject(error);
      throw error;
    } else {
      try {
        const reader = new BinaryReader(result.body);
        const read = state.request.readResult(reader);
        this.logWithIndex.debug('Handling RPC result', read);
        state.resolve(read);
      } catch (err) {
        state.reject(err);
        throw err;
      }
    }
  }

  /**
   * Processes the inner messages of a container with many of them:
   * msg_container#73f1f8dc messages:vector<%Message> = MessageContainer;
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  async _handleContainer(message) {
    this._log.debug('Handling container');
    for (const innerMessage of message.obj.messages) {
      await this._processMessage(innerMessage);
    }
  }

  /**
   * Unpacks the data from a gzipped object and processes it:
   * gzip_packed#3072cfa1 packed_data:bytes = Object;
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  async _handleGzipPacked(message) {
    this._log.debug('Handling gzipped data');
    const reader = new BinaryReader(message.obj.data);
    message.obj = reader.tgReadObject();
    await this._processMessage(message);
  }
  _handleUpdate(message) {
    if (message.obj.SUBCLASS_OF_ID !== 0x8af52aac) {
      // crc32(b'Updates')
      this._log.warn(`Note: ${message.obj.className} is not an update, not dispatching it`);
      return;
    }
    this._log.debug(`Handling update ${message.obj.className}`);
    if (!this._isExported) {
      this._updateCallback?.(message.obj);
    }
  }

  /**
   * Handles pong results, which don't come inside a ``RPCResult``
   * but are still sent through a request:
   * pong#347773c5 msg_id:long ping_id:long = Pong;
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  _handlePong(message) {
    const pong = message.obj;
    const newTimeOffset = this._state.updateTimeOffset(message.msgId);
    if (!this._isExported) {
      this._updateCallback?.(new UpdateServerTimeOffset(newTimeOffset));
    }
    this._log.debug(`Handling pong for message ${pong.msgId}`);
    const state = this._pending_state.getAndDelete(pong.msgId);

    // Todo Check result
    if (state) {
      state.resolve(pong);
    }
  }

  /**
   * Corrects the currently used server salt to use the right value
   * before enqueuing the rejected message to be re-sent:
   * bad_server_salt#edab447b bad_msg_id:long bad_msg_seqno:int
   * error_code:int new_server_salt:long = BadMsgNotification;
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  _handleBadServerSalt(message) {
    const badSalt = message.obj;
    this._log.debug(`Handling bad salt for message ${badSalt.badMsgId}`);
    this._state.salt = badSalt.newServerSalt;
    const states = this._popStates(badSalt.badMsgId);
    this._send_queue.extend(states);
    this._log.debug(`${states.length} message(s) will be resent`);
  }

  /**
   * Adjusts the current state to be correct based on the
   * received bad message notification whenever possible:
   * bad_msg_notification#a7eff811 bad_msg_id:long bad_msg_seqno:int
   * error_code:int = BadMsgNotification;
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  _handleBadNotification(message) {
    const badMsg = message.obj;
    const states = this._popStates(badMsg.badMsgId);
    this._log.debug(`Handling bad msg ${JSON.stringify(badMsg)}`);
    if ([16, 17].includes(badMsg.errorCode)) {
      // Sent msg_id too low or too high (respectively).
      // Use the current msg_id to determine the right time offset.
      const newTimeOffset = this._state.updateTimeOffset(message.msgId);
      if (!this._isExported) {
        this._updateCallback?.(new UpdateServerTimeOffset(newTimeOffset));
      }
      this._log.info(`System clock is wrong, set time offset to ${newTimeOffset}s`);
    } else if (badMsg.errorCode === 32) {
      // msg_seqno too low, so just pump it up by some "large" amount
      // TODO A better fix would be to start with a new fresh session ID
      this._state._sequence += 64;
    } else if (badMsg.errorCode === 33) {
      // msg_seqno too high never seems to happen but just in case
      this._state._sequence -= 16;
    } else {
      for (const state of states) {
        state.reject(new BadMessageError(state.request, badMsg.errorCode));
      }
      return;
    }
    // Messages are to be re-sent once we've corrected the issue
    this._send_queue.extend(states);
    this._log.debug(`${states.length} messages will be resent due to bad msg`);
  }

  /**
   * Updates the current status with the received detailed information:
   * msg_detailed_info#276d3ec6 msg_id:long answer_msg_id:long
   * bytes:int status:int = MsgDetailedInfo;
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  _handleDetailedInfo(message) {
    // TODO https://goo.gl/VvpCC6
    const msgId = message.obj.answerMsgId;
    this._log.debug(`Handling detailed info for message ${msgId}`);
    this._pending_ack.add(msgId);
  }

  /**
   * Updates the current status with the received detailed information:
   * msg_new_detailed_info#809db6df answer_msg_id:long
   * bytes:int status:int = MsgDetailedInfo;
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  _handleNewDetailedInfo(message) {
    // TODO https://goo.gl/VvpCC6
    const msgId = message.obj.answerMsgId;
    this._log.debug(`Handling new detailed info for message ${msgId}`);
    this._pending_ack.add(msgId);
  }

  /**
   * Updates the current status with the received session information:
   * new_session_created#9ec20908 first_msg_id:long unique_id:long
   * server_salt:long = NewSession;
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  _handleNewSessionCreated(message) {
    // TODO https://goo.gl/LMyN7A
    this._log.debug('Handling new session created');
    this._state.salt = message.obj.serverSalt;
  }

  /**
   * Handles a server acknowledge about our messages. Normally these can be ignored
  */
  _handleAck() {}

  /**
   * Handles future salt results, which don't come inside a
   * ``rpc_result`` but are still sent through a request:
   *     future_salts#ae500895 req_msg_id:long now:int
   *     salts:vector<future_salt> = FutureSalts;
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  _handleFutureSalts(message) {
    // TODO save these salts and automatically adjust to the
    // correct one whenever the salt in use expires.
    this._log.debug(`Handling future salts for message ${message.msgId}`);
    const state = this._pending_state.getAndDelete(message.msgId);
    if (state) {
      state.resolve(message.obj);
    }
  }

  /**
   * Handles both :tl:`MsgsStateReq` and :tl:`MsgResendReq` by
   * enqueuing a :tl:`MsgsStateInfo` to be sent at a later point.
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  _handleStateForgotten(message) {
    this._send_queue.append(new RequestState(new MsgsStateInfo({
      msgId: message.msgId,
      query: String.fromCharCode(1).repeat(message.obj.msgIds)
    })));
  }

  /**
   * Handles :tl:`MsgsAllInfo` by doing nothing (yet).
   * used as part of the telegram protocol https://core.telegram.org/mtproto/service_messages_about_messages
   * This message does not require an acknowledgment.
   * @param message
   * @returns {Promise<void>}
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _handleMsgAll(message) {}
  reconnect() {
    if (this._user_connected && !this.isReconnecting) {
      this.isReconnecting = true;
      // TODO Should we set this?
      // this._user_connected = false
      // we want to wait a second between each reconnect try to not flood the server with reconnects
      // in case of internal server issues.
      Helpers.sleep(1000).then(() => {
        this.logWithIndex.log('Reconnecting...');
        this._log.info('Started reconnecting');
        this._reconnect();
      });
    }
  }
  async _reconnect() {
    this._log.debug('Closing current connection...');
    try {
      this.logWithIndex.warn('[Reconnect] Closing current connection...');
      await this._disconnect(this.getConnection());
    } catch (err) {
      this._log.warn(err);
    }
    this._send_queue.append(undefined);
    this._state.reset();

    // For some reason reusing existing connection caused stuck requests
    const newConnection = new this._connection.constructor(this._connection._ip, this._connection._port, this._connection._dcId, this._connection._log, this._connection._testServers);
    const newFallbackConnection = new this._fallbackConnection.constructor(this._connection._ip, this._connection._port, this._connection._dcId, this._connection._log, this._connection._testServers);
    await this.connect(newConnection, true, newFallbackConnection);
    this.isReconnecting = false;
    this._send_queue.prepend(this._pending_state.values());
    this._pending_state.clear();
    if (this._autoReconnectCallback) {
      await this._autoReconnectCallback();
    }
  }
}
_defineProperty(MTProtoSender, "DEFAULT_OPTIONS", {
  logger: undefined,
  retries: Infinity,
  retriesToFallback: 1,
  delay: 2000,
  retryMainConnectionDelay: 10000,
  shouldForceHttpTransport: false,
  shouldAllowHttpTransport: false,
  autoReconnect: true,
  connectTimeout: undefined,
  authKeyCallback: undefined,
  updateCallback: undefined,
  autoReconnectCallback: undefined,
  isMainSender: undefined,
  onConnectionBreak: undefined,
  isExported: undefined,
  getShouldDebugExportedSenders: undefined
});
module.exports = MTProtoSender;

/***/ }),

/***/ "./src/lib/gramjs/network/MTProtoState.js":
/*!************************************************!*\
  !*** ./src/lib/gramjs/network/MTProtoState.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const BigInt = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
const aes = __webpack_require__(/*! @cryptography/aes */ "./node_modules/@cryptography/aes/dist/es/aes.js");
const Helpers = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
const IGE = __webpack_require__(/*! ../crypto/IGE */ "./src/lib/gramjs/crypto/IGE.js");
const BinaryReader = __webpack_require__(/*! ../extensions/BinaryReader */ "./src/lib/gramjs/extensions/BinaryReader.js");
const GZIPPacked = __webpack_require__(/*! ../tl/core/GZIPPacked */ "./src/lib/gramjs/tl/core/GZIPPacked.js");
const {
  TLMessage
} = __webpack_require__(/*! ../tl/core */ "./src/lib/gramjs/tl/core/index.js");
const {
  SecurityError,
  InvalidBufferError
} = __webpack_require__(/*! ../errors/Common */ "./src/lib/gramjs/errors/Common.js");
const {
  InvokeAfterMsg
} = (__webpack_require__(/*! ../tl */ "./src/lib/gramjs/tl/index.js").requests);
const {
  toSignedLittleBuffer
} = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
class MTProtoState {
  /**
   *
   `telethon.network.mtprotosender.MTProtoSender` needs to hold a state
   in order to be able to encrypt and decrypt incoming/outgoing messages,
   as well as generating the message IDs. Instances of this class hold
   together all the required information.
    It doesn't make sense to use `telethon.sessions.abstract.Session` for
   the sender because the sender should *not* be concerned about storing
   this information to disk, as one may create as many senders as they
   desire to any other data center, or some CDN. Using the same session
   for all these is not a good idea as each need their own authkey, and
   the concept of "copying" sessions with the unnecessary entities or
   updates state for these connections doesn't make sense.
    While it would be possible to have a `MTProtoPlainState` that does no
   encryption so that it was usable through the `MTProtoLayer` and thus
   avoid the need for a `MTProtoPlainSender`, the `MTProtoLayer` is more
   focused to efficiency and this state is also more advanced (since it
   supports gzipping and invoking after other message IDs). There are too
   many methods that would be needed to make it convenient to use for the
   authentication process, at which point the `MTProtoPlainSender` is better
   * @param authKey
   * @param loggers
   * @param isCall
   * @param isOutgoing
   */
  constructor(authKey, loggers) {
    let isCall = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let isOutgoing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    this.authKey = authKey;
    this._log = loggers;
    this._isCall = isCall;
    this._isOutgoing = isOutgoing;
    this.timeOffset = 0;
    this.salt = 0;
    this.id = undefined;
    this._sequence = undefined;
    this._lastMsgId = undefined;
    this.msgIds = [];
    this.reset();
  }

  /**
   * Resets the state
   */
  reset() {
    // Session IDs can be random on every connection
    this.id = Helpers.generateRandomLong(true);
    this._sequence = 0;
    this._lastMsgId = BigInt(0);
    this.msgIds = [];
  }

  /**
   * Updates the message ID to a new one,
   * used when the time offset changed.
   * @param message
   */
  updateMessageId(message) {
    message.msgId = this._getNewMsgId();
  }

  /**
   * Calculate the key based on Telegram guidelines, specifying whether it's the client or not
   * @param authKey
   * @param msgKey
   * @param client
   * @returns {{iv: Buffer, key: Buffer}}
   */
  async _calcKey(authKey, msgKey, client) {
    const x = this._isCall ? 128 + (this._isOutgoing ^ client ? 8 : 0) : client === true ? 0 : 8;
    const [sha256a, sha256b] = await Promise.all([Helpers.sha256(Buffer.concat([msgKey, authKey.slice(x, x + 36)])), Helpers.sha256(Buffer.concat([authKey.slice(x + 40, x + 76), msgKey]))]);
    const key = Buffer.concat([sha256a.slice(0, 8), sha256b.slice(8, 24), sha256a.slice(24, 32)]);
    if (this._isCall) {
      const iv = Buffer.concat([sha256b.slice(0, 4), sha256a.slice(8, 16), sha256b.slice(24, 28)]);
      return {
        key,
        iv
      };
    }
    const iv = Buffer.concat([sha256b.slice(0, 8), sha256a.slice(8, 24), sha256b.slice(24, 32)]);
    return {
      key,
      iv
    };
  }

  /**
   * Writes a message containing the given data into buffer.
   * Returns the message id.
   * @param buffer
   * @param data
   * @param contentRelated
   * @param afterId
   */
  async writeDataAsMessage(buffer, data, contentRelated, afterId) {
    const msgId = this._getNewMsgId();
    const seqNo = this._getSeqNo(contentRelated);
    let body;
    if (!afterId) {
      body = await GZIPPacked.gzipIfSmaller(contentRelated, data);
    } else {
      // Invoke query expects a query with a getBytes func
      body = await GZIPPacked.gzipIfSmaller(contentRelated, new InvokeAfterMsg({
        msgId: afterId,
        query: {
          getBytes() {
            return data;
          }
        }
      }).getBytes());
    }
    const s = Buffer.alloc(4);
    s.writeInt32LE(seqNo, 0);
    const b = Buffer.alloc(4);
    b.writeInt32LE(body.length, 0);
    const m = toSignedLittleBuffer(msgId, 8);
    buffer.write(Buffer.concat([m, s, b]));
    buffer.write(body);
    return msgId;
  }

  /**
   * Encrypts the given message data using the current authorization key
   * following MTProto 2.0 guidelines core.telegram.org/mtproto/description.
   * @param data
   */
  async encryptMessageData(data) {
    await this.authKey.waitForKey();
    if (this._isCall) {
      const x = 128 + (this._isOutgoing ? 0 : 8);
      const lengthStart = data.length;
      data = Buffer.from(data);
      if (lengthStart % 4 !== 0) {
        data = Buffer.concat([data, Buffer.from(new Array(4 - lengthStart % 4).fill(0x20))]);
      }
      const msgKeyLarge = await Helpers.sha256(Buffer.concat([this.authKey.getKey().slice(88 + x, 88 + x + 32), Buffer.from(data)]));
      const msgKey = msgKeyLarge.slice(8, 24);
      const {
        iv,
        key
      } = await this._calcKey(this.authKey.getKey(), msgKey, true);
      data = Helpers.convertToLittle(new aes.CTR(key, iv).encrypt(data));
      // data = data.slice(0, lengthStart)
      return Buffer.concat([msgKey, data]);
    } else {
      const s = toSignedLittleBuffer(this.salt, 8);
      const i = toSignedLittleBuffer(this.id, 8);
      data = Buffer.concat([Buffer.concat([s, i]), data]);
      const padding = Helpers.generateRandomBytes(Helpers.mod(-(data.length + 12), 16) + 12);
      // Being substr(what, offset, length); x = 0 for client
      // "msg_key_large = SHA256(substr(auth_key, 88+x, 32) + pt + padding)"
      const msgKeyLarge = await Helpers.sha256(Buffer.concat([this.authKey.getKey().slice(88, 88 + 32), data, padding]));
      // "msg_key = substr (msg_key_large, 8, 16)"
      const msgKey = msgKeyLarge.slice(8, 24);
      const {
        iv,
        key
      } = await this._calcKey(this.authKey.getKey(), msgKey, true);
      const keyId = Helpers.readBufferFromBigInt(this.authKey.keyId, 8);
      return Buffer.concat([keyId, msgKey, new IGE(key, iv).encryptIge(Buffer.concat([data, padding]))]);
    }
  }

  /**
   * Inverse of `encrypt_message_data` for incoming server messages.
   * @param body
   */
  async decryptMessageData(body) {
    if (body.length < 8) {
      throw new InvalidBufferError(body);
    }
    if (body.length < 0) {
      // length needs to be positive
      throw new SecurityError('Server replied with negative length');
    }
    if (body.length % 4 !== 0 && !this._isCall) {
      throw new SecurityError('Server replied with length not divisible by 4');
    }
    // TODO Check salt,sessionId, and sequenceNumber
    if (!this._isCall) {
      const keyId = Helpers.readBigIntFromBuffer(body.slice(0, 8));
      if (keyId.neq(this.authKey.keyId)) {
        throw new SecurityError('Server replied with an invalid auth key');
      }
    }
    const msgKey = this._isCall ? body.slice(0, 16) : body.slice(8, 24);
    const x = this._isCall ? 128 + (this.isOutgoing ? 8 : 0) : undefined;
    const {
      iv,
      key
    } = await this._calcKey(this.authKey.getKey(), msgKey, false);
    if (this._isCall) {
      body = body.slice(16);
      const lengthStart = body.length;
      body = Buffer.concat([body, Buffer.from(new Array(4 - lengthStart % 4).fill(0))]);
      body = Helpers.convertToLittle(new aes.CTR(key, iv).decrypt(body));
      body = body.slice(0, lengthStart);
    } else {
      body = new IGE(key, iv).decryptIge(this._isCall ? body.slice(16) : body.slice(24));
    }
    // https://core.telegram.org/mtproto/security_guidelines
    // Sections "checking sha256 hash" and "message length"

    const ourKey = this._isCall ? await Helpers.sha256(Buffer.concat([this.authKey.getKey().slice(88 + x, 88 + x + 32), body])) : await Helpers.sha256(Buffer.concat([this.authKey.getKey().slice(96, 96 + 32), body]));
    if (!this._isCall && !msgKey.equals(ourKey.slice(8, 24))) {
      throw new SecurityError('Received msg_key doesn\'t match with expected one');
    }
    const reader = new BinaryReader(body);
    if (this._isCall) {
      // Seq
      reader.readInt(false);
      return reader.read(body.length - 4);
    } else {
      reader.readLong(); // removeSalt
      const serverId = reader.readLong();
      if (!serverId.eq(this.id)) {
        throw new SecurityError('Server replied with a wrong session ID');
      }
      const remoteMsgId = reader.readLong();
      // if we get a duplicate message id we should ignore it.
      if (this.msgIds.includes(remoteMsgId.toString())) {
        throw new SecurityError('Duplicate msgIds');
      }
      // we only store the latest 500 message ids from the server
      if (this.msgIds.length > 500) {
        this.msgIds.shift();
      }
      const remoteSequence = reader.readInt();
      const containerLen = reader.readInt(); // msgLen for the inner object, padding ignored
      const diff = body.length - containerLen;
      // We want to check if it's between 12 and 1024
      // https://core.telegram.org/mtproto/security_guidelines#checking-message-length
      if (diff < 12 || diff > 1024) {
        throw new SecurityError('Server replied with the wrong message padding');
      }

      // We could read msg_len bytes and use those in a new reader to read
      // the next TLObject without including the padding, but since the
      // reader isn't used for anything else after this, it's unnecessary.
      const obj = await reader.tgReadObject();
      // We only check for objects that telegram has returned to us (Updates) not ones we send.
      if (obj?.className?.startsWith('Update')) {
        const now = Math.floor(Date.now() / 1000);
        const msgLocalTime = this.getMsgIdTimeLocal(remoteMsgId);
        if (msgLocalTime && (msgLocalTime - now > 30 || now - msgLocalTime > 300)) {
          // 30 sec in the future or 300 sec in the past
          throw new SecurityError('The message time is incorrect.');
        }
      }
      if (obj && !('errorCode' in obj)) {
        this.msgIds.push(remoteMsgId.toString());
      }
      return new TLMessage(remoteMsgId, remoteSequence, obj);
    }
  }

  /**
   * Generates a new unique message ID based on the current
   * time (in ms) since epoch, applying a known time offset.
   * @private
   */
  _getNewMsgId() {
    const now = Date.now() / 1000 + this.timeOffset;
    const nanoseconds = Math.floor((now - Math.floor(now)) * 1e9);
    let newMsgId = BigInt(Math.floor(now)).shiftLeft(BigInt(32)).or(BigInt(nanoseconds).shiftLeft(BigInt(2)));
    if (this._lastMsgId.greaterOrEquals(newMsgId)) {
      newMsgId = this._lastMsgId.add(BigInt(4));
    }
    this._lastMsgId = newMsgId;
    return newMsgId;
  }

  /**
   * Returns the understood time by the message id (server time + local offset)
   */
  getMsgIdTimeLocal(msgId) {
    if (this._lastMsgId.eq(0)) {
      // this means it's the first message sent/received so don't check yet
      return false;
    }
    return msgId.shiftRight(BigInt(32)).toJSNumber() - this.timeOffset;
  }

  /**
   * Updates the time offset to the correct
   * one given a known valid message ID.
   * @param correctMsgId {BigInteger}
   */
  updateTimeOffset(correctMsgId) {
    const bad = this._getNewMsgId();
    const old = this.timeOffset;
    const now = Math.floor(Date.now() / 1000);
    const correct = correctMsgId.shiftRight(BigInt(32));
    this.timeOffset = correct - now;
    if (this.timeOffset !== old) {
      this._lastMsgId = BigInt(0);
      this._log.debug(`Updated time offset (old offset ${old}, bad ${bad}, good ${correctMsgId}, new ${this.timeOffset})`);
    }
    return this.timeOffset;
  }

  /**
   * Generates the next sequence number depending on whether
   * it should be for a content-related query or not.
   * @param contentRelated
   * @private
   */
  _getSeqNo(contentRelated) {
    if (contentRelated) {
      const result = this._sequence * 2 + 1;
      this._sequence += 1;
      return result;
    } else {
      return this._sequence * 2;
    }
  }
}
module.exports = MTProtoState;

/***/ }),

/***/ "./src/lib/gramjs/network/RequestState.js":
/*!************************************************!*\
  !*** ./src/lib/gramjs/network/RequestState.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Deferred = (__webpack_require__(/*! ../../../util/Deferred */ "./src/util/Deferred.ts")["default"]);
class RequestState {
  constructor(request) {
    let abortSignal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    this.containerId = undefined;
    this.msgId = undefined;
    this.request = request;
    this.data = request.getBytes();
    this.after = undefined;
    this.result = undefined;
    this.abortSignal = abortSignal;
    this.finished = new Deferred();
    this.resetPromise();
  }
  isReady() {
    if (!this.after) {
      return true;
    }
    return this.after.finished.promise;
  }
  resetPromise() {
    // Prevent stuck await
    this.reject?.();
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
module.exports = RequestState;

/***/ }),

/***/ "./src/lib/gramjs/network/connection/Connection.js":
/*!*********************************************************!*\
  !*** ./src/lib/gramjs/network/connection/Connection.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const PromisedWebSockets = __webpack_require__(/*! ../../extensions/PromisedWebSockets */ "./src/lib/gramjs/extensions/PromisedWebSockets.js");
const HttpStream = (__webpack_require__(/*! ../../extensions/HttpStream */ "./src/lib/gramjs/extensions/HttpStream.ts")["default"]);
const AsyncQueue = __webpack_require__(/*! ../../extensions/AsyncQueue */ "./src/lib/gramjs/extensions/AsyncQueue.js");

/**
 * The `Connection` class is a wrapper around ``asyncio.open_connection``.
 *
 * Subclasses will implement different transport modes as atomic operations,
 * which this class eases doing since the exposed interface simply puts and
 * gets complete data payloads to and from queues.
 *
 * The only error that will raise from send and receive methods is
 * ``ConnectionError``, which will raise when attempting to send if
 * the client is disconnected (includes remote disconnections).
 */
class Connection {
  constructor(ip, port, dcId, loggers, testServers, isPremium) {
    _defineProperty(this, "PacketCodecClass", undefined);
    this._ip = ip;
    this._port = port;
    this._dcId = dcId;
    this._log = loggers;
    this._testServers = testServers;
    this._isPremium = isPremium;
    this._connected = false;
    this._sendTask = undefined;
    this._recvTask = undefined;
    this._codec = undefined;
    this._obfuscation = undefined; // TcpObfuscated and MTProxy
    this._sendArray = new AsyncQueue();
    this._recvArray = new AsyncQueue();
    // this.socket = new PromiseSocket(new Socket())

    this.shouldLongPoll = false;
    this.socket = new PromisedWebSockets(this.disconnectCallback.bind(this));
  }
  isConnected() {
    return this._connected;
  }
  async disconnectCallback() {
    await this.disconnect(true);
  }
  async _connect() {
    this._log.debug('Connecting');
    this._codec = new this.PacketCodecClass(this);
    await this.socket.connect(this._port, this._ip, this._testServers, this._isPremium);
    this._log.debug('Finished connecting');
    // await this.socket.connect({host: this._ip, port: this._port});
    await this._initConn();
  }
  async connect() {
    await this._connect();
    this._connected = true;
    if (!this._sendTask) {
      this._sendTask = this._sendLoop();
    }
    this._recvTask = this._recvLoop();
  }
  async disconnect() {
    let fromCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!this._connected) {
      return;
    }
    this._connected = false;
    void this._recvArray.push(undefined);
    if (!fromCallback) {
      await this.socket.close();
    }
  }
  async send(data) {
    if (!this._connected) {
      throw new Error('Not connected');
    }
    await this._sendArray.push(data);
  }
  async recv() {
    while (this._connected) {
      const result = await this._recvArray.pop();
      // null = sentinel value = keep trying
      if (result) {
        return result;
      }
    }
    throw new Error('Not connected');
  }
  async _sendLoop() {
    // TODO handle errors
    try {
      while (this._connected) {
        const data = await this._sendArray.pop();
        if (!data) {
          this._sendTask = undefined;
          return;
        }
        await this._send(data);
      }
    } catch (e) {
      this._log.info('The server closed the connection while sending');
    }
  }
  async _recvLoop() {
    let data;
    while (this._connected) {
      try {
        data = await this._recv();
        if (!data) {
          throw new Error('no data received');
        }
      } catch (e) {
        this._log.info('connection closed');
        // await this._recvArray.push()

        this.disconnect();
        return;
      }
      await this._recvArray.push(data);
    }
  }
  async _initConn() {
    if (this._codec.tag) {
      await this.socket.write(this._codec.tag);
    }
  }
  _send(data) {
    const encodedPacket = this._codec.encodePacket(data);
    this.socket.write(encodedPacket);
  }
  _recv() {
    return this._codec.readPacket(this.socket);
  }
  toString() {
    return `${this._ip}:${this._port}/${this.constructor.name.replace('Connection', '')}`;
  }
}
class ObfuscatedConnection extends Connection {
  constructor() {
    super(...arguments);
    _defineProperty(this, "ObfuscatedIO", undefined);
  }
  _initConn() {
    this._obfuscation = new this.ObfuscatedIO(this);
    this.socket.write(this._obfuscation.header);
  }
  _send(data) {
    this._obfuscation.write(this._codec.encodePacket(data));
  }
  _recv() {
    return this._codec.readPacket(this._obfuscation);
  }
}
class PacketCodec {
  constructor(connection) {
    this._conn = connection;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  encodePacket(data) {
    throw new Error('Not Implemented');

    // Override
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readPacket(reader) {
    // override
    throw new Error('Not Implemented');
  }
}
class HttpConnection extends Connection {
  constructor(ip, port, dcId, loggers, testServers, isPremium) {
    super(ip, port, dcId, loggers, testServers, isPremium);
    this.shouldLongPoll = true;
    this.socket = new HttpStream(this.disconnectCallback.bind(this));
    this.href = HttpStream.getURL(this._ip, this._port, this._testServers, this._isPremium);
  }
  send(data) {
    return this.socket.write(data);
  }
  recv() {
    return this.socket.read();
  }
  async _connect() {
    this._log.debug('Connecting');
    await this.socket.connect(this._port, this._ip, this._testServers, this._isPremium);
    this._log.debug('Finished connecting');
  }
  async connect() {
    await this._connect();
    this._connected = true;
  }
}
module.exports = {
  Connection,
  PacketCodec,
  ObfuscatedConnection,
  HttpConnection
};

/***/ }),

/***/ "./src/lib/gramjs/network/connection/TCPAbridged.js":
/*!**********************************************************!*\
  !*** ./src/lib/gramjs/network/connection/TCPAbridged.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const BigInt = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
const {
  readBufferFromBigInt
} = __webpack_require__(/*! ../../Helpers */ "./src/lib/gramjs/Helpers.js");
const {
  Connection,
  PacketCodec
} = __webpack_require__(/*! ./Connection */ "./src/lib/gramjs/network/connection/Connection.js");
class AbridgedPacketCodec extends PacketCodec {
  constructor(props) {
    super(props);
    this.tag = AbridgedPacketCodec.tag;
    this.obfuscateTag = AbridgedPacketCodec.obfuscateTag;
  }
  encodePacket(data) {
    let length = data.length >> 2;
    if (length < 127) {
      const b = Buffer.alloc(1);
      b.writeUInt8(length, 0);
      length = b;
    } else {
      length = Buffer.concat([Buffer.from('7f', 'hex'), readBufferFromBigInt(BigInt(length), 3)]);
    }
    return Buffer.concat([length, data]);
  }
  async readPacket(reader) {
    const readData = await reader.read(1);
    let length = readData[0];
    if (length >= 127) {
      length = Buffer.concat([await reader.read(3), Buffer.alloc(1)]).readInt32LE(0);
    }
    return reader.read(length << 2);
  }
}

/**
 * This is the mode with the lowest overhead, as it will
 * only require 1 byte if the packet length is less than
 * 508 bytes (127 << 2, which is very common).
 */
_defineProperty(AbridgedPacketCodec, "tag", Buffer.from('ef', 'hex'));
_defineProperty(AbridgedPacketCodec, "obfuscateTag", Buffer.from('efefefef', 'hex'));
class ConnectionTCPAbridged extends Connection {
  constructor() {
    super(...arguments);
    _defineProperty(this, "PacketCodecClass", AbridgedPacketCodec);
  }
}
module.exports = {
  ConnectionTCPAbridged,
  AbridgedPacketCodec
};

/***/ }),

/***/ "./src/lib/gramjs/network/connection/TCPFull.js":
/*!******************************************************!*\
  !*** ./src/lib/gramjs/network/connection/TCPFull.js ***!
  \******************************************************/
/***/ (() => {

// CONTEST
// const { Connection, PacketCodec } = require('./Connection')
// const { crc32 } = require('../../Helpers')
// const { InvalidChecksumError } = require('../../errors/Common')
//
// class FullPacketCodec extends PacketCodec {
//     constructor(connection) {
//         super(connection)
//         this._sendCounter = 0 // Telegram will ignore us otherwise
//     }
//
//     encodePacket(data) {
//         // https://core.telegram.org/mtproto#tcp-transport
//         // total length, sequence number, packet and checksum (CRC32)
//         const length = data.length + 12
//         const e = Buffer.alloc(8)
//         e.writeInt32LE(length,0)
//         e.writeInt32LE(this._sendCounter,4)
//         data = Buffer.concat([e, data])
//         const crc =  Buffer.alloc(4)
//         crc.writeUInt32LE(crc32(data),0)
//         this._sendCounter += 1
//         return Buffer.concat([data, crc])
//     }
//
//     /**
//      *
//      * @param reader {PromisedWebSockets}
//      * @returns {Promise<*>}
//      */
//     async readPacket(reader) {
//         const packetLenSeq = await reader.read(8) // 4 and 4
//         // process.exit(0);
//         if (packetLenSeq === undefined) {
//             return false
//         }
//         const packetLen = packetLenSeq.readInt32LE(0)
//         let body = await reader.read(packetLen - 8)
//         const [checksum] = body.slice(-4).readUInt32LE(0)
//         body = body.slice(0, -4)
//
//         const validChecksum = crc32(Buffer.concat([packetLenSeq, body]))
//         if (!(validChecksum === checksum)) {
//             throw new InvalidChecksumError(checksum, validChecksum)
//         }
//         return body
//     }
// }
//
// class ConnectionTCPFull extends Connection {
//     PacketCodecClass = FullPacketCodec;
// }
//
// module.exports = {
//     FullPacketCodec,
//     ConnectionTCPFull,
// }

/***/ }),

/***/ "./src/lib/gramjs/network/connection/TCPObfuscated.js":
/*!************************************************************!*\
  !*** ./src/lib/gramjs/network/connection/TCPObfuscated.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  generateRandomBytes
} = __webpack_require__(/*! ../../Helpers */ "./src/lib/gramjs/Helpers.js");
const {
  ObfuscatedConnection
} = __webpack_require__(/*! ./Connection */ "./src/lib/gramjs/network/connection/Connection.js");
const {
  AbridgedPacketCodec
} = __webpack_require__(/*! ./TCPAbridged */ "./src/lib/gramjs/network/connection/TCPAbridged.js");
const CTR = __webpack_require__(/*! ../../crypto/CTR */ "./src/lib/gramjs/crypto/CTR.js");
class ObfuscatedIO {
  constructor(connection) {
    _defineProperty(this, "header", undefined);
    this.connection = connection.socket;
    const res = this.initHeader(connection.PacketCodecClass);
    this.header = res.random;
    this._encrypt = res.encryptor;
    this._decrypt = res.decryptor;
  }
  initHeader(packetCodec) {
    // Obfuscated messages secrets cannot start with any of these
    const keywords = [Buffer.from('50567247', 'hex'), Buffer.from('474554', 'hex'), Buffer.from('504f5354', 'hex'), Buffer.from('eeeeeeee', 'hex')];
    let random;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      random = generateRandomBytes(64);
      if (random[0] !== 0xef && !random.slice(4, 8).equals(Buffer.alloc(4))) {
        let ok = true;
        for (const key of keywords) {
          if (key.equals(random.slice(0, 4))) {
            ok = false;
            break;
          }
        }
        if (ok) {
          break;
        }
      }
    }
    random = random.toJSON().data;
    const randomReversed = Buffer.from(random.slice(8, 56)).reverse();
    // Encryption has "continuous buffer" enabled
    const encryptKey = Buffer.from(random.slice(8, 40));
    const encryptIv = Buffer.from(random.slice(40, 56));
    const decryptKey = Buffer.from(randomReversed.slice(0, 32));
    const decryptIv = Buffer.from(randomReversed.slice(32, 48));
    const encryptor = new CTR(encryptKey, encryptIv);
    const decryptor = new CTR(decryptKey, decryptIv);
    random = Buffer.concat([Buffer.from(random.slice(0, 56)), packetCodec.obfuscateTag, Buffer.from(random.slice(60))]);
    random = Buffer.concat([Buffer.from(random.slice(0, 56)), Buffer.from(encryptor.encrypt(random).slice(56, 64)), Buffer.from(random.slice(64))]);
    return {
      random,
      encryptor,
      decryptor
    };
  }
  async read(n) {
    const data = await this.connection.readExactly(n);
    return this._decrypt.encrypt(data);
  }
  write(data) {
    this.connection.write(this._encrypt.encrypt(data));
  }
}
class ConnectionTCPObfuscated extends ObfuscatedConnection {
  constructor() {
    super(...arguments);
    _defineProperty(this, "ObfuscatedIO", ObfuscatedIO);
    _defineProperty(this, "PacketCodecClass", AbridgedPacketCodec);
  }
}
module.exports = {
  ConnectionTCPObfuscated
};

/***/ }),

/***/ "./src/lib/gramjs/network/connection/index.js":
/*!****************************************************!*\
  !*** ./src/lib/gramjs/network/connection/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  Connection,
  HttpConnection
} = __webpack_require__(/*! ./Connection */ "./src/lib/gramjs/network/connection/Connection.js");
const {
  ConnectionTCPFull
} = __webpack_require__(/*! ./TCPFull */ "./src/lib/gramjs/network/connection/TCPFull.js");
const {
  ConnectionTCPAbridged
} = __webpack_require__(/*! ./TCPAbridged */ "./src/lib/gramjs/network/connection/TCPAbridged.js");
const {
  ConnectionTCPObfuscated
} = __webpack_require__(/*! ./TCPObfuscated */ "./src/lib/gramjs/network/connection/TCPObfuscated.js");
module.exports = {
  Connection,
  HttpConnection,
  ConnectionTCPFull,
  ConnectionTCPAbridged,
  ConnectionTCPObfuscated
};

/***/ }),

/***/ "./src/lib/gramjs/network/index.js":
/*!*****************************************!*\
  !*** ./src/lib/gramjs/network/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const MTProtoPlainSender = __webpack_require__(/*! ./MTProtoPlainSender */ "./src/lib/gramjs/network/MTProtoPlainSender.js");
const MTProtoSender = __webpack_require__(/*! ./MTProtoSender */ "./src/lib/gramjs/network/MTProtoSender.js");
const {
  Connection,
  ConnectionTCPFull,
  ConnectionTCPAbridged,
  ConnectionTCPObfuscated,
  HttpConnection
} = __webpack_require__(/*! ./connection */ "./src/lib/gramjs/network/connection/index.js");
const {
  UpdateConnectionState,
  UpdateServerTimeOffset
} = __webpack_require__(/*! ./updates */ "./src/lib/gramjs/network/updates.js");
module.exports = {
  Connection,
  HttpConnection,
  ConnectionTCPFull,
  ConnectionTCPAbridged,
  ConnectionTCPObfuscated,
  MTProtoPlainSender,
  MTProtoSender,
  UpdateConnectionState,
  UpdateServerTimeOffset
};

/***/ }),

/***/ "./src/lib/gramjs/network/updates.js":
/*!*******************************************!*\
  !*** ./src/lib/gramjs/network/updates.js ***!
  \*******************************************/
/***/ ((module) => {

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class UpdateConnectionState {
  constructor(state, origin) {
    this.state = state;
    this.origin = origin;
  }
}
_defineProperty(UpdateConnectionState, "disconnected", -1);
_defineProperty(UpdateConnectionState, "connected", 1);
_defineProperty(UpdateConnectionState, "broken", 0);
class UpdateServerTimeOffset {
  constructor(timeOffset) {
    this.timeOffset = timeOffset;
  }
}
module.exports = {
  UpdateConnectionState,
  UpdateServerTimeOffset
};

/***/ }),

/***/ "./src/lib/gramjs/sessions/Abstract.js":
/*!*********************************************!*\
  !*** ./src/lib/gramjs/sessions/Abstract.js ***!
  \*********************************************/
/***/ ((module) => {

class Session {
  /**
   * Creates a clone of this session file
   * @param toInstance {Session|null}
   * @returns {Session}
   */

  /* CONTEST
  clone(toInstance = null) {
      return toInstance || new this.constructor()
  } */

  /**
   * Returns the currently-used data center ID.
   */
  get dcId() {
    throw new Error('Not Implemented');
  }

  /**
   * Returns the server address where the library should connect to.
   */
  get serverAddress() {
    throw new Error('Not Implemented');
  }

  /**
   * Returns the port to which the library should connect to.
   */
  get port() {
    throw new Error('Not Implemented');
  }

  /**
   * Returns an ``AuthKey`` instance associated with the saved
   * data center, or `None` if a new one should be generated.
   */
  get authKey() {
    throw new Error('Not Implemented');
  }

  /**
   * Sets the ``AuthKey`` to be used for the saved data center.
   * @param value
   */
  set authKey(value) {
    throw new Error('Not Implemented');
  }

  /**
   * Sets the information of the data center address and port that
   * the library should connect to, as well as the data center ID,
   * which is currently unused.
   * @param dcId {number}
   * @param serverAddress {string}
   * @param port {number}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDC(dcId, serverAddress, port) {
    throw new Error('Not implemented');
  }

  /**
   * Returns an ID of the takeout process initialized for this session,
   * or `None` if there's no were any unfinished takeout requests.
   */
  /* CONTEST
  get takeoutId() {
      throw new Error('Not Implemented')
  }
  */
  /**
   * Sets the ID of the unfinished takeout process for this session.
   * @param value
   */
  /* CONTEST
  set takeoutId(value) {
      throw new Error('Not Implemented')
  }
  */
  /**
   * Returns the ``UpdateState`` associated with the given `entity_id`.
   * If the `entity_id` is 0, it should return the ``UpdateState`` for
   * no specific channel (the "general" state). If no state is known
   * it should ``return None``.
   * @param entityId
   */
  /* CONTEST
  getUpdateState(entityId) {
      throw new Error('Not Implemented')
  }
    */

  /**
   * Sets the given ``UpdateState`` for the specified `entity_id`, which
   * should be 0 if the ``UpdateState`` is the "general" state (and not
   * for any specific channel).
   * @param entityId
   * @param state
   */
  /* CONTEST
  setUpdateState(entityId, state) {
      throw new Error('Not Implemented')
  }
    */

  /**
   * Called on client disconnection. Should be used to
   * free any used resources. Can be left empty if none.
   */

  /* CONTEST
  close() {
   }
    */

  /**
   * called whenever important properties change. It should
   * make persist the relevant session information to disk.
   */
  save() {
    throw new Error('Not Implemented');
  }

  /**
   * Called upon client.log_out(). Should delete the stored
   * information from disk since it's not valid anymore.
   */

  delete() {
    throw new Error('Not Implemented');
  }

  /**
   * Lists available sessions. Not used by the library itself.
   */
  /* CONTEST
  listSessions() {
      throw new Error('Not Implemented')
  }
    */

  /**
   * Processes the input ``TLObject`` or ``list`` and saves
   * whatever information is relevant (e.g., ID or access hash).
   * @param tlo
   */
  /* CONTEST
  processEntities(tlo) {
      throw new Error('Not Implemented')
  }
    */

  /**
   * Turns the given key into an ``InputPeer`` (e.g. ``InputPeerUser``).
   * The library uses this method whenever an ``InputPeer`` is needed
   * to suit several purposes (e.g. user only provided its ID or wishes
   * to use a cached username to avoid extra RPC).
   */
  /* CONTEST
  getInputEntity(key) {
      throw new Error('Not Implemented')
  }
    */
}
module.exports = Session;

/***/ }),

/***/ "./src/lib/gramjs/sessions/CacheApiSession.js":
/*!****************************************************!*\
  !*** ./src/lib/gramjs/sessions/CacheApiSession.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-restricted-globals */
const StorageSession = __webpack_require__(/*! ./StorageSession */ "./src/lib/gramjs/sessions/StorageSession.js");
const CACHE_NAME = 'GramJs';
class CacheApiSession extends StorageSession {
  async _delete() {
    const request = new Request(this._storageKey);
    const cache = await self.caches.open(CACHE_NAME);
    return cache.delete(request);
  }
  async _fetchFromCache() {
    const request = new Request(this._storageKey);
    const cache = await self.caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    return cached ? cached.text() : undefined;
  }
  async _saveToCache(data) {
    const request = new Request(this._storageKey);
    const response = new Response(data);
    const cache = await self.caches.open(CACHE_NAME);
    return cache.put(request, response);
  }
}
module.exports = CacheApiSession;

/***/ }),

/***/ "./src/lib/gramjs/sessions/CallbackSession.js":
/*!****************************************************!*\
  !*** ./src/lib/gramjs/sessions/CallbackSession.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const MemorySession = __webpack_require__(/*! ./Memory */ "./src/lib/gramjs/sessions/Memory.js");
const AuthKey = __webpack_require__(/*! ../crypto/AuthKey */ "./src/lib/gramjs/crypto/AuthKey.js");
const utils = __webpack_require__(/*! ../Utils */ "./src/lib/gramjs/Utils.js");
class CallbackSession extends MemorySession {
  constructor(sessionData, callback) {
    super();
    this._sessionData = sessionData;
    this._callback = callback;
    this._authKeys = {};
  }
  get authKey() {
    throw new Error('Not supported');
  }
  set authKey(value) {
    throw new Error('Not supported');
  }
  async load() {
    if (!this._sessionData) {
      return;
    }
    const {
      mainDcId,
      keys,
      hashes
    } = this._sessionData;
    const {
      ipAddress,
      port
    } = utils.getDC(mainDcId);
    this.setDC(mainDcId, ipAddress, port, true);
    await Promise.all(Object.keys(keys).map(async dcId => {
      const key = typeof keys[dcId] === 'string' ? Buffer.from(keys[dcId], 'hex') : Buffer.from(keys[dcId]);
      if (hashes[dcId]) {
        const hash = typeof hashes[dcId] === 'string' ? Buffer.from(hashes[dcId], 'hex') : Buffer.from(hashes[dcId]);
        this._authKeys[dcId] = new AuthKey(key, hash);
      } else {
        this._authKeys[dcId] = new AuthKey();
        await this._authKeys[dcId].setKey(key, true);
      }
    }));
  }
  setDC(dcId, serverAddress, port) {
    let skipOnUpdate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    this._dcId = dcId;
    this._serverAddress = serverAddress;
    this._port = port;
    delete this._authKeys[dcId];
    if (!skipOnUpdate) {
      void this._onUpdate();
    }
  }
  getAuthKey() {
    let dcId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._dcId;
    return this._authKeys[dcId];
  }
  setAuthKey(authKey) {
    let dcId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._dcId;
    this._authKeys[dcId] = authKey;
    void this._onUpdate();
  }
  getSessionData() {
    const sessionData = {
      mainDcId: this._dcId,
      keys: {},
      hashes: {}
    };
    Object.keys(this._authKeys).forEach(dcId => {
      const authKey = this._authKeys[dcId];
      if (!authKey || !authKey._key) return;
      sessionData.keys[dcId] = authKey._key.toString('hex');
      sessionData.hashes[dcId] = authKey._hash.toString('hex');
    });
    return sessionData;
  }
  _onUpdate() {
    this._callback(this.getSessionData());
  }
  delete() {
    this._callback(undefined);
  }
}
module.exports = CallbackSession;

/***/ }),

/***/ "./src/lib/gramjs/sessions/IdbSession.js":
/*!***********************************************!*\
  !*** ./src/lib/gramjs/sessions/IdbSession.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const idb = __webpack_require__(/*! idb-keyval */ "./node_modules/idb-keyval/dist/index.js");
const StorageSession = __webpack_require__(/*! ./StorageSession */ "./src/lib/gramjs/sessions/StorageSession.js");
const CACHE_NAME = 'GramJs';
class IdbSession extends StorageSession {
  _delete() {
    return idb.del(`${CACHE_NAME}:${this._storageKey}`);
  }
  _fetchFromCache() {
    return idb.get(`${CACHE_NAME}:${this._storageKey}`);
  }
  _saveToCache(data) {
    return idb.set(`${CACHE_NAME}:${this._storageKey}`, data);
  }
}
module.exports = IdbSession;

/***/ }),

/***/ "./src/lib/gramjs/sessions/LocalStorageSession.js":
/*!********************************************************!*\
  !*** ./src/lib/gramjs/sessions/LocalStorageSession.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const StorageSession = __webpack_require__(/*! ./StorageSession */ "./src/lib/gramjs/sessions/StorageSession.js");
class LocalStorageSession extends StorageSession {
  _delete() {
    return localStorage.removeItem(this._storageKey);
  }
  _fetchFromCache() {
    return localStorage.getItem(this._storageKey);
  }
  _saveToCache(data) {
    return localStorage.setItem(this._storageKey, data);
  }
}
module.exports = LocalStorageSession;

/***/ }),

/***/ "./src/lib/gramjs/sessions/Memory.js":
/*!*******************************************!*\
  !*** ./src/lib/gramjs/sessions/Memory.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Session = __webpack_require__(/*! ./Abstract */ "./src/lib/gramjs/sessions/Abstract.js");
class MemorySession extends Session {
  constructor() {
    super();
    this._serverAddress = undefined;
    this._dcId = 0;
    this._port = undefined;
    this._takeoutId = undefined;
    this._entities = new Set();
    this._updateStates = {};
  }
  get dcId() {
    return this._dcId;
  }
  get serverAddress() {
    return this._serverAddress;
  }
  get port() {
    return this._port;
  }
  get authKey() {
    return this._authKey;
  }
  set authKey(value) {
    this._authKey = value;
  }
  setDC(dcId, serverAddress, port) {
    this._dcId = dcId | 0;
    this._serverAddress = serverAddress;
    this._port = port;
  }

  /* CONTEST
  get takeoutId() {
      return this._takeoutId
  }
   set takeoutId(value) {
      this._takeoutId = value
  }
   getUpdateState(entityId) {
      return this._updateStates[entityId]
  }
   setUpdateState(entityId, state) {
      return this._updateStates[entityId] = state
  }
   close() {
  }
   save() {
  }
   async load() {
   }
   delete() {
  }
   _entityValuesToRow(id, hash, username, phone, name) {
      // While this is a simple implementation it might be overrode by,
      // other classes so they don't need to implement the plural form
      // of the method. Don't remove.
      return [id, hash, username, phone, name]
  }
   _entityToRow(e) {
      if (!(e.classType === "constructor")) {
          return
      }
      let p
      let markedId
      try {
          p = utils.getInputPeer(e, false)
          markedId = utils.getPeerId(p)
      } catch (e) {
          // Note: `get_input_peer` already checks for non-zero `accessHash`.
          // See issues #354 and #392. It also checks that the entity
          // is not `min`, because its `accessHash` cannot be used
          // anywhere (since layer 102, there are two access hashes).
          return
      }
      let pHash
      if (p instanceof types.InputPeerUser || p instanceof types.InputPeerChannel) {
          pHash = p.accessHash
      } else if (p instanceof types.InputPeerChat) {
          pHash = 0
      } else {
          return
      }
       let username = e.username
      if (username) {
          username = username.toLowerCase()
      }
      const phone = e.phone
      const name = utils.getDisplayName(e)
      return this._entityValuesToRow(markedId, pHash, username, phone, name)
  }
   _entitiesToRows(tlo) {
      let entities = []
      if (tlo.classType === "constructor" && utils.isListLike(tlo)) {
          // This may be a list of users already for instance
          entities = tlo
      } else {
          if (tlo instanceof Object) {
              if ('user' in tlo) {
                  entities.push(tlo.user)
              }
              if ('chats' in tlo && utils.isListLike(tlo.chats)) {
                  entities.concat(tlo.chats)
              }
              if ('users' in tlo && utils.isListLike(tlo.users)) {
                  entities.concat(tlo.users)
              }
          }
      }
      const rows = [] // Rows to add (id, hash, username, phone, name)
      for (const e of entities) {
          const row = this._entityToRow(e)
          if (row) {
              rows.push(row)
          }
      }
      return rows
  }
   processEntities(tlo) {
      const entitiesSet = this._entitiesToRows(tlo)
      for (const e of entitiesSet) {
          this._entities.add(e)
      }
  }
   getEntityRowsByPhone(phone) {
      for (const e of this._entities) { // id, hash, username, phone, name
          if (e[3] === phone) {
              return [e[0], e[1]]
          }
      }
  }
   getEntityRowsByUsername(username) {
      for (const e of this._entities) { // id, hash, username, phone, name
          if (e[2] === username) {
              return [e[0], e[1]]
          }
      }
  }
   getEntityRowsByName(name) {
      for (const e of this._entities) { // id, hash, username, phone, name
          if (e[4] === name) {
              return [e[0], e[1]]
          }
      }
  }
   getEntityRowsById(id, exact = true) {
      if (exact) {
          for (const e of this._entities) { // id, hash, username, phone, name
              if (e[0] === id) {
                  return [e[0], e[1]]
              }
          }
      } else {
          const ids = [utils.getPeerId(new types.PeerUser({ userId: id })),
              utils.getPeerId(new types.PeerChat({ chatId: id })),
              utils.getPeerId(new types.PeerChannel({ channelId: id })),
          ]
          for (const e of this._entities) { // id, hash, username, phone, name
              if (ids.includes(e[0])) {
                  return [e[0], e[1]]
              }
          }
      }
  }
   getInputEntity(key) {
      let exact
      if (key.SUBCLASS_OF_ID !== undefined) {
          if ([0xc91c90b6, 0xe669bf46, 0x40f202fd].includes(key.SUBCLASS_OF_ID)) {
              // hex(crc32(b'InputPeer', b'InputUser' and b'InputChannel'))
              // We already have an Input version, so nothing else required
              return key
          }
          // Try to early return if this key can be casted as input peer
          return utils.getInputPeer(key)
      } else {
          // Not a TLObject or can't be cast into InputPeer
          if (key.classType === 'constructor') {
              key = utils.getPeerId(key)
              exact = true
          } else {
              exact = !(typeof key == 'number') || key < 0
          }
      }
      let result = null
      if (typeof key === 'string') {
          const phone = utils.parsePhone(key)
          if (phone) {
              result = this.getEntityRowsByPhone(phone)
          } else {
              const { username, isInvite } = utils.parseUsername(key)
              if (username && !isInvite) {
                  result = this.getEntityRowsByUsername(username)
              } else {
                  const tup = utils.resolveInviteLink(key)[1]
                  if (tup) {
                      result = this.getEntityRowsById(tup, false)
                  }
              }
          }
      } else if (typeof key === 'number') {
          result = this.getEntityRowsById(key, exact)
      }
      if (!result && typeof key === 'string') {
          result = this.getEntityRowsByName(key)
      }
       if (result) {
          let entityId = result[0] // unpack resulting tuple
          const entityHash = result[1]
          const resolved = utils.resolveId(entityId)
          entityId = resolved[0]
          const kind = resolved[1]
          // removes the mark and returns type of entity
          if (kind === types.PeerUser) {
              return new types.InputPeerUser({ userId: entityId, accessHash: entityHash })
          } else if (kind === types.PeerChat) {
              return new types.InputPeerChat({ chatId: entityId })
          } else if (kind === types.PeerChannel) {
              return new types.InputPeerChannel({ channelId: entityId, accessHash: entityHash })
          }
      } else {
          throw new Error('Could not find input entity with key ' + key)
      }
  } */
}
module.exports = MemorySession;

/***/ }),

/***/ "./src/lib/gramjs/sessions/StorageSession.js":
/*!***************************************************!*\
  !*** ./src/lib/gramjs/sessions/StorageSession.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const MemorySession = __webpack_require__(/*! ./Memory */ "./src/lib/gramjs/sessions/Memory.js");
const AuthKey = __webpack_require__(/*! ../crypto/AuthKey */ "./src/lib/gramjs/crypto/AuthKey.js");
const utils = __webpack_require__(/*! ../Utils */ "./src/lib/gramjs/Utils.js");
const STORAGE_KEY_BASE = 'GramJs-session-';
const SESSION_DATA_PREFIX = 'session:';
class StorageSession extends MemorySession {
  constructor(sessionInfo) {
    super();
    this._authKeys = {};
    if (sessionInfo && sessionInfo.startsWith(SESSION_DATA_PREFIX)) {
      this._sessionString = sessionInfo;
    } else if (sessionInfo) {
      this._storageKey = sessionInfo;
    }
  }
  get authKey() {
    throw new Error('Not supported');
  }
  set authKey(value) {
    throw new Error('Not supported');
  }
  async load() {
    if (this._sessionString) {
      await this._loadFromSessionString();
      return;
    }
    if (!this._storageKey) {
      return;
    }
    try {
      const json = await this._fetchFromCache();
      const {
        mainDcId,
        keys,
        hashes
      } = JSON.parse(json);
      const {
        ipAddress,
        port
      } = utils.getDC(mainDcId);
      this.setDC(mainDcId, ipAddress, port, true);
      Object.keys(keys).forEach(dcId => {
        if (keys[dcId] && hashes[dcId]) {
          this._authKeys[dcId] = new AuthKey(Buffer.from(keys[dcId].data), Buffer.from(hashes[dcId].data));
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to retrieve or parse session from storage');
      // eslint-disable-next-line no-console
      console.warn(err);
    }
  }
  setDC(dcId, serverAddress, port) {
    let skipUpdateStorage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    this._dcId = dcId;
    this._serverAddress = serverAddress;
    this._port = port;
    delete this._authKeys[dcId];
    if (!skipUpdateStorage) {
      void this._updateStorage();
    }
  }
  async save() {
    if (!this._storageKey) {
      this._storageKey = generateStorageKey();
    }
    await this._updateStorage();
    return this._storageKey;
  }
  getAuthKey() {
    let dcId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._dcId;
    return this._authKeys[dcId];
  }
  setAuthKey(authKey) {
    let dcId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._dcId;
    this._authKeys[dcId] = authKey;
    void this._updateStorage();
  }
  getSessionData(asHex) {
    const sessionData = {
      mainDcId: this._dcId,
      keys: {},
      hashes: {}
    };
    Object.keys(this._authKeys).forEach(dcId => {
      const authKey = this._authKeys[dcId];
      if (!authKey._key) return;
      sessionData.keys[dcId] = asHex ? authKey._key.toString('hex') : authKey._key;
      sessionData.hashes[dcId] = asHex ? authKey._hash.toString('hex') : authKey._hash;
    });
    return sessionData;
  }
  async _loadFromSessionString() {
    const [, mainDcIdStr, mainDcKey] = this._sessionString.split(':');
    const mainDcId = Number(mainDcIdStr);
    const {
      ipAddress,
      port
    } = utils.getDC(mainDcId);
    this.setDC(mainDcId, ipAddress, port);
    const authKey = new AuthKey();
    await authKey.setKey(Buffer.from(mainDcKey, 'hex'), true);
    this.setAuthKey(authKey, mainDcId);
  }
  async _updateStorage() {
    if (!this._storageKey) {
      return;
    }
    try {
      await this._saveToCache(JSON.stringify(this.getSessionData()));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to update session in storage');
      // eslint-disable-next-line no-console
      console.warn(err);
    }
  }
  async delete() {
    try {
      const deleted = await this._delete();
      return deleted;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to delete session from storage');
      // eslint-disable-next-line no-console
      console.warn(err);
    }
    return undefined;
  }

  // @abstract
  _delete() {
    throw new Error('Not Implemented');
  }

  // @abstract
  _fetchFromCache() {
    throw new Error('Not Implemented');
  }

  // @abstract
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _saveToCache(data) {
    throw new Error('Not Implemented');
  }
}
function generateStorageKey() {
  // Creating two sessions at the same moment is not expected nor supported.
  return `${STORAGE_KEY_BASE}${Date.now()}`;
}
module.exports = StorageSession;

/***/ }),

/***/ "./src/lib/gramjs/sessions/StringSession.js":
/*!**************************************************!*\
  !*** ./src/lib/gramjs/sessions/StringSession.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const MemorySession = __webpack_require__(/*! ./Memory */ "./src/lib/gramjs/sessions/Memory.js");
const AuthKey = __webpack_require__(/*! ../crypto/AuthKey */ "./src/lib/gramjs/crypto/AuthKey.js");
const BinaryReader = __webpack_require__(/*! ../extensions/BinaryReader */ "./src/lib/gramjs/extensions/BinaryReader.js");
const CURRENT_VERSION = '1';
class StringSession extends MemorySession {
  /**
   * This session file can be easily saved and loaded as a string. According
   * to the initial design, it contains only the data that is necessary for
   * successful connection and authentication, so takeout ID is not stored.
    * It is thought to be used where you don't want to create any on-disk
   * files but would still like to be able to save and load existing sessions
   * by other means.
    * You can use custom `encode` and `decode` functions, if present:
    * `encode` definition must be ``function encode(value: Buffer) -> string:``.
   * `decode` definition must be ``function decode(value: string) -> Buffer:``.
   * @param session {string|null}
   */
  constructor() {
    let session = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    super();
    if (session) {
      if (session[0] !== CURRENT_VERSION) {
        throw new Error('Not a valid string');
      }
      session = session.slice(1);
      const r = StringSession.decode(session);
      const reader = new BinaryReader(r);
      this._dcId = reader.read(1).readUInt8(0);
      const serverAddressLen = reader.read(2).readInt16BE(0);
      this._serverAddress = String(reader.read(serverAddressLen));
      this._port = reader.read(2).readInt16BE(0);
      this._key = reader.read(-1);
    }
  }

  /**
   * @param x {Buffer}
   * @returns {string}
   */
  static encode(x) {
    return x.toString('base64');
  }

  /**
   * @param x {string}
   * @returns {Buffer}
   */
  static decode(x) {
    return Buffer.from(x, 'base64');
  }
  async load() {
    if (this._key) {
      this._authKey = new AuthKey();
      await this._authKey.setKey(this._key);
    }
  }
  save() {
    if (!this.authKey) {
      return '';
    }
    const dcBuffer = Buffer.from([this.dcId]);
    const addressBuffer = Buffer.from(this.serverAddress);
    const addressLengthBuffer = Buffer.alloc(2);
    addressLengthBuffer.writeInt16BE(addressBuffer.length, 0);
    const portBuffer = Buffer.alloc(2);
    portBuffer.writeInt16BE(this.port, 0);
    return CURRENT_VERSION + StringSession.encode(Buffer.concat([dcBuffer, addressLengthBuffer, addressBuffer, portBuffer, this.authKey.getKey()]));
  }
  getAuthKey(dcId) {
    if (dcId && dcId !== this.dcId) {
      // Not supported.
      return undefined;
    }
    return this.authKey;
  }
  setAuthKey(authKey, dcId) {
    if (dcId && dcId !== this.dcId) {
      // Not supported.
      return;
    }
    this.authKey = authKey;
  }
}
module.exports = StringSession;

/***/ }),

/***/ "./src/lib/gramjs/sessions/index.js":
/*!******************************************!*\
  !*** ./src/lib/gramjs/sessions/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Memory = __webpack_require__(/*! ./Memory */ "./src/lib/gramjs/sessions/Memory.js");
const StringSession = __webpack_require__(/*! ./StringSession */ "./src/lib/gramjs/sessions/StringSession.js");
const CacheApiSession = __webpack_require__(/*! ./CacheApiSession */ "./src/lib/gramjs/sessions/CacheApiSession.js");
const LocalStorageSession = __webpack_require__(/*! ./LocalStorageSession */ "./src/lib/gramjs/sessions/LocalStorageSession.js");
const IdbSession = __webpack_require__(/*! ./IdbSession */ "./src/lib/gramjs/sessions/IdbSession.js");
const CallbackSession = __webpack_require__(/*! ./CallbackSession */ "./src/lib/gramjs/sessions/CallbackSession.js");
module.exports = {
  Memory,
  StringSession,
  CacheApiSession,
  LocalStorageSession,
  IdbSession,
  CallbackSession
};

/***/ }),

/***/ "./src/lib/gramjs/tl/AllTLObjects.js":
/*!*******************************************!*\
  !*** ./src/lib/gramjs/tl/AllTLObjects.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const api = __webpack_require__(/*! ./api */ "./src/lib/gramjs/tl/api.js");
const LAYER = 183;
const tlobjects = {};
for (const tl of Object.values(api)) {
  if (tl.CONSTRUCTOR_ID) {
    tlobjects[tl.CONSTRUCTOR_ID] = tl;
  } else {
    for (const sub of Object.values(tl)) {
      tlobjects[sub.CONSTRUCTOR_ID] = sub;
    }
  }
}
module.exports = {
  LAYER,
  tlobjects
};

/***/ }),

/***/ "./src/lib/gramjs/tl/api.js":
/*!**********************************!*\
  !*** ./src/lib/gramjs/tl/api.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  parseTl,
  serializeBytes,
  serializeDate
} = __webpack_require__(/*! ./generationHelpers */ "./src/lib/gramjs/tl/generationHelpers.js");
const {
  toSignedLittleBuffer
} = __webpack_require__(/*! ../Helpers */ "./src/lib/gramjs/Helpers.js");
const tlContent = __webpack_require__(/*! ./apiTl */ "./src/lib/gramjs/tl/apiTl.js");
const schemeContent = __webpack_require__(/*! ./schemaTl */ "./src/lib/gramjs/tl/schemaTl.js");

/* CONTEST
const NAMED_AUTO_CASTS = new Set([
    'chatId,int'
])
const NAMED_BLACKLIST = new Set([
    'discardEncryption'
])
const AUTO_CASTS = new Set([
    'InputPeer',
    'InputChannel',
    'InputUser',
    'InputDialogPeer',
    'InputNotifyPeer',
    'InputMedia',
    'InputPhoto',
    'InputMessage',
    'InputDocument',
    'InputChatPhoto'
])

 */
// eslint-disable-next-line no-restricted-globals
const CACHING_SUPPORTED = typeof self !== 'undefined' && self.localStorage !== undefined;
const CACHE_KEY = 'GramJs:apiCache';
function buildApiFromTlSchema() {
  let definitions;
  const fromCache = CACHING_SUPPORTED && loadFromCache();
  if (fromCache) {
    definitions = fromCache;
  } else {
    definitions = loadFromTlSchemas();
    if (CACHING_SUPPORTED) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(definitions));
    }
  }
  return mergeWithNamespaces(createClasses('constructor', definitions.constructors), createClasses('request', definitions.requests));
}
function loadFromCache() {
  const jsonCache = localStorage.getItem(CACHE_KEY);
  return jsonCache && JSON.parse(jsonCache);
}
function loadFromTlSchemas() {
  const [constructorParamsApi, functionParamsApi] = extractParams(tlContent);
  const [constructorParamsSchema, functionParamsSchema] = extractParams(schemeContent);
  const constructors = [].concat(constructorParamsApi, constructorParamsSchema);
  const requests = [].concat(functionParamsApi, functionParamsSchema);
  return {
    constructors,
    requests
  };
}
function mergeWithNamespaces(obj1, obj2) {
  const result = {
    ...obj1
  };
  Object.keys(obj2).forEach(key => {
    if (typeof obj2[key] === 'function' || !result[key]) {
      result[key] = obj2[key];
    } else {
      Object.assign(result[key], obj2[key]);
    }
  });
  return result;
}
function extractParams(fileContent) {
  const f = parseTl(fileContent);
  const constructors = [];
  const functions = [];
  for (const d of f) {
    if (d.isFunction) {
      functions.push(d);
    } else {
      constructors.push(d);
    }
  }
  return [constructors, functions];
}
function argToBytes(x, type) {
  switch (type) {
    case 'int':
      {
        const i = Buffer.alloc(4);
        i.writeInt32LE(x, 0);
        return i;
      }
    case 'long':
      return toSignedLittleBuffer(x, 8);
    case 'int128':
      return toSignedLittleBuffer(x, 16);
    case 'int256':
      return toSignedLittleBuffer(x, 32);
    case 'double':
      {
        const d = Buffer.alloc(8);
        d.writeDoubleLE(x, 0);
        return d;
      }
    case 'string':
      return serializeBytes(x);
    case 'Bool':
      return x ? Buffer.from('b5757299', 'hex') : Buffer.from('379779bc', 'hex');
    case 'true':
      return Buffer.alloc(0);
    case 'bytes':
      return serializeBytes(x);
    case 'date':
      return serializeDate(x);
    default:
      return x.getBytes();
  }
}

/*
CONTEST
async function getInputFromResolve(utils, client, peer, peerType) {
    switch (peerType) {
        case 'InputPeer':
            return utils.getInputPeer(await client.getInputEntity(peer))
        case 'InputChannel':
            return utils.getInputChannel(await client.getInputEntity(peer))
        case 'InputUser':
            return utils.getInputUser(await client.getInputEntity(peer))
        case 'InputDialogPeer':
            return await client._getInputDialog(peer)
        case 'InputNotifyPeer':
            return await client._getInputNotify(peer)
        case 'InputMedia':
            return utils.getInputMedia(peer)
        case 'InputPhoto':
            return utils.getInputPhoto(peer)
        case 'InputMessage':
            return utils.getInputMessage(peer)
        case 'InputDocument':
            return utils.getInputDocument(peer)
        case 'InputChatPhoto':
            return utils.getInputChatPhoto(peer)
        case 'chatId,int' :
            return await client.getPeerId(peer, false)
        default:
            throw new Error('unsupported peer type : ' + peerType)
    }
}
*/
function getArgFromReader(reader, arg) {
  if (arg.isVector) {
    if (arg.useVectorId) {
      reader.readInt();
    }
    const temp = [];
    const len = reader.readInt();
    arg.isVector = false;
    for (let i = 0; i < len; i++) {
      temp.push(getArgFromReader(reader, arg));
    }
    arg.isVector = true;
    return temp;
  } else if (arg.flagIndicator) {
    return reader.readInt();
  } else {
    switch (arg.type) {
      case 'int':
        return reader.readInt();
      case 'long':
        return reader.readLong();
      case 'int128':
        return reader.readLargeInt(128);
      case 'int256':
        return reader.readLargeInt(256);
      case 'double':
        return reader.readDouble();
      case 'string':
        return reader.tgReadString();
      case 'Bool':
        return reader.tgReadBool();
      case 'true':
        return true;
      case 'bytes':
        return reader.tgReadBytes();
      case 'date':
        return reader.tgReadDate();
      default:
        if (!arg.skipConstructorId) {
          return reader.tgReadObject();
        } else {
          throw new Error(`Unknown type ${arg}`);
        }
    }
  }
}
function createClasses(classesType, params) {
  const classes = {};
  for (const classParams of params) {
    const {
      name,
      constructorId,
      subclassOfId,
      argsConfig,
      namespace,
      result
    } = classParams;
    const fullName = [namespace, name].join('.').replace(/^\./, '');
    class VirtualClass {
      constructor(args) {
        _defineProperty(this, "CONSTRUCTOR_ID", constructorId);
        _defineProperty(this, "SUBCLASS_OF_ID", subclassOfId);
        _defineProperty(this, "className", fullName);
        _defineProperty(this, "classType", classesType);
        args = args || {};
        Object.keys(args).forEach(argName => {
          this[argName] = args[argName];
        });
      }
      static fromReader(reader) {
        const args = {};
        for (const argName in argsConfig) {
          if (argsConfig.hasOwnProperty(argName)) {
            const arg = argsConfig[argName];
            if (arg.isFlag) {
              const flagGroupSuffix = arg.flagGroup > 1 ? arg.flagGroup : '';
              const flagValue = args[`flags${flagGroupSuffix}`] & 1 << arg.flagIndex;
              if (arg.type === 'true') {
                args[argName] = Boolean(flagValue);
                continue;
              }
              args[argName] = flagValue ? getArgFromReader(reader, arg) : undefined;
            } else {
              args[argName] = getArgFromReader(reader, arg);
            }
          }
        }
        return new VirtualClass(args);
      }
      getBytes() {
        // The next is pseudo-code:
        const idForBytes = this.CONSTRUCTOR_ID;
        const c = Buffer.alloc(4);
        c.writeUInt32LE(idForBytes, 0);
        const buffers = [c];
        for (const arg in argsConfig) {
          if (argsConfig.hasOwnProperty(arg)) {
            if (argsConfig[arg].isFlag) {
              if (this[arg] === false && argsConfig[arg].type === 'true' || this[arg] === undefined) {
                continue;
              }
            }
            if (argsConfig[arg].isVector) {
              if (argsConfig[arg].useVectorId) {
                buffers.push(Buffer.from('15c4b51c', 'hex'));
              }
              const l = Buffer.alloc(4);
              l.writeInt32LE(this[arg].length, 0);
              buffers.push(l, Buffer.concat(this[arg].map(x => argToBytes(x, argsConfig[arg].type))));
            } else if (argsConfig[arg].flagIndicator) {
              if (!Object.values(argsConfig).some(f => f.isFlag)) {
                buffers.push(Buffer.alloc(4));
              } else {
                let flagCalculate = 0;
                for (const f in argsConfig) {
                  if (argsConfig[f].isFlag) {
                    if (this[f] === false && argsConfig[f].type === 'true' || this[f] === undefined) {
                      flagCalculate |= 0;
                    } else {
                      flagCalculate |= 1 << argsConfig[f].flagIndex;
                    }
                  }
                }
                const f = Buffer.alloc(4);
                f.writeUInt32LE(flagCalculate, 0);
                buffers.push(f);
              }
            } else {
              buffers.push(argToBytes(this[arg], argsConfig[arg].type));
              if (this[arg] && typeof this[arg].getBytes === 'function') {
                let boxed = argsConfig[arg].type.charAt(argsConfig[arg].type.indexOf('.') + 1);
                boxed = boxed === boxed.toUpperCase();
                if (!boxed) {
                  buffers.shift();
                }
              }
            }
          }
        }
        return Buffer.concat(buffers);
      }
      readResult(reader) {
        if (classesType !== 'request') {
          throw new Error('`readResult()` called for non-request instance');
        }
        const m = result.match(/Vector<(int|long)>/);
        if (m) {
          reader.readInt();
          const temp = [];
          const len = reader.readInt();
          if (m[1] === 'int') {
            for (let i = 0; i < len; i++) {
              temp.push(reader.readInt());
            }
          } else {
            for (let i = 0; i < len; i++) {
              temp.push(reader.readLong());
            }
          }
          return temp;
        } else {
          return reader.tgReadObject();
        }
      }

      /* CONTEST
      async resolve(client, utils) {
           if (classesType !== 'request') {
              throw new Error('`resolve()` called for non-request instance')
          }
           for (const arg in argsConfig) {
              if (argsConfig.hasOwnProperty(arg)) {
                  if (!AUTO_CASTS.has(argsConfig[arg].type)) {
                      if (!NAMED_AUTO_CASTS.has(`${argsConfig[arg].name},${argsConfig[arg].type}`)) {
                          continue
                      }
                  }
                  if (argsConfig[arg].isFlag) {
                      if (!this[arg]) {
                          continue
                      }
                  }
                  if (argsConfig[arg].isVector) {
                      const temp = []
                      for (const x of this[arg]) {
                          temp.push(await getInputFromResolve(utils, client, x, argsConfig[arg].type))
                      }
                      this[arg] = temp
                  } else {
                      this[arg] = await getInputFromResolve(utils, client, this[arg], argsConfig[arg].type)
                  }
              }
          }
      } */
    }
    _defineProperty(VirtualClass, "CONSTRUCTOR_ID", constructorId);
    _defineProperty(VirtualClass, "SUBCLASS_OF_ID", subclassOfId);
    _defineProperty(VirtualClass, "className", fullName);
    _defineProperty(VirtualClass, "classType", classesType);
    if (namespace) {
      if (!classes[namespace]) {
        classes[namespace] = {};
      }
      classes[namespace][name] = VirtualClass;
    } else {
      classes[name] = VirtualClass;
    }
  }
  return classes;
}
module.exports = buildApiFromTlSchema();

/***/ }),

/***/ "./src/lib/gramjs/tl/apiTl.js":
/*!************************************!*\
  !*** ./src/lib/gramjs/tl/apiTl.js ***!
  \************************************/
/***/ ((module) => {

module.exports = `boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
true#3fedd339 = True;
vector#1cb5c415 {t:Type} # [ t ] = Vector t;
error#c4b9f9bb code:int text:string = Error;
null#56730bcc = Null;
inputPeerEmpty#7f3b18ea = InputPeer;
inputPeerSelf#7da07ec9 = InputPeer;
inputPeerChat#35a95cb9 chat_id:long = InputPeer;
inputPeerUser#dde8a54c user_id:long access_hash:long = InputPeer;
inputPeerChannel#27bcbbfc channel_id:long access_hash:long = InputPeer;
inputPeerUserFromMessage#a87b0a1c peer:InputPeer msg_id:int user_id:long = InputPeer;
inputPeerChannelFromMessage#bd2a0840 peer:InputPeer msg_id:int channel_id:long = InputPeer;
inputUserEmpty#b98886cf = InputUser;
inputUserSelf#f7c1b13f = InputUser;
inputUser#f21158c6 user_id:long access_hash:long = InputUser;
inputUserFromMessage#1da448e2 peer:InputPeer msg_id:int user_id:long = InputUser;
inputPhoneContact#f392b7f4 client_id:long phone:string first_name:string last_name:string = InputContact;
inputFile#f52ff27f id:long parts:int name:string md5_checksum:string = InputFile;
inputFileBig#fa4f0bb5 id:long parts:int name:string = InputFile;
inputMediaEmpty#9664f57f = InputMedia;
inputMediaUploadedPhoto#1e287d04 flags:# spoiler:flags.2?true file:InputFile stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int = InputMedia;
inputMediaPhoto#b3ba0635 flags:# spoiler:flags.1?true id:InputPhoto ttl_seconds:flags.0?int = InputMedia;
inputMediaGeoPoint#f9c44144 geo_point:InputGeoPoint = InputMedia;
inputMediaContact#f8ab7dfb phone_number:string first_name:string last_name:string vcard:string = InputMedia;
inputMediaUploadedDocument#5b38c6c1 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int = InputMedia;
inputMediaDocument#33473058 flags:# spoiler:flags.2?true id:InputDocument ttl_seconds:flags.0?int query:flags.1?string = InputMedia;
inputMediaVenue#c13d1c11 geo_point:InputGeoPoint title:string address:string provider:string venue_id:string venue_type:string = InputMedia;
inputMediaPhotoExternal#e5bbfe1a flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int = InputMedia;
inputMediaDocumentExternal#fb52dc99 flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int = InputMedia;
inputMediaGame#d33f43f3 id:InputGame = InputMedia;
inputMediaInvoice#405fef0d flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:flags.3?string provider_data:DataJSON start_param:flags.1?string extended_media:flags.2?InputMedia = InputMedia;
inputMediaGeoLive#971fa843 flags:# stopped:flags.0?true geo_point:InputGeoPoint heading:flags.2?int period:flags.1?int proximity_notification_radius:flags.3?int = InputMedia;
inputMediaPoll#f94e5f1 flags:# poll:Poll correct_answers:flags.0?Vector<bytes> solution:flags.1?string solution_entities:flags.1?Vector<MessageEntity> = InputMedia;
inputMediaDice#e66fbf7b emoticon:string = InputMedia;
inputMediaStory#89fdd778 peer:InputPeer id:int = InputMedia;
inputMediaWebPage#c21b8849 flags:# force_large_media:flags.0?true force_small_media:flags.1?true optional:flags.2?true url:string = InputMedia;
inputMediaPaidMedia#aa661fc3 stars_amount:long extended_media:Vector<InputMedia> = InputMedia;
inputChatPhotoEmpty#1ca48f57 = InputChatPhoto;
inputChatUploadedPhoto#bdcdaec0 flags:# file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.3?VideoSize = InputChatPhoto;
inputChatPhoto#8953ad37 id:InputPhoto = InputChatPhoto;
inputGeoPointEmpty#e4c123d6 = InputGeoPoint;
inputGeoPoint#48222faf flags:# lat:double long:double accuracy_radius:flags.0?int = InputGeoPoint;
inputPhotoEmpty#1cd7bf0d = InputPhoto;
inputPhoto#3bb3b94a id:long access_hash:long file_reference:bytes = InputPhoto;
inputFileLocation#dfdaabe1 volume_id:long local_id:int secret:long file_reference:bytes = InputFileLocation;
inputEncryptedFileLocation#f5235d55 id:long access_hash:long = InputFileLocation;
inputDocumentFileLocation#bad07584 id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
inputSecureFileLocation#cbc7ee28 id:long access_hash:long = InputFileLocation;
inputTakeoutFileLocation#29be5899 = InputFileLocation;
inputPhotoFileLocation#40181ffe id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
inputPhotoLegacyFileLocation#d83466f3 id:long access_hash:long file_reference:bytes volume_id:long local_id:int secret:long = InputFileLocation;
inputPeerPhotoFileLocation#37257e99 flags:# big:flags.0?true peer:InputPeer photo_id:long = InputFileLocation;
inputStickerSetThumb#9d84f3db stickerset:InputStickerSet thumb_version:int = InputFileLocation;
inputGroupCallStream#598a92a flags:# call:InputGroupCall time_ms:long scale:int video_channel:flags.0?int video_quality:flags.0?int = InputFileLocation;
peerUser#59511722 user_id:long = Peer;
peerChat#36c6019a chat_id:long = Peer;
peerChannel#a2a5371e channel_id:long = Peer;
storage.fileUnknown#aa963b05 = storage.FileType;
storage.filePartial#40bc6f52 = storage.FileType;
storage.fileJpeg#7efe0e = storage.FileType;
storage.fileGif#cae1aadf = storage.FileType;
storage.filePng#a4f63c0 = storage.FileType;
storage.filePdf#ae1e508d = storage.FileType;
storage.fileMp3#528a0677 = storage.FileType;
storage.fileMov#4b09ebbc = storage.FileType;
storage.fileMp4#b3cea0e4 = storage.FileType;
storage.fileWebp#1081464c = storage.FileType;
userEmpty#d3bc4b7a id:long = User;
user#215c4438 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?int color:flags2.8?PeerColor profile_color:flags2.9?PeerColor = User;
userProfilePhotoEmpty#4f11bae1 = UserProfilePhoto;
userProfilePhoto#82d1f706 flags:# has_video:flags.0?true personal:flags.2?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = UserProfilePhoto;
userStatusEmpty#9d05049 = UserStatus;
userStatusOnline#edb93949 expires:int = UserStatus;
userStatusOffline#8c703f was_online:int = UserStatus;
userStatusRecently#7b197dc8 flags:# by_me:flags.0?true = UserStatus;
userStatusLastWeek#541a1d1a flags:# by_me:flags.0?true = UserStatus;
userStatusLastMonth#65899777 flags:# by_me:flags.0?true = UserStatus;
chatEmpty#29562865 id:long = Chat;
chat#41cbf256 flags:# creator:flags.0?true left:flags.2?true deactivated:flags.5?true call_active:flags.23?true call_not_empty:flags.24?true noforwards:flags.25?true id:long title:string photo:ChatPhoto participants_count:int date:int version:int migrated_to:flags.6?InputChannel admin_rights:flags.14?ChatAdminRights default_banned_rights:flags.18?ChatBannedRights = Chat;
chatForbidden#6592a1a7 id:long title:string = Chat;
channel#aadfc8f flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?int color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int = Chat;
channelForbidden#17d493d5 flags:# broadcast:flags.5?true megagroup:flags.8?true id:long access_hash:long title:string until_date:flags.16?int = Chat;
chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;
channelFull#bbab348d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet = ChatFull;
chatParticipant#c02d4007 user_id:long inviter_id:long date:int = ChatParticipant;
chatParticipantCreator#e46bcee4 user_id:long = ChatParticipant;
chatParticipantAdmin#a0933f5b user_id:long inviter_id:long date:int = ChatParticipant;
chatParticipantsForbidden#8763d3e1 flags:# chat_id:long self_participant:flags.0?ChatParticipant = ChatParticipants;
chatParticipants#3cbc93f8 chat_id:long participants:Vector<ChatParticipant> version:int = ChatParticipants;
chatPhotoEmpty#37c1011c = ChatPhoto;
chatPhoto#1c6e1c11 flags:# has_video:flags.0?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = ChatPhoto;
messageEmpty#90a6ca84 flags:# id:int peer_id:flags.0?Peer = Message;
message#94345242 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck = Message;
messageService#2b085862 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?Peer peer_id:Peer reply_to:flags.3?MessageReplyHeader date:int action:MessageAction ttl_period:flags.25?int = Message;
messageMediaEmpty#3ded6320 = MessageMedia;
messageMediaPhoto#695150d7 flags:# spoiler:flags.3?true photo:flags.0?Photo ttl_seconds:flags.2?int = MessageMedia;
messageMediaGeo#56e0d474 geo:GeoPoint = MessageMedia;
messageMediaContact#70322949 phone_number:string first_name:string last_name:string vcard:string user_id:long = MessageMedia;
messageMediaUnsupported#9f84f49e = MessageMedia;
messageMediaDocument#4cf4d72d flags:# nopremium:flags.3?true spoiler:flags.4?true video:flags.6?true round:flags.7?true voice:flags.8?true document:flags.0?Document alt_document:flags.5?Document ttl_seconds:flags.2?int = MessageMedia;
messageMediaWebPage#ddf10c3b flags:# force_large_media:flags.0?true force_small_media:flags.1?true manual:flags.3?true safe:flags.4?true webpage:WebPage = MessageMedia;
messageMediaVenue#2ec0533f geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string = MessageMedia;
messageMediaGame#fdb19008 game:Game = MessageMedia;
messageMediaInvoice#f6a548d3 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument receipt_msg_id:flags.2?int currency:string total_amount:long start_param:string extended_media:flags.4?MessageExtendedMedia = MessageMedia;
messageMediaGeoLive#b940c666 flags:# geo:GeoPoint heading:flags.0?int period:int proximity_notification_radius:flags.1?int = MessageMedia;
messageMediaPoll#4bd6e798 poll:Poll results:PollResults = MessageMedia;
messageMediaDice#3f7ee58b value:int emoticon:string = MessageMedia;
messageMediaStory#68cb6283 flags:# via_mention:flags.1?true peer:Peer id:int story:flags.0?StoryItem = MessageMedia;
messageMediaGiveaway#daad85b0 flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.2?true channels:Vector<long> countries_iso2:flags.1?Vector<string> prize_description:flags.3?string quantity:int months:int until_date:int = MessageMedia;
messageMediaGiveawayResults#c6991068 flags:# only_new_subscribers:flags.0?true refunded:flags.2?true channel_id:long additional_peers_count:flags.3?int launch_msg_id:int winners_count:int unclaimed_count:int winners:Vector<long> months:int prize_description:flags.1?string until_date:int = MessageMedia;
messageMediaPaidMedia#a8852491 stars_amount:long extended_media:Vector<MessageExtendedMedia> = MessageMedia;
messageActionEmpty#b6aef7b0 = MessageAction;
messageActionChatCreate#bd47cbad title:string users:Vector<long> = MessageAction;
messageActionChatEditTitle#b5a1ce5a title:string = MessageAction;
messageActionChatEditPhoto#7fcb13a8 photo:Photo = MessageAction;
messageActionChatDeletePhoto#95e3fbef = MessageAction;
messageActionChatAddUser#15cefd00 users:Vector<long> = MessageAction;
messageActionChatDeleteUser#a43f30cc user_id:long = MessageAction;
messageActionChatJoinedByLink#31224c3 inviter_id:long = MessageAction;
messageActionChannelCreate#95d2ac92 title:string = MessageAction;
messageActionChatMigrateTo#e1037f92 channel_id:long = MessageAction;
messageActionChannelMigrateFrom#ea3948e9 title:string chat_id:long = MessageAction;
messageActionPinMessage#94bd38ed = MessageAction;
messageActionHistoryClear#9fbab604 = MessageAction;
messageActionGameScore#92a72876 game_id:long score:int = MessageAction;
messageActionPaymentSentMe#8f31b327 flags:# recurring_init:flags.2?true recurring_used:flags.3?true currency:string total_amount:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string charge:PaymentCharge = MessageAction;
messageActionPaymentSent#96163f56 flags:# recurring_init:flags.2?true recurring_used:flags.3?true currency:string total_amount:long invoice_slug:flags.0?string = MessageAction;
messageActionPhoneCall#80e11a7f flags:# video:flags.2?true call_id:long reason:flags.0?PhoneCallDiscardReason duration:flags.1?int = MessageAction;
messageActionScreenshotTaken#4792929b = MessageAction;
messageActionCustomAction#fae69f56 message:string = MessageAction;
messageActionBotAllowed#c516d679 flags:# attach_menu:flags.1?true from_request:flags.3?true domain:flags.0?string app:flags.2?BotApp = MessageAction;
messageActionSecureValuesSentMe#1b287353 values:Vector<SecureValue> credentials:SecureCredentialsEncrypted = MessageAction;
messageActionSecureValuesSent#d95c6154 types:Vector<SecureValueType> = MessageAction;
messageActionContactSignUp#f3f25f76 = MessageAction;
messageActionGeoProximityReached#98e0d697 from_id:Peer to_id:Peer distance:int = MessageAction;
messageActionGroupCall#7a0d7f42 flags:# call:InputGroupCall duration:flags.0?int = MessageAction;
messageActionInviteToGroupCall#502f92f7 call:InputGroupCall users:Vector<long> = MessageAction;
messageActionSetMessagesTTL#3c134d7b flags:# period:int auto_setting_from:flags.0?long = MessageAction;
messageActionGroupCallScheduled#b3a07661 call:InputGroupCall schedule_date:int = MessageAction;
messageActionSetChatTheme#aa786345 emoticon:string = MessageAction;
messageActionChatJoinedByRequest#ebbca3cb = MessageAction;
messageActionWebViewDataSentMe#47dd8079 text:string data:string = MessageAction;
messageActionWebViewDataSent#b4c38cb5 text:string = MessageAction;
messageActionGiftPremium#c83d6aec flags:# currency:string amount:long months:int crypto_currency:flags.0?string crypto_amount:flags.0?long = MessageAction;
messageActionTopicCreate#d999256 flags:# title:string icon_color:int icon_emoji_id:flags.0?long = MessageAction;
messageActionTopicEdit#c0944820 flags:# title:flags.0?string icon_emoji_id:flags.1?long closed:flags.2?Bool hidden:flags.3?Bool = MessageAction;
messageActionSuggestProfilePhoto#57de635e photo:Photo = MessageAction;
messageActionRequestedPeer#31518e9b button_id:int peers:Vector<Peer> = MessageAction;
messageActionSetChatWallPaper#5060a3f4 flags:# same:flags.0?true for_both:flags.1?true wallpaper:WallPaper = MessageAction;
messageActionGiftCode#678c2e09 flags:# via_giveaway:flags.0?true unclaimed:flags.2?true boost_peer:flags.1?Peer months:int slug:string currency:flags.2?string amount:flags.2?long crypto_currency:flags.3?string crypto_amount:flags.3?long = MessageAction;
messageActionGiveawayLaunch#332ba9ed = MessageAction;
messageActionGiveawayResults#2a9fadc5 winners_count:int unclaimed_count:int = MessageAction;
messageActionBoostApply#cc02aa6d boosts:int = MessageAction;
messageActionRequestedPeerSentMe#93b31848 button_id:int peers:Vector<RequestedPeer> = MessageAction;
dialog#d58a08c6 flags:# pinned:flags.2?true unread_mark:flags.3?true view_forum_as_messages:flags.6?true peer:Peer top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int notify_settings:PeerNotifySettings pts:flags.0?int draft:flags.1?DraftMessage folder_id:flags.4?int ttl_period:flags.5?int = Dialog;
dialogFolder#71bd134c flags:# pinned:flags.2?true folder:Folder peer:Peer top_message:int unread_muted_peers_count:int unread_unmuted_peers_count:int unread_muted_messages_count:int unread_unmuted_messages_count:int = Dialog;
photoEmpty#2331b22d id:long = Photo;
photo#fb197a65 flags:# has_stickers:flags.0?true id:long access_hash:long file_reference:bytes date:int sizes:Vector<PhotoSize> video_sizes:flags.1?Vector<VideoSize> dc_id:int = Photo;
photoSizeEmpty#e17e23c type:string = PhotoSize;
photoSize#75c78e60 type:string w:int h:int size:int = PhotoSize;
photoCachedSize#21e1ad6 type:string w:int h:int bytes:bytes = PhotoSize;
photoStrippedSize#e0b0bc2e type:string bytes:bytes = PhotoSize;
photoSizeProgressive#fa3efb95 type:string w:int h:int sizes:Vector<int> = PhotoSize;
photoPathSize#d8214d41 type:string bytes:bytes = PhotoSize;
geoPointEmpty#1117dd5f = GeoPoint;
geoPoint#b2a2f663 flags:# long:double lat:double access_hash:long accuracy_radius:flags.0?int = GeoPoint;
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
auth.exportedAuthorization#b434e2b8 id:long bytes:bytes = auth.ExportedAuthorization;
inputNotifyPeer#b8bc5b0c peer:InputPeer = InputNotifyPeer;
inputNotifyUsers#193b4417 = InputNotifyPeer;
inputNotifyChats#4a95e84e = InputNotifyPeer;
inputNotifyBroadcasts#b1db7c7e = InputNotifyPeer;
inputNotifyForumTopic#5c467992 peer:InputPeer top_msg_id:int = InputNotifyPeer;
inputPeerNotifySettings#cacb6ae2 flags:# show_previews:flags.0?Bool silent:flags.1?Bool mute_until:flags.2?int sound:flags.3?NotificationSound stories_muted:flags.6?Bool stories_hide_sender:flags.7?Bool stories_sound:flags.8?NotificationSound = InputPeerNotifySettings;
peerNotifySettings#99622c0c flags:# show_previews:flags.0?Bool silent:flags.1?Bool mute_until:flags.2?int ios_sound:flags.3?NotificationSound android_sound:flags.4?NotificationSound other_sound:flags.5?NotificationSound stories_muted:flags.6?Bool stories_hide_sender:flags.7?Bool stories_ios_sound:flags.8?NotificationSound stories_android_sound:flags.9?NotificationSound stories_other_sound:flags.10?NotificationSound = PeerNotifySettings;
peerSettings#acd66c5e flags:# report_spam:flags.0?true add_contact:flags.1?true block_contact:flags.2?true share_contact:flags.3?true need_contacts_exception:flags.4?true report_geo:flags.5?true autoarchived:flags.7?true invite_members:flags.8?true request_chat_broadcast:flags.10?true business_bot_paused:flags.11?true business_bot_can_reply:flags.12?true geo_distance:flags.6?int request_chat_title:flags.9?string request_chat_date:flags.9?int business_bot_id:flags.13?long business_bot_manage_url:flags.13?string = PeerSettings;
wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;
wallPaperNoFile#e0804116 id:long flags:# default:flags.1?true dark:flags.4?true settings:flags.2?WallPaperSettings = WallPaper;
inputReportReasonSpam#58dbcab8 = ReportReason;
inputReportReasonViolence#1e22c78d = ReportReason;
inputReportReasonPornography#2e59d922 = ReportReason;
inputReportReasonChildAbuse#adf44ee3 = ReportReason;
inputReportReasonOther#c1e4a2b1 = ReportReason;
inputReportReasonCopyright#9b89f93a = ReportReason;
inputReportReasonGeoIrrelevant#dbd4feed = ReportReason;
inputReportReasonFake#f5ddd6e7 = ReportReason;
inputReportReasonIllegalDrugs#a8eb2be = ReportReason;
inputReportReasonPersonalDetails#9ec7863d = ReportReason;
userFull#cc997720 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme_emoticon:flags.15?string private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights premium_gifts:flags.19?Vector<PremiumGiftOption> wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int = UserFull;
contact#145ade0b user_id:long mutual:Bool = Contact;
importedContact#c13e3c50 user_id:long client_id:long = ImportedContact;
contactStatus#16d9703b user_id:long status:UserStatus = ContactStatus;
contacts.contactsNotModified#b74ba9d2 = contacts.Contacts;
contacts.contacts#eae87e42 contacts:Vector<Contact> saved_count:int users:Vector<User> = contacts.Contacts;
contacts.importedContacts#77d01c3b imported:Vector<ImportedContact> popular_invites:Vector<PopularContact> retry_contacts:Vector<long> users:Vector<User> = contacts.ImportedContacts;
contacts.blocked#ade1591 blocked:Vector<PeerBlocked> chats:Vector<Chat> users:Vector<User> = contacts.Blocked;
contacts.blockedSlice#e1664194 count:int blocked:Vector<PeerBlocked> chats:Vector<Chat> users:Vector<User> = contacts.Blocked;
messages.dialogs#15ba6c40 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;
messages.dialogsSlice#71e094f3 count:int dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;
messages.dialogsNotModified#f0e3e596 count:int = messages.Dialogs;
messages.messages#8c718e87 messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#3a54685e flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;
messages.chatFull#e5d7d19c full_chat:ChatFull chats:Vector<Chat> users:Vector<User> = messages.ChatFull;
messages.affectedHistory#b45c69d1 pts:int pts_count:int offset:int = messages.AffectedHistory;
inputMessagesFilterEmpty#57e2f66c = MessagesFilter;
inputMessagesFilterPhotos#9609a51c = MessagesFilter;
inputMessagesFilterVideo#9fc00e65 = MessagesFilter;
inputMessagesFilterPhotoVideo#56e9f0e4 = MessagesFilter;
inputMessagesFilterDocument#9eddf188 = MessagesFilter;
inputMessagesFilterUrl#7ef0dd87 = MessagesFilter;
inputMessagesFilterGif#ffc86587 = MessagesFilter;
inputMessagesFilterVoice#50f5c392 = MessagesFilter;
inputMessagesFilterMusic#3751b49e = MessagesFilter;
inputMessagesFilterChatPhotos#3a20ecb8 = MessagesFilter;
inputMessagesFilterPhoneCalls#80c99768 flags:# missed:flags.0?true = MessagesFilter;
inputMessagesFilterRoundVoice#7a7c17a4 = MessagesFilter;
inputMessagesFilterRoundVideo#b549da53 = MessagesFilter;
inputMessagesFilterMyMentions#c1f8e69a = MessagesFilter;
inputMessagesFilterGeo#e7026d0d = MessagesFilter;
inputMessagesFilterContacts#e062db83 = MessagesFilter;
inputMessagesFilterPinned#1bb00451 = MessagesFilter;
updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;
updateMessageID#4e90bfd6 id:int random_id:long = Update;
updateDeleteMessages#a20db0e5 messages:Vector<int> pts:int pts_count:int = Update;
updateUserTyping#c01e857f user_id:long action:SendMessageAction = Update;
updateChatUserTyping#83487af0 chat_id:long from_id:Peer action:SendMessageAction = Update;
updateChatParticipants#7761198 participants:ChatParticipants = Update;
updateUserStatus#e5bdf8de user_id:long status:UserStatus = Update;
updateUserName#a7848924 user_id:long first_name:string last_name:string usernames:Vector<Username> = Update;
updateNewAuthorization#8951abef flags:# unconfirmed:flags.0?true hash:long date:flags.0?int device:flags.0?string location:flags.0?string = Update;
updateNewEncryptedMessage#12bcbd9a message:EncryptedMessage qts:int = Update;
updateEncryptedChatTyping#1710f156 chat_id:int = Update;
updateEncryption#b4a2e88d chat:EncryptedChat date:int = Update;
updateEncryptedMessagesRead#38fe25b7 chat_id:int max_date:int date:int = Update;
updateChatParticipantAdd#3dda5451 chat_id:long user_id:long inviter_id:long date:int version:int = Update;
updateChatParticipantDelete#e32f3d77 chat_id:long user_id:long version:int = Update;
updateDcOptions#8e5e9873 dc_options:Vector<DcOption> = Update;
updateNotifySettings#bec268ef peer:NotifyPeer notify_settings:PeerNotifySettings = Update;
updateServiceNotification#ebe46819 flags:# popup:flags.0?true invert_media:flags.2?true inbox_date:flags.1?int type:string message:string media:MessageMedia entities:Vector<MessageEntity> = Update;
updatePrivacy#ee3b272a key:PrivacyKey rules:Vector<PrivacyRule> = Update;
updateUserPhone#5492a13 user_id:long phone:string = Update;
updateReadHistoryInbox#9c974fdf flags:# folder_id:flags.0?int peer:Peer max_id:int still_unread_count:int pts:int pts_count:int = Update;
updateReadHistoryOutbox#2f2f21bf peer:Peer max_id:int pts:int pts_count:int = Update;
updateWebPage#7f891213 webpage:WebPage pts:int pts_count:int = Update;
updateReadMessagesContents#f8227181 flags:# messages:Vector<int> pts:int pts_count:int date:flags.0?int = Update;
updateChannelTooLong#108d941f flags:# channel_id:long pts:flags.0?int = Update;
updateChannel#635b4c09 channel_id:long = Update;
updateNewChannelMessage#62ba04d9 message:Message pts:int pts_count:int = Update;
updateReadChannelInbox#922e6e10 flags:# folder_id:flags.0?int channel_id:long max_id:int still_unread_count:int pts:int = Update;
updateDeleteChannelMessages#c32d5b12 channel_id:long messages:Vector<int> pts:int pts_count:int = Update;
updateChannelMessageViews#f226ac08 channel_id:long id:int views:int = Update;
updateChatParticipantAdmin#d7ca61a2 chat_id:long user_id:long is_admin:Bool version:int = Update;
updateNewStickerSet#688a30aa stickerset:messages.StickerSet = Update;
updateStickerSetsOrder#bb2d201 flags:# masks:flags.0?true emojis:flags.1?true order:Vector<long> = Update;
updateStickerSets#31c24808 flags:# masks:flags.0?true emojis:flags.1?true = Update;
updateSavedGifs#9375341e = Update;
updateBotInlineQuery#496f379c flags:# query_id:long user_id:long query:string geo:flags.0?GeoPoint peer_type:flags.1?InlineQueryPeerType offset:string = Update;
updateBotInlineSend#12f12a07 flags:# user_id:long query:string geo:flags.0?GeoPoint id:string msg_id:flags.1?InputBotInlineMessageID = Update;
updateEditChannelMessage#1b3f4df7 message:Message pts:int pts_count:int = Update;
updateBotCallbackQuery#b9cfc48d flags:# query_id:long user_id:long peer:Peer msg_id:int chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;
updateEditMessage#e40370a3 message:Message pts:int pts_count:int = Update;
updateInlineBotCallbackQuery#691e9052 flags:# query_id:long user_id:long msg_id:InputBotInlineMessageID chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;
updateReadChannelOutbox#b75f99a9 channel_id:long max_id:int = Update;
updateDraftMessage#1b49ec6d flags:# peer:Peer top_msg_id:flags.0?int draft:DraftMessage = Update;
updateReadFeaturedStickers#571d2742 = Update;
updateRecentStickers#9a422c20 = Update;
updateConfig#a229dd06 = Update;
updatePtsChanged#3354678f = Update;
updateChannelWebPage#2f2ba99f channel_id:long webpage:WebPage pts:int pts_count:int = Update;
updateDialogPinned#6e6fe51c flags:# pinned:flags.0?true folder_id:flags.1?int peer:DialogPeer = Update;
updatePinnedDialogs#fa0f3ca2 flags:# folder_id:flags.1?int order:flags.0?Vector<DialogPeer> = Update;
updateBotWebhookJSON#8317c0c3 data:DataJSON = Update;
updateBotWebhookJSONQuery#9b9240a6 query_id:long data:DataJSON timeout:int = Update;
updateBotShippingQuery#b5aefd7d query_id:long user_id:long payload:bytes shipping_address:PostAddress = Update;
updateBotPrecheckoutQuery#8caa9a96 flags:# query_id:long user_id:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string currency:string total_amount:long = Update;
updatePhoneCall#ab0f6b1e phone_call:PhoneCall = Update;
updateLangPackTooLong#46560264 lang_code:string = Update;
updateLangPack#56022f4d difference:LangPackDifference = Update;
updateFavedStickers#e511996d = Update;
updateChannelReadMessagesContents#ea29055d flags:# channel_id:long top_msg_id:flags.0?int messages:Vector<int> = Update;
updateContactsReset#7084a7be = Update;
updateChannelAvailableMessages#b23fc698 channel_id:long available_min_id:int = Update;
updateDialogUnreadMark#e16459c3 flags:# unread:flags.0?true peer:DialogPeer = Update;
updateMessagePoll#aca1657b flags:# poll_id:long poll:flags.0?Poll results:PollResults = Update;
updateChatDefaultBannedRights#54c01850 peer:Peer default_banned_rights:ChatBannedRights version:int = Update;
updateFolderPeers#19360dc0 folder_peers:Vector<FolderPeer> pts:int pts_count:int = Update;
updatePeerSettings#6a7e7366 peer:Peer settings:PeerSettings = Update;
updatePeerLocated#b4afcfb0 peers:Vector<PeerLocated> = Update;
updateNewScheduledMessage#39a51dfb message:Message = Update;
updateDeleteScheduledMessages#90866cee peer:Peer messages:Vector<int> = Update;
updateTheme#8216fba3 theme:Theme = Update;
updateGeoLiveViewed#871fb939 peer:Peer msg_id:int = Update;
updateLoginToken#564fe691 = Update;
updateMessagePollVote#24f40e77 poll_id:long peer:Peer options:Vector<bytes> qts:int = Update;
updateDialogFilter#26ffde7d flags:# id:int filter:flags.0?DialogFilter = Update;
updateDialogFilterOrder#a5d72105 order:Vector<int> = Update;
updateDialogFilters#3504914f = Update;
updatePhoneCallSignalingData#2661bf09 phone_call_id:long data:bytes = Update;
updateChannelMessageForwards#d29a27f4 channel_id:long id:int forwards:int = Update;
updateReadChannelDiscussionInbox#d6b19546 flags:# channel_id:long top_msg_id:int read_max_id:int broadcast_id:flags.0?long broadcast_post:flags.0?int = Update;
updateReadChannelDiscussionOutbox#695c9e7c channel_id:long top_msg_id:int read_max_id:int = Update;
updatePeerBlocked#ebe07752 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true peer_id:Peer = Update;
updateChannelUserTyping#8c88c923 flags:# channel_id:long top_msg_id:flags.0?int from_id:Peer action:SendMessageAction = Update;
updatePinnedMessages#ed85eab5 flags:# pinned:flags.0?true peer:Peer messages:Vector<int> pts:int pts_count:int = Update;
updatePinnedChannelMessages#5bb98608 flags:# pinned:flags.0?true channel_id:long messages:Vector<int> pts:int pts_count:int = Update;
updateChat#f89a6a4e chat_id:long = Update;
updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;
updateGroupCall#14b24500 chat_id:long call:GroupCall = Update;
updatePeerHistoryTTL#bb9bb9a5 flags:# peer:Peer ttl_period:flags.0?int = Update;
updateChatParticipant#d087663a flags:# chat_id:long date:int actor_id:long user_id:long prev_participant:flags.0?ChatParticipant new_participant:flags.1?ChatParticipant invite:flags.2?ExportedChatInvite qts:int = Update;
updateChannelParticipant#985d3abb flags:# via_chatlist:flags.3?true channel_id:long date:int actor_id:long user_id:long prev_participant:flags.0?ChannelParticipant new_participant:flags.1?ChannelParticipant invite:flags.2?ExportedChatInvite qts:int = Update;
updateBotStopped#c4870a49 user_id:long date:int stopped:Bool qts:int = Update;
updateGroupCallConnection#b783982 flags:# presentation:flags.0?true params:DataJSON = Update;
updateBotCommands#4d712f2e peer:Peer bot_id:long commands:Vector<BotCommand> = Update;
updatePendingJoinRequests#7063c3db peer:Peer requests_pending:int recent_requesters:Vector<long> = Update;
updateBotChatInviteRequester#11dfa986 peer:Peer date:int user_id:long about:string invite:ExportedChatInvite qts:int = Update;
updateMessageReactions#5e1b3cb8 flags:# peer:Peer msg_id:int top_msg_id:flags.0?int reactions:MessageReactions = Update;
updateAttachMenuBots#17b7a20b = Update;
updateWebViewResultSent#1592b79d query_id:long = Update;
updateBotMenuButton#14b85813 bot_id:long button:BotMenuButton = Update;
updateSavedRingtones#74d8be99 = Update;
updateTranscribedAudio#84cd5a flags:# pending:flags.0?true peer:Peer msg_id:int transcription_id:long text:string = Update;
updateReadFeaturedEmojiStickers#fb4c496c = Update;
updateUserEmojiStatus#28373599 user_id:long emoji_status:EmojiStatus = Update;
updateRecentEmojiStatuses#30f443db = Update;
updateRecentReactions#6f7863f4 = Update;
updateMoveStickerSetToTop#86fccf85 flags:# masks:flags.0?true emojis:flags.1?true stickerset:long = Update;
updateMessageExtendedMedia#d5a41724 peer:Peer msg_id:int extended_media:Vector<MessageExtendedMedia> = Update;
updateChannelPinnedTopic#192efbe3 flags:# pinned:flags.0?true channel_id:long topic_id:int = Update;
updateChannelPinnedTopics#fe198602 flags:# channel_id:long order:flags.0?Vector<int> = Update;
updateUser#20529438 user_id:long = Update;
updateAutoSaveSettings#ec05b097 = Update;
updateStory#75b3b798 peer:Peer story:StoryItem = Update;
updateReadStories#f74e932b peer:Peer max_id:int = Update;
updateStoryID#1bf335b9 id:int random_id:long = Update;
updateStoriesStealthMode#2c084dc1 stealth_mode:StoriesStealthMode = Update;
updateSentStoryReaction#7d627683 peer:Peer story_id:int reaction:Reaction = Update;
updateBotChatBoost#904dd49c peer:Peer boost:Boost qts:int = Update;
updateChannelViewForumAsMessages#7b68920 channel_id:long enabled:Bool = Update;
updatePeerWallpaper#ae3f101d flags:# wallpaper_overridden:flags.1?true peer:Peer wallpaper:flags.0?WallPaper = Update;
updateBotMessageReaction#ac21d3ce peer:Peer msg_id:int date:int actor:Peer old_reactions:Vector<Reaction> new_reactions:Vector<Reaction> qts:int = Update;
updateBotMessageReactions#9cb7759 peer:Peer msg_id:int date:int reactions:Vector<ReactionCount> qts:int = Update;
updateSavedDialogPinned#aeaf9e74 flags:# pinned:flags.0?true peer:DialogPeer = Update;
updatePinnedSavedDialogs#686c85a6 flags:# order:flags.0?Vector<DialogPeer> = Update;
updateSavedReactionTags#39c67432 = Update;
updateSmsJob#f16269d4 job_id:string = Update;
updateQuickReplies#f9470ab2 quick_replies:Vector<QuickReply> = Update;
updateNewQuickReply#f53da717 quick_reply:QuickReply = Update;
updateDeleteQuickReply#53e6f1ec shortcut_id:int = Update;
updateQuickReplyMessage#3e050d0f message:Message = Update;
updateDeleteQuickReplyMessages#566fe7cd shortcut_id:int messages:Vector<int> = Update;
updateBotBusinessConnect#8ae5c97a connection:BotBusinessConnection qts:int = Update;
updateBotNewBusinessMessage#9ddb347c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;
updateBotEditBusinessMessage#7df587c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;
updateBotDeleteBusinessMessage#a02a982e connection_id:string peer:Peer messages:Vector<int> qts:int = Update;
updateNewStoryReaction#1824e40b story_id:int peer:Peer reaction:Reaction = Update;
updateBroadcastRevenueTransactions#dfd961f5 peer:Peer balances:BroadcastRevenueBalances = Update;
updateStarsBalance#fb85198 balance:long = Update;
updateBusinessBotCallbackQuery#1ea2fda7 flags:# query_id:long user_id:long connection_id:string message:Message reply_to_message:flags.2?Message chat_instance:long data:flags.0?bytes = Update;
updateStarsRevenueStatus#a584b019 peer:Peer status:StarsRevenueStatus = Update;
updates.state#a56c2a3e pts:int qts:int date:int seq:int unread_count:int = updates.State;
updates.differenceEmpty#5d75a138 date:int seq:int = updates.Difference;
updates.difference#f49ca0 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> state:updates.State = updates.Difference;
updates.differenceSlice#a8fb1981 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> intermediate_state:updates.State = updates.Difference;
updates.differenceTooLong#4afe8f6d pts:int = updates.Difference;
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
photos.photos#8dca6aa5 photos:Vector<Photo> users:Vector<User> = photos.Photos;
photos.photosSlice#15051f54 count:int photos:Vector<Photo> users:Vector<User> = photos.Photos;
photos.photo#20212ca8 photo:Photo users:Vector<User> = photos.Photo;
upload.file#96a18d5 type:storage.FileType mtime:int bytes:bytes = upload.File;
upload.fileCdnRedirect#f18cda44 dc_id:int file_token:bytes encryption_key:bytes encryption_iv:bytes file_hashes:Vector<FileHash> = upload.File;
dcOption#18b7a10d flags:# ipv6:flags.0?true media_only:flags.1?true tcpo_only:flags.2?true cdn:flags.3?true static:flags.4?true this_port_only:flags.5?true id:int ip_address:string port:int secret:flags.10?bytes = DcOption;
config#cc1a241e flags:# default_p2p_contacts:flags.3?true preload_featured_stickers:flags.4?true revoke_pm_inbox:flags.6?true blocked_mode:flags.8?true force_try_ipv6:flags.14?true date:int expires:int test_mode:Bool this_dc:int dc_options:Vector<DcOption> dc_txt_domain_name:string chat_size_max:int megagroup_size_max:int forwarded_count_max:int online_update_period_ms:int offline_blur_timeout_ms:int offline_idle_timeout_ms:int online_cloud_timeout_ms:int notify_cloud_delay_ms:int notify_default_delay_ms:int push_chat_period_ms:int push_chat_limit:int edit_time_limit:int revoke_time_limit:int revoke_pm_time_limit:int rating_e_decay:int stickers_recent_limit:int channels_read_media_period:int tmp_sessions:flags.0?int call_receive_timeout_ms:int call_ring_timeout_ms:int call_connect_timeout_ms:int call_packet_timeout_ms:int me_url_prefix:string autoupdate_url_prefix:flags.7?string gif_search_username:flags.9?string venue_search_username:flags.10?string img_search_username:flags.11?string static_maps_provider:flags.12?string caption_length_max:int message_length_max:int webfile_dc_id:int suggested_lang_code:flags.2?string lang_pack_version:flags.2?int base_lang_pack_version:flags.2?int reactions_default:flags.15?Reaction autologin_token:flags.16?string = Config;
nearestDc#8e1a1775 country:string this_dc:int nearest_dc:int = NearestDc;
help.appUpdate#ccbbce30 flags:# can_not_skip:flags.0?true id:int version:string text:string entities:Vector<MessageEntity> document:flags.1?Document url:flags.2?string sticker:flags.3?Document = help.AppUpdate;
help.noAppUpdate#c45a6536 = help.AppUpdate;
help.inviteText#18cb9f78 message:string = help.InviteText;
encryptedChatEmpty#ab7ec0a0 id:int = EncryptedChat;
encryptedChatWaiting#66b25953 id:int access_hash:long date:int admin_id:long participant_id:long = EncryptedChat;
encryptedChatRequested#48f1d94c flags:# folder_id:flags.0?int id:int access_hash:long date:int admin_id:long participant_id:long g_a:bytes = EncryptedChat;
encryptedChat#61f0d4c7 id:int access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long = EncryptedChat;
encryptedChatDiscarded#1e1c7c45 flags:# history_deleted:flags.0?true id:int = EncryptedChat;
inputEncryptedChat#f141b5e1 chat_id:int access_hash:long = InputEncryptedChat;
encryptedFileEmpty#c21f497e = EncryptedFile;
encryptedFile#a8008cd8 id:long access_hash:long size:long dc_id:int key_fingerprint:int = EncryptedFile;
inputEncryptedFileEmpty#1837c364 = InputEncryptedFile;
inputEncryptedFileUploaded#64bd0306 id:long parts:int md5_checksum:string key_fingerprint:int = InputEncryptedFile;
inputEncryptedFile#5a17b5e5 id:long access_hash:long = InputEncryptedFile;
inputEncryptedFileBigUploaded#2dc173c8 id:long parts:int key_fingerprint:int = InputEncryptedFile;
encryptedMessage#ed18c118 random_id:long chat_id:int date:int bytes:bytes file:EncryptedFile = EncryptedMessage;
encryptedMessageService#23734b06 random_id:long chat_id:int date:int bytes:bytes = EncryptedMessage;
messages.dhConfigNotModified#c0e24635 random:bytes = messages.DhConfig;
messages.dhConfig#2c221edd g:int p:bytes version:int random:bytes = messages.DhConfig;
messages.sentEncryptedMessage#560f8935 date:int = messages.SentEncryptedMessage;
messages.sentEncryptedFile#9493ff32 date:int file:EncryptedFile = messages.SentEncryptedMessage;
inputDocumentEmpty#72f0eaae = InputDocument;
inputDocument#1abfb575 id:long access_hash:long file_reference:bytes = InputDocument;
documentEmpty#36f8c871 id:long = Document;
document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
help.support#17c6b5f6 phone_number:string user:User = help.Support;
notifyPeer#9fd40bd8 peer:Peer = NotifyPeer;
notifyUsers#b4c83b4c = NotifyPeer;
notifyChats#c007cec3 = NotifyPeer;
notifyBroadcasts#d612e8ef = NotifyPeer;
notifyForumTopic#226e6308 peer:Peer top_msg_id:int = NotifyPeer;
sendMessageTypingAction#16bf744e = SendMessageAction;
sendMessageCancelAction#fd5ec8f5 = SendMessageAction;
sendMessageRecordVideoAction#a187d66f = SendMessageAction;
sendMessageUploadVideoAction#e9763aec progress:int = SendMessageAction;
sendMessageRecordAudioAction#d52f73f7 = SendMessageAction;
sendMessageUploadAudioAction#f351d7ab progress:int = SendMessageAction;
sendMessageUploadPhotoAction#d1d34a26 progress:int = SendMessageAction;
sendMessageUploadDocumentAction#aa0cd9e4 progress:int = SendMessageAction;
sendMessageGeoLocationAction#176f8ba1 = SendMessageAction;
sendMessageChooseContactAction#628cbc6f = SendMessageAction;
sendMessageGamePlayAction#dd6a8f48 = SendMessageAction;
sendMessageRecordRoundAction#88f27fbc = SendMessageAction;
sendMessageUploadRoundAction#243e1c66 progress:int = SendMessageAction;
speakingInGroupCallAction#d92c2285 = SendMessageAction;
sendMessageHistoryImportAction#dbda9246 progress:int = SendMessageAction;
sendMessageChooseStickerAction#b05ac6b1 = SendMessageAction;
sendMessageEmojiInteraction#25972bcb emoticon:string msg_id:int interaction:DataJSON = SendMessageAction;
sendMessageEmojiInteractionSeen#b665902e emoticon:string = SendMessageAction;
contacts.found#b3134d9d my_results:Vector<Peer> results:Vector<Peer> chats:Vector<Chat> users:Vector<User> = contacts.Found;
inputPrivacyKeyStatusTimestamp#4f96cb18 = InputPrivacyKey;
inputPrivacyKeyChatInvite#bdfb0426 = InputPrivacyKey;
inputPrivacyKeyPhoneCall#fabadc5f = InputPrivacyKey;
inputPrivacyKeyPhoneP2P#db9e70d2 = InputPrivacyKey;
inputPrivacyKeyForwards#a4dd4c08 = InputPrivacyKey;
inputPrivacyKeyProfilePhoto#5719bacc = InputPrivacyKey;
inputPrivacyKeyPhoneNumber#352dafa = InputPrivacyKey;
inputPrivacyKeyAddedByPhone#d1219bdd = InputPrivacyKey;
inputPrivacyKeyVoiceMessages#aee69d68 = InputPrivacyKey;
inputPrivacyKeyAbout#3823cc40 = InputPrivacyKey;
inputPrivacyKeyBirthday#d65a11cc = InputPrivacyKey;
privacyKeyStatusTimestamp#bc2eab30 = PrivacyKey;
privacyKeyChatInvite#500e6dfa = PrivacyKey;
privacyKeyPhoneCall#3d662b7b = PrivacyKey;
privacyKeyPhoneP2P#39491cc8 = PrivacyKey;
privacyKeyForwards#69ec56a3 = PrivacyKey;
privacyKeyProfilePhoto#96151fed = PrivacyKey;
privacyKeyPhoneNumber#d19ae46d = PrivacyKey;
privacyKeyAddedByPhone#42ffd42b = PrivacyKey;
privacyKeyVoiceMessages#697f414 = PrivacyKey;
privacyKeyAbout#a486b761 = PrivacyKey;
privacyKeyBirthday#2000a518 = PrivacyKey;
inputPrivacyValueAllowContacts#d09e07b = InputPrivacyRule;
inputPrivacyValueAllowAll#184b35ce = InputPrivacyRule;
inputPrivacyValueAllowUsers#131cc67f users:Vector<InputUser> = InputPrivacyRule;
inputPrivacyValueDisallowContacts#ba52007 = InputPrivacyRule;
inputPrivacyValueDisallowAll#d66b66c9 = InputPrivacyRule;
inputPrivacyValueDisallowUsers#90110467 users:Vector<InputUser> = InputPrivacyRule;
inputPrivacyValueAllowChatParticipants#840649cf chats:Vector<long> = InputPrivacyRule;
inputPrivacyValueDisallowChatParticipants#e94f0f86 chats:Vector<long> = InputPrivacyRule;
inputPrivacyValueAllowCloseFriends#2f453e49 = InputPrivacyRule;
inputPrivacyValueAllowPremium#77cdc9f1 = InputPrivacyRule;
privacyValueAllowContacts#fffe1bac = PrivacyRule;
privacyValueAllowAll#65427b82 = PrivacyRule;
privacyValueAllowUsers#b8905fb2 users:Vector<long> = PrivacyRule;
privacyValueDisallowContacts#f888fa1a = PrivacyRule;
privacyValueDisallowAll#8b73e763 = PrivacyRule;
privacyValueDisallowUsers#e4621141 users:Vector<long> = PrivacyRule;
privacyValueAllowChatParticipants#6b134e8e chats:Vector<long> = PrivacyRule;
privacyValueDisallowChatParticipants#41c87565 chats:Vector<long> = PrivacyRule;
privacyValueAllowCloseFriends#f7e8d89b = PrivacyRule;
privacyValueAllowPremium#ece9814b = PrivacyRule;
account.privacyRules#50a04e45 rules:Vector<PrivacyRule> chats:Vector<Chat> users:Vector<User> = account.PrivacyRules;
accountDaysTTL#b8d0afdf days:int = AccountDaysTTL;
documentAttributeImageSize#6c37c15c w:int h:int = DocumentAttribute;
documentAttributeAnimated#11b58939 = DocumentAttribute;
documentAttributeSticker#6319d612 flags:# mask:flags.1?true alt:string stickerset:InputStickerSet mask_coords:flags.0?MaskCoords = DocumentAttribute;
documentAttributeVideo#d38ff1c2 flags:# round_message:flags.0?true supports_streaming:flags.1?true nosound:flags.3?true duration:double w:int h:int preload_prefix_size:flags.2?int = DocumentAttribute;
documentAttributeAudio#9852f9c6 flags:# voice:flags.10?true duration:int title:flags.0?string performer:flags.1?string waveform:flags.2?bytes = DocumentAttribute;
documentAttributeFilename#15590068 file_name:string = DocumentAttribute;
documentAttributeHasStickers#9801d2f7 = DocumentAttribute;
documentAttributeCustomEmoji#fd149899 flags:# free:flags.0?true text_color:flags.1?true alt:string stickerset:InputStickerSet = DocumentAttribute;
messages.stickersNotModified#f1749a22 = messages.Stickers;
messages.stickers#30a6ec7e hash:long stickers:Vector<Document> = messages.Stickers;
stickerPack#12b299d4 emoticon:string documents:Vector<long> = StickerPack;
messages.allStickersNotModified#e86602c3 = messages.AllStickers;
messages.allStickers#cdbbcebb hash:long sets:Vector<StickerSet> = messages.AllStickers;
messages.affectedMessages#84d19185 pts:int pts_count:int = messages.AffectedMessages;
webPageEmpty#211a1788 flags:# id:long url:flags.0?string = WebPage;
webPagePending#b0d13e47 flags:# id:long url:flags.0?string date:int = WebPage;
webPage#e89c45b2 flags:# has_large_media:flags.13?true id:long url:string display_url:string hash:int type:flags.0?string site_name:flags.1?string title:flags.2?string description:flags.3?string photo:flags.4?Photo embed_url:flags.5?string embed_type:flags.5?string embed_width:flags.6?int embed_height:flags.6?int duration:flags.7?int author:flags.8?string document:flags.9?Document cached_page:flags.10?Page attributes:flags.12?Vector<WebPageAttribute> = WebPage;
webPageNotModified#7311ca11 flags:# cached_page_views:flags.0?int = WebPage;
authorization#ad01d61d flags:# current:flags.0?true official_app:flags.1?true password_pending:flags.2?true encrypted_requests_disabled:flags.3?true call_requests_disabled:flags.4?true unconfirmed:flags.5?true hash:long device_model:string platform:string system_version:string api_id:int app_name:string app_version:string date_created:int date_active:int ip:string country:string region:string = Authorization;
account.authorizations#4bff8ea0 authorization_ttl_days:int authorizations:Vector<Authorization> = account.Authorizations;
account.password#957b50fb flags:# has_recovery:flags.0?true has_secure_values:flags.1?true has_password:flags.2?true current_algo:flags.2?PasswordKdfAlgo srp_B:flags.2?bytes srp_id:flags.2?long hint:flags.3?string email_unconfirmed_pattern:flags.4?string new_algo:PasswordKdfAlgo new_secure_algo:SecurePasswordKdfAlgo secure_random:bytes pending_reset_date:flags.5?int login_email_pattern:flags.6?string = account.Password;
account.passwordSettings#9a5c33e5 flags:# email:flags.0?string secure_settings:flags.1?SecureSecretSettings = account.PasswordSettings;
account.passwordInputSettings#c23727c9 flags:# new_algo:flags.0?PasswordKdfAlgo new_password_hash:flags.0?bytes hint:flags.0?string email:flags.1?string new_secure_settings:flags.2?SecureSecretSettings = account.PasswordInputSettings;
auth.passwordRecovery#137948a5 email_pattern:string = auth.PasswordRecovery;
receivedNotifyMessage#a384b779 id:int flags:int = ReceivedNotifyMessage;
chatInviteExported#ab4a819 flags:# revoked:flags.0?true permanent:flags.5?true request_needed:flags.6?true link:string admin_id:long date:int start_date:flags.4?int expire_date:flags.1?int usage_limit:flags.2?int usage:flags.3?int requested:flags.7?int title:flags.8?string = ExportedChatInvite;
chatInvitePublicJoinRequests#ed107ab7 = ExportedChatInvite;
chatInviteAlready#5a686d7c chat:Chat = ChatInvite;
chatInvite#cde0ec40 flags:# channel:flags.0?true broadcast:flags.1?true public:flags.2?true megagroup:flags.3?true request_needed:flags.6?true verified:flags.7?true scam:flags.8?true fake:flags.9?true title:string about:flags.5?string photo:Photo participants_count:int participants:flags.4?Vector<User> color:int = ChatInvite;
chatInvitePeek#61695cb0 chat:Chat expires:int = ChatInvite;
inputStickerSetEmpty#ffb62b95 = InputStickerSet;
inputStickerSetID#9de7a269 id:long access_hash:long = InputStickerSet;
inputStickerSetShortName#861cc8a0 short_name:string = InputStickerSet;
inputStickerSetAnimatedEmoji#28703c8 = InputStickerSet;
inputStickerSetDice#e67f520e emoticon:string = InputStickerSet;
inputStickerSetAnimatedEmojiAnimations#cde3739 = InputStickerSet;
inputStickerSetPremiumGifts#c88b3b02 = InputStickerSet;
inputStickerSetEmojiGenericAnimations#4c4d4ce = InputStickerSet;
inputStickerSetEmojiDefaultStatuses#29d0f5ee = InputStickerSet;
inputStickerSetEmojiDefaultTopicIcons#44c1f8e9 = InputStickerSet;
inputStickerSetEmojiChannelDefaultStatuses#49748553 = InputStickerSet;
stickerSet#2dd14edc flags:# archived:flags.1?true official:flags.2?true masks:flags.3?true emojis:flags.7?true text_color:flags.9?true channel_emoji_status:flags.10?true creator:flags.11?true installed_date:flags.0?int id:long access_hash:long title:string short_name:string thumbs:flags.4?Vector<PhotoSize> thumb_dc_id:flags.4?int thumb_version:flags.4?int thumb_document_id:flags.8?long count:int hash:int = StickerSet;
messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;
messages.stickerSetNotModified#d3f924eb = messages.StickerSet;
botCommand#c27ac8c7 command:string description:string = BotCommand;
botInfo#8f300b57 flags:# user_id:flags.0?long description:flags.1?string description_photo:flags.4?Photo description_document:flags.5?Document commands:flags.2?Vector<BotCommand> menu_button:flags.3?BotMenuButton = BotInfo;
keyboardButton#a2fa4880 text:string = KeyboardButton;
keyboardButtonUrl#258aff05 text:string url:string = KeyboardButton;
keyboardButtonCallback#35bbdb6b flags:# requires_password:flags.0?true text:string data:bytes = KeyboardButton;
keyboardButtonRequestPhone#b16a6c29 text:string = KeyboardButton;
keyboardButtonRequestGeoLocation#fc796b3f text:string = KeyboardButton;
keyboardButtonSwitchInline#93b9fbb5 flags:# same_peer:flags.0?true text:string query:string peer_types:flags.1?Vector<InlineQueryPeerType> = KeyboardButton;
keyboardButtonGame#50f41ccf text:string = KeyboardButton;
keyboardButtonBuy#afd93fbb text:string = KeyboardButton;
keyboardButtonUrlAuth#10b78d29 flags:# text:string fwd_text:flags.0?string url:string button_id:int = KeyboardButton;
inputKeyboardButtonUrlAuth#d02e7fd4 flags:# request_write_access:flags.0?true text:string fwd_text:flags.1?string url:string bot:InputUser = KeyboardButton;
keyboardButtonRequestPoll#bbc7515d flags:# quiz:flags.0?Bool text:string = KeyboardButton;
inputKeyboardButtonUserProfile#e988037b text:string user_id:InputUser = KeyboardButton;
keyboardButtonUserProfile#308660c1 text:string user_id:long = KeyboardButton;
keyboardButtonWebView#13767230 text:string url:string = KeyboardButton;
keyboardButtonSimpleWebView#a0c0505c text:string url:string = KeyboardButton;
keyboardButtonRequestPeer#53d7bfd8 text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
inputKeyboardButtonRequestPeer#c9662d05 flags:# name_requested:flags.0?true username_requested:flags.1?true photo_requested:flags.2?true text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
keyboardButtonRow#77608b83 buttons:Vector<KeyboardButton> = KeyboardButtonRow;
replyKeyboardHide#a03e5b85 flags:# selective:flags.2?true = ReplyMarkup;
replyKeyboardForceReply#86b40b08 flags:# single_use:flags.1?true selective:flags.2?true placeholder:flags.3?string = ReplyMarkup;
replyKeyboardMarkup#85dd99d1 flags:# resize:flags.0?true single_use:flags.1?true selective:flags.2?true persistent:flags.4?true rows:Vector<KeyboardButtonRow> placeholder:flags.3?string = ReplyMarkup;
replyInlineMarkup#48a30254 rows:Vector<KeyboardButtonRow> = ReplyMarkup;
messageEntityUnknown#bb92ba95 offset:int length:int = MessageEntity;
messageEntityMention#fa04579d offset:int length:int = MessageEntity;
messageEntityHashtag#6f635b0d offset:int length:int = MessageEntity;
messageEntityBotCommand#6cef8ac7 offset:int length:int = MessageEntity;
messageEntityUrl#6ed02538 offset:int length:int = MessageEntity;
messageEntityEmail#64e475c2 offset:int length:int = MessageEntity;
messageEntityBold#bd610bc9 offset:int length:int = MessageEntity;
messageEntityItalic#826f8b60 offset:int length:int = MessageEntity;
messageEntityCode#28a20571 offset:int length:int = MessageEntity;
messageEntityPre#73924be0 offset:int length:int language:string = MessageEntity;
messageEntityTextUrl#76a6d327 offset:int length:int url:string = MessageEntity;
messageEntityMentionName#dc7b1140 offset:int length:int user_id:long = MessageEntity;
inputMessageEntityMentionName#208e68c9 offset:int length:int user_id:InputUser = MessageEntity;
messageEntityPhone#9b69e34b offset:int length:int = MessageEntity;
messageEntityCashtag#4c4e743f offset:int length:int = MessageEntity;
messageEntityUnderline#9c4e7e8b offset:int length:int = MessageEntity;
messageEntityStrike#bf0693d4 offset:int length:int = MessageEntity;
messageEntityBankCard#761e6af4 offset:int length:int = MessageEntity;
messageEntitySpoiler#32ca960f offset:int length:int = MessageEntity;
messageEntityCustomEmoji#c8cf05f8 offset:int length:int document_id:long = MessageEntity;
messageEntityBlockquote#f1ccaaac flags:# collapsed:flags.0?true offset:int length:int = MessageEntity;
inputChannelEmpty#ee8c1e86 = InputChannel;
inputChannel#f35aec28 channel_id:long access_hash:long = InputChannel;
inputChannelFromMessage#5b934f9d peer:InputPeer msg_id:int channel_id:long = InputChannel;
contacts.resolvedPeer#7f077ad9 peer:Peer chats:Vector<Chat> users:Vector<User> = contacts.ResolvedPeer;
messageRange#ae30253 min_id:int max_id:int = MessageRange;
updates.channelDifferenceEmpty#3e11affb flags:# final:flags.0?true pts:int timeout:flags.1?int = updates.ChannelDifference;
updates.channelDifferenceTooLong#a4bcc6fe flags:# final:flags.0?true timeout:flags.1?int dialog:Dialog messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = updates.ChannelDifference;
updates.channelDifference#2064674e flags:# final:flags.0?true pts:int timeout:flags.1?int new_messages:Vector<Message> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> = updates.ChannelDifference;
channelMessagesFilterEmpty#94d42ee7 = ChannelMessagesFilter;
channelMessagesFilter#cd77d957 flags:# exclude_new_messages:flags.1?true ranges:Vector<MessageRange> = ChannelMessagesFilter;
channelParticipant#c00c07c0 user_id:long date:int = ChannelParticipant;
channelParticipantSelf#35a8bfa7 flags:# via_request:flags.0?true user_id:long inviter_id:long date:int = ChannelParticipant;
channelParticipantCreator#2fe601d3 flags:# user_id:long admin_rights:ChatAdminRights rank:flags.0?string = ChannelParticipant;
channelParticipantAdmin#34c3bb53 flags:# can_edit:flags.0?true self:flags.1?true user_id:long inviter_id:flags.1?long promoted_by:long date:int admin_rights:ChatAdminRights rank:flags.2?string = ChannelParticipant;
channelParticipantBanned#6df8014e flags:# left:flags.0?true peer:Peer kicked_by:long date:int banned_rights:ChatBannedRights = ChannelParticipant;
channelParticipantLeft#1b03f006 peer:Peer = ChannelParticipant;
channelParticipantsRecent#de3f3c79 = ChannelParticipantsFilter;
channelParticipantsAdmins#b4608969 = ChannelParticipantsFilter;
channelParticipantsKicked#a3b54985 q:string = ChannelParticipantsFilter;
channelParticipantsBots#b0d1865b = ChannelParticipantsFilter;
channelParticipantsBanned#1427a5e1 q:string = ChannelParticipantsFilter;
channelParticipantsSearch#656ac4b q:string = ChannelParticipantsFilter;
channelParticipantsContacts#bb6ae88d q:string = ChannelParticipantsFilter;
channelParticipantsMentions#e04b5ceb flags:# q:flags.0?string top_msg_id:flags.1?int = ChannelParticipantsFilter;
channels.channelParticipants#9ab0feaf count:int participants:Vector<ChannelParticipant> chats:Vector<Chat> users:Vector<User> = channels.ChannelParticipants;
channels.channelParticipantsNotModified#f0173fe9 = channels.ChannelParticipants;
channels.channelParticipant#dfb80317 participant:ChannelParticipant chats:Vector<Chat> users:Vector<User> = channels.ChannelParticipant;
help.termsOfService#780a0310 flags:# popup:flags.0?true id:DataJSON text:string entities:Vector<MessageEntity> min_age_confirm:flags.1?int = help.TermsOfService;
messages.savedGifsNotModified#e8025ca2 = messages.SavedGifs;
messages.savedGifs#84a02a0d hash:long gifs:Vector<Document> = messages.SavedGifs;
inputBotInlineMessageMediaAuto#3380c786 flags:# invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageText#3dcd7a87 flags:# no_webpage:flags.0?true invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaGeo#96929a85 flags:# geo_point:InputGeoPoint heading:flags.0?int period:flags.1?int proximity_notification_radius:flags.3?int reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaVenue#417bbf11 flags:# geo_point:InputGeoPoint title:string address:string provider:string venue_id:string venue_type:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaContact#a6edbffd flags:# phone_number:string first_name:string last_name:string vcard:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageGame#4b425864 flags:# reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaInvoice#d7e78225 flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:string provider_data:DataJSON reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaWebPage#bddcc510 flags:# invert_media:flags.3?true force_large_media:flags.4?true force_small_media:flags.5?true optional:flags.6?true message:string entities:flags.1?Vector<MessageEntity> url:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineResult#88bf9319 flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?InputWebDocument content:flags.5?InputWebDocument send_message:InputBotInlineMessage = InputBotInlineResult;
inputBotInlineResultPhoto#a8d864a7 id:string type:string photo:InputPhoto send_message:InputBotInlineMessage = InputBotInlineResult;
inputBotInlineResultDocument#fff8fdc4 flags:# id:string type:string title:flags.1?string description:flags.2?string document:InputDocument send_message:InputBotInlineMessage = InputBotInlineResult;
inputBotInlineResultGame#4fa417f2 id:string short_name:string send_message:InputBotInlineMessage = InputBotInlineResult;
botInlineMessageMediaAuto#764cf810 flags:# invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageText#8c7f65e2 flags:# no_webpage:flags.0?true invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaGeo#51846fd flags:# geo:GeoPoint heading:flags.0?int period:flags.1?int proximity_notification_radius:flags.3?int reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaVenue#8a86659c flags:# geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaContact#18d1cdc2 flags:# phone_number:string first_name:string last_name:string vcard:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaInvoice#354a9b09 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument currency:string total_amount:long reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaWebPage#809ad9a6 flags:# invert_media:flags.3?true force_large_media:flags.4?true force_small_media:flags.5?true manual:flags.7?true safe:flags.8?true message:string entities:flags.1?Vector<MessageEntity> url:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineResult#11965f3a flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?WebDocument content:flags.5?WebDocument send_message:BotInlineMessage = BotInlineResult;
botInlineMediaResult#17db940b flags:# id:string type:string photo:flags.0?Photo document:flags.1?Document title:flags.2?string description:flags.3?string send_message:BotInlineMessage = BotInlineResult;
messages.botResults#e021f2f6 flags:# gallery:flags.0?true query_id:long next_offset:flags.1?string switch_pm:flags.2?InlineBotSwitchPM switch_webview:flags.3?InlineBotWebView results:Vector<BotInlineResult> cache_time:int users:Vector<User> = messages.BotResults;
exportedMessageLink#5dab1af4 link:string html:string = ExportedMessageLink;
messageFwdHeader#4e4df4bb flags:# imported:flags.7?true saved_out:flags.11?true from_id:flags.0?Peer from_name:flags.5?string date:int channel_post:flags.2?int post_author:flags.3?string saved_from_peer:flags.4?Peer saved_from_msg_id:flags.4?int saved_from_id:flags.8?Peer saved_from_name:flags.9?string saved_date:flags.10?int psa_type:flags.6?string = MessageFwdHeader;
auth.codeTypeSms#72a3158c = auth.CodeType;
auth.codeTypeCall#741cd3e3 = auth.CodeType;
auth.codeTypeFlashCall#226ccefb = auth.CodeType;
auth.codeTypeMissedCall#d61ad6ee = auth.CodeType;
auth.codeTypeFragmentSms#6ed998c = auth.CodeType;
auth.sentCodeTypeApp#3dbb5986 length:int = auth.SentCodeType;
auth.sentCodeTypeSms#c000bba2 length:int = auth.SentCodeType;
auth.sentCodeTypeCall#5353e5a7 length:int = auth.SentCodeType;
auth.sentCodeTypeFlashCall#ab03c6d9 pattern:string = auth.SentCodeType;
auth.sentCodeTypeMissedCall#82006484 prefix:string length:int = auth.SentCodeType;
auth.sentCodeTypeEmailCode#f450f59b flags:# apple_signin_allowed:flags.0?true google_signin_allowed:flags.1?true email_pattern:string length:int reset_available_period:flags.3?int reset_pending_date:flags.4?int = auth.SentCodeType;
auth.sentCodeTypeSetUpEmailRequired#a5491dea flags:# apple_signin_allowed:flags.0?true google_signin_allowed:flags.1?true = auth.SentCodeType;
auth.sentCodeTypeFragmentSms#d9565c39 url:string length:int = auth.SentCodeType;
auth.sentCodeTypeFirebaseSms#9fd736 flags:# nonce:flags.0?bytes play_integrity_project_id:flags.2?long play_integrity_nonce:flags.2?bytes receipt:flags.1?string push_timeout:flags.1?int length:int = auth.SentCodeType;
auth.sentCodeTypeSmsWord#a416ac81 flags:# beginning:flags.0?string = auth.SentCodeType;
auth.sentCodeTypeSmsPhrase#b37794af flags:# beginning:flags.0?string = auth.SentCodeType;
messages.botCallbackAnswer#36585ea4 flags:# alert:flags.1?true has_url:flags.3?true native_ui:flags.4?true message:flags.0?string url:flags.2?string cache_time:int = messages.BotCallbackAnswer;
messages.messageEditData#26b5dde6 flags:# caption:flags.0?true = messages.MessageEditData;
inputBotInlineMessageID#890c3d89 dc_id:int id:long access_hash:long = InputBotInlineMessageID;
inputBotInlineMessageID64#b6d915d7 dc_id:int owner_id:long id:int access_hash:long = InputBotInlineMessageID;
inlineBotSwitchPM#3c20629f text:string start_param:string = InlineBotSwitchPM;
messages.peerDialogs#3371c354 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> state:updates.State = messages.PeerDialogs;
topPeer#edcdc05b peer:Peer rating:double = TopPeer;
topPeerCategoryBotsPM#ab661b5b = TopPeerCategory;
topPeerCategoryBotsInline#148677e2 = TopPeerCategory;
topPeerCategoryCorrespondents#637b7ed = TopPeerCategory;
topPeerCategoryGroups#bd17a14a = TopPeerCategory;
topPeerCategoryChannels#161d9628 = TopPeerCategory;
topPeerCategoryPhoneCalls#1e76a78c = TopPeerCategory;
topPeerCategoryForwardUsers#a8406ca9 = TopPeerCategory;
topPeerCategoryForwardChats#fbeec0f0 = TopPeerCategory;
topPeerCategoryPeers#fb834291 category:TopPeerCategory count:int peers:Vector<TopPeer> = TopPeerCategoryPeers;
contacts.topPeersNotModified#de266ef5 = contacts.TopPeers;
contacts.topPeers#70b772a8 categories:Vector<TopPeerCategoryPeers> chats:Vector<Chat> users:Vector<User> = contacts.TopPeers;
contacts.topPeersDisabled#b52c939d = contacts.TopPeers;
draftMessageEmpty#1b0c841a flags:# date:flags.0?int = DraftMessage;
draftMessage#2d65321f flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia date:int effect:flags.7?long = DraftMessage;
messages.featuredStickersNotModified#c6dc0c66 count:int = messages.FeaturedStickers;
messages.featuredStickers#be382906 flags:# premium:flags.0?true hash:long count:int sets:Vector<StickerSetCovered> unread:Vector<long> = messages.FeaturedStickers;
messages.recentStickersNotModified#b17f890 = messages.RecentStickers;
messages.recentStickers#88d37c56 hash:long packs:Vector<StickerPack> stickers:Vector<Document> dates:Vector<int> = messages.RecentStickers;
messages.archivedStickers#4fcba9c8 count:int sets:Vector<StickerSetCovered> = messages.ArchivedStickers;
messages.stickerSetInstallResultSuccess#38641628 = messages.StickerSetInstallResult;
messages.stickerSetInstallResultArchive#35e410a8 sets:Vector<StickerSetCovered> = messages.StickerSetInstallResult;
stickerSetCovered#6410a5d2 set:StickerSet cover:Document = StickerSetCovered;
stickerSetMultiCovered#3407e51b set:StickerSet covers:Vector<Document> = StickerSetCovered;
stickerSetFullCovered#40d13c0e set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = StickerSetCovered;
stickerSetNoCovered#77b15d1c set:StickerSet = StickerSetCovered;
maskCoords#aed6dbb2 n:int x:double y:double zoom:double = MaskCoords;
inputStickeredMediaPhoto#4a992157 id:InputPhoto = InputStickeredMedia;
inputStickeredMediaDocument#438865b id:InputDocument = InputStickeredMedia;
game#bdf9653b flags:# id:long access_hash:long short_name:string title:string description:string photo:Photo document:flags.0?Document = Game;
inputGameID#32c3e77 id:long access_hash:long = InputGame;
inputGameShortName#c331e80a bot_id:InputUser short_name:string = InputGame;
highScore#73a379eb pos:int user_id:long score:int = HighScore;
messages.highScores#9a3bfd99 scores:Vector<HighScore> users:Vector<User> = messages.HighScores;
textEmpty#dc3d824f = RichText;
textPlain#744694e0 text:string = RichText;
textBold#6724abc4 text:RichText = RichText;
textItalic#d912a59c text:RichText = RichText;
textUnderline#c12622c4 text:RichText = RichText;
textStrike#9bf8bb95 text:RichText = RichText;
textFixed#6c3f19b9 text:RichText = RichText;
textUrl#3c2884c1 text:RichText url:string webpage_id:long = RichText;
textEmail#de5a0dd6 text:RichText email:string = RichText;
textConcat#7e6260d7 texts:Vector<RichText> = RichText;
textSubscript#ed6a8504 text:RichText = RichText;
textSuperscript#c7fb5e01 text:RichText = RichText;
textMarked#34b8621 text:RichText = RichText;
textPhone#1ccb966a text:RichText phone:string = RichText;
textImage#81ccf4f document_id:long w:int h:int = RichText;
textAnchor#35553762 text:RichText name:string = RichText;
pageBlockUnsupported#13567e8a = PageBlock;
pageBlockTitle#70abc3fd text:RichText = PageBlock;
pageBlockSubtitle#8ffa9a1f text:RichText = PageBlock;
pageBlockAuthorDate#baafe5e0 author:RichText published_date:int = PageBlock;
pageBlockHeader#bfd064ec text:RichText = PageBlock;
pageBlockSubheader#f12bb6e1 text:RichText = PageBlock;
pageBlockParagraph#467a0766 text:RichText = PageBlock;
pageBlockPreformatted#c070d93e text:RichText language:string = PageBlock;
pageBlockFooter#48870999 text:RichText = PageBlock;
pageBlockDivider#db20b188 = PageBlock;
pageBlockAnchor#ce0d37b0 name:string = PageBlock;
pageBlockList#e4e88011 items:Vector<PageListItem> = PageBlock;
pageBlockBlockquote#263d7c26 text:RichText caption:RichText = PageBlock;
pageBlockPullquote#4f4456d3 text:RichText caption:RichText = PageBlock;
pageBlockPhoto#1759c560 flags:# photo_id:long caption:PageCaption url:flags.0?string webpage_id:flags.0?long = PageBlock;
pageBlockVideo#7c8fe7b6 flags:# autoplay:flags.0?true loop:flags.1?true video_id:long caption:PageCaption = PageBlock;
pageBlockCover#39f23300 cover:PageBlock = PageBlock;
pageBlockEmbed#a8718dc5 flags:# full_width:flags.0?true allow_scrolling:flags.3?true url:flags.1?string html:flags.2?string poster_photo_id:flags.4?long w:flags.5?int h:flags.5?int caption:PageCaption = PageBlock;
pageBlockEmbedPost#f259a80b url:string webpage_id:long author_photo_id:long author:string date:int blocks:Vector<PageBlock> caption:PageCaption = PageBlock;
pageBlockCollage#65a0fa4d items:Vector<PageBlock> caption:PageCaption = PageBlock;
pageBlockSlideshow#31f9590 items:Vector<PageBlock> caption:PageCaption = PageBlock;
pageBlockChannel#ef1751b5 channel:Chat = PageBlock;
pageBlockAudio#804361ea audio_id:long caption:PageCaption = PageBlock;
pageBlockKicker#1e148390 text:RichText = PageBlock;
pageBlockTable#bf4dea82 flags:# bordered:flags.0?true striped:flags.1?true title:RichText rows:Vector<PageTableRow> = PageBlock;
pageBlockOrderedList#9a8ae1e1 items:Vector<PageListOrderedItem> = PageBlock;
pageBlockDetails#76768bed flags:# open:flags.0?true blocks:Vector<PageBlock> title:RichText = PageBlock;
pageBlockRelatedArticles#16115a96 title:RichText articles:Vector<PageRelatedArticle> = PageBlock;
pageBlockMap#a44f3ef6 geo:GeoPoint zoom:int w:int h:int caption:PageCaption = PageBlock;
phoneCallDiscardReasonMissed#85e42301 = PhoneCallDiscardReason;
phoneCallDiscardReasonDisconnect#e095c1a0 = PhoneCallDiscardReason;
phoneCallDiscardReasonHangup#57adc690 = PhoneCallDiscardReason;
phoneCallDiscardReasonBusy#faf7e8c9 = PhoneCallDiscardReason;
dataJSON#7d748d04 data:string = DataJSON;
labeledPrice#cb296bf8 label:string amount:long = LabeledPrice;
invoice#5db95a15 flags:# test:flags.0?true name_requested:flags.1?true phone_requested:flags.2?true email_requested:flags.3?true shipping_address_requested:flags.4?true flexible:flags.5?true phone_to_provider:flags.6?true email_to_provider:flags.7?true recurring:flags.9?true currency:string prices:Vector<LabeledPrice> max_tip_amount:flags.8?long suggested_tip_amounts:flags.8?Vector<long> terms_url:flags.10?string = Invoice;
paymentCharge#ea02c27e id:string provider_charge_id:string = PaymentCharge;
postAddress#1e8caaeb street_line1:string street_line2:string city:string state:string country_iso2:string post_code:string = PostAddress;
paymentRequestedInfo#909c3f94 flags:# name:flags.0?string phone:flags.1?string email:flags.2?string shipping_address:flags.3?PostAddress = PaymentRequestedInfo;
paymentSavedCredentialsCard#cdc27a1f id:string title:string = PaymentSavedCredentials;
webDocument#1c570ed1 url:string access_hash:long size:int mime_type:string attributes:Vector<DocumentAttribute> = WebDocument;
webDocumentNoProxy#f9c8bcc6 url:string size:int mime_type:string attributes:Vector<DocumentAttribute> = WebDocument;
inputWebDocument#9bed434d url:string size:int mime_type:string attributes:Vector<DocumentAttribute> = InputWebDocument;
inputWebFileLocation#c239d686 url:string access_hash:long = InputWebFileLocation;
inputWebFileGeoPointLocation#9f2221c9 geo_point:InputGeoPoint access_hash:long w:int h:int zoom:int scale:int = InputWebFileLocation;
inputWebFileAudioAlbumThumbLocation#f46fe924 flags:# small:flags.2?true document:flags.0?InputDocument title:flags.1?string performer:flags.1?string = InputWebFileLocation;
upload.webFile#21e753bc size:int mime_type:string file_type:storage.FileType mtime:int bytes:bytes = upload.WebFile;
payments.paymentForm#a0058751 flags:# can_save_credentials:flags.2?true password_missing:flags.3?true form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice provider_id:long url:string native_provider:flags.4?string native_params:flags.4?DataJSON additional_methods:flags.6?Vector<PaymentFormMethod> saved_info:flags.0?PaymentRequestedInfo saved_credentials:flags.1?Vector<PaymentSavedCredentials> users:Vector<User> = payments.PaymentForm;
payments.paymentFormStars#7bf6b15c flags:# form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice users:Vector<User> = payments.PaymentForm;
payments.validatedRequestedInfo#d1451883 flags:# id:flags.0?string shipping_options:flags.1?Vector<ShippingOption> = payments.ValidatedRequestedInfo;
payments.paymentResult#4e5f810d updates:Updates = payments.PaymentResult;
payments.paymentVerificationNeeded#d8411139 url:string = payments.PaymentResult;
payments.paymentReceipt#70c4fe03 flags:# date:int bot_id:long provider_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice info:flags.0?PaymentRequestedInfo shipping:flags.1?ShippingOption tip_amount:flags.3?long currency:string total_amount:long credentials_title:string users:Vector<User> = payments.PaymentReceipt;
payments.paymentReceiptStars#dabbf83a flags:# date:int bot_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice currency:string total_amount:long transaction_id:string users:Vector<User> = payments.PaymentReceipt;
payments.savedInfo#fb8fe43c flags:# has_saved_credentials:flags.1?true saved_info:flags.0?PaymentRequestedInfo = payments.SavedInfo;
inputPaymentCredentialsSaved#c10eb2cf id:string tmp_password:bytes = InputPaymentCredentials;
inputPaymentCredentials#3417d728 flags:# save:flags.0?true data:DataJSON = InputPaymentCredentials;
inputPaymentCredentialsApplePay#aa1c39f payment_data:DataJSON = InputPaymentCredentials;
inputPaymentCredentialsGooglePay#8ac32801 payment_token:DataJSON = InputPaymentCredentials;
account.tmpPassword#db64fd34 tmp_password:bytes valid_until:int = account.TmpPassword;
shippingOption#b6213cdf id:string title:string prices:Vector<LabeledPrice> = ShippingOption;
inputStickerSetItem#32da9e9c flags:# document:InputDocument emoji:string mask_coords:flags.0?MaskCoords keywords:flags.1?string = InputStickerSetItem;
inputPhoneCall#1e36fded id:long access_hash:long = InputPhoneCall;
phoneCallEmpty#5366c915 id:long = PhoneCall;
phoneCallWaiting#c5226f17 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long protocol:PhoneCallProtocol receive_date:flags.0?int = PhoneCall;
phoneCallRequested#14b0ed0c flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_hash:bytes protocol:PhoneCallProtocol = PhoneCall;
phoneCallAccepted#3660c311 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_b:bytes protocol:PhoneCallProtocol = PhoneCall;
phoneCall#30535af5 flags:# p2p_allowed:flags.5?true video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long protocol:PhoneCallProtocol connections:Vector<PhoneConnection> start_date:int custom_parameters:flags.7?DataJSON = PhoneCall;
phoneCallDiscarded#50ca4de1 flags:# need_rating:flags.2?true need_debug:flags.3?true video:flags.6?true id:long reason:flags.0?PhoneCallDiscardReason duration:flags.1?int = PhoneCall;
phoneConnection#9cc123c7 flags:# tcp:flags.0?true id:long ip:string ipv6:string port:int peer_tag:bytes = PhoneConnection;
phoneConnectionWebrtc#635fe375 flags:# turn:flags.0?true stun:flags.1?true id:long ip:string ipv6:string port:int username:string password:string = PhoneConnection;
phoneCallProtocol#fc878fc8 flags:# udp_p2p:flags.0?true udp_reflector:flags.1?true min_layer:int max_layer:int library_versions:Vector<string> = PhoneCallProtocol;
phone.phoneCall#ec82e140 phone_call:PhoneCall users:Vector<User> = phone.PhoneCall;
upload.cdnFileReuploadNeeded#eea8e46e request_token:bytes = upload.CdnFile;
upload.cdnFile#a99fca4f bytes:bytes = upload.CdnFile;
cdnPublicKey#c982eaba dc_id:int public_key:string = CdnPublicKey;
cdnConfig#5725e40a public_keys:Vector<CdnPublicKey> = CdnConfig;
langPackString#cad181f6 key:string value:string = LangPackString;
langPackStringPluralized#6c47ac9f flags:# key:string zero_value:flags.0?string one_value:flags.1?string two_value:flags.2?string few_value:flags.3?string many_value:flags.4?string other_value:string = LangPackString;
langPackStringDeleted#2979eeb2 key:string = LangPackString;
langPackDifference#f385c1f6 lang_code:string from_version:int version:int strings:Vector<LangPackString> = LangPackDifference;
langPackLanguage#eeca5ce3 flags:# official:flags.0?true rtl:flags.2?true beta:flags.3?true name:string native_name:string lang_code:string base_lang_code:flags.1?string plural_code:string strings_count:int translated_count:int translations_url:string = LangPackLanguage;
channelAdminLogEventActionChangeTitle#e6dfb825 prev_value:string new_value:string = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeAbout#55188a2e prev_value:string new_value:string = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeUsername#6a4afc38 prev_value:string new_value:string = ChannelAdminLogEventAction;
channelAdminLogEventActionChangePhoto#434bd2af prev_photo:Photo new_photo:Photo = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleInvites#1b7907ae new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleSignatures#26ae0971 new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionUpdatePinned#e9e82c18 message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionEditMessage#709b2405 prev_message:Message new_message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionDeleteMessage#42e047bb message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantJoin#183040d3 = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantLeave#f89777f2 = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantInvite#e31c34d8 participant:ChannelParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantToggleBan#e6d83d7e prev_participant:ChannelParticipant new_participant:ChannelParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantToggleAdmin#d5676710 prev_participant:ChannelParticipant new_participant:ChannelParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeStickerSet#b1c3caa7 prev_stickerset:InputStickerSet new_stickerset:InputStickerSet = ChannelAdminLogEventAction;
channelAdminLogEventActionTogglePreHistoryHidden#5f5c95f1 new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionDefaultBannedRights#2df5fc0a prev_banned_rights:ChatBannedRights new_banned_rights:ChatBannedRights = ChannelAdminLogEventAction;
channelAdminLogEventActionStopPoll#8f079643 message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeLinkedChat#50c7ac8 prev_value:long new_value:long = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeLocation#e6b76ae prev_value:ChannelLocation new_value:ChannelLocation = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleSlowMode#53909779 prev_value:int new_value:int = ChannelAdminLogEventAction;
channelAdminLogEventActionStartGroupCall#23209745 call:InputGroupCall = ChannelAdminLogEventAction;
channelAdminLogEventActionDiscardGroupCall#db9f9140 call:InputGroupCall = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantMute#f92424d2 participant:GroupCallParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantUnmute#e64429c0 participant:GroupCallParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleGroupCallSetting#56d6a247 join_muted:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantJoinByInvite#fe9fc158 flags:# via_chatlist:flags.0?true invite:ExportedChatInvite = ChannelAdminLogEventAction;
channelAdminLogEventActionExportedInviteDelete#5a50fca4 invite:ExportedChatInvite = ChannelAdminLogEventAction;
channelAdminLogEventActionExportedInviteRevoke#410a134e invite:ExportedChatInvite = ChannelAdminLogEventAction;
channelAdminLogEventActionExportedInviteEdit#e90ebb59 prev_invite:ExportedChatInvite new_invite:ExportedChatInvite = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantVolume#3e7f6847 participant:GroupCallParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeHistoryTTL#6e941a38 prev_value:int new_value:int = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantJoinByRequest#afb6144a invite:ExportedChatInvite approved_by:long = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleNoForwards#cb2ac766 new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionSendMessage#278f2868 message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeAvailableReactions#be4e0ef8 prev_value:ChatReactions new_value:ChatReactions = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeUsernames#f04fb3a9 prev_value:Vector<string> new_value:Vector<string> = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleForum#2cc6383 new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionCreateTopic#58707d28 topic:ForumTopic = ChannelAdminLogEventAction;
channelAdminLogEventActionEditTopic#f06fe208 prev_topic:ForumTopic new_topic:ForumTopic = ChannelAdminLogEventAction;
channelAdminLogEventActionDeleteTopic#ae168909 topic:ForumTopic = ChannelAdminLogEventAction;
channelAdminLogEventActionPinTopic#5d8d353b flags:# prev_topic:flags.0?ForumTopic new_topic:flags.1?ForumTopic = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleAntiSpam#64f36dfc new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionChangePeerColor#5796e780 prev_value:PeerColor new_value:PeerColor = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeProfilePeerColor#5e477b25 prev_value:PeerColor new_value:PeerColor = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeWallpaper#31bb5d52 prev_value:WallPaper new_value:WallPaper = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeEmojiStatus#3ea9feb1 prev_value:EmojiStatus new_value:EmojiStatus = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeEmojiStickerSet#46d840ab prev_stickerset:InputStickerSet new_stickerset:InputStickerSet = ChannelAdminLogEventAction;
channelAdminLogEvent#1fad68cd id:long date:int user_id:long action:ChannelAdminLogEventAction = ChannelAdminLogEvent;
channels.adminLogResults#ed8af74d events:Vector<ChannelAdminLogEvent> chats:Vector<Chat> users:Vector<User> = channels.AdminLogResults;
channelAdminLogEventsFilter#ea107ae4 flags:# join:flags.0?true leave:flags.1?true invite:flags.2?true ban:flags.3?true unban:flags.4?true kick:flags.5?true unkick:flags.6?true promote:flags.7?true demote:flags.8?true info:flags.9?true settings:flags.10?true pinned:flags.11?true edit:flags.12?true delete:flags.13?true group_call:flags.14?true invites:flags.15?true send:flags.16?true forums:flags.17?true = ChannelAdminLogEventsFilter;
popularContact#5ce14175 client_id:long importers:int = PopularContact;
messages.favedStickersNotModified#9e8fa6d3 = messages.FavedStickers;
messages.favedStickers#2cb51097 hash:long packs:Vector<StickerPack> stickers:Vector<Document> = messages.FavedStickers;
recentMeUrlUnknown#46e1d13d url:string = RecentMeUrl;
recentMeUrlUser#b92c09e2 url:string user_id:long = RecentMeUrl;
recentMeUrlChat#b2da71d2 url:string chat_id:long = RecentMeUrl;
recentMeUrlChatInvite#eb49081d url:string chat_invite:ChatInvite = RecentMeUrl;
recentMeUrlStickerSet#bc0a57dc url:string set:StickerSetCovered = RecentMeUrl;
help.recentMeUrls#e0310d7 urls:Vector<RecentMeUrl> chats:Vector<Chat> users:Vector<User> = help.RecentMeUrls;
inputSingleMedia#1cc6e91f flags:# media:InputMedia random_id:long message:string entities:flags.0?Vector<MessageEntity> = InputSingleMedia;
webAuthorization#a6f8f452 hash:long bot_id:long domain:string browser:string platform:string date_created:int date_active:int ip:string region:string = WebAuthorization;
account.webAuthorizations#ed56c9fc authorizations:Vector<WebAuthorization> users:Vector<User> = account.WebAuthorizations;
inputMessageID#a676a322 id:int = InputMessage;
inputMessageReplyTo#bad88395 id:int = InputMessage;
inputMessagePinned#86872538 = InputMessage;
inputMessageCallbackQuery#acfa1a7e id:int query_id:long = InputMessage;
inputDialogPeer#fcaafeb7 peer:InputPeer = InputDialogPeer;
inputDialogPeerFolder#64600527 folder_id:int = InputDialogPeer;
dialogPeer#e56dbf05 peer:Peer = DialogPeer;
dialogPeerFolder#514519e2 folder_id:int = DialogPeer;
messages.foundStickerSetsNotModified#d54b65d = messages.FoundStickerSets;
messages.foundStickerSets#8af09dd2 hash:long sets:Vector<StickerSetCovered> = messages.FoundStickerSets;
fileHash#f39b035c offset:long limit:int hash:bytes = FileHash;
inputClientProxy#75588b3f address:string port:int = InputClientProxy;
help.termsOfServiceUpdateEmpty#e3309f7f expires:int = help.TermsOfServiceUpdate;
help.termsOfServiceUpdate#28ecf961 expires:int terms_of_service:help.TermsOfService = help.TermsOfServiceUpdate;
inputSecureFileUploaded#3334b0f0 id:long parts:int md5_checksum:string file_hash:bytes secret:bytes = InputSecureFile;
inputSecureFile#5367e5be id:long access_hash:long = InputSecureFile;
secureFileEmpty#64199744 = SecureFile;
secureFile#7d09c27e id:long access_hash:long size:long dc_id:int date:int file_hash:bytes secret:bytes = SecureFile;
secureData#8aeabec3 data:bytes data_hash:bytes secret:bytes = SecureData;
securePlainPhone#7d6099dd phone:string = SecurePlainData;
securePlainEmail#21ec5a5f email:string = SecurePlainData;
secureValueTypePersonalDetails#9d2a81e3 = SecureValueType;
secureValueTypePassport#3dac6a00 = SecureValueType;
secureValueTypeDriverLicense#6e425c4 = SecureValueType;
secureValueTypeIdentityCard#a0d0744b = SecureValueType;
secureValueTypeInternalPassport#99a48f23 = SecureValueType;
secureValueTypeAddress#cbe31e26 = SecureValueType;
secureValueTypeUtilityBill#fc36954e = SecureValueType;
secureValueTypeBankStatement#89137c0d = SecureValueType;
secureValueTypeRentalAgreement#8b883488 = SecureValueType;
secureValueTypePassportRegistration#99e3806a = SecureValueType;
secureValueTypeTemporaryRegistration#ea02ec33 = SecureValueType;
secureValueTypePhone#b320aadb = SecureValueType;
secureValueTypeEmail#8e3ca7ee = SecureValueType;
secureValue#187fa0ca flags:# type:SecureValueType data:flags.0?SecureData front_side:flags.1?SecureFile reverse_side:flags.2?SecureFile selfie:flags.3?SecureFile translation:flags.6?Vector<SecureFile> files:flags.4?Vector<SecureFile> plain_data:flags.5?SecurePlainData hash:bytes = SecureValue;
inputSecureValue#db21d0a7 flags:# type:SecureValueType data:flags.0?SecureData front_side:flags.1?InputSecureFile reverse_side:flags.2?InputSecureFile selfie:flags.3?InputSecureFile translation:flags.6?Vector<InputSecureFile> files:flags.4?Vector<InputSecureFile> plain_data:flags.5?SecurePlainData = InputSecureValue;
secureValueHash#ed1ecdb0 type:SecureValueType hash:bytes = SecureValueHash;
secureValueErrorData#e8a40bd9 type:SecureValueType data_hash:bytes field:string text:string = SecureValueError;
secureValueErrorFrontSide#be3dfa type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorReverseSide#868a2aa5 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorSelfie#e537ced6 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorFile#7a700873 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorFiles#666220e9 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;
secureValueError#869d758f type:SecureValueType hash:bytes text:string = SecureValueError;
secureValueErrorTranslationFile#a1144770 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorTranslationFiles#34636dd8 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;
secureCredentialsEncrypted#33f0ea47 data:bytes hash:bytes secret:bytes = SecureCredentialsEncrypted;
account.authorizationForm#ad2e1cd8 flags:# required_types:Vector<SecureRequiredType> values:Vector<SecureValue> errors:Vector<SecureValueError> users:Vector<User> privacy_policy_url:flags.0?string = account.AuthorizationForm;
account.sentEmailCode#811f854f email_pattern:string length:int = account.SentEmailCode;
help.deepLinkInfoEmpty#66afa166 = help.DeepLinkInfo;
help.deepLinkInfo#6a4ee832 flags:# update_app:flags.0?true message:string entities:flags.1?Vector<MessageEntity> = help.DeepLinkInfo;
savedPhoneContact#1142bd56 phone:string first_name:string last_name:string date:int = SavedContact;
account.takeout#4dba4501 id:long = account.Takeout;
passwordKdfAlgoUnknown#d45ab096 = PasswordKdfAlgo;
passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow#3a912d4a salt1:bytes salt2:bytes g:int p:bytes = PasswordKdfAlgo;
securePasswordKdfAlgoUnknown#4a8537 = SecurePasswordKdfAlgo;
securePasswordKdfAlgoPBKDF2HMACSHA512iter100000#bbf2dda0 salt:bytes = SecurePasswordKdfAlgo;
securePasswordKdfAlgoSHA512#86471d92 salt:bytes = SecurePasswordKdfAlgo;
secureSecretSettings#1527bcac secure_algo:SecurePasswordKdfAlgo secure_secret:bytes secure_secret_id:long = SecureSecretSettings;
inputCheckPasswordEmpty#9880f658 = InputCheckPasswordSRP;
inputCheckPasswordSRP#d27ff082 srp_id:long A:bytes M1:bytes = InputCheckPasswordSRP;
secureRequiredType#829d99da flags:# native_names:flags.0?true selfie_required:flags.1?true translation_required:flags.2?true type:SecureValueType = SecureRequiredType;
secureRequiredTypeOneOf#27477b4 types:Vector<SecureRequiredType> = SecureRequiredType;
help.passportConfigNotModified#bfb9f457 = help.PassportConfig;
help.passportConfig#a098d6af hash:int countries_langs:DataJSON = help.PassportConfig;
inputAppEvent#1d1b1245 time:double type:string peer:long data:JSONValue = InputAppEvent;
jsonObjectValue#c0de1bd9 key:string value:JSONValue = JSONObjectValue;
jsonNull#3f6d7b68 = JSONValue;
jsonBool#c7345e6a value:Bool = JSONValue;
jsonNumber#2be0dfa4 value:double = JSONValue;
jsonString#b71e767a value:string = JSONValue;
jsonArray#f7444763 value:Vector<JSONValue> = JSONValue;
jsonObject#99c1d49d value:Vector<JSONObjectValue> = JSONValue;
pageTableCell#34566b6a flags:# header:flags.0?true align_center:flags.3?true align_right:flags.4?true valign_middle:flags.5?true valign_bottom:flags.6?true text:flags.7?RichText colspan:flags.1?int rowspan:flags.2?int = PageTableCell;
pageTableRow#e0c0c5e5 cells:Vector<PageTableCell> = PageTableRow;
pageCaption#6f747657 text:RichText credit:RichText = PageCaption;
pageListItemText#b92fb6cd text:RichText = PageListItem;
pageListItemBlocks#25e073fc blocks:Vector<PageBlock> = PageListItem;
pageListOrderedItemText#5e068047 num:string text:RichText = PageListOrderedItem;
pageListOrderedItemBlocks#98dd8936 num:string blocks:Vector<PageBlock> = PageListOrderedItem;
pageRelatedArticle#b390dc08 flags:# url:string webpage_id:long title:flags.0?string description:flags.1?string photo_id:flags.2?long author:flags.3?string published_date:flags.4?int = PageRelatedArticle;
page#98657f0d flags:# part:flags.0?true rtl:flags.1?true v2:flags.2?true url:string blocks:Vector<PageBlock> photos:Vector<Photo> documents:Vector<Document> views:flags.3?int = Page;
help.supportName#8c05f1c9 name:string = help.SupportName;
help.userInfoEmpty#f3ae2eed = help.UserInfo;
help.userInfo#1eb3758 message:string entities:Vector<MessageEntity> author:string date:int = help.UserInfo;
pollAnswer#ff16e2ca text:TextWithEntities option:bytes = PollAnswer;
poll#58747131 id:long flags:# closed:flags.0?true public_voters:flags.1?true multiple_choice:flags.2?true quiz:flags.3?true question:TextWithEntities answers:Vector<PollAnswer> close_period:flags.4?int close_date:flags.5?int = Poll;
pollAnswerVoters#3b6ddad2 flags:# chosen:flags.0?true correct:flags.1?true option:bytes voters:int = PollAnswerVoters;
pollResults#7adf2420 flags:# min:flags.0?true results:flags.1?Vector<PollAnswerVoters> total_voters:flags.2?int recent_voters:flags.3?Vector<Peer> solution:flags.4?string solution_entities:flags.4?Vector<MessageEntity> = PollResults;
chatOnlines#f041e250 onlines:int = ChatOnlines;
statsURL#47a971e0 url:string = StatsURL;
chatAdminRights#5fb224d5 flags:# change_info:flags.0?true post_messages:flags.1?true edit_messages:flags.2?true delete_messages:flags.3?true ban_users:flags.4?true invite_users:flags.5?true pin_messages:flags.7?true add_admins:flags.9?true anonymous:flags.10?true manage_call:flags.11?true other:flags.12?true manage_topics:flags.13?true post_stories:flags.14?true edit_stories:flags.15?true delete_stories:flags.16?true = ChatAdminRights;
chatBannedRights#9f120418 flags:# view_messages:flags.0?true send_messages:flags.1?true send_media:flags.2?true send_stickers:flags.3?true send_gifs:flags.4?true send_games:flags.5?true send_inline:flags.6?true embed_links:flags.7?true send_polls:flags.8?true change_info:flags.10?true invite_users:flags.15?true pin_messages:flags.17?true manage_topics:flags.18?true send_photos:flags.19?true send_videos:flags.20?true send_roundvideos:flags.21?true send_audios:flags.22?true send_voices:flags.23?true send_docs:flags.24?true send_plain:flags.25?true until_date:int = ChatBannedRights;
inputWallPaper#e630b979 id:long access_hash:long = InputWallPaper;
inputWallPaperSlug#72091c80 slug:string = InputWallPaper;
inputWallPaperNoFile#967a462e id:long = InputWallPaper;
account.wallPapersNotModified#1c199183 = account.WallPapers;
account.wallPapers#cdc3858c hash:long wallpapers:Vector<WallPaper> = account.WallPapers;
codeSettings#ad253d78 flags:# allow_flashcall:flags.0?true current_number:flags.1?true allow_app_hash:flags.4?true allow_missed_call:flags.5?true allow_firebase:flags.7?true unknown_number:flags.9?true logout_tokens:flags.6?Vector<bytes> token:flags.8?string app_sandbox:flags.8?Bool = CodeSettings;
wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;
autoDownloadSettings#baa57628 flags:# disabled:flags.0?true video_preload_large:flags.1?true audio_preload_next:flags.2?true phonecalls_less_data:flags.3?true stories_preload:flags.4?true photo_size_max:int video_size_max:long file_size_max:long video_upload_maxbitrate:int small_queue_active_operations_max:int large_queue_active_operations_max:int = AutoDownloadSettings;
account.autoDownloadSettings#63cacf26 low:AutoDownloadSettings medium:AutoDownloadSettings high:AutoDownloadSettings = account.AutoDownloadSettings;
emojiKeyword#d5b3b9f9 keyword:string emoticons:Vector<string> = EmojiKeyword;
emojiKeywordDeleted#236df622 keyword:string emoticons:Vector<string> = EmojiKeyword;
emojiKeywordsDifference#5cc761bd lang_code:string from_version:int version:int keywords:Vector<EmojiKeyword> = EmojiKeywordsDifference;
emojiURL#a575739d url:string = EmojiURL;
emojiLanguage#b3fb5361 lang_code:string = EmojiLanguage;
folder#ff544e65 flags:# autofill_new_broadcasts:flags.0?true autofill_public_groups:flags.1?true autofill_new_correspondents:flags.2?true id:int title:string photo:flags.3?ChatPhoto = Folder;
inputFolderPeer#fbd2c296 peer:InputPeer folder_id:int = InputFolderPeer;
folderPeer#e9baa668 peer:Peer folder_id:int = FolderPeer;
messages.searchCounter#e844ebff flags:# inexact:flags.1?true filter:MessagesFilter count:int = messages.SearchCounter;
urlAuthResultRequest#92d33a0e flags:# request_write_access:flags.0?true bot:User domain:string = UrlAuthResult;
urlAuthResultAccepted#8f8c0e4e url:string = UrlAuthResult;
urlAuthResultDefault#a9d6db1f = UrlAuthResult;
channelLocationEmpty#bfb5ad8b = ChannelLocation;
channelLocation#209b82db geo_point:GeoPoint address:string = ChannelLocation;
peerLocated#ca461b5d peer:Peer expires:int distance:int = PeerLocated;
peerSelfLocated#f8ec284b expires:int = PeerLocated;
restrictionReason#d072acb4 platform:string reason:string text:string = RestrictionReason;
inputTheme#3c5693e9 id:long access_hash:long = InputTheme;
inputThemeSlug#f5890df1 slug:string = InputTheme;
theme#a00e67d6 flags:# creator:flags.0?true default:flags.1?true for_chat:flags.5?true id:long access_hash:long slug:string title:string document:flags.2?Document settings:flags.3?Vector<ThemeSettings> emoticon:flags.6?string installs_count:flags.4?int = Theme;
account.themesNotModified#f41eb622 = account.Themes;
account.themes#9a3d8c6d hash:long themes:Vector<Theme> = account.Themes;
auth.loginToken#629f1980 expires:int token:bytes = auth.LoginToken;
auth.loginTokenMigrateTo#68e9916 dc_id:int token:bytes = auth.LoginToken;
auth.loginTokenSuccess#390d5c5e authorization:auth.Authorization = auth.LoginToken;
account.contentSettings#57e28221 flags:# sensitive_enabled:flags.0?true sensitive_can_change:flags.1?true = account.ContentSettings;
messages.inactiveChats#a927fec5 dates:Vector<int> chats:Vector<Chat> users:Vector<User> = messages.InactiveChats;
baseThemeClassic#c3a12462 = BaseTheme;
baseThemeDay#fbd81688 = BaseTheme;
baseThemeNight#b7b31ea8 = BaseTheme;
baseThemeTinted#6d5f77ee = BaseTheme;
baseThemeArctic#5b11125a = BaseTheme;
inputThemeSettings#8fde504f flags:# message_colors_animated:flags.2?true base_theme:BaseTheme accent_color:int outbox_accent_color:flags.3?int message_colors:flags.0?Vector<int> wallpaper:flags.1?InputWallPaper wallpaper_settings:flags.1?WallPaperSettings = InputThemeSettings;
themeSettings#fa58b6d4 flags:# message_colors_animated:flags.2?true base_theme:BaseTheme accent_color:int outbox_accent_color:flags.3?int message_colors:flags.0?Vector<int> wallpaper:flags.1?WallPaper = ThemeSettings;
webPageAttributeTheme#54b56617 flags:# documents:flags.0?Vector<Document> settings:flags.1?ThemeSettings = WebPageAttribute;
webPageAttributeStory#2e94c3e7 flags:# peer:Peer id:int story:flags.0?StoryItem = WebPageAttribute;
webPageAttributeStickerSet#50cc03d3 flags:# emojis:flags.0?true text_color:flags.1?true stickers:Vector<Document> = WebPageAttribute;
messages.votesList#4899484e flags:# count:int votes:Vector<MessagePeerVote> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.VotesList;
bankCardOpenUrl#f568028a url:string name:string = BankCardOpenUrl;
payments.bankCardData#3e24e573 title:string open_urls:Vector<BankCardOpenUrl> = payments.BankCardData;
dialogFilter#5fb5523b flags:# contacts:flags.0?true non_contacts:flags.1?true groups:flags.2?true broadcasts:flags.3?true bots:flags.4?true exclude_muted:flags.11?true exclude_read:flags.12?true exclude_archived:flags.13?true id:int title:string emoticon:flags.25?string color:flags.27?int pinned_peers:Vector<InputPeer> include_peers:Vector<InputPeer> exclude_peers:Vector<InputPeer> = DialogFilter;
dialogFilterDefault#363293ae = DialogFilter;
dialogFilterChatlist#9fe28ea4 flags:# has_my_invites:flags.26?true id:int title:string emoticon:flags.25?string color:flags.27?int pinned_peers:Vector<InputPeer> include_peers:Vector<InputPeer> = DialogFilter;
dialogFilterSuggested#77744d4a filter:DialogFilter description:string = DialogFilterSuggested;
statsDateRangeDays#b637edaf min_date:int max_date:int = StatsDateRangeDays;
statsAbsValueAndPrev#cb43acde current:double previous:double = StatsAbsValueAndPrev;
statsPercentValue#cbce2fe0 part:double total:double = StatsPercentValue;
statsGraphAsync#4a27eb2d token:string = StatsGraph;
statsGraphError#bedc9822 error:string = StatsGraph;
statsGraph#8ea464b6 flags:# json:DataJSON zoom_token:flags.0?string = StatsGraph;
stats.broadcastStats#396ca5fc period:StatsDateRangeDays followers:StatsAbsValueAndPrev views_per_post:StatsAbsValueAndPrev shares_per_post:StatsAbsValueAndPrev reactions_per_post:StatsAbsValueAndPrev views_per_story:StatsAbsValueAndPrev shares_per_story:StatsAbsValueAndPrev reactions_per_story:StatsAbsValueAndPrev enabled_notifications:StatsPercentValue growth_graph:StatsGraph followers_graph:StatsGraph mute_graph:StatsGraph top_hours_graph:StatsGraph interactions_graph:StatsGraph iv_interactions_graph:StatsGraph views_by_source_graph:StatsGraph new_followers_by_source_graph:StatsGraph languages_graph:StatsGraph reactions_by_emotion_graph:StatsGraph story_interactions_graph:StatsGraph story_reactions_by_emotion_graph:StatsGraph recent_posts_interactions:Vector<PostInteractionCounters> = stats.BroadcastStats;
help.promoDataEmpty#98f6ac75 expires:int = help.PromoData;
help.promoData#8c39793f flags:# proxy:flags.0?true expires:int peer:Peer chats:Vector<Chat> users:Vector<User> psa_type:flags.1?string psa_message:flags.2?string = help.PromoData;
videoSize#de33b094 flags:# type:string w:int h:int size:int video_start_ts:flags.0?double = VideoSize;
videoSizeEmojiMarkup#f85c413c emoji_id:long background_colors:Vector<int> = VideoSize;
videoSizeStickerMarkup#da082fe stickerset:InputStickerSet sticker_id:long background_colors:Vector<int> = VideoSize;
statsGroupTopPoster#9d04af9b user_id:long messages:int avg_chars:int = StatsGroupTopPoster;
statsGroupTopAdmin#d7584c87 user_id:long deleted:int kicked:int banned:int = StatsGroupTopAdmin;
statsGroupTopInviter#535f779d user_id:long invitations:int = StatsGroupTopInviter;
stats.megagroupStats#ef7ff916 period:StatsDateRangeDays members:StatsAbsValueAndPrev messages:StatsAbsValueAndPrev viewers:StatsAbsValueAndPrev posters:StatsAbsValueAndPrev growth_graph:StatsGraph members_graph:StatsGraph new_members_by_source_graph:StatsGraph languages_graph:StatsGraph messages_graph:StatsGraph actions_graph:StatsGraph top_hours_graph:StatsGraph weekdays_graph:StatsGraph top_posters:Vector<StatsGroupTopPoster> top_admins:Vector<StatsGroupTopAdmin> top_inviters:Vector<StatsGroupTopInviter> users:Vector<User> = stats.MegagroupStats;
globalPrivacySettings#734c4ccb flags:# archive_and_mute_new_noncontact_peers:flags.0?true keep_archived_unmuted:flags.1?true keep_archived_folders:flags.2?true hide_read_marks:flags.3?true new_noncontact_peers_require_premium:flags.4?true = GlobalPrivacySettings;
help.countryCode#4203c5ef flags:# country_code:string prefixes:flags.0?Vector<string> patterns:flags.1?Vector<string> = help.CountryCode;
help.country#c3878e23 flags:# hidden:flags.0?true iso2:string default_name:string name:flags.1?string country_codes:Vector<help.CountryCode> = help.Country;
help.countriesListNotModified#93cc1f32 = help.CountriesList;
help.countriesList#87d0759e countries:Vector<help.Country> hash:int = help.CountriesList;
messageViews#455b853d flags:# views:flags.0?int forwards:flags.1?int replies:flags.2?MessageReplies = MessageViews;
messages.messageViews#b6c4f543 views:Vector<MessageViews> chats:Vector<Chat> users:Vector<User> = messages.MessageViews;
messages.discussionMessage#a6341782 flags:# messages:Vector<Message> max_id:flags.0?int read_inbox_max_id:flags.1?int read_outbox_max_id:flags.2?int unread_count:int chats:Vector<Chat> users:Vector<User> = messages.DiscussionMessage;
messageReplyHeader#afbc09db flags:# reply_to_scheduled:flags.2?true forum_topic:flags.3?true quote:flags.9?true reply_to_msg_id:flags.4?int reply_to_peer_id:flags.0?Peer reply_from:flags.5?MessageFwdHeader reply_media:flags.8?MessageMedia reply_to_top_id:flags.1?int quote_text:flags.6?string quote_entities:flags.7?Vector<MessageEntity> quote_offset:flags.10?int = MessageReplyHeader;
messageReplyStoryHeader#e5af939 peer:Peer story_id:int = MessageReplyHeader;
messageReplies#83d60fc2 flags:# comments:flags.0?true replies:int replies_pts:int recent_repliers:flags.1?Vector<Peer> channel_id:flags.0?long max_id:flags.2?int read_max_id:flags.3?int = MessageReplies;
peerBlocked#e8fd8014 peer_id:Peer date:int = PeerBlocked;
stats.messageStats#7fe91c14 views_graph:StatsGraph reactions_by_emotion_graph:StatsGraph = stats.MessageStats;
groupCallDiscarded#7780bcb4 id:long access_hash:long duration:int = GroupCall;
groupCall#d597650c flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int = GroupCall;
inputGroupCall#d8aa840f id:long access_hash:long = InputGroupCall;
groupCallParticipant#eba636fe flags:# muted:flags.0?true left:flags.1?true can_self_unmute:flags.2?true just_joined:flags.4?true versioned:flags.5?true min:flags.8?true muted_by_you:flags.9?true volume_by_admin:flags.10?true self:flags.12?true video_joined:flags.15?true peer:Peer date:int active_date:flags.3?int source:int volume:flags.7?int about:flags.11?string raise_hand_rating:flags.13?long video:flags.6?GroupCallParticipantVideo presentation:flags.14?GroupCallParticipantVideo = GroupCallParticipant;
phone.groupCall#9e727aad call:GroupCall participants:Vector<GroupCallParticipant> participants_next_offset:string chats:Vector<Chat> users:Vector<User> = phone.GroupCall;
phone.groupParticipants#f47751b6 count:int participants:Vector<GroupCallParticipant> next_offset:string chats:Vector<Chat> users:Vector<User> version:int = phone.GroupParticipants;
inlineQueryPeerTypeSameBotPM#3081ed9d = InlineQueryPeerType;
inlineQueryPeerTypePM#833c0fac = InlineQueryPeerType;
inlineQueryPeerTypeChat#d766c50a = InlineQueryPeerType;
inlineQueryPeerTypeMegagroup#5ec4be43 = InlineQueryPeerType;
inlineQueryPeerTypeBroadcast#6334ee9a = InlineQueryPeerType;
inlineQueryPeerTypeBotPM#e3b2d0c = InlineQueryPeerType;
messages.historyImport#1662af0b id:long = messages.HistoryImport;
messages.historyImportParsed#5e0fb7b9 flags:# pm:flags.0?true group:flags.1?true title:flags.2?string = messages.HistoryImportParsed;
messages.affectedFoundMessages#ef8d3e6c pts:int pts_count:int offset:int messages:Vector<int> = messages.AffectedFoundMessages;
chatInviteImporter#8c5adfd9 flags:# requested:flags.0?true via_chatlist:flags.3?true user_id:long date:int about:flags.2?string approved_by:flags.1?long = ChatInviteImporter;
messages.exportedChatInvites#bdc62dcc count:int invites:Vector<ExportedChatInvite> users:Vector<User> = messages.ExportedChatInvites;
messages.exportedChatInvite#1871be50 invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
messages.exportedChatInviteReplaced#222600ef invite:ExportedChatInvite new_invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
messages.chatInviteImporters#81b6b00a count:int importers:Vector<ChatInviteImporter> users:Vector<User> = messages.ChatInviteImporters;
chatAdminWithInvites#f2ecef23 admin_id:long invites_count:int revoked_invites_count:int = ChatAdminWithInvites;
messages.chatAdminsWithInvites#b69b72d7 admins:Vector<ChatAdminWithInvites> users:Vector<User> = messages.ChatAdminsWithInvites;
messages.checkedHistoryImportPeer#a24de717 confirm_text:string = messages.CheckedHistoryImportPeer;
phone.joinAsPeers#afe5623f peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = phone.JoinAsPeers;
phone.exportedGroupCallInvite#204bd158 link:string = phone.ExportedGroupCallInvite;
groupCallParticipantVideoSourceGroup#dcb118b7 semantics:string sources:Vector<int> = GroupCallParticipantVideoSourceGroup;
groupCallParticipantVideo#67753ac8 flags:# paused:flags.0?true endpoint:string source_groups:Vector<GroupCallParticipantVideoSourceGroup> audio_source:flags.1?int = GroupCallParticipantVideo;
stickers.suggestedShortName#85fea03f short_name:string = stickers.SuggestedShortName;
botCommandScopeDefault#2f6cb2ab = BotCommandScope;
botCommandScopeUsers#3c4f04d8 = BotCommandScope;
botCommandScopeChats#6fe1a881 = BotCommandScope;
botCommandScopeChatAdmins#b9aa606a = BotCommandScope;
botCommandScopePeer#db9d897d peer:InputPeer = BotCommandScope;
botCommandScopePeerAdmins#3fd863d1 peer:InputPeer = BotCommandScope;
botCommandScopePeerUser#a1321f3 peer:InputPeer user_id:InputUser = BotCommandScope;
account.resetPasswordFailedWait#e3779861 retry_date:int = account.ResetPasswordResult;
account.resetPasswordRequestedWait#e9effc7d until_date:int = account.ResetPasswordResult;
account.resetPasswordOk#e926d63e = account.ResetPasswordResult;
sponsoredMessage#bdedf566 flags:# recommended:flags.5?true can_report:flags.12?true random_id:bytes url:string title:string message:string entities:flags.1?Vector<MessageEntity> photo:flags.6?Photo color:flags.13?PeerColor button_text:string sponsor_info:flags.7?string additional_info:flags.8?string = SponsoredMessage;
messages.sponsoredMessages#c9ee1d87 flags:# posts_between:flags.0?int messages:Vector<SponsoredMessage> chats:Vector<Chat> users:Vector<User> = messages.SponsoredMessages;
messages.sponsoredMessagesEmpty#1839490f = messages.SponsoredMessages;
searchResultsCalendarPeriod#c9b0539f date:int min_msg_id:int max_msg_id:int count:int = SearchResultsCalendarPeriod;
messages.searchResultsCalendar#147ee23c flags:# inexact:flags.0?true count:int min_date:int min_msg_id:int offset_id_offset:flags.1?int periods:Vector<SearchResultsCalendarPeriod> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SearchResultsCalendar;
searchResultPosition#7f648b67 msg_id:int date:int offset:int = SearchResultsPosition;
messages.searchResultsPositions#53b22baf count:int positions:Vector<SearchResultsPosition> = messages.SearchResultsPositions;
channels.sendAsPeers#f496b0c6 peers:Vector<SendAsPeer> chats:Vector<Chat> users:Vector<User> = channels.SendAsPeers;
users.userFull#3b6d152e full_user:UserFull chats:Vector<Chat> users:Vector<User> = users.UserFull;
messages.peerSettings#6880b94d settings:PeerSettings chats:Vector<Chat> users:Vector<User> = messages.PeerSettings;
auth.loggedOut#c3a2835f flags:# future_auth_token:flags.0?bytes = auth.LoggedOut;
reactionCount#a3d1cb80 flags:# chosen_order:flags.0?int reaction:Reaction count:int = ReactionCount;
messageReactions#4f2b9479 flags:# min:flags.0?true can_see_list:flags.2?true reactions_as_tags:flags.3?true results:Vector<ReactionCount> recent_reactions:flags.1?Vector<MessagePeerReaction> = MessageReactions;
messages.messageReactionsList#31bd492d flags:# count:int reactions:Vector<MessagePeerReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.MessageReactionsList;
availableReaction#c077ec01 flags:# inactive:flags.0?true premium:flags.2?true reaction:string title:string static_icon:Document appear_animation:Document select_animation:Document activate_animation:Document effect_animation:Document around_animation:flags.1?Document center_icon:flags.1?Document = AvailableReaction;
messages.availableReactionsNotModified#9f071957 = messages.AvailableReactions;
messages.availableReactions#768e3aad hash:int reactions:Vector<AvailableReaction> = messages.AvailableReactions;
messagePeerReaction#8c79b63c flags:# big:flags.0?true unread:flags.1?true my:flags.2?true peer_id:Peer date:int reaction:Reaction = MessagePeerReaction;
groupCallStreamChannel#80eb48af channel:int scale:int last_timestamp_ms:long = GroupCallStreamChannel;
phone.groupCallStreamChannels#d0e482b2 channels:Vector<GroupCallStreamChannel> = phone.GroupCallStreamChannels;
phone.groupCallStreamRtmpUrl#2dbf3432 url:string key:string = phone.GroupCallStreamRtmpUrl;
attachMenuBotIconColor#4576f3f0 name:string color:int = AttachMenuBotIconColor;
attachMenuBotIcon#b2a7386b flags:# name:string icon:Document colors:flags.0?Vector<AttachMenuBotIconColor> = AttachMenuBotIcon;
attachMenuBot#d90d8dfe flags:# inactive:flags.0?true has_settings:flags.1?true request_write_access:flags.2?true show_in_attach_menu:flags.3?true show_in_side_menu:flags.4?true side_menu_disclaimer_needed:flags.5?true bot_id:long short_name:string peer_types:flags.3?Vector<AttachMenuPeerType> icons:Vector<AttachMenuBotIcon> = AttachMenuBot;
attachMenuBotsNotModified#f1d88a5c = AttachMenuBots;
attachMenuBots#3c4301c0 hash:long bots:Vector<AttachMenuBot> users:Vector<User> = AttachMenuBots;
attachMenuBotsBot#93bf667f bot:AttachMenuBot users:Vector<User> = AttachMenuBotsBot;
webViewResultUrl#4d22ff98 flags:# fullsize:flags.1?true query_id:flags.0?long url:string = WebViewResult;
webViewMessageSent#c94511c flags:# msg_id:flags.0?InputBotInlineMessageID = WebViewMessageSent;
botMenuButtonDefault#7533a588 = BotMenuButton;
botMenuButtonCommands#4258c205 = BotMenuButton;
botMenuButton#c7b57ce6 text:string url:string = BotMenuButton;
account.savedRingtonesNotModified#fbf6e8b1 = account.SavedRingtones;
account.savedRingtones#c1e92cc5 hash:long ringtones:Vector<Document> = account.SavedRingtones;
notificationSoundDefault#97e8bebe = NotificationSound;
notificationSoundNone#6f0c34df = NotificationSound;
notificationSoundLocal#830b9ae4 title:string data:string = NotificationSound;
notificationSoundRingtone#ff6c8049 id:long = NotificationSound;
account.savedRingtone#b7263f6d = account.SavedRingtone;
account.savedRingtoneConverted#1f307eb7 document:Document = account.SavedRingtone;
attachMenuPeerTypeSameBotPM#7d6be90e = AttachMenuPeerType;
attachMenuPeerTypeBotPM#c32bfa1a = AttachMenuPeerType;
attachMenuPeerTypePM#f146d31f = AttachMenuPeerType;
attachMenuPeerTypeChat#509113f = AttachMenuPeerType;
attachMenuPeerTypeBroadcast#7bfbdefc = AttachMenuPeerType;
inputInvoiceMessage#c5b56859 peer:InputPeer msg_id:int = InputInvoice;
inputInvoiceSlug#c326caef slug:string = InputInvoice;
inputInvoicePremiumGiftCode#98986c0d purpose:InputStorePaymentPurpose option:PremiumGiftCodeOption = InputInvoice;
inputInvoiceStars#1da33ad8 option:StarsTopupOption = InputInvoice;
payments.exportedInvoice#aed0cbd9 url:string = payments.ExportedInvoice;
messages.transcribedAudio#cfb9d957 flags:# pending:flags.0?true transcription_id:long text:string trial_remains_num:flags.1?int trial_remains_until_date:flags.1?int = messages.TranscribedAudio;
help.premiumPromo#5334759c status_text:string status_entities:Vector<MessageEntity> video_sections:Vector<string> videos:Vector<Document> period_options:Vector<PremiumSubscriptionOption> users:Vector<User> = help.PremiumPromo;
inputStorePaymentPremiumSubscription#a6751e66 flags:# restore:flags.0?true upgrade:flags.1?true = InputStorePaymentPurpose;
inputStorePaymentGiftPremium#616f7fe8 user_id:InputUser currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentPremiumGiftCode#a3805f3f flags:# users:Vector<InputUser> boost_peer:flags.0?InputPeer currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentPremiumGiveaway#160544ca flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentStars#4f0ee8df flags:# stars:long currency:string amount:long = InputStorePaymentPurpose;
premiumGiftOption#74c34319 flags:# months:int currency:string amount:long bot_url:string store_product:flags.0?string = PremiumGiftOption;
paymentFormMethod#88f8f21b url:string title:string = PaymentFormMethod;
emojiStatusEmpty#2de11aae = EmojiStatus;
emojiStatus#929b619d document_id:long = EmojiStatus;
emojiStatusUntil#fa30a8c7 document_id:long until:int = EmojiStatus;
account.emojiStatusesNotModified#d08ce645 = account.EmojiStatuses;
account.emojiStatuses#90c467d1 hash:long statuses:Vector<EmojiStatus> = account.EmojiStatuses;
reactionEmpty#79f5d419 = Reaction;
reactionEmoji#1b2286b8 emoticon:string = Reaction;
reactionCustomEmoji#8935fc73 document_id:long = Reaction;
chatReactionsNone#eafc32bc = ChatReactions;
chatReactionsAll#52928bca flags:# allow_custom:flags.0?true = ChatReactions;
chatReactionsSome#661d4037 reactions:Vector<Reaction> = ChatReactions;
messages.reactionsNotModified#b06fdbdf = messages.Reactions;
messages.reactions#eafdf716 hash:long reactions:Vector<Reaction> = messages.Reactions;
emailVerifyPurposeLoginSetup#4345be73 phone_number:string phone_code_hash:string = EmailVerifyPurpose;
emailVerifyPurposeLoginChange#527d22eb = EmailVerifyPurpose;
emailVerifyPurposePassport#bbf51685 = EmailVerifyPurpose;
emailVerificationCode#922e55a9 code:string = EmailVerification;
emailVerificationGoogle#db909ec2 token:string = EmailVerification;
emailVerificationApple#96d074fd token:string = EmailVerification;
account.emailVerified#2b96cd1b email:string = account.EmailVerified;
account.emailVerifiedLogin#e1bb0d61 email:string sent_code:auth.SentCode = account.EmailVerified;
premiumSubscriptionOption#5f2d1df2 flags:# current:flags.1?true can_purchase_upgrade:flags.2?true transaction:flags.3?string months:int currency:string amount:long bot_url:string store_product:flags.0?string = PremiumSubscriptionOption;
sendAsPeer#b81c7034 flags:# premium_required:flags.0?true peer:Peer = SendAsPeer;
messageExtendedMediaPreview#ad628cc8 flags:# w:flags.0?int h:flags.0?int thumb:flags.1?PhotoSize video_duration:flags.2?int = MessageExtendedMedia;
messageExtendedMedia#ee479c64 media:MessageMedia = MessageExtendedMedia;
stickerKeyword#fcfeb29c document_id:long keyword:Vector<string> = StickerKeyword;
username#b4073647 flags:# editable:flags.0?true active:flags.1?true username:string = Username;
forumTopicDeleted#23f109b id:int = ForumTopic;
forumTopic#71701da9 flags:# my:flags.1?true closed:flags.2?true pinned:flags.3?true short:flags.5?true hidden:flags.6?true id:int date:int title:string icon_color:int icon_emoji_id:flags.0?long top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int from_id:Peer notify_settings:PeerNotifySettings draft:flags.4?DraftMessage = ForumTopic;
messages.forumTopics#367617d3 flags:# order_by_create_date:flags.0?true count:int topics:Vector<ForumTopic> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> pts:int = messages.ForumTopics;
defaultHistoryTTL#43b46b20 period:int = DefaultHistoryTTL;
exportedContactToken#41bf109b url:string expires:int = ExportedContactToken;
requestPeerTypeUser#5f3b8a00 flags:# bot:flags.0?Bool premium:flags.1?Bool = RequestPeerType;
requestPeerTypeChat#c9f06e1b flags:# creator:flags.0?true bot_participant:flags.5?true has_username:flags.3?Bool forum:flags.4?Bool user_admin_rights:flags.1?ChatAdminRights bot_admin_rights:flags.2?ChatAdminRights = RequestPeerType;
requestPeerTypeBroadcast#339bef6c flags:# creator:flags.0?true has_username:flags.3?Bool user_admin_rights:flags.1?ChatAdminRights bot_admin_rights:flags.2?ChatAdminRights = RequestPeerType;
emojiListNotModified#481eadfa = EmojiList;
emojiList#7a1e11d1 hash:long document_id:Vector<long> = EmojiList;
emojiGroup#7a9abda9 title:string icon_emoji_id:long emoticons:Vector<string> = EmojiGroup;
emojiGroupGreeting#80d26cc7 title:string icon_emoji_id:long emoticons:Vector<string> = EmojiGroup;
emojiGroupPremium#93bcf34 title:string icon_emoji_id:long = EmojiGroup;
messages.emojiGroupsNotModified#6fb4ad87 = messages.EmojiGroups;
messages.emojiGroups#881fb94b hash:int groups:Vector<EmojiGroup> = messages.EmojiGroups;
textWithEntities#751f3146 text:string entities:Vector<MessageEntity> = TextWithEntities;
messages.translateResult#33db32f8 result:Vector<TextWithEntities> = messages.TranslatedText;
autoSaveSettings#c84834ce flags:# photos:flags.0?true videos:flags.1?true video_max_size:flags.2?long = AutoSaveSettings;
autoSaveException#81602d47 peer:Peer settings:AutoSaveSettings = AutoSaveException;
account.autoSaveSettings#4c3e069d users_settings:AutoSaveSettings chats_settings:AutoSaveSettings broadcasts_settings:AutoSaveSettings exceptions:Vector<AutoSaveException> chats:Vector<Chat> users:Vector<User> = account.AutoSaveSettings;
help.appConfigNotModified#7cde641d = help.AppConfig;
help.appConfig#dd18782e hash:int config:JSONValue = help.AppConfig;
inputBotAppID#a920bd7a id:long access_hash:long = InputBotApp;
inputBotAppShortName#908c0407 bot_id:InputUser short_name:string = InputBotApp;
botAppNotModified#5da674b7 = BotApp;
botApp#95fcd1d6 flags:# id:long access_hash:long short_name:string title:string description:string photo:Photo document:flags.0?Document hash:long = BotApp;
messages.botApp#eb50adf5 flags:# inactive:flags.0?true request_write_access:flags.1?true has_settings:flags.2?true app:BotApp = messages.BotApp;
inlineBotWebView#b57295d5 text:string url:string = InlineBotWebView;
readParticipantDate#4a4ff172 user_id:long date:int = ReadParticipantDate;
inputChatlistDialogFilter#f3e0da33 filter_id:int = InputChatlist;
exportedChatlistInvite#c5181ac flags:# title:string url:string peers:Vector<Peer> = ExportedChatlistInvite;
chatlists.exportedChatlistInvite#10e6e3a6 filter:DialogFilter invite:ExportedChatlistInvite = chatlists.ExportedChatlistInvite;
chatlists.exportedInvites#10ab6dc7 invites:Vector<ExportedChatlistInvite> chats:Vector<Chat> users:Vector<User> = chatlists.ExportedInvites;
chatlists.chatlistInviteAlready#fa87f659 filter_id:int missing_peers:Vector<Peer> already_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;
chatlists.chatlistInvite#1dcd839d flags:# title:string emoticon:flags.0?string peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;
chatlists.chatlistUpdates#93bd878d missing_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistUpdates;
bots.botInfo#e8a775b0 name:string about:string description:string = bots.BotInfo;
messagePeerVote#b6cc2d5c peer:Peer option:bytes date:int = MessagePeerVote;
messagePeerVoteInputOption#74cda504 peer:Peer date:int = MessagePeerVote;
messagePeerVoteMultiple#4628f6e6 peer:Peer options:Vector<bytes> date:int = MessagePeerVote;
storyViews#8d595cd6 flags:# has_viewers:flags.1?true views_count:int forwards_count:flags.2?int reactions:flags.3?Vector<ReactionCount> reactions_count:flags.4?int recent_viewers:flags.0?Vector<long> = StoryViews;
storyItemDeleted#51e6ee4f id:int = StoryItem;
storyItemSkipped#ffadc913 flags:# close_friends:flags.8?true id:int date:int expire_date:int = StoryItem;
storyItem#79b26a24 flags:# pinned:flags.5?true public:flags.7?true close_friends:flags.8?true min:flags.9?true noforwards:flags.10?true edited:flags.11?true contacts:flags.12?true selected_contacts:flags.13?true out:flags.16?true id:int date:int from_id:flags.18?Peer fwd_from:flags.17?StoryFwdHeader expire_date:int caption:flags.0?string entities:flags.1?Vector<MessageEntity> media:MessageMedia media_areas:flags.14?Vector<MediaArea> privacy:flags.2?Vector<PrivacyRule> views:flags.3?StoryViews sent_reaction:flags.15?Reaction = StoryItem;
stories.allStoriesNotModified#1158fe3e flags:# state:string stealth_mode:StoriesStealthMode = stories.AllStories;
stories.allStories#6efc5e81 flags:# has_more:flags.0?true count:int state:string peer_stories:Vector<PeerStories> chats:Vector<Chat> users:Vector<User> stealth_mode:StoriesStealthMode = stories.AllStories;
stories.stories#63c3dd0a flags:# count:int stories:Vector<StoryItem> pinned_to_top:flags.0?Vector<int> chats:Vector<Chat> users:Vector<User> = stories.Stories;
storyView#b0bdeac5 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true user_id:long date:int reaction:flags.2?Reaction = StoryView;
storyViewPublicForward#9083670b flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true message:Message = StoryView;
storyViewPublicRepost#bd74cf49 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true peer_id:Peer story:StoryItem = StoryView;
stories.storyViewsList#59d78fc5 flags:# count:int views_count:int forwards_count:int reactions_count:int views:Vector<StoryView> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryViewsList;
stories.storyViews#de9eed1d views:Vector<StoryViews> users:Vector<User> = stories.StoryViews;
inputReplyToMessage#22c0f6d5 flags:# reply_to_msg_id:int top_msg_id:flags.0?int reply_to_peer_id:flags.1?InputPeer quote_text:flags.2?string quote_entities:flags.3?Vector<MessageEntity> quote_offset:flags.4?int = InputReplyTo;
inputReplyToStory#5881323a peer:InputPeer story_id:int = InputReplyTo;
exportedStoryLink#3fc9053b link:string = ExportedStoryLink;
storiesStealthMode#712e27fd flags:# active_until_date:flags.0?int cooldown_until_date:flags.1?int = StoriesStealthMode;
mediaAreaCoordinates#cfc9e002 flags:# x:double y:double w:double h:double rotation:double radius:flags.0?double = MediaAreaCoordinates;
mediaAreaVenue#be82db9c coordinates:MediaAreaCoordinates geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string = MediaArea;
inputMediaAreaVenue#b282217f coordinates:MediaAreaCoordinates query_id:long result_id:string = MediaArea;
mediaAreaGeoPoint#cad5452d flags:# coordinates:MediaAreaCoordinates geo:GeoPoint address:flags.0?GeoPointAddress = MediaArea;
mediaAreaSuggestedReaction#14455871 flags:# dark:flags.0?true flipped:flags.1?true coordinates:MediaAreaCoordinates reaction:Reaction = MediaArea;
mediaAreaChannelPost#770416af coordinates:MediaAreaCoordinates channel_id:long msg_id:int = MediaArea;
inputMediaAreaChannelPost#2271f2bf coordinates:MediaAreaCoordinates channel:InputChannel msg_id:int = MediaArea;
mediaAreaUrl#37381085 coordinates:MediaAreaCoordinates url:string = MediaArea;
peerStories#9a35e999 flags:# peer:Peer max_read_id:flags.0?int stories:Vector<StoryItem> = PeerStories;
stories.peerStories#cae68768 stories:PeerStories chats:Vector<Chat> users:Vector<User> = stories.PeerStories;
messages.webPage#fd5e12bd webpage:WebPage chats:Vector<Chat> users:Vector<User> = messages.WebPage;
premiumGiftCodeOption#257e962b flags:# users:int months:int store_product:flags.0?string store_quantity:flags.1?int currency:string amount:long = PremiumGiftCodeOption;
payments.checkedGiftCode#284a1096 flags:# via_giveaway:flags.2?true from_id:flags.4?Peer giveaway_msg_id:flags.3?int to_id:flags.0?long date:int months:int used_date:flags.1?int chats:Vector<Chat> users:Vector<User> = payments.CheckedGiftCode;
payments.giveawayInfo#4367daa0 flags:# participating:flags.0?true preparing_results:flags.3?true start_date:int joined_too_early_date:flags.1?int admin_disallowed_chat_id:flags.2?long disallowed_country:flags.4?string = payments.GiveawayInfo;
payments.giveawayInfoResults#cd5570 flags:# winner:flags.0?true refunded:flags.1?true start_date:int gift_code_slug:flags.0?string finish_date:int winners_count:int activated_count:int = payments.GiveawayInfo;
prepaidGiveaway#b2539d54 id:long months:int quantity:int date:int = PrepaidGiveaway;
boost#2a1c8c71 flags:# gift:flags.1?true giveaway:flags.2?true unclaimed:flags.3?true id:string user_id:flags.0?long giveaway_msg_id:flags.2?int date:int expires:int used_gift_slug:flags.4?string multiplier:flags.5?int = Boost;
premium.boostsList#86f8613c flags:# count:int boosts:Vector<Boost> next_offset:flags.0?string users:Vector<User> = premium.BoostsList;
myBoost#c448415c flags:# slot:int peer:flags.0?Peer date:int expires:int cooldown_until_date:flags.1?int = MyBoost;
premium.myBoosts#9ae228e2 my_boosts:Vector<MyBoost> chats:Vector<Chat> users:Vector<User> = premium.MyBoosts;
premium.boostsStatus#4959427a flags:# my_boost:flags.2?true level:int current_level_boosts:int boosts:int gift_boosts:flags.4?int next_level_boosts:flags.0?int premium_audience:flags.1?StatsPercentValue boost_url:string prepaid_giveaways:flags.3?Vector<PrepaidGiveaway> my_boost_slots:flags.2?Vector<int> = premium.BoostsStatus;
storyFwdHeader#b826e150 flags:# modified:flags.3?true from:flags.0?Peer from_name:flags.1?string story_id:flags.2?int = StoryFwdHeader;
postInteractionCountersMessage#e7058e7f msg_id:int views:int forwards:int reactions:int = PostInteractionCounters;
postInteractionCountersStory#8a480e27 story_id:int views:int forwards:int reactions:int = PostInteractionCounters;
stats.storyStats#50cd067c views_graph:StatsGraph reactions_by_emotion_graph:StatsGraph = stats.StoryStats;
publicForwardMessage#1f2bf4a message:Message = PublicForward;
publicForwardStory#edf3add0 peer:Peer story:StoryItem = PublicForward;
stats.publicForwards#93037e20 flags:# count:int forwards:Vector<PublicForward> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stats.PublicForwards;
peerColor#b54b5acf flags:# color:flags.0?int background_emoji_id:flags.1?long = PeerColor;
help.peerColorSet#26219a58 colors:Vector<int> = help.PeerColorSet;
help.peerColorProfileSet#767d61eb palette_colors:Vector<int> bg_colors:Vector<int> story_colors:Vector<int> = help.PeerColorSet;
help.peerColorOption#adec6ebe flags:# hidden:flags.0?true color_id:int colors:flags.1?help.PeerColorSet dark_colors:flags.2?help.PeerColorSet channel_min_level:flags.3?int group_min_level:flags.4?int = help.PeerColorOption;
help.peerColorsNotModified#2ba1f5ce = help.PeerColors;
help.peerColors#f8ed08 hash:int colors:Vector<help.PeerColorOption> = help.PeerColors;
storyReaction#6090d6d5 peer_id:Peer date:int reaction:Reaction = StoryReaction;
storyReactionPublicForward#bbab2643 message:Message = StoryReaction;
storyReactionPublicRepost#cfcd0f13 peer_id:Peer story:StoryItem = StoryReaction;
stories.storyReactionsList#aa5f789c flags:# count:int reactions:Vector<StoryReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryReactionsList;
savedDialog#bd87cb6c flags:# pinned:flags.2?true peer:Peer top_message:int = SavedDialog;
messages.savedDialogs#f83ae221 dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsSlice#44ba9dd9 count:int dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsNotModified#c01f6fe8 count:int = messages.SavedDialogs;
savedReactionTag#cb6ff828 flags:# reaction:Reaction title:flags.0?string count:int = SavedReactionTag;
messages.savedReactionTagsNotModified#889b59ef = messages.SavedReactionTags;
messages.savedReactionTags#3259950a tags:Vector<SavedReactionTag> hash:long = messages.SavedReactionTags;
outboxReadDate#3bb842ac date:int = OutboxReadDate;
smsjobs.eligibleToJoin#dc8b44cf terms_url:string monthly_sent_sms:int = smsjobs.EligibilityToJoin;
smsjobs.status#2aee9191 flags:# allow_international:flags.0?true recent_sent:int recent_since:int recent_remains:int total_sent:int total_since:int last_gift_slug:flags.1?string terms_url:string = smsjobs.Status;
smsJob#e6a1eeb8 job_id:string phone_number:string text:string = SmsJob;
businessWeeklyOpen#120b1ab9 start_minute:int end_minute:int = BusinessWeeklyOpen;
businessWorkHours#8c92b098 flags:# open_now:flags.0?true timezone_id:string weekly_open:Vector<BusinessWeeklyOpen> = BusinessWorkHours;
businessLocation#ac5c1af7 flags:# geo_point:flags.0?GeoPoint address:string = BusinessLocation;
inputBusinessRecipients#6f8b32aa flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<InputUser> = InputBusinessRecipients;
businessRecipients#21108ff7 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> = BusinessRecipients;
businessAwayMessageScheduleAlways#c9b9e2b9 = BusinessAwayMessageSchedule;
businessAwayMessageScheduleOutsideWorkHours#c3f2f501 = BusinessAwayMessageSchedule;
businessAwayMessageScheduleCustom#cc4d9ecc start_date:int end_date:int = BusinessAwayMessageSchedule;
inputBusinessGreetingMessage#194cb3b shortcut_id:int recipients:InputBusinessRecipients no_activity_days:int = InputBusinessGreetingMessage;
businessGreetingMessage#e519abab shortcut_id:int recipients:BusinessRecipients no_activity_days:int = BusinessGreetingMessage;
inputBusinessAwayMessage#832175e0 flags:# offline_only:flags.0?true shortcut_id:int schedule:BusinessAwayMessageSchedule recipients:InputBusinessRecipients = InputBusinessAwayMessage;
businessAwayMessage#ef156a5c flags:# offline_only:flags.0?true shortcut_id:int schedule:BusinessAwayMessageSchedule recipients:BusinessRecipients = BusinessAwayMessage;
timezone#ff9289f5 id:string name:string utc_offset:int = Timezone;
help.timezonesListNotModified#970708cc = help.TimezonesList;
help.timezonesList#7b74ed71 timezones:Vector<Timezone> hash:int = help.TimezonesList;
quickReply#697102b shortcut_id:int shortcut:string top_message:int count:int = QuickReply;
inputQuickReplyShortcut#24596d41 shortcut:string = InputQuickReplyShortcut;
inputQuickReplyShortcutId#1190cf1 shortcut_id:int = InputQuickReplyShortcut;
messages.quickReplies#c68d6695 quick_replies:Vector<QuickReply> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.QuickReplies;
messages.quickRepliesNotModified#5f91eb5b = messages.QuickReplies;
connectedBot#bd068601 flags:# can_reply:flags.0?true bot_id:long recipients:BusinessBotRecipients = ConnectedBot;
account.connectedBots#17d7f87b connected_bots:Vector<ConnectedBot> users:Vector<User> = account.ConnectedBots;
messages.dialogFilters#2ad93719 flags:# tags_enabled:flags.0?true filters:Vector<DialogFilter> = messages.DialogFilters;
birthday#6c8e1e06 flags:# day:int month:int year:flags.0?int = Birthday;
botBusinessConnection#896433b4 flags:# can_reply:flags.0?true disabled:flags.1?true connection_id:string user_id:long dc_id:int date:int = BotBusinessConnection;
inputBusinessIntro#9c469cd flags:# title:string description:string sticker:flags.0?InputDocument = InputBusinessIntro;
businessIntro#5a0a066d flags:# title:string description:string sticker:flags.0?Document = BusinessIntro;
messages.myStickers#faff629d count:int sets:Vector<StickerSetCovered> = messages.MyStickers;
inputCollectibleUsername#e39460a9 username:string = InputCollectible;
inputCollectiblePhone#a2e214a4 phone:string = InputCollectible;
fragment.collectibleInfo#6ebdff91 purchase_date:int currency:string amount:long crypto_currency:string crypto_amount:long url:string = fragment.CollectibleInfo;
inputBusinessBotRecipients#c4e5921e flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<InputUser> exclude_users:flags.6?Vector<InputUser> = InputBusinessBotRecipients;
businessBotRecipients#b88cf373 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> exclude_users:flags.6?Vector<long> = BusinessBotRecipients;
contactBirthday#1d998733 contact_id:long birthday:Birthday = ContactBirthday;
contacts.contactBirthdays#114ff30d contacts:Vector<ContactBirthday> users:Vector<User> = contacts.ContactBirthdays;
missingInvitee#628c9224 flags:# premium_would_allow_invite:flags.0?true premium_required_for_pm:flags.1?true user_id:long = MissingInvitee;
messages.invitedUsers#7f5defa6 updates:Updates missing_invitees:Vector<MissingInvitee> = messages.InvitedUsers;
inputBusinessChatLink#11679fa7 flags:# message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string = InputBusinessChatLink;
businessChatLink#b4ae666f flags:# link:string message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string views:int = BusinessChatLink;
account.businessChatLinks#ec43a2d1 links:Vector<BusinessChatLink> chats:Vector<Chat> users:Vector<User> = account.BusinessChatLinks;
account.resolvedBusinessChatLinks#9a23af21 flags:# peer:Peer message:string entities:flags.0?Vector<MessageEntity> chats:Vector<Chat> users:Vector<User> = account.ResolvedBusinessChatLinks;
requestedPeerUser#d62ff46a flags:# user_id:long first_name:flags.0?string last_name:flags.0?string username:flags.1?string photo:flags.2?Photo = RequestedPeer;
requestedPeerChat#7307544f flags:# chat_id:long title:flags.0?string photo:flags.2?Photo = RequestedPeer;
requestedPeerChannel#8ba403e4 flags:# channel_id:long title:flags.0?string username:flags.1?string photo:flags.2?Photo = RequestedPeer;
sponsoredMessageReportOption#430d3150 text:string option:bytes = SponsoredMessageReportOption;
channels.sponsoredMessageReportResultChooseOption#846f9e42 title:string options:Vector<SponsoredMessageReportOption> = channels.SponsoredMessageReportResult;
channels.sponsoredMessageReportResultAdsHidden#3e3bcf2f = channels.SponsoredMessageReportResult;
channels.sponsoredMessageReportResultReported#ad798849 = channels.SponsoredMessageReportResult;
stats.broadcastRevenueStats#5407e297 top_hours_graph:StatsGraph revenue_graph:StatsGraph balances:BroadcastRevenueBalances usd_rate:double = stats.BroadcastRevenueStats;
stats.broadcastRevenueWithdrawalUrl#ec659737 url:string = stats.BroadcastRevenueWithdrawalUrl;
broadcastRevenueTransactionProceeds#557e2cc4 amount:long from_date:int to_date:int = BroadcastRevenueTransaction;
broadcastRevenueTransactionWithdrawal#5a590978 flags:# pending:flags.0?true failed:flags.2?true amount:long date:int provider:string transaction_date:flags.1?int transaction_url:flags.1?string = BroadcastRevenueTransaction;
broadcastRevenueTransactionRefund#42d30d2e amount:long date:int provider:string = BroadcastRevenueTransaction;
stats.broadcastRevenueTransactions#87158466 count:int transactions:Vector<BroadcastRevenueTransaction> = stats.BroadcastRevenueTransactions;
reactionNotificationsFromContacts#bac3a61a = ReactionNotificationsFrom;
reactionNotificationsFromAll#4b9e22a0 = ReactionNotificationsFrom;
reactionsNotifySettings#56e34970 flags:# messages_notify_from:flags.0?ReactionNotificationsFrom stories_notify_from:flags.1?ReactionNotificationsFrom sound:NotificationSound show_previews:Bool = ReactionsNotifySettings;
broadcastRevenueBalances#8438f1c6 current_balance:long available_balance:long overall_revenue:long = BroadcastRevenueBalances;
availableEffect#93c3e27e flags:# premium_required:flags.2?true id:long emoticon:string static_icon_id:flags.0?long effect_sticker_id:long effect_animation_id:flags.1?long = AvailableEffect;
messages.availableEffectsNotModified#d1ed9a5b = messages.AvailableEffects;
messages.availableEffects#bddb616e hash:int effects:Vector<AvailableEffect> documents:Vector<Document> = messages.AvailableEffects;
factCheck#b89bfccf flags:# need_check:flags.0?true country:flags.1?string text:flags.1?TextWithEntities hash:long = FactCheck;
starsTransactionPeerUnsupported#95f2bfe4 = StarsTransactionPeer;
starsTransactionPeerAppStore#b457b375 = StarsTransactionPeer;
starsTransactionPeerPlayMarket#7b560a0b = StarsTransactionPeer;
starsTransactionPeerPremiumBot#250dbaf8 = StarsTransactionPeer;
starsTransactionPeerFragment#e92fd902 = StarsTransactionPeer;
starsTransactionPeer#d80da15d peer:Peer = StarsTransactionPeer;
starsTransactionPeerAds#60682812 = StarsTransactionPeer;
starsTopupOption#bd915c0 flags:# extended:flags.1?true stars:long store_product:flags.0?string currency:string amount:long = StarsTopupOption;
starsTransaction#2db5418f flags:# refund:flags.3?true pending:flags.4?true failed:flags.6?true id:string stars:long date:int peer:StarsTransactionPeer title:flags.0?string description:flags.1?string photo:flags.2?WebDocument transaction_date:flags.5?int transaction_url:flags.5?string bot_payload:flags.7?bytes msg_id:flags.8?int extended_media:flags.9?Vector<MessageMedia> = StarsTransaction;
payments.starsStatus#8cf4ee60 flags:# balance:long history:Vector<StarsTransaction> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.StarsStatus;
foundStory#e87acbc0 peer:Peer story:StoryItem = FoundStory;
stories.foundStories#e2de7737 flags:# count:int stories:Vector<FoundStory> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stories.FoundStories;
geoPointAddress#de4c5d93 flags:# country_iso2:string state:flags.0?string city:flags.1?string street:flags.2?string = GeoPointAddress;
starsRevenueStatus#79342946 flags:# withdrawal_enabled:flags.0?true current_balance:long available_balance:long overall_revenue:long next_withdrawal_at:flags.1?int = StarsRevenueStatus;
payments.starsRevenueStats#c92bb73b revenue_graph:StatsGraph status:StarsRevenueStatus usd_rate:double = payments.StarsRevenueStats;
payments.starsRevenueWithdrawalUrl#1dab80b7 url:string = payments.StarsRevenueWithdrawalUrl;
payments.starsRevenueAdsAccountUrl#394e7f21 url:string = payments.StarsRevenueAdsAccountUrl;
inputStarsTransaction#206ae6d1 flags:# refund:flags.0?true id:string = InputStarsTransaction;
---functions---
invokeAfterMsg#cb9f372d {X:Type} msg_id:long query:!X = X;
initConnection#c1cd5ea9 {X:Type} flags:# api_id:int device_model:string system_version:string app_version:string system_lang_code:string lang_pack:string lang_code:string proxy:flags.0?InputClientProxy params:flags.1?JSONValue query:!X = X;
invokeWithLayer#da9b0d0d {X:Type} layer:int query:!X = X;
auth.sendCode#a677244f phone_number:string api_id:int api_hash:string settings:CodeSettings = auth.SentCode;
auth.signUp#aac7b717 flags:# no_joined_notifications:flags.0?true phone_number:string phone_code_hash:string first_name:string last_name:string = auth.Authorization;
auth.signIn#8d52a951 flags:# phone_number:string phone_code_hash:string phone_code:flags.0?string email_verification:flags.1?EmailVerification = auth.Authorization;
auth.logOut#3e72ba19 = auth.LoggedOut;
auth.resetAuthorizations#9fab0d1a = Bool;
auth.exportAuthorization#e5bfffcd dc_id:int = auth.ExportedAuthorization;
auth.importAuthorization#a57a7dad id:long bytes:bytes = auth.Authorization;
auth.bindTempAuthKey#cdd42a05 perm_auth_key_id:long nonce:long expires_at:int encrypted_message:bytes = Bool;
auth.checkPassword#d18b4d16 password:InputCheckPasswordSRP = auth.Authorization;
auth.requestPasswordRecovery#d897bc66 = auth.PasswordRecovery;
auth.resendCode#cae47523 flags:# phone_number:string phone_code_hash:string reason:flags.0?string = auth.SentCode;
auth.cancelCode#1f040578 phone_number:string phone_code_hash:string = Bool;
auth.dropTempAuthKeys#8e48a188 except_auth_keys:Vector<long> = Bool;
auth.exportLoginToken#b7e085fe api_id:int api_hash:string except_ids:Vector<long> = auth.LoginToken;
auth.importLoginToken#95ac5ce4 token:bytes = auth.LoginToken;
auth.importWebTokenAuthorization#2db873a9 api_id:int api_hash:string web_auth_token:string = auth.Authorization;
account.registerDevice#ec86017a flags:# no_muted:flags.0?true token_type:int token:string app_sandbox:Bool secret:bytes other_uids:Vector<long> = Bool;
account.unregisterDevice#6a0d3206 token_type:int token:string other_uids:Vector<long> = Bool;
account.updateNotifySettings#84be5b93 peer:InputNotifyPeer settings:InputPeerNotifySettings = Bool;
account.getNotifySettings#12b3ad31 peer:InputNotifyPeer = PeerNotifySettings;
account.updateProfile#78515775 flags:# first_name:flags.0?string last_name:flags.1?string about:flags.2?string = User;
account.updateStatus#6628562c offline:Bool = Bool;
account.getWallPapers#7967d36 hash:long = account.WallPapers;
account.reportPeer#c5ba3d86 peer:InputPeer reason:ReportReason message:string = Bool;
account.checkUsername#2714d86c username:string = Bool;
account.updateUsername#3e0bdd7c username:string = User;
account.getPrivacy#dadbc950 key:InputPrivacyKey = account.PrivacyRules;
account.setPrivacy#c9f81ce8 key:InputPrivacyKey rules:Vector<InputPrivacyRule> = account.PrivacyRules;
account.getAuthorizations#e320c158 = account.Authorizations;
account.resetAuthorization#df77f3bc hash:long = Bool;
account.getPassword#548a30f5 = account.Password;
account.getPasswordSettings#9cd4eaf9 password:InputCheckPasswordSRP = account.PasswordSettings;
account.updatePasswordSettings#a59b102f password:InputCheckPasswordSRP new_settings:account.PasswordInputSettings = Bool;
account.sendConfirmPhoneCode#1b3faa88 hash:string settings:CodeSettings = auth.SentCode;
account.confirmPhone#5f2178c3 phone_code_hash:string phone_code:string = Bool;
account.getTmpPassword#449e0b51 password:InputCheckPasswordSRP period:int = account.TmpPassword;
account.getWebAuthorizations#182e6d6f = account.WebAuthorizations;
account.resetWebAuthorization#2d01b9ef hash:long = Bool;
account.resetWebAuthorizations#682d2594 = Bool;
account.sendVerifyPhoneCode#a5a356f9 phone_number:string settings:CodeSettings = auth.SentCode;
account.confirmPasswordEmail#8fdf1920 code:string = Bool;
account.getContactSignUpNotification#9f07c728 = Bool;
account.setContactSignUpNotification#cff43f61 silent:Bool = Bool;
account.getNotifyExceptions#53577479 flags:# compare_sound:flags.1?true compare_stories:flags.2?true peer:flags.0?InputNotifyPeer = Updates;
account.uploadWallPaper#e39a8f03 flags:# for_chat:flags.0?true file:InputFile mime_type:string settings:WallPaperSettings = WallPaper;
account.setContentSettings#b574b16b flags:# sensitive_enabled:flags.0?true = Bool;
account.getContentSettings#8b9b4dae = account.ContentSettings;
account.getGlobalPrivacySettings#eb2b4cf6 = GlobalPrivacySettings;
account.setGlobalPrivacySettings#1edaaac2 settings:GlobalPrivacySettings = GlobalPrivacySettings;
account.reportProfilePhoto#fa8cc6f5 peer:InputPeer photo_id:InputPhoto reason:ReportReason message:string = Bool;
account.setAuthorizationTTL#bf899aa0 authorization_ttl_days:int = Bool;
account.changeAuthorizationSettings#40f48462 flags:# confirmed:flags.3?true hash:long encrypted_requests_disabled:flags.0?Bool call_requests_disabled:flags.1?Bool = Bool;
account.updateEmojiStatus#fbd3de6b emoji_status:EmojiStatus = Bool;
account.getRecentEmojiStatuses#f578105 hash:long = account.EmojiStatuses;
account.reorderUsernames#ef500eab order:Vector<string> = Bool;
account.toggleUsername#58d6b376 username:string active:Bool = Bool;
account.resolveBusinessChatLink#5492e5ee slug:string = account.ResolvedBusinessChatLinks;
account.toggleSponsoredMessages#b9d9a38d enabled:Bool = Bool;
users.getUsers#d91a548 id:Vector<InputUser> = Vector<User>;
users.getFullUser#b60f5918 id:InputUser = users.UserFull;
contacts.getContacts#5dd69e12 hash:long = contacts.Contacts;
contacts.importContacts#2c800be5 contacts:Vector<InputContact> = contacts.ImportedContacts;
contacts.deleteContacts#96a0e00 id:Vector<InputUser> = Updates;
contacts.block#2e2e8734 flags:# my_stories_from:flags.0?true id:InputPeer = Bool;
contacts.unblock#b550d328 flags:# my_stories_from:flags.0?true id:InputPeer = Bool;
contacts.getBlocked#9a868f80 flags:# my_stories_from:flags.0?true offset:int limit:int = contacts.Blocked;
contacts.search#11f812d8 q:string limit:int = contacts.Found;
contacts.resolveUsername#f93ccba3 username:string = contacts.ResolvedPeer;
contacts.getTopPeers#973478b6 flags:# correspondents:flags.0?true bots_pm:flags.1?true bots_inline:flags.2?true phone_calls:flags.3?true forward_users:flags.4?true forward_chats:flags.5?true groups:flags.10?true channels:flags.15?true offset:int limit:int hash:long = contacts.TopPeers;
contacts.addContact#e8f463d0 flags:# add_phone_privacy_exception:flags.0?true id:InputUser first_name:string last_name:string phone:string = Updates;
contacts.resolvePhone#8af94344 phone:string = contacts.ResolvedPeer;
contacts.editCloseFriends#ba6705f0 id:Vector<long> = Bool;
messages.getMessages#63c66506 id:Vector<InputMessage> = messages.Messages;
messages.getDialogs#a0f4cb4f flags:# exclude_pinned:flags.0?true folder_id:flags.1?int offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.Dialogs;
messages.getHistory#4423e6c5 peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.readHistory#e306d3a peer:InputPeer max_id:int = messages.AffectedMessages;
messages.deleteHistory#b08f922a flags:# just_clear:flags.0?true revoke:flags.1?true peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;
messages.deleteMessages#e58e95d2 flags:# revoke:flags.0?true id:Vector<int> = messages.AffectedMessages;
messages.receivedMessages#5a954c0 max_id:int = Vector<ReceivedNotifyMessage>;
messages.setTyping#58943ee2 flags:# peer:InputPeer top_msg_id:flags.0?int action:SendMessageAction = Bool;
messages.sendMessage#983f9745 flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long = Updates;
messages.sendMedia#7852834e flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long = Updates;
messages.forwardMessages#d5039208 flags:# silent:flags.5?true background:flags.6?true with_my_score:flags.8?true drop_author:flags.11?true drop_media_captions:flags.12?true noforwards:flags.14?true from_peer:InputPeer id:Vector<int> random_id:Vector<long> to_peer:InputPeer top_msg_id:flags.9?int schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut = Updates;
messages.reportSpam#cf1592db peer:InputPeer = Bool;
messages.getPeerSettings#efd9a6a2 peer:InputPeer = messages.PeerSettings;
messages.report#8953ab4e peer:InputPeer id:Vector<int> reason:ReportReason message:string = Bool;
messages.getChats#49e9528f id:Vector<long> = messages.Chats;
messages.getFullChat#aeb00b34 chat_id:long = messages.ChatFull;
messages.editChatTitle#73783ffd chat_id:long title:string = Updates;
messages.editChatPhoto#35ddd674 chat_id:long photo:InputChatPhoto = Updates;
messages.addChatUser#cbc6d107 chat_id:long user_id:InputUser fwd_limit:int = messages.InvitedUsers;
messages.deleteChatUser#a2185cab flags:# revoke_history:flags.0?true chat_id:long user_id:InputUser = Updates;
messages.createChat#92ceddd4 flags:# users:Vector<InputUser> title:string ttl_period:flags.0?int = messages.InvitedUsers;
messages.getDhConfig#26cf8950 version:int random_length:int = messages.DhConfig;
messages.readMessageContents#36a73f77 id:Vector<int> = messages.AffectedMessages;
messages.getStickers#d5a5d3a1 emoticon:string hash:long = messages.Stickers;
messages.getAllStickers#b8a0a1a8 hash:long = messages.AllStickers;
messages.getWebPagePreview#8b68b0cc flags:# message:string entities:flags.3?Vector<MessageEntity> = MessageMedia;
messages.exportChatInvite#a02ce5d5 flags:# legacy_revoke_permanent:flags.2?true request_needed:flags.3?true peer:InputPeer expire_date:flags.0?int usage_limit:flags.1?int title:flags.4?string = ExportedChatInvite;
messages.checkChatInvite#3eadb1bb hash:string = ChatInvite;
messages.importChatInvite#6c50051c hash:string = Updates;
messages.getStickerSet#c8a0ec74 stickerset:InputStickerSet hash:int = messages.StickerSet;
messages.installStickerSet#c78fe460 stickerset:InputStickerSet archived:Bool = messages.StickerSetInstallResult;
messages.uninstallStickerSet#f96e55de stickerset:InputStickerSet = Bool;
messages.startBot#e6df7378 bot:InputUser peer:InputPeer random_id:long start_param:string = Updates;
messages.getMessagesViews#5784d3e1 peer:InputPeer id:Vector<int> increment:Bool = messages.MessageViews;
messages.migrateChat#a2875319 chat_id:long = Updates;
messages.searchGlobal#4bc6589a flags:# broadcasts_only:flags.1?true folder_id:flags.0?int q:string filter:MessagesFilter min_date:int max_date:int offset_rate:int offset_peer:InputPeer offset_id:int limit:int = messages.Messages;
messages.getDocumentByHash#b1f2061f sha256:bytes size:long mime_type:string = Document;
messages.getSavedGifs#5cf09635 hash:long = messages.SavedGifs;
messages.saveGif#327a30cb id:InputDocument unsave:Bool = Bool;
messages.getInlineBotResults#514e999d flags:# bot:InputUser peer:InputPeer geo_point:flags.0?InputGeoPoint query:string offset:string = messages.BotResults;
messages.sendInlineBotResult#3ebee86a flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true hide_via:flags.11?true peer:InputPeer reply_to:flags.0?InputReplyTo random_id:long query_id:long id:string schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut = Updates;
messages.editMessage#dfd14005 flags:# no_webpage:flags.1?true invert_media:flags.16?true peer:InputPeer id:int message:flags.11?string media:flags.14?InputMedia reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.15?int quick_reply_shortcut_id:flags.17?int = Updates;
messages.getBotCallbackAnswer#9342ca07 flags:# game:flags.1?true peer:InputPeer msg_id:int data:flags.0?bytes password:flags.2?InputCheckPasswordSRP = messages.BotCallbackAnswer;
messages.getPeerDialogs#e470bcfd peers:Vector<InputDialogPeer> = messages.PeerDialogs;
messages.saveDraft#d372c5ce flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo peer:InputPeer message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia effect:flags.7?long = Bool;
messages.getFeaturedStickers#64780b14 hash:long = messages.FeaturedStickers;
messages.readFeaturedStickers#5b118126 id:Vector<long> = Bool;
messages.getRecentStickers#9da9403b flags:# attached:flags.0?true hash:long = messages.RecentStickers;
messages.saveRecentSticker#392718f8 flags:# attached:flags.0?true id:InputDocument unsave:Bool = Bool;
messages.clearRecentStickers#8999602d flags:# attached:flags.0?true = Bool;
messages.getCommonChats#e40ca104 user_id:InputUser max_id:long limit:int = messages.Chats;
messages.getWebPage#8d9692a3 url:string hash:int = messages.WebPage;
messages.toggleDialogPin#a731e257 flags:# pinned:flags.0?true peer:InputDialogPeer = Bool;
messages.getPinnedDialogs#d6b94df2 folder_id:int = messages.PeerDialogs;
messages.uploadMedia#14967978 flags:# business_connection_id:flags.0?string peer:InputPeer media:InputMedia = MessageMedia;
messages.getFavedStickers#4f1aaa9 hash:long = messages.FavedStickers;
messages.faveSticker#b9ffc55b id:InputDocument unfave:Bool = Bool;
messages.getUnreadMentions#f107e790 flags:# peer:InputPeer top_msg_id:flags.0?int offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
messages.readMentions#36e5bf4d flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;
messages.sendMultiMedia#37b74355 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long = Updates;
messages.searchStickerSets#35705b8a flags:# exclude_featured:flags.0?true q:string hash:long = messages.FoundStickerSets;
messages.markDialogUnread#c286d98f flags:# unread:flags.0?true peer:InputDialogPeer = Bool;
messages.updatePinnedMessage#d2aaf7ec flags:# silent:flags.0?true unpin:flags.1?true pm_oneside:flags.2?true peer:InputPeer id:int = Updates;
messages.sendVote#10ea6184 peer:InputPeer msg_id:int options:Vector<bytes> = Updates;
messages.getOnlines#6e2be050 peer:InputPeer = ChatOnlines;
messages.editChatAbout#def60797 peer:InputPeer about:string = Bool;
messages.editChatDefaultBannedRights#a5866b41 peer:InputPeer banned_rights:ChatBannedRights = Updates;
messages.getEmojiKeywordsDifference#1508b6af lang_code:string from_version:int = EmojiKeywordsDifference;
messages.requestUrlAuth#198fb446 flags:# peer:flags.1?InputPeer msg_id:flags.1?int button_id:flags.1?int url:flags.2?string = UrlAuthResult;
messages.acceptUrlAuth#b12c7125 flags:# write_allowed:flags.0?true peer:flags.1?InputPeer msg_id:flags.1?int button_id:flags.1?int url:flags.2?string = UrlAuthResult;
messages.hidePeerSettingsBar#4facb138 peer:InputPeer = Bool;
messages.getScheduledHistory#f516760b peer:InputPeer hash:long = messages.Messages;
messages.sendScheduledMessages#bd38850a peer:InputPeer id:Vector<int> = Updates;
messages.deleteScheduledMessages#59ae2b16 peer:InputPeer id:Vector<int> = Updates;
messages.getPollVotes#b86e380e flags:# peer:InputPeer id:int option:flags.0?bytes offset:flags.1?string limit:int = messages.VotesList;
messages.getDialogFilters#efd48c89 = messages.DialogFilters;
messages.getSuggestedDialogFilters#a29cd42c = Vector<DialogFilterSuggested>;
messages.updateDialogFilter#1ad4a04a flags:# id:int filter:flags.0?DialogFilter = Bool;
messages.updateDialogFiltersOrder#c563c1e4 order:Vector<int> = Bool;
messages.getReplies#22ddd30c peer:InputPeer msg_id:int offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.getDiscussionMessage#446972fd peer:InputPeer msg_id:int = messages.DiscussionMessage;
messages.readDiscussion#f731a9f4 peer:InputPeer msg_id:int read_max_id:int = Bool;
messages.unpinAllMessages#ee22b9a8 flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;
messages.deleteChat#5bd0ee50 chat_id:long = Bool;
messages.getExportedChatInvites#a2b5a3f6 flags:# revoked:flags.3?true peer:InputPeer admin_id:InputUser offset_date:flags.2?int offset_link:flags.2?string limit:int = messages.ExportedChatInvites;
messages.editExportedChatInvite#bdca2f75 flags:# revoked:flags.2?true peer:InputPeer link:string expire_date:flags.0?int usage_limit:flags.1?int request_needed:flags.3?Bool title:flags.4?string = messages.ExportedChatInvite;
messages.deleteRevokedExportedChatInvites#56987bd5 peer:InputPeer admin_id:InputUser = Bool;
messages.deleteExportedChatInvite#d464a42b peer:InputPeer link:string = Bool;
messages.getChatInviteImporters#df04dd4e flags:# requested:flags.0?true peer:InputPeer link:flags.1?string q:flags.2?string offset_date:int offset_user:InputUser limit:int = messages.ChatInviteImporters;
messages.getMessageReadParticipants#31c1c44f peer:InputPeer msg_id:int = Vector<ReadParticipantDate>;
messages.hideChatJoinRequest#7fe7e815 flags:# approved:flags.0?true peer:InputPeer user_id:InputUser = Updates;
messages.hideAllChatJoinRequests#e085f4ea flags:# approved:flags.0?true peer:InputPeer link:flags.1?string = Updates;
messages.toggleNoForwards#b11eafa2 peer:InputPeer enabled:Bool = Updates;
messages.saveDefaultSendAs#ccfddf96 peer:InputPeer send_as:InputPeer = Bool;
messages.sendReaction#d30d78d4 flags:# big:flags.1?true add_to_recent:flags.2?true peer:InputPeer msg_id:int reaction:flags.0?Vector<Reaction> = Updates;
messages.getMessagesReactions#8bba90e6 peer:InputPeer id:Vector<int> = Updates;
messages.getMessageReactionsList#461b3f48 flags:# peer:InputPeer id:int reaction:flags.0?Reaction offset:flags.1?string limit:int = messages.MessageReactionsList;
messages.setChatAvailableReactions#5a150bd4 flags:# peer:InputPeer available_reactions:ChatReactions reactions_limit:flags.0?int = Updates;
messages.getAvailableReactions#18dea0ac hash:int = messages.AvailableReactions;
messages.setDefaultReaction#4f47a016 reaction:Reaction = Bool;
messages.translateText#63183030 flags:# peer:flags.0?InputPeer id:flags.0?Vector<int> text:flags.1?Vector<TextWithEntities> to_lang:string = messages.TranslatedText;
messages.getUnreadReactions#3223495b flags:# peer:InputPeer top_msg_id:flags.0?int offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
messages.readReactions#54aa7f8e flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;
messages.getAttachMenuBots#16fcc2cb hash:long = AttachMenuBots;
messages.getAttachMenuBot#77216192 bot:InputUser = AttachMenuBotsBot;
messages.toggleBotInAttachMenu#69f59d69 flags:# write_allowed:flags.0?true bot:InputUser enabled:Bool = Bool;
messages.requestWebView#269dc2c1 flags:# from_bot_menu:flags.4?true silent:flags.5?true compact:flags.7?true peer:InputPeer bot:InputUser url:flags.1?string start_param:flags.3?string theme_params:flags.2?DataJSON platform:string reply_to:flags.0?InputReplyTo send_as:flags.13?InputPeer = WebViewResult;
messages.prolongWebView#b0d81a83 flags:# silent:flags.5?true peer:InputPeer bot:InputUser query_id:long reply_to:flags.0?InputReplyTo send_as:flags.13?InputPeer = Bool;
messages.requestSimpleWebView#413a3e73 flags:# from_switch_webview:flags.1?true from_side_menu:flags.2?true compact:flags.7?true bot:InputUser url:flags.3?string start_param:flags.4?string theme_params:flags.0?DataJSON platform:string = WebViewResult;
messages.sendWebViewResultMessage#a4314f5 bot_query_id:string result:InputBotInlineResult = WebViewMessageSent;
messages.sendWebViewData#dc0242c8 bot:InputUser random_id:long button_text:string data:string = Updates;
messages.transcribeAudio#269e9a49 peer:InputPeer msg_id:int = messages.TranscribedAudio;
messages.getCustomEmojiDocuments#d9ab0f54 document_id:Vector<long> = Vector<Document>;
messages.getEmojiStickers#fbfca18f hash:long = messages.AllStickers;
messages.getFeaturedEmojiStickers#ecf6736 hash:long = messages.FeaturedStickers;
messages.getTopReactions#bb8125ba limit:int hash:long = messages.Reactions;
messages.getRecentReactions#39461db2 limit:int hash:long = messages.Reactions;
messages.clearRecentReactions#9dfeefb4 = Bool;
messages.getExtendedMedia#84f80814 peer:InputPeer id:Vector<int> = Updates;
messages.togglePeerTranslations#e47cb579 flags:# disabled:flags.0?true peer:InputPeer = Bool;
messages.getBotApp#34fdc5c3 app:InputBotApp hash:long = messages.BotApp;
messages.requestAppWebView#53618bce flags:# write_allowed:flags.0?true compact:flags.7?true peer:InputPeer app:InputBotApp start_param:flags.1?string theme_params:flags.2?DataJSON platform:string = WebViewResult;
messages.getSavedDialogs#5381d21a flags:# exclude_pinned:flags.0?true offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.SavedDialogs;
messages.getSavedHistory#3d9a414d peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.deleteSavedHistory#6e98102b flags:# peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;
messages.getPinnedSavedDialogs#d63d94e0 = messages.SavedDialogs;
messages.toggleSavedDialogPin#ac81bbde flags:# pinned:flags.0?true peer:InputDialogPeer = Bool;
messages.getSavedReactionTags#3637e05b flags:# peer:flags.0?InputPeer hash:long = messages.SavedReactionTags;
messages.updateSavedReactionTag#60297dec flags:# reaction:Reaction title:flags.0?string = Bool;
messages.getDefaultTagReactions#bdf93428 hash:long = messages.Reactions;
messages.getOutboxReadDate#8c4bfe5d peer:InputPeer msg_id:int = OutboxReadDate;
messages.getQuickReplies#d483f2a8 hash:long = messages.QuickReplies;
messages.getQuickReplyMessages#94a495c3 flags:# shortcut_id:int id:flags.0?Vector<int> hash:long = messages.Messages;
messages.sendQuickReplyMessages#6c750de1 peer:InputPeer shortcut_id:int id:Vector<int> random_id:Vector<long> = Updates;
messages.getAvailableEffects#dea20a39 hash:int = messages.AvailableEffects;
messages.getFactCheck#b9cdc5ee peer:InputPeer msg_id:Vector<int> = Vector<FactCheck>;
updates.getState#edd4882a = updates.State;
updates.getDifference#19c2f763 flags:# pts:int pts_limit:flags.1?int pts_total_limit:flags.0?int date:int qts:int qts_limit:flags.2?int = updates.Difference;
updates.getChannelDifference#3173d78 flags:# force:flags.0?true channel:InputChannel filter:ChannelMessagesFilter pts:int limit:int = updates.ChannelDifference;
photos.updateProfilePhoto#9e82039 flags:# fallback:flags.0?true bot:flags.1?InputUser id:InputPhoto = photos.Photo;
photos.uploadProfilePhoto#388a3b5 flags:# fallback:flags.3?true bot:flags.5?InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.4?VideoSize = photos.Photo;
photos.deletePhotos#87cf7f2f id:Vector<InputPhoto> = Vector<long>;
photos.getUserPhotos#91cd32a8 user_id:InputUser offset:int max_id:long limit:int = photos.Photos;
photos.uploadContactProfilePhoto#e14c4a71 flags:# suggest:flags.3?true save:flags.4?true user_id:InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.5?VideoSize = photos.Photo;
upload.saveFilePart#b304a621 file_id:long file_part:int bytes:bytes = Bool;
upload.getFile#be5335be flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:long limit:int = upload.File;
upload.saveBigFilePart#de7b673d file_id:long file_part:int file_total_parts:int bytes:bytes = Bool;
upload.getWebFile#24e6818d location:InputWebFileLocation offset:int limit:int = upload.WebFile;
help.getConfig#c4f9186b = Config;
help.getNearestDc#1fb33026 = NearestDc;
help.getSupport#9cdf08cd = help.Support;
help.acceptTermsOfService#ee72f79a id:DataJSON = Bool;
help.getAppConfig#61e3f854 hash:int = help.AppConfig;
help.getCountriesList#735787a8 lang_code:string hash:int = help.CountriesList;
help.getPremiumPromo#b81b93d4 = help.PremiumPromo;
help.getPeerColors#da80f42f hash:int = help.PeerColors;
help.getTimezonesList#49b30240 hash:int = help.TimezonesList;
channels.readHistory#cc104937 channel:InputChannel max_id:int = Bool;
channels.deleteMessages#84c1fd4e channel:InputChannel id:Vector<int> = messages.AffectedMessages;
channels.getMessages#ad8c9a23 channel:InputChannel id:Vector<InputMessage> = messages.Messages;
channels.getParticipants#77ced9d0 channel:InputChannel filter:ChannelParticipantsFilter offset:int limit:int hash:long = channels.ChannelParticipants;
channels.getParticipant#a0ab6cc6 channel:InputChannel participant:InputPeer = channels.ChannelParticipant;
channels.getChannels#a7f6bbb id:Vector<InputChannel> = messages.Chats;
channels.getFullChannel#8736a09 channel:InputChannel = messages.ChatFull;
channels.createChannel#91006707 flags:# broadcast:flags.0?true megagroup:flags.1?true for_import:flags.3?true forum:flags.5?true title:string about:string geo_point:flags.2?InputGeoPoint address:flags.2?string ttl_period:flags.4?int = Updates;
channels.editAdmin#d33c8902 channel:InputChannel user_id:InputUser admin_rights:ChatAdminRights rank:string = Updates;
channels.editTitle#566decd0 channel:InputChannel title:string = Updates;
channels.editPhoto#f12e57c9 channel:InputChannel photo:InputChatPhoto = Updates;
channels.checkUsername#10e6bd2c channel:InputChannel username:string = Bool;
channels.updateUsername#3514b3de channel:InputChannel username:string = Bool;
channels.joinChannel#24b524c5 channel:InputChannel = Updates;
channels.leaveChannel#f836aa95 channel:InputChannel = Updates;
channels.inviteToChannel#c9e33d54 channel:InputChannel users:Vector<InputUser> = messages.InvitedUsers;
channels.deleteChannel#c0111fe3 channel:InputChannel = Updates;
channels.exportMessageLink#e63fadeb flags:# grouped:flags.0?true thread:flags.1?true channel:InputChannel id:int = ExportedMessageLink;
channels.toggleSignatures#1f69b606 channel:InputChannel enabled:Bool = Updates;
channels.editBanned#96e6cd81 channel:InputChannel participant:InputPeer banned_rights:ChatBannedRights = Updates;
channels.readMessageContents#eab5dc38 channel:InputChannel id:Vector<int> = Bool;
channels.togglePreHistoryHidden#eabbb94c channel:InputChannel enabled:Bool = Updates;
channels.getGroupsForDiscussion#f5dad378 = messages.Chats;
channels.setDiscussionGroup#40582bb2 broadcast:InputChannel group:InputChannel = Bool;
channels.viewSponsoredMessage#beaedb94 channel:InputChannel random_id:bytes = Bool;
channels.getSponsoredMessages#ec210fbf channel:InputChannel = messages.SponsoredMessages;
channels.getSendAs#dc770ee peer:InputPeer = channels.SendAsPeers;
channels.toggleJoinToSend#e4cb9580 channel:InputChannel enabled:Bool = Updates;
channels.toggleJoinRequest#4c2985b6 channel:InputChannel enabled:Bool = Updates;
channels.reorderUsernames#b45ced1d channel:InputChannel order:Vector<string> = Bool;
channels.toggleUsername#50f24105 channel:InputChannel username:string active:Bool = Bool;
channels.deactivateAllUsernames#a245dd3 channel:InputChannel = Bool;
channels.toggleForum#a4298b29 channel:InputChannel enabled:Bool = Updates;
channels.createForumTopic#f40c0224 flags:# channel:InputChannel title:string icon_color:flags.0?int icon_emoji_id:flags.3?long random_id:long send_as:flags.2?InputPeer = Updates;
channels.getForumTopics#de560d1 flags:# channel:InputChannel q:flags.0?string offset_date:int offset_id:int offset_topic:int limit:int = messages.ForumTopics;
channels.getForumTopicsByID#b0831eb9 channel:InputChannel topics:Vector<int> = messages.ForumTopics;
channels.editForumTopic#f4dfa185 flags:# channel:InputChannel topic_id:int title:flags.0?string icon_emoji_id:flags.1?long closed:flags.2?Bool hidden:flags.3?Bool = Updates;
channels.updatePinnedForumTopic#6c2d9026 channel:InputChannel topic_id:int pinned:Bool = Updates;
channels.deleteTopicHistory#34435f2d channel:InputChannel top_msg_id:int = messages.AffectedHistory;
channels.toggleParticipantsHidden#6a6e7854 channel:InputChannel enabled:Bool = Updates;
channels.clickSponsoredMessage#18afbc93 channel:InputChannel random_id:bytes = Bool;
channels.toggleViewForumAsMessages#9738bb15 channel:InputChannel enabled:Bool = Updates;
channels.getChannelRecommendations#25a71742 flags:# channel:flags.0?InputChannel = messages.Chats;
channels.reportSponsoredMessage#af8ff6b9 channel:InputChannel random_id:bytes option:bytes = channels.SponsoredMessageReportResult;
bots.setBotInfo#10cf3123 flags:# bot:flags.2?InputUser lang_code:string name:flags.3?string about:flags.0?string description:flags.1?string = Bool;
bots.canSendMessage#1359f4e6 bot:InputUser = Bool;
bots.allowSendMessage#f132e3ef bot:InputUser = Updates;
bots.invokeWebViewCustomMethod#87fc5e7 bot:InputUser custom_method:string params:DataJSON = DataJSON;
payments.getPaymentForm#37148dbb flags:# invoice:InputInvoice theme_params:flags.0?DataJSON = payments.PaymentForm;
payments.getPaymentReceipt#2478d1cc peer:InputPeer msg_id:int = payments.PaymentReceipt;
payments.validateRequestedInfo#b6c8f12b flags:# save:flags.0?true invoice:InputInvoice info:PaymentRequestedInfo = payments.ValidatedRequestedInfo;
payments.sendPaymentForm#2d03522f flags:# form_id:long invoice:InputInvoice requested_info_id:flags.0?string shipping_option_id:flags.1?string credentials:InputPaymentCredentials tip_amount:flags.2?long = payments.PaymentResult;
payments.getSavedInfo#227d824b = payments.SavedInfo;
payments.getPremiumGiftCodeOptions#2757ba54 flags:# boost_peer:flags.0?InputPeer = Vector<PremiumGiftCodeOption>;
payments.checkGiftCode#8e51b4c1 slug:string = payments.CheckedGiftCode;
payments.applyGiftCode#f6e26854 slug:string = Updates;
payments.getGiveawayInfo#f4239425 peer:InputPeer msg_id:int = payments.GiveawayInfo;
payments.launchPrepaidGiveaway#5ff58f20 peer:InputPeer giveaway_id:long purpose:InputStorePaymentPurpose = Updates;
payments.getStarsTopupOptions#c00ec7d3 = Vector<StarsTopupOption>;
payments.getStarsStatus#104fcfa7 peer:InputPeer = payments.StarsStatus;
payments.getStarsTransactions#97938d5a flags:# inbound:flags.0?true outbound:flags.1?true ascending:flags.2?true peer:InputPeer offset:string limit:int = payments.StarsStatus;
payments.sendStarsForm#2bb731d flags:# form_id:long invoice:InputInvoice = payments.PaymentResult;
phone.requestCall#42ff96ed flags:# video:flags.0?true user_id:InputUser random_id:int g_a_hash:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
phone.acceptCall#3bd2b4a0 peer:InputPhoneCall g_b:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
phone.confirmCall#2efe1722 peer:InputPhoneCall g_a:bytes key_fingerprint:long protocol:PhoneCallProtocol = phone.PhoneCall;
phone.receivedCall#17d54f61 peer:InputPhoneCall = Bool;
phone.discardCall#b2cbc1c0 flags:# video:flags.0?true peer:InputPhoneCall duration:int reason:PhoneCallDiscardReason connection_id:long = Updates;
phone.setCallRating#59ead627 flags:# user_initiative:flags.0?true peer:InputPhoneCall rating:int comment:string = Updates;
phone.saveCallDebug#277add7e peer:InputPhoneCall debug:DataJSON = Bool;
phone.sendSignalingData#ff7a9383 peer:InputPhoneCall data:bytes = Bool;
phone.createGroupCall#48cdc6d8 flags:# rtmp_stream:flags.2?true peer:InputPeer random_id:int title:flags.0?string schedule_date:flags.1?int = Updates;
phone.joinGroupCall#b132ff7b flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string params:DataJSON = Updates;
phone.leaveGroupCall#500377f9 call:InputGroupCall source:int = Updates;
phone.discardGroupCall#7a777135 call:InputGroupCall = Updates;
phone.getGroupCall#41845db call:InputGroupCall limit:int = phone.GroupCall;
phone.getGroupParticipants#c558d8ab call:InputGroupCall ids:Vector<InputPeer> sources:Vector<int> offset:string limit:int = phone.GroupParticipants;
phone.editGroupCallParticipant#a5273abf flags:# call:InputGroupCall participant:InputPeer muted:flags.0?Bool volume:flags.1?int raise_hand:flags.2?Bool video_stopped:flags.3?Bool video_paused:flags.4?Bool presentation_paused:flags.5?Bool = Updates;
phone.exportGroupCallInvite#e6aa647f flags:# can_self_unmute:flags.0?true call:InputGroupCall = phone.ExportedGroupCallInvite;
phone.toggleGroupCallStartSubscription#219c34e6 call:InputGroupCall subscribed:Bool = Updates;
phone.joinGroupCallPresentation#cbea6bc4 call:InputGroupCall params:DataJSON = Updates;
phone.leaveGroupCallPresentation#1c50d144 call:InputGroupCall = Updates;
langpack.getLangPack#f2f2330a lang_pack:string lang_code:string = LangPackDifference;
langpack.getStrings#efea3803 lang_pack:string lang_code:string keys:Vector<string> = Vector<LangPackString>;
langpack.getDifference#cd984aa5 lang_pack:string lang_code:string from_version:int = LangPackDifference;
langpack.getLanguages#42c6978f lang_pack:string = Vector<LangPackLanguage>;
langpack.getLanguage#6a596502 lang_pack:string lang_code:string = LangPackLanguage;
folders.editPeerFolders#6847d0ab folder_peers:Vector<InputFolderPeer> = Updates;
stats.getBroadcastStats#ab42441a flags:# dark:flags.0?true channel:InputChannel = stats.BroadcastStats;
stats.loadAsyncGraph#621d5fa0 flags:# token:string x:flags.0?long = StatsGraph;
stats.getMegagroupStats#dcdf8607 flags:# dark:flags.0?true channel:InputChannel = stats.MegagroupStats;
stats.getMessagePublicForwards#5f150144 channel:InputChannel msg_id:int offset:string limit:int = stats.PublicForwards;
stats.getMessageStats#b6e0a3f5 flags:# dark:flags.0?true channel:InputChannel msg_id:int = stats.MessageStats;
stats.getStoryStats#374fef40 flags:# dark:flags.0?true peer:InputPeer id:int = stats.StoryStats;
stats.getStoryPublicForwards#a6437ef6 peer:InputPeer id:int offset:string limit:int = stats.PublicForwards;
chatlists.exportChatlistInvite#8472478e chatlist:InputChatlist title:string peers:Vector<InputPeer> = chatlists.ExportedChatlistInvite;
chatlists.deleteExportedInvite#719c5c5e chatlist:InputChatlist slug:string = Bool;
chatlists.editExportedInvite#653db63d flags:# chatlist:InputChatlist slug:string title:flags.1?string peers:flags.2?Vector<InputPeer> = ExportedChatlistInvite;
chatlists.getExportedInvites#ce03da83 chatlist:InputChatlist = chatlists.ExportedInvites;
chatlists.checkChatlistInvite#41c10fff slug:string = chatlists.ChatlistInvite;
chatlists.joinChatlistInvite#a6b1e39a slug:string peers:Vector<InputPeer> = Updates;
chatlists.getLeaveChatlistSuggestions#fdbcd714 chatlist:InputChatlist = Vector<Peer>;
chatlists.leaveChatlist#74fae13a chatlist:InputChatlist peers:Vector<InputPeer> = Updates;
stories.editStory#b583ba46 flags:# peer:InputPeer id:int media:flags.0?InputMedia media_areas:flags.3?Vector<MediaArea> caption:flags.1?string entities:flags.1?Vector<MessageEntity> privacy_rules:flags.2?Vector<InputPrivacyRule> = Updates;
stories.deleteStories#ae59db5f peer:InputPeer id:Vector<int> = Vector<int>;
stories.togglePinned#9a75a1ef peer:InputPeer id:Vector<int> pinned:Bool = Vector<int>;
stories.getAllStories#eeb0d625 flags:# next:flags.1?true hidden:flags.2?true state:flags.0?string = stories.AllStories;
stories.getPinnedStories#5821a5dc peer:InputPeer offset_id:int limit:int = stories.Stories;
stories.getStoriesArchive#b4352016 peer:InputPeer offset_id:int limit:int = stories.Stories;
stories.getStoriesByID#5774ca74 peer:InputPeer id:Vector<int> = stories.Stories;
stories.readStories#a556dac8 peer:InputPeer max_id:int = Vector<int>;
stories.incrementStoryViews#b2028afb peer:InputPeer id:Vector<int> = Bool;
stories.getStoryViewsList#7ed23c57 flags:# just_contacts:flags.0?true reactions_first:flags.2?true forwards_first:flags.3?true peer:InputPeer q:flags.1?string id:int offset:string limit:int = stories.StoryViewsList;
stories.getStoriesViews#28e16cc8 peer:InputPeer id:Vector<int> = stories.StoryViews;
stories.exportStoryLink#7b8def20 peer:InputPeer id:int = ExportedStoryLink;
stories.report#1923fa8c peer:InputPeer id:Vector<int> reason:ReportReason message:string = Bool;
stories.activateStealthMode#57bbd166 flags:# past:flags.0?true future:flags.1?true = Updates;
stories.sendReaction#7fd736b2 flags:# add_to_recent:flags.0?true peer:InputPeer story_id:int reaction:Reaction = Updates;
stories.getPeerStories#2c4ada50 peer:InputPeer = stories.PeerStories;
stories.getPeerMaxIDs#535983c3 id:Vector<InputPeer> = Vector<int>;
stories.togglePeerStoriesHidden#bd0415c4 peer:InputPeer hidden:Bool = Bool;
stories.togglePinnedToTop#b297e9b peer:InputPeer id:Vector<int> = Bool;
premium.getBoostsList#60f67660 flags:# gifts:flags.0?true peer:InputPeer offset:string limit:int = premium.BoostsList;
premium.getMyBoosts#be77b4a = premium.MyBoosts;
premium.applyBoost#6b7da746 flags:# slots:flags.0?Vector<int> peer:InputPeer = premium.MyBoosts;
premium.getBoostsStatus#42f1f61 peer:InputPeer = premium.BoostsStatus;
fragment.getCollectibleInfo#be1e85ba collectible:InputCollectible = fragment.CollectibleInfo;`;

/***/ }),

/***/ "./src/lib/gramjs/tl/core/GZIPPacked.js":
/*!**********************************************!*\
  !*** ./src/lib/gramjs/tl/core/GZIPPacked.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  inflate
} = __webpack_require__(/*! pako/dist/pako_inflate */ "./node_modules/pako/dist/pako_inflate.js");
const {
  serializeBytes
} = __webpack_require__(/*! ../index */ "./src/lib/gramjs/tl/index.js");

// CONTEST const { deflate } = require('pako/dist/pako_deflate')

class GZIPPacked {
  constructor(data) {
    this.data = data;
    this.CONSTRUCTOR_ID = 0x3072cfa1;
    this.classType = 'constructor';
  }
  static async gzipIfSmaller(contentRelated, data) {
    if (contentRelated && data.length > 512) {
      const gzipped = await new GZIPPacked(data).toBytes();
      if (gzipped.length < data.length) {
        return gzipped;
      }
    }
    return data;
  }
  static gzip(input) {
    return Buffer.from(input);
    // TODO this usually makes it faster for large requests
    // return Buffer.from(deflate(input, { level: 9, gzip: true }))
  }
  static ungzip(input) {
    return Buffer.from(inflate(input));
  }
  static read(reader) {
    const constructor = reader.readInt(false);
    if (constructor !== GZIPPacked.CONSTRUCTOR_ID) {
      throw new Error('not equal');
    }
    return GZIPPacked.gzip(reader.tgReadBytes());
  }
  static async fromReader(reader) {
    return new GZIPPacked(await GZIPPacked.ungzip(reader.tgReadBytes()));
  }
  async toBytes() {
    const g = Buffer.alloc(4);
    g.writeUInt32LE(GZIPPacked.CONSTRUCTOR_ID, 0);
    return Buffer.concat([g, serializeBytes(await GZIPPacked.gzip(this.data))]);
  }
}
_defineProperty(GZIPPacked, "CONSTRUCTOR_ID", 0x3072cfa1);
_defineProperty(GZIPPacked, "classType", 'constructor');
module.exports = GZIPPacked;

/***/ }),

/***/ "./src/lib/gramjs/tl/core/MessageContainer.js":
/*!****************************************************!*\
  !*** ./src/lib/gramjs/tl/core/MessageContainer.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const TLMessage = __webpack_require__(/*! ./TLMessage */ "./src/lib/gramjs/tl/core/TLMessage.js");
class MessageContainer {
  constructor(messages) {
    this.CONSTRUCTOR_ID = 0x73f1f8dc;
    this.messages = messages;
    this.classType = 'constructor';
  }
  static fromReader(reader) {
    const messages = [];
    const length = reader.readInt();
    for (let x = 0; x < length; x++) {
      const msgId = reader.readLong();
      const seqNo = reader.readInt();
      const containerLength = reader.readInt();
      const before = reader.tellPosition();
      const obj = reader.tgReadObject();
      reader.setPosition(before + containerLength);
      const tlMessage = new TLMessage(msgId, seqNo, obj);
      messages.push(tlMessage);
    }
    return new MessageContainer(messages);
  }
}
_defineProperty(MessageContainer, "CONSTRUCTOR_ID", 0x73f1f8dc);
_defineProperty(MessageContainer, "classType", 'constructor');
// Maximum size in bytes for the inner payload of the container.
// Telegram will close the connection if the payload is bigger.
// The overhead of the container itself is subtracted.
_defineProperty(MessageContainer, "MAXIMUM_SIZE", 1044456 - 8);
// Maximum amount of messages that can't be sent inside a single
// container, inclusive. Beyond this limit Telegram will respond
// with BAD_MESSAGE 64 (invalid container).
//
// This limit is not 100% accurate and may in some cases be higher.
// However, sending up to 100 requests at once in a single container
// is a reasonable conservative value, since it could also depend on
// other factors like size per request, but we cannot know this.
_defineProperty(MessageContainer, "MAXIMUM_LENGTH", 100);
module.exports = MessageContainer;

/***/ }),

/***/ "./src/lib/gramjs/tl/core/RPCResult.js":
/*!*********************************************!*\
  !*** ./src/lib/gramjs/tl/core/RPCResult.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  RpcError
} = (__webpack_require__(/*! ../index */ "./src/lib/gramjs/tl/index.js").constructors);
const GZIPPacked = __webpack_require__(/*! ./GZIPPacked */ "./src/lib/gramjs/tl/core/GZIPPacked.js");
class RPCResult {
  constructor(reqMsgId, body, error) {
    this.CONSTRUCTOR_ID = 0xf35c6d01;
    this.reqMsgId = reqMsgId;
    this.body = body;
    this.error = error;
    this.classType = 'constructor';
  }
  static async fromReader(reader) {
    const msgId = reader.readLong();
    const innerCode = reader.readInt(false);
    if (innerCode === RpcError.CONSTRUCTOR_ID) {
      return new RPCResult(msgId, undefined, RpcError.fromReader(reader));
    }
    if (innerCode === GZIPPacked.CONSTRUCTOR_ID) {
      return new RPCResult(msgId, (await GZIPPacked.fromReader(reader)).data);
    }
    reader.seek(-4);
    // This reader.read() will read more than necessary, but it's okay.
    // We could make use of MessageContainer's length here, but since
    // it's not necessary we don't need to care about it.
    return new RPCResult(msgId, reader.read(), undefined);
  }
}
_defineProperty(RPCResult, "CONSTRUCTOR_ID", 0xf35c6d01);
_defineProperty(RPCResult, "classType", 'constructor');
module.exports = RPCResult;

/***/ }),

/***/ "./src/lib/gramjs/tl/core/TLMessage.js":
/*!*********************************************!*\
  !*** ./src/lib/gramjs/tl/core/TLMessage.js ***!
  \*********************************************/
/***/ ((module) => {

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class TLMessage {
  constructor(msgId, seqNo, obj) {
    this.msgId = msgId;
    this.seqNo = seqNo;
    this.obj = obj;
    this.classType = 'constructor';
  }
}
_defineProperty(TLMessage, "SIZE_OVERHEAD", 12);
_defineProperty(TLMessage, "classType", 'constructor');
module.exports = TLMessage;

/***/ }),

/***/ "./src/lib/gramjs/tl/core/index.js":
/*!*****************************************!*\
  !*** ./src/lib/gramjs/tl/core/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const TLMessage = __webpack_require__(/*! ./TLMessage */ "./src/lib/gramjs/tl/core/TLMessage.js");
const RPCResult = __webpack_require__(/*! ./RPCResult */ "./src/lib/gramjs/tl/core/RPCResult.js");
const MessageContainer = __webpack_require__(/*! ./MessageContainer */ "./src/lib/gramjs/tl/core/MessageContainer.js");
const GZIPPacked = __webpack_require__(/*! ./GZIPPacked */ "./src/lib/gramjs/tl/core/GZIPPacked.js");
const coreObjects = {
  [RPCResult.CONSTRUCTOR_ID]: RPCResult,
  [GZIPPacked.CONSTRUCTOR_ID]: GZIPPacked,
  [MessageContainer.CONSTRUCTOR_ID]: MessageContainer
};
module.exports = {
  TLMessage,
  RPCResult,
  MessageContainer,
  GZIPPacked,
  coreObjects
};

/***/ }),

/***/ "./src/lib/gramjs/tl/generationHelpers.js":
/*!************************************************!*\
  !*** ./src/lib/gramjs/tl/generationHelpers.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const snakeToCamelCase = name => {
  const result = name.replace(/(?:^|_)([a-z])/g, (_, g) => g.toUpperCase());
  return result.replace(/_/g, '');
};
const variableSnakeToCamelCase = str => str.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
const CORE_TYPES = new Set([0xbc799737,
// boolFalse#bc799737 = Bool;
0x997275b5,
// boolTrue#997275b5 = Bool;
0x3fedd339,
// true#3fedd339 = True;
0xc4b9f9bb,
// error#c4b9f9bb code:int text:string = Error;
0x56730bcc // null#56730bcc = Null;
]);
const AUTH_KEY_TYPES = new Set([0x05162463,
// resPQ,
0x83c95aec,
// p_q_inner_data
0xa9f55f95,
// p_q_inner_data_dc
0x3c6a84d4,
// p_q_inner_data_temp
0x56fddf88,
// p_q_inner_data_temp_dc
0xd0e8075c,
// server_DH_params_ok
0xb5890dba,
// server_DH_inner_data
0x6643b654,
// client_DH_inner_data
0xd712e4be,
// req_DH_params
0xf5045f1f,
// set_client_DH_params
0x3072cfa1 // gzip_packed
]);

// This is copy-pasted from `gramjs/Helpers.js` to not depend on TypeScript modules
function makeCRCTable() {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
}
let crcTable;
function crc32(buf) {
  if (!crcTable) {
    crcTable = makeCRCTable();
  }
  if (!Buffer.isBuffer(buf)) {
    buf = Buffer.from(buf);
  }
  let crc = -1;
  for (let index = 0; index < buf.length; index++) {
    const byte = buf[index];
    crc = crcTable[(crc ^ byte) & 0xff] ^ crc >>> 8;
  }
  return (crc ^ -1) >>> 0;
}
const findAll = function (regex, str) {
  let matches = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  if (!regex.flags.includes('g')) {
    regex = new RegExp(regex.source, 'g');
  }
  const res = regex.exec(str);
  if (res) {
    matches.push(res.slice(1));
    findAll(regex, str, matches);
  }
  return matches;
};
const fromLine = (line, isFunction) => {
  const match = line.match(/([\w.]+)(?:#([0-9a-fA-F]+))?(?:\s{?\w+:[\w\d<>#.?!]+}?)*\s=\s([\w\d<>#.?]+);$/);
  if (!match) {
    // Probably "vector#1cb5c415 {t:Type} # [ t ] = Vector t;"
    throw new Error(`Cannot parse TLObject ${line}`);
  }
  const argsMatch = findAll(/({)?(\w+):([\w\d<>#.?!]+)}?/, line);
  const currentConfig = {
    name: match[1],
    constructorId: parseInt(match[2], 16),
    argsConfig: {},
    subclassOfId: crc32(match[3]),
    result: match[3],
    isFunction,
    namespace: undefined
  };
  if (!currentConfig.constructorId) {
    const hexId = '';
    let args;
    if (Object.values(currentConfig.argsConfig).length) {
      args = ` ${Object.keys(currentConfig.argsConfig).map(arg => arg.toString()).join(' ')}`;
    } else {
      args = '';
    }
    const representation = `${currentConfig.name}${hexId}${args} = ${currentConfig.result}`.replace(/(:|\?)bytes /g, '$1string ').replace(/</g, ' ').replace(/>|{|}/g, '').replace(/ \w+:flags\d*\.\d+\?true/g, '');
    if (currentConfig.name === 'inputMediaInvoice') {
      // eslint-disable-next-line no-empty
      if (currentConfig.name === 'inputMediaInvoice') {}
    }
    currentConfig.constructorId = crc32(Buffer.from(representation, 'utf8'));
  }
  for (const [brace, name, argType] of argsMatch) {
    if (brace === undefined) {
      currentConfig.argsConfig[variableSnakeToCamelCase(name)] = buildArgConfig(name, argType);
    }
  }
  if (currentConfig.name.includes('.')) {
    [currentConfig.namespace, currentConfig.name] = currentConfig.name.split(/\.(.+)/);
  }
  currentConfig.name = snakeToCamelCase(currentConfig.name);
  /*
  for (const arg in currentConfig.argsConfig){
    if (currentConfig.argsConfig.hasOwnProperty(arg)){
      if (currentConfig.argsConfig[arg].flagIndicator){
        delete  currentConfig.argsConfig[arg]
      }
    }
  } */
  return currentConfig;
};
function buildArgConfig(name, argType) {
  name = name === 'self' ? 'is_self' : name;
  // Default values
  const currentConfig = {
    isVector: false,
    isFlag: false,
    skipConstructorId: false,
    flagGroup: 0,
    flagIndex: -1,
    flagIndicator: true,
    type: undefined,
    useVectorId: undefined
  };

  // The type can be an indicator that other arguments will be flags
  if (argType !== '#') {
    currentConfig.flagIndicator = false;
    // Strip the exclamation mark always to have only the name
    currentConfig.type = argType.replace(/^!+/, '');

    // The type may be a flag (flags[N].IDX?REAL_TYPE)
    // Note that 'flags' is NOT the flags name; this
    // is determined by a previous argument
    // However, we assume that the argument will always be called 'flags[N]'
    const flagMatch = currentConfig.type.match(/flags(\d*)\.(\d+)\?([\w<>.]+)/);
    if (flagMatch) {
      currentConfig.isFlag = true;
      currentConfig.flagGroup = Number(flagMatch[1] || 1);
      currentConfig.flagIndex = Number(flagMatch[2]);
      // Update the type to match the exact type, not the "flagged" one
      [,,, currentConfig.type] = flagMatch;
    }

    // Then check if the type is a Vector<REAL_TYPE>
    const vectorMatch = currentConfig.type.match(/[Vv]ector<([\w\d.]+)>/);
    if (vectorMatch) {
      currentConfig.isVector = true;

      // If the type's first letter is not uppercase, then
      // it is a constructor and we use (read/write) its ID.
      currentConfig.useVectorId = currentConfig.type.charAt(0) === 'V';

      // Update the type to match the one inside the vector
      [, currentConfig.type] = vectorMatch;
    }

    // See use_vector_id. An example of such case is ipPort in
    // help.configSpecial
    if (/^[a-z]$/.test(currentConfig.type.split('.').pop().charAt(0))) {
      currentConfig.skipConstructorId = true;
    }

    // The name may contain "date" in it, if this is the case and
    // the type is "int", we can safely assume that this should be
    // treated as a "date" object. Note that this is not a valid
    // Telegram object, but it's easier to work with
    // if (
    //     this.type === 'int' &&
    //     (/(\b|_)([dr]ate|until|since)(\b|_)/.test(name) ||
    //         ['expires', 'expires_at', 'was_online'].includes(name))
    // ) {
    //     this.type = 'date';
    // }
  }
  return currentConfig;
}
function parseTl(content) {
  let methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let ignoreIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CORE_TYPES;
  return function* () {
    (methods || []).reduce((o, m) => ({
      ...o,
      [m.name]: m
    }), {});
    const objAll = [];
    const objByName = {};
    const objByType = {};
    const file = content;
    let isFunction = false;
    for (let line of file.split('\n')) {
      const commentIndex = line.indexOf('//');
      if (commentIndex !== -1) {
        line = line.slice(0, commentIndex);
      }
      line = line.trim();
      if (!line) {
        continue;
      }
      const match = line.match(/---(\w+)---/);
      if (match) {
        const [, followingTypes] = match;
        isFunction = followingTypes === 'functions';
        continue;
      }
      try {
        const result = fromLine(line, isFunction);
        if (ignoreIds.has(result.constructorId)) {
          continue;
        }
        objAll.push(result);
        if (!result.isFunction) {
          if (!objByType[result.result]) {
            objByType[result.result] = [];
          }
          objByName[result.name] = result;
          objByType[result.result].push(result);
        }
      } catch (e) {
        if (!e.toString().includes('vector#1cb5c415')) {
          throw e;
        }
      }
    }

    // Once all objects have been parsed, replace the
    // string type from the arguments with references
    for (const obj of objAll) {
      // console.log(obj)
      if (AUTH_KEY_TYPES.has(obj.constructorId)) {
        for (const arg in obj.argsConfig) {
          if (obj.argsConfig[arg].type === 'string') {
            obj.argsConfig[arg].type = 'bytes';
          }
        }
      }
    }
    for (const obj of objAll) {
      yield obj;
    }
  }();
}
function serializeBytes(data) {
  if (!(data instanceof Buffer)) {
    if (typeof data === 'string') {
      data = Buffer.from(data);
    } else {
      throw Error(`Bytes or str expected, not ${data.constructor.name}`);
    }
  }
  const r = [];
  let padding;
  if (data.length < 254) {
    padding = (data.length + 1) % 4;
    if (padding !== 0) {
      padding = 4 - padding;
    }
    r.push(Buffer.from([data.length]));
    r.push(data);
  } else {
    padding = data.length % 4;
    if (padding !== 0) {
      padding = 4 - padding;
    }
    r.push(Buffer.from([254, data.length % 256, (data.length >> 8) % 256, (data.length >> 16) % 256]));
    r.push(data);
  }
  r.push(Buffer.alloc(padding).fill(0));
  return Buffer.concat(r);
}
function serializeDate(dt) {
  if (!dt) {
    return Buffer.alloc(4).fill(0);
  }
  if (dt instanceof Date) {
    dt = Math.floor((Date.now() - dt.getTime()) / 1000);
  }
  if (typeof dt === 'number') {
    const t = Buffer.alloc(4);
    t.writeInt32LE(dt, 0);
    return t;
  }
  throw Error(`Cannot interpret "${dt}" as a date`);
}
module.exports = {
  findAll,
  parseTl,
  buildArgConfig,
  fromLine,
  CORE_TYPES,
  serializeDate,
  serializeBytes,
  snakeToCamelCase,
  variableSnakeToCamelCase
};

/***/ }),

/***/ "./src/lib/gramjs/tl/index.js":
/*!************************************!*\
  !*** ./src/lib/gramjs/tl/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const api = __webpack_require__(/*! ./api */ "./src/lib/gramjs/tl/api.js");
const {
  serializeBytes,
  serializeDate
} = __webpack_require__(/*! ./generationHelpers */ "./src/lib/gramjs/tl/generationHelpers.js");
module.exports = {
  // TODO Refactor internal usages to always use `api`.
  constructors: api,
  requests: api,
  serializeBytes,
  serializeDate
};

/***/ }),

/***/ "./src/lib/gramjs/tl/schemaTl.js":
/*!***************************************!*\
  !*** ./src/lib/gramjs/tl/schemaTl.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = `resPQ#05162463 nonce:int128 server_nonce:int128 pq:string server_public_key_fingerprints:Vector<long> = ResPQ;
p_q_inner_data#83c95aec pq:string p:string q:string nonce:int128 server_nonce:int128 new_nonce:int256 = P_Q_inner_data;
p_q_inner_data_dc#a9f55f95 pq:string p:string q:string nonce:int128 server_nonce:int128 new_nonce:int256 dc:int = P_Q_inner_data;
p_q_inner_data_temp#3c6a84d4 pq:string p:string q:string nonce:int128 server_nonce:int128 new_nonce:int256 expires_in:int = P_Q_inner_data;
p_q_inner_data_temp_dc#56fddf88 pq:string p:string q:string nonce:int128 server_nonce:int128 new_nonce:int256 dc:int expires_in:int = P_Q_inner_data;
server_DH_params_fail#79cb045d nonce:int128 server_nonce:int128 new_nonce_hash:int128 = Server_DH_Params;
server_DH_params_ok#d0e8075c nonce:int128 server_nonce:int128 encrypted_answer:string = Server_DH_Params;
server_DH_inner_data#b5890dba nonce:int128 server_nonce:int128 g:int dh_prime:string g_a:string server_time:int = Server_DH_inner_data;
client_DH_inner_data#6643b654 nonce:int128 server_nonce:int128 retry_id:long g_b:string = Client_DH_Inner_Data;
dh_gen_ok#3bcbf734 nonce:int128 server_nonce:int128 new_nonce_hash1:int128 = Set_client_DH_params_answer;
dh_gen_retry#46dc1fb9 nonce:int128 server_nonce:int128 new_nonce_hash2:int128 = Set_client_DH_params_answer;
dh_gen_fail#a69dae02 nonce:int128 server_nonce:int128 new_nonce_hash3:int128 = Set_client_DH_params_answer;
destroy_auth_key_ok#f660e1d4 = DestroyAuthKeyRes;
destroy_auth_key_none#0a9f2259 = DestroyAuthKeyRes;
destroy_auth_key_fail#ea109b13 = DestroyAuthKeyRes;
---functions---
req_pq#60469778 nonce:int128 = ResPQ;
req_pq_multi#be7e8ef1 nonce:int128 = ResPQ;
req_pq_multi_new#51b410fd nonce:int128 = ResPQ;
req_DH_params#d712e4be nonce:int128 server_nonce:int128 p:string q:string public_key_fingerprint:long encrypted_data:string = Server_DH_Params;
set_client_DH_params#f5045f1f nonce:int128 server_nonce:int128 encrypted_data:string = Set_client_DH_params_answer;
destroy_auth_key#d1435160 = DestroyAuthKeyRes;
---types---
msgs_ack#62d6b459 msg_ids:Vector<long> = MsgsAck;
bad_msg_notification#a7eff811 bad_msg_id:long bad_msg_seqno:int error_code:int = BadMsgNotification;
bad_server_salt#edab447b bad_msg_id:long bad_msg_seqno:int error_code:int new_server_salt:long = BadMsgNotification;
msgs_state_req#da69fb52 msg_ids:Vector<long> = MsgsStateReq;
msgs_state_info#04deb57d req_msg_id:long info:string = MsgsStateInfo;
msgs_all_info#8cc0d131 msg_ids:Vector<long> info:string = MsgsAllInfo;
msg_detailed_info#276d3ec6 msg_id:long answer_msg_id:long bytes:int status:int = MsgDetailedInfo;
msg_new_detailed_info#809db6df answer_msg_id:long bytes:int status:int = MsgDetailedInfo;
msg_resend_req#7d861a08 msg_ids:Vector<long> = MsgResendReq;
rpc_error#2144ca19 error_code:int error_message:string = RpcError;
rpc_answer_unknown#5e2ad36e = RpcDropAnswer;
rpc_answer_dropped_running#cd78e586 = RpcDropAnswer;
rpc_answer_dropped#a43ad8b7 msg_id:long seq_no:int bytes:int = RpcDropAnswer;
future_salt#0949d9dc valid_since:int valid_until:int salt:long = FutureSalt;
future_salts#ae500895 req_msg_id:long now:int salts:vector<future_salt> = FutureSalts;
pong#347773c5 msg_id:long ping_id:long = Pong;
destroy_session_ok#e22045fc session_id:long = DestroySessionRes;
destroy_session_none#62d350c9 session_id:long = DestroySessionRes;
new_session_created#9ec20908 first_msg_id:long unique_id:long server_salt:long = NewSession;
http_wait#9299359f max_delay:int wait_after:int max_wait:int = HttpWait;
ipPort#d433ad73 ipv4:int port:int = IpPort;
ipPortSecret#37982646 ipv4:int port:int secret:bytes = IpPort;
accessPointRule#4679b65f phone_prefix_rules:string dc_id:int ips:vector<IpPort> = AccessPointRule;
help.configSimple#5a592a6c date:int expires:int rules:vector<AccessPointRule> = help.ConfigSimple;
tlsClientHello blocks:vector<TlsBlock> = TlsClientHello;
tlsBlockString data:string = TlsBlock;
tlsBlockRandom length:int = TlsBlock;
tlsBlockZero length:int = TlsBlock;
tlsBlockDomain = TlsBlock;
tlsBlockGrease seed:int = TlsBlock;
tlsBlockScope entries:Vector<TlsBlock> = TlsBlock;
---functions---
ping#7abe77ec ping_id:long = Pong;
ping_delay_disconnect#f3427b8c ping_id:long disconnect_delay:int = Pong;`;

/***/ }),

/***/ "./src/util/foreman.ts":
/*!*****************************!*\
  !*** ./src/util/foreman.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Foreman: () => (/* binding */ Foreman)
/* harmony export */ });
/* harmony import */ var _Deferred__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Deferred */ "./src/util/Deferred.ts");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

class Foreman {
  constructor(maxWorkers) {
    this.maxWorkers = maxWorkers;
    _defineProperty(this, "deferreds", []);
    _defineProperty(this, "activeWorkers", 0);
  }
  requestWorker() {
    if (this.activeWorkers === this.maxWorkers) {
      const deferred = new _Deferred__WEBPACK_IMPORTED_MODULE_0__["default"]();
      this.deferreds.push(deferred);
      return deferred.promise;
    } else {
      this.activeWorkers++;
    }
    return Promise.resolve();
  }
  releaseWorker() {
    if (this.deferreds.length && this.activeWorkers === this.maxWorkers) {
      const deferred = this.deferreds.shift();
      deferred.resolve();
    } else {
      this.activeWorkers--;
    }
  }
}

/***/ })

}]);
//# sourceMappingURL=src_api_gramjs_apiBuilders_messages_ts.79fa57eddc7356ae8f68.js.map