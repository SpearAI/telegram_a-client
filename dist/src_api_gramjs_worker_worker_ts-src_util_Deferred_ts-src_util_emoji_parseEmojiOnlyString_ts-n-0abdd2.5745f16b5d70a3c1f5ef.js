/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/gramjs/ChatAbortController.ts":
/*!***********************************************!*\
  !*** ./src/api/gramjs/ChatAbortController.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatAbortController: () => (/* binding */ ChatAbortController)
/* harmony export */ });
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ChatAbortController extends AbortController {
  constructor() {
    super(...arguments);
    _defineProperty(this, "threads", new Map());
  }
  getThreadSignal(threadId) {
    let controller = this.threads.get(threadId);
    if (!controller) {
      controller = new AbortController();
      this.threads.set(threadId, controller);
    }
    return controller.signal;
  }
  abortThread(threadId, reason) {
    this.threads.get(threadId)?.abort(reason);
    this.threads.delete(threadId);
  }
  abort(reason) {
    super.abort(reason);
    this.threads.forEach(controller => controller.abort(reason));
    this.threads.clear();
  }
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/appConfig.ts":
/*!*************************************************!*\
  !*** ./src/api/gramjs/apiBuilders/appConfig.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildAppConfig: () => (/* binding */ buildAppConfig)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./misc */ "./src/api/gramjs/apiBuilders/misc.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
/* eslint-disable @typescript-eslint/naming-convention */





function buildEmojiSounds(appConfig) {
  const {
    emojies_sounds
  } = appConfig;
  return emojies_sounds ? Object.keys(emojies_sounds).reduce((acc, key) => {
    const l = emojies_sounds[key];
    _localDb__WEBPACK_IMPORTED_MODULE_3__["default"].documents[l.id] = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document({
      id: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(l.id),
      accessHash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(l.access_hash),
      dcId: 1,
      mimeType: 'audio/ogg',
      fileReference: Buffer.alloc(0),
      size: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(0)
    });
    acc[key] = l.id;
    return acc;
  }, {}) : {};
}
function getLimit(appConfig, key, fallbackKey) {
  const defaultLimit = appConfig[`${key}_default`] || _config__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_LIMITS[fallbackKey][0];
  const premiumLimit = appConfig[`${key}_premium`] || _config__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_LIMITS[fallbackKey][1];
  return [defaultLimit, premiumLimit];
}
function buildAppConfig(json, hash) {
  const appConfig = (0,_misc__WEBPACK_IMPORTED_MODULE_4__.buildJson)(json);
  return {
    emojiSounds: buildEmojiSounds(appConfig),
    seenByMaxChatMembers: appConfig.chat_read_mark_size_threshold,
    seenByExpiresAt: appConfig.chat_read_mark_expire_period,
    readDateExpiresAt: appConfig.pm_read_date_expire_period,
    autologinDomains: appConfig.autologin_domains || [],
    urlAuthDomains: appConfig.url_auth_domains || [],
    maxUniqueReactions: appConfig.reactions_uniq_max,
    premiumBotUsername: appConfig.premium_bot_username,
    premiumInvoiceSlug: appConfig.premium_invoice_slug,
    premiumPromoOrder: appConfig.premium_promo_order,
    isPremiumPurchaseBlocked: appConfig.premium_purchase_blocked,
    isGiveawayGiftsPurchaseAvailable: appConfig.giveaway_gifts_purchase_available,
    defaultEmojiStatusesStickerSetId: appConfig.default_emoji_statuses_stickerset_id,
    topicsPinnedLimit: appConfig.topics_pinned_limit,
    maxUserReactionsDefault: appConfig.reactions_user_max_default,
    maxUserReactionsPremium: appConfig.reactions_user_max_premium,
    hiddenMembersMinCount: appConfig.hidden_members_group_size_min,
    giveawayAddPeersMax: appConfig.giveaway_add_peers_max,
    giveawayBoostsPerPremium: appConfig.giveaway_boosts_per_premium,
    giveawayCountriesMax: appConfig.giveaway_countries_max,
    boostsPerSentGift: appConfig.boosts_per_sent_gift,
    canDisplayAutoarchiveSetting: appConfig.autoarchive_setting_available,
    limits: {
      uploadMaxFileparts: getLimit(appConfig, 'upload_max_fileparts', 'uploadMaxFileparts'),
      stickersFaved: getLimit(appConfig, 'stickers_faved_limit', 'stickersFaved'),
      savedGifs: getLimit(appConfig, 'saved_gifs_limit', 'savedGifs'),
      dialogFiltersChats: getLimit(appConfig, 'dialog_filters_chats_limit', 'dialogFiltersChats'),
      dialogFilters: getLimit(appConfig, 'dialog_filters_limit', 'dialogFilters'),
      dialogFolderPinned: getLimit(appConfig, 'dialogs_pinned_limit', 'dialogFolderPinned'),
      captionLength: getLimit(appConfig, 'caption_length_limit', 'captionLength'),
      channels: getLimit(appConfig, 'channels_limit', 'channels'),
      channelsPublic: getLimit(appConfig, 'channels_public_limit', 'channelsPublic'),
      aboutLength: getLimit(appConfig, 'about_length_limit', 'aboutLength'),
      chatlistInvites: getLimit(appConfig, 'chatlist_invites_limit', 'chatlistInvites'),
      chatlistJoined: getLimit(appConfig, 'chatlist_joined_limit', 'chatlistJoined'),
      recommendedChannels: getLimit(appConfig, 'recommended_channels_limit', 'recommendedChannels'),
      savedDialogsPinned: getLimit(appConfig, 'saved_dialogs_pinned_limit', 'savedDialogsPinned')
    },
    hash,
    areStoriesHidden: appConfig.stories_all_hidden,
    storyExpirePeriod: appConfig.story_expire_period ?? _config__WEBPACK_IMPORTED_MODULE_2__.STORY_EXPIRE_PERIOD,
    storyViewersExpirePeriod: appConfig.story_viewers_expire_period ?? _config__WEBPACK_IMPORTED_MODULE_2__.STORY_VIEWERS_EXPIRE_PERIOD,
    storyChangelogUserId: appConfig.stories_changelog_user_id?.toString() ?? _config__WEBPACK_IMPORTED_MODULE_2__.SERVICE_NOTIFICATIONS_USER_ID,
    maxPinnedStoriesCount: appConfig.stories_pinned_to_top_count_max,
    groupTranscribeLevelMin: appConfig.group_transcribe_level_min,
    canLimitNewMessagesWithoutPremium: appConfig.new_noncontact_peers_require_premium_without_ownpremium,
    bandwidthPremiumNotifyPeriod: appConfig.upload_premium_speedup_notify_period,
    bandwidthPremiumUploadSpeedup: appConfig.upload_premium_speedup_upload,
    bandwidthPremiumDownloadSpeedup: appConfig.upload_premium_speedup_download,
    channelRestrictAdsLevelMin: appConfig.channel_restrict_sponsored_level_min
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/bots.ts":
/*!********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/bots.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiAttachBot: () => (/* binding */ buildApiAttachBot),
/* harmony export */   buildApiBotApp: () => (/* binding */ buildApiBotApp),
/* harmony export */   buildApiBotInfo: () => (/* binding */ buildApiBotInfo),
/* harmony export */   buildApiBotInlineMediaResult: () => (/* binding */ buildApiBotInlineMediaResult),
/* harmony export */   buildApiBotInlineResult: () => (/* binding */ buildApiBotInlineResult),
/* harmony export */   buildApiBotMenuButton: () => (/* binding */ buildApiBotMenuButton),
/* harmony export */   buildApiMessagesBotApp: () => (/* binding */ buildApiMessagesBotApp),
/* harmony export */   buildBotSwitchPm: () => (/* binding */ buildBotSwitchPm),
/* harmony export */   buildBotSwitchWebview: () => (/* binding */ buildBotSwitchWebview)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./src/api/gramjs/apiBuilders/helpers.ts");
/* harmony import */ var _messageContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _symbols__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./symbols */ "./src/api/gramjs/apiBuilders/symbols.ts");








function buildApiBotInlineResult(result, queryId) {
  const {
    id,
    type,
    title,
    description,
    url,
    thumb
  } = result;
  return {
    id,
    queryId,
    type: type,
    title,
    description,
    url,
    webThumbnail: (0,_messageContent__WEBPACK_IMPORTED_MODULE_5__.buildApiWebDocument)(thumb)
  };
}
function buildApiBotInlineMediaResult(result, queryId) {
  const {
    id,
    type,
    title,
    description,
    photo,
    document
  } = result;
  return {
    id,
    queryId,
    type: type,
    title,
    description,
    ...(type === 'sticker' && document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document && {
      sticker: (0,_symbols__WEBPACK_IMPORTED_MODULE_7__.buildStickerFromDocument)(document)
    }),
    ...(photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo && {
      photo: (0,_common__WEBPACK_IMPORTED_MODULE_3__.buildApiPhoto)(photo)
    }),
    ...(type === 'gif' && document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document && {
      gif: (0,_messageContent__WEBPACK_IMPORTED_MODULE_5__.buildVideoFromDocument)(document)
    }),
    ...(type === 'video' && document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document && {
      thumbnail: (0,_common__WEBPACK_IMPORTED_MODULE_3__.buildApiThumbnailFromStripped)(document.thumbs)
    })
  };
}
function buildBotSwitchPm(switchPm) {
  return switchPm ? (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.pick)(switchPm, ['text', 'startParam']) : undefined;
}
function buildBotSwitchWebview(switchWebview) {
  return switchWebview ? (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.pick)(switchWebview, ['text', 'url']) : undefined;
}
function buildApiAttachBot(bot) {
  return {
    id: bot.botId.toString(),
    shouldRequestWriteAccess: bot.requestWriteAccess,
    shortName: bot.shortName,
    isForAttachMenu: bot.showInAttachMenu,
    isForSideMenu: bot.showInSideMenu,
    attachMenuPeerTypes: bot.peerTypes?.map(buildApiAttachMenuPeerType),
    icons: bot.icons.map(buildApiAttachMenuIcon).filter(Boolean),
    isInactive: bot.inactive,
    isDisclaimerNeeded: bot.sideMenuDisclaimerNeeded
  };
}
function buildApiAttachMenuPeerType(peerType) {
  if (peerType instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.AttachMenuPeerTypeBotPM) return 'bots';
  if (peerType instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.AttachMenuPeerTypePM) return 'users';
  if (peerType instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.AttachMenuPeerTypeChat) return 'chats';
  if (peerType instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.AttachMenuPeerTypeBroadcast) return 'channels';
  if (peerType instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.AttachMenuPeerTypeSameBotPM) return 'self';
  return undefined; // Never reached
}
function buildApiAttachMenuIcon(icon) {
  if (!(icon.icon instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document)) return undefined;
  const document = (0,_messageContent__WEBPACK_IMPORTED_MODULE_5__.buildApiDocument)(icon.icon);
  if (!document) return undefined;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.addDocumentToLocalDb)(icon.icon);
  return {
    name: icon.name,
    document
  };
}
function buildApiBotInfo(botInfo, chatId) {
  const {
    description,
    descriptionPhoto,
    descriptionDocument,
    userId,
    commands,
    menuButton
  } = botInfo;
  const botId = userId && (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(userId, 'user');
  const photo = descriptionPhoto instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo ? (0,_common__WEBPACK_IMPORTED_MODULE_3__.buildApiPhoto)(descriptionPhoto) : undefined;
  const gif = descriptionDocument instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document ? (0,_messageContent__WEBPACK_IMPORTED_MODULE_5__.buildVideoFromDocument)(descriptionDocument) : undefined;
  const commandsArray = commands?.map(command => buildApiBotCommand(botId || chatId, command));
  return {
    botId: botId || chatId,
    description,
    gif,
    photo,
    menuButton: buildApiBotMenuButton(menuButton),
    commands: commandsArray?.length ? commandsArray : undefined
  };
}
function buildApiBotCommand(botId, command) {
  return {
    botId,
    ...(0,_helpers__WEBPACK_IMPORTED_MODULE_4__.omitVirtualClassFields)(command)
  };
}
function buildApiBotMenuButton(menuButton) {
  if (menuButton instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.BotMenuButton) {
    return {
      type: 'webApp',
      text: menuButton.text,
      url: menuButton.url
    };
  }
  return {
    type: 'commands'
  };
}
function buildApiBotApp(app) {
  if (app instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.BotAppNotModified) return undefined;
  const {
    id,
    accessHash,
    title,
    description,
    shortName,
    photo,
    document
  } = app;
  const apiPhoto = photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo ? (0,_common__WEBPACK_IMPORTED_MODULE_3__.buildApiPhoto)(photo) : undefined;
  const apiDocument = document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document ? (0,_messageContent__WEBPACK_IMPORTED_MODULE_5__.buildApiDocument)(document) : undefined;
  return {
    id: id.toString(),
    accessHash: accessHash.toString(),
    title,
    description,
    shortName,
    photo: apiPhoto,
    document: apiDocument
  };
}
function buildApiMessagesBotApp(botApp) {
  const {
    app,
    inactive,
    requestWriteAccess
  } = botApp;
  const baseApp = buildApiBotApp(app);
  if (!baseApp) return undefined;
  return {
    ...baseApp,
    isInactive: inactive,
    shouldRequestWriteAccess: requestWriteAccess
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/business.ts":
/*!************************************************!*\
  !*** ./src/api/gramjs/apiBuilders/business.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiBusinessIntro: () => (/* binding */ buildApiBusinessIntro),
/* harmony export */   buildApiBusinessLocation: () => (/* binding */ buildApiBusinessLocation),
/* harmony export */   buildApiBusinessWorkHours: () => (/* binding */ buildApiBusinessWorkHours)
/* harmony export */ });
/* harmony import */ var _messageContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbols */ "./src/api/gramjs/apiBuilders/symbols.ts");


function buildApiBusinessLocation(location) {
  const {
    address,
    geoPoint
  } = location;
  return {
    address,
    geo: geoPoint && (0,_messageContent__WEBPACK_IMPORTED_MODULE_0__.buildGeoPoint)(geoPoint)
  };
}
function buildApiBusinessWorkHours(workHours) {
  const {
    timezoneId,
    weeklyOpen
  } = workHours;
  return {
    timezoneId,
    workHours: weeklyOpen.map(_ref => {
      let {
        startMinute,
        endMinute
      } = _ref;
      return {
        startMinute,
        endMinute
      };
    })
  };
}
function buildApiBusinessIntro(intro) {
  const {
    title,
    description,
    sticker
  } = intro;
  return {
    title,
    description,
    sticker: sticker && (0,_symbols__WEBPACK_IMPORTED_MODULE_1__.buildStickerFromDocument)(sticker)
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/chats.ts":
/*!*********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/chats.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiChatBotCommands: () => (/* binding */ buildApiChatBotCommands),
/* harmony export */   buildApiChatFolder: () => (/* binding */ buildApiChatFolder),
/* harmony export */   buildApiChatFolderFromSuggested: () => (/* binding */ buildApiChatFolderFromSuggested),
/* harmony export */   buildApiChatFromDialog: () => (/* binding */ buildApiChatFromDialog),
/* harmony export */   buildApiChatFromPreview: () => (/* binding */ buildApiChatFromPreview),
/* harmony export */   buildApiChatFromSavedDialog: () => (/* binding */ buildApiChatFromSavedDialog),
/* harmony export */   buildApiChatReactions: () => (/* binding */ buildApiChatReactions),
/* harmony export */   buildApiChatSettings: () => (/* binding */ buildApiChatSettings),
/* harmony export */   buildApiChatlistExportedInvite: () => (/* binding */ buildApiChatlistExportedInvite),
/* harmony export */   buildApiChatlistInvite: () => (/* binding */ buildApiChatlistInvite),
/* harmony export */   buildApiExportedInvite: () => (/* binding */ buildApiExportedInvite),
/* harmony export */   buildApiMissingInvitedUser: () => (/* binding */ buildApiMissingInvitedUser),
/* harmony export */   buildApiSendAsPeerId: () => (/* binding */ buildApiSendAsPeerId),
/* harmony export */   buildApiSponsoredMessageReportResult: () => (/* binding */ buildApiSponsoredMessageReportResult),
/* harmony export */   buildApiTopic: () => (/* binding */ buildApiTopic),
/* harmony export */   buildAvatarHash: () => (/* binding */ buildAvatarHash),
/* harmony export */   buildChatInviteImporter: () => (/* binding */ buildChatInviteImporter),
/* harmony export */   buildChatMember: () => (/* binding */ buildChatMember),
/* harmony export */   buildChatMembers: () => (/* binding */ buildChatMembers),
/* harmony export */   buildChatTypingStatus: () => (/* binding */ buildChatTypingStatus),
/* harmony export */   getApiChatTitleFromMtpPeer: () => (/* binding */ getApiChatTitleFromMtpPeer),
/* harmony export */   getApiChatTypeFromPeerEntity: () => (/* binding */ getApiChatTypeFromPeerEntity),
/* harmony export */   getPeerKey: () => (/* binding */ getPeerKey)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _util_serverTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/serverTime */ "./src/util/serverTime.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers */ "./src/api/gramjs/apiBuilders/helpers.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _reactions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reactions */ "./src/api/gramjs/apiBuilders/reactions.ts");








function buildApiChatFieldsFromPeerEntity(peerEntity) {
  let isSupport = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const isMin = Boolean('min' in peerEntity && peerEntity.min);
  const accessHash = 'accessHash' in peerEntity ? String(peerEntity.accessHash) : undefined;
  const hasVideoAvatar = 'photo' in peerEntity && peerEntity.photo && 'hasVideo' in peerEntity.photo && peerEntity.photo.hasVideo;
  const avatarHash = 'photo' in peerEntity && peerEntity.photo ? buildAvatarHash(peerEntity.photo) : undefined;
  const isSignaturesShown = Boolean('signatures' in peerEntity && peerEntity.signatures);
  const hasPrivateLink = Boolean('hasLink' in peerEntity && peerEntity.hasLink);
  const isScam = Boolean('scam' in peerEntity && peerEntity.scam);
  const isFake = Boolean('fake' in peerEntity && peerEntity.fake);
  const isJoinToSend = Boolean('joinToSend' in peerEntity && peerEntity.joinToSend);
  const isJoinRequest = Boolean('joinRequest' in peerEntity && peerEntity.joinRequest);
  const usernames = (0,_common__WEBPACK_IMPORTED_MODULE_4__.buildApiUsernames)(peerEntity);
  const isForum = Boolean('forum' in peerEntity && peerEntity.forum);
  const areStoriesHidden = Boolean('storiesHidden' in peerEntity && peerEntity.storiesHidden);
  const maxStoryId = 'storiesMaxId' in peerEntity ? peerEntity.storiesMaxId : undefined;
  const storiesUnavailable = Boolean('storiesUnavailable' in peerEntity && peerEntity.storiesUnavailable);
  const color = 'color' in peerEntity && peerEntity.color ? (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerColor)(peerEntity.color) : undefined;
  const emojiStatus = 'emojiStatus' in peerEntity && peerEntity.emojiStatus ? (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiEmojiStatus)(peerEntity.emojiStatus) : undefined;
  const boostLevel = 'level' in peerEntity ? peerEntity.level : undefined;
  return (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.omitUndefined)({
    isMin,
    hasPrivateLink,
    isSignaturesShown,
    usernames,
    accessHash,
    hasVideoAvatar,
    avatarHash,
    ...('verified' in peerEntity && {
      isVerified: peerEntity.verified
    }),
    ...('callActive' in peerEntity && {
      isCallActive: peerEntity.callActive
    }),
    ...('callNotEmpty' in peerEntity && {
      isCallNotEmpty: peerEntity.callNotEmpty
    }),
    ...('date' in peerEntity && {
      creationDate: peerEntity.date
    }),
    ...('participantsCount' in peerEntity && peerEntity.participantsCount !== undefined && {
      membersCount: peerEntity.participantsCount
    }),
    ...('noforwards' in peerEntity && {
      isProtected: Boolean(peerEntity.noforwards)
    }),
    isSupport: isSupport || undefined,
    ...buildApiChatPermissions(peerEntity),
    ...('creator' in peerEntity && {
      isCreator: peerEntity.creator
    }),
    ...buildApiChatRestrictions(peerEntity),
    ...buildApiChatMigrationInfo(peerEntity),
    fakeType: isScam ? 'scam' : isFake ? 'fake' : undefined,
    color,
    isJoinToSend,
    isJoinRequest,
    isForum,
    areStoriesHidden,
    maxStoryId,
    hasStories: Boolean(maxStoryId) && !storiesUnavailable,
    emojiStatus,
    boostLevel
  });
}
function buildApiChatFromDialog(dialog, peerEntity) {
  const {
    peer,
    folderId,
    unreadMark,
    unreadCount,
    unreadMentionsCount,
    unreadReactionsCount,
    notifySettings: {
      silent,
      muteUntil
    },
    readOutboxMaxId,
    readInboxMaxId,
    draft,
    viewForumAsMessages
  } = dialog;
  const isMuted = silent || typeof muteUntil === 'number' && (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_2__.getServerTime)() < muteUntil;
  return {
    id: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(peer),
    ...(folderId && {
      folderId
    }),
    type: getApiChatTypeFromPeerEntity(peerEntity),
    title: getApiChatTitleFromMtpPeer(peer, peerEntity),
    lastReadOutboxMessageId: readOutboxMaxId,
    lastReadInboxMessageId: readInboxMaxId,
    unreadCount,
    unreadMentionsCount,
    unreadReactionsCount,
    isMuted,
    muteUntil,
    ...(unreadMark && {
      hasUnreadMark: true
    }),
    ...(draft instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DraftMessage && {
      draftDate: draft.date
    }),
    ...(viewForumAsMessages && {
      isForumAsMessages: true
    }),
    ...buildApiChatFieldsFromPeerEntity(peerEntity)
  };
}
function buildApiChatFromSavedDialog(dialog, peerEntity) {
  const {
    peer
  } = dialog;
  return {
    id: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(peer),
    type: getApiChatTypeFromPeerEntity(peerEntity),
    title: getApiChatTitleFromMtpPeer(peer, peerEntity),
    ...buildApiChatFieldsFromPeerEntity(peerEntity)
  };
}
function buildApiChatPermissions(peerEntity) {
  if (!(peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Chat || peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Channel)) {
    return {};
  }
  return {
    adminRights: peerEntity.adminRights ? (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.omitVirtualClassFields)(peerEntity.adminRights) : undefined,
    currentUserBannedRights: 'bannedRights' in peerEntity && peerEntity.bannedRights ? (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.omitVirtualClassFields)(peerEntity.bannedRights) : undefined,
    defaultBannedRights: peerEntity.defaultBannedRights ? (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.omitVirtualClassFields)(peerEntity.defaultBannedRights) : undefined
  };
}
function buildApiChatRestrictions(peerEntity) {
  if (peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatForbidden) {
    return {
      isForbidden: true
    };
  }
  if (peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChannelForbidden) {
    return {
      isRestricted: true
    };
  }
  const restrictions = {};
  if ('restricted' in peerEntity) {
    const restrictionReason = peerEntity.restricted ? buildApiChatRestrictionReason(peerEntity.restrictionReason) : undefined;
    if (restrictionReason) {
      Object.assign(restrictions, {
        isRestricted: true,
        restrictionReason
      });
    }
  }
  if (peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Chat) {
    Object.assign(restrictions, {
      isNotJoined: peerEntity.left
    });
  }
  if (peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Channel) {
    Object.assign(restrictions, {
      // `left` is weirdly set to `true` on all channels never joined before
      isNotJoined: peerEntity.left
    });
  }
  return restrictions;
}
function buildApiChatMigrationInfo(peerEntity) {
  if ('migratedTo' in peerEntity && peerEntity.migratedTo && !(peerEntity.migratedTo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputChannelEmpty)) {
    return {
      migratedTo: {
        chatId: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(peerEntity.migratedTo),
        ...(peerEntity.migratedTo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputChannel && {
          accessHash: String(peerEntity.migratedTo.accessHash)
        })
      }
    };
  }
  return {};
}
function buildApiChatRestrictionReason(restrictionReasons) {
  if (!restrictionReasons) {
    return undefined;
  }
  const targetReason = restrictionReasons.find(_ref => {
    let {
      platform
    } = _ref;
    return platform === 'all';
  });
  return targetReason ? (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.pick)(targetReason, ['reason', 'text']) : undefined;
}
function buildApiChatFromPreview(preview) {
  let isSupport = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (preview instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatEmpty || preview instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UserEmpty) {
    return undefined;
  }
  const id = (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(preview.id, preview instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User ? 'user' : preview instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Chat || preview instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatForbidden ? 'chat' : 'channel');
  return {
    id,
    type: getApiChatTypeFromPeerEntity(preview),
    title: preview instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User ? getUserName(preview) : preview.title,
    ...buildApiChatFieldsFromPeerEntity(preview, isSupport)
  };
}
function getApiChatTypeFromPeerEntity(peerEntity) {
  if (peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User || peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UserEmpty) {
    return 'chatTypePrivate';
  } else if (peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Chat || peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatForbidden || peerEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatEmpty) {
    return 'chatTypeBasicGroup';
  } else {
    return peerEntity.megagroup ? 'chatTypeSuperGroup' : 'chatTypeChannel';
  }
}
function getPeerKey(peer) {
  if ((0,_peers__WEBPACK_IMPORTED_MODULE_6__.isPeerUser)(peer)) {
    return `user${peer.userId}`;
  } else if ((0,_peers__WEBPACK_IMPORTED_MODULE_6__.isPeerChat)(peer)) {
    return `chat${peer.chatId}`;
  } else {
    return `chat${peer.channelId}`;
  }
}
function getApiChatTitleFromMtpPeer(peer, peerEntity) {
  if ((0,_peers__WEBPACK_IMPORTED_MODULE_6__.isPeerUser)(peer)) {
    return getUserName(peerEntity);
  } else {
    return peerEntity.title;
  }
}
function getUserName(user) {
  return user.firstName ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}` : user.lastName || '';
}
function buildAvatarHash(photo) {
  if ('photoId' in photo) {
    return String(photo.photoId);
  }
  return undefined;
}
function buildChatMember(member) {
  const userId = member instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChannelParticipantBanned || member instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChannelParticipantLeft ? (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(member.peer) : (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(member.userId, 'user');
  return {
    userId,
    inviterId: 'inviterId' in member && member.inviterId ? (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(member.inviterId, 'user') : undefined,
    joinedDate: 'date' in member ? member.date : undefined,
    kickedByUserId: 'kickedBy' in member && member.kickedBy ? (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(member.kickedBy, 'user') : undefined,
    promotedByUserId: 'promotedBy' in member && member.promotedBy ? (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(member.promotedBy, 'user') : undefined,
    bannedRights: 'bannedRights' in member ? (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.omitVirtualClassFields)(member.bannedRights) : undefined,
    adminRights: 'adminRights' in member ? (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.omitVirtualClassFields)(member.adminRights) : undefined,
    customTitle: 'rank' in member ? member.rank : undefined,
    ...((member instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChannelParticipantAdmin || member instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatParticipantAdmin) && {
      isAdmin: true
    }),
    ...((member instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChannelParticipantCreator || member instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatParticipantCreator) && {
      isOwner: true
    })
  };
}
function buildChatMembers(participants) {
  // Duplicate code because of TS union-type shenanigans
  if (participants instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatParticipants) {
    return participants.participants.map(buildChatMember).filter(Boolean);
  }
  if (participants instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.channels.ChannelParticipants) {
    return participants.participants.map(buildChatMember).filter(Boolean);
  }
  return undefined;
}
function buildChatTypingStatus(update) {
  let action = '';
  let emoticon;
  if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageCancelAction) {
    return undefined;
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageTypingAction) {
    action = 'lng_user_typing';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageRecordVideoAction) {
    action = 'lng_send_action_record_video';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageUploadVideoAction) {
    action = 'lng_send_action_upload_video';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageRecordAudioAction) {
    action = 'lng_send_action_record_audio';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageUploadAudioAction) {
    action = 'lng_send_action_upload_audio';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageUploadPhotoAction) {
    action = 'lng_send_action_upload_photo';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageUploadDocumentAction) {
    action = 'lng_send_action_upload_file';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageGeoLocationAction) {
    action = 'selecting a location to share';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageChooseContactAction) {
    action = 'selecting a contact to share';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageGamePlayAction) {
    action = 'lng_playing_game';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageRecordRoundAction) {
    action = 'lng_send_action_record_round';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageUploadRoundAction) {
    action = 'lng_send_action_upload_round';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageChooseStickerAction) {
    action = 'lng_send_action_choose_sticker';
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SpeakingInGroupCallAction) {
    return undefined;
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageEmojiInteractionSeen) {
    action = 'lng_user_action_watching_animations';
    emoticon = update.action.emoticon;
  } else if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageEmojiInteraction) {
    return undefined;
  }
  return {
    action,
    ...(emoticon && {
      emoji: emoticon
    }),
    ...(!(update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateUserTyping) && {
      userId: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(update.fromId)
    }),
    timestamp: Date.now() + (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_2__.getServerTimeOffset)() * 1000
  };
}
function buildApiChatFolder(filter) {
  if (filter instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogFilterChatlist) {
    return {
      ...(0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.pickTruthy)(filter, ['id', 'title', 'emoticon']),
      excludedChatIds: [],
      includedChatIds: filter.includePeers.map(_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer).filter(Boolean),
      pinnedChatIds: filter.pinnedPeers.map(_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer).filter(Boolean),
      hasMyInvites: filter.hasMyInvites,
      isChatList: true
    };
  }
  return {
    ...(0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.pickTruthy)(filter, ['id', 'title', 'emoticon', 'contacts', 'nonContacts', 'groups', 'bots', 'excludeMuted', 'excludeRead', 'excludeArchived']),
    channels: filter.broadcasts,
    pinnedChatIds: filter.pinnedPeers.map(_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer).filter(Boolean),
    includedChatIds: filter.includePeers.map(_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer).filter(Boolean),
    excludedChatIds: filter.excludePeers.map(_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer).filter(Boolean)
  };
}
function buildApiChatFolderFromSuggested(_ref2) {
  let {
    filter,
    description
  } = _ref2;
  if (!(filter instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogFilter || filter instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogFilterChatlist)) return undefined;
  return {
    ...buildApiChatFolder(filter),
    description
  };
}
function buildApiChatBotCommands(botInfos) {
  return botInfos.reduce((botCommands, botInfo) => {
    const botId = (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(botInfo.userId, 'user');
    if (botInfo.commands) {
      botCommands = botCommands.concat(botInfo.commands.map(mtpCommand => ({
        botId,
        ...(0,_helpers__WEBPACK_IMPORTED_MODULE_5__.omitVirtualClassFields)(mtpCommand)
      })));
    }
    return botCommands;
  }, []);
}
function buildApiExportedInvite(invite) {
  const {
    revoked,
    date,
    expireDate,
    link,
    permanent,
    startDate,
    usage,
    usageLimit,
    requested,
    requestNeeded,
    title,
    adminId
  } = invite;
  return {
    isRevoked: revoked,
    date,
    expireDate,
    link,
    isPermanent: permanent,
    startDate,
    usage,
    usageLimit,
    isRequestNeeded: requestNeeded,
    requested,
    title,
    adminId: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(adminId, 'user')
  };
}
function buildChatInviteImporter(importer) {
  const {
    userId,
    date,
    about,
    requested,
    viaChatlist
  } = importer;
  return {
    userId: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(userId, 'user'),
    date,
    about,
    isRequested: requested,
    isFromChatList: viaChatlist
  };
}
function buildApiChatSettings(_ref3) {
  let {
    autoarchived,
    reportSpam,
    addContact,
    blockContact
  } = _ref3;
  return {
    isAutoArchived: Boolean(autoarchived),
    canReportSpam: Boolean(reportSpam),
    canAddContact: Boolean(addContact),
    canBlockContact: Boolean(blockContact)
  };
}
function buildApiChatReactions(chatReactions) {
  if (chatReactions instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatReactionsAll) {
    return {
      type: 'all',
      areCustomAllowed: chatReactions.allowCustom
    };
  }
  if (chatReactions instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatReactionsSome) {
    return {
      type: 'some',
      allowed: chatReactions.reactions.map(_reactions__WEBPACK_IMPORTED_MODULE_7__.buildApiReaction).filter(Boolean)
    };
  }
  return undefined;
}
function buildApiSendAsPeerId(sendAs) {
  return {
    id: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(sendAs.peer),
    isPremium: sendAs.premiumRequired
  };
}
function buildApiTopic(forumTopic) {
  if (forumTopic instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ForumTopicDeleted) {
    return undefined;
  }
  const {
    id,
    my,
    closed,
    pinned,
    hidden,
    short,
    date,
    title,
    iconColor,
    iconEmojiId,
    topMessage,
    unreadCount,
    unreadMentionsCount,
    unreadReactionsCount,
    fromId,
    notifySettings: {
      silent,
      muteUntil
    }
  } = forumTopic;
  return {
    id,
    isClosed: closed,
    isPinned: pinned,
    isHidden: hidden,
    isOwner: my,
    isMin: short,
    date,
    title,
    iconColor,
    iconEmojiId: iconEmojiId?.toString(),
    lastMessageId: topMessage,
    unreadCount,
    unreadMentionsCount,
    unreadReactionsCount,
    fromId: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(fromId),
    isMuted: silent || (typeof muteUntil === 'number' ? (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_2__.getServerTime)() < muteUntil : undefined),
    muteUntil
  };
}
function buildApiChatlistInvite(invite, slug) {
  if (invite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.chatlists.ChatlistInvite) {
    return {
      slug,
      title: invite.title,
      emoticon: invite.emoticon,
      peerIds: invite.peers.map(_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer).filter(Boolean)
    };
  }
  if (invite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.chatlists.ChatlistInviteAlready) {
    return {
      slug,
      folderId: invite.filterId,
      missingPeerIds: invite.missingPeers.map(_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer).filter(Boolean),
      alreadyPeerIds: invite.alreadyPeers.map(_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer).filter(Boolean)
    };
  }
  return undefined;
}
function buildApiChatlistExportedInvite(invite) {
  if (!(invite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ExportedChatlistInvite)) return undefined;
  const {
    title,
    url,
    peers
  } = invite;
  return {
    title,
    url,
    peerIds: peers.map(_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer).filter(Boolean)
  };
}
function buildApiMissingInvitedUser(user) {
  return {
    id: user.userId.toString(),
    isRequiringPremiumToMessage: user.premiumRequiredForPm,
    isRequiringPremiumToInvite: user.premiumWouldAllowInvite
  };
}
function buildApiSponsoredMessageReportResult(result) {
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.channels.SponsoredMessageReportResultReported) {
    return {
      type: 'reported'
    };
  }
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.channels.SponsoredMessageReportResultAdsHidden) {
    return {
      type: 'hidden'
    };
  }
  const title = result.title;
  const options = result.options.map(option => ({
    text: option.text,
    option: (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.serializeBytes)(option.option)
  }));
  return {
    type: 'selectOption',
    title,
    options
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/misc.ts":
/*!********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/misc.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiChatLink: () => (/* binding */ buildApiChatLink),
/* harmony export */   buildApiCollectibleInfo: () => (/* binding */ buildApiCollectibleInfo),
/* harmony export */   buildApiConfig: () => (/* binding */ buildApiConfig),
/* harmony export */   buildApiCountryList: () => (/* binding */ buildApiCountryList),
/* harmony export */   buildApiLanguage: () => (/* binding */ buildApiLanguage),
/* harmony export */   buildApiNotifyException: () => (/* binding */ buildApiNotifyException),
/* harmony export */   buildApiNotifyExceptionTopic: () => (/* binding */ buildApiNotifyExceptionTopic),
/* harmony export */   buildApiPeerColors: () => (/* binding */ buildApiPeerColors),
/* harmony export */   buildApiSession: () => (/* binding */ buildApiSession),
/* harmony export */   buildApiTimezone: () => (/* binding */ buildApiTimezone),
/* harmony export */   buildApiUrlAuthResult: () => (/* binding */ buildApiUrlAuthResult),
/* harmony export */   buildApiWallpaper: () => (/* binding */ buildApiWallpaper),
/* harmony export */   buildApiWebSession: () => (/* binding */ buildApiWebSession),
/* harmony export */   buildJson: () => (/* binding */ buildJson),
/* harmony export */   buildLangStrings: () => (/* binding */ buildLangStrings),
/* harmony export */   buildPrivacyKey: () => (/* binding */ buildPrivacyKey),
/* harmony export */   oldBuildLangPack: () => (/* binding */ oldBuildLangPack),
/* harmony export */   oldBuildLangPackString: () => (/* binding */ oldBuildLangPackString)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _util_serverTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/serverTime */ "./src/util/serverTime.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./src/api/gramjs/apiBuilders/helpers.ts");
/* harmony import */ var _messageContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _reactions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reactions */ "./src/api/gramjs/apiBuilders/reactions.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./users */ "./src/api/gramjs/apiBuilders/users.ts");









function buildApiWallpaper(wallpaper) {
  if (wallpaper instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.WallPaperNoFile) {
    // TODO: Plain color wallpapers
    return undefined;
  }
  const {
    slug
  } = wallpaper;
  const document = (0,_messageContent__WEBPACK_IMPORTED_MODULE_5__.buildApiDocument)(wallpaper.document);
  if (!document) {
    return undefined;
  }
  return {
    slug,
    document
  };
}
function buildApiSession(session) {
  return {
    isCurrent: Boolean(session.current),
    isOfficialApp: Boolean(session.officialApp),
    isPasswordPending: Boolean(session.passwordPending),
    hash: String(session.hash),
    areCallsEnabled: !session.callRequestsDisabled,
    areSecretChatsEnabled: !session.encryptedRequestsDisabled,
    isUnconfirmed: session.unconfirmed,
    ...(0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.pick)(session, ['deviceModel', 'platform', 'systemVersion', 'appName', 'appVersion', 'dateCreated', 'dateActive', 'ip', 'country', 'region'])
  };
}
function buildApiWebSession(session) {
  return {
    hash: String(session.hash),
    botId: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(session.botId, 'user'),
    ...(0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.pick)(session, ['platform', 'browser', 'dateCreated', 'dateActive', 'ip', 'region', 'domain'])
  };
}
function buildPrivacyKey(key) {
  switch (key.className) {
    case 'PrivacyKeyPhoneNumber':
      return 'phoneNumber';
    case 'PrivacyKeyAddedByPhone':
      return 'addByPhone';
    case 'PrivacyKeyStatusTimestamp':
      return 'lastSeen';
    case 'PrivacyKeyProfilePhoto':
      return 'profilePhoto';
    case 'PrivacyKeyPhoneCall':
      return 'phoneCall';
    case 'PrivacyKeyPhoneP2P':
      return 'phoneP2P';
    case 'PrivacyKeyForwards':
      return 'forwards';
    case 'PrivacyKeyVoiceMessages':
      return 'voiceMessages';
    case 'PrivacyKeyChatInvite':
      return 'chatInvite';
    case 'PrivacyKeyAbout':
      return 'bio';
    case 'PrivacyKeyBirthday':
      return 'birthday';
  }
  return undefined;
}
function buildApiNotifyException(notifySettings, peer) {
  const {
    silent,
    muteUntil,
    showPreviews,
    otherSound
  } = notifySettings;
  const hasSound = Boolean(otherSound && !(otherSound instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.NotificationSoundNone));
  return {
    chatId: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(peer),
    isMuted: silent || typeof muteUntil === 'number' && (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_2__.getServerTime)() < muteUntil,
    ...(!hasSound && {
      isSilent: true
    }),
    ...(showPreviews !== undefined && {
      shouldShowPreviews: Boolean(showPreviews)
    }),
    muteUntil
  };
}
function buildApiNotifyExceptionTopic(notifySettings, peer, topicId) {
  const {
    silent,
    muteUntil,
    showPreviews,
    otherSound
  } = notifySettings;
  const hasSound = Boolean(otherSound && !(otherSound instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.NotificationSoundNone));
  return {
    chatId: (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(peer),
    topicId,
    isMuted: silent || typeof muteUntil === 'number' && (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_2__.getServerTime)() < muteUntil,
    ...(!hasSound && {
      isSilent: true
    }),
    ...(showPreviews !== undefined && {
      shouldShowPreviews: Boolean(showPreviews)
    }),
    muteUntil
  };
}
function buildApiCountry(country, code) {
  const {
    hidden,
    iso2,
    defaultName,
    name
  } = country;
  const {
    countryCode,
    prefixes,
    patterns
  } = code || {};
  return {
    isHidden: hidden,
    iso2,
    defaultName,
    name,
    countryCode,
    prefixes,
    patterns
  };
}
function buildApiCountryList(countries) {
  const nonHiddenCountries = countries.filter(_ref => {
    let {
      hidden
    } = _ref;
    return !hidden;
  });
  const listByCode = nonHiddenCountries.map(country => country.countryCodes.map(code => buildApiCountry(country, code))).flat().sort((a, b) => a.name ? a.name.localeCompare(b.name) : a.defaultName.localeCompare(b.defaultName));
  const generalList = nonHiddenCountries.map(country => buildApiCountry(country, country.countryCodes[0])).sort((a, b) => a.name ? a.name.localeCompare(b.name) : a.defaultName.localeCompare(b.defaultName));
  return {
    phoneCodes: listByCode,
    general: generalList
  };
}
function buildJson(json) {
  if (json instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.JsonNull) return undefined;
  if (json instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.JsonString || json instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.JsonBool || json instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.JsonNumber) return json.value;
  if (json instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.JsonArray) return json.value.map(buildJson);
  return json.value.reduce((acc, el) => {
    acc[el.key] = buildJson(el.value);
    return acc;
  }, {});
}
function buildApiUrlAuthResult(result) {
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UrlAuthResultRequest) {
    const {
      bot,
      domain,
      requestWriteAccess
    } = result;
    const user = (0,_users__WEBPACK_IMPORTED_MODULE_8__.buildApiUser)(bot);
    if (!user) return undefined;
    (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.addUserToLocalDb)(bot);
    return {
      type: 'request',
      domain,
      shouldRequestWriteAccess: requestWriteAccess,
      bot: user
    };
  }
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UrlAuthResultAccepted) {
    return {
      type: 'accepted',
      url: result.url
    };
  }
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UrlAuthResultDefault) {
    return {
      type: 'default'
    };
  }
  return undefined;
}
function buildApiConfig(config) {
  const defaultReaction = config.reactionsDefault && (0,_reactions__WEBPACK_IMPORTED_MODULE_7__.buildApiReaction)(config.reactionsDefault);
  return {
    expiresAt: config.expires,
    gifSearchUsername: config.gifSearchUsername,
    defaultReaction,
    maxGroupSize: config.chatSizeMax,
    autologinToken: config.autologinToken
  };
}
function oldBuildLangPack(mtpLangPack) {
  return mtpLangPack.strings.reduce((acc, mtpString) => {
    acc[mtpString.key] = oldBuildLangPackString(mtpString);
    return acc;
  }, {});
}
function oldBuildLangPackString(mtpString) {
  return mtpString instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.LangPackString ? mtpString.value : mtpString instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.LangPackStringPluralized ? (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.omit)((0,_helpers__WEBPACK_IMPORTED_MODULE_4__.omitVirtualClassFields)(mtpString), ['key']) : undefined;
}
function buildLangStrings(strings) {
  const keysToRemove = [];
  const apiStrings = strings.reduce((acc, mtpString) => {
    if (mtpString instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.LangPackStringDeleted) {
      keysToRemove.push(mtpString.key);
    }
    if (mtpString instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.LangPackString) {
      acc[mtpString.key] = mtpString.value;
    }
    if (mtpString instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.LangPackStringPluralized) {
      acc[mtpString.key] = (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.omitUndefined)({
        zero: mtpString.zeroValue,
        one: mtpString.oneValue,
        two: mtpString.twoValue,
        few: mtpString.fewValue,
        many: mtpString.manyValue,
        other: mtpString.otherValue
      });
    }
    return acc;
  }, {});
  return {
    keysToRemove,
    strings: apiStrings
  };
}
function buildApiLanguage(lang) {
  const {
    name,
    nativeName,
    langCode,
    pluralCode,
    rtl,
    stringsCount,
    translatedCount,
    translationsUrl,
    beta,
    official
  } = lang;
  return {
    name,
    nativeName,
    langCode,
    pluralCode,
    isRtl: rtl,
    isBeta: beta,
    isOfficial: official,
    stringsCount,
    translatedCount,
    translationsUrl
  };
}
function buildApiPeerColorSet(colorSet) {
  if (colorSet instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.help.PeerColorSet) {
    return colorSet.colors.map(color => `#${color.toString(16).padStart(6, '0')}`);
  }
  return undefined;
}
function buildApiPeerColors(wrapper) {
  if (!(wrapper instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.help.PeerColors)) return undefined;
  return (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.buildCollectionByCallback)(wrapper.colors, color => {
    return [color.colorId, {
      isHidden: color.hidden,
      colors: color.colors && buildApiPeerColorSet(color.colors),
      darkColors: color.darkColors && buildApiPeerColorSet(color.darkColors)
    }];
  });
}
function buildApiTimezone(timezone) {
  const {
    id,
    name,
    utcOffset
  } = timezone;
  return {
    id,
    name,
    utcOffset
  };
}
function buildApiChatLink(data) {
  const chatId = (0,_peers__WEBPACK_IMPORTED_MODULE_6__.getApiChatIdFromMtpPeer)(data.peer);
  return {
    chatId,
    text: (0,_messageContent__WEBPACK_IMPORTED_MODULE_5__.buildMessageTextContent)(data.message, data.entities)
  };
}
function buildApiCollectibleInfo(info) {
  const {
    amount,
    currency,
    cryptoAmount,
    cryptoCurrency,
    purchaseDate,
    url
  } = info;
  return {
    amount: amount.toJSNumber(),
    currency,
    cryptoAmount: cryptoAmount.toJSNumber(),
    cryptoCurrency,
    purchaseDate,
    url
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/payments.ts":
/*!************************************************!*\
  !*** ./src/api/gramjs/apiBuilders/payments.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiBoost: () => (/* binding */ buildApiBoost),
/* harmony export */   buildApiBoostsStatus: () => (/* binding */ buildApiBoostsStatus),
/* harmony export */   buildApiCheckedGiftCode: () => (/* binding */ buildApiCheckedGiftCode),
/* harmony export */   buildApiGiveawayInfo: () => (/* binding */ buildApiGiveawayInfo),
/* harmony export */   buildApiInvoiceFromForm: () => (/* binding */ buildApiInvoiceFromForm),
/* harmony export */   buildApiMyBoost: () => (/* binding */ buildApiMyBoost),
/* harmony export */   buildApiPaymentCredentials: () => (/* binding */ buildApiPaymentCredentials),
/* harmony export */   buildApiPaymentForm: () => (/* binding */ buildApiPaymentForm),
/* harmony export */   buildApiPremiumGiftCodeOption: () => (/* binding */ buildApiPremiumGiftCodeOption),
/* harmony export */   buildApiPremiumPromo: () => (/* binding */ buildApiPremiumPromo),
/* harmony export */   buildApiReceipt: () => (/* binding */ buildApiReceipt),
/* harmony export */   buildApiStarTopupOption: () => (/* binding */ buildApiStarTopupOption),
/* harmony export */   buildApiStarsTransaction: () => (/* binding */ buildApiStarsTransaction),
/* harmony export */   buildApiStarsTransactionPeer: () => (/* binding */ buildApiStarsTransactionPeer),
/* harmony export */   buildShippingOptions: () => (/* binding */ buildShippingOptions)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./src/api/gramjs/apiBuilders/helpers.ts");
/* harmony import */ var _messageContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./statistics */ "./src/api/gramjs/apiBuilders/statistics.ts");







function buildShippingOptions(shippingOptions) {
  if (!shippingOptions) {
    return undefined;
  }
  return Object.values(shippingOptions).map(option => {
    return {
      id: option.id,
      title: option.title,
      amount: option.prices.reduce((ac, cur) => ac + cur.amount.toJSNumber(), 0),
      prices: option.prices.map(_ref => {
        let {
          label,
          amount
        } = _ref;
        return {
          label,
          amount: amount.toJSNumber()
        };
      })
    };
  });
}
function buildApiReceipt(receipt) {
  const {
    photo
  } = receipt;
  if (photo) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.addWebDocumentToLocalDb)(photo);
  }
  if (receipt instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.payments.PaymentReceiptStars) {
    const {
      botId,
      currency,
      date,
      description: text,
      title,
      totalAmount,
      transactionId
    } = receipt;
    if (photo) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.addWebDocumentToLocalDb)(photo);
    }
    return {
      type: 'stars',
      currency,
      botId: (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(botId, 'user'),
      date,
      text,
      title,
      totalAmount: -totalAmount.toJSNumber(),
      transactionId,
      photo: photo && (0,_messageContent__WEBPACK_IMPORTED_MODULE_4__.buildApiWebDocument)(photo)
    };
  }
  const {
    invoice,
    info,
    shipping,
    currency,
    totalAmount,
    credentialsTitle,
    tipAmount,
    title,
    description: text
  } = receipt;
  const {
    shippingAddress,
    phone,
    name
  } = info || {};
  const {
    prices
  } = invoice;
  const mappedPrices = prices.map(_ref2 => {
    let {
      label,
      amount
    } = _ref2;
    return {
      label,
      amount: amount.toJSNumber()
    };
  });
  let shippingPrices;
  let shippingMethod;
  if (shipping) {
    shippingPrices = shipping.prices.map(_ref3 => {
      let {
        label,
        amount
      } = _ref3;
      return {
        label,
        amount: amount.toJSNumber()
      };
    });
    shippingMethod = shipping.title;
  }
  return {
    type: 'regular',
    currency,
    prices: mappedPrices,
    info: {
      shippingAddress,
      phone,
      name
    },
    totalAmount: totalAmount.toJSNumber(),
    credentialsTitle,
    shippingPrices,
    shippingMethod,
    tipAmount: tipAmount ? tipAmount.toJSNumber() : 0,
    title,
    text,
    photo: photo && (0,_messageContent__WEBPACK_IMPORTED_MODULE_4__.buildApiWebDocument)(photo)
  };
}
function buildApiPaymentForm(form) {
  if (form instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.payments.PaymentFormStars) {
    const {
      botId,
      formId
    } = form;
    return {
      type: 'stars',
      botId: (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(botId, 'user'),
      formId: String(formId)
    };
  }
  const {
    formId,
    canSaveCredentials,
    passwordMissing: isPasswordMissing,
    providerId,
    nativeProvider,
    nativeParams,
    savedInfo,
    invoice,
    savedCredentials,
    url,
    botId
  } = form;
  const {
    test: isTest,
    nameRequested: isNameRequested,
    phoneRequested: isPhoneRequested,
    emailRequested: isEmailRequested,
    shippingAddressRequested: isShippingAddressRequested,
    flexible: isFlexible,
    phoneToProvider: shouldSendPhoneToProvider,
    emailToProvider: shouldSendEmailToProvider,
    currency,
    prices
  } = invoice;
  const mappedPrices = prices.map(_ref4 => {
    let {
      label,
      amount
    } = _ref4;
    return {
      label,
      amount: amount.toJSNumber()
    };
  });
  const {
    shippingAddress
  } = savedInfo || {};
  const cleanedInfo = savedInfo ? (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.omitVirtualClassFields)(savedInfo) : undefined;
  if (cleanedInfo && shippingAddress) {
    cleanedInfo.shippingAddress = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.omitVirtualClassFields)(shippingAddress);
  }
  const nativeData = nativeParams ? JSON.parse(nativeParams.data) : {};
  return {
    type: 'regular',
    url,
    botId: (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(botId, 'user'),
    canSaveCredentials,
    isPasswordMissing,
    formId: String(formId),
    providerId: String(providerId),
    nativeProvider,
    savedInfo: cleanedInfo,
    invoiceContainer: {
      isTest,
      isNameRequested,
      isPhoneRequested,
      isEmailRequested,
      isShippingAddressRequested,
      isFlexible,
      shouldSendPhoneToProvider,
      shouldSendEmailToProvider,
      currency,
      prices: mappedPrices
    },
    nativeParams: {
      needCardholderName: Boolean(nativeData?.need_cardholder_name),
      needCountry: Boolean(nativeData?.need_country),
      needZip: Boolean(nativeData?.need_zip),
      publishableKey: nativeData?.publishable_key,
      publicToken: nativeData?.public_token,
      tokenizeUrl: nativeData?.tokenize_url
    },
    savedCredentials: savedCredentials && buildApiPaymentCredentials(savedCredentials)
  };
}
function buildApiInvoiceFromForm(form) {
  const {
    invoice,
    description: text,
    title,
    photo
  } = form;
  const {
    test,
    currency,
    prices,
    recurring,
    termsUrl,
    maxTipAmount,
    suggestedTipAmounts
  } = invoice;
  const totalAmount = prices.reduce((ac, cur) => ac + cur.amount.toJSNumber(), 0);
  return {
    mediaType: 'invoice',
    text,
    title,
    photo: (0,_messageContent__WEBPACK_IMPORTED_MODULE_4__.buildApiWebDocument)(photo),
    amount: totalAmount,
    currency,
    isTest: test,
    isRecurring: recurring,
    termsUrl,
    maxTipAmount: maxTipAmount?.toJSNumber(),
    ...(suggestedTipAmounts && {
      suggestedTipAmounts: suggestedTipAmounts.map(tip => tip.toJSNumber())
    })
  };
}
function buildApiPremiumPromo(promo) {
  const {
    statusText,
    statusEntities,
    videos,
    videoSections,
    periodOptions
  } = promo;
  return {
    statusText,
    statusEntities: statusEntities.map(_common__WEBPACK_IMPORTED_MODULE_2__.buildApiMessageEntity),
    videoSections: videoSections,
    videos: videos.map(_messageContent__WEBPACK_IMPORTED_MODULE_4__.buildApiDocument).filter(Boolean),
    options: periodOptions.map(buildApiPremiumSubscriptionOption)
  };
}
function buildApiPremiumSubscriptionOption(option) {
  const {
    current,
    canPurchaseUpgrade,
    currency,
    amount,
    botUrl,
    months
  } = option;
  return {
    isCurrent: current,
    canPurchaseUpgrade,
    currency,
    amount: amount.toJSNumber(),
    botUrl,
    months
  };
}
function buildApiPaymentCredentials(credentials) {
  return credentials.map(_ref5 => {
    let {
      id,
      title
    } = _ref5;
    return {
      id,
      title
    };
  });
}
function buildApiBoostsStatus(boostStatus) {
  const {
    level,
    boostUrl,
    boosts,
    myBoost,
    currentLevelBoosts,
    nextLevelBoosts,
    premiumAudience,
    prepaidGiveaways
  } = boostStatus;
  return {
    level,
    currentLevelBoosts,
    boosts,
    hasMyBoost: Boolean(myBoost),
    boostUrl,
    nextLevelBoosts,
    ...(premiumAudience && {
      premiumSubscribers: (0,_statistics__WEBPACK_IMPORTED_MODULE_6__.buildStatisticsPercentage)(premiumAudience)
    }),
    ...(prepaidGiveaways && {
      prepaidGiveaways: prepaidGiveaways.map(_statistics__WEBPACK_IMPORTED_MODULE_6__.buildPrepaidGiveaway)
    })
  };
}
function buildApiBoost(boost) {
  const {
    userId,
    multiplier,
    expires,
    giveaway,
    gift
  } = boost;
  return {
    userId: userId && (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(userId, 'user'),
    multiplier,
    expires,
    isFromGiveaway: giveaway,
    isGift: gift
  };
}
function buildApiMyBoost(myBoost) {
  const {
    date,
    expires,
    slot,
    cooldownUntilDate,
    peer
  } = myBoost;
  return {
    date,
    expires,
    slot,
    cooldownUntil: cooldownUntilDate,
    chatId: peer && (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(peer)
  };
}
function buildApiGiveawayInfo(info) {
  if (info instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.payments.GiveawayInfo) {
    const {
      startDate,
      adminDisallowedChatId,
      disallowedCountry,
      joinedTooEarlyDate,
      participating,
      preparingResults
    } = info;
    return {
      type: 'active',
      startDate,
      isParticipating: participating,
      adminDisallowedChatId: adminDisallowedChatId && (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(adminDisallowedChatId, 'channel'),
      disallowedCountry,
      joinedTooEarlyDate,
      isPreparingResults: preparingResults
    };
  } else {
    const {
      activatedCount,
      finishDate,
      giftCodeSlug,
      winner,
      refunded,
      startDate,
      winnersCount
    } = info;
    return {
      type: 'results',
      startDate,
      activatedCount,
      finishDate,
      winnersCount,
      giftCodeSlug,
      isRefunded: refunded,
      isWinner: winner
    };
  }
}
function buildApiCheckedGiftCode(giftcode) {
  const {
    date,
    fromId,
    months,
    giveawayMsgId,
    toId,
    usedDate,
    viaGiveaway
  } = giftcode;
  return {
    date,
    months,
    toId: toId && (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(toId, 'user'),
    fromId: fromId && (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(fromId),
    usedAt: usedDate,
    isFromGiveaway: viaGiveaway,
    giveawayMessageId: giveawayMsgId
  };
}
function buildApiPremiumGiftCodeOption(option) {
  const {
    amount,
    currency,
    months,
    users
  } = option;
  return {
    amount: amount.toJSNumber(),
    currency,
    months,
    users
  };
}
function buildApiStarsTransactionPeer(peer) {
  if (peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StarsTransactionPeerAppStore) {
    return {
      type: 'appStore'
    };
  }
  if (peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StarsTransactionPeerPlayMarket) {
    return {
      type: 'playMarket'
    };
  }
  if (peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StarsTransactionPeerPremiumBot) {
    return {
      type: 'premiumBot'
    };
  }
  if (peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StarsTransactionPeerFragment) {
    return {
      type: 'fragment'
    };
  }
  if (peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StarsTransactionPeerAds) {
    return {
      type: 'ads'
    };
  }
  if (peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StarsTransactionPeer) {
    return {
      type: 'peer',
      id: (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(peer.peer)
    };
  }
  return {
    type: 'unsupported'
  };
}
function buildApiStarsTransaction(transaction) {
  const {
    date,
    id,
    peer,
    stars,
    description,
    photo,
    title,
    refund,
    extendedMedia,
    failed,
    msgId,
    pending
  } = transaction;
  if (photo) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.addWebDocumentToLocalDb)(photo);
  }
  const boughtExtendedMedia = extendedMedia?.map(m => (0,_messageContent__WEBPACK_IMPORTED_MODULE_4__.buildMessageMediaContent)(m)).filter(Boolean);
  return {
    id,
    date,
    peer: buildApiStarsTransactionPeer(peer),
    stars: stars.toJSNumber(),
    title,
    description,
    photo: photo && (0,_messageContent__WEBPACK_IMPORTED_MODULE_4__.buildApiWebDocument)(photo),
    isRefund: refund,
    hasFailed: failed,
    isPending: pending,
    messageId: msgId,
    extendedMedia: boughtExtendedMedia
  };
}
function buildApiStarTopupOption(option) {
  const {
    amount,
    currency,
    stars,
    extended
  } = option;
  return {
    amount: amount.toJSNumber(),
    currency,
    stars: stars.toJSNumber(),
    isExtended: extended
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/statistics.ts":
/*!**************************************************!*\
  !*** ./src/api/gramjs/apiBuilders/statistics.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiPostInteractionCounter: () => (/* binding */ buildApiPostInteractionCounter),
/* harmony export */   buildChannelStatistics: () => (/* binding */ buildChannelStatistics),
/* harmony export */   buildGraph: () => (/* binding */ buildGraph),
/* harmony export */   buildGroupStatistics: () => (/* binding */ buildGroupStatistics),
/* harmony export */   buildMessagePublicForwards: () => (/* binding */ buildMessagePublicForwards),
/* harmony export */   buildPostsStatistics: () => (/* binding */ buildPostsStatistics),
/* harmony export */   buildPrepaidGiveaway: () => (/* binding */ buildPrepaidGiveaway),
/* harmony export */   buildStatisticsPercentage: () => (/* binding */ buildStatisticsPercentage),
/* harmony export */   buildStoryPublicForwards: () => (/* binding */ buildStoryPublicForwards)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");




function buildChannelStatistics(stats) {
  return {
    // Graphs
    growthGraph: buildGraph(stats.growthGraph),
    followersGraph: buildGraph(stats.followersGraph),
    muteGraph: buildGraph(stats.muteGraph),
    topHoursGraph: buildGraph(stats.topHoursGraph),
    // Async graphs
    languagesGraph: stats.languagesGraph.token,
    viewsBySourceGraph: stats.viewsBySourceGraph.token,
    newFollowersBySourceGraph: stats.newFollowersBySourceGraph.token,
    interactionsGraph: stats.interactionsGraph.token,
    reactionsByEmotionGraph: stats.reactionsByEmotionGraph.token,
    storyInteractionsGraph: stats.storyInteractionsGraph.token,
    storyReactionsByEmotionGraph: stats.storyReactionsByEmotionGraph.token,
    // Statistics overview
    followers: buildStatisticsOverview(stats.followers),
    viewsPerPost: buildStatisticsOverview(stats.viewsPerPost),
    sharesPerPost: buildStatisticsOverview(stats.sharesPerPost),
    enabledNotifications: buildStatisticsPercentage(stats.enabledNotifications),
    reactionsPerPost: buildStatisticsOverview(stats.reactionsPerPost),
    viewsPerStory: buildStatisticsOverview(stats.viewsPerStory),
    sharesPerStory: buildStatisticsOverview(stats.sharesPerStory),
    reactionsPerStory: buildStatisticsOverview(stats.reactionsPerStory),
    // Recent posts
    recentPosts: stats.recentPostsInteractions.map(buildApiPostInteractionCounter).filter(Boolean)
  };
}
function buildApiPostInteractionCounter(interaction) {
  if (interaction instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PostInteractionCountersMessage) {
    return {
      msgId: interaction.msgId,
      forwardsCount: interaction.forwards,
      viewsCount: interaction.views,
      reactionsCount: interaction.reactions
    };
  }
  if (interaction instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PostInteractionCountersStory) {
    return {
      storyId: interaction.storyId,
      reactionsCount: interaction.reactions,
      viewsCount: interaction.views,
      forwardsCount: interaction.forwards
    };
  }
  return undefined;
}
function buildGroupStatistics(stats) {
  return {
    // Graphs
    growthGraph: buildGraph(stats.growthGraph),
    membersGraph: buildGraph(stats.membersGraph),
    topHoursGraph: buildGraph(stats.topHoursGraph),
    // Async graphs
    languagesGraph: stats.languagesGraph.token,
    messagesGraph: stats.messagesGraph.token,
    actionsGraph: stats.actionsGraph.token,
    // Statistics overview
    period: getOverviewPeriod(stats.period),
    members: buildStatisticsOverview(stats.members),
    viewers: buildStatisticsOverview(stats.viewers),
    messages: buildStatisticsOverview(stats.messages),
    posters: buildStatisticsOverview(stats.posters)
  };
}
function buildPostsStatistics(stats) {
  return {
    viewsGraph: buildGraph(stats.viewsGraph),
    reactionsGraph: buildGraph(stats.reactionsByEmotionGraph)
  };
}
function buildMessagePublicForwards(result) {
  if (!result || !('messages' in result)) {
    return undefined;
  }
  return result.messages.map(message => buildApiMessagePublicForward(message, result.chats));
}
function buildStoryPublicForwards(result) {
  if (!result || !('forwards' in result)) {
    return undefined;
  }
  return result.forwards.map(forward => {
    if (forward instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.PublicForwardMessage) {
      return buildApiMessagePublicForward(forward.message, result.chats);
    }
    const {
      peer,
      story
    } = forward;
    const peerId = (0,_peers__WEBPACK_IMPORTED_MODULE_3__.getApiChatIdFromMtpPeer)(peer);
    return {
      peerId,
      storyId: story.id,
      viewsCount: story.views?.viewsCount || 0,
      reactionsCount: story.views?.reactionsCount || 0
    };
  });
}
function buildGraph(result, isPercentage) {
  if (result.error) {
    return undefined;
  }
  const data = JSON.parse(result.json.data);
  const [x, ...y] = data.columns;
  const hasSecondYAxis = data.y_scaled;
  return {
    type: isPercentage ? 'area' : data.types.y0,
    zoomToken: result.zoomToken,
    labelFormatter: data.xTickFormatter,
    tooltipFormatter: data.xTooltipFormatter,
    labels: x.slice(1),
    hideCaption: !data.subchart.show,
    hasSecondYAxis,
    isStacked: data.stacked && !hasSecondYAxis,
    isPercentage,
    datasets: y.map(item => {
      const key = item[0];
      return {
        name: data.names[key],
        color: extractColor(data.colors[key]),
        values: item.slice(1)
      };
    }),
    ...calculateMinimapRange(data.subchart.defaultZoom, x.slice(1))
  };
}
function extractColor(color) {
  return color.substring(color.indexOf('#'));
}
function calculateMinimapRange(range, values) {
  const [min, max] = range;
  let minIndex = 0;
  let maxIndex = values.length - 1;
  values.forEach((item, index) => {
    if (!minIndex && item >= min) {
      minIndex = index;
    }
    if (!maxIndex && item >= max) {
      maxIndex = index;
    }
  });
  const begin = Math.max(0, minIndex / (values.length - 1));
  const end = Math.min(1, maxIndex / (values.length - 1));
  return {
    minimapRange: {
      begin,
      end
    },
    labelFromIndex: minIndex,
    labelToIndex: maxIndex
  };
}
function buildStatisticsOverview(_ref) {
  let {
    current,
    previous
  } = _ref;
  const change = current - previous;
  return {
    current,
    change,
    ...(previous && {
      percentage: (change ? Math.abs(change) / previous * 100 : 0).toFixed(2)
    })
  };
}
function buildStatisticsPercentage(data) {
  return {
    part: data.part,
    total: data.total,
    percentage: (data.part / data.total * 100).toFixed(2)
  };
}
function buildPrepaidGiveaway(prepaidGiveaway) {
  return {
    id: prepaidGiveaway.id.toString(),
    date: prepaidGiveaway.date,
    months: prepaidGiveaway.months,
    quantity: prepaidGiveaway.quantity
  };
}
function getOverviewPeriod(data) {
  return {
    maxDate: data.maxDate,
    minDate: data.minDate
  };
}
function buildApiMessagePublicForward(message, chats) {
  const peerId = (0,_peers__WEBPACK_IMPORTED_MODULE_3__.getApiChatIdFromMtpPeer)(message.peerId);
  const channel = chats.find(c => (0,_peers__WEBPACK_IMPORTED_MODULE_3__.buildApiPeerId)(c.id, 'channel') === peerId);
  return {
    messageId: message.id,
    views: message.views,
    title: channel.title,
    chat: {
      id: peerId,
      type: 'chatTypeChannel',
      title: channel.title,
      usernames: (0,_common__WEBPACK_IMPORTED_MODULE_2__.buildApiUsernames)(channel),
      avatarHash: channel && 'photo' in channel ? (0,_chats__WEBPACK_IMPORTED_MODULE_1__.buildAvatarHash)(channel.photo) : undefined
    }
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/stories.ts":
/*!***********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/stories.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiMediaArea: () => (/* binding */ buildApiMediaArea),
/* harmony export */   buildApiPeerStories: () => (/* binding */ buildApiPeerStories),
/* harmony export */   buildApiStealthMode: () => (/* binding */ buildApiStealthMode),
/* harmony export */   buildApiStory: () => (/* binding */ buildApiStory),
/* harmony export */   buildApiStoryForwardInfo: () => (/* binding */ buildApiStoryForwardInfo),
/* harmony export */   buildApiStoryView: () => (/* binding */ buildApiStoryView),
/* harmony export */   buildApiStoryViews: () => (/* binding */ buildApiStoryViews)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _messageContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./messages */ "./src/api/gramjs/apiBuilders/messages.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _reactions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reactions */ "./src/api/gramjs/apiBuilders/reactions.ts");







function buildApiStory(peerId, story) {
  if (story instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StoryItemDeleted) {
    return {
      id: story.id,
      peerId,
      isDeleted: true
    };
  }
  if (story instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StoryItemSkipped) {
    const {
      id,
      date,
      expireDate,
      closeFriends
    } = story;
    return {
      id,
      peerId,
      ...(closeFriends && {
        isForCloseFriends: true
      }),
      date,
      expireDate
    };
  }
  const {
    edited,
    pinned,
    expireDate,
    id,
    date,
    caption,
    entities,
    media,
    privacy,
    views,
    public: isPublic,
    noforwards,
    closeFriends,
    contacts,
    selectedContacts,
    mediaAreas,
    sentReaction,
    out,
    fwdFrom,
    fromId
  } = story;
  const content = {
    ...(0,_messageContent__WEBPACK_IMPORTED_MODULE_3__.buildMessageMediaContent)(media)
  };
  if (caption) {
    content.text = (0,_messageContent__WEBPACK_IMPORTED_MODULE_3__.buildMessageTextContent)(caption, entities);
  }
  return (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.omitUndefined)({
    id,
    peerId,
    date,
    expireDate,
    content,
    isPublic,
    isEdited: edited,
    isInProfile: pinned,
    isForContacts: contacts,
    isForSelectedContacts: selectedContacts,
    isForCloseFriends: closeFriends,
    noForwards: noforwards,
    views: views && buildApiStoryViews(views),
    isOut: out,
    visibility: privacy && (0,_common__WEBPACK_IMPORTED_MODULE_2__.buildPrivacyRules)(privacy),
    mediaAreas: mediaAreas?.map(buildApiMediaArea).filter(Boolean),
    sentReaction: sentReaction && (0,_reactions__WEBPACK_IMPORTED_MODULE_6__.buildApiReaction)(sentReaction),
    forwardInfo: fwdFrom && buildApiStoryForwardInfo(fwdFrom),
    fromId: fromId && (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(fromId)
  });
}
function buildApiStoryViews(views) {
  return (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.omitUndefined)({
    hasViewers: views.hasViewers,
    viewsCount: views.viewsCount,
    forwardsCount: views.forwardsCount,
    reactionsCount: views.reactionsCount,
    reactions: views.reactions?.map(_reactions__WEBPACK_IMPORTED_MODULE_6__.buildReactionCount).filter(Boolean),
    recentViewerIds: views.recentViewers?.map(viewerId => (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(viewerId, 'user'))
  });
}
function buildApiStoryView(view) {
  const {
    blockedMyStoriesFrom,
    blocked
  } = view;
  if (view instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StoryView) {
    return (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.omitUndefined)({
      type: 'user',
      peerId: (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(view.userId, 'user'),
      date: view.date,
      reaction: view.reaction && (0,_reactions__WEBPACK_IMPORTED_MODULE_6__.buildApiReaction)(view.reaction),
      areStoriesBlocked: blocked || blockedMyStoriesFrom,
      isUserBlocked: blocked
    });
  }
  if (view instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StoryViewPublicForward) {
    const message = (0,_messages__WEBPACK_IMPORTED_MODULE_4__.buildApiMessage)(view.message);
    if (!message) return undefined;
    return {
      type: 'forward',
      peerId: message.chatId,
      messageId: message.id,
      message,
      date: message.date,
      areStoriesBlocked: blocked || blockedMyStoriesFrom,
      isUserBlocked: blocked
    };
  }
  if (view instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StoryViewPublicRepost) {
    const peerId = (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(view.peerId);
    const story = buildApiStory(peerId, view.story);
    if (!('content' in story)) return undefined;
    return {
      type: 'repost',
      peerId,
      storyId: view.story.id,
      date: story.date,
      story,
      areStoriesBlocked: blocked || blockedMyStoriesFrom,
      isUserBlocked: blocked
    };
  }
  return undefined;
}
function buildApiStealthMode(stealthMode) {
  return {
    activeUntil: stealthMode.activeUntilDate,
    cooldownUntil: stealthMode.cooldownUntilDate
  };
}
function buildApiMediaAreaCoordinates(coordinates) {
  const {
    x,
    y,
    w,
    h,
    rotation,
    radius
  } = coordinates;
  return {
    x,
    y,
    width: w,
    height: h,
    rotation,
    radius
  };
}
function buildApiMediaArea(area) {
  if (area instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MediaAreaVenue) {
    const {
      geo,
      title,
      coordinates
    } = area;
    const point = (0,_messageContent__WEBPACK_IMPORTED_MODULE_3__.buildGeoPoint)(geo);
    if (!point) return undefined;
    return {
      type: 'venue',
      coordinates: buildApiMediaAreaCoordinates(coordinates),
      geo: point,
      title
    };
  }
  if (area instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MediaAreaGeoPoint) {
    const {
      geo,
      coordinates
    } = area;
    const point = (0,_messageContent__WEBPACK_IMPORTED_MODULE_3__.buildGeoPoint)(geo);
    if (!point) return undefined;
    return {
      type: 'geoPoint',
      coordinates: buildApiMediaAreaCoordinates(coordinates),
      geo: point
    };
  }
  if (area instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MediaAreaSuggestedReaction) {
    const {
      coordinates,
      reaction,
      dark,
      flipped
    } = area;
    const apiReaction = (0,_reactions__WEBPACK_IMPORTED_MODULE_6__.buildApiReaction)(reaction);
    if (!apiReaction) return undefined;
    return {
      type: 'suggestedReaction',
      coordinates: buildApiMediaAreaCoordinates(coordinates),
      reaction: apiReaction,
      ...(dark && {
        isDark: true
      }),
      ...(flipped && {
        isFlipped: true
      })
    };
  }
  if (area instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MediaAreaChannelPost) {
    const {
      coordinates,
      channelId,
      msgId
    } = area;
    return {
      type: 'channelPost',
      coordinates: buildApiMediaAreaCoordinates(coordinates),
      channelId: (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(channelId, 'channel'),
      messageId: msgId
    };
  }
  if (area instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MediaAreaUrl) {
    const {
      coordinates,
      url
    } = area;
    return {
      type: 'url',
      coordinates: buildApiMediaAreaCoordinates(coordinates),
      url
    };
  }
  return undefined;
}
function buildApiPeerStories(peerStories) {
  const peerId = (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(peerStories.peer);
  return (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_1__.buildCollectionByCallback)(peerStories.stories, story => [story.id, buildApiStory(peerId, story)]);
}
function buildApiStoryForwardInfo(forwardHeader) {
  const {
    from,
    fromName,
    storyId,
    modified
  } = forwardHeader;
  return {
    storyId,
    fromPeerId: from && (0,_peers__WEBPACK_IMPORTED_MODULE_5__.getApiChatIdFromMtpPeer)(from),
    fromName,
    isModified: modified
  };
}

/***/ }),

/***/ "./src/api/gramjs/apiBuilders/users.ts":
/*!*********************************************!*\
  !*** ./src/api/gramjs/apiBuilders/users.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildApiBirthday: () => (/* binding */ buildApiBirthday),
/* harmony export */   buildApiPremiumGiftOption: () => (/* binding */ buildApiPremiumGiftOption),
/* harmony export */   buildApiUser: () => (/* binding */ buildApiUser),
/* harmony export */   buildApiUserFullInfo: () => (/* binding */ buildApiUserFullInfo),
/* harmony export */   buildApiUserStatus: () => (/* binding */ buildApiUserStatus),
/* harmony export */   buildApiUsersAndStatuses: () => (/* binding */ buildApiUsersAndStatuses)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bots__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bots */ "./src/api/gramjs/apiBuilders/bots.ts");
/* harmony import */ var _business__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./business */ "./src/api/gramjs/apiBuilders/business.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./src/api/gramjs/apiBuilders/helpers.ts");
/* harmony import */ var _peers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./peers */ "./src/api/gramjs/apiBuilders/peers.ts");






function buildApiUserFullInfo(mtpUserFull) {
  const {
    fullUser: {
      about,
      commonChatsCount,
      pinnedMsgId,
      botInfo,
      blocked,
      profilePhoto,
      voiceMessagesForbidden,
      premiumGifts,
      fallbackPhoto,
      personalPhoto,
      translationsDisabled,
      storiesPinnedAvailable,
      contactRequirePremium,
      businessWorkHours,
      businessLocation,
      businessIntro,
      birthday,
      personalChannelId,
      personalChannelMessage,
      sponsoredEnabled
    },
    users
  } = mtpUserFull;
  const userId = (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(users[0].id, 'user');
  return {
    bio: about,
    commonChatsCount,
    pinnedMessageId: pinnedMsgId,
    isBlocked: Boolean(blocked),
    noVoiceMessages: voiceMessagesForbidden,
    hasPinnedStories: Boolean(storiesPinnedAvailable),
    isTranslationDisabled: translationsDisabled,
    profilePhoto: profilePhoto instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo ? (0,_common__WEBPACK_IMPORTED_MODULE_3__.buildApiPhoto)(profilePhoto) : undefined,
    fallbackPhoto: fallbackPhoto instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo ? (0,_common__WEBPACK_IMPORTED_MODULE_3__.buildApiPhoto)(fallbackPhoto) : undefined,
    personalPhoto: personalPhoto instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo ? (0,_common__WEBPACK_IMPORTED_MODULE_3__.buildApiPhoto)(personalPhoto) : undefined,
    premiumGifts: premiumGifts?.map(gift => buildApiPremiumGiftOption(gift)),
    botInfo: botInfo && (0,_bots__WEBPACK_IMPORTED_MODULE_1__.buildApiBotInfo)(botInfo, userId),
    isContactRequirePremium: contactRequirePremium,
    birthday: birthday && buildApiBirthday(birthday),
    businessLocation: businessLocation && (0,_business__WEBPACK_IMPORTED_MODULE_2__.buildApiBusinessLocation)(businessLocation),
    businessWorkHours: businessWorkHours && (0,_business__WEBPACK_IMPORTED_MODULE_2__.buildApiBusinessWorkHours)(businessWorkHours),
    businessIntro: businessIntro && (0,_business__WEBPACK_IMPORTED_MODULE_2__.buildApiBusinessIntro)(businessIntro),
    personalChannelId: personalChannelId && (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(personalChannelId, 'channel'),
    personalChannelMessageId: personalChannelMessage,
    areAdsEnabled: sponsoredEnabled
  };
}
function buildApiUser(mtpUser) {
  if (!(mtpUser instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User)) {
    return undefined;
  }
  const {
    id,
    firstName,
    lastName,
    fake,
    scam,
    support,
    closeFriend,
    storiesUnavailable,
    storiesMaxId
  } = mtpUser;
  const hasVideoAvatar = mtpUser.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UserProfilePhoto ? Boolean(mtpUser.photo.hasVideo) : undefined;
  const avatarHash = mtpUser.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UserProfilePhoto ? String(mtpUser.photo.photoId) : undefined;
  const userType = buildApiUserType(mtpUser);
  const usernames = (0,_common__WEBPACK_IMPORTED_MODULE_3__.buildApiUsernames)(mtpUser);
  const emojiStatus = mtpUser.emojiStatus ? (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiEmojiStatus)(mtpUser.emojiStatus) : undefined;
  return {
    id: (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(id, 'user'),
    isMin: Boolean(mtpUser.min),
    fakeType: scam ? 'scam' : fake ? 'fake' : undefined,
    ...(mtpUser.self && {
      isSelf: true
    }),
    isPremium: Boolean(mtpUser.premium),
    ...(mtpUser.verified && {
      isVerified: true
    }),
    ...(closeFriend && {
      isCloseFriend: true
    }),
    ...(support && {
      isSupport: true
    }),
    ...((mtpUser.contact || mtpUser.mutualContact) && {
      isContact: true
    }),
    type: userType,
    firstName,
    lastName,
    canEditBot: Boolean(mtpUser.botCanEdit),
    ...(userType === 'userTypeBot' && {
      canBeInvitedToGroup: !mtpUser.botNochats
    }),
    ...(usernames && {
      usernames
    }),
    phoneNumber: mtpUser.phone || '',
    noStatus: !mtpUser.status,
    ...(mtpUser.accessHash && {
      accessHash: String(mtpUser.accessHash)
    }),
    ...(avatarHash && {
      avatarHash
    }),
    emojiStatus,
    hasVideoAvatar,
    areStoriesHidden: Boolean(mtpUser.storiesHidden),
    maxStoryId: storiesMaxId,
    hasStories: Boolean(storiesMaxId) && !storiesUnavailable,
    ...(mtpUser.bot && mtpUser.botInlinePlaceholder && {
      botPlaceholder: mtpUser.botInlinePlaceholder
    }),
    ...(mtpUser.bot && mtpUser.botAttachMenu && {
      isAttachBot: mtpUser.botAttachMenu
    }),
    color: mtpUser.color && (0,_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerColor)(mtpUser.color)
  };
}
function buildApiUserType(user) {
  if (user.bot) {
    return 'userTypeBot';
  }
  if (user.deleted) {
    return 'userTypeDeleted';
  }
  return 'userTypeRegular';
}
function buildApiUserStatus(mtpStatus) {
  if (!mtpStatus || mtpStatus instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UserStatusEmpty) {
    return {
      type: 'userStatusEmpty'
    };
  } else if (mtpStatus instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UserStatusOnline) {
    return {
      type: 'userStatusOnline',
      expires: mtpStatus.expires
    };
  } else if (mtpStatus instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UserStatusOffline) {
    return {
      type: 'userStatusOffline',
      wasOnline: mtpStatus.wasOnline
    };
  } else if (mtpStatus instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UserStatusRecently) {
    return {
      type: 'userStatusRecently',
      isReadDateRestrictedByMe: mtpStatus.byMe
    };
  } else if (mtpStatus instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UserStatusLastWeek) {
    return {
      type: 'userStatusLastWeek',
      isReadDateRestrictedByMe: mtpStatus.byMe
    };
  } else {
    return {
      type: 'userStatusLastMonth',
      isReadDateRestrictedByMe: mtpStatus.byMe
    };
  }
}
function buildApiUsersAndStatuses(mtpUsers) {
  const userStatusesById = {};
  const usersById = {};
  mtpUsers.forEach(mtpUser => {
    const user = buildApiUser(mtpUser);
    if (!user) {
      return;
    }
    const duplicateUser = usersById[user.id];
    if (!duplicateUser || duplicateUser.isMin) {
      usersById[user.id] = user;
    }
    if ('status' in mtpUser) {
      userStatusesById[user.id] = buildApiUserStatus(mtpUser.status);
    }
  });
  return {
    users: Object.values(usersById),
    userStatusesById
  };
}
function buildApiPremiumGiftOption(option) {
  const {
    months,
    currency,
    amount,
    botUrl
  } = option;
  return {
    months,
    currency,
    amount: amount.toJSNumber(),
    botUrl
  };
}
function buildApiBirthday(birthday) {
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.omitVirtualClassFields)(birthday);
}

/***/ }),

/***/ "./src/api/gramjs/methods/account.ts":
/*!*******************************************!*\
  !*** ./src/api/gramjs/methods/account.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeSessionSettings: () => (/* binding */ changeSessionSettings),
/* harmony export */   changeSessionTtl: () => (/* binding */ changeSessionTtl),
/* harmony export */   reportPeer: () => (/* binding */ reportPeer),
/* harmony export */   reportProfilePhoto: () => (/* binding */ reportProfilePhoto),
/* harmony export */   resolveBusinessChatLink: () => (/* binding */ resolveBusinessChatLink),
/* harmony export */   toggleSponsoredMessages: () => (/* binding */ toggleSponsoredMessages)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_misc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../apiBuilders/misc */ "./src/api/gramjs/apiBuilders/misc.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");







async function reportPeer(_ref) {
  let {
    peer,
    reason,
    description
  } = _ref;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_6__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ReportPeer({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    reason: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputReportReason)(reason),
    message: description
  }));
  return result;
}
async function reportProfilePhoto(_ref2) {
  let {
    peer,
    photo,
    reason,
    description
  } = _ref2;
  const photoId = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPhoto)(photo);
  if (!photoId) return undefined;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_6__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ReportProfilePhoto({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    photoId,
    reason: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputReportReason)(reason),
    message: description
  }));
  return result;
}
async function changeSessionSettings(_ref3) {
  let {
    hash,
    areCallsEnabled,
    areSecretChatsEnabled,
    isConfirmed
  } = _ref3;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_6__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ChangeAuthorizationSettings({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash),
    ...(areCallsEnabled !== undefined ? {
      callRequestsDisabled: !areCallsEnabled
    } : undefined),
    ...(areSecretChatsEnabled !== undefined ? {
      encryptedRequestsDisabled: !areSecretChatsEnabled
    } : undefined),
    ...(isConfirmed && {
      confirmed: isConfirmed
    })
  }));
  return result;
}
async function changeSessionTtl(_ref4) {
  let {
    days
  } = _ref4;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_6__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.SetAuthorizationTTL({
    authorizationTtlDays: days
  }));
  return result;
}
async function resolveBusinessChatLink(_ref5) {
  let {
    slug
  } = _ref5;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_6__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ResolveBusinessChatLink({
    slug
  }), {
    shouldIgnoreErrors: true
  });
  if (!result) return undefined;
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_4__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_2__.buildApiChatFromPreview)(c)).filter(Boolean);
  const chatLink = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_3__.buildApiChatLink)(result);
  return {
    users,
    chats,
    chatLink
  };
}
function toggleSponsoredMessages(_ref6) {
  let {
    enabled
  } = _ref6;
  return (0,_client__WEBPACK_IMPORTED_MODULE_6__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ToggleSponsoredMessages({
    enabled
  }), {
    shouldReturnTrue: true
  });
}

/***/ }),

/***/ "./src/api/gramjs/methods/auth.ts":
/*!****************************************!*\
  !*** ./src/api/gramjs/methods/auth.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildAuthStateUpdate: () => (/* binding */ buildAuthStateUpdate),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   onAuthError: () => (/* binding */ onAuthError),
/* harmony export */   onAuthReady: () => (/* binding */ onAuthReady),
/* harmony export */   onCurrentUserUpdate: () => (/* binding */ onCurrentUserUpdate),
/* harmony export */   onRequestCode: () => (/* binding */ onRequestCode),
/* harmony export */   onRequestPassword: () => (/* binding */ onRequestPassword),
/* harmony export */   onRequestPhoneNumber: () => (/* binding */ onRequestPhoneNumber),
/* harmony export */   onRequestQrCode: () => (/* binding */ onRequestQrCode),
/* harmony export */   onRequestRegistration: () => (/* binding */ onRequestRegistration),
/* harmony export */   onWebAuthTokenFailed: () => (/* binding */ onWebAuthTokenFailed),
/* harmony export */   provideAuthCode: () => (/* binding */ provideAuthCode),
/* harmony export */   provideAuthPassword: () => (/* binding */ provideAuthPassword),
/* harmony export */   provideAuthPhoneNumber: () => (/* binding */ provideAuthPhoneNumber),
/* harmony export */   provideAuthRegistration: () => (/* binding */ provideAuthRegistration),
/* harmony export */   restartAuth: () => (/* binding */ restartAuth),
/* harmony export */   restartAuthWithQr: () => (/* binding */ restartAuthWithQr)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");


const ApiErrors = {
  PHONE_NUMBER_INVALID: 'Invalid phone number.',
  PHONE_CODE_INVALID: 'Invalid code.',
  PASSWORD_HASH_INVALID: 'Incorrect password.',
  PHONE_PASSWORD_FLOOD: 'Limit exceeded. Please try again later.',
  PHONE_NUMBER_BANNED: 'This phone number is banned.'
};
const authController = {};
let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
function onWebAuthTokenFailed() {
  onUpdate({
    '@type': 'updateWebAuthTokenFailed'
  });
}
function onRequestPhoneNumber() {
  onUpdate(buildAuthStateUpdate('authorizationStateWaitPhoneNumber'));
  return new Promise((resolve, reject) => {
    authController.resolve = resolve;
    authController.reject = reject;
  });
}
function onRequestCode() {
  let isCodeViaApp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  onUpdate({
    ...buildAuthStateUpdate('authorizationStateWaitCode'),
    isCodeViaApp
  });
  return new Promise((resolve, reject) => {
    authController.resolve = resolve;
    authController.reject = reject;
  });
}
function onRequestPassword(hint, noReset) {
  onUpdate({
    ...buildAuthStateUpdate('authorizationStateWaitPassword'),
    hint,
    noReset
  });
  return new Promise(resolve => {
    authController.resolve = resolve;
  });
}
function onRequestRegistration() {
  onUpdate(buildAuthStateUpdate('authorizationStateWaitRegistration'));
  return new Promise(resolve => {
    authController.resolve = resolve;
  });
}
function onRequestQrCode(qrCode) {
  onUpdate({
    ...buildAuthStateUpdate('authorizationStateWaitQrCode'),
    qrCode: {
      token: btoa(String.fromCharCode(...qrCode.token)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
      expires: qrCode.expires
    }
  });
  return new Promise((resolve, reject) => {
    authController.reject = reject;
  });
}
function onAuthError(err) {
  let message;
  if (err instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.errors.FloodWaitError) {
    const hours = Math.ceil(Number(err.seconds) / 60 / 60);
    message = `Too many attempts. Try again in ${hours > 1 ? `${hours} hours` : 'an hour'}`;
  } else {
    message = ApiErrors[err.message];
  }
  if (!message) {
    message = 'Unexpected Error';
    if (_config__WEBPACK_IMPORTED_MODULE_1__.DEBUG) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
  onUpdate({
    '@type': 'updateAuthorizationError',
    message
  });
}
function onAuthReady() {
  onUpdate(buildAuthStateUpdate('authorizationStateReady'));
}
function onCurrentUserUpdate(currentUser, currentUserFullInfo) {
  onUpdate({
    '@type': 'updateCurrentUser',
    currentUser,
    currentUserFullInfo
  });
}
function buildAuthStateUpdate(authorizationState) {
  return {
    '@type': 'updateAuthorizationState',
    authorizationState
  };
}
function provideAuthPhoneNumber(phoneNumber) {
  if (!authController.resolve) {
    return;
  }
  authController.resolve(phoneNumber);
}
function provideAuthCode(code) {
  if (!authController.resolve) {
    return;
  }
  authController.resolve(code);
}
function provideAuthPassword(password) {
  if (!authController.resolve) {
    return;
  }
  authController.resolve(password);
}
function provideAuthRegistration(registration) {
  const {
    firstName,
    lastName
  } = registration;
  if (!authController.resolve) {
    return;
  }
  authController.resolve([firstName, lastName]);
}
function restartAuth() {
  if (!authController.reject) {
    return;
  }
  authController.reject(new Error('RESTART_AUTH'));
}
function restartAuthWithQr() {
  if (!authController.reject) {
    return;
  }
  authController.reject(new Error('RESTART_AUTH_WITH_QR'));
}

/***/ }),

/***/ "./src/api/gramjs/methods/bots.ts":
/*!****************************************!*\
  !*** ./src/api/gramjs/methods/bots.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   acceptBotUrlAuth: () => (/* binding */ acceptBotUrlAuth),
/* harmony export */   acceptLinkUrlAuth: () => (/* binding */ acceptLinkUrlAuth),
/* harmony export */   allowBotSendMessages: () => (/* binding */ allowBotSendMessages),
/* harmony export */   answerCallbackButton: () => (/* binding */ answerCallbackButton),
/* harmony export */   fetchBotApp: () => (/* binding */ fetchBotApp),
/* harmony export */   fetchBotCanSendMessage: () => (/* binding */ fetchBotCanSendMessage),
/* harmony export */   fetchInlineBot: () => (/* binding */ fetchInlineBot),
/* harmony export */   fetchInlineBotResults: () => (/* binding */ fetchInlineBotResults),
/* harmony export */   fetchTopInlineBots: () => (/* binding */ fetchTopInlineBots),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   invokeWebViewCustomMethod: () => (/* binding */ invokeWebViewCustomMethod),
/* harmony export */   loadAttachBot: () => (/* binding */ loadAttachBot),
/* harmony export */   loadAttachBots: () => (/* binding */ loadAttachBots),
/* harmony export */   prolongWebView: () => (/* binding */ prolongWebView),
/* harmony export */   requestAppWebView: () => (/* binding */ requestAppWebView),
/* harmony export */   requestBotUrlAuth: () => (/* binding */ requestBotUrlAuth),
/* harmony export */   requestLinkUrlAuth: () => (/* binding */ requestLinkUrlAuth),
/* harmony export */   requestSimpleWebView: () => (/* binding */ requestSimpleWebView),
/* harmony export */   requestWebView: () => (/* binding */ requestWebView),
/* harmony export */   sendInlineBotResult: () => (/* binding */ sendInlineBotResult),
/* harmony export */   sendWebViewData: () => (/* binding */ sendWebViewData),
/* harmony export */   setBotInfo: () => (/* binding */ setBotInfo),
/* harmony export */   startBot: () => (/* binding */ startBot),
/* harmony export */   toggleAttachBot: () => (/* binding */ toggleAttachBot)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/bots */ "./src/api/gramjs/apiBuilders/bots.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../apiBuilders/helpers */ "./src/api/gramjs/apiBuilders/helpers.ts");
/* harmony import */ var _apiBuilders_misc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../apiBuilders/misc */ "./src/api/gramjs/apiBuilders/misc.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");












let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
async function answerCallbackButton(_ref) {
  let {
    chatId,
    accessHash,
    messageId,
    data,
    isGame
  } = _ref;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetBotCallbackAnswer({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(chatId, accessHash),
    msgId: messageId,
    data: data ? (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.deserializeBytes)(data) : undefined,
    game: isGame || undefined
  }));
  return result ? (0,_apiBuilders_helpers__WEBPACK_IMPORTED_MODULE_6__.omitVirtualClassFields)(result) : undefined;
}
async function fetchTopInlineBots() {
  const topPeers = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.GetTopPeers({
    botsInline: true
  }));
  if (!(topPeers instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.TopPeers)) {
    return undefined;
  }
  const users = topPeers.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_8__.buildApiUser).filter(Boolean);
  const ids = users.map(_ref2 => {
    let {
      id
    } = _ref2;
    return id;
  });
  return {
    ids,
    users
  };
}
async function fetchInlineBot(_ref3) {
  let {
    username
  } = _ref3;
  const resolvedPeer = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.ResolveUsername({
    username
  }));
  if (!resolvedPeer || !(resolvedPeer.users[0] instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.User && resolvedPeer.users[0].bot && resolvedPeer.users[0].botInlinePlaceholder)) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addUserToLocalDb)(resolvedPeer.users[0]);
  return {
    user: (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_8__.buildApiUser)(resolvedPeer.users[0]),
    chat: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_5__.buildApiChatFromPreview)(resolvedPeer.users[0])
  };
}
async function fetchInlineBotResults(_ref4) {
  let {
    bot,
    chat,
    query,
    offset = ''
  } = _ref4;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetInlineBotResults({
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(chat.id, chat.accessHash),
    query,
    offset
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addEntitiesToLocalDb)(result.users);
  return {
    isGallery: Boolean(result.gallery),
    help: bot.botPlaceholder,
    nextOffset: getInlineBotResultsNextOffset(bot.usernames[0].username, result.nextOffset),
    switchPm: (0,_apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__.buildBotSwitchPm)(result.switchPm),
    switchWebview: (0,_apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__.buildBotSwitchWebview)(result.switchWebview),
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_8__.buildApiUser).filter(Boolean),
    results: processInlineBotResult(String(result.queryId), result.results),
    cacheTime: result.cacheTime
  };
}
async function sendInlineBotResult(_ref5) {
  let {
    chat,
    replyInfo,
    resultId,
    queryId,
    sendAs,
    isSilent,
    scheduleDate
  } = _ref5;
  const randomId = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.generateRandomBigInt)();
  await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SendInlineBotResult({
    clearDraft: true,
    randomId,
    queryId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(queryId),
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(chat.id, chat.accessHash),
    id: resultId,
    scheduleDate,
    replyTo: replyInfo && (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputReplyTo)(replyInfo),
    ...(isSilent && {
      silent: true
    }),
    ...(sendAs && {
      sendAs: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(sendAs.id, sendAs.accessHash)
    })
  }));
}
async function startBot(_ref6) {
  let {
    bot,
    startParam
  } = _ref6;
  const randomId = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.generateRandomBigInt)();
  await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.StartBot({
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
    randomId,
    startParam
  }));
}
async function requestWebView(_ref7) {
  let {
    isSilent,
    peer,
    bot,
    url,
    startParam,
    replyInfo,
    theme,
    sendAs,
    isFromBotMenu
  } = _ref7;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.RequestWebView({
    silent: isSilent || undefined,
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(peer.id, peer.accessHash),
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
    url,
    startParam,
    themeParams: theme ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputThemeParams)(theme) : undefined,
    fromBotMenu: isFromBotMenu || undefined,
    platform: _config__WEBPACK_IMPORTED_MODULE_2__.WEB_APP_PLATFORM,
    replyTo: replyInfo && (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputReplyTo)(replyInfo),
    ...(sendAs && {
      sendAs: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(sendAs.id, sendAs.accessHash)
    })
  }));
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.WebViewResultUrl) {
    return {
      url: result.url,
      queryId: result.queryId?.toString()
    };
  }
  return undefined;
}
async function requestSimpleWebView(_ref8) {
  let {
    bot,
    url,
    theme,
    startParam,
    isFromSwitchWebView,
    isFromSideMenu
  } = _ref8;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.RequestSimpleWebView({
    url,
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
    themeParams: theme ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputThemeParams)(theme) : undefined,
    platform: _config__WEBPACK_IMPORTED_MODULE_2__.WEB_APP_PLATFORM,
    startParam,
    fromSwitchWebview: isFromSwitchWebView || undefined,
    fromSideMenu: isFromSideMenu || undefined
  }));
  return result?.url;
}
async function fetchBotApp(_ref9) {
  let {
    bot,
    appName
  } = _ref9;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetBotApp({
    app: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputBotAppShortName({
      botId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputEntity)(bot.id, bot.accessHash),
      shortName: appName
    })
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.BotAppNotModified) {
    return undefined;
  }
  return (0,_apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__.buildApiMessagesBotApp)(result);
}
async function requestAppWebView(_ref10) {
  let {
    peer,
    app,
    startParam,
    theme,
    isWriteAllowed
  } = _ref10;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.RequestAppWebView({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(peer.id, peer.accessHash),
    app: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputBotApp)(app),
    startParam,
    themeParams: theme ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputThemeParams)(theme) : undefined,
    platform: _config__WEBPACK_IMPORTED_MODULE_2__.WEB_APP_PLATFORM,
    writeAllowed: isWriteAllowed || undefined
  }));
  return result?.url;
}
function prolongWebView(_ref11) {
  let {
    isSilent,
    peer,
    bot,
    queryId,
    replyInfo,
    sendAs
  } = _ref11;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ProlongWebView({
    silent: isSilent || undefined,
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(peer.id, peer.accessHash),
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
    queryId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(queryId),
    replyTo: replyInfo && (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputReplyTo)(replyInfo),
    ...(sendAs && {
      sendAs: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(sendAs.id, sendAs.accessHash)
    })
  }));
}
async function sendWebViewData(_ref12) {
  let {
    bot,
    buttonText,
    data
  } = _ref12;
  const randomId = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.generateRandomBigInt)();
  await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SendWebViewData({
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
    buttonText,
    data,
    randomId
  }));
}
async function loadAttachBots(_ref13) {
  let {
    hash
  } = _ref13;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetAttachMenuBots({
    hash: hash ? big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash) : undefined
  }));
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.AttachMenuBots) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addEntitiesToLocalDb)(result.users);
    return {
      hash: result.hash.toString(),
      bots: (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_3__.buildCollectionByKey)(result.bots.map(_apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__.buildApiAttachBot), 'id'),
      users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_8__.buildApiUser).filter(Boolean)
    };
  }
  return undefined;
}
async function loadAttachBot(_ref14) {
  let {
    bot
  } = _ref14;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetAttachMenuBot({
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash)
  }));
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.AttachMenuBotsBot) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addEntitiesToLocalDb)(result.users);
    return {
      bot: (0,_apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__.buildApiAttachBot)(result.bot),
      users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_8__.buildApiUser).filter(Boolean)
    };
  }
  return undefined;
}
function toggleAttachBot(_ref15) {
  let {
    bot,
    isWriteAllowed,
    isEnabled
  } = _ref15;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ToggleBotInAttachMenu({
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
    writeAllowed: isWriteAllowed || undefined,
    enabled: isEnabled
  }));
}
async function requestBotUrlAuth(_ref16) {
  let {
    chat,
    buttonId,
    messageId
  } = _ref16;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.RequestUrlAuth({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(chat.id, chat.accessHash),
    buttonId,
    msgId: messageId
  }));
  if (!result) return undefined;
  const authResult = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_7__.buildApiUrlAuthResult)(result);
  if (authResult?.type === 'request') {
    onUpdate({
      '@type': 'updateUser',
      id: authResult.bot.id,
      user: authResult.bot
    });
  }
  return authResult;
}
async function acceptBotUrlAuth(_ref17) {
  let {
    chat,
    messageId,
    buttonId,
    isWriteAllowed
  } = _ref17;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.AcceptUrlAuth({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(chat.id, chat.accessHash),
    msgId: messageId,
    buttonId,
    writeAllowed: isWriteAllowed || undefined
  }));
  if (!result) return undefined;
  const authResult = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_7__.buildApiUrlAuthResult)(result);
  if (authResult?.type === 'request') {
    onUpdate({
      '@type': 'updateUser',
      id: authResult.bot.id,
      user: authResult.bot
    });
  }
  return authResult;
}
async function requestLinkUrlAuth(_ref18) {
  let {
    url
  } = _ref18;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.RequestUrlAuth({
    url
  }));
  if (!result) return undefined;
  const authResult = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_7__.buildApiUrlAuthResult)(result);
  if (authResult?.type === 'request') {
    onUpdate({
      '@type': 'updateUser',
      id: authResult.bot.id,
      user: authResult.bot
    });
  }
  return authResult;
}
async function acceptLinkUrlAuth(_ref19) {
  let {
    url,
    isWriteAllowed
  } = _ref19;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.AcceptUrlAuth({
    url,
    writeAllowed: isWriteAllowed || undefined
  }));
  if (!result) return undefined;
  const authResult = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_7__.buildApiUrlAuthResult)(result);
  if (authResult?.type === 'request') {
    onUpdate({
      '@type': 'updateUser',
      id: authResult.bot.id,
      user: authResult.bot
    });
  }
  return authResult;
}
function fetchBotCanSendMessage(_ref20) {
  let {
    bot
  } = _ref20;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.bots.CanSendMessage({
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputEntity)(bot.id, bot.accessHash)
  }));
}
function allowBotSendMessages(_ref21) {
  let {
    bot
  } = _ref21;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.bots.AllowSendMessage({
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputEntity)(bot.id, bot.accessHash)
  }), {
    shouldReturnTrue: true
  });
}
async function invokeWebViewCustomMethod(_ref22) {
  let {
    bot,
    customMethod,
    parameters
  } = _ref22;
  try {
    const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.bots.InvokeWebViewCustomMethod({
      bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
      params: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DataJSON({
        data: parameters
      }),
      customMethod
    }), {
      shouldThrow: true
    });
    return {
      result: JSON.parse(result.data)
    };
  } catch (e) {
    const error = e;
    return {
      error: error.message
    };
  }
}
function processInlineBotResult(queryId, results) {
  return results.map(result => {
    if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.BotInlineMediaResult) {
      if (result.document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
        (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addDocumentToLocalDb)(result.document);
      }
      if (result.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo) {
        (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addPhotoToLocalDb)(result.photo);
      }
      return (0,_apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__.buildApiBotInlineMediaResult)(result, queryId);
    }
    if (result.thumb) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addWebDocumentToLocalDb)(result.thumb);
    }
    return (0,_apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__.buildApiBotInlineResult)(result, queryId);
  });
}
function getInlineBotResultsNextOffset(username, nextOffset) {
  return username === 'gif' && nextOffset === '0' ? '' : nextOffset;
}
function setBotInfo(_ref23) {
  let {
    bot,
    langCode,
    name,
    about,
    description
  } = _ref23;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.bots.SetBotInfo({
    bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeer)(bot.id, bot.accessHash),
    langCode,
    name: name || '',
    about: about || '',
    description: description || ''
  }), {
    shouldReturnTrue: true
  });
}

/***/ }),

/***/ "./src/api/gramjs/methods/calls.ts":
/*!*****************************************!*\
  !*** ./src/api/gramjs/methods/calls.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   acceptCall: () => (/* binding */ acceptCall),
/* harmony export */   confirmCall: () => (/* binding */ confirmCall),
/* harmony export */   createGroupCall: () => (/* binding */ createGroupCall),
/* harmony export */   discardCall: () => (/* binding */ discardCall),
/* harmony export */   discardGroupCall: () => (/* binding */ discardGroupCall),
/* harmony export */   editGroupCallParticipant: () => (/* binding */ editGroupCallParticipant),
/* harmony export */   editGroupCallTitle: () => (/* binding */ editGroupCallTitle),
/* harmony export */   exportGroupCallInvite: () => (/* binding */ exportGroupCallInvite),
/* harmony export */   fetchGroupCallParticipants: () => (/* binding */ fetchGroupCallParticipants),
/* harmony export */   getDhConfig: () => (/* binding */ getDhConfig),
/* harmony export */   getGroupCall: () => (/* binding */ getGroupCall),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   joinGroupCall: () => (/* binding */ joinGroupCall),
/* harmony export */   joinGroupCallPresentation: () => (/* binding */ joinGroupCallPresentation),
/* harmony export */   leaveGroupCall: () => (/* binding */ leaveGroupCall),
/* harmony export */   leaveGroupCallPresentation: () => (/* binding */ leaveGroupCallPresentation),
/* harmony export */   receivedCall: () => (/* binding */ receivedCall),
/* harmony export */   requestCall: () => (/* binding */ requestCall),
/* harmony export */   sendSignalingData: () => (/* binding */ sendSignalingData),
/* harmony export */   setCallRating: () => (/* binding */ setCallRating),
/* harmony export */   toggleGroupCallStartSubscription: () => (/* binding */ toggleGroupCallStartSubscription)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../apiBuilders/calls */ "./src/api/gramjs/apiBuilders/calls.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];









let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
async function getGroupCall(_ref) {
  let {
    call
  } = _ref;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.GetGroupCall({
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call)
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.chats);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(c)).filter(Boolean);
  return {
    groupCall: (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildApiGroupCall)(result.call),
    users,
    chats
  };
}
function discardGroupCall(_ref2) {
  let {
    call
  } = _ref2;
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.DiscardGroupCall({
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call)
  }), {
    shouldReturnTrue: true
  });
}
function editGroupCallParticipant(_ref3) {
  let {
    call,
    participant,
    muted,
    presentationPaused,
    videoStopped,
    videoPaused,
    volume,
    raiseHand
  } = _ref3;
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.EditGroupCallParticipant({
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call),
    participant: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(participant.id, participant.accessHash),
    ...(videoStopped !== undefined && {
      videoStopped
    }),
    ...(videoPaused !== undefined && {
      videoPaused
    }),
    ...(muted !== undefined && {
      muted
    }),
    ...(presentationPaused !== undefined && {
      presentationPaused
    }),
    ...(raiseHand !== undefined && {
      raiseHand
    }),
    ...(volume !== undefined && {
      volume
    })
  }), {
    shouldReturnTrue: true
  });
}
function editGroupCallTitle(_ref4) {
  let {
    groupCall,
    title
  } = _ref4;
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.EditGroupCallTitle({
    title,
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(groupCall)
  }), {
    shouldReturnTrue: true
  });
}
async function exportGroupCallInvite(_ref5) {
  let {
    call,
    canSelfUnmute
  } = _ref5;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.ExportGroupCallInvite({
    canSelfUnmute: canSelfUnmute || undefined,
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call)
  }));
  if (!result) {
    return undefined;
  }
  return result.link;
}
async function fetchGroupCallParticipants(_ref6) {
  let {
    call,
    offset
  } = _ref6;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.GetGroupParticipants({
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call),
    ids: [],
    sources: [],
    offset: offset || '',
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.GROUP_CALL_PARTICIPANTS_LIMIT
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.chats);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(c)).filter(Boolean);
  onUpdate({
    '@type': 'updateGroupCallParticipants',
    groupCallId: call.id,
    participants: result.participants.map(_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildApiGroupCallParticipant),
    nextOffset: result.nextOffset
  });
  return {
    users,
    chats
  };
}
function leaveGroupCall(_ref7) {
  let {
    call,
    isPageUnload
  } = _ref7;
  const request = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.LeaveGroupCall({
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call)
  });
  if (isPageUnload) {
    (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequestBeacon)(request);
    return;
  }
  (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(request, {
    shouldReturnTrue: true
  });
}
async function joinGroupCall(_ref8) {
  let {
    call,
    inviteHash,
    params
  } = _ref8;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.JoinGroupCall({
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call),
    joinAs: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerSelf(),
    muted: true,
    videoStopped: true,
    params: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DataJSON({
      data: JSON.stringify(params)
    }),
    inviteHash
  }), {
    shouldRetryOnTimeout: true,
    abortControllerGroup: 'call'
  });
  if (!result) return undefined;
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Updates) {
    const update = result.updates.find(u => u instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateGroupCall);
    if (!(update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateGroupCall)) return undefined;
    return (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildApiGroupCall)(update.call);
  }
  return undefined;
}
async function createGroupCall(_ref9) {
  let {
    peer
  } = _ref9;
  const randomId = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.generateRandomInt)();
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.CreateGroupCall({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(peer.id, peer.accessHash),
    randomId
  }));
  if (!result) return undefined;
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Updates) {
    const update = result.updates[0];
    if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateGroupCall) {
      return (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildApiGroupCall)(update.call);
    }
  }
  return undefined;
}
function joinGroupCallPresentation(_ref10) {
  let {
    call,
    params
  } = _ref10;
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.JoinGroupCallPresentation({
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call),
    params: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DataJSON({
      data: JSON.stringify(params)
    })
  }), {
    shouldReturnTrue: true
  });
}
function toggleGroupCallStartSubscription(_ref11) {
  let {
    call,
    subscribed
  } = _ref11;
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.ToggleGroupCallStartSubscription({
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call),
    subscribed
  }), {
    shouldReturnTrue: true,
    shouldIgnoreErrors: true
  });
}
function leaveGroupCallPresentation(_ref12) {
  let {
    call
  } = _ref12;
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.LeaveGroupCallPresentation({
    call: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputGroupCall)(call)
  }), {
    shouldReturnTrue: true
  });
}
async function getDhConfig() {
  const dhConfig = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetDhConfig({}));
  if (!dhConfig || dhConfig instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DhConfigNotModified) return undefined;
  return {
    g: dhConfig.g,
    p: Array.from(dhConfig.p),
    random: Array.from(dhConfig.random)
  };
}
function discardCall(_ref13) {
  let {
    call,
    isBusy,
    isPageUnload
  } = _ref13;
  const request = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.DiscardCall({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPhoneCall)(call),
    reason: isBusy ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PhoneCallDiscardReasonBusy() : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.PhoneCallDiscardReasonHangup()
  });
  if (isPageUnload) {
    (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequestBeacon)(request);
    return;
  }
  (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(request, {
    shouldReturnTrue: true
  });
}
async function requestCall(_ref14) {
  let {
    user,
    gAHash,
    isVideo
  } = _ref14;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.RequestCall({
    randomId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.generateRandomInt)(),
    userId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(user.id, user.accessHash),
    gAHash: Buffer.from(gAHash),
    ...(isVideo && {
      video: true
    }),
    protocol: (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildCallProtocol)()
  }));
  if (!result) {
    return undefined;
  }
  const call = (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildPhoneCall)(result.phoneCall);
  onUpdate({
    '@type': 'updatePhoneCall',
    call
  });
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean)
  };
}
function setCallRating(_ref15) {
  let {
    call,
    rating,
    comment
  } = _ref15;
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.SetCallRating({
    rating,
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPhoneCall)(call),
    comment
  }), {
    shouldReturnTrue: true
  });
}
function receivedCall(_ref16) {
  let {
    call
  } = _ref16;
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.ReceivedCall({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPhoneCall)(call)
  }));
}
async function acceptCall(_ref17) {
  let {
    call,
    gB
  } = _ref17;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.AcceptCall({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPhoneCall)(call),
    gB: Buffer.from(gB),
    protocol: (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildCallProtocol)()
  }));
  if (!result) {
    return undefined;
  }
  call = (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildPhoneCall)(result.phoneCall);
  onUpdate({
    '@type': 'updatePhoneCall',
    call
  });
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean)
  };
}
async function confirmCall(_ref18) {
  let {
    call,
    gA,
    keyFingerprint
  } = _ref18;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.ConfirmCall({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPhoneCall)(call),
    gA: Buffer.from(gA),
    keyFingerprint: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(keyFingerprint),
    protocol: (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildCallProtocol)()
  }));
  if (!result) {
    return undefined;
  }
  call = (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_3__.buildPhoneCall)(result.phoneCall);
  onUpdate({
    '@type': 'updatePhoneCall',
    call
  });
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean)
  };
}
function sendSignalingData(_ref19) {
  let {
    data,
    call
  } = _ref19;
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.phone.SendSignalingData({
    data: Buffer.from(data),
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPhoneCall)(call)
  }));
}

/***/ }),

/***/ "./src/api/gramjs/methods/chats.ts":
/*!*****************************************!*\
  !*** ./src/api/gramjs/methods/chats.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addChatMembers: () => (/* binding */ addChatMembers),
/* harmony export */   checkChatlistInvite: () => (/* binding */ checkChatlistInvite),
/* harmony export */   createChalistInvite: () => (/* binding */ createChalistInvite),
/* harmony export */   createChannel: () => (/* binding */ createChannel),
/* harmony export */   createGroupChat: () => (/* binding */ createGroupChat),
/* harmony export */   createTopic: () => (/* binding */ createTopic),
/* harmony export */   deleteChannel: () => (/* binding */ deleteChannel),
/* harmony export */   deleteChat: () => (/* binding */ deleteChat),
/* harmony export */   deleteChatFolder: () => (/* binding */ deleteChatFolder),
/* harmony export */   deleteChatMember: () => (/* binding */ deleteChatMember),
/* harmony export */   deleteChatUser: () => (/* binding */ deleteChatUser),
/* harmony export */   deleteChatlistInvite: () => (/* binding */ deleteChatlistInvite),
/* harmony export */   deleteTopic: () => (/* binding */ deleteTopic),
/* harmony export */   editChatFolder: () => (/* binding */ editChatFolder),
/* harmony export */   editChatPhoto: () => (/* binding */ editChatPhoto),
/* harmony export */   editChatlistInvite: () => (/* binding */ editChatlistInvite),
/* harmony export */   editTopic: () => (/* binding */ editTopic),
/* harmony export */   fetchChannelRecommendations: () => (/* binding */ fetchChannelRecommendations),
/* harmony export */   fetchChat: () => (/* binding */ fetchChat),
/* harmony export */   fetchChatFolders: () => (/* binding */ fetchChatFolders),
/* harmony export */   fetchChatSettings: () => (/* binding */ fetchChatSettings),
/* harmony export */   fetchChatlistInvites: () => (/* binding */ fetchChatlistInvites),
/* harmony export */   fetchChats: () => (/* binding */ fetchChats),
/* harmony export */   fetchFullChat: () => (/* binding */ fetchFullChat),
/* harmony export */   fetchGroupsForDiscussion: () => (/* binding */ fetchGroupsForDiscussion),
/* harmony export */   fetchLeaveChatlistSuggestions: () => (/* binding */ fetchLeaveChatlistSuggestions),
/* harmony export */   fetchMembers: () => (/* binding */ fetchMembers),
/* harmony export */   fetchRecommendedChatFolders: () => (/* binding */ fetchRecommendedChatFolders),
/* harmony export */   fetchSavedChats: () => (/* binding */ fetchSavedChats),
/* harmony export */   fetchTopicById: () => (/* binding */ fetchTopicById),
/* harmony export */   fetchTopics: () => (/* binding */ fetchTopics),
/* harmony export */   getChatByPhoneNumber: () => (/* binding */ getChatByPhoneNumber),
/* harmony export */   getChatByUsername: () => (/* binding */ getChatByUsername),
/* harmony export */   importChatInvite: () => (/* binding */ importChatInvite),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   joinChannel: () => (/* binding */ joinChannel),
/* harmony export */   joinChatlistInvite: () => (/* binding */ joinChatlistInvite),
/* harmony export */   leaveChannel: () => (/* binding */ leaveChannel),
/* harmony export */   leaveChatlist: () => (/* binding */ leaveChatlist),
/* harmony export */   migrateChat: () => (/* binding */ migrateChat),
/* harmony export */   openChatByInvite: () => (/* binding */ openChatByInvite),
/* harmony export */   reportSponsoredMessage: () => (/* binding */ reportSponsoredMessage),
/* harmony export */   requestChatUpdate: () => (/* binding */ requestChatUpdate),
/* harmony export */   saveDraft: () => (/* binding */ saveDraft),
/* harmony export */   searchChats: () => (/* binding */ searchChats),
/* harmony export */   setChatEnabledReactions: () => (/* binding */ setChatEnabledReactions),
/* harmony export */   setDiscussionGroup: () => (/* binding */ setDiscussionGroup),
/* harmony export */   setViewForumAsMessages: () => (/* binding */ setViewForumAsMessages),
/* harmony export */   sortChatFolders: () => (/* binding */ sortChatFolders),
/* harmony export */   toggleChatArchived: () => (/* binding */ toggleChatArchived),
/* harmony export */   toggleChatPinned: () => (/* binding */ toggleChatPinned),
/* harmony export */   toggleDialogUnread: () => (/* binding */ toggleDialogUnread),
/* harmony export */   toggleForum: () => (/* binding */ toggleForum),
/* harmony export */   toggleIsProtected: () => (/* binding */ toggleIsProtected),
/* harmony export */   toggleJoinRequest: () => (/* binding */ toggleJoinRequest),
/* harmony export */   toggleJoinToSend: () => (/* binding */ toggleJoinToSend),
/* harmony export */   toggleParticipantsHidden: () => (/* binding */ toggleParticipantsHidden),
/* harmony export */   togglePeerTranslations: () => (/* binding */ togglePeerTranslations),
/* harmony export */   togglePinnedTopic: () => (/* binding */ togglePinnedTopic),
/* harmony export */   togglePreHistoryHidden: () => (/* binding */ togglePreHistoryHidden),
/* harmony export */   toggleSavedDialogPinned: () => (/* binding */ toggleSavedDialogPinned),
/* harmony export */   toggleSignatures: () => (/* binding */ toggleSignatures),
/* harmony export */   updateChatAbout: () => (/* binding */ updateChatAbout),
/* harmony export */   updateChatAdmin: () => (/* binding */ updateChatAdmin),
/* harmony export */   updateChatDefaultBannedRights: () => (/* binding */ updateChatDefaultBannedRights),
/* harmony export */   updateChatMemberBannedRights: () => (/* binding */ updateChatMemberBannedRights),
/* harmony export */   updateChatMutedState: () => (/* binding */ updateChatMutedState),
/* harmony export */   updateChatTitle: () => (/* binding */ updateChatTitle),
/* harmony export */   updateTopicMutedState: () => (/* binding */ updateTopicMutedState)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _apiBuilders_messages__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../apiBuilders/messages */ "./src/api/gramjs/apiBuilders/messages.ts");
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../apiBuilders/symbols */ "./src/api/gramjs/apiBuilders/symbols.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _scheduleUnmute__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../scheduleUnmute */ "./src/api/gramjs/scheduleUnmute.ts");
/* harmony import */ var _updates_updateManager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../updates/updateManager */ "./src/api/gramjs/updates/updateManager.ts");
/* harmony import */ var _updates_updater__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../updates/updater */ "./src/api/gramjs/updates/updater.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");
















let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
async function fetchChats(_ref) {
  let {
    limit,
    offsetDate,
    archived,
    withPinned,
    lastLocalServiceMessageId
  } = _ref;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetDialogs({
    offsetPeer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerEmpty(),
    limit,
    offsetDate,
    ...(withPinned && {
      excludePinned: true
    })
  }));
  const resultPinned = withPinned ? await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetPinnedDialogs({
    folderId: archived ? _config__WEBPACK_IMPORTED_MODULE_2__.ARCHIVED_FOLDER_ID : undefined
  })) : undefined;
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DialogsNotModified) {
    return undefined;
  }
  if (resultPinned) {
    (0,_updates_updater__WEBPACK_IMPORTED_MODULE_14__.dispatchThreadInfoUpdates)(resultPinned.messages);
    updateLocalDb(resultPinned);
  }
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_14__.dispatchThreadInfoUpdates)(result.messages);
  updateLocalDb(result);
  const messages = (resultPinned ? resultPinned.messages : []).concat(result.messages).map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_6__.buildApiMessage).filter(Boolean);
  const peersByKey = preparePeers(result);
  if (resultPinned) {
    Object.assign(peersByKey, preparePeers(resultPinned, peersByKey));
  }
  const chats = [];
  const draftsById = {};
  const dialogs = (resultPinned ? resultPinned.dialogs : []).concat(result.dialogs);
  const orderedPinnedIds = [];
  const lastMessageByChatId = {};
  dialogs.forEach(dialog => {
    if (!(dialog instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Dialog)
    // This request can return dialogs not belonging to specified folder
    || !archived && dialog.folderId === _config__WEBPACK_IMPORTED_MODULE_2__.ARCHIVED_FOLDER_ID || archived && dialog.folderId !== _config__WEBPACK_IMPORTED_MODULE_2__.ARCHIVED_FOLDER_ID) {
      return;
    }
    const peerEntity = peersByKey[(0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.getPeerKey)(dialog.peer)];
    const chat = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromDialog)(dialog, peerEntity);
    lastMessageByChatId[chat.id] = dialog.topMessage;
    if (dialog.pts) {
      (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_13__.updateChannelState)(chat.id, dialog.pts);
    }
    if (chat.id === _config__WEBPACK_IMPORTED_MODULE_2__.SERVICE_NOTIFICATIONS_USER_ID && lastLocalServiceMessageId && lastLocalServiceMessageId > dialog.topMessage) {
      lastMessageByChatId[chat.id] = lastLocalServiceMessageId;
    }
    chat.isListed = true;
    chats.push(chat);
    (0,_scheduleUnmute__WEBPACK_IMPORTED_MODULE_12__.scheduleMutedChatUpdate)(chat.id, chat.muteUntil, onUpdate);
    if (withPinned && dialog.pinned) {
      orderedPinnedIds.push(chat.id);
    }
    if (dialog.draft) {
      const draft = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_6__.buildMessageDraft)(dialog.draft);
      if (draft) {
        draftsById[chat.id] = draft;
      }
    }
  });
  const chatIds = chats.map(chat => chat.id);
  const {
    users,
    userStatusesById
  } = (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUsersAndStatuses)((resultPinned?.users || []).concat(result.users));
  let totalChatCount;
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DialogsSlice) {
    totalChatCount = result.count;
  } else {
    totalChatCount = chatIds.length;
  }
  return {
    chatIds,
    chats,
    users,
    userStatusesById,
    draftsById,
    orderedPinnedIds: withPinned ? orderedPinnedIds : undefined,
    totalChatCount,
    lastMessageByChatId,
    messages
  };
}
async function fetchSavedChats(_ref2) {
  let {
    limit,
    offsetDate,
    withPinned
  } = _ref2;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetSavedDialogs({
    offsetPeer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerEmpty(),
    limit,
    offsetDate,
    ...(withPinned && {
      excludePinned: true
    })
  }));
  const resultPinned = withPinned ? await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetPinnedSavedDialogs()) : undefined;
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SavedDialogsNotModified) {
    return undefined;
  }
  const hasPinned = resultPinned && !(resultPinned instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SavedDialogsNotModified);
  if (hasPinned) {
    updateLocalDb(resultPinned);
  }
  updateLocalDb(result);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_14__.dispatchThreadInfoUpdates)(result.messages);
  const messages = (hasPinned ? resultPinned.messages : []).concat(result.messages).map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_6__.buildApiMessage).filter(Boolean);
  const peersByKey = preparePeers(result);
  if (hasPinned) {
    Object.assign(peersByKey, preparePeers(resultPinned, peersByKey));
  }
  const dialogs = (hasPinned ? resultPinned.dialogs : []).concat(result.dialogs);
  const chatIds = [];
  const orderedPinnedIds = [];
  const lastMessageByChatId = {};
  const chats = [];
  dialogs.forEach(dialog => {
    const peerEntity = peersByKey[(0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.getPeerKey)(dialog.peer)];
    const chat = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromSavedDialog)(dialog, peerEntity);
    const chatId = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__.getApiChatIdFromMtpPeer)(dialog.peer);
    chatIds.push(chatId);
    if (withPinned && dialog.pinned) {
      orderedPinnedIds.push(chatId);
    }
    lastMessageByChatId[chatId] = dialog.topMessage;
    chats.push(chat);
  });
  const {
    users,
    userStatusesById
  } = (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUsersAndStatuses)((hasPinned ? resultPinned.users : []).concat(result.users));
  let totalChatCount;
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SavedDialogsSlice) {
    totalChatCount = result.count;
  } else {
    totalChatCount = chatIds.length;
  }
  return {
    chatIds,
    chats,
    users,
    userStatusesById,
    orderedPinnedIds: withPinned ? orderedPinnedIds : undefined,
    totalChatCount,
    lastMessageByChatId,
    messages,
    draftsById: {}
  };
}
function fetchFullChat(chat) {
  const {
    id,
    accessHash,
    adminRights
  } = chat;
  const input = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(id, accessHash);
  return input instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChannel ? getFullChannelInfo(id, accessHash, adminRights) : getFullChatInfo(id);
}
async function fetchChatSettings(chat) {
  const {
    id,
    accessHash
  } = chat;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetPeerSettings({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash)
  }), {
    abortControllerChatId: id
  });
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_11__.addEntitiesToLocalDb)(result.users);
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUser).filter(Boolean),
    settings: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatSettings)(result.settings)
  };
}
async function searchChats(_ref3) {
  let {
    query
  } = _ref3;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.Search({
    q: query,
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_SEARCH_CONTACTS_LIMIT
  }));
  if (!result) {
    return undefined;
  }
  updateLocalDb(result);
  const accountPeerIds = result.myResults.map(_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__.getApiChatIdFromMtpPeer);
  const globalPeerIds = result.results.map(_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__.getApiChatIdFromMtpPeer).filter(id => !accountPeerIds.includes(id));
  const chats = result.chats.concat(result.users).map(user => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(user)).filter(Boolean);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUser).filter(Boolean);
  return {
    accountResultIds: accountPeerIds,
    globalResultIds: globalPeerIds,
    chats,
    users
  };
}
async function fetchChat(_ref4) {
  let {
    type,
    user
  } = _ref4;
  let mtpUser;
  if (type === 'self' || type === 'user') {
    const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.users.GetUsers({
      id: [type === 'user' && user ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(user.id, user.accessHash) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputUserSelf()]
    }));
    if (!result || !result.length) {
      return undefined;
    }
    [mtpUser] = result;
  } else if (type === 'support') {
    const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.GetSupport());
    if (!result || !result.user) {
      return undefined;
    }
    mtpUser = result.user;
  }
  const chat = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(mtpUser, type === 'support');
  if (!chat) {
    return undefined;
  }
  onUpdate({
    '@type': 'updateChat',
    id: chat.id,
    chat
  });
  return {
    chatId: chat.id
  };
}
async function requestChatUpdate(_ref5) {
  let {
    chat,
    lastLocalMessage,
    noLastMessage
  } = _ref5;
  const {
    id,
    accessHash
  } = chat;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetPeerDialogs({
    peers: [new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputDialogPeer({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash)
    })]
  }));
  if (!result) {
    return;
  }
  const dialog = result.dialogs[0];
  if (!dialog || !(dialog instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Dialog)) {
    return;
  }
  const peersByKey = preparePeers(result);
  const peerEntity = peersByKey[(0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.getPeerKey)(dialog.peer)];
  if (!peerEntity) {
    return;
  }
  updateLocalDb(result);
  const lastRemoteMessage = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_6__.buildApiMessage)(result.messages[0]);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_14__.dispatchThreadInfoUpdates)(result.messages);
  const lastMessage = lastLocalMessage && (!lastRemoteMessage || lastLocalMessage.date > lastRemoteMessage.date) ? lastLocalMessage : lastRemoteMessage;
  const chatUpdate = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromDialog)(dialog, peerEntity);
  onUpdate({
    '@type': 'updateChat',
    id,
    chat: chatUpdate
  });
  if (!noLastMessage && lastMessage) {
    onUpdate({
      '@type': 'updateChatLastMessage',
      id,
      lastMessage
    });
  }
  (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_13__.applyState)(result.state);
  (0,_scheduleUnmute__WEBPACK_IMPORTED_MODULE_12__.scheduleMutedChatUpdate)(chatUpdate.id, chatUpdate.muteUntil, onUpdate);
}
function saveDraft(_ref6) {
  let {
    chat,
    draft
  } = _ref6;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SaveDraft({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(chat.id, chat.accessHash),
    message: draft?.text?.text || '',
    entities: draft?.text?.entities?.map(_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildMtpMessageEntity),
    replyTo: draft?.replyInfo && (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputReplyTo)(draft.replyInfo)
  }));
}
async function getFullChatInfo(chatId) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetFullChat({
    chatId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chatId)
  }));
  if (!result || !(result.fullChat instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatFull)) {
    return undefined;
  }
  updateLocalDb(result);
  const {
    about,
    participants,
    exportedInvite,
    botInfo,
    call,
    availableReactions,
    recentRequesters,
    requestsPending,
    chatPhoto,
    translationsDisabled
  } = result.fullChat;
  if (chatPhoto) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_11__.addPhotoToLocalDb)(chatPhoto);
  }
  const members = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildChatMembers)(participants);
  const adminMembers = members ? members.filter(_ref7 => {
    let {
      isAdmin,
      isOwner
    } = _ref7;
    return isAdmin || isOwner;
  }) : undefined;
  const botCommands = botInfo ? (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatBotCommands)(botInfo) : undefined;
  const inviteLink = exportedInvite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatInviteExported ? exportedInvite.link : undefined;
  const {
    users,
    userStatusesById
  } = (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUsersAndStatuses)(result.users);
  const chats = result.chats.map(chat => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(chat)).filter(Boolean);
  return {
    fullInfo: {
      ...(chatPhoto instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo && {
        profilePhoto: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_5__.buildApiPhoto)(chatPhoto)
      }),
      about,
      members,
      adminMembersById: adminMembers ? (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_3__.buildCollectionByKey)(adminMembers, 'userId') : undefined,
      canViewMembers: true,
      botCommands,
      inviteLink,
      groupCallId: call?.id.toString(),
      enabledReactions: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatReactions)(availableReactions),
      requestsPending,
      recentRequesterIds: recentRequesters?.map(userId => (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(userId, 'user')),
      isTranslationDisabled: translationsDisabled,
      isPreHistoryHidden: true
    },
    users,
    chats,
    userStatusesById,
    groupCall: call ? {
      chatId,
      isLoaded: false,
      id: call.id.toString(),
      accessHash: call.accessHash.toString(),
      connectionState: 'disconnected',
      participantsCount: 0,
      version: 0,
      participants: {}
    } : undefined,
    membersCount: members?.length
  };
}
async function getFullChannelInfo(id, accessHash, adminRights) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.GetFullChannel({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(id, accessHash)
  }));
  if (!result || !(result.fullChat instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChannelFull)) {
    return undefined;
  }
  const {
    about,
    onlineCount,
    exportedInvite,
    slowmodeSeconds,
    slowmodeNextSendDate,
    migratedFromChatId,
    migratedFromMaxId,
    canViewParticipants,
    canViewStats,
    linkedChatId,
    hiddenPrehistory,
    call,
    botInfo,
    availableReactions,
    defaultSendAs,
    requestsPending,
    recentRequesters,
    statsDc,
    participantsCount,
    stickerset,
    chatPhoto,
    participantsHidden,
    translationsDisabled,
    storiesPinnedAvailable,
    viewForumAsMessages,
    emojiset,
    boostsApplied,
    boostsUnrestrict
  } = result.fullChat;
  if (chatPhoto) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_11__.addPhotoToLocalDb)(chatPhoto);
  }
  const inviteLink = exportedInvite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatInviteExported ? exportedInvite.link : undefined;
  const {
    members,
    users,
    userStatusesById
  } = canViewParticipants && (await fetchMembers(id, accessHash)) || {};
  const {
    members: kickedMembers,
    users: bannedUsers,
    userStatusesById: bannedStatusesById
  } = canViewParticipants && adminRights && (await fetchMembers(id, accessHash, 'kicked')) || {};
  const {
    members: adminMembers,
    users: adminUsers,
    userStatusesById: adminStatusesById
  } = canViewParticipants && (await fetchMembers(id, accessHash, 'admin')) || {};
  const botCommands = botInfo ? (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatBotCommands)(botInfo) : undefined;
  const chats = result.chats.map(chat => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(chat)).filter(Boolean);
  if (result?.chats?.length > 1) {
    updateLocalDb(result);
    const [, mtpLinkedChat] = result.chats;
    const chat = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(mtpLinkedChat);
    if (chat) {
      onUpdate({
        '@type': 'updateChat',
        id: chat.id,
        chat
      });
    }
  }
  if (result.fullChat.pts) {
    (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_13__.updateChannelState)(id, result.fullChat.pts);
  }
  const statusesById = {
    ...userStatusesById,
    ...bannedStatusesById,
    ...adminStatusesById
  };
  return {
    fullInfo: {
      ...(chatPhoto instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo && {
        profilePhoto: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_5__.buildApiPhoto)(chatPhoto)
      }),
      about,
      onlineCount,
      inviteLink,
      slowMode: slowmodeSeconds ? {
        seconds: slowmodeSeconds,
        nextSendDate: slowmodeNextSendDate
      } : undefined,
      migratedFrom: migratedFromChatId ? {
        chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(migratedFromChatId, 'chat'),
        maxMessageId: migratedFromMaxId
      } : undefined,
      canViewMembers: canViewParticipants,
      canViewStatistics: canViewStats,
      isPreHistoryHidden: hiddenPrehistory,
      members,
      kickedMembers,
      adminMembersById: adminMembers ? (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_3__.buildCollectionByKey)(adminMembers, 'userId') : undefined,
      groupCallId: call ? String(call.id) : undefined,
      linkedChatId: linkedChatId ? (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(linkedChatId, 'channel') : undefined,
      botCommands,
      enabledReactions: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatReactions)(availableReactions),
      sendAsId: defaultSendAs ? (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__.getApiChatIdFromMtpPeer)(defaultSendAs) : undefined,
      requestsPending,
      recentRequesterIds: recentRequesters?.map(userId => (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__.buildApiPeerId)(userId, 'user')),
      statisticsDcId: statsDc,
      stickerSet: stickerset ? (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_8__.buildStickerSet)(stickerset) : undefined,
      emojiSet: emojiset ? (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_8__.buildStickerSet)(emojiset) : undefined,
      areParticipantsHidden: participantsHidden,
      isTranslationDisabled: translationsDisabled,
      hasPinnedStories: Boolean(storiesPinnedAvailable),
      boostsApplied,
      boostsToUnrestrict: boostsUnrestrict
    },
    users: [...(users || []), ...(bannedUsers || []), ...(adminUsers || [])],
    chats,
    userStatusesById: statusesById,
    groupCall: call ? {
      chatId: id,
      isLoaded: false,
      id: call.id.toString(),
      accessHash: call?.accessHash.toString(),
      participants: {},
      version: 0,
      participantsCount: 0,
      connectionState: 'disconnected'
    } : undefined,
    membersCount: participantsCount,
    ...(viewForumAsMessages && {
      isForumAsMessages: true
    })
  };
}
async function updateChatMutedState(_ref8) {
  let {
    chat,
    isMuted,
    muteUntil = 0
  } = _ref8;
  if (isMuted && !muteUntil) {
    muteUntil = _config__WEBPACK_IMPORTED_MODULE_2__.MAX_INT_32;
  }
  await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.UpdateNotifySettings({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputNotifyPeer({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(chat.id, chat.accessHash)
    }),
    settings: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerNotifySettings({
      muteUntil
    })
  }));
  onUpdate({
    '@type': 'updateNotifyExceptions',
    chatId: chat.id,
    isMuted
  });
  void requestChatUpdate({
    chat,
    noLastMessage: true
  });
}
async function updateTopicMutedState(_ref9) {
  let {
    chat,
    topicId,
    isMuted,
    muteUntil = 0
  } = _ref9;
  if (isMuted && !muteUntil) {
    muteUntil = _config__WEBPACK_IMPORTED_MODULE_2__.MAX_INT_32;
  }
  await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.UpdateNotifySettings({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputNotifyForumTopic({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(chat.id, chat.accessHash),
      topMsgId: topicId
    }),
    settings: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerNotifySettings({
      muteUntil
    })
  }));
  onUpdate({
    '@type': 'updateTopicNotifyExceptions',
    chatId: chat.id,
    topicId,
    isMuted
  });

  // TODO[forums] Request forum topic thread update
}
async function createChannel(_ref10) {
  let {
    title,
    about = '',
    users
  } = _ref10;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.CreateChannel({
    broadcast: true,
    title,
    about
  }), {
    shouldThrow: true
  });

  // `createChannel` can return a lot of different update types according to docs,
  // but currently channel creation returns only `Updates` type.
  // Errors are added to catch unexpected cases in future testing
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Updates)) {
    if (_config__WEBPACK_IMPORTED_MODULE_2__.DEBUG) {
      // eslint-disable-next-line no-console
      console.error('Unexpected channel creation update', result);
    }
    return undefined;
  }
  const newChannel = result.chats[0];
  if (!newChannel || !(newChannel instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Channel)) {
    if (_config__WEBPACK_IMPORTED_MODULE_2__.DEBUG) {
      // eslint-disable-next-line no-console
      console.error('Created channel not found', result);
    }
    return undefined;
  }
  const channel = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(newChannel);
  let missingUsers;
  if (users?.length) {
    const invitedUsers = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.InviteToChannel({
      channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(channel.id, channel.accessHash),
      users: users.map(_ref11 => {
        let {
          id,
          accessHash
        } = _ref11;
        return (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(id, accessHash);
      })
    }));
    if (!invitedUsers) return undefined;
    (0,_client__WEBPACK_IMPORTED_MODULE_15__.handleGramJsUpdate)(invitedUsers.updates);
    missingUsers = invitedUsers.missingInvitees.map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiMissingInvitedUser);
  }
  return {
    channel,
    missingUsers
  };
}
function joinChannel(_ref12) {
  let {
    channelId,
    accessHash
  } = _ref12;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.JoinChannel({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(channelId, accessHash)
  }), {
    shouldReturnTrue: true,
    shouldThrow: true
  });
}
function deleteChatUser(_ref13) {
  let {
    chat,
    user
  } = _ref13;
  if (chat.type !== 'chatTypeBasicGroup') return undefined;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DeleteChatUser({
    chatId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id, chat.accessHash),
    userId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(user.id, user.accessHash)
  }), {
    shouldReturnTrue: true
  });
}
function deleteChat(_ref14) {
  let {
    chatId
  } = _ref14;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DeleteChat({
    chatId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chatId)
  }), {
    shouldReturnTrue: true
  });
}
function leaveChannel(_ref15) {
  let {
    channelId,
    accessHash
  } = _ref15;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.LeaveChannel({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(channelId, accessHash)
  }), {
    shouldReturnTrue: true
  });
}
function deleteChannel(_ref16) {
  let {
    channelId,
    accessHash
  } = _ref16;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.DeleteChannel({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(channelId, accessHash)
  }), {
    shouldReturnTrue: true
  });
}
async function createGroupChat(_ref17) {
  let {
    title,
    users
  } = _ref17;
  const invitedUsers = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.CreateChat({
    title,
    users: users.map(_ref18 => {
      let {
        id,
        accessHash
      } = _ref18;
      return (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(id, accessHash);
    })
  }));
  if (!invitedUsers) return undefined;
  (0,_client__WEBPACK_IMPORTED_MODULE_15__.handleGramJsUpdate)(invitedUsers.updates);
  const missingUsers = invitedUsers.missingInvitees.map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiMissingInvitedUser);
  const newChat = invitedUsers.updates.chats[0];
  if (!newChat || !(newChat instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Chat)) {
    if (_config__WEBPACK_IMPORTED_MODULE_2__.DEBUG) {
      // eslint-disable-next-line no-console
      console.error('Created chat not found', invitedUsers.updates);
    }
    return undefined;
  }
  return {
    chat: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(newChat),
    missingUsers
  };
}
async function editChatPhoto(_ref19) {
  let {
    chatId,
    accessHash,
    photo
  } = _ref19;
  const inputEntity = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chatId, accessHash);
  let inputPhoto;
  if (photo instanceof File) {
    const uploadedPhoto = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.uploadFile)(photo);
    inputPhoto = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChatUploadedPhoto({
      file: uploadedPhoto
    });
  } else if (photo) {
    const photoId = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPhoto)(photo);
    if (!photoId) return false;
    inputPhoto = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChatPhoto({
      id: photoId
    });
  } else {
    inputPhoto = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChatPhotoEmpty();
  }
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(inputEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChannel ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.EditPhoto({
    channel: inputEntity,
    photo: inputPhoto
  }) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.EditChatPhoto({
    chatId: inputEntity,
    photo: inputPhoto
  }), {
    shouldReturnTrue: true
  });
}
async function toggleChatPinned(_ref20) {
  let {
    chat,
    shouldBePinned
  } = _ref20;
  const {
    id,
    accessHash
  } = chat;
  const isActionSuccessful = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ToggleDialogPin({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputDialogPeer({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash)
    }),
    pinned: shouldBePinned || undefined
  }));
  if (isActionSuccessful) {
    onUpdate({
      '@type': 'updateChatPinned',
      id: chat.id,
      isPinned: shouldBePinned
    });
  }
}
async function toggleSavedDialogPinned(_ref21) {
  let {
    chat,
    shouldBePinned
  } = _ref21;
  const {
    id,
    accessHash
  } = chat;
  const isActionSuccessful = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ToggleSavedDialogPin({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputDialogPeer({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash)
    }),
    pinned: shouldBePinned || undefined
  }));
  if (isActionSuccessful) {
    onUpdate({
      '@type': 'updateSavedDialogPinned',
      id: chat.id,
      isPinned: shouldBePinned
    });
  }
}
function toggleChatArchived(_ref22) {
  let {
    chat,
    folderId
  } = _ref22;
  const {
    id,
    accessHash
  } = chat;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.folders.EditPeerFolders({
    folderPeers: [new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputFolderPeer({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
      folderId
    })]
  }), {
    shouldReturnTrue: true
  });
}
async function fetchChatFolders() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetDialogFilters());
  if (!result) {
    return undefined;
  }
  const {
    filters
  } = result;
  const defaultFolderPosition = filters.findIndex(folder => folder instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DialogFilterDefault);
  const dialogFilters = filters.filter(_helpers__WEBPACK_IMPORTED_MODULE_11__.isChatFolder);
  const orderedIds = dialogFilters.map(_ref23 => {
    let {
      id
    } = _ref23;
    return id;
  });
  if (defaultFolderPosition !== -1) {
    orderedIds.splice(defaultFolderPosition, 0, _config__WEBPACK_IMPORTED_MODULE_2__.ALL_FOLDER_ID);
  }
  return {
    byId: (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_3__.buildCollectionByKey)(dialogFilters.map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFolder), 'id'),
    orderedIds
  };
}
async function fetchRecommendedChatFolders() {
  const results = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetSuggestedDialogFilters());
  if (!results) {
    return undefined;
  }
  return results.map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFolderFromSuggested).filter(Boolean);
}
async function editChatFolder(_ref24) {
  let {
    id,
    folderUpdate
  } = _ref24;
  // Telegram ignores excluded chats if they also present in the included list
  folderUpdate.excludedChatIds = folderUpdate.excludedChatIds.filter(chatId => {
    return !folderUpdate.includedChatIds.includes(chatId);
  });
  const filter = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildFilterFromApiFolder)(folderUpdate);
  const isActionSuccessful = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.UpdateDialogFilter({
    id,
    filter
  }));
  if (isActionSuccessful) {
    onUpdate({
      '@type': 'updateChatFolder',
      id,
      folder: folderUpdate
    });
  }
}
async function deleteChatFolder(id) {
  const isActionSuccessful = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.UpdateDialogFilter({
    id,
    filter: undefined
  }));
  const recommendedChatFolders = await fetchRecommendedChatFolders();
  if (isActionSuccessful) {
    onUpdate({
      '@type': 'updateChatFolder',
      id,
      folder: undefined
    });
  }
  if (recommendedChatFolders) {
    onUpdate({
      '@type': 'updateRecommendedChatFolders',
      folders: recommendedChatFolders
    });
  }
}
function sortChatFolders(ids) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.UpdateDialogFiltersOrder({
    order: ids
  }));
}
async function toggleDialogUnread(_ref25) {
  let {
    chat,
    hasUnreadMark
  } = _ref25;
  const {
    id,
    accessHash
  } = chat;
  const isActionSuccessful = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MarkDialogUnread({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputDialogPeer({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash)
    }),
    unread: hasUnreadMark || undefined
  }));
  if (isActionSuccessful) {
    onUpdate({
      '@type': 'updateChat',
      id: chat.id,
      chat: {
        hasUnreadMark
      }
    });
  }
}
async function getChatByPhoneNumber(phoneNumber) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.ResolvePhone({
    phone: phoneNumber
  }));
  return processResolvedPeer(result);
}
async function getChatByUsername(username) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.ResolveUsername({
    username
  }));
  return processResolvedPeer(result);
}
function processResolvedPeer(result) {
  if (!result) {
    return undefined;
  }
  const {
    users,
    chats
  } = result;
  const chat = chats.length ? (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(chats[0]) : (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(users[0]);
  if (!chat) {
    return undefined;
  }
  updateLocalDb(result);
  return {
    chat,
    user: (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUser)(users[0])
  };
}
function togglePreHistoryHidden(_ref26) {
  let {
    chat,
    isEnabled
  } = _ref26;
  const {
    id,
    accessHash
  } = chat;
  const channel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(id, accessHash);
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.TogglePreHistoryHidden({
    channel: channel,
    enabled: isEnabled
  }), {
    shouldReturnTrue: true
  });
}
function updateChatDefaultBannedRights(_ref27) {
  let {
    chat,
    bannedRights
  } = _ref27;
  const {
    id,
    accessHash
  } = chat;
  const peer = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash);
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.EditChatDefaultBannedRights({
    peer,
    bannedRights: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildChatBannedRights)(bannedRights)
  }), {
    shouldReturnTrue: true
  });
}
function updateChatMemberBannedRights(_ref28) {
  let {
    chat,
    user,
    bannedRights,
    untilDate
  } = _ref28;
  const channel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id, chat.accessHash);
  const participant = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(user.id, user.accessHash);
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.EditBanned({
    channel,
    participant,
    bannedRights: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildChatBannedRights)(bannedRights, untilDate)
  }), {
    shouldReturnTrue: true
  });
}
function updateChatAdmin(_ref29) {
  let {
    chat,
    user,
    adminRights,
    customTitle = ''
  } = _ref29;
  const channel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id, chat.accessHash);
  const userId = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(user.id, user.accessHash);
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.EditAdmin({
    channel,
    userId,
    adminRights: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildChatAdminRights)(adminRights),
    rank: customTitle
  }), {
    shouldReturnTrue: true
  });
}
async function updateChatTitle(chat, title) {
  const inputEntity = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id, chat.accessHash);
  await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(inputEntity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChannel ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.EditTitle({
    channel: inputEntity,
    title
  }) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.EditChatTitle({
    chatId: inputEntity,
    title
  }), {
    shouldReturnTrue: true
  });
}
async function updateChatAbout(chat, about) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.EditChatAbout({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(chat.id, chat.accessHash),
    about
  }));
  if (!result) {
    return;
  }
  onUpdate({
    '@type': 'updateChatFullInfo',
    id: chat.id,
    fullInfo: {
      about
    }
  });
}
function toggleSignatures(_ref30) {
  let {
    chat,
    isEnabled
  } = _ref30;
  const {
    id,
    accessHash
  } = chat;
  const channel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(id, accessHash);
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ToggleSignatures({
    channel: channel,
    enabled: isEnabled
  }), {
    shouldReturnTrue: true
  });
}
async function fetchMembers(chatId, accessHash) {
  let memberFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'recent';
  let offset = arguments.length > 3 ? arguments[3] : undefined;
  let filter;
  switch (memberFilter) {
    case 'kicked':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChannelParticipantsKicked({
        q: ''
      });
      break;
    case 'admin':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChannelParticipantsAdmins();
      break;
    default:
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChannelParticipantsRecent();
      break;
  }
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.GetParticipants({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chatId, accessHash),
    filter,
    offset,
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.MEMBERS_LOAD_SLICE
  }), {
    abortControllerChatId: chatId
  });
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ChannelParticipantsNotModified) {
    return undefined;
  }
  updateLocalDb(result);
  const {
    users,
    userStatusesById
  } = (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUsersAndStatuses)(result.users);
  return {
    members: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildChatMembers)(result),
    users,
    userStatusesById
  };
}
async function fetchGroupsForDiscussion() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.GetGroupsForDiscussion());
  if (!result) {
    return undefined;
  }
  updateLocalDb(result);
  return result.chats.map(chat => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(chat));
}
function setDiscussionGroup(_ref31) {
  let {
    channel,
    chat
  } = _ref31;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.SetDiscussionGroup({
    broadcast: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(channel.id, channel.accessHash),
    group: chat ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(chat.id, chat.accessHash) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChannelEmpty()
  }), {
    shouldReturnTrue: true
  });
}
async function migrateChat(chat) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MigrateChat({
    chatId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id)
  }), {
    shouldThrow: true
  });

  // `migrateChat` can return a lot of different update types according to docs,
  // but currently chat migrations returns only `Updates` type.
  // Errors are added to catch unexpected cases in future testing
  if (!result || !(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Updates)) {
    if (_config__WEBPACK_IMPORTED_MODULE_2__.DEBUG) {
      // eslint-disable-next-line no-console
      console.error('Unexpected channel creation update', result);
    }
    return undefined;
  }
  updateLocalDb(result);
  const newChannelId = result.updates.find(update => update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateChannel).channelId;
  const newChannel = result.chats.find(c => c instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Channel && c.id.toString() === newChannelId.toString());
  return (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(newChannel);
}
async function openChatByInvite(hash) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.CheckChatInvite({
    hash
  }));
  if (!result) {
    return undefined;
  }
  let chat;
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ChatInvite) {
    const {
      photo,
      participantsCount,
      title,
      channel,
      requestNeeded,
      about,
      megagroup
    } = result;
    if (photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_11__.addPhotoToLocalDb)(result.photo);
    }
    onUpdate({
      '@type': 'showInvite',
      data: {
        title,
        about,
        hash,
        participantsCount,
        isChannel: channel && !megagroup,
        isRequestNeeded: requestNeeded,
        ...(photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo && {
          photo: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_5__.buildApiPhoto)(photo)
        })
      }
    });
  } else {
    chat = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(result.chat);
    if (chat) {
      onUpdate({
        '@type': 'updateChat',
        id: chat.id,
        chat
      });
    }
  }
  if (!chat) {
    return undefined;
  }
  return {
    chatId: chat.id
  };
}
async function addChatMembers(chat, users) {
  try {
    if (chat.type === 'chatTypeChannel' || chat.type === 'chatTypeSuperGroup') {
      const invitedUsers = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.InviteToChannel({
        channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id, chat.accessHash),
        users: users.map(user => (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(user.id, user.accessHash))
      }));
      if (!invitedUsers) return undefined;
      (0,_client__WEBPACK_IMPORTED_MODULE_15__.handleGramJsUpdate)(invitedUsers.updates);
      return invitedUsers.missingInvitees.map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiMissingInvitedUser);
    }
    const addChatUsersResult = await Promise.all(users.map(async user => {
      const invitedUsers = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.AddChatUser({
        chatId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id),
        userId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(user.id, user.accessHash)
      }));
      if (!invitedUsers) return undefined;
      (0,_client__WEBPACK_IMPORTED_MODULE_15__.handleGramJsUpdate)(invitedUsers.updates);
      return invitedUsers.missingInvitees.map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiMissingInvitedUser);
    }));
    if (addChatUsersResult) {
      return addChatUsersResult.flat().filter(Boolean);
    }
  } catch (err) {
    onUpdate({
      '@type': 'error',
      error: {
        message: err.message
      }
    });
  }
  return undefined;
}
function deleteChatMember(chat, user) {
  if (chat.type === 'chatTypeChannel' || chat.type === 'chatTypeSuperGroup') {
    return updateChatMemberBannedRights({
      chat,
      user,
      bannedRights: {
        viewMessages: true,
        sendMessages: true,
        sendMedia: true,
        sendStickers: true,
        sendGifs: true,
        sendGames: true,
        sendInline: true,
        embedLinks: true,
        sendPolls: true,
        changeInfo: true,
        inviteUsers: true,
        pinMessages: true,
        manageTopics: true,
        sendPhotos: true,
        sendVideos: true,
        sendRoundvideos: true,
        sendAudios: true,
        sendVoices: true,
        sendDocs: true,
        sendPlain: true
      },
      untilDate: _config__WEBPACK_IMPORTED_MODULE_2__.MAX_INT_32
    });
  } else {
    return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DeleteChatUser({
      chatId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id),
      userId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(user.id, user.accessHash)
    }), {
      shouldReturnTrue: true
    });
  }
}
function toggleJoinToSend(chat, isEnabled) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ToggleJoinToSend({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id, chat.accessHash),
    enabled: isEnabled
  }), {
    shouldReturnTrue: true
  });
}
function toggleJoinRequest(chat, isEnabled) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ToggleJoinRequest({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id, chat.accessHash),
    enabled: isEnabled
  }), {
    shouldReturnTrue: true
  });
}
function preparePeers(result, currentStore) {
  const store = {};
  result.chats?.forEach(chat => {
    const key = `chat${chat.id}`;
    if (currentStore?.[key] && 'min' in chat && chat.min) {
      return;
    }
    store[key] = chat;
  });
  result.users?.forEach(user => {
    const key = `user${user.id}`;
    if (currentStore?.[key] && 'min' in user && user.min) {
      return;
    }
    store[key] = user;
  });
  return store;
}
function updateLocalDb(result) {
  if ('users' in result) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_11__.addEntitiesToLocalDb)(result.users);
  }
  if ('chats' in result) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_11__.addEntitiesToLocalDb)(result.chats);
  }
  if ('messages' in result) {
    result.messages.forEach(message => {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_11__.addMessageToLocalDb)(message);
    });
  }
}
async function importChatInvite(_ref32) {
  let {
    hash
  } = _ref32;
  const updates = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ImportChatInvite({
    hash
  }));
  if (!(updates instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Updates) || !updates.chats.length) {
    return undefined;
  }
  return (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(updates.chats[0]);
}
function setChatEnabledReactions(_ref33) {
  let {
    chat,
    enabledReactions
  } = _ref33;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SetChatAvailableReactions({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(chat.id, chat.accessHash),
    availableReactions: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputChatReactions)(enabledReactions)
  }), {
    shouldReturnTrue: true
  });
}
function toggleIsProtected(_ref34) {
  let {
    chat,
    isProtected
  } = _ref34;
  const {
    id,
    accessHash
  } = chat;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ToggleNoForwards({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
    enabled: isProtected
  }), {
    shouldReturnTrue: true
  });
}
function toggleParticipantsHidden(_ref35) {
  let {
    chat,
    isEnabled
  } = _ref35;
  const {
    id,
    accessHash
  } = chat;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ToggleParticipantsHidden({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
    enabled: isEnabled
  }), {
    shouldReturnTrue: true
  });
}
function toggleForum(_ref36) {
  let {
    chat,
    isEnabled
  } = _ref36;
  const {
    id,
    accessHash
  } = chat;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ToggleForum({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
    enabled: isEnabled
  }), {
    shouldReturnTrue: true,
    shouldThrow: true
  });
}
async function createTopic(_ref37) {
  let {
    chat,
    title,
    iconColor,
    iconEmojiId,
    sendAs
  } = _ref37;
  const {
    id,
    accessHash
  } = chat;
  const updates = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.CreateForumTopic({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
    title,
    iconColor,
    iconEmojiId: iconEmojiId ? big_integer__WEBPACK_IMPORTED_MODULE_0___default()(iconEmojiId) : undefined,
    sendAs: sendAs ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(sendAs.id, sendAs.accessHash) : undefined,
    randomId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.generateRandomBigInt)()
  }));
  if (!(updates instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Updates) || !updates.updates.length) {
    return undefined;
  }

  // Finding topic id in updates
  return updates.updates?.find(update => update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateMessageID)?.id;
}
async function fetchTopics(_ref38) {
  let {
    chat,
    query,
    offsetTopicId,
    offsetId,
    offsetDate,
    limit = _config__WEBPACK_IMPORTED_MODULE_2__.TOPICS_SLICE
  } = _ref38;
  const {
    id,
    accessHash
  } = chat;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.GetForumTopics({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
    limit,
    q: query,
    offsetTopic: offsetTopicId,
    offsetId,
    offsetDate
  }));
  if (!result) return undefined;
  updateLocalDb(result);
  const {
    count,
    orderByCreateDate
  } = result;
  const topics = result.topics.map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiTopic).filter(Boolean);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_6__.buildApiMessage).filter(Boolean);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_14__.dispatchThreadInfoUpdates)(result.messages);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(c)).filter(Boolean);
  const draftsById = result.topics.reduce((acc, topic) => {
    if (topic instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ForumTopic && topic.draft) {
      acc[topic.id] = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_6__.buildMessageDraft)(topic.draft);
    }
    return acc;
  }, {});
  const readInboxMessageIdByTopicId = result.topics.reduce((acc, topic) => {
    if (topic instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ForumTopic && topic.readInboxMaxId) {
      acc[topic.id] = topic.readInboxMaxId;
    }
    return acc;
  }, {});
  return {
    topics,
    messages,
    users,
    chats,
    // Include general topic
    count: count + 1,
    shouldOrderByCreateDate: orderByCreateDate,
    draftsById,
    readInboxMessageIdByTopicId
  };
}
async function fetchTopicById(_ref39) {
  let {
    chat,
    topicId
  } = _ref39;
  const {
    id,
    accessHash
  } = chat;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.GetForumTopicsByID({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
    topics: [topicId]
  }));
  if (!result?.topics.length || !(result.topics[0] instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.ForumTopic)) {
    return undefined;
  }
  updateLocalDb(result);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_6__.buildApiMessage).filter(Boolean);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_14__.dispatchThreadInfoUpdates)(result.messages);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(c)).filter(Boolean);
  return {
    topic: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiTopic)(result.topics[0]),
    messages,
    users,
    chats
  };
}
async function deleteTopic(_ref40) {
  let {
    chat,
    topicId
  } = _ref40;
  const {
    id,
    accessHash
  } = chat;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.DeleteTopicHistory({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
    topMsgId: topicId
  }));
  if (!result) return;
  (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_13__.processAffectedHistory)(chat, result);
  if (result.offset) {
    await deleteTopic({
      chat,
      topicId
    });
  }
}
function togglePinnedTopic(_ref41) {
  let {
    chat,
    topicId,
    isPinned
  } = _ref41;
  const {
    id,
    accessHash
  } = chat;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.UpdatePinnedForumTopic({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
    topicId,
    pinned: isPinned
  }), {
    shouldReturnTrue: true
  });
}
function editTopic(_ref42) {
  let {
    chat,
    topicId,
    title,
    iconEmojiId,
    isClosed,
    isHidden
  } = _ref42;
  const {
    id,
    accessHash
  } = chat;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.EditForumTopic({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(id, accessHash),
    topicId,
    title,
    iconEmojiId: topicId !== _config__WEBPACK_IMPORTED_MODULE_2__.GENERAL_TOPIC_ID && iconEmojiId ? big_integer__WEBPACK_IMPORTED_MODULE_0___default()(iconEmojiId) : undefined,
    closed: isClosed,
    hidden: isHidden
  }), {
    shouldReturnTrue: true
  });
}
async function checkChatlistInvite(_ref43) {
  let {
    slug
  } = _ref43;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.chatlists.CheckChatlistInvite({
    slug
  }));
  const invite = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatlistInvite)(result, slug);
  if (!result || !invite) return undefined;
  updateLocalDb(result);
  return {
    invite,
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUser).filter(Boolean),
    chats: result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(c)).filter(Boolean)
  };
}
function joinChatlistInvite(_ref44) {
  let {
    slug,
    peers
  } = _ref44;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.chatlists.JoinChatlistInvite({
    slug,
    peers: peers.map(peer => (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(peer.id, peer.accessHash))
  }), {
    shouldReturnTrue: true,
    shouldThrow: true
  });
}
async function fetchLeaveChatlistSuggestions(_ref45) {
  let {
    folderId
  } = _ref45;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.chatlists.GetLeaveChatlistSuggestions({
    chatlist: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChatlistDialogFilter({
      filterId: folderId
    })
  }));
  if (!result) return undefined;
  return result.map(_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_7__.getApiChatIdFromMtpPeer);
}
function leaveChatlist(_ref46) {
  let {
    folderId,
    peers
  } = _ref46;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.chatlists.LeaveChatlist({
    chatlist: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChatlistDialogFilter({
      filterId: folderId
    }),
    peers: peers.map(peer => (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(peer.id, peer.accessHash))
  }), {
    shouldReturnTrue: true
  });
}
async function createChalistInvite(_ref47) {
  let {
    folderId,
    title,
    peers
  } = _ref47;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.chatlists.ExportChatlistInvite({
    chatlist: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChatlistDialogFilter({
      filterId: folderId
    }),
    title: title || '',
    peers: peers.map(peer => (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(peer.id, peer.accessHash))
  }), {
    shouldThrow: true
  });
  if (!result || result.filter instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DialogFilterDefault) return undefined;
  return {
    filter: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFolder)(result.filter),
    invite: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatlistExportedInvite)(result.invite)
  };
}
function deleteChatlistInvite(_ref48) {
  let {
    folderId,
    slug
  } = _ref48;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.chatlists.DeleteExportedInvite({
    chatlist: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChatlistDialogFilter({
      filterId: folderId
    }),
    slug
  }));
}
async function editChatlistInvite(_ref49) {
  let {
    folderId,
    slug,
    title,
    peers
  } = _ref49;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.chatlists.EditExportedInvite({
    chatlist: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChatlistDialogFilter({
      filterId: folderId
    }),
    slug,
    title,
    peers: peers.map(peer => (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(peer.id, peer.accessHash))
  }), {
    shouldThrow: true
  });
  if (!result) return undefined;
  return (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatlistExportedInvite)(result);
}
async function fetchChatlistInvites(_ref50) {
  let {
    folderId
  } = _ref50;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.chatlists.GetExportedInvites({
    chatlist: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputChatlistDialogFilter({
      filterId: folderId
    })
  }));
  if (!result) return undefined;
  updateLocalDb(result);
  return {
    invites: result.invites.map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatlistExportedInvite).filter(Boolean),
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_9__.buildApiUser).filter(Boolean),
    chats: result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(c)).filter(Boolean)
  };
}
function togglePeerTranslations(_ref51) {
  let {
    chat,
    isEnabled
  } = _ref51;
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.TogglePeerTranslations({
    disabled: isEnabled ? undefined : true,
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputPeer)(chat.id, chat.accessHash)
  }));
}
function setViewForumAsMessages(_ref52) {
  let {
    chat,
    isEnabled
  } = _ref52;
  const {
    id,
    accessHash
  } = chat;
  const channel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(id, accessHash);
  return (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ToggleViewForumAsMessages({
    channel: channel,
    enabled: Boolean(isEnabled)
  }), {
    shouldReturnTrue: true
  });
}
async function fetchChannelRecommendations(_ref53) {
  let {
    chat
  } = _ref53;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.GetChannelRecommendations({
    channel: chat && (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(chat.id, chat.accessHash)
  }));
  if (!result) {
    return undefined;
  }
  updateLocalDb(result);
  const similarChannels = result?.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(c)).filter(Boolean);
  return {
    similarChannels,
    count: result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ChatsSlice ? result.count : similarChannels.length
  };
}
async function reportSponsoredMessage(_ref54) {
  let {
    chat,
    randomId,
    option
  } = _ref54;
  const {
    id,
    accessHash
  } = chat;
  const channel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_10__.buildInputEntity)(id, accessHash);
  try {
    const result = await (0,_client__WEBPACK_IMPORTED_MODULE_15__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ReportSponsoredMessage({
      channel: channel,
      randomId: (0,_helpers__WEBPACK_IMPORTED_MODULE_11__.deserializeBytes)(randomId),
      option: (0,_helpers__WEBPACK_IMPORTED_MODULE_11__.deserializeBytes)(option)
    }), {
      shouldThrow: true
    });
    if (!result) {
      return undefined;
    }
    return (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiSponsoredMessageReportResult)(result);
  } catch (err) {
    if (err instanceof Error && err.message === 'PREMIUM_ACCOUNT_REQUIRED') {
      return {
        type: 'premiumRequired'
      };
    }
    return undefined;
  }
}

/***/ }),

/***/ "./src/api/gramjs/methods/client.ts":
/*!******************************************!*\
  !*** ./src/api/gramjs/methods/client.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abortChatRequests: () => (/* binding */ abortChatRequests),
/* harmony export */   abortRequestGroup: () => (/* binding */ abortRequestGroup),
/* harmony export */   destroy: () => (/* binding */ destroy),
/* harmony export */   disconnect: () => (/* binding */ disconnect),
/* harmony export */   dispatchErrorUpdate: () => (/* binding */ dispatchErrorUpdate),
/* harmony export */   downloadMedia: () => (/* binding */ downloadMedia),
/* harmony export */   fetchCurrentUser: () => (/* binding */ fetchCurrentUser),
/* harmony export */   getClient: () => (/* binding */ getClient),
/* harmony export */   getTmpPassword: () => (/* binding */ getTmpPassword),
/* harmony export */   handleGramJsUpdate: () => (/* binding */ handleGramJsUpdate),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   invokeRequest: () => (/* binding */ invokeRequest),
/* harmony export */   invokeRequestBeacon: () => (/* binding */ invokeRequestBeacon),
/* harmony export */   repairFileReference: () => (/* binding */ repairFileReference),
/* harmony export */   requestChannelDifference: () => (/* binding */ requestChannelDifference),
/* harmony export */   setAllowHttpTransport: () => (/* binding */ setAllowHttpTransport),
/* harmony export */   setForceHttpTransport: () => (/* binding */ setForceHttpTransport),
/* harmony export */   setIsPremium: () => (/* binding */ setIsPremium),
/* harmony export */   setShouldDebugExportedSenders: () => (/* binding */ setShouldDebugExportedSenders),
/* harmony export */   updateTwoFaSettings: () => (/* binding */ updateTwoFaSettings),
/* harmony export */   uploadFile: () => (/* binding */ uploadFile)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs_client_TelegramClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs/client/TelegramClient */ "./src/lib/gramjs/client/TelegramClient.js");
/* harmony import */ var _lib_gramjs_client_TelegramClient__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_client_TelegramClient__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_gramjs_extensions_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/gramjs/extensions/index */ "./src/lib/gramjs/extensions/index.js");
/* harmony import */ var _lib_gramjs_extensions_index__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_extensions_index__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_schedulers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../util/schedulers */ "./src/util/schedulers.ts");
/* harmony import */ var _apiBuilders_messages__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/messages */ "./src/api/gramjs/apiBuilders/messages.ts");
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _apiBuilders_stories__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../apiBuilders/stories */ "./src/api/gramjs/apiBuilders/stories.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _updates_updateManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../updates/updateManager */ "./src/api/gramjs/updates/updateManager.ts");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./auth */ "./src/api/gramjs/methods/auth.ts");
/* harmony import */ var _media__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./media */ "./src/api/gramjs/methods/media.ts");
/* harmony import */ var _ChatAbortController__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../ChatAbortController */ "./src/api/gramjs/ChatAbortController.ts");
















const DEFAULT_USER_AGENT = 'Unknown UserAgent';
const DEFAULT_PLATFORM = 'Unknown platform';
_lib_gramjs_extensions_index__WEBPACK_IMPORTED_MODULE_2__.Logger.setLevel(_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG_GRAMJS ? 'debug' : 'warn');
const gramJsUpdateEventBuilder = {
  build: update => update
};
const CHAT_ABORT_CONTROLLERS = new Map();
const ABORT_CONTROLLERS = new Map();
let onUpdate;
let client;
let currentUserId;
async function init(_onUpdate, initialArgs) {
  if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
    // eslint-disable-next-line no-console
    console.log('>>> START INIT API');
  }
  onUpdate = _onUpdate;
  const {
    userAgent,
    platform,
    sessionData,
    isTest,
    isWebmSupported,
    maxBufferSize,
    webAuthToken,
    dcId,
    mockScenario,
    shouldForceHttpTransport,
    shouldAllowHttpTransport,
    shouldDebugExportedSenders,
    langCode
  } = initialArgs;
  const session = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.sessions.CallbackSession(sessionData, onSessionUpdate);

  // eslint-disable-next-line no-restricted-globals
  self.isWebmSupported = isWebmSupported;
  // eslint-disable-next-line no-restricted-globals
  self.maxBufferSize = maxBufferSize;
  client = new (_lib_gramjs_client_TelegramClient__WEBPACK_IMPORTED_MODULE_1___default())(session, "1025907", "452b0359b988148995f22ff0f4229750", {
    deviceModel: navigator.userAgent || userAgent || DEFAULT_USER_AGENT,
    systemVersion: platform || DEFAULT_PLATFORM,
    appVersion: `${"10.9.8"} ${_config__WEBPACK_IMPORTED_MODULE_3__.APP_CODE_NAME}`,
    useWSS: true,
    additionalDcsDisabled: _config__WEBPACK_IMPORTED_MODULE_3__.IS_TEST,
    shouldDebugExportedSenders,
    shouldForceHttpTransport,
    shouldAllowHttpTransport,
    testServers: isTest,
    dcId,
    langCode
  });
  client.addEventHandler(handleGramJsUpdate, gramJsUpdateEventBuilder);
  try {
    if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.log)('CONNECTING');

      // eslint-disable-next-line no-restricted-globals
      self.invoke = invokeRequest;
      // eslint-disable-next-line no-restricted-globals
      self.GramJs = _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api;
    }
    try {
      client.setPingCallback(_updates_updateManager__WEBPACK_IMPORTED_MODULE_12__.getDifference);
      await client.start({
        phoneNumber: _auth__WEBPACK_IMPORTED_MODULE_13__.onRequestPhoneNumber,
        phoneCode: _auth__WEBPACK_IMPORTED_MODULE_13__.onRequestCode,
        password: _auth__WEBPACK_IMPORTED_MODULE_13__.onRequestPassword,
        firstAndLastNames: _auth__WEBPACK_IMPORTED_MODULE_13__.onRequestRegistration,
        qrCode: _auth__WEBPACK_IMPORTED_MODULE_13__.onRequestQrCode,
        onError: _auth__WEBPACK_IMPORTED_MODULE_13__.onAuthError,
        initialMethod: platform === 'iOS' || platform === 'Android' ? 'phoneNumber' : 'qrCode',
        shouldThrowIfUnauthorized: Boolean(sessionData),
        webAuthToken,
        webAuthTokenFailed: _auth__WEBPACK_IMPORTED_MODULE_13__.onWebAuthTokenFailed,
        mockScenario
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      if (err.message !== 'Disconnect' && err.message !== 'Cannot send requests while disconnected') {
        onUpdate({
          '@type': 'updateConnectionState',
          connectionState: 'connectionStateBroken'
        });
        return;
      }
    }
    if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
      // eslint-disable-next-line no-console
      console.log('>>> FINISH INIT API');
      (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.log)('CONNECTED');
    }
    (0,_auth__WEBPACK_IMPORTED_MODULE_13__.onAuthReady)();
    onSessionUpdate(session.getSessionData());
    onUpdate({
      '@type': 'updateApiReady'
    });
    (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_12__.init)(invokeRequest);
    void fetchCurrentUser();
  } catch (err) {
    if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.log)('CONNECTING ERROR', err);
    }
    throw err;
  }
}
function setIsPremium(_ref) {
  let {
    isPremium
  } = _ref;
  client.setIsPremium(isPremium);
}
const LOG_OUT_TIMEOUT = 2500;
async function destroy() {
  let noLogOut = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  let noClearLocalDb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!noLogOut && client.isConnected()) {
    await Promise.race([invokeRequest(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.auth.LogOut()), (0,_util_schedulers__WEBPACK_IMPORTED_MODULE_4__.pause)(LOG_OUT_TIMEOUT)]);
  }
  if (!noClearLocalDb) {
    (0,_localDb__WEBPACK_IMPORTED_MODULE_11__.clearLocalDb)();
    (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_12__.reset)();
  }
  await client.destroy();
}
async function disconnect() {
  await client.disconnect();
}
function getClient() {
  return client;
}
function onSessionUpdate(sessionData) {
  onUpdate({
    '@type': 'updateSession',
    sessionData
  });
}
function handleGramJsUpdate(update) {
  (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_12__.processUpdate)(update);
  if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatesTooLong) {
    void handleTerminatedSession();
  } else {
    const updates = 'updates' in update ? update.updates : [update];
    updates.forEach(nestedUpdate => {
      if (!(nestedUpdate instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateConfig)) return;
      // eslint-disable-next-line no-underscore-dangle
      const currentUser = nestedUpdate._entities?.find(entity => entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User && (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_6__.buildApiPeerId)(entity.id, 'user') === currentUserId);
      if (!(currentUser instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User)) return;
      setIsPremium({
        isPremium: Boolean(currentUser.premium)
      });
    });
  }
}
async function invokeRequest(request) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    shouldThrow,
    shouldIgnoreUpdates,
    dcId,
    shouldIgnoreErrors,
    abortControllerChatId,
    abortControllerThreadId,
    shouldRetryOnTimeout,
    abortControllerGroup
  } = params;
  const shouldReturnTrue = Boolean(params.shouldReturnTrue);
  let abortSignal;
  if (abortControllerChatId) {
    let controller = CHAT_ABORT_CONTROLLERS.get(abortControllerChatId);
    if (!controller) {
      controller = new _ChatAbortController__WEBPACK_IMPORTED_MODULE_15__.ChatAbortController();
      CHAT_ABORT_CONTROLLERS.set(abortControllerChatId, controller);
    }
    abortSignal = abortControllerThreadId ? controller.getThreadSignal(abortControllerThreadId) : controller.signal;
  }
  if (abortControllerGroup) {
    let controller = ABORT_CONTROLLERS.get(abortControllerGroup);
    if (!controller) {
      controller = new AbortController();
      ABORT_CONTROLLERS.set(abortControllerGroup, controller);
    }
    abortSignal = controller.signal;
  }
  try {
    if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.log)('INVOKE', request.className);
    }
    const result = await client.invoke(request, dcId, abortSignal, shouldRetryOnTimeout);
    if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.log)('RESPONSE', request.className, result);
    }
    if (!shouldIgnoreUpdates && (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.isResponseUpdate)(result)) {
      (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_12__.processUpdate)(result);
    }
    return shouldReturnTrue ? result && true : result;
  } catch (err) {
    if (shouldIgnoreErrors) return undefined;
    if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.log)('INVOKE ERROR', request.className);
      // eslint-disable-next-line no-console
      console.debug('invokeRequest failed with payload', request);
      // eslint-disable-next-line no-console
      console.error(err);
    }
    if (shouldThrow) {
      throw err;
    }
    dispatchErrorUpdate(err, request);
    return undefined;
  }
}
function invokeRequestBeacon(request, dcId) {
  if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.log)('BEACON', request.className);
  }
  client.invokeBeacon(request, dcId);
}
async function downloadMedia(args, onProgress) {
  try {
    return await (0,_media__WEBPACK_IMPORTED_MODULE_14__["default"])(args, client, onProgress);
  } catch (err) {
    if (err.message.startsWith('FILE_REFERENCE')) {
      const isFileReferenceRepaired = await repairFileReference({
        url: args.url
      });
      if (isFileReferenceRepaired) {
        return (0,_media__WEBPACK_IMPORTED_MODULE_14__["default"])(args, client, onProgress);
      }
      if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
        // eslint-disable-next-line no-console
        console.error('Failed to repair file reference', args.url);
      }
    }
    throw err;
  }
}
function uploadFile(file, onProgress) {
  return client.uploadFile({
    file,
    onProgress,
    workers: _config__WEBPACK_IMPORTED_MODULE_3__.UPLOAD_WORKERS
  });
}
function updateTwoFaSettings(params) {
  return client.updateTwoFaSettings(params);
}
function getTmpPassword(currentPassword, ttl) {
  return client.getTmpPassword(currentPassword, ttl);
}
function abortChatRequests(params) {
  const {
    chatId,
    threadId
  } = params;
  const controller = CHAT_ABORT_CONTROLLERS.get(chatId);
  if (!threadId) {
    controller?.abort('Chat change');
    CHAT_ABORT_CONTROLLERS.delete(chatId);
    return;
  }
  controller?.abortThread(threadId, 'Thread change');
}
function abortRequestGroup(group) {
  ABORT_CONTROLLERS.get(group)?.abort();
  ABORT_CONTROLLERS.delete(group);
}
async function fetchCurrentUser() {
  const userFull = await invokeRequest(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.users.GetFullUser({
    id: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputUserSelf()
  }));
  if (!userFull || !(userFull.users[0] instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User)) {
    return;
  }
  const user = userFull.users[0];
  (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addUserToLocalDb)(user);
  const currentUserFullInfo = (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_8__.buildApiUserFullInfo)(userFull);
  const currentUser = (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_8__.buildApiUser)(user);
  (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_5__.setMessageBuilderCurrentUserId)(currentUser.id);
  (0,_auth__WEBPACK_IMPORTED_MODULE_13__.onCurrentUserUpdate)(currentUser, currentUserFullInfo);
  currentUserId = currentUser.id;
  setIsPremium({
    isPremium: Boolean(currentUser.isPremium)
  });
}
function dispatchErrorUpdate(err, request) {
  const isSlowMode = err.message.startsWith('A wait of') && (request instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.SendMessage || request instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.SendMedia || request instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.SendMultiMedia);
  const {
    message
  } = err;
  onUpdate({
    '@type': 'error',
    error: {
      message,
      isSlowMode,
      hasErrorKey: true
    }
  });
}
async function handleTerminatedSession() {
  try {
    await invokeRequest(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.users.GetFullUser({
      id: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputUserSelf()
    }), {
      shouldThrow: true
    });
  } catch (err) {
    if (err.message === 'AUTH_KEY_UNREGISTERED' || err.message === 'SESSION_REVOKED') {
      onUpdate({
        '@type': 'updateConnectionState',
        connectionState: 'connectionStateBroken'
      });
    }
  }
}
async function repairFileReference(_ref2) {
  let {
    url
  } = _ref2;
  const parsed = (0,_media__WEBPACK_IMPORTED_MODULE_14__.parseMediaUrl)(url);
  if (!parsed) return undefined;
  const {
    entityId,
    mediaMatchType
  } = parsed;
  if (mediaMatchType === 'document' || mediaMatchType === 'photo' || mediaMatchType === 'webDocument') {
    const entity = mediaMatchType === 'document' ? _localDb__WEBPACK_IMPORTED_MODULE_11__["default"].documents[entityId] : mediaMatchType === 'webDocument' ? _localDb__WEBPACK_IMPORTED_MODULE_11__["default"].webDocuments[entityId] : _localDb__WEBPACK_IMPORTED_MODULE_11__["default"].photos[entityId];
    if (!entity) return false;
    const repairableEntity = entity;
    if (!repairableEntity.localRepairInfo) return false;
    const {
      localRepairInfo
    } = repairableEntity;
    if (localRepairInfo.type === 'story') {
      const result = await repairStoryMedia(localRepairInfo.peerId, localRepairInfo.id);
      return result;
    }
    if (localRepairInfo.type === 'message') {
      const result = await repairMessageMedia(localRepairInfo.peerId, localRepairInfo.id);
      return result;
    }
  }
  return false;
}
async function repairMessageMedia(peerId, messageId) {
  const peer = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeerFromLocalDb)(peerId);
  if (!peer) return false;
  const result = await invokeRequest(peer ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.channels.GetMessages({
    channel: peer,
    id: [new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputMessageID({
      id: messageId
    })]
  }) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.GetMessages({
    id: [new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputMessageID({
      id: messageId
    })]
  }), {
    shouldIgnoreErrors: true
  });
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.MessagesNotModified) return false;
  if (peer && 'pts' in result) {
    (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_12__.updateChannelState)(peerId, result.pts);
  }
  const message = result.messages[0];
  if (message instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageEmpty) return false;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addEntitiesToLocalDb)(result.chats);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addMessageToLocalDb)(message);
  const apiMessage = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_5__.buildApiMessage)(message);
  if (apiMessage) {
    onUpdate({
      '@type': 'updateMessage',
      chatId: apiMessage.chatId,
      id: apiMessage.id,
      message: apiMessage
    });
  }
  return true;
}
async function repairStoryMedia(peerId, storyId) {
  const peer = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_9__.buildInputPeerFromLocalDb)(peerId);
  if (!peer) return false;
  const result = await invokeRequest(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.GetStoriesByID({
    peer,
    id: [storyId]
  }), {
    shouldIgnoreErrors: true
  });
  if (!result) return false;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addEntitiesToLocalDb)(result.users);
  result.stories.forEach(story => {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_10__.addStoryToLocalDb)(story, peerId);
    const apiStory = (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_7__.buildApiStory)(peerId, story);
    if (!apiStory || 'isDeleted' in apiStory) return;
    onUpdate({
      '@type': 'updateStory',
      peerId,
      story: apiStory
    });
  });
  return true;
}
function setForceHttpTransport(forceHttpTransport) {
  client.setForceHttpTransport(forceHttpTransport);
}
function setAllowHttpTransport(allowHttpTransport) {
  client.setAllowHttpTransport(allowHttpTransport);
}
function setShouldDebugExportedSenders(value) {
  client.setShouldDebugExportedSenders(value);
}
function requestChannelDifference(channelId) {
  (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_12__.scheduleGetChannelDifference)(channelId);
}

/***/ }),

/***/ "./src/api/gramjs/methods/fragment.ts":
/*!********************************************!*\
  !*** ./src/api/gramjs/methods/fragment.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchCollectionInfo: () => (/* binding */ fetchCollectionInfo)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apiBuilders_misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../apiBuilders/misc */ "./src/api/gramjs/apiBuilders/misc.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");



async function fetchCollectionInfo(collectible) {
  const inputCollectible = 'username' in collectible ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputCollectibleUsername({
    username: collectible.username
  }) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputCollectiblePhone({
    phone: collectible.phone
  });
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_2__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.fragment.GetCollectibleInfo({
    collectible: inputCollectible
  }));
  if (!result) {
    return undefined;
  }
  return (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_1__.buildApiCollectibleInfo)(result);
}

/***/ }),

/***/ "./src/api/gramjs/methods/index.ts":
/*!*****************************************!*\
  !*** ./src/api/gramjs/methods/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abortChatRequests: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.abortChatRequests),
/* harmony export */   abortRequestGroup: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.abortRequestGroup),
/* harmony export */   acceptBotUrlAuth: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.acceptBotUrlAuth),
/* harmony export */   acceptCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.acceptCall),
/* harmony export */   acceptLinkUrlAuth: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.acceptLinkUrlAuth),
/* harmony export */   acceptPhoneCall: () => (/* reexport safe */ _phoneCallState__WEBPACK_IMPORTED_MODULE_14__.acceptPhoneCall),
/* harmony export */   activateStealthMode: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.activateStealthMode),
/* harmony export */   addChatMembers: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.addChatMembers),
/* harmony export */   allowBotSendMessages: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.allowBotSendMessages),
/* harmony export */   answerCallbackButton: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.answerCallbackButton),
/* harmony export */   applyBoost: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.applyBoost),
/* harmony export */   applyGiftCode: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.applyGiftCode),
/* harmony export */   blockUser: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.blockUser),
/* harmony export */   broadcastLocalDbUpdateFull: () => (/* reexport safe */ _localDb__WEBPACK_IMPORTED_MODULE_15__.broadcastLocalDbUpdateFull),
/* harmony export */   changeSessionSettings: () => (/* reexport safe */ _account__WEBPACK_IMPORTED_MODULE_1__.changeSessionSettings),
/* harmony export */   changeSessionTtl: () => (/* reexport safe */ _account__WEBPACK_IMPORTED_MODULE_1__.changeSessionTtl),
/* harmony export */   checkChatUsername: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.checkChatUsername),
/* harmony export */   checkChatlistInvite: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.checkChatlistInvite),
/* harmony export */   checkGiftCode: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.checkGiftCode),
/* harmony export */   checkPassword: () => (/* reexport safe */ _twoFaSettings__WEBPACK_IMPORTED_MODULE_9__.checkPassword),
/* harmony export */   checkUsername: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.checkUsername),
/* harmony export */   clearPassword: () => (/* reexport safe */ _twoFaSettings__WEBPACK_IMPORTED_MODULE_9__.clearPassword),
/* harmony export */   clearRecentReactions: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.clearRecentReactions),
/* harmony export */   clearRecentStickers: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.clearRecentStickers),
/* harmony export */   clickSponsoredMessage: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.clickSponsoredMessage),
/* harmony export */   closePoll: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.closePoll),
/* harmony export */   confirmCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.confirmCall),
/* harmony export */   confirmPhoneCall: () => (/* reexport safe */ _phoneCallState__WEBPACK_IMPORTED_MODULE_14__.confirmPhoneCall),
/* harmony export */   createChalistInvite: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.createChalistInvite),
/* harmony export */   createChannel: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.createChannel),
/* harmony export */   createGroupCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.createGroupCall),
/* harmony export */   createGroupChat: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.createGroupChat),
/* harmony export */   createPhoneCallState: () => (/* reexport safe */ _phoneCallState__WEBPACK_IMPORTED_MODULE_14__.createPhoneCallState),
/* harmony export */   createTopic: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.createTopic),
/* harmony export */   deactivateAllUsernames: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.deactivateAllUsernames),
/* harmony export */   decodePhoneCallData: () => (/* reexport safe */ _phoneCallState__WEBPACK_IMPORTED_MODULE_14__.decodePhoneCallData),
/* harmony export */   deleteChannel: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.deleteChannel),
/* harmony export */   deleteChat: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.deleteChat),
/* harmony export */   deleteChatFolder: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.deleteChatFolder),
/* harmony export */   deleteChatMember: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.deleteChatMember),
/* harmony export */   deleteChatUser: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.deleteChatUser),
/* harmony export */   deleteChatlistInvite: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.deleteChatlistInvite),
/* harmony export */   deleteContact: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.deleteContact),
/* harmony export */   deleteExportedChatInvite: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.deleteExportedChatInvite),
/* harmony export */   deleteHistory: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.deleteHistory),
/* harmony export */   deleteMessages: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.deleteMessages),
/* harmony export */   deleteProfilePhotos: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.deleteProfilePhotos),
/* harmony export */   deleteRevokedExportedChatInvites: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.deleteRevokedExportedChatInvites),
/* harmony export */   deleteSavedHistory: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.deleteSavedHistory),
/* harmony export */   deleteScheduledMessages: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.deleteScheduledMessages),
/* harmony export */   deleteStory: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.deleteStory),
/* harmony export */   deleteTopic: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.deleteTopic),
/* harmony export */   destroy: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.destroy),
/* harmony export */   destroyPhoneCallState: () => (/* reexport safe */ _phoneCallState__WEBPACK_IMPORTED_MODULE_14__.destroyPhoneCallState),
/* harmony export */   discardCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.discardCall),
/* harmony export */   discardGroupCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.discardGroupCall),
/* harmony export */   disconnect: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.disconnect),
/* harmony export */   downloadMedia: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.downloadMedia),
/* harmony export */   editChatFolder: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.editChatFolder),
/* harmony export */   editChatPhoto: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.editChatPhoto),
/* harmony export */   editChatlistInvite: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.editChatlistInvite),
/* harmony export */   editExportedChatInvite: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.editExportedChatInvite),
/* harmony export */   editGroupCallParticipant: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.editGroupCallParticipant),
/* harmony export */   editGroupCallTitle: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.editGroupCallTitle),
/* harmony export */   editMessage: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.editMessage),
/* harmony export */   editStoryPrivacy: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.editStoryPrivacy),
/* harmony export */   editTopic: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.editTopic),
/* harmony export */   encodePhoneCallData: () => (/* reexport safe */ _phoneCallState__WEBPACK_IMPORTED_MODULE_14__.encodePhoneCallData),
/* harmony export */   exportChatInvite: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.exportChatInvite),
/* harmony export */   exportGroupCallInvite: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.exportGroupCallInvite),
/* harmony export */   exportMessageLink: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.exportMessageLink),
/* harmony export */   faveSticker: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.faveSticker),
/* harmony export */   fetchAllStories: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.fetchAllStories),
/* harmony export */   fetchAnimatedEmojiEffects: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchAnimatedEmojiEffects),
/* harmony export */   fetchAnimatedEmojis: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchAnimatedEmojis),
/* harmony export */   fetchAppConfig: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchAppConfig),
/* harmony export */   fetchAuthorizations: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchAuthorizations),
/* harmony export */   fetchAvailableEffects: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.fetchAvailableEffects),
/* harmony export */   fetchAvailableReactions: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.fetchAvailableReactions),
/* harmony export */   fetchBlockedUsers: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchBlockedUsers),
/* harmony export */   fetchBoostList: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.fetchBoostList),
/* harmony export */   fetchBoostStatus: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.fetchBoostStatus),
/* harmony export */   fetchBotApp: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.fetchBotApp),
/* harmony export */   fetchBotCanSendMessage: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.fetchBotCanSendMessage),
/* harmony export */   fetchChannelRecommendations: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchChannelRecommendations),
/* harmony export */   fetchChannelStatistics: () => (/* reexport safe */ _statistics__WEBPACK_IMPORTED_MODULE_13__.fetchChannelStatistics),
/* harmony export */   fetchChat: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchChat),
/* harmony export */   fetchChatFolders: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchChatFolders),
/* harmony export */   fetchChatInviteImporters: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.fetchChatInviteImporters),
/* harmony export */   fetchChatSettings: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchChatSettings),
/* harmony export */   fetchChatlistInvites: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchChatlistInvites),
/* harmony export */   fetchChats: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchChats),
/* harmony export */   fetchCollectionInfo: () => (/* reexport safe */ _fragment__WEBPACK_IMPORTED_MODULE_18__.fetchCollectionInfo),
/* harmony export */   fetchCommonChats: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.fetchCommonChats),
/* harmony export */   fetchConfig: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchConfig),
/* harmony export */   fetchContactList: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.fetchContactList),
/* harmony export */   fetchContentSettings: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchContentSettings),
/* harmony export */   fetchCountryList: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchCountryList),
/* harmony export */   fetchCurrentUser: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.fetchCurrentUser),
/* harmony export */   fetchCustomEmoji: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchCustomEmoji),
/* harmony export */   fetchCustomEmojiSets: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchCustomEmojiSets),
/* harmony export */   fetchDefaultStatusEmojis: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchDefaultStatusEmojis),
/* harmony export */   fetchDefaultTagReactions: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.fetchDefaultTagReactions),
/* harmony export */   fetchDefaultTopicIcons: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchDefaultTopicIcons),
/* harmony export */   fetchDiscussionMessage: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchDiscussionMessage),
/* harmony export */   fetchEmojiKeywords: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchEmojiKeywords),
/* harmony export */   fetchExportedChatInvites: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.fetchExportedChatInvites),
/* harmony export */   fetchExtendedMedia: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchExtendedMedia),
/* harmony export */   fetchFactChecks: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchFactChecks),
/* harmony export */   fetchFavoriteStickers: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchFavoriteStickers),
/* harmony export */   fetchFeaturedEmojiStickers: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchFeaturedEmojiStickers),
/* harmony export */   fetchFeaturedStickers: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchFeaturedStickers),
/* harmony export */   fetchFullChat: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchFullChat),
/* harmony export */   fetchFullUser: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.fetchFullUser),
/* harmony export */   fetchGenericEmojiEffects: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchGenericEmojiEffects),
/* harmony export */   fetchGiveawayInfo: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.fetchGiveawayInfo),
/* harmony export */   fetchGlobalPrivacySettings: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchGlobalPrivacySettings),
/* harmony export */   fetchGroupCallParticipants: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.fetchGroupCallParticipants),
/* harmony export */   fetchGroupStatistics: () => (/* reexport safe */ _statistics__WEBPACK_IMPORTED_MODULE_13__.fetchGroupStatistics),
/* harmony export */   fetchGroupsForDiscussion: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchGroupsForDiscussion),
/* harmony export */   fetchInlineBot: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.fetchInlineBot),
/* harmony export */   fetchInlineBotResults: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.fetchInlineBotResults),
/* harmony export */   fetchLangDifference: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchLangDifference),
/* harmony export */   fetchLangPack: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchLangPack),
/* harmony export */   fetchLanguage: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchLanguage),
/* harmony export */   fetchLanguages: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchLanguages),
/* harmony export */   fetchLeaveChatlistSuggestions: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchLeaveChatlistSuggestions),
/* harmony export */   fetchMembers: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchMembers),
/* harmony export */   fetchMessage: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchMessage),
/* harmony export */   fetchMessagePublicForwards: () => (/* reexport safe */ _statistics__WEBPACK_IMPORTED_MODULE_13__.fetchMessagePublicForwards),
/* harmony export */   fetchMessageReactions: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.fetchMessageReactions),
/* harmony export */   fetchMessageReactionsList: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.fetchMessageReactionsList),
/* harmony export */   fetchMessageStatistics: () => (/* reexport safe */ _statistics__WEBPACK_IMPORTED_MODULE_13__.fetchMessageStatistics),
/* harmony export */   fetchMessageViews: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchMessageViews),
/* harmony export */   fetchMessages: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchMessages),
/* harmony export */   fetchMyBoosts: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.fetchMyBoosts),
/* harmony export */   fetchNearestCountry: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.fetchNearestCountry),
/* harmony export */   fetchNotificationExceptions: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchNotificationExceptions),
/* harmony export */   fetchNotificationSettings: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchNotificationSettings),
/* harmony export */   fetchOutboxReadDate: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchOutboxReadDate),
/* harmony export */   fetchPeerColors: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchPeerColors),
/* harmony export */   fetchPeerProfileStories: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.fetchPeerProfileStories),
/* harmony export */   fetchPeerStories: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.fetchPeerStories),
/* harmony export */   fetchPeerStoriesByIds: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.fetchPeerStoriesByIds),
/* harmony export */   fetchPinnedMessages: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchPinnedMessages),
/* harmony export */   fetchPremiumGifts: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchPremiumGifts),
/* harmony export */   fetchPremiumPromo: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.fetchPremiumPromo),
/* harmony export */   fetchPrivacySettings: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchPrivacySettings),
/* harmony export */   fetchProfilePhotos: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.fetchProfilePhotos),
/* harmony export */   fetchQuickReplies: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchQuickReplies),
/* harmony export */   fetchRecentEmojiStatuses: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchRecentEmojiStatuses),
/* harmony export */   fetchRecentReactions: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.fetchRecentReactions),
/* harmony export */   fetchRecentStickers: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchRecentStickers),
/* harmony export */   fetchRecommendedChatFolders: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchRecommendedChatFolders),
/* harmony export */   fetchSavedChats: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchSavedChats),
/* harmony export */   fetchSavedGifs: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchSavedGifs),
/* harmony export */   fetchSavedReactionTags: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.fetchSavedReactionTags),
/* harmony export */   fetchScheduledHistory: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchScheduledHistory),
/* harmony export */   fetchSeenBy: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchSeenBy),
/* harmony export */   fetchSendAs: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchSendAs),
/* harmony export */   fetchSponsoredMessages: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchSponsoredMessages),
/* harmony export */   fetchStarsStatus: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.fetchStarsStatus),
/* harmony export */   fetchStarsTopupOptions: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.fetchStarsTopupOptions),
/* harmony export */   fetchStarsTransactions: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.fetchStarsTransactions),
/* harmony export */   fetchStatisticsAsyncGraph: () => (/* reexport safe */ _statistics__WEBPACK_IMPORTED_MODULE_13__.fetchStatisticsAsyncGraph),
/* harmony export */   fetchStickerSets: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchStickerSets),
/* harmony export */   fetchStickers: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchStickers),
/* harmony export */   fetchStickersForEmoji: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.fetchStickersForEmoji),
/* harmony export */   fetchStoriesArchive: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.fetchStoriesArchive),
/* harmony export */   fetchStoriesMaxIds: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.fetchStoriesMaxIds),
/* harmony export */   fetchStoriesViews: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.fetchStoriesViews),
/* harmony export */   fetchStoryLink: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.fetchStoryLink),
/* harmony export */   fetchStoryPublicForwards: () => (/* reexport safe */ _statistics__WEBPACK_IMPORTED_MODULE_13__.fetchStoryPublicForwards),
/* harmony export */   fetchStoryStatistics: () => (/* reexport safe */ _statistics__WEBPACK_IMPORTED_MODULE_13__.fetchStoryStatistics),
/* harmony export */   fetchStoryViewList: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.fetchStoryViewList),
/* harmony export */   fetchTemporaryPaymentPassword: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.fetchTemporaryPaymentPassword),
/* harmony export */   fetchTimezones: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchTimezones),
/* harmony export */   fetchTopInlineBots: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.fetchTopInlineBots),
/* harmony export */   fetchTopReactions: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.fetchTopReactions),
/* harmony export */   fetchTopUsers: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.fetchTopUsers),
/* harmony export */   fetchTopicById: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchTopicById),
/* harmony export */   fetchTopics: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.fetchTopics),
/* harmony export */   fetchUnreadMentions: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchUnreadMentions),
/* harmony export */   fetchUnreadReactions: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchUnreadReactions),
/* harmony export */   fetchUsers: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.fetchUsers),
/* harmony export */   fetchWallpapers: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchWallpapers),
/* harmony export */   fetchWebAuthorizations: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.fetchWebAuthorizations),
/* harmony export */   fetchWebPagePreview: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.fetchWebPagePreview),
/* harmony export */   findFirstMessageIdAfterDate: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.findFirstMessageIdAfterDate),
/* harmony export */   forwardMessages: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.forwardMessages),
/* harmony export */   getChatByPhoneNumber: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.getChatByPhoneNumber),
/* harmony export */   getChatByUsername: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.getChatByUsername),
/* harmony export */   getDhConfig: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.getDhConfig),
/* harmony export */   getGroupCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.getGroupCall),
/* harmony export */   getPasswordInfo: () => (/* reexport safe */ _twoFaSettings__WEBPACK_IMPORTED_MODULE_9__.getPasswordInfo),
/* harmony export */   getPaymentForm: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.getPaymentForm),
/* harmony export */   getPremiumGiftCodeOptions: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.getPremiumGiftCodeOptions),
/* harmony export */   getReceipt: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.getReceipt),
/* harmony export */   hideAllChatJoinRequests: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.hideAllChatJoinRequests),
/* harmony export */   hideChatJoinRequest: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.hideChatJoinRequest),
/* harmony export */   hideChatReportPanel: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.hideChatReportPanel),
/* harmony export */   importChatInvite: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.importChatInvite),
/* harmony export */   importContact: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.importContact),
/* harmony export */   installStickerSet: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.installStickerSet),
/* harmony export */   invokeWebViewCustomMethod: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.invokeWebViewCustomMethod),
/* harmony export */   joinChannel: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.joinChannel),
/* harmony export */   joinChatlistInvite: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.joinChatlistInvite),
/* harmony export */   joinGroupCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.joinGroupCall),
/* harmony export */   joinGroupCallPresentation: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.joinGroupCallPresentation),
/* harmony export */   launchPrepaidGiveaway: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.launchPrepaidGiveaway),
/* harmony export */   leaveChannel: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.leaveChannel),
/* harmony export */   leaveChatlist: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.leaveChatlist),
/* harmony export */   leaveGroupCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.leaveGroupCall),
/* harmony export */   leaveGroupCallPresentation: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.leaveGroupCallPresentation),
/* harmony export */   loadAttachBot: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.loadAttachBot),
/* harmony export */   loadAttachBots: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.loadAttachBots),
/* harmony export */   loadPollOptionResults: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.loadPollOptionResults),
/* harmony export */   markMessageListRead: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.markMessageListRead),
/* harmony export */   markMessagesRead: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.markMessagesRead),
/* harmony export */   markStoryRead: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.markStoryRead),
/* harmony export */   migrateChat: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.migrateChat),
/* harmony export */   oldFetchLangPack: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.oldFetchLangPack),
/* harmony export */   oldFetchLangStrings: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.oldFetchLangStrings),
/* harmony export */   openChatByInvite: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.openChatByInvite),
/* harmony export */   pinMessage: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.pinMessage),
/* harmony export */   prolongWebView: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.prolongWebView),
/* harmony export */   provideAuthCode: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_2__.provideAuthCode),
/* harmony export */   provideAuthPassword: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_2__.provideAuthPassword),
/* harmony export */   provideAuthPhoneNumber: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_2__.provideAuthPhoneNumber),
/* harmony export */   provideAuthRegistration: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_2__.provideAuthRegistration),
/* harmony export */   provideRecoveryEmailCode: () => (/* reexport safe */ _twoFaSettings__WEBPACK_IMPORTED_MODULE_9__.provideRecoveryEmailCode),
/* harmony export */   readAllMentions: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.readAllMentions),
/* harmony export */   readAllReactions: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.readAllReactions),
/* harmony export */   receivedCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.receivedCall),
/* harmony export */   registerDevice: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.registerDevice),
/* harmony export */   removeRecentSticker: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.removeRecentSticker),
/* harmony export */   reorderUsernames: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.reorderUsernames),
/* harmony export */   repairFileReference: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.repairFileReference),
/* harmony export */   reportMessages: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.reportMessages),
/* harmony export */   reportPeer: () => (/* reexport safe */ _account__WEBPACK_IMPORTED_MODULE_1__.reportPeer),
/* harmony export */   reportProfilePhoto: () => (/* reexport safe */ _account__WEBPACK_IMPORTED_MODULE_1__.reportProfilePhoto),
/* harmony export */   reportSpam: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.reportSpam),
/* harmony export */   reportSponsoredMessage: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.reportSponsoredMessage),
/* harmony export */   reportStory: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.reportStory),
/* harmony export */   requestAppWebView: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.requestAppWebView),
/* harmony export */   requestBotUrlAuth: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.requestBotUrlAuth),
/* harmony export */   requestCall: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.requestCall),
/* harmony export */   requestChannelDifference: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.requestChannelDifference),
/* harmony export */   requestChatUpdate: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.requestChatUpdate),
/* harmony export */   requestLinkUrlAuth: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.requestLinkUrlAuth),
/* harmony export */   requestPhoneCall: () => (/* reexport safe */ _phoneCallState__WEBPACK_IMPORTED_MODULE_14__.requestPhoneCall),
/* harmony export */   requestSimpleWebView: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.requestSimpleWebView),
/* harmony export */   requestWebView: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.requestWebView),
/* harmony export */   rescheduleMessage: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.rescheduleMessage),
/* harmony export */   resolveBusinessChatLink: () => (/* reexport safe */ _account__WEBPACK_IMPORTED_MODULE_1__.resolveBusinessChatLink),
/* harmony export */   restartAuth: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_2__.restartAuth),
/* harmony export */   restartAuthWithQr: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_2__.restartAuthWithQr),
/* harmony export */   saveCloseFriends: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.saveCloseFriends),
/* harmony export */   saveDefaultSendAs: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.saveDefaultSendAs),
/* harmony export */   saveDraft: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.saveDraft),
/* harmony export */   saveGif: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.saveGif),
/* harmony export */   searchChats: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.searchChats),
/* harmony export */   searchGifs: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.searchGifs),
/* harmony export */   searchMessagesGlobal: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.searchMessagesGlobal),
/* harmony export */   searchMessagesLocal: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.searchMessagesLocal),
/* harmony export */   searchStickers: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.searchStickers),
/* harmony export */   sendEmojiInteraction: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.sendEmojiInteraction),
/* harmony export */   sendInlineBotResult: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.sendInlineBotResult),
/* harmony export */   sendMessage: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.sendMessage),
/* harmony export */   sendMessageAction: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.sendMessageAction),
/* harmony export */   sendPaymentForm: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.sendPaymentForm),
/* harmony export */   sendPollVote: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.sendPollVote),
/* harmony export */   sendQuickReply: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.sendQuickReply),
/* harmony export */   sendReaction: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.sendReaction),
/* harmony export */   sendScheduledMessages: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.sendScheduledMessages),
/* harmony export */   sendSignalingData: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.sendSignalingData),
/* harmony export */   sendStarPaymentForm: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.sendStarPaymentForm),
/* harmony export */   sendStoryReaction: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.sendStoryReaction),
/* harmony export */   sendWatchingEmojiInteraction: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.sendWatchingEmojiInteraction),
/* harmony export */   sendWebViewData: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.sendWebViewData),
/* harmony export */   setAllowHttpTransport: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.setAllowHttpTransport),
/* harmony export */   setBotInfo: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.setBotInfo),
/* harmony export */   setCallRating: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.setCallRating),
/* harmony export */   setChatEnabledReactions: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.setChatEnabledReactions),
/* harmony export */   setChatUsername: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.setChatUsername),
/* harmony export */   setDefaultReaction: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.setDefaultReaction),
/* harmony export */   setDiscussionGroup: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.setDiscussionGroup),
/* harmony export */   setForceHttpTransport: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.setForceHttpTransport),
/* harmony export */   setPrivacySettings: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.setPrivacySettings),
/* harmony export */   setShouldDebugExportedSenders: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.setShouldDebugExportedSenders),
/* harmony export */   setViewForumAsMessages: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.setViewForumAsMessages),
/* harmony export */   sortChatFolders: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.sortChatFolders),
/* harmony export */   startBot: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.startBot),
/* harmony export */   terminateAllAuthorizations: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.terminateAllAuthorizations),
/* harmony export */   terminateAllWebAuthorizations: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.terminateAllWebAuthorizations),
/* harmony export */   terminateAuthorization: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.terminateAuthorization),
/* harmony export */   terminateWebAuthorization: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.terminateWebAuthorization),
/* harmony export */   toggleAttachBot: () => (/* reexport safe */ _bots__WEBPACK_IMPORTED_MODULE_10__.toggleAttachBot),
/* harmony export */   toggleChatArchived: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleChatArchived),
/* harmony export */   toggleChatPinned: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleChatPinned),
/* harmony export */   toggleDialogUnread: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleDialogUnread),
/* harmony export */   toggleForum: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleForum),
/* harmony export */   toggleGroupCallStartSubscription: () => (/* reexport safe */ _calls__WEBPACK_IMPORTED_MODULE_11__.toggleGroupCallStartSubscription),
/* harmony export */   toggleIsProtected: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleIsProtected),
/* harmony export */   toggleJoinRequest: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleJoinRequest),
/* harmony export */   toggleJoinToSend: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleJoinToSend),
/* harmony export */   toggleParticipantsHidden: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleParticipantsHidden),
/* harmony export */   togglePeerTranslations: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.togglePeerTranslations),
/* harmony export */   togglePinnedTopic: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.togglePinnedTopic),
/* harmony export */   togglePreHistoryHidden: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.togglePreHistoryHidden),
/* harmony export */   toggleSavedDialogPinned: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleSavedDialogPinned),
/* harmony export */   toggleSignatures: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.toggleSignatures),
/* harmony export */   toggleSponsoredMessages: () => (/* reexport safe */ _account__WEBPACK_IMPORTED_MODULE_1__.toggleSponsoredMessages),
/* harmony export */   toggleStoriesHidden: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.toggleStoriesHidden),
/* harmony export */   toggleStoryInProfile: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.toggleStoryInProfile),
/* harmony export */   toggleStoryPinnedToTop: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.toggleStoryPinnedToTop),
/* harmony export */   toggleUsername: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.toggleUsername),
/* harmony export */   transcribeAudio: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.transcribeAudio),
/* harmony export */   translateText: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.translateText),
/* harmony export */   unblockUser: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.unblockUser),
/* harmony export */   uninstallStickerSet: () => (/* reexport safe */ _symbols__WEBPACK_IMPORTED_MODULE_6__.uninstallStickerSet),
/* harmony export */   unpinAllMessages: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.unpinAllMessages),
/* harmony export */   unregisterDevice: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.unregisterDevice),
/* harmony export */   updateChatAbout: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.updateChatAbout),
/* harmony export */   updateChatAdmin: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.updateChatAdmin),
/* harmony export */   updateChatDefaultBannedRights: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.updateChatDefaultBannedRights),
/* harmony export */   updateChatMemberBannedRights: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.updateChatMemberBannedRights),
/* harmony export */   updateChatMutedState: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.updateChatMutedState),
/* harmony export */   updateChatTitle: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.updateChatTitle),
/* harmony export */   updateContact: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.updateContact),
/* harmony export */   updateContactSignUpNotification: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.updateContactSignUpNotification),
/* harmony export */   updateContentSettings: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.updateContentSettings),
/* harmony export */   updateEmojiStatus: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_5__.updateEmojiStatus),
/* harmony export */   updateGlobalPrivacySettings: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.updateGlobalPrivacySettings),
/* harmony export */   updateIsOnline: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.updateIsOnline),
/* harmony export */   updateNotificationSettings: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.updateNotificationSettings),
/* harmony export */   updatePassword: () => (/* reexport safe */ _twoFaSettings__WEBPACK_IMPORTED_MODULE_9__.updatePassword),
/* harmony export */   updatePrivateLink: () => (/* reexport safe */ _management__WEBPACK_IMPORTED_MODULE_7__.updatePrivateLink),
/* harmony export */   updateProfile: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.updateProfile),
/* harmony export */   updateProfilePhoto: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.updateProfilePhoto),
/* harmony export */   updateRecoveryEmail: () => (/* reexport safe */ _twoFaSettings__WEBPACK_IMPORTED_MODULE_9__.updateRecoveryEmail),
/* harmony export */   updateSavedReactionTag: () => (/* reexport safe */ _reactions__WEBPACK_IMPORTED_MODULE_12__.updateSavedReactionTag),
/* harmony export */   updateTopicMutedState: () => (/* reexport safe */ _chats__WEBPACK_IMPORTED_MODULE_3__.updateTopicMutedState),
/* harmony export */   updateUsername: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.updateUsername),
/* harmony export */   uploadContactProfilePhoto: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.uploadContactProfilePhoto),
/* harmony export */   uploadProfilePhoto: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.uploadProfilePhoto),
/* harmony export */   uploadWallpaper: () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_8__.uploadWallpaper),
/* harmony export */   validateRequestedInfo: () => (/* reexport safe */ _payments__WEBPACK_IMPORTED_MODULE_17__.validateRequestedInfo),
/* harmony export */   viewSponsoredMessage: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_4__.viewSponsoredMessage),
/* harmony export */   viewStory: () => (/* reexport safe */ _stories__WEBPACK_IMPORTED_MODULE_16__.viewStory)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account */ "./src/api/gramjs/methods/account.ts");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth */ "./src/api/gramjs/methods/auth.ts");
/* harmony import */ var _chats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chats */ "./src/api/gramjs/methods/chats.ts");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./messages */ "./src/api/gramjs/methods/messages.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users */ "./src/api/gramjs/methods/users.ts");
/* harmony import */ var _symbols__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./symbols */ "./src/api/gramjs/methods/symbols.ts");
/* harmony import */ var _management__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./management */ "./src/api/gramjs/methods/management.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./settings */ "./src/api/gramjs/methods/settings.ts");
/* harmony import */ var _twoFaSettings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./twoFaSettings */ "./src/api/gramjs/methods/twoFaSettings.ts");
/* harmony import */ var _bots__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bots */ "./src/api/gramjs/methods/bots.ts");
/* harmony import */ var _calls__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./calls */ "./src/api/gramjs/methods/calls.ts");
/* harmony import */ var _reactions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./reactions */ "./src/api/gramjs/methods/reactions.ts");
/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./statistics */ "./src/api/gramjs/methods/statistics.ts");
/* harmony import */ var _phoneCallState__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./phoneCallState */ "./src/api/gramjs/methods/phoneCallState.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _stories__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./stories */ "./src/api/gramjs/methods/stories.ts");
/* harmony import */ var _payments__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./payments */ "./src/api/gramjs/methods/payments.ts");
/* harmony import */ var _fragment__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./fragment */ "./src/api/gramjs/methods/fragment.ts");




















/***/ }),

/***/ "./src/api/gramjs/methods/init.ts":
/*!****************************************!*\
  !*** ./src/api/gramjs/methods/init.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callApi: () => (/* binding */ callApi),
/* harmony export */   cancelApiProgress: () => (/* binding */ cancelApiProgress),
/* harmony export */   initApi: () => (/* binding */ initApi)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_schedulers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/schedulers */ "./src/util/schedulers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _updates_updater__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../updates/updater */ "./src/api/gramjs/updates/updater.ts");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth */ "./src/api/gramjs/methods/auth.ts");
/* harmony import */ var _bots__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bots */ "./src/api/gramjs/methods/bots.ts");
/* harmony import */ var _calls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./calls */ "./src/api/gramjs/methods/calls.ts");
/* harmony import */ var _chats__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chats */ "./src/api/gramjs/methods/chats.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index */ "./src/api/gramjs/methods/index.ts");
/* harmony import */ var _management__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./management */ "./src/api/gramjs/methods/management.ts");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./messages */ "./src/api/gramjs/methods/messages.ts");
/* harmony import */ var _payments__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./payments */ "./src/api/gramjs/methods/payments.ts");
/* harmony import */ var _symbols__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./symbols */ "./src/api/gramjs/methods/symbols.ts");
/* harmony import */ var _twoFaSettings__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./twoFaSettings */ "./src/api/gramjs/methods/twoFaSettings.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./users */ "./src/api/gramjs/methods/users.ts");
















let onUpdate;
function initApi(_onUpdate, initialArgs, initialLocalDb) {
  onUpdate = _onUpdate;
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_3__.init)(handleUpdate);
  (0,_auth__WEBPACK_IMPORTED_MODULE_4__.init)(handleUpdate);
  (0,_chats__WEBPACK_IMPORTED_MODULE_7__.init)(handleUpdate);
  (0,_messages__WEBPACK_IMPORTED_MODULE_11__.init)(handleUpdate);
  (0,_users__WEBPACK_IMPORTED_MODULE_15__.init)(handleUpdate);
  (0,_symbols__WEBPACK_IMPORTED_MODULE_13__.init)(handleUpdate);
  (0,_management__WEBPACK_IMPORTED_MODULE_10__.init)(handleUpdate);
  (0,_twoFaSettings__WEBPACK_IMPORTED_MODULE_14__.init)(handleUpdate);
  (0,_bots__WEBPACK_IMPORTED_MODULE_5__.init)(handleUpdate);
  (0,_calls__WEBPACK_IMPORTED_MODULE_6__.init)(handleUpdate);
  (0,_payments__WEBPACK_IMPORTED_MODULE_12__.init)(handleUpdate);
  if (initialLocalDb) (0,_localDb__WEBPACK_IMPORTED_MODULE_2__.updateFullLocalDb)(initialLocalDb);
  (0,_client__WEBPACK_IMPORTED_MODULE_8__.init)(handleUpdate, initialArgs);
}
function callApi(fnName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  // @ts-ignore
  return _index__WEBPACK_IMPORTED_MODULE_9__[fnName](...args);
}
function cancelApiProgress(progressCallback) {
  progressCallback.isCanceled = true;
}
const flushUpdatesOnTickEnd = (0,_util_schedulers__WEBPACK_IMPORTED_MODULE_1__.throttleWithTickEnd)(flushUpdates);
let flushUpdatesThrottled;
let currentThrottleId;
let pendingUpdates;
function handleUpdate(update) {
  if (!pendingUpdates) {
    pendingUpdates = [update];
  } else {
    pendingUpdates.push(update);
  }
  if (!flushUpdatesThrottled || _config__WEBPACK_IMPORTED_MODULE_0__.API_THROTTLE_RESET_UPDATES.has(update['@type'])) {
    flushUpdatesThrottled = (0,_util_schedulers__WEBPACK_IMPORTED_MODULE_1__.throttle)(flushUpdatesOnTickEnd, _config__WEBPACK_IMPORTED_MODULE_0__.API_UPDATE_THROTTLE, true);
    currentThrottleId = Math.random();
  }
  flushUpdatesThrottled(currentThrottleId);
}
function flushUpdates(throttleId) {
  if (!pendingUpdates || throttleId !== currentThrottleId) {
    return;
  }
  const currentUpdates = pendingUpdates;
  pendingUpdates = undefined;
  currentUpdates.forEach(onUpdate);
}

/***/ }),

/***/ "./src/api/gramjs/methods/management.ts":
/*!**********************************************!*\
  !*** ./src/api/gramjs/methods/management.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACCEPTABLE_USERNAME_ERRORS: () => (/* binding */ ACCEPTABLE_USERNAME_ERRORS),
/* harmony export */   checkChatUsername: () => (/* binding */ checkChatUsername),
/* harmony export */   deactivateAllUsernames: () => (/* binding */ deactivateAllUsernames),
/* harmony export */   deleteExportedChatInvite: () => (/* binding */ deleteExportedChatInvite),
/* harmony export */   deleteRevokedExportedChatInvites: () => (/* binding */ deleteRevokedExportedChatInvites),
/* harmony export */   editExportedChatInvite: () => (/* binding */ editExportedChatInvite),
/* harmony export */   exportChatInvite: () => (/* binding */ exportChatInvite),
/* harmony export */   fetchChatInviteImporters: () => (/* binding */ fetchChatInviteImporters),
/* harmony export */   fetchExportedChatInvites: () => (/* binding */ fetchExportedChatInvites),
/* harmony export */   hideAllChatJoinRequests: () => (/* binding */ hideAllChatJoinRequests),
/* harmony export */   hideChatJoinRequest: () => (/* binding */ hideChatJoinRequest),
/* harmony export */   hideChatReportPanel: () => (/* binding */ hideChatReportPanel),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   setChatUsername: () => (/* binding */ setChatUsername),
/* harmony export */   updatePrivateLink: () => (/* binding */ updatePrivateLink)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");








let onUpdate;
const ACCEPTABLE_USERNAME_ERRORS = new Set([_config__WEBPACK_IMPORTED_MODULE_1__.USERNAME_PURCHASE_ERROR, 'USERNAME_INVALID']);
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
async function checkChatUsername(_ref) {
  let {
    username
  } = _ref;
  try {
    const result = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.channels.CheckUsername({
      channel: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputChannelEmpty(),
      username
    }), {
      shouldThrow: true
    });
    return {
      result,
      error: undefined
    };
  } catch (error) {
    const errorMessage = error.message;
    if (ACCEPTABLE_USERNAME_ERRORS.has(errorMessage)) {
      return {
        result: false,
        error: errorMessage
      };
    }
    throw error;
  }
}
async function setChatUsername(_ref2) {
  let {
    chat,
    username
  } = _ref2;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.channels.UpdateUsername({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputEntity)(chat.id, chat.accessHash),
    username
  }));
  let usernames = username ? [{
    username,
    isEditable: true,
    isActive: true
  }] : [];
  if (chat.usernames) {
    // User can remove username from chat when changing it type to private, so we need to filter out empty usernames
    usernames = usernames.concat(chat.usernames.filter(u => u.username && !u.isEditable));
  }
  if (result) {
    onUpdate({
      '@type': 'updateChat',
      id: chat.id,
      chat: {
        usernames: usernames.length ? usernames : undefined
      }
    });
  }
  return result;
}
async function deactivateAllUsernames(_ref3) {
  let {
    chat
  } = _ref3;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.channels.DeactivateAllUsernames({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputEntity)(chat.id, chat.accessHash)
  }));
  if (result) {
    const usernames = chat.usernames ? chat.usernames.map(u => ({
      ...u,
      isActive: false
    }))
    // User can remove username from chat when changing it type to private, so we need to filter out empty usernames
    .filter(u => u.username) : undefined;
    onUpdate({
      '@type': 'updateChat',
      id: chat.id,
      chat: {
        usernames
      }
    });
  }
  return result;
}
async function updatePrivateLink(_ref4) {
  let {
    chat,
    usageLimit,
    expireDate
  } = _ref4;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.ExportChatInvite({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(chat.id, chat.accessHash),
    usageLimit,
    expireDate
  }));
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatInviteExported)) return undefined;
  onUpdate({
    '@type': 'updateChatFullInfo',
    id: chat.id,
    fullInfo: {
      inviteLink: result.link
    }
  });
  return result.link;
}
async function fetchExportedChatInvites(_ref5) {
  let {
    peer,
    admin,
    limit = 0,
    isRevoked
  } = _ref5;
  const exportedInvites = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.GetExportedChatInvites({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    adminId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputEntity)(admin.id, admin.accessHash),
    limit,
    revoked: isRevoked || undefined
  }), {
    abortControllerChatId: peer.id
  });
  if (!exportedInvites) return undefined;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.addEntitiesToLocalDb)(exportedInvites.users);
  const invites = exportedInvites.invites.filter(invite => invite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatInviteExported).map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiExportedInvite);
  return {
    invites,
    users: exportedInvites.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_4__.buildApiUser).filter(Boolean)
  };
}
async function editExportedChatInvite(_ref6) {
  let {
    peer,
    isRevoked,
    link,
    expireDate,
    usageLimit,
    isRequestNeeded,
    title
  } = _ref6;
  const invite = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.EditExportedChatInvite({
    link,
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    expireDate,
    usageLimit: !isRequestNeeded ? usageLimit : undefined,
    requestNeeded: isRequestNeeded,
    title,
    revoked: isRevoked || undefined
  }));
  if (!invite) return undefined;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.addEntitiesToLocalDb)(invite.users);
  if (invite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.ExportedChatInvite && invite.invite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatInviteExported) {
    const replaceInvite = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiExportedInvite)(invite.invite);
    return {
      oldInvite: replaceInvite,
      newInvite: replaceInvite,
      users: invite.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_4__.buildApiUser).filter(Boolean)
    };
  }
  if (invite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.ExportedChatInviteReplaced && invite.invite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatInviteExported && invite.newInvite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatInviteExported) {
    const oldInvite = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiExportedInvite)(invite.invite);
    const newInvite = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiExportedInvite)(invite.newInvite);
    return {
      oldInvite,
      newInvite,
      users: invite.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_4__.buildApiUser).filter(Boolean)
    };
  }
  return undefined;
}
async function exportChatInvite(_ref7) {
  let {
    peer,
    expireDate,
    usageLimit,
    isRequestNeeded,
    title
  } = _ref7;
  const invite = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.ExportChatInvite({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    expireDate,
    usageLimit: !isRequestNeeded ? usageLimit : undefined,
    requestNeeded: isRequestNeeded || undefined,
    title
  }));
  if (!(invite instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatInviteExported)) return undefined;
  return (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiExportedInvite)(invite);
}
async function deleteExportedChatInvite(_ref8) {
  let {
    peer,
    link
  } = _ref8;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.DeleteExportedChatInvite({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    link
  }));
  return result;
}
async function deleteRevokedExportedChatInvites(_ref9) {
  let {
    peer,
    admin
  } = _ref9;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.DeleteRevokedExportedChatInvites({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    adminId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputEntity)(admin.id, admin.accessHash)
  }));
  return result;
}
async function fetchChatInviteImporters(_ref10) {
  let {
    peer,
    link,
    offsetDate = 0,
    offsetUser,
    limit = 0,
    isRequested
  } = _ref10;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.GetChatInviteImporters({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    link,
    offsetDate,
    offsetUser: offsetUser ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputEntity)(offsetUser.id, offsetUser.accessHash) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.InputUserEmpty(),
    limit,
    requested: isRequested || undefined
  }), {
    abortControllerChatId: peer.id
  });
  if (!result) return undefined;
  const users = result.users.map(user => (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_4__.buildApiUser)(user)).filter(Boolean);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.addEntitiesToLocalDb)(result.users);
  return {
    importers: result.importers.map(importer => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildChatInviteImporter)(importer)),
    users: (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.buildCollectionByKey)(users, 'id')
  };
}
function hideChatJoinRequest(_ref11) {
  let {
    peer,
    user,
    isApproved
  } = _ref11;
  return (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.HideChatJoinRequest({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    userId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputEntity)(user.id, user.accessHash),
    approved: isApproved || undefined
  }), {
    shouldReturnTrue: true
  });
}
function hideAllChatJoinRequests(_ref12) {
  let {
    peer,
    isApproved,
    link
  } = _ref12;
  return (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.HideAllChatJoinRequests({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(peer.id, peer.accessHash),
    approved: isApproved || undefined,
    link
  }), {
    shouldReturnTrue: true
  });
}
function hideChatReportPanel(chat) {
  const {
    id,
    accessHash
  } = chat;
  return (0,_client__WEBPACK_IMPORTED_MODULE_7__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.HidePeerSettingsBar({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputPeer)(id, accessHash)
  }));
}

/***/ }),

/***/ "./src/api/gramjs/methods/media.ts":
/*!*****************************************!*\
  !*** ./src/api/gramjs/methods/media.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ downloadMedia),
/* harmony export */   parseMediaUrl: () => (/* binding */ parseMediaUrl)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types */ "./src/api/types/index.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_cacheApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/cacheApi */ "./src/util/cacheApi.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");






const MEDIA_ENTITY_TYPES = new Set(['sticker', 'wallpaper', 'photo', 'webDocument', 'document']);
const JPEG_SIZE_TYPES = new Set(['s', 'm', 'x', 'y', 'w', 'a', 'b', 'c', 'd']);
const MP4_SIZES_TYPES = new Set(['u', 'v']);
async function downloadMedia(_ref, client, onProgress) {
  let {
    url,
    mediaFormat,
    start,
    end,
    isHtmlAllowed
  } = _ref;
  const {
    data,
    mimeType,
    fullSize
  } = (await download(url, client, onProgress, start, end, isHtmlAllowed)) || {};
  if (!data) {
    return undefined;
  }
  const parsed = await parseMedia(data, mediaFormat, mimeType);
  if (!parsed) {
    return undefined;
  }
  const canCache = mediaFormat !== _types__WEBPACK_IMPORTED_MODULE_1__.ApiMediaFormat.Progressive && (mediaFormat !== _types__WEBPACK_IMPORTED_MODULE_1__.ApiMediaFormat.BlobUrl || parsed.size <= _config__WEBPACK_IMPORTED_MODULE_2__.MEDIA_CACHE_MAX_BYTES);
  if (!_config__WEBPACK_IMPORTED_MODULE_2__.MEDIA_CACHE_DISABLED && _util_cacheApi__WEBPACK_IMPORTED_MODULE_3__ && canCache) {
    const cacheName = url.startsWith('avatar') ? _config__WEBPACK_IMPORTED_MODULE_2__.MEDIA_CACHE_NAME_AVATARS : _config__WEBPACK_IMPORTED_MODULE_2__.MEDIA_CACHE_NAME;
    void _util_cacheApi__WEBPACK_IMPORTED_MODULE_3__.save(cacheName, url, parsed);
  }
  const dataBlob = mediaFormat === _types__WEBPACK_IMPORTED_MODULE_1__.ApiMediaFormat.Progressive ? '' : parsed;
  const arrayBuffer = mediaFormat === _types__WEBPACK_IMPORTED_MODULE_1__.ApiMediaFormat.Progressive ? parsed : undefined;
  return {
    dataBlob,
    arrayBuffer,
    mimeType,
    fullSize
  };
}
async function download(url, client, onProgress, start, end, isHtmlAllowed) {
  const parsed = parseMediaUrl(url);
  if (!parsed) return undefined;
  const {
    entityType,
    entityId,
    sizeType,
    params,
    mediaMatchType
  } = parsed;
  if (entityType === 'staticMap') {
    const accessHash = entityId;
    const parsedParams = new URLSearchParams(params);
    const long = parsedParams.get('long');
    const lat = parsedParams.get('lat');
    const w = parsedParams.get('w');
    const h = parsedParams.get('h');
    const zoom = parsedParams.get('zoom');
    const scale = parsedParams.get('scale');
    const accuracyRadius = parsedParams.get('accuracy_radius');
    const data = await client.downloadStaticMap(accessHash, long, lat, w, h, zoom, scale, accuracyRadius);
    return {
      mimeType: 'image/png',
      data
    };
  }
  let entity;
  switch (entityType) {
    case 'channel':
    case 'chat':
      entity = _localDb__WEBPACK_IMPORTED_MODULE_5__["default"].chats[entityId];
      break;
    case 'user':
      entity = _localDb__WEBPACK_IMPORTED_MODULE_5__["default"].users[entityId];
      break;
    case 'sticker':
    case 'wallpaper':
    case 'document':
      entity = _localDb__WEBPACK_IMPORTED_MODULE_5__["default"].documents[entityId];
      break;
    case 'photo':
      entity = _localDb__WEBPACK_IMPORTED_MODULE_5__["default"].photos[entityId];
      break;
    case 'stickerSet':
      entity = _localDb__WEBPACK_IMPORTED_MODULE_5__["default"].stickerSets[entityId];
      break;
    case 'webDocument':
      entity = _localDb__WEBPACK_IMPORTED_MODULE_5__["default"].webDocuments[entityId];
      break;
  }
  if (!entity) {
    return undefined;
  }
  if (MEDIA_ENTITY_TYPES.has(entityType)) {
    const data = await client.downloadMedia(entity, {
      sizeType,
      start,
      end,
      progressCallback: onProgress,
      workers: _config__WEBPACK_IMPORTED_MODULE_2__.DOWNLOAD_WORKERS
    });
    let mimeType;
    let fullSize;
    if (sizeType && JPEG_SIZE_TYPES.has(sizeType)) {
      mimeType = 'image/jpeg';
    } else if (sizeType && MP4_SIZES_TYPES.has(sizeType)) {
      mimeType = 'video/mp4';
    } else if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo) {
      mimeType = 'image/jpeg';
    } else if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.WebDocument) {
      mimeType = entity.mimeType;
      fullSize = entity.size;
    } else if (entity instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Document) {
      mimeType = entity.mimeType;
      fullSize = entity.size.toJSNumber();
    }

    // Prevent HTML-in-video attacks
    if (!isHtmlAllowed && mimeType) {
      mimeType = mimeType.replace(/html/gi, '');
    }
    return {
      mimeType,
      data,
      fullSize
    };
  } else if (entityType === 'stickerSet') {
    const data = await client.downloadStickerSetThumb(entity);
    const mimeType = getMimeType(data);
    return {
      mimeType,
      data
    };
  } else {
    const data = await client.downloadProfilePhoto(entity, mediaMatchType === 'profile');
    const mimeType = getMimeType(data);
    return {
      mimeType,
      data
    };
  }
}

// eslint-disable-next-line no-async-without-await/no-async-without-await
async function parseMedia(data, mediaFormat, mimeType) {
  switch (mediaFormat) {
    case _types__WEBPACK_IMPORTED_MODULE_1__.ApiMediaFormat.BlobUrl:
      return new Blob([data], {
        type: mimeType
      });
    case _types__WEBPACK_IMPORTED_MODULE_1__.ApiMediaFormat.Text:
      return data.toString();
    case _types__WEBPACK_IMPORTED_MODULE_1__.ApiMediaFormat.Progressive:
    case _types__WEBPACK_IMPORTED_MODULE_1__.ApiMediaFormat.DownloadUrl:
      return data.buffer;
  }
  return undefined;
}
function getMimeType(data) {
  let fallbackMimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/jpeg';
  if (data.length < 4) {
    return fallbackMimeType;
  }
  let type = fallbackMimeType;
  const signature = data.subarray(0, 4).reduce((result, byte) => result + byte.toString(16), '');

  // https://en.wikipedia.org/wiki/List_of_file_signatures
  switch (signature) {
    case '89504e47':
      type = 'image/png';
      break;
    case '47494638':
      type = 'image/gif';
      break;
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      type = 'image/jpeg';
      break;
    case '52494646':
      // In our case only webp is expected
      type = 'image/webp';
      break;
  }
  return type;
}
function parseMediaUrl(url) {
  const mediaMatch = url.startsWith('staticMap') ? url.match(/(staticMap):([0-9-]+)(\?.+)/) : url.startsWith('webDocument') ? url.match(/(webDocument):(.+)/) : url.match(
  // eslint-disable-next-line max-len
  /(avatar|profile|photo|stickerSet|sticker|wallpaper|document)([-\d\w./]+)(?::\d+)?(\?size=\w+)?/);
  if (!mediaMatch) {
    return undefined;
  }
  const mediaMatchType = mediaMatch[1];
  const entityId = mediaMatch[2];
  let entityType;
  const params = mediaMatch[3];
  const sizeType = params?.replace('?size=', '') || undefined;
  if (mediaMatch[1] === 'avatar' || mediaMatch[1] === 'profile') {
    entityType = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_4__.getEntityTypeById)(entityId);
  } else {
    entityType = mediaMatch[1];
  }
  return {
    mediaMatchType,
    entityType,
    entityId,
    sizeType,
    params
  };
}

/***/ }),

/***/ "./src/api/gramjs/methods/messages.ts":
/*!********************************************!*\
  !*** ./src/api/gramjs/methods/messages.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clickSponsoredMessage: () => (/* binding */ clickSponsoredMessage),
/* harmony export */   closePoll: () => (/* binding */ closePoll),
/* harmony export */   deleteHistory: () => (/* binding */ deleteHistory),
/* harmony export */   deleteMessages: () => (/* binding */ deleteMessages),
/* harmony export */   deleteSavedHistory: () => (/* binding */ deleteSavedHistory),
/* harmony export */   deleteScheduledMessages: () => (/* binding */ deleteScheduledMessages),
/* harmony export */   editMessage: () => (/* binding */ editMessage),
/* harmony export */   exportMessageLink: () => (/* binding */ exportMessageLink),
/* harmony export */   fetchDiscussionMessage: () => (/* binding */ fetchDiscussionMessage),
/* harmony export */   fetchExtendedMedia: () => (/* binding */ fetchExtendedMedia),
/* harmony export */   fetchFactChecks: () => (/* binding */ fetchFactChecks),
/* harmony export */   fetchMessage: () => (/* binding */ fetchMessage),
/* harmony export */   fetchMessageViews: () => (/* binding */ fetchMessageViews),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchOutboxReadDate: () => (/* binding */ fetchOutboxReadDate),
/* harmony export */   fetchPinnedMessages: () => (/* binding */ fetchPinnedMessages),
/* harmony export */   fetchQuickReplies: () => (/* binding */ fetchQuickReplies),
/* harmony export */   fetchScheduledHistory: () => (/* binding */ fetchScheduledHistory),
/* harmony export */   fetchSeenBy: () => (/* binding */ fetchSeenBy),
/* harmony export */   fetchSendAs: () => (/* binding */ fetchSendAs),
/* harmony export */   fetchSponsoredMessages: () => (/* binding */ fetchSponsoredMessages),
/* harmony export */   fetchUnreadMentions: () => (/* binding */ fetchUnreadMentions),
/* harmony export */   fetchUnreadReactions: () => (/* binding */ fetchUnreadReactions),
/* harmony export */   fetchWebPagePreview: () => (/* binding */ fetchWebPagePreview),
/* harmony export */   findFirstMessageIdAfterDate: () => (/* binding */ findFirstMessageIdAfterDate),
/* harmony export */   forwardMessages: () => (/* binding */ forwardMessages),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   loadPollOptionResults: () => (/* binding */ loadPollOptionResults),
/* harmony export */   markMessageListRead: () => (/* binding */ markMessageListRead),
/* harmony export */   markMessagesRead: () => (/* binding */ markMessagesRead),
/* harmony export */   pinMessage: () => (/* binding */ pinMessage),
/* harmony export */   readAllMentions: () => (/* binding */ readAllMentions),
/* harmony export */   readAllReactions: () => (/* binding */ readAllReactions),
/* harmony export */   reportMessages: () => (/* binding */ reportMessages),
/* harmony export */   rescheduleMessage: () => (/* binding */ rescheduleMessage),
/* harmony export */   saveDefaultSendAs: () => (/* binding */ saveDefaultSendAs),
/* harmony export */   searchMessagesGlobal: () => (/* binding */ searchMessagesGlobal),
/* harmony export */   searchMessagesLocal: () => (/* binding */ searchMessagesLocal),
/* harmony export */   sendMessage: () => (/* binding */ sendMessage),
/* harmony export */   sendMessageAction: () => (/* binding */ sendMessageAction),
/* harmony export */   sendPollVote: () => (/* binding */ sendPollVote),
/* harmony export */   sendQuickReply: () => (/* binding */ sendQuickReply),
/* harmony export */   sendScheduledMessages: () => (/* binding */ sendScheduledMessages),
/* harmony export */   transcribeAudio: () => (/* binding */ transcribeAudio),
/* harmony export */   translateText: () => (/* binding */ translateText),
/* harmony export */   unpinAllMessages: () => (/* binding */ unpinAllMessages),
/* harmony export */   viewSponsoredMessage: () => (/* binding */ viewSponsoredMessage)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types */ "./src/api/types/index.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _global_helpers_getEmojiOnlyCountForMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../global/helpers/getEmojiOnlyCountForMessage */ "./src/global/helpers/getEmojiOnlyCountForMessage.ts");
/* harmony import */ var _util_files__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../util/files */ "./src/util/files.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _util_messageKey__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../util/messageKey */ "./src/util/messageKey.ts");
/* harmony import */ var _util_serverTime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../util/serverTime */ "./src/util/serverTime.ts");
/* harmony import */ var _util_waveform__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../util/waveform */ "./src/util/waveform.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../apiBuilders/common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../apiBuilders/messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../apiBuilders/messages */ "./src/api/gramjs/apiBuilders/messages.ts");
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _updates_updateManager__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../updates/updateManager */ "./src/api/gramjs/updates/updateManager.ts");
/* harmony import */ var _updates_updater__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../updates/updater */ "./src/api/gramjs/updates/updater.ts");
/* harmony import */ var _chats__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./chats */ "./src/api/gramjs/methods/chats.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];






















const FAST_SEND_TIMEOUT = 1000;
const INPUT_WAVEFORM_LENGTH = 63;
let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
async function fetchMessages(_ref) {
  let {
    chat,
    threadId,
    offsetId,
    isSavedDialog,
    ...pagination
  } = _ref;
  const RequestClass = threadId === _types__WEBPACK_IMPORTED_MODULE_2__.MAIN_THREAD_ID ? _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetHistory : isSavedDialog ? _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetSavedHistory : _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetReplies;
  let result;
  try {
    result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new RequestClass({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
      ...(threadId !== _types__WEBPACK_IMPORTED_MODULE_2__.MAIN_THREAD_ID && !isSavedDialog && {
        msgId: Number(threadId)
      }),
      ...(offsetId && {
        // Workaround for local message IDs overflowing some internal `Buffer` range check
        offsetId: Math.min(offsetId, _config__WEBPACK_IMPORTED_MODULE_3__.MAX_INT_32)
      }),
      ...pagination
    }), {
      shouldThrow: true,
      abortControllerChatId: chat.id,
      abortControllerThreadId: threadId
    });
  } catch (err) {
    if (err.message === 'CHANNEL_PRIVATE') {
      onUpdate({
        '@type': 'updateChat',
        id: chat.id,
        chat: {
          isRestricted: true
        }
      });
    }
  }
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified || !result.messages) {
    return undefined;
  }
  updateLocalDb(result);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage).filter(Boolean);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  const count = !(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.Messages) && result.count;
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)(result.messages);
  return {
    messages,
    users,
    chats,
    count
  };
}
async function fetchMessage(_ref2) {
  let {
    chat,
    messageId
  } = _ref2;
  const isChannel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.getEntityTypeById)(chat.id) === 'channel';
  let result;
  try {
    result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(isChannel ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.GetMessages({
      channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputEntity)(chat.id, chat.accessHash),
      id: [new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessageID({
        id: messageId
      })]
    }) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetMessages({
      id: [new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessageID({
        id: messageId
      })]
    }), {
      shouldThrow: true,
      abortControllerChatId: chat.id
    });
  } catch (err) {
    const {
      message
    } = err;

    // When fetching messages for the bot @replies, there may be situations when the user was banned
    // in the comment group or this group was deleted
    if (message !== 'CHANNEL_PRIVATE') {
      onUpdate({
        '@type': 'error',
        error: {
          message,
          isSlowMode: false,
          hasErrorKey: true
        }
      });
    }
  }
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified) {
    return undefined;
  }
  if ('pts' in result) {
    (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_18__.updateChannelState)(chat.id, result.pts);
  }
  const mtpMessage = result.messages[0];
  if (!mtpMessage) {
    return undefined;
  }
  if (mtpMessage instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageEmpty) {
    return _types__WEBPACK_IMPORTED_MODULE_2__.MESSAGE_DELETED;
  }
  const message = mtpMessage && (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage)(mtpMessage);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)([mtpMessage]);
  if (!message) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.addMessageToLocalDb)(mtpMessage);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  return {
    message,
    users
  };
}
let mediaQueue = Promise.resolve();
function sendMessage(_ref3, onProgress) {
  let {
    chat,
    lastMessageId,
    text,
    entities,
    replyInfo,
    attachment,
    sticker,
    story,
    gif,
    poll,
    contact,
    isSilent,
    scheduledAt,
    groupedId,
    noWebPage,
    sendAs,
    shouldUpdateStickerSetOrder,
    wasDrafted,
    isInvertedMedia,
    effectId
  } = _ref3;
  const localMessage = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildLocalMessage)(chat, lastMessageId, text, entities, replyInfo, attachment, sticker, gif, poll, contact, groupedId, scheduledAt, sendAs, story, isInvertedMedia, effectId);
  onUpdate({
    '@type': localMessage.isScheduled ? 'newScheduledMessage' : 'newMessage',
    id: localMessage.id,
    chatId: chat.id,
    message: localMessage,
    wasDrafted
  });

  // This is expected to arrive after `updateMessageSendSucceeded` which replaces the local ID,
  // so in most cases this will be simply ignored
  const timeout = setTimeout(() => {
    onUpdate({
      '@type': localMessage.isScheduled ? 'updateScheduledMessage' : 'updateMessage',
      id: localMessage.id,
      chatId: chat.id,
      message: {
        sendingState: 'messageSendingStatePending'
      }
    });
  }, FAST_SEND_TIMEOUT);
  const randomId = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.generateRandomBigInt)();
  if (groupedId) {
    return sendGroupedMedia({
      chat,
      text,
      entities,
      replyInfo,
      attachment: attachment,
      groupedId,
      isSilent,
      scheduledAt
    }, randomId, localMessage, onProgress);
  }
  const messagePromise = (async () => {
    let media;
    if (attachment) {
      try {
        media = await uploadMedia(localMessage, attachment, onProgress);
      } catch (err) {
        if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
          // eslint-disable-next-line no-console
          console.warn(err);
        }
        await mediaQueue;
        return;
      }
    } else if (sticker) {
      media = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputMediaDocument)(sticker);
    } else if (gif) {
      media = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputMediaDocument)(gif);
    } else if (poll) {
      media = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPoll)(poll, randomId);
    } else if (story) {
      media = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputStory)(story);
    } else if (contact) {
      media = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaContact({
        phoneNumber: contact.phoneNumber,
        firstName: contact.firstName,
        lastName: contact.lastName,
        vcard: ''
      });
    }
    const RequestClass = media ? _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SendMedia : _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SendMessage;
    try {
      const update = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new RequestClass({
        clearDraft: true,
        message: text || '',
        entities: entities ? entities.map(_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildMtpMessageEntity) : undefined,
        peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
        randomId,
        replyTo: replyInfo && (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputReplyTo)(replyInfo),
        ...(isSilent && {
          silent: isSilent
        }),
        ...(scheduledAt && {
          scheduleDate: scheduledAt
        }),
        ...(media && {
          media
        }),
        ...(noWebPage && {
          noWebpage: noWebPage
        }),
        ...(sendAs && {
          sendAs: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(sendAs.id, sendAs.accessHash)
        }),
        ...(shouldUpdateStickerSetOrder && {
          updateStickersetsOrder: shouldUpdateStickerSetOrder
        }),
        ...(isInvertedMedia && {
          invertMedia: isInvertedMedia
        }),
        ...(effectId && {
          effect: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(effectId)
        })
      }), {
        shouldThrow: true,
        shouldIgnoreUpdates: true
      });
      if (update) handleLocalMessageUpdate(localMessage, update);
    } catch (error) {
      if (error.message === 'PRIVACY_PREMIUM_REQUIRED') {
        onUpdate({
          '@type': 'updateRequestUserUpdate',
          id: chat.id
        });
      }
      onUpdate({
        '@type': 'updateMessageSendFailed',
        chatId: chat.id,
        localId: localMessage.id,
        error: error.message
      });
      clearTimeout(timeout);
    }
  })();
  return messagePromise;
}
const groupedUploads = {};
function sendGroupedMedia(_ref4, randomId, localMessage, onProgress) {
  let {
    chat,
    text,
    entities,
    replyInfo,
    attachment,
    groupedId,
    isSilent,
    scheduledAt,
    sendAs
  } = _ref4;
  let groupIndex = -1;
  if (!groupedUploads[groupedId]) {
    groupedUploads[groupedId] = {
      counter: 0,
      singleMediaByIndex: {},
      localMessages: {}
    };
  }
  groupIndex = groupedUploads[groupedId].counter++;
  const prevMediaQueue = mediaQueue;
  mediaQueue = (async () => {
    let media;
    try {
      media = await uploadMedia(localMessage, attachment, onProgress);
    } catch (err) {
      if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
        // eslint-disable-next-line no-console
        console.warn(err);
      }
      groupedUploads[groupedId].counter--;
      await prevMediaQueue;
      return;
    }
    const inputMedia = await fetchInputMedia((0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash), media);
    await prevMediaQueue;
    if (!inputMedia) {
      groupedUploads[groupedId].counter--;
      if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
        // eslint-disable-next-line no-console
        console.warn('Failed to upload grouped media');
      }
      return;
    }
    groupedUploads[groupedId].singleMediaByIndex[groupIndex] = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputSingleMedia({
      media: inputMedia,
      randomId,
      message: text || '',
      entities: entities ? entities.map(_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildMtpMessageEntity) : undefined
    });
    groupedUploads[groupedId].localMessages[randomId.toString()] = localMessage;
    if (Object.keys(groupedUploads[groupedId].singleMediaByIndex).length < groupedUploads[groupedId].counter) {
      return;
    }
    const {
      singleMediaByIndex,
      localMessages
    } = groupedUploads[groupedId];
    delete groupedUploads[groupedId];
    const update = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SendMultiMedia({
      clearDraft: true,
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
      multiMedia: Object.values(singleMediaByIndex),
      // Object keys are usually ordered
      replyTo: replyInfo && (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputReplyTo)(replyInfo),
      ...(isSilent && {
        silent: isSilent
      }),
      ...(scheduledAt && {
        scheduleDate: scheduledAt
      }),
      ...(sendAs && {
        sendAs: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(sendAs.id, sendAs.accessHash)
      })
    }), {
      shouldIgnoreUpdates: true
    });
    if (update) handleMultipleLocalMessagesUpdate(localMessages, update);
  })();
  return mediaQueue;
}
async function fetchInputMedia(peer, uploadedMedia) {
  const messageMedia = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.UploadMedia({
    peer,
    media: uploadedMedia
  }));
  const isSpoiler = uploadedMedia.spoiler;
  if (messageMedia instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageMediaPhoto && messageMedia.photo && messageMedia.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo) {
    const {
      photo: {
        id,
        accessHash,
        fileReference
      }
    } = messageMedia;
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaPhoto({
      id: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPhoto({
        id,
        accessHash,
        fileReference
      }),
      spoiler: isSpoiler
    });
  }
  if (messageMedia instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.MessageMediaDocument && messageMedia.document && messageMedia.document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
    const {
      document: {
        id,
        accessHash,
        fileReference
      }
    } = messageMedia;
    return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaDocument({
      id: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputDocument({
        id,
        accessHash,
        fileReference
      }),
      spoiler: isSpoiler
    });
  }
  return undefined;
}
async function editMessage(_ref5, onProgress) {
  let {
    chat,
    message,
    text,
    entities,
    attachment,
    noWebPage
  } = _ref5;
  const isScheduled = message.date * 1000 > Date.now() + (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_8__.getServerTimeOffset)() * 1000;
  const media = attachment && (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildUploadingMedia)(attachment);
  const isInvertedMedia = text && !attachment?.shouldSendAsFile ? message.isInvertedMedia : undefined;
  const newContent = {
    ...(media || message.content),
    ...(text && {
      text: {
        text,
        entities
      }
    })
  };
  const messageUpdate = {
    ...message,
    content: newContent,
    emojiOnlyCount: (0,_global_helpers_getEmojiOnlyCountForMessage__WEBPACK_IMPORTED_MODULE_4__.getEmojiOnlyCountForMessage)(newContent, message.groupedId),
    isInvertedMedia
  };
  onUpdate({
    '@type': isScheduled ? 'updateScheduledMessage' : 'updateMessage',
    id: message.id,
    chatId: chat.id,
    message: messageUpdate
  });
  try {
    let mediaUpdate;
    if (attachment) {
      mediaUpdate = await uploadMedia(message, attachment, onProgress);
    }
    const mtpEntities = entities && entities.map(_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildMtpMessageEntity);
    await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.EditMessage({
      message: text || '',
      entities: mtpEntities,
      media: mediaUpdate,
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
      id: message.id,
      ...(isScheduled && {
        scheduleDate: message.date
      }),
      ...(noWebPage && {
        noWebpage: noWebPage
      }),
      ...(isInvertedMedia && {
        invertMedia: isInvertedMedia
      })
    }), {
      shouldThrow: true
    });
  } catch (err) {
    if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
      // eslint-disable-next-line no-console
      console.warn(err);
    }
    const {
      message: messageErr
    } = err;
    onUpdate({
      '@type': 'error',
      error: {
        message: messageErr,
        hasErrorKey: true
      }
    });

    // Rollback changes
    onUpdate({
      '@type': isScheduled ? 'updateScheduledMessage' : 'updateMessage',
      id: message.id,
      chatId: chat.id,
      message
    });
  }
}
async function rescheduleMessage(_ref6) {
  let {
    chat,
    message,
    scheduledAt
  } = _ref6;
  await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.EditMessage({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    id: message.id,
    scheduleDate: scheduledAt
  }));
}
async function uploadMedia(message, attachment, onProgress) {
  const {
    filename,
    blobUrl,
    mimeType,
    quick,
    voice,
    audio,
    previewBlobUrl,
    shouldSendAsFile,
    shouldSendAsSpoiler,
    ttlSeconds
  } = attachment;
  const patchedOnProgress = progress => {
    if (onProgress.isCanceled) {
      patchedOnProgress.isCanceled = true;
    } else {
      onProgress(progress, (0,_util_messageKey__WEBPACK_IMPORTED_MODULE_7__.getMessageKey)(message));
    }
  };
  const fetchAndUpload = async (url, progressCallback) => {
    const file = await (0,_util_files__WEBPACK_IMPORTED_MODULE_5__.fetchFile)(url, filename);
    return (0,_client__WEBPACK_IMPORTED_MODULE_21__.uploadFile)(file, progressCallback);
  };
  const isVideo = _config__WEBPACK_IMPORTED_MODULE_3__.SUPPORTED_VIDEO_CONTENT_TYPES.has(mimeType);
  const shouldUploadThumb = audio || isVideo || shouldSendAsFile;
  const [inputFile, thumb] = await Promise.all((0,_util_iteratees__WEBPACK_IMPORTED_MODULE_6__.compact)([fetchAndUpload(blobUrl, patchedOnProgress), shouldUploadThumb && previewBlobUrl && fetchAndUpload(previewBlobUrl)]));
  const attributes = [new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DocumentAttributeFilename({
    fileName: filename
  })];
  if (!shouldSendAsFile) {
    if (quick) {
      if (_config__WEBPACK_IMPORTED_MODULE_3__.SUPPORTED_IMAGE_CONTENT_TYPES.has(mimeType) && mimeType !== _config__WEBPACK_IMPORTED_MODULE_3__.GIF_MIME_TYPE) {
        return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaUploadedPhoto({
          file: inputFile,
          spoiler: shouldSendAsSpoiler
        });
      }
      if (isVideo) {
        const {
          width,
          height,
          duration
        } = quick;
        if (duration !== undefined) {
          attributes.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DocumentAttributeVideo({
            duration,
            w: width,
            h: height,
            supportsStreaming: true
          }));
        }
      }
    }
    if (audio) {
      const {
        duration,
        title,
        performer
      } = audio;
      attributes.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DocumentAttributeAudio({
        duration,
        title,
        performer
      }));
    }
    if (voice) {
      const {
        duration,
        waveform
      } = voice;
      const {
        data: inputWaveform
      } = (0,_util_waveform__WEBPACK_IMPORTED_MODULE_9__.interpolateArray)(waveform, INPUT_WAVEFORM_LENGTH);
      attributes.push(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DocumentAttributeAudio({
        voice: true,
        duration,
        waveform: Buffer.from(inputWaveform)
      }));
    }
  }
  return new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMediaUploadedDocument({
    file: inputFile,
    mimeType,
    attributes,
    thumb,
    forceFile: shouldSendAsFile,
    spoiler: shouldSendAsSpoiler,
    ttlSeconds
  });
}
async function pinMessage(_ref7) {
  let {
    chat,
    messageId,
    isUnpin,
    isOneSide,
    isSilent
  } = _ref7;
  await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.UpdatePinnedMessage({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    id: messageId,
    ...(isUnpin && {
      unpin: true
    }),
    ...(isOneSide && {
      pmOneside: true
    }),
    ...(isSilent && {
      silent: true
    })
  }));
}
async function unpinAllMessages(_ref8) {
  let {
    chat,
    threadId
  } = _ref8;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.UnpinAllMessages({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    ...(threadId && {
      topMsgId: Number(threadId)
    })
  }));
  if (!result) return;
  (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_18__.processAffectedHistory)(chat, result);
  if (result.offset) {
    await unpinAllMessages({
      chat,
      threadId
    });
  }
}
async function deleteMessages(_ref9) {
  let {
    chat,
    messageIds,
    shouldDeleteForAll
  } = _ref9;
  const isChannel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.getEntityTypeById)(chat.id) === 'channel';
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(isChannel ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.DeleteMessages({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputEntity)(chat.id, chat.accessHash),
    id: messageIds
  }) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DeleteMessages({
    id: messageIds,
    ...(shouldDeleteForAll && {
      revoke: true
    })
  }));
  if (!result) {
    return;
  }
  (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_18__.processAffectedHistory)(chat, result);
  onUpdate({
    '@type': 'deleteMessages',
    ids: messageIds,
    ...(isChannel && {
      chatId: chat.id
    })
  });
}
function deleteScheduledMessages(_ref10) {
  let {
    chat,
    messageIds
  } = _ref10;
  (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DeleteScheduledMessages({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    id: messageIds
  }));
}
async function deleteHistory(_ref11) {
  let {
    chat,
    shouldDeleteForAll
  } = _ref11;
  const isChannel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.getEntityTypeById)(chat.id) === 'channel';
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(isChannel ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.DeleteHistory({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputEntity)(chat.id, chat.accessHash)
  }) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DeleteHistory({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    ...(shouldDeleteForAll && {
      revoke: true
    }),
    ...(!shouldDeleteForAll && {
      just_clear: true
    })
  }));
  if (!result) {
    return;
  }
  if ('offset' in result) {
    (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_18__.processAffectedHistory)(chat, result);
    if (result.offset) {
      await deleteHistory({
        chat,
        shouldDeleteForAll
      });
      return;
    }
  }
  onUpdate({
    '@type': 'deleteHistory',
    chatId: chat.id
  });
}
async function deleteSavedHistory(_ref12) {
  let {
    chat
  } = _ref12;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.DeleteSavedHistory({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash)
  }));
  if (!result) {
    return;
  }
  (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_18__.processAffectedHistory)(chat, result);
  if (result.offset) {
    await deleteSavedHistory({
      chat
    });
    return;
  }
  onUpdate({
    '@type': 'deleteSavedHistory',
    chatId: chat.id
  });
}
async function reportMessages(_ref13) {
  let {
    peer,
    messageIds,
    reason,
    description
  } = _ref13;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.Report({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(peer.id, peer.accessHash),
    id: messageIds,
    reason: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputReportReason)(reason),
    message: description
  }));
  return result;
}
async function sendMessageAction(_ref14) {
  let {
    peer,
    threadId,
    action
  } = _ref14;
  const gramAction = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildSendMessageAction)(action);
  if (!gramAction) {
    if (_config__WEBPACK_IMPORTED_MODULE_3__.DEBUG) {
      // eslint-disable-next-line no-console
      console.warn('Unsupported message action', action);
    }
    return undefined;
  }
  try {
    const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SetTyping({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(peer.id, peer.accessHash),
      topMsgId: Number(threadId),
      action: gramAction
    }), {
      shouldThrow: true,
      abortControllerChatId: peer.id,
      abortControllerThreadId: threadId
    });
    return result;
  } catch (error) {
    // Prevent error from being displayed in UI
  }
  return undefined;
}
async function markMessageListRead(_ref15) {
  let {
    chat,
    threadId,
    maxId = 0
  } = _ref15;
  const isChannel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.getEntityTypeById)(chat.id) === 'channel';

  // Workaround for local message IDs overflowing some internal `Buffer` range check
  const fixedMaxId = Math.min(maxId, _config__WEBPACK_IMPORTED_MODULE_3__.MAX_INT_32);
  if (isChannel && threadId === _types__WEBPACK_IMPORTED_MODULE_2__.MAIN_THREAD_ID) {
    await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ReadHistory({
      channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputEntity)(chat.id, chat.accessHash),
      maxId: fixedMaxId
    }));
  } else if (isChannel) {
    await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ReadDiscussion({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
      msgId: Number(threadId),
      readMaxId: fixedMaxId
    }));
  } else {
    const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ReadHistory({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
      maxId: fixedMaxId
    }));
    if (result) {
      (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_18__.processAffectedHistory)(chat, result);
    }
  }
  if (threadId === _types__WEBPACK_IMPORTED_MODULE_2__.MAIN_THREAD_ID) {
    void (0,_chats__WEBPACK_IMPORTED_MODULE_20__.requestChatUpdate)({
      chat,
      noLastMessage: true
    });
  } else if (chat.isForum) {
    onUpdate({
      '@type': 'updateTopic',
      chatId: chat.id,
      topicId: Number(threadId)
    });
  }
}
async function markMessagesRead(_ref16) {
  let {
    chat,
    messageIds
  } = _ref16;
  const isChannel = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.getEntityTypeById)(chat.id) === 'channel';
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(isChannel ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ReadMessageContents({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputEntity)(chat.id, chat.accessHash),
    id: messageIds
  }) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ReadMessageContents({
    id: messageIds
  }));
  if (!result) {
    return;
  }
  if (result !== true) {
    (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_18__.processAffectedHistory)(chat, result);
  }
  onUpdate({
    ...(isChannel ? {
      '@type': 'updateChannelMessages',
      channelId: chat.id
    } : {
      '@type': 'updateCommonBoxMessages'
    }),
    ids: messageIds,
    messageUpdate: {
      hasUnreadMention: false,
      isMediaUnread: false
    }
  });
}
async function fetchMessageViews(_ref17) {
  let {
    chat,
    ids,
    shouldIncrement
  } = _ref17;
  const chunks = (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_6__.split)(ids, _config__WEBPACK_IMPORTED_MODULE_3__.API_GENERAL_ID_LIMIT);
  const results = await Promise.all(chunks.map(chunkIds => (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetMessagesViews({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    id: chunkIds,
    increment: shouldIncrement
  }))));
  if (!results || results.some(result => !result)) return undefined;
  const viewsList = results.flatMap(result => result.views);
  const users = results.flatMap(result => result.users);
  const chats = results.flatMap(result => result.chats);
  const viewsInfo = ids.map((id, index) => {
    const {
      views,
      forwards,
      replies
    } = viewsList[index];
    return {
      id,
      views,
      forwards,
      threadInfo: replies ? (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiThreadInfo)(replies, id, chat.id) : undefined
    };
  });
  return {
    viewsInfo,
    users: users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean),
    chats: chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean)
  };
}
async function fetchFactChecks(_ref18) {
  let {
    chat,
    ids
  } = _ref18;
  const chunks = (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_6__.split)(ids, _config__WEBPACK_IMPORTED_MODULE_3__.API_GENERAL_ID_LIMIT);
  const results = await Promise.all(chunks.map(chunkIds => (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetFactCheck({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    msgId: chunkIds
  }))));
  if (!results || results.some(result => !result)) return undefined;
  return results.flatMap(result => result).map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiFactCheck);
}
async function fetchDiscussionMessage(_ref19) {
  let {
    chat,
    messageId
  } = _ref19;
  const [result, replies] = await Promise.all([(0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetDiscussionMessage({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    msgId: messageId
  }), {
    abortControllerChatId: chat.id,
    abortControllerThreadId: messageId
  }), fetchMessages({
    chat,
    threadId: messageId,
    offsetId: 1,
    addOffset: -1,
    limit: 1
  })]);
  if (!result || !replies) return undefined;
  updateLocalDb(result);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean).concat(replies.chats);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean).concat(replies.users);
  const topMessages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage).filter(Boolean);
  const messages = topMessages.concat(replies.messages);
  const threadId = result.messages[result.messages.length - 1]?.id;
  if (!threadId) return undefined;
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)(result.messages);
  const {
    unreadCount,
    maxId,
    readInboxMaxId,
    readOutboxMaxId
  } = result;
  return {
    chats,
    users,
    messages,
    topMessages,
    unreadCount,
    threadId,
    lastReadInboxMessageId: readInboxMaxId,
    lastReadOutboxMessageId: readOutboxMaxId,
    lastMessageId: maxId,
    chatId: topMessages[0]?.chatId,
    firstMessageId: replies.messages[0]?.id
  };
}
async function searchMessagesLocal(_ref20) {
  let {
    chat,
    isSavedDialog,
    savedTag,
    type,
    query,
    threadId,
    minDate,
    maxDate,
    ...pagination
  } = _ref20;
  let filter;
  switch (type) {
    case 'media':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterPhotoVideo();
      break;
    case 'documents':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterDocument();
      break;
    case 'links':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterUrl();
      break;
    case 'audio':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterMusic();
      break;
    case 'voice':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterRoundVoice();
      break;
    case 'profilePhoto':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterChatPhotos();
      break;
    case 'text':
    default:
      {
        filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterEmpty();
      }
  }
  const peer = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash);
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.Search({
    peer: isSavedDialog ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerSelf() : peer,
    savedPeerId: isSavedDialog ? peer : undefined,
    savedReaction: savedTag && [(0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputReaction)(savedTag)],
    topMsgId: threadId !== _types__WEBPACK_IMPORTED_MODULE_2__.MAIN_THREAD_ID && !isSavedDialog ? Number(threadId) : undefined,
    filter,
    q: query || '',
    minDate,
    maxDate,
    ...pagination
  }), {
    abortControllerChatId: chat.id,
    abortControllerThreadId: threadId
  });
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified || !result.messages) {
    return undefined;
  }
  updateLocalDb(result);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage).filter(Boolean);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)(result.messages);
  let totalCount = messages.length;
  let nextOffsetId;
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesSlice || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ChannelMessages) {
    totalCount = result.count;
    if (messages.length) {
      nextOffsetId = messages[messages.length - 1].id;
    }
  }
  return {
    chats,
    users,
    messages,
    totalCount,
    nextOffsetId
  };
}
async function searchMessagesGlobal(_ref21) {
  let {
    query,
    offsetRate = 0,
    limit,
    type = 'text',
    minDate,
    maxDate
  } = _ref21;
  let filter;
  switch (type) {
    case 'media':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterPhotoVideo();
      break;
    case 'documents':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterDocument();
      break;
    case 'links':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterUrl();
      break;
    case 'audio':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterMusic();
      break;
    case 'voice':
      filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterRoundVoice();
      break;
    case 'text':
    default:
      {
        if (!query && !(maxDate && minDate)) {
          return undefined;
        }
        filter = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterEmpty();
      }
  }
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SearchGlobal({
    q: query,
    offsetRate,
    offsetPeer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerEmpty(),
    broadcastsOnly: type === 'channels' || undefined,
    limit,
    filter,
    folderId: _config__WEBPACK_IMPORTED_MODULE_3__.ALL_FOLDER_ID,
    minDate,
    maxDate
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified || !result.messages) {
    return undefined;
  }
  updateLocalDb({
    chats: result.chats,
    users: result.users,
    messages: result.messages
  });
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage).filter(Boolean);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)(result.messages);
  let totalCount = messages.length;
  let nextRate;
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesSlice || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ChannelMessages) {
    totalCount = result.count;
    if (messages.length) {
      nextRate = messages[messages.length - 1].id;
    }
  }
  return {
    messages,
    users,
    chats,
    totalCount,
    nextRate: 'nextRate' in result && result.nextRate ? result.nextRate : nextRate
  };
}
async function fetchWebPagePreview(_ref22) {
  let {
    text
  } = _ref22;
  const textWithEntities = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputTextWithEntities)(text);
  const preview = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetWebPagePreview({
    message: textWithEntities.text,
    entities: textWithEntities.entities
  }));
  return preview && (0,_apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_12__.buildWebPage)(preview);
}
async function sendPollVote(_ref23) {
  let {
    chat,
    messageId,
    options
  } = _ref23;
  const {
    id,
    accessHash
  } = chat;
  await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SendVote({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(id, accessHash),
    msgId: messageId,
    options: options.map(_helpers__WEBPACK_IMPORTED_MODULE_17__.deserializeBytes)
  }));
}
async function closePoll(_ref24) {
  let {
    chat,
    messageId,
    poll
  } = _ref24;
  const {
    id,
    accessHash
  } = chat;
  await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.EditMessage({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(id, accessHash),
    id: messageId,
    media: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPollFromExisting)(poll, true)
  }));
}
async function loadPollOptionResults(_ref25) {
  let {
    chat,
    messageId,
    option,
    offset,
    limit,
    shouldResetVoters
  } = _ref25;
  const {
    id,
    accessHash
  } = chat;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetPollVotes({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(id, accessHash),
    id: messageId,
    ...(option && {
      option: (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.deserializeBytes)(option)
    }),
    ...(offset && {
      offset
    }),
    ...(limit && {
      limit
    })
  }));
  if (!result) {
    return undefined;
  }
  updateLocalDb({
    chats: result.chats,
    users: result.users,
    messages: []
  });
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  const votes = result.votes.map(vote => ({
    peerId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_14__.getApiChatIdFromMtpPeer)(vote.peer),
    date: vote.date
  }));
  return {
    count: result.count,
    votes,
    chats,
    users,
    nextOffset: result.nextOffset,
    shouldResetVoters
  };
}
async function fetchExtendedMedia(_ref26) {
  let {
    chat,
    ids
  } = _ref26;
  await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetExtendedMedia({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    id: ids
  }));
}
async function forwardMessages(_ref27) {
  let {
    fromChat,
    toChat,
    toThreadId,
    messages,
    isSilent,
    scheduledAt,
    sendAs,
    withMyScore,
    noAuthors,
    noCaptions,
    isCurrentUserPremium,
    wasDrafted,
    lastMessageId
  } = _ref27;
  const messageIds = messages.map(_ref28 => {
    let {
      id
    } = _ref28;
    return id;
  });
  const randomIds = messages.map(_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.generateRandomBigInt);
  const localMessages = {};
  messages.forEach((message, index) => {
    const localMessage = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildLocalForwardedMessage)({
      toChat,
      toThreadId: Number(toThreadId),
      message,
      scheduledAt,
      noAuthors,
      noCaptions,
      isCurrentUserPremium,
      lastMessageId
    });
    localMessages[randomIds[index].toString()] = localMessage;
    onUpdate({
      '@type': localMessage.isScheduled ? 'newScheduledMessage' : 'newMessage',
      id: localMessage.id,
      chatId: toChat.id,
      message: localMessage,
      wasDrafted
    });
  });
  try {
    const update = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ForwardMessages({
      fromPeer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(fromChat.id, fromChat.accessHash),
      toPeer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(toChat.id, toChat.accessHash),
      randomId: randomIds,
      id: messageIds,
      withMyScore: withMyScore || undefined,
      silent: isSilent || undefined,
      dropAuthor: noAuthors || undefined,
      dropMediaCaptions: noCaptions || undefined,
      ...(toThreadId && {
        topMsgId: Number(toThreadId)
      }),
      ...(scheduledAt && {
        scheduleDate: scheduledAt
      }),
      ...(sendAs && {
        sendAs: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(sendAs.id, sendAs.accessHash)
      })
    }), {
      shouldThrow: true,
      shouldIgnoreUpdates: true
    });
    if (update) handleMultipleLocalMessagesUpdate(localMessages, update);
  } catch (error) {
    Object.values(localMessages).forEach(localMessage => {
      onUpdate({
        '@type': 'updateMessageSendFailed',
        chatId: toChat.id,
        localId: localMessage.id,
        error: error.message
      });
    });
  }
}
async function findFirstMessageIdAfterDate(_ref29) {
  let {
    chat,
    timestamp
  } = _ref29;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetHistory({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    offsetDate: timestamp,
    addOffset: -1,
    limit: 1
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified || !result.messages || !result.messages.length) {
    return undefined;
  }
  return result.messages[0].id;
}
async function fetchScheduledHistory(_ref30) {
  let {
    chat
  } = _ref30;
  const {
    id,
    accessHash
  } = chat;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetScheduledHistory({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(id, accessHash)
  }), {
    abortControllerChatId: id
  });
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified || !result.messages) {
    return undefined;
  }
  updateLocalDb(result);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage).filter(Boolean);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)(result.messages);
  return {
    messages
  };
}
async function sendScheduledMessages(_ref31) {
  let {
    chat,
    ids
  } = _ref31;
  const {
    id,
    accessHash
  } = chat;
  await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SendScheduledMessages({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(id, accessHash),
    id: ids
  }));
}
function updateLocalDb(result) {
  (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.addEntitiesToLocalDb)(result.chats);
  result.messages.forEach(message => {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.addMessageToLocalDb)(message);
  });
}
async function fetchPinnedMessages(_ref32) {
  let {
    chat,
    threadId
  } = _ref32;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.Search({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    filter: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputMessagesFilterPinned(),
    q: '',
    limit: _config__WEBPACK_IMPORTED_MODULE_3__.PINNED_MESSAGES_LIMIT,
    topMsgId: Number(threadId)
  }), {
    abortControllerChatId: chat.id,
    abortControllerThreadId: threadId
  });
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified || !result.messages) {
    return undefined;
  }
  updateLocalDb(result);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage).filter(Boolean);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)(result.messages);
  return {
    messages,
    users,
    chats
  };
}
async function fetchSeenBy(_ref33) {
  let {
    chat,
    messageId
  } = _ref33;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetMessageReadParticipants({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    msgId: messageId
  }));
  return result ? result.reduce((acc, readDate) => {
    acc[readDate.userId.toString()] = readDate.date;
    return acc;
  }, {}) : undefined;
}
async function fetchSendAs(_ref34) {
  let {
    chat
  } = _ref34;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.GetSendAs({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash)
  }), {
    shouldIgnoreErrors: true,
    abortControllerChatId: chat.id
  });
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.addEntitiesToLocalDb)(result.chats);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  return {
    users,
    chats,
    sendAs: result.peers.map(_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiSendAsPeerId)
  };
}
function saveDefaultSendAs(_ref35) {
  let {
    sendAs,
    chat
  } = _ref35;
  return (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SaveDefaultSendAs({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    sendAs: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(sendAs.id, sendAs.accessHash)
  }));
}
async function fetchSponsoredMessages(_ref36) {
  let {
    chat
  } = _ref36;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.GetSponsoredMessages({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SponsoredMessagesEmpty || !result.messages.length) {
    return undefined;
  }
  updateLocalDb(result);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiSponsoredMessage).filter(Boolean);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  return {
    messages,
    users,
    chats
  };
}
async function viewSponsoredMessage(_ref37) {
  let {
    chat,
    random
  } = _ref37;
  await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ViewSponsoredMessage({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    randomId: (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.deserializeBytes)(random)
  }));
}
function clickSponsoredMessage(_ref38) {
  let {
    chat,
    random
  } = _ref38;
  return (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ClickSponsoredMessage({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    randomId: (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.deserializeBytes)(random)
  }));
}
async function readAllMentions(_ref39) {
  let {
    chat
  } = _ref39;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ReadMentions({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash)
  }));
  if (!result) return;
  (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_18__.processAffectedHistory)(chat, result);
  if (result.offset) {
    await readAllMentions({
      chat
    });
  }
}
async function readAllReactions(_ref40) {
  let {
    chat
  } = _ref40;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ReadReactions({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash)
  }));
  if (!result) return;
  (0,_updates_updateManager__WEBPACK_IMPORTED_MODULE_18__.processAffectedHistory)(chat, result);
  if (result.offset) {
    await readAllReactions({
      chat
    });
  }
}
async function fetchUnreadMentions(_ref41) {
  let {
    chat,
    ...pagination
  } = _ref41;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetUnreadMentions({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    limit: _config__WEBPACK_IMPORTED_MODULE_3__.MENTION_UNREAD_SLICE,
    ...pagination
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified || !result.messages) {
    return undefined;
  }
  updateLocalDb(result);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage).filter(Boolean);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)(result.messages);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  return {
    messages,
    users,
    chats
  };
}
async function fetchUnreadReactions(_ref42) {
  let {
    chat,
    ...pagination
  } = _ref42;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetUnreadReactions({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    limit: _config__WEBPACK_IMPORTED_MODULE_3__.REACTION_UNREAD_SLICE,
    ...pagination
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified || !result.messages) {
    return undefined;
  }
  updateLocalDb(result);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage).filter(Boolean);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)(result.messages);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  return {
    messages,
    users,
    chats
  };
}
async function transcribeAudio(_ref43) {
  let {
    chat,
    messageId
  } = _ref43;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.TranscribeAudio({
    msgId: messageId,
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash)
  }));
  if (!result) return undefined;
  onUpdate({
    '@type': 'updateTranscribedAudio',
    isPending: result.pending,
    transcriptionId: result.transcriptionId.toString(),
    text: result.text
  });
  return result.transcriptionId.toString();
}
async function translateText(params) {
  let result;
  const isMessageTranslation = ('chat' in params);
  if (isMessageTranslation) {
    const {
      chat,
      messageIds,
      toLanguageCode
    } = params;
    result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.TranslateText({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
      id: messageIds,
      toLang: toLanguageCode
    }));
  } else {
    const {
      text,
      toLanguageCode
    } = params;
    result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.TranslateText({
      text: text.map(t => (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputTextWithEntities)(t)),
      toLang: toLanguageCode
    }));
  }
  if (!result) return undefined;
  const formattedText = result.result.map(r => (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_11__.buildApiFormattedText)(r));
  if (isMessageTranslation) {
    onUpdate({
      '@type': 'updateMessageTranslations',
      chatId: params.chat.id,
      messageIds: params.messageIds,
      translations: formattedText,
      toLanguageCode: params.toLanguageCode
    });
  }
  return formattedText;
}
function handleMultipleLocalMessagesUpdate(localMessages, update) {
  if (!('updates' in update)) {
    (0,_client__WEBPACK_IMPORTED_MODULE_21__.handleGramJsUpdate)(update);
    return;
  }
  update.updates.forEach(u => {
    if (u instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateMessageID) {
      const localMessage = localMessages[u.randomId.toString()];
      handleLocalMessageUpdate(localMessage, u);
    } else {
      (0,_client__WEBPACK_IMPORTED_MODULE_21__.handleGramJsUpdate)(u);
    }
  });
}
function handleLocalMessageUpdate(localMessage, update) {
  let messageUpdate;
  if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateShortSentMessage || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateMessageID) {
    messageUpdate = update;
  } else if ('updates' in update) {
    messageUpdate = update.updates.find(u => u instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateMessageID);
  }
  if (!messageUpdate) {
    (0,_client__WEBPACK_IMPORTED_MODULE_21__.handleGramJsUpdate)(update);
    return;
  }
  let newContent;
  if (messageUpdate instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateShortSentMessage) {
    if (localMessage.content.text && messageUpdate.entities) {
      newContent = {
        text: (0,_apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_12__.buildMessageTextContent)(localMessage.content.text.text, messageUpdate.entities)
      };
    }
    if (messageUpdate.media) {
      newContent = {
        ...newContent,
        ...(0,_apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_12__.buildMessageMediaContent)(messageUpdate.media)
      };
    }
    const mtpMessage = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildMessageFromUpdate)(messageUpdate.id, localMessage.chatId, messageUpdate);
    (0,_helpers__WEBPACK_IMPORTED_MODULE_17__.addMessageToLocalDb)(mtpMessage);
  }

  // Edge case for "Send When Online"
  const isSentBefore = 'date' in messageUpdate && messageUpdate.date * 1000 < Date.now() + (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_8__.getServerTimeOffset)() * 1000;
  onUpdate({
    '@type': localMessage.isScheduled && !isSentBefore ? 'updateScheduledMessageSendSucceeded' : 'updateMessageSendSucceeded',
    chatId: localMessage.chatId,
    localId: localMessage.id,
    message: {
      ...localMessage,
      ...(newContent && {
        content: {
          ...localMessage.content,
          ...newContent
        }
      }),
      id: messageUpdate.id,
      sendingState: undefined,
      ...('date' in messageUpdate && {
        date: messageUpdate.date
      })
    }
  });
  (0,_client__WEBPACK_IMPORTED_MODULE_21__.handleGramJsUpdate)(update);
}
async function fetchOutboxReadDate(_ref44) {
  let {
    chat,
    messageId
  } = _ref44;
  const {
    id,
    accessHash
  } = chat;
  const peer = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(id, accessHash);
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetOutboxReadDate({
    peer: peer,
    msgId: messageId
  }), {
    shouldThrow: true
  });
  if (!result) return undefined;
  return {
    date: result.date
  };
}
async function fetchQuickReplies() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetQuickReplies({}));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.QuickRepliesNotModified) return undefined;
  updateLocalDb(result);
  const messages = result.messages.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiMessage).filter(Boolean);
  (0,_updates_updater__WEBPACK_IMPORTED_MODULE_19__.dispatchThreadInfoUpdates)(result.messages);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_10__.buildApiChatFromPreview)(c)).filter(Boolean);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_15__.buildApiUser).filter(Boolean);
  const quickReplies = result.quickReplies.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_13__.buildApiQuickReply);
  return {
    messages,
    chats,
    users,
    quickReplies
  };
}
async function sendQuickReply(_ref45) {
  let {
    chat,
    shortcutId
  } = _ref45;
  // Remove this request when the client fully supports quick replies and caches them
  const messages = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetQuickReplyMessages({
    shortcutId
  }));
  if (!messages || messages instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.MessagesNotModified) return;
  const ids = messages.messages.map(m => m.id);
  const randomIds = ids.map(_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.generateRandomBigInt);
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SendQuickReplyMessages({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputPeer)(chat.id, chat.accessHash),
    shortcutId,
    id: ids,
    randomId: randomIds
  }), {
    shouldIgnoreUpdates: true
  });
  if (!result) return;

  // Hack to prevent client from thinking that those messages were local
  if ('updates' in result) {
    const filteredUpdates = result.updates.filter(u => !(u instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateMessageID));
    result.updates = filteredUpdates;
  }
  (0,_client__WEBPACK_IMPORTED_MODULE_21__.handleGramJsUpdate)(result);
}
async function exportMessageLink(_ref46) {
  let {
    id,
    chat,
    shouldIncludeThread,
    shouldIncludeGrouped
  } = _ref46;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_21__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ExportMessageLink({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_16__.buildInputEntity)(chat.id, chat.accessHash),
    id,
    thread: shouldIncludeThread || undefined,
    grouped: shouldIncludeGrouped || undefined
  }));
  return result?.link;
}

/***/ }),

/***/ "./src/api/gramjs/methods/payments.ts":
/*!********************************************!*\
  !*** ./src/api/gramjs/methods/payments.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyBoost: () => (/* binding */ applyBoost),
/* harmony export */   applyGiftCode: () => (/* binding */ applyGiftCode),
/* harmony export */   checkGiftCode: () => (/* binding */ checkGiftCode),
/* harmony export */   fetchBoostList: () => (/* binding */ fetchBoostList),
/* harmony export */   fetchBoostStatus: () => (/* binding */ fetchBoostStatus),
/* harmony export */   fetchGiveawayInfo: () => (/* binding */ fetchGiveawayInfo),
/* harmony export */   fetchMyBoosts: () => (/* binding */ fetchMyBoosts),
/* harmony export */   fetchPremiumPromo: () => (/* binding */ fetchPremiumPromo),
/* harmony export */   fetchStarsStatus: () => (/* binding */ fetchStarsStatus),
/* harmony export */   fetchStarsTopupOptions: () => (/* binding */ fetchStarsTopupOptions),
/* harmony export */   fetchStarsTransactions: () => (/* binding */ fetchStarsTransactions),
/* harmony export */   fetchTemporaryPaymentPassword: () => (/* binding */ fetchTemporaryPaymentPassword),
/* harmony export */   getPaymentForm: () => (/* binding */ getPaymentForm),
/* harmony export */   getPremiumGiftCodeOptions: () => (/* binding */ getPremiumGiftCodeOptions),
/* harmony export */   getReceipt: () => (/* binding */ getReceipt),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   launchPrepaidGiveaway: () => (/* binding */ launchPrepaidGiveaway),
/* harmony export */   sendPaymentForm: () => (/* binding */ sendPaymentForm),
/* harmony export */   sendStarPaymentForm: () => (/* binding */ sendStarPaymentForm),
/* harmony export */   validateRequestedInfo: () => (/* binding */ validateRequestedInfo)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/payments */ "./src/api/gramjs/apiBuilders/payments.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");
/* harmony import */ var _twoFaSettings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./twoFaSettings */ "./src/api/gramjs/methods/twoFaSettings.ts");











let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
async function validateRequestedInfo(_ref) {
  let {
    inputInvoice,
    requestInfo,
    shouldSave
  } = _ref;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.ValidateRequestedInfo({
    invoice: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputInvoice)(inputInvoice),
    save: shouldSave || undefined,
    info: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildShippingInfo)(requestInfo)
  }));
  if (!result) {
    return undefined;
  }
  const {
    id,
    shippingOptions
  } = result;
  if (!id) {
    return undefined;
  }
  return {
    id,
    shippingOptions: (0,_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildShippingOptions)(shippingOptions)
  };
}
async function sendPaymentForm(_ref2) {
  let {
    inputInvoice,
    formId,
    requestedInfoId,
    shippingOptionId,
    credentials,
    savedCredentialId,
    temporaryPassword,
    tipAmount
  } = _ref2;
  const inputCredentials = temporaryPassword && savedCredentialId ? new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPaymentCredentialsSaved({
    id: savedCredentialId,
    tmpPassword: (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.deserializeBytes)(temporaryPassword)
  }) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPaymentCredentials({
    save: credentials.save,
    data: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DataJSON({
      data: JSON.stringify(credentials.data)
    })
  });
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.SendPaymentForm({
    formId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(formId),
    invoice: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputInvoice)(inputInvoice),
    requestedInfoId,
    shippingOptionId,
    credentials: inputCredentials,
    ...(tipAmount && {
      tipAmount: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(tipAmount)
    })
  }));
  if (!result) return false;
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.PaymentVerificationNeeded) {
    onUpdate({
      '@type': 'updatePaymentVerificationNeeded',
      url: result.url
    });
    return undefined;
  } else {
    (0,_client__WEBPACK_IMPORTED_MODULE_9__.handleGramJsUpdate)(result.updates);
  }
  return Boolean(result);
}
async function sendStarPaymentForm(_ref3) {
  let {
    formId,
    inputInvoice
  } = _ref3;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.SendStarsForm({
    formId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(formId),
    invoice: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputInvoice)(inputInvoice)
  }));
  if (!result) return false;
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.PaymentVerificationNeeded) {
    if (_config__WEBPACK_IMPORTED_MODULE_2__.DEBUG) {
      // eslint-disable-next-line no-console
      console.warn('Unexpected PaymentVerificationNeeded in sendStarsForm');
    }
    return undefined;
  } else {
    (0,_client__WEBPACK_IMPORTED_MODULE_9__.handleGramJsUpdate)(result.updates);
  }
  return Boolean(result);
}
async function getPaymentForm(inputInvoice, theme) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.GetPaymentForm({
    invoice: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputInvoice)(inputInvoice),
    themeParams: theme ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputThemeParams)(theme) : undefined
  }));
  if (!result) {
    return undefined;
  }
  if (result.photo) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addWebDocumentToLocalDb)(result.photo);
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  return {
    form: (0,_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiPaymentForm)(result),
    invoice: (0,_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiInvoiceFromForm)(result),
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean)
  };
}
async function getReceipt(chat, msgId) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.GetPaymentReceipt({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(chat.id, chat.accessHash),
    msgId
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  return {
    receipt: (0,_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiReceipt)(result),
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean)
  };
}
async function fetchPremiumPromo() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.GetPremiumPromo());
  if (!result) return undefined;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean);
  result.videos.forEach(video => {
    if (video instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
      _localDb__WEBPACK_IMPORTED_MODULE_8__["default"].documents[video.id.toString()] = video;
    }
  });
  return {
    promo: (0,_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiPremiumPromo)(result),
    users
  };
}
async function fetchTemporaryPaymentPassword(password) {
  const result = await (0,_twoFaSettings__WEBPACK_IMPORTED_MODULE_10__.getTemporaryPaymentPassword)(password);
  if (!result) {
    return undefined;
  }
  if ('error' in result) {
    return result;
  }
  return {
    value: (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.serializeBytes)(result.tmpPassword),
    validUntil: result.validUntil
  };
}
async function fetchMyBoosts() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.premium.GetMyBoosts());
  if (!result) return undefined;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.chats);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean);
  const boosts = result.myBoosts.map(_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiMyBoost);
  return {
    users,
    chats,
    boosts
  };
}
async function applyBoost(_ref4) {
  let {
    chat,
    slots
  } = _ref4;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.premium.ApplyBoost({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(chat.id, chat.accessHash),
    slots
  }));
  if (!result) return undefined;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.chats);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean);
  const boosts = result.myBoosts.map(_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiMyBoost);
  return {
    users,
    chats,
    boosts
  };
}
async function fetchBoostStatus(_ref5) {
  let {
    chat
  } = _ref5;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.premium.GetBoostsStatus({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(chat.id, chat.accessHash)
  }));
  if (!result) {
    return undefined;
  }
  return (0,_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiBoostsStatus)(result);
}
async function fetchBoostList(_ref6) {
  let {
    chat,
    isGifts,
    offset = '',
    limit
  } = _ref6;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.premium.GetBoostsList({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(chat.id, chat.accessHash),
    gifts: isGifts || undefined,
    offset,
    limit
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean);
  const boostList = result.boosts.map(_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiBoost);
  return {
    count: result.count,
    boostList,
    users,
    nextOffset: result.nextOffset
  };
}
async function fetchGiveawayInfo(_ref7) {
  let {
    peer,
    messageId
  } = _ref7;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.GetGiveawayInfo({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(peer.id, peer.accessHash),
    msgId: messageId
  }));
  if (!result) {
    return undefined;
  }
  return (0,_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiGiveawayInfo)(result);
}
async function checkGiftCode(_ref8) {
  let {
    slug
  } = _ref8;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.CheckGiftCode({
    slug
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.chats);
  return {
    code: (0,_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiCheckedGiftCode)(result),
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean),
    chats: result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean)
  };
}
function applyGiftCode(_ref9) {
  let {
    slug
  } = _ref9;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.ApplyGiftCode({
    slug
  }), {
    shouldReturnTrue: true
  });
}
async function getPremiumGiftCodeOptions(_ref10) {
  let {
    chat
  } = _ref10;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.GetPremiumGiftCodeOptions({
    boostPeer: chat && (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(chat.id, chat.accessHash)
  }));
  if (!result) {
    return undefined;
  }
  return result.map(_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiPremiumGiftCodeOption);
}
function launchPrepaidGiveaway(_ref11) {
  let {
    chat,
    giveawayId,
    paymentPurpose
  } = _ref11;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.LaunchPrepaidGiveaway({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(chat.id, chat.accessHash),
    giveawayId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(giveawayId),
    purpose: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputStorePaymentPurpose)(paymentPurpose)
  }), {
    shouldReturnTrue: true
  });
}
async function fetchStarsStatus() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.GetStarsStatus({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerSelf()
  }));
  if (!result) {
    return undefined;
  }
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean);
  return {
    users,
    chats,
    nextOffset: result.nextOffset,
    history: result.history.map(_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiStarsTransaction),
    balance: result.balance.toJSNumber()
  };
}
async function fetchStarsTransactions(_ref12) {
  let {
    offset,
    isInbound,
    isOutbound
  } = _ref12;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.GetStarsTransactions({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerSelf(),
    offset,
    inbound: isInbound,
    outbound: isOutbound
  }));
  if (!result) {
    return undefined;
  }
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean);
  return {
    users,
    chats,
    nextOffset: result.nextOffset,
    history: result.history.map(_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiStarsTransaction),
    balance: result.balance.toJSNumber()
  };
}
async function fetchStarsTopupOptions() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.payments.GetStarsTopupOptions());
  if (!result) {
    return undefined;
  }
  return result.map(_apiBuilders_payments__WEBPACK_IMPORTED_MODULE_4__.buildApiStarTopupOption);
}

/***/ }),

/***/ "./src/api/gramjs/methods/phoneCallState.ts":
/*!**************************************************!*\
  !*** ./src/api/gramjs/methods/phoneCallState.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   acceptPhoneCall: () => (/* binding */ acceptPhoneCall),
/* harmony export */   confirmPhoneCall: () => (/* binding */ confirmPhoneCall),
/* harmony export */   createPhoneCallState: () => (/* binding */ createPhoneCallState),
/* harmony export */   decodePhoneCallData: () => (/* binding */ decodePhoneCallData),
/* harmony export */   destroyPhoneCallState: () => (/* binding */ destroyPhoneCallState),
/* harmony export */   encodePhoneCallData: () => (/* binding */ encodePhoneCallData),
/* harmony export */   generateEmojiFingerprint: () => (/* binding */ generateEmojiFingerprint),
/* harmony export */   requestPhoneCall: () => (/* binding */ requestPhoneCall)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs_crypto_AuthKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs/crypto/AuthKey */ "./src/lib/gramjs/crypto/AuthKey.js");
/* harmony import */ var _lib_gramjs_crypto_AuthKey__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_crypto_AuthKey__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_gramjs_extensions_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/gramjs/extensions/Logger */ "./src/lib/gramjs/extensions/Logger.js");
/* harmony import */ var _lib_gramjs_extensions_Logger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_extensions_Logger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/gramjs/Helpers */ "./src/lib/gramjs/Helpers.js");
/* harmony import */ var _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_gramjs_network_MTProtoState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../lib/gramjs/network/MTProtoState */ "./src/lib/gramjs/network/MTProtoState.js");
/* harmony import */ var _lib_gramjs_network_MTProtoState__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_network_MTProtoState__WEBPACK_IMPORTED_MODULE_4__);
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





let currentPhoneCallState;
class PhoneCallState {
  constructor(isOutgoing) {
    this.isOutgoing = isOutgoing;
    _defineProperty(this, "state", void 0);
    _defineProperty(this, "seq", 0);
    _defineProperty(this, "gA", void 0);
    _defineProperty(this, "gB", void 0);
    _defineProperty(this, "p", void 0);
    _defineProperty(this, "random", void 0);
    _defineProperty(this, "waitForState", void 0);
    _defineProperty(this, "resolveState", void 0);
    this.waitForState = new Promise(resolve => {
      this.resolveState = resolve;
    });
  }
  async requestCall(_ref) {
    let {
      p,
      g,
      random
    } = _ref;
    const pBN = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().readBigIntFromBuffer(Buffer.from(p), false);
    const randomBN = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().readBigIntFromBuffer(Buffer.from(random), false);
    const gA = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().modExp(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(g), randomBN, pBN);
    this.gA = gA;
    this.p = pBN;
    this.random = randomBN;
    const gAHash = await _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().sha256(_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().getByteArray(gA));
    return Array.from(gAHash);
  }
  acceptCall(_ref2) {
    let {
      p,
      g,
      random
    } = _ref2;
    const pLast = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().readBigIntFromBuffer(p, false);
    const randomLast = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().readBigIntFromBuffer(random, false);
    const gB = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().modExp(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(g), randomLast, pLast);
    this.gB = gB;
    this.p = pLast;
    this.random = randomLast;
    return Array.from(_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().getByteArray(gB));
  }
  async confirmCall(gAOrB, emojiData, emojiOffsets) {
    if (this.isOutgoing) {
      this.gB = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().readBigIntFromBuffer(Buffer.from(gAOrB), false);
    } else {
      this.gA = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().readBigIntFromBuffer(Buffer.from(gAOrB), false);
    }
    const authKey = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().modExp(!this.isOutgoing ? this.gA : this.gB, this.random, this.p);
    const fingerprint = await _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().sha1(_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().getByteArray(authKey));
    const keyFingerprint = _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().readBigIntFromBuffer(fingerprint.slice(-8).reverse(), false);
    const emojis = await generateEmojiFingerprint(_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().getByteArray(authKey), _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().getByteArray(this.gA), emojiData, emojiOffsets);
    const key = new (_lib_gramjs_crypto_AuthKey__WEBPACK_IMPORTED_MODULE_1___default())();
    await key.setKey(_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().getByteArray(authKey));
    this.state = new (_lib_gramjs_network_MTProtoState__WEBPACK_IMPORTED_MODULE_4___default())(key, new (_lib_gramjs_extensions_Logger__WEBPACK_IMPORTED_MODULE_2___default())(), true, this.isOutgoing);
    this.resolveState();
    return {
      gA: Array.from(_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().getByteArray(this.gA)),
      keyFingerprint: keyFingerprint.toString(),
      emojis
    };
  }
  async encode(data) {
    if (!this.state) return undefined;
    const seqArray = new Uint32Array(1);
    seqArray[0] = this.seq++;
    const encodedData = await this.state.encryptMessageData(Buffer.concat([_lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().convertToLittle(seqArray), Buffer.from(data)]));
    return Array.from(encodedData);
  }
  async decode(data) {
    if (!this.state) {
      return this.waitForState.then(() => {
        return this.decode(data);
      });
    }
    const message = await this.state.decryptMessageData(Buffer.from(data));
    return JSON.parse(message.toString());
  }
}

// https://github.com/TelegramV/App/blob/ead52320975362139cabad18cf8346f98c349a22/src/js/MTProto/Calls/Internal.js#L72
function computeEmojiIndex(bytes) {
  return big_integer__WEBPACK_IMPORTED_MODULE_0___default()(bytes[0]).and(0x7F).shiftLeft(56).or(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(bytes[1]).shiftLeft(48)).or(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(bytes[2]).shiftLeft(40)).or(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(bytes[3]).shiftLeft(32)).or(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(bytes[4]).shiftLeft(24)).or(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(bytes[5]).shiftLeft(16)).or(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(bytes[6]).shiftLeft(8)).or(big_integer__WEBPACK_IMPORTED_MODULE_0___default()(bytes[7]));
}
async function generateEmojiFingerprint(authKey, gA, emojiData, emojiOffsets) {
  const hash = await _lib_gramjs_Helpers__WEBPACK_IMPORTED_MODULE_3___default().sha256(Buffer.concat([new Uint8Array(authKey), new Uint8Array(gA)]));
  const result = [];
  const emojiCount = emojiOffsets.length - 1;
  const kPartSize = 8;
  for (let partOffset = 0; partOffset !== hash.byteLength; partOffset += kPartSize) {
    const value = computeEmojiIndex(hash.subarray(partOffset, partOffset + kPartSize));
    const index = value.modPow(1, emojiCount).toJSNumber();
    const offset = emojiOffsets[index];
    const size = emojiOffsets[index + 1] - offset;
    result.push(String.fromCharCode(...emojiData.subarray(offset, offset + size)));
  }
  return result.join('');
}
function createPhoneCallState(params) {
  currentPhoneCallState = new PhoneCallState(...params);
}
function destroyPhoneCallState() {
  currentPhoneCallState = undefined;
}
function encodePhoneCallData(params) {
  return currentPhoneCallState.encode(...params);
}
async function decodePhoneCallData(params) {
  if (!currentPhoneCallState) {
    return undefined;
  }
  const result = await currentPhoneCallState.decode(...params);
  return result;
}
function confirmPhoneCall(params) {
  return currentPhoneCallState.confirmCall(...params);
}
function acceptPhoneCall(params) {
  return currentPhoneCallState.acceptCall(...params);
}
function requestPhoneCall(params) {
  return currentPhoneCallState.requestCall(...params);
}

/***/ }),

/***/ "./src/api/gramjs/methods/reactions.ts":
/*!*********************************************!*\
  !*** ./src/api/gramjs/methods/reactions.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearRecentReactions: () => (/* binding */ clearRecentReactions),
/* harmony export */   fetchAvailableEffects: () => (/* binding */ fetchAvailableEffects),
/* harmony export */   fetchAvailableReactions: () => (/* binding */ fetchAvailableReactions),
/* harmony export */   fetchDefaultTagReactions: () => (/* binding */ fetchDefaultTagReactions),
/* harmony export */   fetchMessageReactions: () => (/* binding */ fetchMessageReactions),
/* harmony export */   fetchMessageReactionsList: () => (/* binding */ fetchMessageReactionsList),
/* harmony export */   fetchRecentReactions: () => (/* binding */ fetchRecentReactions),
/* harmony export */   fetchSavedReactionTags: () => (/* binding */ fetchSavedReactionTags),
/* harmony export */   fetchTopReactions: () => (/* binding */ fetchTopReactions),
/* harmony export */   sendEmojiInteraction: () => (/* binding */ sendEmojiInteraction),
/* harmony export */   sendReaction: () => (/* binding */ sendReaction),
/* harmony export */   sendWatchingEmojiInteraction: () => (/* binding */ sendWatchingEmojiInteraction),
/* harmony export */   setDefaultReaction: () => (/* binding */ setDefaultReaction),
/* harmony export */   updateSavedReactionTag: () => (/* binding */ updateSavedReactionTag)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/reactions */ "./src/api/gramjs/apiBuilders/reactions.ts");
/* harmony import */ var _apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../apiBuilders/symbols */ "./src/api/gramjs/apiBuilders/symbols.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");












function sendWatchingEmojiInteraction(_ref) {
  let {
    chat,
    emoticon
  } = _ref;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SetTyping({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__.buildInputPeer)(chat.id, chat.accessHash),
    action: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.SendMessageEmojiInteractionSeen({
      emoticon
    })
  }), {
    abortControllerChatId: chat.id
  });
}
function sendEmojiInteraction(_ref2) {
  let {
    chat,
    emoticon,
    messageId,
    timestamps
  } = _ref2;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SetTyping({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__.buildInputPeer)(chat.id, chat.accessHash),
    action: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.SendMessageEmojiInteraction({
      emoticon,
      msgId: messageId,
      interaction: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.DataJSON({
        data: JSON.stringify({
          v: 1,
          a: timestamps.map(t => ({
            t,
            i: 1
          }))
        })
      })
    })
  }), {
    abortControllerChatId: chat.id
  });
}
async function fetchAvailableReactions() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetAvailableReactions({}));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.AvailableReactionsNotModified) {
    return undefined;
  }
  result.reactions.forEach(reaction => {
    if (reaction.staticIcon instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
      _localDb__WEBPACK_IMPORTED_MODULE_10__["default"].documents[String(reaction.staticIcon.id)] = reaction.staticIcon;
    }
    if (reaction.selectAnimation instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
      _localDb__WEBPACK_IMPORTED_MODULE_10__["default"].documents[String(reaction.selectAnimation.id)] = reaction.selectAnimation;
    }
    if (reaction.aroundAnimation instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
      _localDb__WEBPACK_IMPORTED_MODULE_10__["default"].documents[String(reaction.aroundAnimation.id)] = reaction.aroundAnimation;
    }
    if (reaction.appearAnimation instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
      _localDb__WEBPACK_IMPORTED_MODULE_10__["default"].documents[String(reaction.appearAnimation.id)] = reaction.appearAnimation;
    }
    if (reaction.centerIcon instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
      _localDb__WEBPACK_IMPORTED_MODULE_10__["default"].documents[String(reaction.centerIcon.id)] = reaction.centerIcon;
    }
  });
  return result.reactions.map(_apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_5__.buildApiAvailableReaction);
}
async function fetchAvailableEffects() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetAvailableEffects({}));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.AvailableEffectsNotModified) {
    return undefined;
  }
  const documentsMap = new Map(result.documents.map(doc => [String(doc.id), doc]));
  result.documents.forEach(document => {
    if (document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
      _localDb__WEBPACK_IMPORTED_MODULE_10__["default"].documents[String(document.id)] = document;
    }
  });
  const effects = result.effects.map(_apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_5__.buildApiAvailableEffect);
  const stickers = [];
  const emojis = [];
  for (const effect of effects) {
    if (effect.effectAnimationId) {
      const document = documentsMap.get(effect.effectStickerId);
      const emoji = document && (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_6__.buildStickerFromDocument)(document, false, effect.isPremium);
      if (emoji) emojis.push(emoji);
    } else {
      const document = _localDb__WEBPACK_IMPORTED_MODULE_10__["default"].documents[effect.effectStickerId];
      const sticker = (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_6__.buildStickerFromDocument)(document);
      if (sticker) {
        stickers.push(sticker);
      }
    }
  }
  return {
    effects,
    emojis,
    stickers
  };
}
function sendReaction(_ref3) {
  let {
    chat,
    messageId,
    reactions,
    shouldAddToRecent
  } = _ref3;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SendReaction({
    reaction: reactions?.map(r => (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__.buildInputReaction)(r)),
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__.buildInputPeer)(chat.id, chat.accessHash),
    msgId: messageId,
    ...(shouldAddToRecent && {
      addToRecent: true
    })
  }), {
    shouldReturnTrue: true,
    shouldThrow: true
  });
}
function fetchMessageReactions(_ref4) {
  let {
    ids,
    chat
  } = _ref4;
  const chunks = (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_3__.split)(ids, _config__WEBPACK_IMPORTED_MODULE_2__.API_GENERAL_ID_LIMIT);
  chunks.forEach(chunkIds => {
    (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetMessagesReactions({
      id: chunkIds,
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__.buildInputPeer)(chat.id, chat.accessHash)
    }), {
      shouldReturnTrue: true,
      abortControllerChatId: chat.id
    });
  });
}
async function fetchMessageReactionsList(_ref5) {
  let {
    chat,
    messageId,
    reaction,
    offset
  } = _ref5;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetMessageReactionsList({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__.buildInputPeer)(chat.id, chat.accessHash),
    id: messageId,
    ...(reaction && {
      reaction: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__.buildInputReaction)(reaction)
    }),
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.REACTION_LIST_LIMIT,
    ...(offset && {
      offset
    })
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_9__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_9__.addEntitiesToLocalDb)(result.chats);
  const {
    nextOffset,
    reactions,
    count
  } = result;
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_7__.buildApiUser).filter(Boolean),
    chats: result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_4__.buildApiChatFromPreview)(c)).filter(Boolean),
    nextOffset,
    reactions: reactions.map(_apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_5__.buildMessagePeerReaction).filter(Boolean),
    count
  };
}
function setDefaultReaction(_ref6) {
  let {
    reaction
  } = _ref6;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SetDefaultReaction({
    reaction: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__.buildInputReaction)(reaction)
  }));
}
async function fetchTopReactions(_ref7) {
  let {
    hash = '0'
  } = _ref7;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetTopReactions({
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.TOP_REACTIONS_LIMIT,
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ReactionsNotModified) {
    return undefined;
  }
  return {
    hash: String(result.hash),
    reactions: result.reactions.map(_apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_5__.buildApiReaction).filter(Boolean)
  };
}
async function fetchRecentReactions(_ref8) {
  let {
    hash = '0'
  } = _ref8;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetRecentReactions({
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.RECENT_REACTIONS_LIMIT,
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ReactionsNotModified) {
    return undefined;
  }
  return {
    hash: String(result.hash),
    reactions: result.reactions.map(_apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_5__.buildApiReaction).filter(Boolean)
  };
}
function clearRecentReactions() {
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ClearRecentReactions());
}
async function fetchDefaultTagReactions(_ref9) {
  let {
    hash = '0'
  } = _ref9;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetDefaultTagReactions({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ReactionsNotModified) {
    return undefined;
  }
  return {
    hash: String(result.hash),
    reactions: result.reactions.map(_apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_5__.buildApiReaction).filter(Boolean)
  };
}
async function fetchSavedReactionTags(_ref10) {
  let {
    hash = '0'
  } = _ref10;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetSavedReactionTags({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SavedReactionTagsNotModified) {
    return undefined;
  }
  return {
    hash: String(result.hash),
    tags: result.tags.map(_apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_5__.buildApiSavedReactionTag).filter(Boolean)
  };
}
function updateSavedReactionTag(_ref11) {
  let {
    reaction,
    title
  } = _ref11;
  return (0,_client__WEBPACK_IMPORTED_MODULE_11__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.UpdateSavedReactionTag({
    reaction: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_8__.buildInputReaction)(reaction),
    title
  }), {
    shouldReturnTrue: true
  });
}

/***/ }),

/***/ "./src/api/gramjs/methods/settings.ts":
/*!********************************************!*\
  !*** ./src/api/gramjs/methods/settings.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockUser: () => (/* binding */ blockUser),
/* harmony export */   checkUsername: () => (/* binding */ checkUsername),
/* harmony export */   deleteProfilePhotos: () => (/* binding */ deleteProfilePhotos),
/* harmony export */   fetchAppConfig: () => (/* binding */ fetchAppConfig),
/* harmony export */   fetchAuthorizations: () => (/* binding */ fetchAuthorizations),
/* harmony export */   fetchBlockedUsers: () => (/* binding */ fetchBlockedUsers),
/* harmony export */   fetchConfig: () => (/* binding */ fetchConfig),
/* harmony export */   fetchContentSettings: () => (/* binding */ fetchContentSettings),
/* harmony export */   fetchCountryList: () => (/* binding */ fetchCountryList),
/* harmony export */   fetchGlobalPrivacySettings: () => (/* binding */ fetchGlobalPrivacySettings),
/* harmony export */   fetchLangDifference: () => (/* binding */ fetchLangDifference),
/* harmony export */   fetchLangPack: () => (/* binding */ fetchLangPack),
/* harmony export */   fetchLanguage: () => (/* binding */ fetchLanguage),
/* harmony export */   fetchLanguages: () => (/* binding */ fetchLanguages),
/* harmony export */   fetchNotificationExceptions: () => (/* binding */ fetchNotificationExceptions),
/* harmony export */   fetchNotificationSettings: () => (/* binding */ fetchNotificationSettings),
/* harmony export */   fetchPeerColors: () => (/* binding */ fetchPeerColors),
/* harmony export */   fetchPrivacySettings: () => (/* binding */ fetchPrivacySettings),
/* harmony export */   fetchTimezones: () => (/* binding */ fetchTimezones),
/* harmony export */   fetchWallpapers: () => (/* binding */ fetchWallpapers),
/* harmony export */   fetchWebAuthorizations: () => (/* binding */ fetchWebAuthorizations),
/* harmony export */   oldFetchLangPack: () => (/* binding */ oldFetchLangPack),
/* harmony export */   oldFetchLangStrings: () => (/* binding */ oldFetchLangStrings),
/* harmony export */   registerDevice: () => (/* binding */ registerDevice),
/* harmony export */   reorderUsernames: () => (/* binding */ reorderUsernames),
/* harmony export */   setPrivacySettings: () => (/* binding */ setPrivacySettings),
/* harmony export */   terminateAllAuthorizations: () => (/* binding */ terminateAllAuthorizations),
/* harmony export */   terminateAllWebAuthorizations: () => (/* binding */ terminateAllWebAuthorizations),
/* harmony export */   terminateAuthorization: () => (/* binding */ terminateAuthorization),
/* harmony export */   terminateWebAuthorization: () => (/* binding */ terminateWebAuthorization),
/* harmony export */   toggleUsername: () => (/* binding */ toggleUsername),
/* harmony export */   unblockUser: () => (/* binding */ unblockUser),
/* harmony export */   unregisterDevice: () => (/* binding */ unregisterDevice),
/* harmony export */   updateContactSignUpNotification: () => (/* binding */ updateContactSignUpNotification),
/* harmony export */   updateContentSettings: () => (/* binding */ updateContentSettings),
/* harmony export */   updateGlobalPrivacySettings: () => (/* binding */ updateGlobalPrivacySettings),
/* harmony export */   updateIsOnline: () => (/* binding */ updateIsOnline),
/* harmony export */   updateNotificationSettings: () => (/* binding */ updateNotificationSettings),
/* harmony export */   updateProfile: () => (/* binding */ updateProfile),
/* harmony export */   updateProfilePhoto: () => (/* binding */ updateProfilePhoto),
/* harmony export */   updateUsername: () => (/* binding */ updateUsername),
/* harmony export */   uploadContactProfilePhoto: () => (/* binding */ uploadContactProfilePhoto),
/* harmony export */   uploadProfilePhoto: () => (/* binding */ uploadProfilePhoto),
/* harmony export */   uploadWallpaper: () => (/* binding */ uploadWallpaper)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _util_serverTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../util/serverTime */ "./src/util/serverTime.ts");
/* harmony import */ var _apiBuilders_appConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/appConfig */ "./src/api/gramjs/apiBuilders/appConfig.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../apiBuilders/common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../apiBuilders/misc */ "./src/api/gramjs/apiBuilders/misc.ts");
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");
/* harmony import */ var _management__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./management */ "./src/api/gramjs/methods/management.ts");
















const BETA_LANG_CODES = ['ar', 'fa', 'id', 'ko', 'uz', 'en'];
function updateProfile(_ref) {
  let {
    firstName,
    lastName,
    about
  } = _ref;
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.UpdateProfile({
    firstName: firstName || '',
    lastName: lastName || '',
    about: about || ''
  }), {
    shouldReturnTrue: true
  });
}
async function checkUsername(username) {
  try {
    const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.CheckUsername({
      username
    }), {
      shouldThrow: true
    });
    return {
      result,
      error: undefined
    };
  } catch (error) {
    const errorMessage = error.message;
    if (_management__WEBPACK_IMPORTED_MODULE_15__.ACCEPTABLE_USERNAME_ERRORS.has(errorMessage)) {
      return {
        result: false,
        error: errorMessage
      };
    }
    throw error;
  }
}
function updateUsername(username) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.UpdateUsername({
    username
  }), {
    shouldReturnTrue: true
  });
}
async function updateProfilePhoto(photo, isFallback) {
  const photoId = photo ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputPhoto)(photo) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPhotoEmpty();
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.photos.UpdateProfilePhoto({
    id: photoId,
    ...(isFallback ? {
      fallback: true
    } : undefined)
  }));
  if (!result) return undefined;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.addEntitiesToLocalDb)(result.users);
  if (result.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.addPhotoToLocalDb)(result.photo);
    return {
      users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_10__.buildApiUser).filter(Boolean),
      photo: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__.buildApiPhoto)(result.photo)
    };
  }
  return undefined;
}
async function uploadProfilePhoto(file, isFallback) {
  let isVideo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let videoTs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  let bot = arguments.length > 4 ? arguments[4] : undefined;
  const inputFile = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.uploadFile)(file);
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.photos.UploadProfilePhoto({
    ...(bot ? {
      bot: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputPeer)(bot.id, bot.accessHash)
    } : undefined),
    ...(isVideo ? {
      video: inputFile,
      videoStartTs: videoTs
    } : {
      file: inputFile
    }),
    ...(isFallback ? {
      fallback: true
    } : undefined)
  }));
  if (!result) return undefined;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.addEntitiesToLocalDb)(result.users);
  if (result.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.addPhotoToLocalDb)(result.photo);
    return {
      users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_10__.buildApiUser).filter(Boolean),
      photo: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__.buildApiPhoto)(result.photo)
    };
  }
  return undefined;
}
async function uploadContactProfilePhoto(_ref2) {
  let {
    file,
    isSuggest,
    user
  } = _ref2;
  const inputFile = file ? await (0,_client__WEBPACK_IMPORTED_MODULE_14__.uploadFile)(file) : undefined;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.photos.UploadContactProfilePhoto({
    userId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputEntity)(user.id, user.accessHash),
    file: inputFile,
    ...(isSuggest ? {
      suggest: true
    } : {
      save: true
    })
  }));
  if (!result) return undefined;
  (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.addEntitiesToLocalDb)(result.users);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_10__.buildApiUser).filter(Boolean);
  if (result.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.addPhotoToLocalDb)(result.photo);
    return {
      users,
      photo: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__.buildApiPhoto)(result.photo)
    };
  }
  return {
    users,
    photo: undefined
  };
}
async function deleteProfilePhotos(photos) {
  const photoIds = photos.map(_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputPhoto).filter(Boolean);
  const isDeleted = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.photos.DeletePhotos({
    id: photoIds
  }), {
    shouldReturnTrue: true
  });
  if (isDeleted) {
    photos.forEach(photo => {
      delete _localDb__WEBPACK_IMPORTED_MODULE_13__["default"].photos[photo.id];
    });
  }
  return isDeleted;
}
async function fetchWallpapers() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetWallPapers({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()('0')
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.WallPapersNotModified) {
    return undefined;
  }
  const filteredWallpapers = result.wallpapers.filter(wallpaper => {
    if (!(wallpaper instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.WallPaper) || !(wallpaper.document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document)) {
      return false;
    }
    return !wallpaper.pattern && wallpaper.document.mimeType !== 'application/x-tgwallpattern';
  });
  filteredWallpapers.forEach(wallpaper => {
    _localDb__WEBPACK_IMPORTED_MODULE_13__["default"].documents[String(wallpaper.document.id)] = wallpaper.document;
  });
  return {
    wallpapers: filteredWallpapers.map(_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiWallpaper).filter(Boolean)
  };
}
async function uploadWallpaper(file) {
  const inputFile = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.uploadFile)(file);
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.UploadWallPaper({
    file: inputFile,
    mimeType: file.type,
    settings: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.WallPaperSettings()
  }));
  if (!result || !(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.WallPaper)) {
    return undefined;
  }
  const wallpaper = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiWallpaper)(result);
  if (!wallpaper) {
    return undefined;
  }
  _localDb__WEBPACK_IMPORTED_MODULE_13__["default"].documents[String(result.document.id)] = result.document;
  return {
    wallpaper
  };
}
async function fetchBlockedUsers(_ref3) {
  let {
    isOnlyStories
  } = _ref3;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.GetBlocked({
    myStoriesFrom: isOnlyStories,
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.BLOCKED_LIST_LIMIT
  }));
  if (!result) {
    return undefined;
  }
  updateLocalDb(result);
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_10__.buildApiUser).filter(Boolean),
    chats: result.chats.map(chat => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildApiChatFromPreview)(chat)).filter(Boolean),
    blockedIds: result.blocked.map(blocked => (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_9__.getApiChatIdFromMtpPeer)(blocked.peerId)),
    totalCount: result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.BlockedSlice ? result.count : result.blocked.length
  };
}
function blockUser(_ref4) {
  let {
    user,
    isOnlyStories
  } = _ref4;
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.Block({
    id: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputPeer)(user.id, user.accessHash),
    myStoriesFrom: isOnlyStories
  }));
}
function unblockUser(_ref5) {
  let {
    user,
    isOnlyStories
  } = _ref5;
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.Unblock({
    id: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputPeer)(user.id, user.accessHash),
    myStoriesFrom: isOnlyStories
  }));
}
async function fetchAuthorizations() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetAuthorizations());
  if (!result) {
    return undefined;
  }
  return {
    authorizations: (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_3__.buildCollectionByKey)(result.authorizations.map(_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiSession), 'hash'),
    ttlDays: result.authorizationTtlDays
  };
}
function terminateAuthorization(hash) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ResetAuthorization({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
}
function terminateAllAuthorizations() {
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.auth.ResetAuthorizations());
}
async function fetchWebAuthorizations() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetWebAuthorizations());
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.addEntitiesToLocalDb)(result.users);
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_10__.buildApiUser).filter(Boolean),
    webAuthorizations: (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_3__.buildCollectionByKey)(result.authorizations.map(_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiWebSession), 'hash')
  };
}
function terminateWebAuthorization(hash) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ResetWebAuthorization({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
}
function terminateAllWebAuthorizations() {
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ResetWebAuthorizations());
}
async function fetchNotificationExceptions() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetNotifyExceptions({
    compareSound: true
  }), {
    shouldIgnoreUpdates: true
  });
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Updates || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdatesCombined)) {
    return undefined;
  }
  updateLocalDb(result);
  return result.updates.reduce((acc, update) => {
    if (!(update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.UpdateNotifySettings && update.peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.NotifyPeer)) {
      return acc;
    }
    acc.push((0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiNotifyException)(update.notifySettings, update.peer.peer));
    return acc;
  }, []);
}
async function fetchNotificationSettings() {
  const [isMutedContactSignUpNotification, privateContactNotificationsSettings, groupNotificationsSettings, broadcastNotificationsSettings] = await Promise.all([(0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetContactSignUpNotification()), (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetNotifySettings({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputNotifyUsers()
  })), (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetNotifySettings({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputNotifyChats()
  })), (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetNotifySettings({
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputNotifyBroadcasts()
  }))]);
  if (!privateContactNotificationsSettings || !groupNotificationsSettings || !broadcastNotificationsSettings) {
    return false;
  }
  const {
    silent: privateSilent,
    muteUntil: privateMuteUntil,
    showPreviews: privateShowPreviews
  } = privateContactNotificationsSettings;
  const {
    silent: groupSilent,
    muteUntil: groupMuteUntil,
    showPreviews: groupShowPreviews
  } = groupNotificationsSettings;
  const {
    silent: broadcastSilent,
    muteUntil: broadcastMuteUntil,
    showPreviews: broadcastShowPreviews
  } = broadcastNotificationsSettings;
  return {
    hasContactJoinedNotifications: !isMutedContactSignUpNotification,
    hasPrivateChatsNotifications: !(privateSilent || typeof privateMuteUntil === 'number' && (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_4__.getServerTime)() < privateMuteUntil),
    hasPrivateChatsMessagePreview: privateShowPreviews,
    hasGroupNotifications: !(groupSilent || typeof groupMuteUntil === 'number' && (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_4__.getServerTime)() < groupMuteUntil),
    hasGroupMessagePreview: groupShowPreviews,
    hasBroadcastNotifications: !(broadcastSilent || typeof broadcastMuteUntil === 'number' && (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_4__.getServerTime)() < broadcastMuteUntil),
    hasBroadcastMessagePreview: broadcastShowPreviews
  };
}
function updateContactSignUpNotification(isSilent) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.SetContactSignUpNotification({
    silent: isSilent
  }));
}
function updateNotificationSettings(peerType, _ref6) {
  let {
    isSilent,
    shouldShowPreviews
  } = _ref6;
  let peer;
  if (peerType === 'contact') {
    peer = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputNotifyUsers();
  } else if (peerType === 'group') {
    peer = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputNotifyChats();
  } else {
    peer = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputNotifyBroadcasts();
  }
  const settings = {
    showPreviews: shouldShowPreviews,
    silent: isSilent,
    muteUntil: isSilent ? _config__WEBPACK_IMPORTED_MODULE_2__.MAX_INT_32 : 0
  };
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.UpdateNotifySettings({
    peer,
    settings: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerNotifySettings(settings)
  }));
}
async function fetchLangPack(_ref7) {
  let {
    langPack,
    langCode
  } = _ref7;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.langpack.GetLangPack({
    langPack,
    langCode
  }));
  if (!result) {
    return undefined;
  }
  const {
    strings,
    keysToRemove
  } = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildLangStrings)(result.strings);
  return {
    version: result.version,
    strings,
    keysToRemove
  };
}
async function fetchLangDifference(_ref8) {
  let {
    langPack,
    langCode,
    fromVersion
  } = _ref8;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.langpack.GetDifference({
    langPack,
    langCode,
    fromVersion
  }));
  if (!result) {
    return undefined;
  }
  const {
    strings,
    keysToRemove
  } = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildLangStrings)(result.strings);
  return {
    version: result.version,
    strings,
    keysToRemove
  };
}
async function fetchLanguages() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.langpack.GetLanguages({
    langPack: _config__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_LANG_PACK
  }));
  if (!result) {
    return undefined;
  }
  return result.map(_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiLanguage);
}
async function fetchLanguage(_ref9) {
  let {
    langPack,
    langCode
  } = _ref9;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.langpack.GetLanguage({
    langPack,
    langCode
  }));
  if (!result) {
    return undefined;
  }
  return (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiLanguage)(result);
}
async function oldFetchLangPack(_ref10) {
  let {
    sourceLangPacks,
    langCode
  } = _ref10;
  const results = await Promise.all(sourceLangPacks.map(langPack => {
    return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.langpack.GetLangPack({
      langPack,
      langCode: BETA_LANG_CODES.includes(langCode) ? `${langCode}-raw` : langCode
    }));
  }));
  const collections = results.filter(Boolean).map(_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.oldBuildLangPack);
  if (!collections.length) {
    return undefined;
  }
  return {
    langPack: Object.assign({}, ...collections.reverse())
  };
}
async function oldFetchLangStrings(_ref11) {
  let {
    langPack,
    langCode,
    keys
  } = _ref11;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.langpack.GetStrings({
    langPack,
    langCode: BETA_LANG_CODES.includes(langCode) ? `${langCode}-raw` : langCode,
    keys
  }));
  if (!result) {
    return undefined;
  }
  return result.map(_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.oldBuildLangPackString);
}
async function fetchPrivacySettings(privacyKey) {
  const key = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputPrivacyKey)(privacyKey);
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetPrivacy({
    key
  }));
  if (!result) {
    return undefined;
  }
  updateLocalDb(result);
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_10__.buildApiUser).filter(Boolean),
    rules: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__.buildPrivacyRules)(result.rules)
  };
}
function registerDevice(token) {
  const client = (0,_client__WEBPACK_IMPORTED_MODULE_14__.getClient)();
  const secret = client.session.getAuthKey().getKey();
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.RegisterDevice({
    tokenType: 10,
    secret,
    appSandbox: false,
    otherUids: [],
    token
  }));
}
function unregisterDevice(token) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.UnregisterDevice({
    tokenType: 10,
    otherUids: [],
    token
  }));
}
async function setPrivacySettings(privacyKey, rules) {
  const key = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputPrivacyKey)(privacyKey);
  const privacyRules = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputPrivacyRules)(rules);
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.SetPrivacy({
    key,
    rules: privacyRules
  }));
  if (!result) {
    return undefined;
  }
  updateLocalDb(result);
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_10__.buildApiUser).filter(Boolean),
    rules: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__.buildPrivacyRules)(result.rules)
  };
}
async function updateIsOnline(isOnline) {
  await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.UpdateStatus({
    offline: !isOnline
  }));
}
async function fetchContentSettings() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetContentSettings());
  if (!result) {
    return undefined;
  }
  return {
    isSensitiveEnabled: Boolean(result.sensitiveEnabled),
    canChangeSensitive: Boolean(result.sensitiveCanChange)
  };
}
function updateContentSettings(isEnabled) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.SetContentSettings({
    sensitiveEnabled: isEnabled || undefined
  }));
}
async function fetchAppConfig(hash) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.GetAppConfig({
    hash
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.AppConfigNotModified) return undefined;
  const {
    config,
    hash: resultHash
  } = result;
  return (0,_apiBuilders_appConfig__WEBPACK_IMPORTED_MODULE_5__.buildAppConfig)(config, resultHash);
}
async function fetchConfig() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.GetConfig());
  if (!result) return undefined;
  return (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiConfig)(result);
}
async function fetchPeerColors(hash) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.GetPeerColors({
    hash
  }));
  if (!result) return undefined;
  const colors = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiPeerColors)(result);
  if (!colors) return undefined;
  const newHash = result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.PeerColors ? result.hash : undefined;
  return {
    colors,
    hash: newHash
  };
}
async function fetchTimezones(hash) {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.GetTimezonesList({
    hash
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.TimezonesListNotModified) return undefined;
  const timezones = result.timezones.map(_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiTimezone);
  return {
    timezones,
    hash: result.hash
  };
}
function updateLocalDb(result) {
  (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.addEntitiesToLocalDb)(result.chats);
}
async function fetchCountryList(_ref12) {
  let {
    langCode = 'en'
  } = _ref12;
  const countryList = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.GetCountriesList({
    langCode
  }));
  if (!(countryList instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.CountriesList)) {
    return undefined;
  }
  return (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_8__.buildApiCountryList)(countryList.countries);
}
async function fetchGlobalPrivacySettings() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetGlobalPrivacySettings());
  if (!result) {
    return undefined;
  }
  return {
    shouldArchiveAndMuteNewNonContact: Boolean(result.archiveAndMuteNewNoncontactPeers),
    shouldHideReadMarks: Boolean(result.hideReadMarks),
    shouldNewNonContactPeersRequirePremium: Boolean(result.newNoncontactPeersRequirePremium)
  };
}
async function updateGlobalPrivacySettings(_ref13) {
  let {
    shouldArchiveAndMuteNewNonContact,
    shouldHideReadMarks,
    shouldNewNonContactPeersRequirePremium
  } = _ref13;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.SetGlobalPrivacySettings({
    settings: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.GlobalPrivacySettings({
      ...(shouldArchiveAndMuteNewNonContact && {
        archiveAndMuteNewNoncontactPeers: true
      }),
      ...(shouldHideReadMarks && {
        hideReadMarks: true
      }),
      ...(shouldNewNonContactPeersRequirePremium && {
        newNoncontactPeersRequirePremium: true
      })
    })
  }));
  if (!result) {
    return undefined;
  }
  return {
    shouldArchiveAndMuteNewNonContact: Boolean(result.archiveAndMuteNewNoncontactPeers),
    shouldHideReadMarks: Boolean(result.hideReadMarks),
    shouldNewNonContactPeersRequirePremium: Boolean(result.newNoncontactPeersRequirePremium)
  };
}
function toggleUsername(_ref14) {
  let {
    chatId,
    accessHash,
    username,
    isActive
  } = _ref14;
  if (chatId) {
    return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ToggleUsername({
      channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputEntity)(chatId, accessHash),
      username,
      active: isActive
    }));
  }
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ToggleUsername({
    username,
    active: isActive
  }));
}
function reorderUsernames(_ref15) {
  let {
    chatId,
    accessHash,
    usernames
  } = _ref15;
  if (chatId) {
    return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.channels.ReorderUsernames({
      channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_11__.buildInputEntity)(chatId, accessHash),
      order: usernames
    }));
  }
  return (0,_client__WEBPACK_IMPORTED_MODULE_14__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.ReorderUsernames({
    order: usernames
  }));
}

/***/ }),

/***/ "./src/api/gramjs/methods/statistics.ts":
/*!**********************************************!*\
  !*** ./src/api/gramjs/methods/statistics.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchChannelStatistics: () => (/* binding */ fetchChannelStatistics),
/* harmony export */   fetchGroupStatistics: () => (/* binding */ fetchGroupStatistics),
/* harmony export */   fetchMessagePublicForwards: () => (/* binding */ fetchMessagePublicForwards),
/* harmony export */   fetchMessageStatistics: () => (/* binding */ fetchMessageStatistics),
/* harmony export */   fetchStatisticsAsyncGraph: () => (/* binding */ fetchStatisticsAsyncGraph),
/* harmony export */   fetchStoryPublicForwards: () => (/* binding */ fetchStoryPublicForwards),
/* harmony export */   fetchStoryStatistics: () => (/* binding */ fetchStoryStatistics)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_statistics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/statistics */ "./src/api/gramjs/apiBuilders/statistics.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");









async function fetchChannelStatistics(_ref) {
  let {
    chat,
    dcId
  } = _ref;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.stats.GetBroadcastStats({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputEntity)(chat.id, chat.accessHash)
  }), {
    dcId
  });
  if (!result) {
    return undefined;
  }
  return {
    stats: (0,_apiBuilders_statistics__WEBPACK_IMPORTED_MODULE_4__.buildChannelStatistics)(result),
    users: []
  };
}
async function fetchGroupStatistics(_ref2) {
  let {
    chat,
    dcId
  } = _ref2;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.stats.GetMegagroupStats({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputEntity)(chat.id, chat.accessHash)
  }), {
    dcId
  });
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean),
    stats: (0,_apiBuilders_statistics__WEBPACK_IMPORTED_MODULE_4__.buildGroupStatistics)(result)
  };
}
async function fetchMessageStatistics(_ref3) {
  let {
    chat,
    messageId,
    dcId
  } = _ref3;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.stats.GetMessageStats({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputEntity)(chat.id, chat.accessHash),
    msgId: messageId
  }), {
    dcId
  });
  if (!result) {
    return undefined;
  }
  return (0,_apiBuilders_statistics__WEBPACK_IMPORTED_MODULE_4__.buildPostsStatistics)(result);
}
async function fetchMessagePublicForwards(_ref4) {
  let {
    chat,
    messageId,
    dcId,
    offset
  } = _ref4;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.stats.GetMessagePublicForwards({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputEntity)(chat.id, chat.accessHash),
    msgId: messageId,
    offset,
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.STATISTICS_PUBLIC_FORWARDS_LIMIT
  }), {
    dcId
  });
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.chats);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  return {
    forwards: (0,_apiBuilders_statistics__WEBPACK_IMPORTED_MODULE_4__.buildMessagePublicForwards)(result),
    count: result.count,
    nextOffset: result.nextOffset,
    chats: result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean),
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean)
  };
}
async function fetchStatisticsAsyncGraph(_ref5) {
  let {
    token,
    x,
    isPercentage,
    dcId
  } = _ref5;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.stats.LoadAsyncGraph({
    token,
    ...(x && {
      x: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(x)
    })
  }), {
    dcId
  });
  if (!result) {
    return undefined;
  }
  return (0,_apiBuilders_statistics__WEBPACK_IMPORTED_MODULE_4__.buildGraph)(result, isPercentage);
}
async function fetchStoryStatistics(_ref6) {
  let {
    chat,
    storyId,
    dcId
  } = _ref6;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.stats.GetStoryStats({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(chat.id, chat.accessHash),
    id: storyId
  }), {
    dcId
  });
  if (!result) {
    return undefined;
  }
  return (0,_apiBuilders_statistics__WEBPACK_IMPORTED_MODULE_4__.buildPostsStatistics)(result);
}
async function fetchStoryPublicForwards(_ref7) {
  let {
    chat,
    storyId,
    dcId,
    offset
  } = _ref7;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.stats.GetStoryPublicForwards({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputPeer)(chat.id, chat.accessHash),
    id: storyId,
    offset,
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.STATISTICS_PUBLIC_FORWARDS_LIMIT
  }), {
    dcId
  });
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.chats);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_7__.addEntitiesToLocalDb)(result.users);
  return {
    publicForwards: (0,_apiBuilders_statistics__WEBPACK_IMPORTED_MODULE_4__.buildStoryPublicForwards)(result),
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_5__.buildApiUser).filter(Boolean),
    chats: result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean),
    count: result.count,
    nextOffset: result.nextOffset
  };
}

/***/ }),

/***/ "./src/api/gramjs/methods/stories.ts":
/*!*******************************************!*\
  !*** ./src/api/gramjs/methods/stories.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activateStealthMode: () => (/* binding */ activateStealthMode),
/* harmony export */   deleteStory: () => (/* binding */ deleteStory),
/* harmony export */   editStoryPrivacy: () => (/* binding */ editStoryPrivacy),
/* harmony export */   fetchAllStories: () => (/* binding */ fetchAllStories),
/* harmony export */   fetchPeerProfileStories: () => (/* binding */ fetchPeerProfileStories),
/* harmony export */   fetchPeerStories: () => (/* binding */ fetchPeerStories),
/* harmony export */   fetchPeerStoriesByIds: () => (/* binding */ fetchPeerStoriesByIds),
/* harmony export */   fetchStoriesArchive: () => (/* binding */ fetchStoriesArchive),
/* harmony export */   fetchStoriesMaxIds: () => (/* binding */ fetchStoriesMaxIds),
/* harmony export */   fetchStoriesViews: () => (/* binding */ fetchStoriesViews),
/* harmony export */   fetchStoryLink: () => (/* binding */ fetchStoryLink),
/* harmony export */   fetchStoryViewList: () => (/* binding */ fetchStoryViewList),
/* harmony export */   markStoryRead: () => (/* binding */ markStoryRead),
/* harmony export */   reportStory: () => (/* binding */ reportStory),
/* harmony export */   sendStoryReaction: () => (/* binding */ sendStoryReaction),
/* harmony export */   toggleStoriesHidden: () => (/* binding */ toggleStoriesHidden),
/* harmony export */   toggleStoryInProfile: () => (/* binding */ toggleStoryInProfile),
/* harmony export */   toggleStoryPinnedToTop: () => (/* binding */ toggleStoryPinnedToTop),
/* harmony export */   viewStory: () => (/* binding */ viewStory)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _apiBuilders_stories__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/stories */ "./src/api/gramjs/apiBuilders/stories.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");










async function fetchAllStories(_ref) {
  let {
    stateHash,
    isFirstRequest = false,
    isHidden = false
  } = _ref;
  const params = isFirstRequest ? isHidden ? {
    hidden: true
  } : {} : {
    state: stateHash,
    next: true,
    ...(isHidden && {
      hidden: true
    })
  };
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.GetAllStories(params));
  if (!result) {
    return undefined;
  }
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.AllStoriesNotModified) {
    return {
      state: result.state,
      stealthMode: (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_5__.buildApiStealthMode)(result.stealthMode)
    };
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.chats);
  result.peerStories.forEach(peerStories => peerStories.stories.forEach(story => (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addStoryToLocalDb)(story, (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_4__.getApiChatIdFromMtpPeer)(peerStories.peer))));
  const allUserStories = result.peerStories.reduce((acc, peerStories) => {
    const peerId = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_4__.getApiChatIdFromMtpPeer)(peerStories.peer);
    const stories = (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerStories)(peerStories);
    const {
      profileIds,
      orderedIds,
      lastUpdatedAt
    } = Object.values(stories).reduce((dataAcc, story) => {
      if ('isInProfile' in story && story.isInProfile) {
        dataAcc.profileIds.push(story.id);
      }
      if (!('isDeleted' in story)) {
        dataAcc.orderedIds.push(story.id);
        dataAcc.lastUpdatedAt = Math.max(story.date, dataAcc.lastUpdatedAt || 0);
      }
      return dataAcc;
    }, {
      profileIds: [],
      orderedIds: [],
      lastUpdatedAt: undefined
    });
    if (orderedIds.length === 0) {
      return acc;
    }
    acc[peerId] = {
      byId: stories,
      orderedIds,
      profileIds,
      lastUpdatedAt,
      lastReadId: peerStories.maxReadId
    };
    return acc;
  }, {});
  return {
    users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUser).filter(Boolean),
    chats: result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean),
    peerStories: allUserStories,
    hasMore: result.hasMore,
    state: result.state,
    stealthMode: (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_5__.buildApiStealthMode)(result.stealthMode)
  };
}
async function fetchPeerStories(_ref2) {
  let {
    peer
  } = _ref2;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.GetPeerStories({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash)
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.users);
  result.stories.stories.forEach(story => (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addStoryToLocalDb)(story, peer.id));
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean);
  const stories = (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.buildCollectionByCallback)(result.stories.stories, story => [story.id, (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_5__.buildApiStory)(peer.id, story)]);
  return {
    chats,
    users,
    stories,
    lastReadStoryId: result.stories.maxReadId
  };
}
function fetchPeerProfileStories(_ref3) {
  let {
    peer,
    offsetId
  } = _ref3;
  return fetchCommonStoriesRequest({
    method: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.GetPinnedStories({
      peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
      offsetId,
      limit: _config__WEBPACK_IMPORTED_MODULE_1__.STORY_LIST_LIMIT
    }),
    peerId: peer.id
  });
}
function fetchStoriesArchive(_ref4) {
  let {
    peer,
    offsetId
  } = _ref4;
  return fetchCommonStoriesRequest({
    method: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.GetStoriesArchive({
      peer: peer && (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
      offsetId,
      limit: _config__WEBPACK_IMPORTED_MODULE_1__.STORY_LIST_LIMIT
    }),
    peerId: peer.id
  });
}
async function fetchPeerStoriesByIds(_ref5) {
  let {
    peer,
    ids
  } = _ref5;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.GetStoriesByID({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id: ids
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.chats);
  result.stories.forEach(story => (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addStoryToLocalDb)(story, peer.id));
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean);
  const stories = ids.reduce((acc, id) => {
    const story = result.stories.find(_ref6 => {
      let {
        id: currentId
      } = _ref6;
      return currentId === id;
    });
    if (story) {
      acc[id] = (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_5__.buildApiStory)(peer.id, story);
    } else {
      acc[id] = {
        id,
        peerId: peer.id,
        isDeleted: true
      };
    }
    return acc;
  }, {});
  return {
    chats,
    users,
    pinnedIds: result.pinnedToTop,
    stories
  };
}
function viewStory(_ref7) {
  let {
    peer,
    storyId
  } = _ref7;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.IncrementStoryViews({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id: [storyId]
  }));
}
function markStoryRead(_ref8) {
  let {
    peer,
    storyId
  } = _ref8;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.ReadStories({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    maxId: storyId
  }));
}
function deleteStory(_ref9) {
  let {
    peer,
    storyId
  } = _ref9;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.DeleteStories({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id: [storyId]
  }));
}
function toggleStoryInProfile(_ref10) {
  let {
    peer,
    storyId,
    isInProfile
  } = _ref10;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.TogglePinned({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id: [storyId],
    pinned: isInProfile
  }));
}
function toggleStoryPinnedToTop(_ref11) {
  let {
    peer,
    storyIds
  } = _ref11;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.TogglePinnedToTop({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id: storyIds
  }));
}
async function fetchStoryViewList(_ref12) {
  let {
    peer,
    storyId,
    areJustContacts,
    query,
    areReactionsFirst,
    limit = _config__WEBPACK_IMPORTED_MODULE_1__.STORY_LIST_LIMIT,
    offset = ''
  } = _ref12;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.GetStoryViewsList({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id: storyId,
    justContacts: areJustContacts,
    q: query,
    reactionsFirst: areReactionsFirst,
    limit,
    offset
  }));
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.chats);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean);
  const views = result.views.map(_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_5__.buildApiStoryView).filter(Boolean);
  return {
    users,
    chats,
    views,
    nextOffset: result.nextOffset,
    reactionsCount: result.reactionsCount,
    viewsCount: result.count
  };
}
async function fetchStoriesViews(_ref13) {
  let {
    peer,
    storyIds
  } = _ref13;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.GetStoriesViews({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id: storyIds
  }));
  if (!result?.views[0]) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.users);
  const views = (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_5__.buildApiStoryViews)(result.views[0]);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUser).filter(Boolean);
  return {
    views,
    users
  };
}
async function fetchStoryLink(_ref14) {
  let {
    peer,
    storyId
  } = _ref14;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.ExportStoryLink({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id: storyId
  }));
  if (!result) {
    return undefined;
  }
  return result.link;
}
function reportStory(_ref15) {
  let {
    peer,
    storyId,
    reason,
    description
  } = _ref15;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.Report({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id: [storyId],
    reason: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputReportReason)(reason),
    message: description
  }));
}
function editStoryPrivacy(_ref16) {
  let {
    peer,
    id,
    privacy
  } = _ref16;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.EditStory({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    id,
    privacyRules: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPrivacyRules)(privacy)
  }), {
    shouldReturnTrue: true
  });
}
function toggleStoriesHidden(_ref17) {
  let {
    peer,
    isHidden
  } = _ref17;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.TogglePeerStoriesHidden({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    hidden: isHidden
  }));
}
function fetchStoriesMaxIds(_ref18) {
  let {
    peers
  } = _ref18;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.GetPeerMaxIDs({
    id: peers.map(peer => (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash))
  }), {
    shouldIgnoreErrors: true
  });
}
async function fetchCommonStoriesRequest(_ref19) {
  let {
    method,
    peerId
  } = _ref19;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(method);
  if (!result) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.chats);
  result.stories.forEach(story => (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addStoryToLocalDb)(story, peerId));
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean);
  const stories = (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.buildCollectionByCallback)(result.stories, story => [story.id, (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_5__.buildApiStory)(peerId, story)]);
  return {
    users,
    chats,
    stories,
    pinnedIds: result.pinnedToTop
  };
}
function sendStoryReaction(_ref20) {
  let {
    peer,
    storyId,
    reaction,
    shouldAddToRecent
  } = _ref20;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.SendReaction({
    reaction: reaction ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputReaction)(reaction) : new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReactionEmpty(),
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(peer.id, peer.accessHash),
    storyId,
    ...(shouldAddToRecent && {
      addToRecent: true
    })
  }), {
    shouldReturnTrue: true
  });
}
function activateStealthMode(_ref21) {
  let {
    isForPast,
    isForFuture
  } = _ref21;
  return (0,_client__WEBPACK_IMPORTED_MODULE_9__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.stories.ActivateStealthMode({
    past: isForPast,
    future: isForFuture
  }), {
    shouldReturnTrue: true
  });
}

/***/ }),

/***/ "./src/api/gramjs/methods/symbols.ts":
/*!*******************************************!*\
  !*** ./src/api/gramjs/methods/symbols.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearRecentStickers: () => (/* binding */ clearRecentStickers),
/* harmony export */   faveSticker: () => (/* binding */ faveSticker),
/* harmony export */   fetchAnimatedEmojiEffects: () => (/* binding */ fetchAnimatedEmojiEffects),
/* harmony export */   fetchAnimatedEmojis: () => (/* binding */ fetchAnimatedEmojis),
/* harmony export */   fetchCustomEmoji: () => (/* binding */ fetchCustomEmoji),
/* harmony export */   fetchCustomEmojiSets: () => (/* binding */ fetchCustomEmojiSets),
/* harmony export */   fetchDefaultStatusEmojis: () => (/* binding */ fetchDefaultStatusEmojis),
/* harmony export */   fetchDefaultTopicIcons: () => (/* binding */ fetchDefaultTopicIcons),
/* harmony export */   fetchEmojiKeywords: () => (/* binding */ fetchEmojiKeywords),
/* harmony export */   fetchFavoriteStickers: () => (/* binding */ fetchFavoriteStickers),
/* harmony export */   fetchFeaturedEmojiStickers: () => (/* binding */ fetchFeaturedEmojiStickers),
/* harmony export */   fetchFeaturedStickers: () => (/* binding */ fetchFeaturedStickers),
/* harmony export */   fetchGenericEmojiEffects: () => (/* binding */ fetchGenericEmojiEffects),
/* harmony export */   fetchPremiumGifts: () => (/* binding */ fetchPremiumGifts),
/* harmony export */   fetchRecentEmojiStatuses: () => (/* binding */ fetchRecentEmojiStatuses),
/* harmony export */   fetchRecentStickers: () => (/* binding */ fetchRecentStickers),
/* harmony export */   fetchSavedGifs: () => (/* binding */ fetchSavedGifs),
/* harmony export */   fetchStickerSets: () => (/* binding */ fetchStickerSets),
/* harmony export */   fetchStickers: () => (/* binding */ fetchStickers),
/* harmony export */   fetchStickersForEmoji: () => (/* binding */ fetchStickersForEmoji),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   installStickerSet: () => (/* binding */ installStickerSet),
/* harmony export */   removeRecentSticker: () => (/* binding */ removeRecentSticker),
/* harmony export */   saveGif: () => (/* binding */ saveGif),
/* harmony export */   searchGifs: () => (/* binding */ searchGifs),
/* harmony export */   searchStickers: () => (/* binding */ searchStickers),
/* harmony export */   uninstallStickerSet: () => (/* binding */ uninstallStickerSet)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../apiBuilders/messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/symbols */ "./src/api/gramjs/apiBuilders/symbols.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");









let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
async function fetchCustomEmojiSets(_ref) {
  let {
    hash = '0'
  } = _ref;
  const allStickers = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetEmojiStickers({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!allStickers || allStickers instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.AllStickersNotModified) {
    return undefined;
  }
  allStickers.sets.forEach(stickerSet => {
    if (stickerSet.thumbs?.length || stickerSet.thumbDocumentId) {
      _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].stickerSets[String(stickerSet.id)] = stickerSet;
    }
  });
  return {
    hash: String(allStickers.hash),
    sets: allStickers.sets.map(_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSet)
  };
}
async function fetchStickerSets(_ref2) {
  let {
    hash = '0'
  } = _ref2;
  const allStickers = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetAllStickers({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!allStickers || allStickers instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.AllStickersNotModified) {
    return undefined;
  }
  allStickers.sets.forEach(stickerSet => {
    if (stickerSet.thumbs?.length) {
      _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].stickerSets[String(stickerSet.id)] = stickerSet;
    }
  });
  return {
    hash: String(allStickers.hash),
    sets: allStickers.sets.map(_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSet)
  };
}
async function fetchRecentStickers(_ref3) {
  let {
    hash = '0'
  } = _ref3;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetRecentStickers({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.RecentStickersNotModified) {
    return undefined;
  }
  return {
    hash: String(result.hash),
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.stickers.slice(0, _config__WEBPACK_IMPORTED_MODULE_2__.RECENT_STICKERS_LIMIT))
  };
}
async function fetchFavoriteStickers(_ref4) {
  let {
    hash = '0'
  } = _ref4;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetFavedStickers({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.FavedStickersNotModified) {
    return undefined;
  }
  return {
    hash: String(result.hash),
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.stickers)
  };
}
async function fetchFeaturedStickers(_ref5) {
  let {
    hash = '0'
  } = _ref5;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetFeaturedStickers({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.FeaturedStickersNotModified) {
    return undefined;
  }
  return {
    hash: String(result.hash),
    isPremium: Boolean(result.premium),
    sets: result.sets.map(_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSetCovered)
  };
}
async function fetchFeaturedEmojiStickers() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetFeaturedEmojiStickers({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(0)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.FeaturedStickersNotModified) {
    return undefined;
  }
  result.sets.forEach(_ref6 => {
    let {
      set
    } = _ref6;
    if (set.thumbDocumentId) {
      _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].stickerSets[String(set.id)] = set;
    }
  });
  return {
    isPremium: Boolean(result.premium),
    sets: result.sets.map(_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSetCovered)
  };
}
async function faveSticker(_ref7) {
  let {
    sticker,
    unfave
  } = _ref7;
  const request = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.FaveSticker({
    id: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputDocument)(sticker),
    unfave
  });
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(request);
  if (result) {
    onUpdate({
      '@type': 'updateFavoriteStickers'
    });
  }
}
function removeRecentSticker(_ref8) {
  let {
    sticker
  } = _ref8;
  const request = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SaveRecentSticker({
    id: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputDocument)(sticker),
    unsave: true
  });
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(request);
}
function clearRecentStickers() {
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ClearRecentStickers());
}
async function fetchStickers(_ref9) {
  let {
    stickerSetInfo
  } = _ref9;
  if ('isMissing' in stickerSetInfo) return undefined;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetStickerSet({
    stickerset: 'id' in stickerSetInfo ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputStickerSet)(stickerSetInfo.id, stickerSetInfo.accessHash) : (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputStickerSetShortName)(stickerSetInfo.shortName)
  }), {
    shouldThrow: true
  });
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.StickerSet)) {
    return undefined;
  }
  _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].stickerSets[String(result.set.id)] = result.set;
  return {
    set: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSet)(result.set),
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.documents),
    packs: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerPackResult)(result.packs)
  };
}
async function fetchCustomEmoji(_ref10) {
  let {
    documentId
  } = _ref10;
  if (!documentId.length) return undefined;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetCustomEmojiDocuments({
    documentId: documentId.map(id => big_integer__WEBPACK_IMPORTED_MODULE_0___default()(id))
  }));
  if (!result) return undefined;
  return (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result);
}
async function fetchAnimatedEmojis() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetStickerSet({
    stickerset: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStickerSetAnimatedEmoji()
  }));
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.StickerSet)) {
    return undefined;
  }
  return {
    set: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSet)(result.set),
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.documents)
  };
}
async function fetchAnimatedEmojiEffects() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetStickerSet({
    stickerset: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStickerSetAnimatedEmojiAnimations()
  }));
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.StickerSet)) {
    return undefined;
  }
  return {
    set: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSet)(result.set),
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.documents)
  };
}
async function fetchGenericEmojiEffects() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetStickerSet({
    stickerset: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStickerSetEmojiGenericAnimations()
  }));
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.StickerSet)) {
    return undefined;
  }
  return {
    set: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSet)(result.set),
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.documents)
  };
}
async function fetchPremiumGifts() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetStickerSet({
    stickerset: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStickerSetPremiumGifts()
  }));
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.StickerSet)) {
    return undefined;
  }
  return {
    set: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSet)(result.set),
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.documents)
  };
}
async function fetchDefaultTopicIcons() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetStickerSet({
    stickerset: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStickerSetEmojiDefaultTopicIcons()
  }));
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.StickerSet)) {
    return undefined;
  }
  return {
    set: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSet)(result.set),
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.documents)
  };
}
async function fetchDefaultStatusEmojis() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetStickerSet({
    stickerset: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputStickerSetEmojiDefaultStatuses()
  }));
  if (!(result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.StickerSet)) {
    return undefined;
  }
  return {
    set: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSet)(result.set),
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.documents)
  };
}
async function searchStickers(_ref11) {
  let {
    query,
    hash = '0'
  } = _ref11;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SearchStickerSets({
    q: query,
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.FoundStickerSetsNotModified) {
    return undefined;
  }
  return {
    hash: String(result.hash),
    sets: result.sets.map(_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.buildStickerSetCovered)
  };
}
async function fetchSavedGifs(_ref12) {
  let {
    hash = '0'
  } = _ref12;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetSavedGifs({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SavedGifsNotModified) {
    return undefined;
  }
  return {
    hash: String(result.hash),
    gifs: processGifResult(result.gifs)
  };
}
function saveGif(_ref13) {
  let {
    gif,
    shouldUnsave
  } = _ref13;
  const request = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.SaveGif({
    id: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputDocument)(gif),
    unsave: shouldUnsave
  });
  return (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(request, {
    shouldReturnTrue: true
  });
}
async function installStickerSet(_ref14) {
  let {
    stickerSetId,
    accessHash
  } = _ref14;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.InstallStickerSet({
    stickerset: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputStickerSet)(stickerSetId, accessHash)
  }));
  if (result) {
    onUpdate({
      '@type': 'updateStickerSet',
      id: stickerSetId,
      stickerSet: {
        installedDate: Date.now()
      }
    });
  }
}
async function uninstallStickerSet(_ref15) {
  let {
    stickerSetId,
    accessHash
  } = _ref15;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.UninstallStickerSet({
    stickerset: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_6__.buildInputStickerSet)(stickerSetId, accessHash)
  }));
  if (result) {
    onUpdate({
      '@type': 'updateStickerSet',
      id: stickerSetId,
      stickerSet: {
        installedDate: undefined
      }
    });
  }
}
let inputGifBot;
async function searchGifs(_ref16) {
  let {
    query,
    offset = '',
    username = _config__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_GIF_SEARCH_BOT_USERNAME
  } = _ref16;
  if (!inputGifBot) {
    const resolvedPeer = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.ResolveUsername({
      username
    }));
    if (!resolvedPeer || !(resolvedPeer.users[0] instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.User)) {
      return undefined;
    }
    inputGifBot = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputUser({
      userId: resolvedPeer.peer.userId,
      accessHash: resolvedPeer.users[0].accessHash
    });
  }
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetInlineBotResults({
    bot: inputGifBot,
    peer: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputPeerEmpty(),
    query,
    offset
  }));
  if (!result) {
    return undefined;
  }
  const documents = result.results.map(foundGif => {
    if (foundGif instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.BotInlineMediaResult) {
      return foundGif.document;
    }
    return undefined;
  }).filter(Boolean);
  return {
    nextOffset: result.nextOffset,
    gifs: processGifResult(documents)
  };
}
async function fetchStickersForEmoji(_ref17) {
  let {
    emoji,
    hash = '0'
  } = _ref17;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetStickers({
    emoticon: emoji,
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.StickersNotModified) {
    return undefined;
  }
  return {
    stickers: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_5__.processStickerResult)(result.stickers),
    hash: String(result.hash)
  };
}
async function fetchEmojiKeywords(_ref18) {
  let {
    language,
    fromVersion
  } = _ref18;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetEmojiKeywordsDifference({
    langCode: language,
    fromVersion
  }));
  if (!result) {
    return undefined;
  }
  return {
    language: result.langCode,
    version: result.version,
    keywords: result.keywords.reduce((acc, emojiKeyword) => {
      acc[emojiKeyword.keyword] = emojiKeyword.emoticons;
      return acc;
    }, {})
  };
}
async function fetchRecentEmojiStatuses() {
  let hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_8__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.GetRecentEmojiStatuses({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()(hash)
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.EmojiStatusesNotModified) {
    return undefined;
  }
  const documentIds = result.statuses.slice(0, _config__WEBPACK_IMPORTED_MODULE_2__.RECENT_STATUS_LIMIT).map(_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_4__.buildApiEmojiStatus).filter(Boolean).map(_ref19 => {
    let {
      documentId
    } = _ref19;
    return documentId;
  });
  const emojiStatuses = await fetchCustomEmoji({
    documentId: documentIds
  });
  return {
    hash: String(result.hash),
    emojiStatuses
  };
}
function processGifResult(gifs) {
  return gifs.map(document => {
    if (document instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
      const gif = (0,_apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_3__.buildVideoFromDocument)(document);
      if (gif) {
        _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].documents[String(document.id)] = document;
        return gif;
      }
    }
    return undefined;
  }).filter(Boolean);
}

/***/ }),

/***/ "./src/api/gramjs/methods/twoFaSettings.ts":
/*!*************************************************!*\
  !*** ./src/api/gramjs/methods/twoFaSettings.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkPassword: () => (/* binding */ checkPassword),
/* harmony export */   clearPassword: () => (/* binding */ clearPassword),
/* harmony export */   getPasswordInfo: () => (/* binding */ getPasswordInfo),
/* harmony export */   getTemporaryPaymentPassword: () => (/* binding */ getTemporaryPaymentPassword),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   provideRecoveryEmailCode: () => (/* binding */ provideRecoveryEmailCode),
/* harmony export */   updatePassword: () => (/* binding */ updatePassword),
/* harmony export */   updateRecoveryEmail: () => (/* binding */ updateRecoveryEmail)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");



const ApiErrors = {
  EMAIL_UNCONFIRMED: 'Email unconfirmed',
  EMAIL_HASH_EXPIRED: 'Email hash expired',
  NEW_SALT_INVALID: 'The new salt is invalid',
  NEW_SETTINGS_INVALID: 'The new password settings are invalid',
  CODE_INVALID: 'Invalid Code',
  PASSWORD_HASH_INVALID: 'Invalid Password'
};
const emailCodeController = {};
let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
async function getPasswordInfo() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_2__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.account.GetPassword());
  if (!result) {
    return undefined;
  }
  const {
    hint,
    hasPassword
  } = result;
  return {
    hint,
    hasPassword
  };
}
function onRequestEmailCode(length) {
  onUpdate({
    '@type': 'updateTwoFaStateWaitCode',
    length
  });
  return new Promise((resolve, reject) => {
    emailCodeController.resolve = resolve;
    emailCodeController.reject = reject;
  });
}
function getTemporaryPaymentPassword(password, ttl) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_2__.getTmpPassword)(password, ttl);
}
async function checkPassword(currentPassword) {
  try {
    await (0,_client__WEBPACK_IMPORTED_MODULE_2__.updateTwoFaSettings)({
      isCheckPassword: true,
      currentPassword
    });
    return true;
  } catch (err) {
    onError(err);
    return false;
  }
}
async function clearPassword(currentPassword) {
  try {
    await (0,_client__WEBPACK_IMPORTED_MODULE_2__.updateTwoFaSettings)({
      currentPassword
    });
    return true;
  } catch (err) {
    onError(err);
    return false;
  }
}
async function updatePassword(currentPassword, password, hint, email) {
  try {
    await (0,_client__WEBPACK_IMPORTED_MODULE_2__.updateTwoFaSettings)({
      currentPassword,
      newPassword: password,
      hint,
      email,
      emailCodeCallback: onRequestEmailCode,
      onEmailCodeError: onError
    });
    return true;
  } catch (err) {
    onError(err);
    return false;
  }
}
async function updateRecoveryEmail(currentPassword, email) {
  try {
    await (0,_client__WEBPACK_IMPORTED_MODULE_2__.updateTwoFaSettings)({
      currentPassword,
      newPassword: currentPassword,
      email,
      emailCodeCallback: onRequestEmailCode,
      onEmailCodeError: onError
    });
    return true;
  } catch (err) {
    onError(err);
    return false;
  }
}
function provideRecoveryEmailCode(code) {
  emailCodeController.resolve(code);
}
function onError(err) {
  let message;
  if (err instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.errors.FloodWaitError) {
    const hours = Math.ceil(Number(err.seconds) / 60 / 60);
    message = `Too many attempts. Try again in ${hours > 1 ? `${hours} hours` : 'an hour'}`;
  } else {
    message = ApiErrors[err.message];
  }
  if (!message) {
    message = 'Unexpected Error';
    if (_config__WEBPACK_IMPORTED_MODULE_1__.DEBUG) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
  onUpdate({
    '@type': 'updateTwoFaError',
    message
  });
}

/***/ }),

/***/ "./src/api/gramjs/methods/users.ts":
/*!*****************************************!*\
  !*** ./src/api/gramjs/methods/users.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteContact: () => (/* binding */ deleteContact),
/* harmony export */   fetchCommonChats: () => (/* binding */ fetchCommonChats),
/* harmony export */   fetchContactList: () => (/* binding */ fetchContactList),
/* harmony export */   fetchFullUser: () => (/* binding */ fetchFullUser),
/* harmony export */   fetchNearestCountry: () => (/* binding */ fetchNearestCountry),
/* harmony export */   fetchProfilePhotos: () => (/* binding */ fetchProfilePhotos),
/* harmony export */   fetchTopUsers: () => (/* binding */ fetchTopUsers),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers),
/* harmony export */   importContact: () => (/* binding */ importContact),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   reportSpam: () => (/* binding */ reportSpam),
/* harmony export */   saveCloseFriends: () => (/* binding */ saveCloseFriends),
/* harmony export */   updateContact: () => (/* binding */ updateContact),
/* harmony export */   updateEmojiStatus: () => (/* binding */ updateEmojiStatus)
/* harmony export */ });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./client */ "./src/api/gramjs/methods/client.ts");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./messages */ "./src/api/gramjs/methods/messages.ts");












let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
async function fetchFullUser(_ref) {
  let {
    id,
    accessHash
  } = _ref;
  const input = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputEntity)(id, accessHash);
  if (!(input instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputUser)) {
    return undefined;
  }
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.users.GetFullUser({
    id: input
  }));
  if (!result) {
    return undefined;
  }
  updateLocalDb(result);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.chats);
  if (result.fullUser.profilePhoto) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addPhotoToLocalDb)(result.fullUser.profilePhoto);
  }
  if (result.fullUser.personalPhoto) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addPhotoToLocalDb)(result.fullUser.personalPhoto);
  }
  if (result.fullUser.fallbackPhoto) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addPhotoToLocalDb)(result.fullUser.fallbackPhoto);
  }
  const botInfo = result.fullUser.botInfo;
  if (botInfo?.descriptionPhoto) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addPhotoToLocalDb)(botInfo.descriptionPhoto);
  }
  if (botInfo?.descriptionDocument instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
    _localDb__WEBPACK_IMPORTED_MODULE_9__["default"].documents[botInfo.descriptionDocument.id.toString()] = botInfo.descriptionDocument;
  }
  if (result.fullUser.businessIntro?.sticker instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Document) {
    _localDb__WEBPACK_IMPORTED_MODULE_9__["default"].documents[result.fullUser.businessIntro.sticker.id.toString()] = result.fullUser.businessIntro.sticker;
  }
  const fullInfo = (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUserFullInfo)(result);
  const users = result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUser).filter(Boolean);
  const chats = result.chats.map(c => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(c)).filter(Boolean);
  const user = users.find(_ref2 => {
    let {
      id: userId
    } = _ref2;
    return userId === id;
  });
  onUpdate({
    '@type': 'updateUser',
    id,
    user: {
      ...user,
      avatarHash: user?.avatarHash || undefined
    },
    fullInfo
  });
  return {
    user,
    fullInfo,
    users,
    chats
  };
}
async function fetchCommonChats(id, accessHash, maxId) {
  const commonChats = await (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.GetCommonChats({
    userId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputEntity)(id, accessHash),
    maxId: maxId ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildMtpPeerId)(maxId, (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.getEntityTypeById)(maxId)) : undefined,
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.COMMON_CHATS_LIMIT
  }));
  if (!commonChats) {
    return undefined;
  }
  updateLocalDb(commonChats);
  const chatIds = [];
  const chats = [];
  commonChats.chats.forEach(mtpChat => {
    const chat = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(mtpChat);
    if (chat) {
      chats.push(chat);
      chatIds.push(chat.id);
    }
  });
  return {
    chats,
    chatIds,
    isFullyLoaded: chatIds.length < _config__WEBPACK_IMPORTED_MODULE_2__.COMMON_CHATS_LIMIT
  };
}
async function fetchNearestCountry() {
  const dcInfo = await (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.help.GetNearestDc());
  return dcInfo?.country;
}
async function fetchTopUsers() {
  const topPeers = await (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.GetTopPeers({
    correspondents: true
  }));
  if (!(topPeers instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.TopPeers)) {
    return undefined;
  }
  const users = topPeers.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUser).filter(user => Boolean(user) && !user.isSelf);
  const ids = users.map(_ref3 => {
    let {
      id
    } = _ref3;
    return id;
  });
  return {
    ids,
    users
  };
}
async function fetchContactList() {
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.GetContacts({
    hash: big_integer__WEBPACK_IMPORTED_MODULE_0___default()('0')
  }));
  if (!result || result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.ContactsNotModified) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.users);
  const {
    users,
    userStatusesById
  } = (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUsersAndStatuses)(result.users);
  return {
    users,
    userStatusesById,
    chats: result.users.map(user => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_3__.buildApiChatFromPreview)(user)).filter(Boolean)
  };
}
async function fetchUsers(_ref4) {
  let {
    users
  } = _ref4;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.users.GetUsers({
    id: users.map(_ref5 => {
      let {
        id,
        accessHash
      } = _ref5;
      return (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(id, accessHash);
    })
  }));
  if (!result || !result.length) {
    return undefined;
  }
  (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result);
  return (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUsersAndStatuses)(result);
}
async function importContact(_ref6) {
  let {
    phone,
    firstName,
    lastName
  } = _ref6;
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.ImportContacts({
    contacts: [(0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputContact)({
      phone: phone || '',
      firstName: firstName || '',
      lastName: lastName || ''
    })]
  }));
  if (result instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.ImportedContacts && result.users.length) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addUserToLocalDb)(result.users[0]);
  }
  return result?.imported.length ? (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_5__.buildApiPeerId)(result.imported[0].userId, 'user') : undefined;
}
function updateContact(_ref7) {
  let {
    id,
    accessHash,
    phoneNumber = '',
    firstName = '',
    lastName = '',
    shouldSharePhoneNumber = false
  } = _ref7;
  return (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.AddContact({
    id: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputEntity)(id, accessHash),
    firstName,
    lastName,
    phone: phoneNumber,
    ...(shouldSharePhoneNumber && {
      addPhonePrivacyException: shouldSharePhoneNumber
    })
  }), {
    shouldReturnTrue: true
  });
}
async function deleteContact(_ref8) {
  let {
    id,
    accessHash
  } = _ref8;
  const input = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputEntity)(id, accessHash);
  if (!(input instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.InputUser)) {
    return;
  }
  const result = await (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.DeleteContacts({
    id: [input]
  }));
  if (!result) {
    return;
  }
  onUpdate({
    '@type': 'deleteContact',
    id
  });
}
async function fetchProfilePhotos(user, chat) {
  if (user) {
    const {
      id,
      accessHash
    } = user;
    const result = await (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.photos.GetUserPhotos({
      userId: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputEntity)(id, accessHash),
      limit: _config__WEBPACK_IMPORTED_MODULE_2__.PROFILE_PHOTOS_LIMIT,
      offset: 0,
      maxId: big_integer__WEBPACK_IMPORTED_MODULE_0___default()('0')
    }));
    if (!result) {
      return undefined;
    }
    updateLocalDb(result);
    return {
      photos: result.photos.filter(photo => photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.Photo).map(photo => (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_4__.buildApiPhoto)(photo)),
      users: result.users.map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_6__.buildApiUser).filter(Boolean)
    };
  }
  if (chat?.isRestricted) return undefined;
  const result = await (0,_messages__WEBPACK_IMPORTED_MODULE_11__.searchMessagesLocal)({
    chat: chat,
    type: 'profilePhoto',
    limit: _config__WEBPACK_IMPORTED_MODULE_2__.PROFILE_PHOTOS_LIMIT
  });
  if (!result) {
    return undefined;
  }
  const {
    messages,
    users
  } = result;
  return {
    photos: messages.map(message => message.content.action.photo).filter(Boolean),
    users
  };
}
function reportSpam(userOrChat) {
  const {
    id,
    accessHash
  } = userOrChat;
  return (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.messages.ReportSpam({
    peer: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputPeer)(id, accessHash)
  }), {
    shouldReturnTrue: true
  });
}
function updateEmojiStatus(emojiStatus, expires) {
  return (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.account.UpdateEmojiStatus({
    emojiStatus: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildInputEmojiStatus)(emojiStatus, expires)
  }), {
    shouldReturnTrue: true
  });
}
function saveCloseFriends(userIds) {
  const id = userIds.map(userId => (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_7__.buildMtpPeerId)(userId, 'user'));
  return (0,_client__WEBPACK_IMPORTED_MODULE_10__.invokeRequest)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_1__.Api.contacts.EditCloseFriends({
    id
  }), {
    shouldReturnTrue: true
  });
}
function updateLocalDb(result) {
  if ('chats' in result) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.chats);
  }
  if ('photos' in result) {
    result.photos.forEach(_helpers__WEBPACK_IMPORTED_MODULE_8__.addPhotoToLocalDb);
  }
  if ('users' in result) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_8__.addEntitiesToLocalDb)(result.users);
  }
}

/***/ }),

/***/ "./src/api/gramjs/scheduleUnmute.ts":
/*!******************************************!*\
  !*** ./src/api/gramjs/scheduleUnmute.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleMutedChatUpdate: () => (/* binding */ scheduleMutedChatUpdate),
/* harmony export */   scheduleMutedTopicUpdate: () => (/* binding */ scheduleMutedTopicUpdate)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.ts");
/* harmony import */ var _util_serverTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/serverTime */ "./src/util/serverTime.ts");


const unmuteTimers = new Map();
const unmuteQueue = [];
const scheduleUnmute = (item, onUpdate) => {
  const id = item.topicId ? `${item.chatId}-${item.topicId}` : item.chatId;
  if (unmuteTimers.has(id)) {
    clearTimeout(unmuteTimers.get(id));
    unmuteTimers.delete(id);
  }
  if (item.muteUntil === _config__WEBPACK_IMPORTED_MODULE_0__.MAX_INT_32 || item.muteUntil <= (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_1__.getServerTime)()) return;
  unmuteQueue.push(item);
  unmuteQueue.sort((a, b) => b.muteUntil - a.muteUntil);
  const next = unmuteQueue.pop();
  if (!next) return;
  const timer = setTimeout(() => {
    onUpdate();
    if (unmuteQueue.length) {
      const afterNext = unmuteQueue.pop();
      if (afterNext) scheduleUnmute(afterNext, onUpdate);
    }
  }, (item.muteUntil - (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_1__.getServerTime)()) * 1000);
  unmuteTimers.set(id, timer);
};
function scheduleMutedChatUpdate(chatId) {
  let muteUntil = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let onUpdate = arguments.length > 2 ? arguments[2] : undefined;
  scheduleUnmute({
    chatId,
    muteUntil
  }, () => onUpdate({
    '@type': 'updateNotifyExceptions',
    chatId,
    isMuted: false
  }));
}
function scheduleMutedTopicUpdate(chatId, topicId) {
  let muteUntil = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let onUpdate = arguments.length > 3 ? arguments[3] : undefined;
  scheduleUnmute({
    chatId,
    topicId,
    muteUntil
  }, () => onUpdate({
    '@type': 'updateTopicNotifyExceptions',
    chatId,
    topicId,
    isMuted: false
  }));
}

/***/ }),

/***/ "./src/api/gramjs/updates/UpdatePts.ts":
/*!*********************************************!*\
  !*** ./src/api/gramjs/updates/UpdatePts.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalUpdateChannelPts: () => (/* binding */ LocalUpdateChannelPts),
/* harmony export */   LocalUpdatePts: () => (/* binding */ LocalUpdatePts),
/* harmony export */   buildLocalUpdatePts: () => (/* binding */ buildLocalUpdatePts)
/* harmony export */ });
/* eslint-disable max-classes-per-file */

class LocalUpdatePts {
  constructor(pts, ptsCount) {
    this.pts = pts;
    this.ptsCount = ptsCount;
  }
}
class LocalUpdateChannelPts {
  constructor(channelId, pts, ptsCount) {
    this.channelId = channelId;
    this.pts = pts;
    this.ptsCount = ptsCount;
  }
}
function buildLocalUpdatePts(pts, ptsCount, channelId) {
  return channelId ? new LocalUpdateChannelPts(channelId, pts, ptsCount) : new LocalUpdatePts(pts, ptsCount);
}

/***/ }),

/***/ "./src/api/gramjs/updates/updateManager.ts":
/*!*************************************************!*\
  !*** ./src/api/gramjs/updates/updateManager.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyState: () => (/* binding */ applyState),
/* harmony export */   getDifference: () => (/* binding */ getDifference),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   processAffectedHistory: () => (/* binding */ processAffectedHistory),
/* harmony export */   processUpdate: () => (/* binding */ processUpdate),
/* harmony export */   reset: () => (/* binding */ reset),
/* harmony export */   scheduleGetChannelDifference: () => (/* binding */ scheduleGetChannelDifference),
/* harmony export */   updateChannelState: () => (/* binding */ updateChannelState)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_gramjs_network__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/gramjs/network */ "./src/lib/gramjs/network/index.js");
/* harmony import */ var _lib_gramjs_network__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs_network__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_SortedQueue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/SortedQueue */ "./src/util/SortedQueue.ts");
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _updater__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./updater */ "./src/api/gramjs/updates/updater.ts");
/* harmony import */ var _UpdatePts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./UpdatePts */ "./src/api/gramjs/updates/UpdatePts.ts");










const COMMON_BOX_QUEUE_ID = '0';
const CHANNEL_DIFFERENCE_LIMIT = 1000;
const UPDATE_WAIT_TIMEOUT = 500;
let invoke;
let isInited = false;
let seqTimeout;
const PTS_TIMEOUTS = new Map();
const SEQ_QUEUE = new _util_SortedQueue__WEBPACK_IMPORTED_MODULE_3__["default"](seqComparator);
const PTS_QUEUE = new Map();
async function init(invokeReq) {
  invoke = invokeReq;
  await loadRemoteState();
  isInited = true;
  scheduleGetDifference();
}
function applyState(state) {
  _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.seq = state.seq;
  _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.date = state.date;
  _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.pts = state.pts;
  _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.qts = state.qts;
}
function processUpdate(update, isFromDifference, shouldOnlySave) {
  if (update instanceof _lib_gramjs_network__WEBPACK_IMPORTED_MODULE_1__.UpdateConnectionState) {
    if (update.state === _lib_gramjs_network__WEBPACK_IMPORTED_MODULE_1__.UpdateConnectionState.connected && isInited) {
      scheduleGetDifference();
    }
    (0,_updater__WEBPACK_IMPORTED_MODULE_8__.updater)(update);
    return;
  }
  if (update instanceof _lib_gramjs_network__WEBPACK_IMPORTED_MODULE_1__.UpdateServerTimeOffset) {
    (0,_updater__WEBPACK_IMPORTED_MODULE_8__.updater)(update);
    return;
  }
  if (_localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.seq === undefined) {
    // Drop updates received before first sync
    return;
  }
  if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Updates || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatesCombined) {
    if (isFromDifference) {
      // eslint-disable-next-line no-underscore-dangle
      update._isFromDifference = true;
    }
    saveSeqUpdate(update, shouldOnlySave);
    return;
  }
  if ('pts' in update) {
    if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChannelTooLong) {
      getChannelDifference(getUpdateChannelId(update));
      return;
    }
    if (isFromDifference) {
      // eslint-disable-next-line no-underscore-dangle
      update._isFromDifference = true;
    }
    savePtsUpdate(update, shouldOnlySave);
    return;
  }
  (0,_updater__WEBPACK_IMPORTED_MODULE_8__.updater)(update);
}
function updateChannelState(channelId, pts) {
  const channel = _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].chats[channelId];
  if (!(channel instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Channel)) {
    if (_config__WEBPACK_IMPORTED_MODULE_2__.DEBUG) {
      // eslint-disable-next-line no-console
      console.error(`[UpdateManager] Channel ${channelId} not found in localDb`);
    }
    return;
  }
  const currentState = _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].channelPtsById[channelId];
  if (currentState && currentState < pts) {
    scheduleGetChannelDifference(channelId);
    return;
  }
  _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].channelPtsById[channelId] = pts;
}
function applyUpdate(updateObject) {
  if ('seq' in updateObject && updateObject.seq) {
    _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.seq = updateObject.seq;
    _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.date = updateObject.date;
  }
  if ('qts' in updateObject) {
    _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.qts = updateObject.qts;
  }
  if ('pts' in updateObject) {
    const channelId = getUpdateChannelId(updateObject);
    if (channelId !== COMMON_BOX_QUEUE_ID) {
      _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].channelPtsById[channelId] = updateObject.pts;
    } else {
      _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.pts = updateObject.pts;
    }
  }
  if (updateObject instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatesCombined || updateObject instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Updates) {
    const entities = updateObject.users.concat(updateObject.chats);
    updateObject.updates.forEach(update => {
      if (entities) {
        // eslint-disable-next-line no-underscore-dangle
        update._entities = entities;
      }
      processUpdate(update);
    });
  } else {
    (0,_updater__WEBPACK_IMPORTED_MODULE_8__.updater)(updateObject);
  }
}
function saveSeqUpdate(update, shouldOnlySave) {
  SEQ_QUEUE.add(update);
  if (!shouldOnlySave) popSeqQueue();
}
function savePtsUpdate(update, shouldOnlySave) {
  const channelId = getUpdateChannelId(update);
  const ptsQueue = PTS_QUEUE.get(channelId) || new _util_SortedQueue__WEBPACK_IMPORTED_MODULE_3__["default"](ptsComparator);
  ptsQueue.add(update);
  PTS_QUEUE.set(channelId, ptsQueue);
  if (!shouldOnlySave) popPtsQueue(channelId);
}
function popSeqQueue() {
  if (!SEQ_QUEUE.size) return;
  const update = SEQ_QUEUE.pop();
  const localSeq = _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.seq;
  const seqStart = 'seqStart' in update ? update.seqStart : update.seq;

  // eslint-disable-next-line no-underscore-dangle
  if (seqStart === 0 || update._isFromDifference && seqStart >= localSeq + 1) {
    applyUpdate(update);
  } else if (seqStart === localSeq + 1) {
    clearTimeout(seqTimeout);
    seqTimeout = undefined;
    applyUpdate(update);
  } else if (seqStart > localSeq + 1) {
    SEQ_QUEUE.add(update); // Return update to queue
    scheduleGetDifference();
    return; // Prevent endless loop
  }
  popSeqQueue();
}
function popPtsQueue(channelId) {
  const ptsQueue = PTS_QUEUE.get(channelId);
  if (!ptsQueue?.size) return;
  const update = ptsQueue.pop();
  const localPts = channelId === COMMON_BOX_QUEUE_ID ? _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.pts : _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].channelPtsById[channelId];
  const pts = update.pts;
  const ptsCount = getPtsCount(update);

  // Sometimes server sends updates for channels that are opened in other clients. We ignore them
  if (localPts === undefined) {
    if (_config__WEBPACK_IMPORTED_MODULE_2__.DEBUG) {
      // Uncomment to debug missing updates
      // eslint-disable-next-line no-console
      // console.error('[UpdateManager] Got pts update without local state', channelId);
    }
    return;
  }

  // eslint-disable-next-line no-underscore-dangle
  if (update._isFromDifference && pts >= localPts + ptsCount) {
    applyUpdate(update);
  } else if (pts === localPts + ptsCount) {
    clearTimeout(PTS_TIMEOUTS.get(channelId));
    PTS_TIMEOUTS.delete(channelId);
    applyUpdate(update);
  } else if (pts > localPts + ptsCount) {
    ptsQueue.add(update); // Return update to queue
    if (channelId === COMMON_BOX_QUEUE_ID) {
      scheduleGetDifference();
    } else {
      scheduleGetChannelDifference(channelId);
    }
    return; // Prevent endless loop
  }
  popPtsQueue(channelId);
}
function scheduleGetChannelDifference(channelId) {
  if (PTS_TIMEOUTS.has(channelId)) return;
  const timeout = setTimeout(async () => {
    await getChannelDifference(channelId);
    PTS_TIMEOUTS.delete(channelId);
  }, UPDATE_WAIT_TIMEOUT);
  PTS_TIMEOUTS.set(channelId, timeout);
}
function scheduleGetDifference() {
  if (seqTimeout) return;
  seqTimeout = setTimeout(async () => {
    await getDifference();
    seqTimeout = undefined;
  }, UPDATE_WAIT_TIMEOUT);
}
function getUpdateChannelId(update) {
  if ('channelId' in update && 'pts' in update) {
    return (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_4__.buildApiPeerId)(update.channelId, 'channel');
  }
  if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNewChannelMessage || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateEditChannelMessage) {
    const peer = update.message.peerId;
    return (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_4__.buildApiPeerId)(peer.channelId, 'channel');
  }
  return COMMON_BOX_QUEUE_ID;
}
async function getDifference() {
  if (!isInited) {
    throw new Error('UpdatesManager not initialized');
  }
  if (!_localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState?.date) {
    forceSync();
    return;
  }
  (0,_updater__WEBPACK_IMPORTED_MODULE_8__.sendUpdate)({
    '@type': 'updateFetchingDifference',
    isFetching: true
  });
  const response = await invoke(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.updates.GetDifference({
    pts: _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.pts,
    date: _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.date,
    qts: _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.qts
  }));
  if (!response || response instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.updates.DifferenceTooLong) {
    forceSync();
    return;
  }
  if (response instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.updates.DifferenceEmpty) {
    _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.seq = response.seq;
    _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState.date = response.date;
    (0,_updater__WEBPACK_IMPORTED_MODULE_8__.sendUpdate)({
      '@type': 'updateFetchingDifference',
      isFetching: false
    });
    return;
  }
  processDifference(response);
  const newState = response instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.updates.DifferenceSlice ? response.intermediateState : response.state;
  applyState(newState);
  if (response instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.updates.DifferenceSlice) {
    getDifference();
    return;
  }
  (0,_updater__WEBPACK_IMPORTED_MODULE_8__.sendUpdate)({
    '@type': 'updateFetchingDifference',
    isFetching: false
  });
}
async function getChannelDifference(channelId) {
  const channel = _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].chats[channelId];
  if (!channel || !(channel instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Channel) || !channel.accessHash || !_localDb__WEBPACK_IMPORTED_MODULE_7__["default"].channelPtsById[channelId]) {
    if (_config__WEBPACK_IMPORTED_MODULE_2__.DEBUG) {
      // eslint-disable-next-line no-console
      console.error('[UpdateManager] Channel for difference not found', channelId, channel);
    }
    return;
  }
  const response = await invoke(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.updates.GetChannelDifference({
    channel: (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildInputEntity)(channelId, channel.accessHash.toString()),
    pts: _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].channelPtsById[channelId],
    filter: new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChannelMessagesFilterEmpty(),
    limit: CHANNEL_DIFFERENCE_LIMIT
  }));
  if (!response) {
    if (_config__WEBPACK_IMPORTED_MODULE_2__.DEBUG) {
      // eslint-disable-next-line no-console
      console.warn('[UpdatesManager] Failed to get ChannelDifference', channelId, channel);
    }
    return;
  }
  if (response instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.updates.ChannelDifferenceTooLong) {
    forceSync();
    return;
  }
  _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].channelPtsById[channelId] = response.pts;
  if (response instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.updates.ChannelDifferenceEmpty) {
    popPtsQueue(channelId); // Continue processing updates in queue
    return;
  }
  processDifference(response, channelId);
  if (!response.final) {
    getChannelDifference(channelId);
  }
}
function forceSync() {
  reset();
  (0,_updater__WEBPACK_IMPORTED_MODULE_8__.sendUpdate)({
    '@type': 'requestSync'
  });
  loadRemoteState();
}
function reset() {
  PTS_QUEUE.clear();
  SEQ_QUEUE.clear();
  clearTimeout(seqTimeout);
  seqTimeout = undefined;
  PTS_TIMEOUTS.forEach(timeout => {
    clearTimeout(timeout);
  });
  PTS_TIMEOUTS.clear();
  _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].commonBoxState = {};
  Object.keys(_localDb__WEBPACK_IMPORTED_MODULE_7__["default"].channelPtsById).forEach(channelId => {
    _localDb__WEBPACK_IMPORTED_MODULE_7__["default"].channelPtsById[channelId] = 0;
  });
  isInited = false;
}
function processAffectedHistory(chat, affected) {
  const isChannel = chat.type === 'chatTypeChannel' || chat.type === 'chatTypeSuperGroup';
  const channeId = isChannel ? (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_5__.buildMtpPeerId)(chat.id, 'channel') : undefined;
  const update = (0,_UpdatePts__WEBPACK_IMPORTED_MODULE_9__.buildLocalUpdatePts)(affected.pts, affected.ptsCount, channeId);
  processUpdate(update);
}
async function loadRemoteState() {
  const remoteState = await invoke(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.updates.GetState());
  if (!remoteState) return;
  applyState(remoteState);
  isInited = true;
}
function processDifference(difference, channelId) {
  difference.newMessages.forEach(message => {
    (0,_updater__WEBPACK_IMPORTED_MODULE_8__.updater)(new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNewMessage({
      message,
      pts: 0,
      ptsCount: 0
    }));
  });
  (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.addEntitiesToLocalDb)(difference.users);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.addEntitiesToLocalDb)(difference.chats);
  (0,_updater__WEBPACK_IMPORTED_MODULE_8__.dispatchUserAndChatUpdates)(difference.users);
  (0,_updater__WEBPACK_IMPORTED_MODULE_8__.dispatchUserAndChatUpdates)(difference.chats);

  // Ignore `pts`/`seq` holes when applying updates from difference
  // BUT, if we got an `UpdateChannelTooLong`, make sure to process other updates after receiving `ChannelDifference`
  const channelTooLongIds = new Set();
  difference.otherUpdates.forEach(update => {
    const updateChannelId = getUpdateChannelId(update);
    if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChannelTooLong) {
      channelTooLongIds.add(getUpdateChannelId(update));
    }
    const shouldApplyImmediately = !channelTooLongIds.has(updateChannelId);
    processUpdate(update, shouldApplyImmediately, !shouldApplyImmediately);
  });

  // Continue processing updates in queues
  if (channelId) {
    popPtsQueue(channelId);
  } else {
    popSeqQueue();
  }
}
function getPtsCount(update) {
  return 'ptsCount' in update ? update.ptsCount : 0;
}
function seqComparator(a, b) {
  const seqA = 'seqStart' in a ? a.seqStart : a.seq;
  const seqB = 'seqStart' in b ? b.seqStart : b.seq;
  return seqA - seqB;
}
function ptsComparator(a, b) {
  const diff = a.pts - b.pts;
  if (diff !== 0) {
    return diff;
  }
  return getPtsCount(b) - getPtsCount(a);
}

/***/ }),

/***/ "./src/api/gramjs/updates/updater.ts":
/*!*******************************************!*\
  !*** ./src/api/gramjs/updates/updater.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dispatchThreadInfoUpdates: () => (/* binding */ dispatchThreadInfoUpdates),
/* harmony export */   dispatchUserAndChatUpdates: () => (/* binding */ dispatchUserAndChatUpdates),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   sendUpdate: () => (/* binding */ sendUpdate),
/* harmony export */   updater: () => (/* binding */ updater)
/* harmony export */ });
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/gramjs */ "./src/lib/gramjs/index.js");
/* harmony import */ var _lib_gramjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_gramjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/iteratees */ "./src/util/iteratees.ts");
/* harmony import */ var _util_serverTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/serverTime */ "./src/util/serverTime.ts");
/* harmony import */ var _apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiBuilders/bots */ "./src/api/gramjs/apiBuilders/bots.ts");
/* harmony import */ var _apiBuilders_calls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../apiBuilders/calls */ "./src/api/gramjs/apiBuilders/calls.ts");
/* harmony import */ var _apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../apiBuilders/chats */ "./src/api/gramjs/apiBuilders/chats.ts");
/* harmony import */ var _apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../apiBuilders/common */ "./src/api/gramjs/apiBuilders/common.ts");
/* harmony import */ var _apiBuilders_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../apiBuilders/helpers */ "./src/api/gramjs/apiBuilders/helpers.ts");
/* harmony import */ var _apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../apiBuilders/messageContent */ "./src/api/gramjs/apiBuilders/messageContent.ts");
/* harmony import */ var _apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../apiBuilders/messages */ "./src/api/gramjs/apiBuilders/messages.ts");
/* harmony import */ var _apiBuilders_misc__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../apiBuilders/misc */ "./src/api/gramjs/apiBuilders/misc.ts");
/* harmony import */ var _apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../apiBuilders/peers */ "./src/api/gramjs/apiBuilders/peers.ts");
/* harmony import */ var _apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../apiBuilders/reactions */ "./src/api/gramjs/apiBuilders/reactions.ts");
/* harmony import */ var _apiBuilders_stories__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../apiBuilders/stories */ "./src/api/gramjs/apiBuilders/stories.ts");
/* harmony import */ var _apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../apiBuilders/symbols */ "./src/api/gramjs/apiBuilders/symbols.ts");
/* harmony import */ var _apiBuilders_users__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../apiBuilders/users */ "./src/api/gramjs/apiBuilders/users.ts");
/* harmony import */ var _gramjsBuilders__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../gramjsBuilders */ "./src/api/gramjs/gramjsBuilders/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _localDb__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../localDb */ "./src/api/gramjs/localDb.ts");
/* harmony import */ var _scheduleUnmute__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../scheduleUnmute */ "./src/api/gramjs/scheduleUnmute.ts");
/* harmony import */ var _UpdatePremiumFloodWait__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./UpdatePremiumFloodWait */ "./src/api/gramjs/updates/UpdatePremiumFloodWait.ts");
/* harmony import */ var _UpdatePts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./UpdatePts */ "./src/api/gramjs/updates/UpdatePts.ts");























let onUpdate;
function init(_onUpdate) {
  onUpdate = _onUpdate;
}
const sentMessageIds = new Set();
function dispatchUserAndChatUpdates(entities) {
  entities.filter(e => e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User).map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_16__.buildApiUser).forEach(user => {
    if (!user) {
      return;
    }
    onUpdate({
      '@type': 'updateUser',
      id: user.id,
      user
    });
  });
  entities.filter(e => e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Chat || e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatForbidden || e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Channel || e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChannelForbidden).map(e => (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildApiChatFromPreview)(e)).forEach(chat => {
    if (!chat) {
      return;
    }
    onUpdate({
      '@type': 'updateChat',
      id: chat.id,
      chat
    });
  });
}
function dispatchThreadInfoUpdates(messages) {
  const threadInfoUpdates = (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.compact)(messages).map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildApiThreadInfoFromMessage).filter(Boolean);
  if (!threadInfoUpdates.length) return;
  onUpdate({
    '@type': 'updateThreadInfos',
    threadInfoUpdates
  });
}
function sendUpdate(update) {
  onUpdate(update);
}
function updater(update) {
  if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.connection.UpdateServerTimeOffset) {
    (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_3__.setServerTimeOffset)(update.timeOffset);
    onUpdate({
      '@type': 'updateServerTimeOffset',
      serverTimeOffset: update.timeOffset
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.connection.UpdateConnectionState) {
    let connectionState;
    switch (update.state) {
      case _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.connection.UpdateConnectionState.disconnected:
        connectionState = 'connectionStateConnecting';
        break;
      case _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.connection.UpdateConnectionState.broken:
        connectionState = 'connectionStateBroken';
        break;
      case _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.connection.UpdateConnectionState.connected:
      default:
        connectionState = 'connectionStateReady';
        break;
    }
    onUpdate({
      '@type': 'updateConnectionState',
      connectionState
    });

    // Messages
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNewMessage || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNewScheduledMessage || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNewChannelMessage || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateShortChatMessage || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateShortMessage) {
    let message;
    let shouldForceReply;

    // eslint-disable-next-line no-underscore-dangle
    const entities = update._entities;
    if (entities) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addEntitiesToLocalDb)(entities);
      dispatchUserAndChatUpdates(entities);
    }
    if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateShortChatMessage) {
      message = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildApiMessageFromShortChat)(update);
    } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateShortMessage) {
      message = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildApiMessageFromShort)(update);
    } else {
      // TODO Remove if proven not reproducing
      if (update.message instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageEmpty) {
        if (_config__WEBPACK_IMPORTED_MODULE_1__.DEBUG) {
          // eslint-disable-next-line no-console
          console.error('Unexpected update:', update.className, update);
        }
        return;
      }
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addMessageToLocalDb)(update.message);
      message = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildApiMessage)(update.message);
      dispatchThreadInfoUpdates([update.message]);
      shouldForceReply = 'replyMarkup' in update.message && update.message?.replyMarkup instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ReplyKeyboardForceReply && (!update.message.replyMarkup.selective || message.isMentioned);
    }
    if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNewScheduledMessage) {
      onUpdate({
        '@type': sentMessageIds.has(message.id) ? 'updateScheduledMessage' : 'newScheduledMessage',
        id: message.id,
        chatId: message.chatId,
        message
      });
    } else {
      // We don't have preview for action or 'via bot' messages, so `newMessage` update here is required
      const hasLocalCopy = sentMessageIds.has(message.id) && !message.viaBotId && !message.content.action;
      onUpdate({
        '@type': hasLocalCopy ? 'updateMessage' : 'newMessage',
        id: message.id,
        chatId: message.chatId,
        message,
        shouldForceReply
      });
    }

    // Some updates to a Chat/Channel don't have a dedicated update class.
    // We can get info on some updates from Service Messages.
    if (update.message instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageService) {
      const {
        action
      } = update.message;
      if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatEditTitle) {
        onUpdate({
          '@type': 'updateChat',
          id: message.chatId,
          chat: {
            title: action.title
          }
        });
      } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatEditPhoto) {
        const photo = (0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_17__.buildChatPhotoForLocalDb)(action.photo);
        const avatarHash = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildAvatarHash)(photo);
        const localDbChatId = (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.resolveMessageApiChatId)(update.message);
        if (_localDb__WEBPACK_IMPORTED_MODULE_19__["default"].chats[localDbChatId]) {
          _localDb__WEBPACK_IMPORTED_MODULE_19__["default"].chats[localDbChatId].photo = photo;
        }
        (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addPhotoToLocalDb)(action.photo);
        if (avatarHash) {
          onUpdate({
            '@type': 'updateChat',
            id: message.chatId,
            chat: {
              avatarHash
            },
            ...(action.photo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Photo && {
              newProfilePhoto: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__.buildApiPhoto)(action.photo)
            })
          });
        }
      } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatDeletePhoto) {
        const localDbChatId = (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.resolveMessageApiChatId)(update.message);
        if (_localDb__WEBPACK_IMPORTED_MODULE_19__["default"].chats[localDbChatId]) {
          _localDb__WEBPACK_IMPORTED_MODULE_19__["default"].chats[localDbChatId].photo = new _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChatPhotoEmpty();
        }
        onUpdate({
          '@type': 'updateChat',
          id: message.chatId,
          chat: {
            avatarHash: undefined
          }
        });
      } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatDeleteUser) {
        // eslint-disable-next-line no-underscore-dangle
        if (update._entities && update._entities.some(e => e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User && Boolean(e.self) && e.id === action.userId)) {
          onUpdate({
            '@type': 'updateChat',
            id: message.chatId,
            chat: {
              isForbidden: true,
              isNotJoined: true
            }
          });
        }
      } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionChatAddUser) {
        // eslint-disable-next-line no-underscore-dangle
        if (update._entities && update._entities.some(e => e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User && Boolean(e.self) && action.users.includes(e.id))) {
          onUpdate({
            '@type': 'updateChatJoin',
            id: message.chatId
          });
        }
      } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionGroupCall) {
        if (!action.duration && action.call) {
          onUpdate({
            '@type': 'updateGroupCallChatId',
            chatId: message.chatId,
            call: {
              id: action.call.id.toString(),
              accessHash: action.call.accessHash.toString()
            }
          });
        }
      } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionTopicEdit) {
        const replyTo = update.message.replyTo instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageReplyHeader ? update.message.replyTo : undefined;
        const {
          replyToMsgId,
          replyToTopId,
          forumTopic: isTopicReply
        } = replyTo || {};
        const topicId = !isTopicReply ? _config__WEBPACK_IMPORTED_MODULE_1__.GENERAL_TOPIC_ID : replyToTopId || replyToMsgId || _config__WEBPACK_IMPORTED_MODULE_1__.GENERAL_TOPIC_ID;
        onUpdate({
          '@type': 'updateTopic',
          chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.message.peerId),
          topicId
        });
      } else if (action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageActionTopicCreate) {
        onUpdate({
          '@type': 'updateTopics',
          chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.message.peerId)
        });
      }
    }
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateQuickReplyMessage) {
    const message = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildApiMessage)(update.message);
    if (!message) return;
    onUpdate({
      '@type': 'updateQuickReplyMessage',
      id: message.id,
      message
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDeleteQuickReplyMessages) {
    onUpdate({
      '@type': 'deleteQuickReplyMessages',
      quickReplyId: update.shortcutId,
      messageIds: update.messages
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateQuickReplies) {
    const quickReplies = update.quickReplies.map(_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildApiQuickReply);
    onUpdate({
      '@type': 'updateQuickReplies',
      quickReplies
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNewQuickReply) {
    const quickReply = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildApiQuickReply)(update.quickReply);
    onUpdate({
      '@type': 'updateQuickReplies',
      quickReplies: [quickReply]
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDeleteQuickReply) {
    onUpdate({
      '@type': 'deleteQuickReply',
      quickReplyId: update.shortcutId
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateEditMessage || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateEditChannelMessage) {
    // TODO Remove if proven not reproducing
    if (update.message instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageEmpty) {
      if (_config__WEBPACK_IMPORTED_MODULE_1__.DEBUG) {
        // eslint-disable-next-line no-console
        console.error('Unexpected update:', update.className, update);
      }
      return;
    }
    (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addMessageToLocalDb)(update.message);

    // Workaround for a weird server behavior when own message is marked as incoming
    const message = (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.omit)((0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildApiMessage)(update.message), ['isOutgoing']);
    dispatchThreadInfoUpdates([update.message]);
    onUpdate({
      '@type': 'updateMessage',
      id: message.id,
      chatId: message.chatId,
      message
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateMessageReactions) {
    onUpdate({
      '@type': 'updateMessageReactions',
      id: update.msgId,
      chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer),
      reactions: (0,_apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_13__.buildMessageReactions)(update.reactions)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateMessageExtendedMedia) {
    const chatId = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer);
    const isBought = update.extendedMedia[0] instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMedia;
    if (isBought) {
      const boughtMedia = (0,_apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_9__.buildBoughtMediaContent)(update.extendedMedia);
      if (!boughtMedia?.length) return;
      onUpdate({
        '@type': 'updateMessageExtendedMedia',
        id: update.msgId,
        chatId,
        isBought,
        extendedMedia: boughtMedia
      });
      return;
    }
    const previewMedia = !isBought ? update.extendedMedia.filter(m => m instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.MessageExtendedMediaPreview).map(m => (0,_apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_9__.buildApiMessageExtendedMediaPreview)(m)).filter(Boolean) : undefined;
    if (!previewMedia?.length) return;
    onUpdate({
      '@type': 'updateMessageExtendedMedia',
      id: update.msgId,
      chatId,
      extendedMedia: previewMedia
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDeleteMessages) {
    onUpdate({
      '@type': 'deleteMessages',
      ids: update.messages
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDeleteScheduledMessages) {
    onUpdate({
      '@type': 'deleteScheduledMessages',
      ids: update.messages,
      chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDeleteChannelMessages) {
    const chatId = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel');
    onUpdate({
      '@type': 'deleteMessages',
      ids: update.messages,
      chatId
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateServiceNotification) {
    if (update.popup) {
      onUpdate({
        '@type': 'error',
        error: {
          message: update.message
        }
      });
    } else {
      const currentDate = Date.now() / 1000 + (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_3__.getServerTimeOffset)();
      const message = (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildApiMessageFromNotification)(update, currentDate);
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addMessageToLocalDb)((0,_gramjsBuilders__WEBPACK_IMPORTED_MODULE_17__.buildMessageFromUpdate)(message.id, message.chatId, update));
      onUpdate({
        '@type': 'updateServiceNotification',
        message
      });
    }
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateMessageID || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateShortSentMessage) {
    sentMessageIds.add(update.id);
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateReadMessagesContents) {
    onUpdate({
      '@type': 'updateCommonBoxMessages',
      ids: update.messages,
      messageUpdate: {
        hasUnreadMention: false,
        isMediaUnread: false
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChannelReadMessagesContents) {
    onUpdate({
      '@type': 'updateChannelMessages',
      channelId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel'),
      ids: update.messages,
      messageUpdate: {
        hasUnreadMention: false,
        isMediaUnread: false
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateMessagePoll) {
    const {
      pollId,
      poll,
      results
    } = update;
    if (poll) {
      const apiPoll = (0,_apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_9__.buildPoll)(poll, results);
      onUpdate({
        '@type': 'updateMessagePoll',
        pollId: String(pollId),
        pollUpdate: apiPoll
      });
    } else {
      const pollResults = (0,_apiBuilders_messageContent__WEBPACK_IMPORTED_MODULE_9__.buildPollResults)(results);
      onUpdate({
        '@type': 'updateMessagePoll',
        pollId: String(pollId),
        pollUpdate: {
          results: pollResults
        }
      });
    }
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateMessagePollVote) {
    onUpdate({
      '@type': 'updateMessagePollVote',
      pollId: String(update.pollId),
      peerId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer),
      options: update.options.map(_helpers__WEBPACK_IMPORTED_MODULE_18__.serializeBytes)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChannelMessageViews) {
    onUpdate({
      '@type': 'updateMessage',
      chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel'),
      id: update.id,
      message: {
        viewsCount: update.views
      }
    });

    // Chats
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateReadHistoryInbox) {
    onUpdate({
      '@type': 'updateChatInbox',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer),
      chat: {
        lastReadInboxMessageId: update.maxId,
        unreadCount: update.stillUnreadCount
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateReadHistoryOutbox) {
    onUpdate({
      '@type': 'updateChat',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer),
      chat: {
        lastReadOutboxMessageId: update.maxId
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateReadChannelInbox) {
    onUpdate({
      '@type': 'updateChat',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel'),
      chat: {
        lastReadInboxMessageId: update.maxId,
        unreadCount: update.stillUnreadCount
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateReadChannelOutbox) {
    onUpdate({
      '@type': 'updateChat',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel'),
      chat: {
        lastReadOutboxMessageId: update.maxId
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateReadChannelDiscussionInbox) {
    onUpdate({
      '@type': 'updateThreadInfos',
      threadInfoUpdates: [{
        chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel'),
        threadId: update.topMsgId,
        lastReadInboxMessageId: update.readMaxId
      }]
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateReadChannelDiscussionOutbox) {
    onUpdate({
      '@type': 'updateChat',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel'),
      chat: {
        lastReadOutboxMessageId: update.readMaxId
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDialogPinned && update.peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogPeer) {
    onUpdate({
      '@type': 'updateChatPinned',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer.peer),
      isPinned: update.pinned || false
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePinnedDialogs) {
    const ids = update.order ? update.order.filter(dp => dp instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogPeer).map(dp => (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(dp.peer)) : [];
    onUpdate({
      '@type': 'updatePinnedChatIds',
      ids,
      folderId: update.folderId || undefined
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateSavedDialogPinned && update.peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogPeer) {
    onUpdate({
      '@type': 'updateSavedDialogPinned',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer.peer),
      isPinned: update.pinned || false
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePinnedSavedDialogs) {
    const ids = update.order ? update.order.filter(dp => dp instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogPeer).map(dp => (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(dp.peer)) : [];
    onUpdate({
      '@type': 'updatePinnedSavedDialogIds',
      ids
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateFolderPeers) {
    update.folderPeers.forEach(folderPeer => {
      const {
        folderId,
        peer
      } = folderPeer;
      onUpdate({
        '@type': 'updateChatListType',
        id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(peer),
        folderId
      });
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDialogFilter) {
    const {
      id,
      filter
    } = update;
    const folder = (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.isChatFolder)(filter) ? (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildApiChatFolder)(filter) : undefined;
    onUpdate({
      '@type': 'updateChatFolder',
      id,
      folder
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDialogFilterOrder) {
    onUpdate({
      '@type': 'updateChatFoldersOrder',
      orderedIds: update.order
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChatParticipants) {
    const replacedMembers = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildChatMembers)(update.participants);
    onUpdate({
      '@type': 'updateChatMembers',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.participants.chatId, 'chat'),
      replacedMembers
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChatParticipantAdd) {
    const addedMember = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildChatMember)((0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.pick)(update, ['userId', 'inviterId', 'date']));
    onUpdate({
      '@type': 'updateChatMembers',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.chatId, 'chat'),
      addedMember
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChatParticipantDelete) {
    onUpdate({
      '@type': 'updateChatMembers',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.chatId, 'chat'),
      deletedMemberId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.userId, 'user')
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePinnedMessages || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePinnedChannelMessages) {
    const chatId = update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePinnedMessages ? (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer) : (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel');
    onUpdate({
      '@type': 'updatePinnedIds',
      chatId,
      messageIds: update.messages,
      isPinned: update.pinned
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNotifySettings && update.peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.NotifyPeer) {
    const payload = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_11__.buildApiNotifyException)(update.notifySettings, update.peer.peer);
    (0,_scheduleUnmute__WEBPACK_IMPORTED_MODULE_20__.scheduleMutedChatUpdate)(payload.chatId, payload.muteUntil, onUpdate);
    onUpdate({
      '@type': 'updateNotifyExceptions',
      ...payload
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNotifySettings && update.peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.NotifyForumTopic) {
    const payload = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_11__.buildApiNotifyExceptionTopic)(update.notifySettings, update.peer.peer, update.peer.topMsgId);
    (0,_scheduleUnmute__WEBPACK_IMPORTED_MODULE_20__.scheduleMutedTopicUpdate)(payload.chatId, payload.topicId, payload.muteUntil, onUpdate);
    onUpdate({
      '@type': 'updateTopicNotifyExceptions',
      ...payload
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateUserTyping || update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChatUserTyping) {
    const id = update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateUserTyping ? (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.userId, 'user') : (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.chatId, 'chat');
    if (update.action instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.SendMessageEmojiInteraction) {
      onUpdate({
        '@type': 'updateStartEmojiInteraction',
        id,
        emoji: update.action.emoticon,
        messageId: update.action.msgId,
        interaction: (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_15__.buildApiEmojiInteraction)(JSON.parse(update.action.interaction.data))
      });
    } else {
      onUpdate({
        '@type': 'updateChatTypingStatus',
        id,
        typingStatus: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildChatTypingStatus)(update)
      });
    }
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChannelUserTyping) {
    const id = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel');
    onUpdate({
      '@type': 'updateChatTypingStatus',
      id,
      threadId: update.topMsgId,
      typingStatus: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildChatTypingStatus)(update)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChannel) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _entities
    } = update;
    if (!_entities) {
      return;
    }
    const channel = _entities.find(e => e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Channel || e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChannelForbidden);
    if (channel instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.Channel) {
      const chat = (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildApiChatFromPreview)(channel);
      if (chat) {
        onUpdate({
          '@type': 'updateChat',
          id: chat.id,
          chat
        });
        onUpdate({
          '@type': chat.isNotJoined ? 'updateChatLeave' : 'updateChatJoin',
          id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel')
        });
      }
    } else if (channel instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.ChannelForbidden) {
      const chatId = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel');
      onUpdate({
        '@type': 'updateChat',
        id: chatId,
        chat: {
          isRestricted: true
        }
      });
      onUpdate({
        '@type': 'updateChatLeave',
        id: chatId
      });
    } else if (_entities.length === 0) {
      // The link to the discussion group may have been changed.
      // No corresponding update available at this moment https://core.telegram.org/type/Updates
      onUpdate({
        '@type': 'resetMessages',
        id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel')
      });
    }
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDialogUnreadMark && update.peer instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.DialogPeer) {
    onUpdate({
      '@type': 'updateChat',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer.peer),
      chat: {
        hasUnreadMark: update.unread
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChatDefaultBannedRights) {
    onUpdate({
      '@type': 'updateChat',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer),
      chat: {
        defaultBannedRights: (0,_apiBuilders_helpers__WEBPACK_IMPORTED_MODULE_8__.omitVirtualClassFields)(update.defaultBannedRights)
      }
    });

    // Users
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateUserStatus) {
    onUpdate({
      '@type': 'updateUserStatus',
      userId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.userId, 'user'),
      status: (0,_apiBuilders_users__WEBPACK_IMPORTED_MODULE_16__.buildApiUserStatus)(update.status)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateUser) {
    onUpdate({
      '@type': 'updateRequestUserUpdate',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.userId, 'user')
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateUserEmojiStatus) {
    const emojiStatus = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiEmojiStatus)(update.emojiStatus);
    onUpdate({
      '@type': 'updateUserEmojiStatus',
      userId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.userId, 'user'),
      emojiStatus
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateUserName) {
    const apiUserId = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.userId, 'user');
    const updatedUser = _localDb__WEBPACK_IMPORTED_MODULE_19__["default"].users[apiUserId];
    const user = updatedUser?.mutualContact && !updatedUser.self ? (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.pick)(update, []) : (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__.pick)(update, ['firstName', 'lastName']);
    const usernames = (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__.buildApiUsernames)(update);
    onUpdate({
      '@type': 'updateUser',
      id: apiUserId,
      user: {
        ...user,
        usernames
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateUserPhone) {
    const {
      userId,
      phone
    } = update;
    onUpdate({
      '@type': 'updateUser',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(userId, 'user'),
      user: {
        phoneNumber: phone
      }
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePeerSettings) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _entities,
      settings
    } = update;
    if (!_entities) {
      return;
    }
    if (_entities?.length) {
      _entities.filter(e => e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User && !e.contact).forEach(user => {
        onUpdate({
          '@type': 'deleteContact',
          id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(user.id, 'user')
        });
      });
      _entities.filter(e => e instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.User && e.contact).map(_apiBuilders_users__WEBPACK_IMPORTED_MODULE_16__.buildApiUser).forEach(user => {
        if (!user) {
          return;
        }
        onUpdate({
          '@type': 'updateUser',
          id: user.id,
          user: {
            ...user,
            ...(settings && {
              settings: (0,_apiBuilders_chats__WEBPACK_IMPORTED_MODULE_6__.buildApiChatSettings)(settings)
            })
          }
        });
      });
    }

    // Settings
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNotifySettings) {
    const {
      notifySettings: {
        showPreviews,
        silent,
        muteUntil
      },
      peer: {
        className
      }
    } = update;
    const peerType = className === 'NotifyUsers' ? 'contact' : className === 'NotifyChats' ? 'group' : className === 'NotifyBroadcasts' ? 'broadcast' : undefined;
    if (!peerType) {
      return;
    }
    onUpdate({
      '@type': 'updateNotifySettings',
      peerType,
      isSilent: Boolean(silent || typeof muteUntil === 'number' && Date.now() + (0,_util_serverTime__WEBPACK_IMPORTED_MODULE_3__.getServerTimeOffset)() * 1000 < muteUntil * 1000),
      shouldShowPreviews: Boolean(showPreviews)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePeerBlocked) {
    onUpdate({
      '@type': 'updatePeerBlocked',
      id: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peerId),
      isBlocked: update.blocked,
      isBlockedFromStories: update.blockedMyStoriesFrom
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePrivacy) {
    const key = (0,_apiBuilders_misc__WEBPACK_IMPORTED_MODULE_11__.buildPrivacyKey)(update.key);
    if (key) {
      onUpdate({
        '@type': 'updatePrivacy',
        key,
        rules: (0,_apiBuilders_common__WEBPACK_IMPORTED_MODULE_7__.buildPrivacyRules)(update.rules)
      });
    }

    // Misc
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateDraftMessage) {
    onUpdate({
      '@type': 'draftMessage',
      chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer),
      threadId: update.topMsgId,
      draft: (0,_apiBuilders_messages__WEBPACK_IMPORTED_MODULE_10__.buildMessageDraft)(update.draft)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateContactsReset) {
    onUpdate({
      '@type': 'updateResetContactList'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateFavedStickers) {
    onUpdate({
      '@type': 'updateFavoriteStickers'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateRecentStickers) {
    onUpdate({
      '@type': 'updateRecentStickers'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateRecentReactions) {
    onUpdate({
      '@type': 'updateRecentReactions'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateSavedReactionTags) {
    onUpdate({
      '@type': 'updateSavedReactionTags'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateMoveStickerSetToTop) {
    if (!update.masks) {
      onUpdate({
        '@type': 'updateMoveStickerSetToTop',
        isCustomEmoji: update.emojis,
        id: update.stickerset.toString()
      });
    }
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateStickerSets) {
    onUpdate({
      '@type': 'updateStickerSets'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateStickerSetsOrder) {
    if (!update.masks) {
      onUpdate({
        '@type': 'updateStickerSetsOrder',
        order: update.order.map(n => n.toString()),
        isCustomEmoji: update.emojis
      });
    }
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNewStickerSet) {
    if (update.stickerset instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.messages.StickerSet) {
      const stickerSet = (0,_apiBuilders_symbols__WEBPACK_IMPORTED_MODULE_15__.buildStickerSet)(update.stickerset.set);
      onUpdate({
        '@type': 'updateStickerSet',
        id: stickerSet.id,
        stickerSet
      });
    }
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateSavedGifs) {
    onUpdate({
      '@type': 'updateSavedGifs'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateGroupCall) {
    // eslint-disable-next-line no-underscore-dangle
    const entities = update._entities;
    if (entities) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addEntitiesToLocalDb)(entities);
      dispatchUserAndChatUpdates(entities);
    }
    onUpdate({
      '@type': 'updateGroupCall',
      call: (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_5__.buildApiGroupCall)(update.call)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateGroupCallConnection) {
    onUpdate({
      '@type': 'updateGroupCallConnection',
      data: JSON.parse(update.params.data),
      presentation: Boolean(update.presentation)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateGroupCallParticipants) {
    // eslint-disable-next-line no-underscore-dangle
    const entities = update._entities;
    if (entities) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addEntitiesToLocalDb)(entities);
      dispatchUserAndChatUpdates(entities);
    }
    onUpdate({
      '@type': 'updateGroupCallParticipants',
      groupCallId: (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_5__.getGroupCallId)(update.call),
      participants: update.participants.map(_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_5__.buildApiGroupCallParticipant)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePendingJoinRequests) {
    // eslint-disable-next-line no-underscore-dangle
    const entities = update._entities;
    if (entities) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addEntitiesToLocalDb)(entities);
      dispatchUserAndChatUpdates(entities);
    }
    onUpdate({
      '@type': 'updatePendingJoinRequests',
      chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer),
      recentRequesterIds: update.recentRequesters.map(id => (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(id, 'user')),
      requestsPending: update.requestsPending
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePhoneCall) {
    // eslint-disable-next-line no-underscore-dangle
    const entities = update._entities;
    if (entities) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addEntitiesToLocalDb)(entities);
      dispatchUserAndChatUpdates(entities);
    }
    onUpdate({
      '@type': 'updatePhoneCall',
      call: (0,_apiBuilders_calls__WEBPACK_IMPORTED_MODULE_5__.buildPhoneCall)(update.phoneCall)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdatePhoneCallSignalingData) {
    onUpdate({
      '@type': 'updatePhoneCallSignalingData',
      callId: update.phoneCallId.toString(),
      data: Array.from(update.data)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateWebViewResultSent) {
    const {
      queryId
    } = update;
    onUpdate({
      '@type': 'updateWebViewResultSent',
      queryId: queryId.toString()
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateBotMenuButton) {
    const {
      botId,
      button
    } = update;
    const id = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(botId, 'user');
    onUpdate({
      '@type': 'updateBotMenuButton',
      botId: id,
      button: (0,_apiBuilders_bots__WEBPACK_IMPORTED_MODULE_4__.buildApiBotMenuButton)(button)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateTranscribedAudio) {
    // eslint-disable-next-line no-underscore-dangle
    const entities = update._entities;
    if (entities) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addEntitiesToLocalDb)(entities);
      dispatchUserAndChatUpdates(entities);
    }
    onUpdate({
      '@type': 'updateTranscribedAudio',
      transcriptionId: update.transcriptionId.toString(),
      text: update.text,
      isPending: update.pending
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateConfig) {
    // eslint-disable-next-line no-underscore-dangle
    const entities = update._entities;
    if (entities) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addEntitiesToLocalDb)(entities);
      dispatchUserAndChatUpdates(entities);
    }
    onUpdate({
      '@type': 'updateConfig'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChannelPinnedTopic) {
    onUpdate({
      '@type': 'updatePinnedTopic',
      chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel'),
      topicId: update.topicId,
      isPinned: Boolean(update.pinned)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChannelPinnedTopics) {
    onUpdate({
      '@type': 'updatePinnedTopicsOrder',
      chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel'),
      order: update.order || []
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateRecentEmojiStatuses) {
    onUpdate({
      '@type': 'updateRecentEmojiStatuses'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateStory) {
    // eslint-disable-next-line no-underscore-dangle
    const entities = update._entities;
    if (entities) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addEntitiesToLocalDb)(entities);
      dispatchUserAndChatUpdates(entities);
    }
    const {
      story
    } = update;
    const peerId = (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer);
    (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.addStoryToLocalDb)(story, peerId);
    if (story instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.StoryItemDeleted) {
      onUpdate({
        '@type': 'deleteStory',
        peerId,
        storyId: story.id
      });
    } else {
      onUpdate({
        '@type': 'updateStory',
        peerId,
        story: (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_14__.buildApiStory)(peerId, story)
      });
    }
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateReadStories) {
    onUpdate({
      '@type': 'updateReadStories',
      peerId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer),
      lastReadId: update.maxId
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateSentStoryReaction) {
    onUpdate({
      '@type': 'updateSentStoryReaction',
      peerId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.getApiChatIdFromMtpPeer)(update.peer),
      storyId: update.storyId,
      reaction: (0,_apiBuilders_reactions__WEBPACK_IMPORTED_MODULE_13__.buildApiReaction)(update.reaction)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateStoriesStealthMode) {
    onUpdate({
      '@type': 'updateStealthMode',
      stealthMode: (0,_apiBuilders_stories__WEBPACK_IMPORTED_MODULE_14__.buildApiStealthMode)(update.stealthMode)
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateAttachMenuBots) {
    onUpdate({
      '@type': 'updateAttachMenuBots'
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateNewAuthorization) {
    onUpdate({
      '@type': 'updateNewAuthorization',
      hash: update.hash.toString(),
      date: update.date,
      device: update.device,
      location: update.location,
      isUnconfirmed: update.unconfirmed
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateChannelViewForumAsMessages) {
    onUpdate({
      '@type': 'updateViewForumAsMessages',
      chatId: (0,_apiBuilders_peers__WEBPACK_IMPORTED_MODULE_12__.buildApiPeerId)(update.channelId, 'channel'),
      isEnabled: update.enabled ? true : undefined
    });
  } else if (update instanceof _lib_gramjs__WEBPACK_IMPORTED_MODULE_0__.Api.UpdateStarsBalance) {
    onUpdate({
      '@type': 'updateStarsBalance',
      balance: update.balance.toJSNumber()
    });
  } else if (update instanceof _UpdatePremiumFloodWait__WEBPACK_IMPORTED_MODULE_21__["default"]) {
    onUpdate({
      '@type': 'updatePremiumFloodWait',
      isUpload: update.isUpload
    });
  } else if (update instanceof _UpdatePts__WEBPACK_IMPORTED_MODULE_22__.LocalUpdatePts || update instanceof _UpdatePts__WEBPACK_IMPORTED_MODULE_22__.LocalUpdateChannelPts) {
    // Do nothing, handled on the manager side
  } else if (_config__WEBPACK_IMPORTED_MODULE_1__.DEBUG) {
    const params = typeof update === 'object' && 'className' in update ? update.className : update;
    (0,_helpers__WEBPACK_IMPORTED_MODULE_18__.log)('UNEXPECTED UPDATE', params);
  }
}

/***/ }),

/***/ "./src/api/gramjs/worker/worker.ts":
/*!*****************************************!*\
  !*** ./src/api/gramjs/worker/worker.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config */ "./src/config.ts");
/* harmony import */ var _util_debugConsole__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/debugConsole */ "./src/util/debugConsole.ts");
/* harmony import */ var _util_schedulers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/schedulers */ "./src/util/schedulers.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./src/api/gramjs/helpers.ts");
/* harmony import */ var _methods_init__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../methods/init */ "./src/api/gramjs/methods/init.ts");
/* eslint-disable no-console */






const ORIGINAL_FUNCTIONS = _util_debugConsole__WEBPACK_IMPORTED_MODULE_1__.DEBUG_LEVELS.reduce((acc, level) => {
  acc[level] = console[level];
  return acc;
}, {});
function enableDebugLog() {
  _util_debugConsole__WEBPACK_IMPORTED_MODULE_1__.DEBUG_LEVELS.forEach(level => {
    console[level] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      postMessage({
        type: 'debugLog',
        level,
        args: JSON.parse(JSON.stringify(args, (key, value) => typeof value === 'bigint' ? value.toString() : value))
      });
    };
  });
}
function disableDebugLog() {
  _util_debugConsole__WEBPACK_IMPORTED_MODULE_1__.DEBUG_LEVELS.forEach(level => {
    console[level] = ORIGINAL_FUNCTIONS[level];
  });
}
handleErrors();
const callbackState = new Map();
if (_config__WEBPACK_IMPORTED_MODULE_0__.DEBUG) {
  console.log('>>> FINISH LOAD WORKER');
}
onmessage = async message => {
  const {
    data
  } = message;
  switch (data.type) {
    case 'initApi':
      {
        const {
          messageId,
          args
        } = data;
        await (0,_methods_init__WEBPACK_IMPORTED_MODULE_4__.initApi)(onUpdate, args[0], args[1]);
        if (messageId) {
          sendToOrigin({
            type: 'methodResponse',
            messageId,
            response: true
          });
        }
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
          if (messageId && withCallback) {
            const callback = function () {
              for (var _len2 = arguments.length, callbackArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                callbackArgs[_key2] = arguments[_key2];
              }
              const lastArg = callbackArgs[callbackArgs.length - 1];
              sendToOrigin({
                type: 'methodCallback',
                messageId,
                callbackArgs
              }, lastArg instanceof ArrayBuffer ? lastArg : undefined);
            };
            callbackState.set(messageId, callback);
            args.push(callback);
          }
          const response = await (0,_methods_init__WEBPACK_IMPORTED_MODULE_4__.callApi)(name, ...args);
          if (_config__WEBPACK_IMPORTED_MODULE_0__.DEBUG && typeof response === 'object' && 'CONSTRUCTOR_ID' in response) {
            (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.log)('UNEXPECTED RESPONSE', `${name}: ${response.className}`);
          }
          const {
            arrayBuffer
          } = typeof response === 'object' && 'arrayBuffer' in response && response || {};
          if (messageId) {
            sendToOrigin({
              type: 'methodResponse',
              messageId,
              response
            }, arrayBuffer);
          }
        } catch (error) {
          if (_config__WEBPACK_IMPORTED_MODULE_0__.DEBUG) {
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
          (0,_methods_init__WEBPACK_IMPORTED_MODULE_4__.cancelApiProgress)(callback);
        }
        break;
      }
    case 'ping':
      {
        sendToOrigin({
          type: 'methodResponse',
          messageId: data.messageId
        });
        break;
      }
    case 'toggleDebugMode':
      {
        if (data.isEnabled) {
          enableDebugLog();
        } else {
          disableDebugLog();
        }
      }
  }
};
function handleErrors() {
  self.onerror = e => {
    console.error(e);
    sendToOrigin({
      type: 'unhandledError',
      error: {
        message: e.error.message || 'Uncaught exception in worker'
      }
    });
  };
  self.addEventListener('unhandledrejection', e => {
    console.error(e);
    sendToOrigin({
      type: 'unhandledError',
      error: {
        message: e.reason.message || 'Uncaught rejection in worker'
      }
    });
  });
}
let pendingUpdates = [];
const sendUpdatesOnTickEnd = (0,_util_schedulers__WEBPACK_IMPORTED_MODULE_2__.throttleWithTickEnd)(() => {
  const currentUpdates = pendingUpdates;
  pendingUpdates = [];
  sendToOrigin({
    type: 'updates',
    updates: currentUpdates
  });
});
function onUpdate(update) {
  if (_config__WEBPACK_IMPORTED_MODULE_0__.DEBUG && update['@type'] !== 'updateUserStatus' && update['@type'] !== 'updateServerTimeOffset') {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.log)('UPDATE', update['@type'], update);
  }
  pendingUpdates.push(update);
  sendUpdatesOnTickEnd();
}
function sendToOrigin(data, arrayBuffer) {
  if (arrayBuffer) {
    postMessage(data, [arrayBuffer]);
  } else {
    postMessage(data);
  }
}

/***/ }),

/***/ "./src/api/types/bots.ts":
/*!*******************************!*\
  !*** ./src/api/types/bots.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/business.ts":
/*!***********************************!*\
  !*** ./src/api/types/business.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/calls.ts":
/*!********************************!*\
  !*** ./src/api/types/calls.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/chats.ts":
/*!********************************!*\
  !*** ./src/api/types/chats.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/index.ts":
/*!********************************!*\
  !*** ./src/api/types/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiMediaFormat: () => (/* reexport safe */ _media__WEBPACK_IMPORTED_MODULE_4__.ApiMediaFormat),
/* harmony export */   ApiMessageEntityTypes: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_2__.ApiMessageEntityTypes),
/* harmony export */   MAIN_THREAD_ID: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_2__.MAIN_THREAD_ID),
/* harmony export */   MESSAGE_DELETED: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_2__.MESSAGE_DELETED)
/* harmony export */ });
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./users */ "./src/api/types/users.ts");
/* harmony import */ var _chats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chats */ "./src/api/types/chats.ts");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./messages */ "./src/api/types/messages.ts");
/* harmony import */ var _updates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updates */ "./src/api/types/updates.ts");
/* harmony import */ var _media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./media */ "./src/api/types/media.ts");
/* harmony import */ var _payments__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./payments */ "./src/api/types/payments.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings */ "./src/api/types/settings.ts");
/* harmony import */ var _bots__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bots */ "./src/api/types/bots.ts");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./misc */ "./src/api/types/misc.ts");
/* harmony import */ var _calls__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./calls */ "./src/api/types/calls.ts");
/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./statistics */ "./src/api/types/statistics.ts");
/* harmony import */ var _stories__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stories */ "./src/api/types/stories.ts");
/* harmony import */ var _business__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./business */ "./src/api/types/business.ts");














/***/ }),

/***/ "./src/api/types/media.ts":
/*!********************************!*\
  !*** ./src/api/types/media.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiMediaFormat: () => (/* binding */ ApiMediaFormat)
/* harmony export */ });
// We cache avatars as Data URI for faster initial load
// and messages media as Blob for smaller size.

let ApiMediaFormat = /*#__PURE__*/function (ApiMediaFormat) {
  ApiMediaFormat[ApiMediaFormat["BlobUrl"] = 0] = "BlobUrl";
  ApiMediaFormat[ApiMediaFormat["Progressive"] = 1] = "Progressive";
  ApiMediaFormat[ApiMediaFormat["DownloadUrl"] = 2] = "DownloadUrl";
  ApiMediaFormat[ApiMediaFormat["Text"] = 3] = "Text";
  return ApiMediaFormat;
}({});

/***/ }),

/***/ "./src/api/types/messages.ts":
/*!***********************************!*\
  !*** ./src/api/types/messages.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiMessageEntityTypes: () => (/* binding */ ApiMessageEntityTypes),
/* harmony export */   MAIN_THREAD_ID: () => (/* binding */ MAIN_THREAD_ID),
/* harmony export */   MESSAGE_DELETED: () => (/* binding */ MESSAGE_DELETED)
/* harmony export */ });
/* Used for Invoice UI */

/* Used for Invoice request */

let ApiMessageEntityTypes = /*#__PURE__*/function (ApiMessageEntityTypes) {
  ApiMessageEntityTypes["Bold"] = "MessageEntityBold";
  ApiMessageEntityTypes["Blockquote"] = "MessageEntityBlockquote";
  ApiMessageEntityTypes["BotCommand"] = "MessageEntityBotCommand";
  ApiMessageEntityTypes["Cashtag"] = "MessageEntityCashtag";
  ApiMessageEntityTypes["Code"] = "MessageEntityCode";
  ApiMessageEntityTypes["Email"] = "MessageEntityEmail";
  ApiMessageEntityTypes["Hashtag"] = "MessageEntityHashtag";
  ApiMessageEntityTypes["Italic"] = "MessageEntityItalic";
  ApiMessageEntityTypes["MentionName"] = "MessageEntityMentionName";
  ApiMessageEntityTypes["Mention"] = "MessageEntityMention";
  ApiMessageEntityTypes["Phone"] = "MessageEntityPhone";
  ApiMessageEntityTypes["Pre"] = "MessageEntityPre";
  ApiMessageEntityTypes["Strike"] = "MessageEntityStrike";
  ApiMessageEntityTypes["TextUrl"] = "MessageEntityTextUrl";
  ApiMessageEntityTypes["Url"] = "MessageEntityUrl";
  ApiMessageEntityTypes["Underline"] = "MessageEntityUnderline";
  ApiMessageEntityTypes["Spoiler"] = "MessageEntitySpoiler";
  ApiMessageEntityTypes["CustomEmoji"] = "MessageEntityCustomEmoji";
  ApiMessageEntityTypes["Unknown"] = "MessageEntityUnknown";
  return ApiMessageEntityTypes;
}({});

// KeyboardButtons

const MAIN_THREAD_ID = -1;

// `Symbol` can not be transferred from worker
const MESSAGE_DELETED = 'MESSAGE_DELETED';

/***/ }),

/***/ "./src/api/types/misc.ts":
/*!*******************************!*\
  !*** ./src/api/types/misc.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/payments.ts":
/*!***********************************!*\
  !*** ./src/api/types/payments.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/settings.ts":
/*!***********************************!*\
  !*** ./src/api/types/settings.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/statistics.ts":
/*!*************************************!*\
  !*** ./src/api/types/statistics.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/stories.ts":
/*!**********************************!*\
  !*** ./src/api/types/stories.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/updates.ts":
/*!**********************************!*\
  !*** ./src/api/types/updates.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/api/types/users.ts":
/*!********************************!*\
  !*** ./src/api/types/users.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/lib/twemojiRegex.js":
/*!*********************************!*\
  !*** ./src/lib/twemojiRegex.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   removeVS16s: () => (/* binding */ removeVS16s)
/* harmony export */ });
// Copyright Twitter Inc. Licensed under MIT
// https://github.com/twitter/twemoji-parser/blob/master/LICENSE.md
// Emoji 15.0.2 support was taken here https://github.com/mei23/twemoji-parser
// Version 3d4dedc 15.12.2023

const vs16RegExp = /\uFE0F/g;
// avoid using a string literal like `\u200D` here because minifiers expand it inline
const zeroWidthJoiner = String.fromCharCode(0x200d);
function removeVS16s(rawEmoji) {
  return rawEmoji.indexOf(zeroWidthJoiner) < 0 ? rawEmoji.replace(vs16RegExp, '') : rawEmoji;
}

// Default Twemoji regex was modified here.
// An exception for ascii emoji has been added to the beginning of the regular string: 🅰🅱🅾🅿.
// UTF-16 endcoding are `\ud83c\udd70`, `\ud83c\udd71`, `\ud83c\udd7e` and `\ud83c\udd7f`.
// These emojis in the graphic version must end with the `\ufe0f` symbol.
// Therefore, they should be excluded from the regular expression.
// You must remove next substring `\udd70\udd71\udd7e\udd7f` from the middle of the regex on every update.

// This file is generated by source/emoji/scripts/generate.sh
// eslint-disable-next-line max-len
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/(?:\ud83c[\udd70\udd71\udd7e\udd7f]\ufe0f)|(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83c\udfc3|\ud83d\udeb6|\ud83e\uddce)(?:\ud83c[\udffb-\udfff])?(?:\u200d[\u2640\u2642]\ufe0f)?(?:\u200d\u27a1\ufe0f)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\ud83e[\uddaf\uddbc\uddbd])(?:\u200d\u27a1\ufe0f)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf\uddaf-\uddb3\uddbc\uddbc\uddbd\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd\uddce\uddce\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83e\uddd1\u200d\ud83e\uddd1\u200d\ud83e\uddd2\u200d\ud83e\uddd2|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83e\uddd1\u200d\ud83e\uddd1\u200d\ud83e\uddd2|\ud83e\uddd1\u200d\ud83e\uddd2\u200d\ud83e\uddd2|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u26d3\ufe0f\u200d\ud83d\udca5|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udf44\u200d\ud83d\udfeb|\ud83c\udf4b\u200d\ud83d\udfe9|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc26\u200d\ud83d\udd25|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83d\ude42\u200d\u2194\ufe0f|\ud83d\ude42\u200d\u2195\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddd1\u200d\ud83e\uddd2|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g);

/***/ }),

/***/ "./src/util/Deferred.ts":
/*!******************************!*\
  !*** ./src/util/Deferred.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Deferred)
/* harmony export */ });
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Deferred {
  constructor() {
    _defineProperty(this, "promise", void 0);
    _defineProperty(this, "reject", void 0);
    _defineProperty(this, "resolve", void 0);
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
  static resolved(value) {
    const deferred = new Deferred();
    deferred.resolve(value);
    return deferred;
  }
}

/***/ }),

/***/ "./src/util/SortedQueue.ts":
/*!*********************************!*\
  !*** ./src/util/SortedQueue.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortedQueue)
/* harmony export */ });
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class SortedQueue {
  constructor(comparator) {
    this.comparator = comparator;
    _defineProperty(this, "queue", void 0);
    this.queue = [];
  }
  add(item) {
    const index = this.binarySearch(item);
    this.queue.splice(index, 0, item);
  }
  pop() {
    return this.queue.shift();
  }
  get size() {
    return this.queue.length;
  }
  clear() {
    this.queue = [];
  }
  binarySearch(item) {
    let left = 0;
    let right = this.queue.length;
    while (left < right) {
      const middle = Math.floor((left + right) / 2);
      const comparison = this.comparator(item, this.queue[middle]);
      if (comparison === 0) {
        return middle;
      } else if (comparison > 0) {
        left = middle + 1;
      } else {
        right = middle;
      }
    }
    return left;
  }
}

/***/ }),

/***/ "./src/util/cacheApi.ts":
/*!******************************!*\
  !*** ./src/util/cacheApi.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Type: () => (/* binding */ Type),
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   fetch: () => (/* binding */ fetch),
/* harmony export */   isCacheApiSupported: () => (/* binding */ isCacheApiSupported),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   save: () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");


// eslint-disable-next-line no-restricted-globals
const cacheApi = self.caches;
let isSupported;
async function isCacheApiSupported() {
  if (!cacheApi) return false;
  isSupported = isSupported ?? (await cacheApi.has('test').then(() => true).catch(() => false));
  return isSupported;
}
let Type = /*#__PURE__*/function (Type) {
  Type[Type["Text"] = 0] = "Text";
  Type[Type["Blob"] = 1] = "Blob";
  Type[Type["Json"] = 2] = "Json";
  Type[Type["ArrayBuffer"] = 3] = "ArrayBuffer";
  return Type;
}({});
async function fetch(cacheName, key, type) {
  let isHtmlAllowed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!cacheApi) {
    return undefined;
  }
  try {
    // To avoid the error "Request scheme 'webdocument' is unsupported"
    const request = _config__WEBPACK_IMPORTED_MODULE_0__.IS_PACKAGED_ELECTRON ? `${_config__WEBPACK_IMPORTED_MODULE_0__.ELECTRON_HOST_URL}/${key.replace(/:/g, '_')}` : new Request(key.replace(/:/g, '_'));
    const cache = await cacheApi.open(cacheName);
    const response = await cache.match(request);
    if (!response) {
      return undefined;
    }
    const contentType = response.headers.get('Content-Type');
    switch (type) {
      case Type.Text:
        return await response.text();
      case Type.Blob:
        {
          // Ignore deprecated data-uri avatars
          if (key.startsWith('avatar') && contentType && contentType.startsWith('text')) {
            return undefined;
          }
          const blob = await response.blob();
          const shouldRecreate = !blob.type || !isHtmlAllowed && blob.type.includes('html');
          // iOS Safari fails to preserve `type` in cache
          let resolvedType = blob.type || contentType;
          if (!(shouldRecreate && resolvedType)) {
            return blob;
          }

          // Prevent HTML-in-video attacks (for files that were cached before fix)
          if (!isHtmlAllowed) {
            resolvedType = resolvedType.replace(/html/gi, '');
          }
          return new Blob([blob], {
            type: resolvedType
          });
        }
      case Type.Json:
        return await response.json();
      case Type.ArrayBuffer:
        return await response.arrayBuffer();
      default:
        return undefined;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    return undefined;
  }
}
async function save(cacheName, key, data) {
  if (!cacheApi) {
    return false;
  }
  try {
    const cacheData = typeof data === 'string' || data instanceof Blob || data instanceof ArrayBuffer ? data : JSON.stringify(data);
    // To avoid the error "Request scheme 'webdocument' is unsupported"
    const request = _config__WEBPACK_IMPORTED_MODULE_0__.IS_PACKAGED_ELECTRON ? `${_config__WEBPACK_IMPORTED_MODULE_0__.ELECTRON_HOST_URL}/${key.replace(/:/g, '_')}` : new Request(key.replace(/:/g, '_'));
    const response = new Response(cacheData);
    const cache = await cacheApi.open(cacheName);
    await cache.put(request, response);
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    return false;
  }
}
async function remove(cacheName, key) {
  try {
    if (!cacheApi) {
      return undefined;
    }
    const cache = await cacheApi.open(cacheName);
    return await cache.delete(key);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    return undefined;
  }
}
async function clear(cacheName) {
  try {
    if (!cacheApi) {
      return undefined;
    }
    return await cacheApi.delete(cacheName);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    return undefined;
  }
}

/***/ }),

/***/ "./src/util/debugConsole.ts":
/*!**********************************!*\
  !*** ./src/util/debugConsole.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_LEVELS: () => (/* binding */ DEBUG_LEVELS),
/* harmony export */   disableDebugConsole: () => (/* binding */ disableDebugConsole),
/* harmony export */   getDebugLogs: () => (/* binding */ getDebugLogs),
/* harmony export */   initDebugConsole: () => (/* binding */ initDebugConsole),
/* harmony export */   logDebugMessage: () => (/* binding */ logDebugMessage)
/* harmony export */ });
/* eslint-disable no-console */

const DEBUG_LEVELS = ['log', 'error', 'warn', 'info', 'debug'];
// @ts-ignore
const ORIGINAL_FUNCTIONS = DEBUG_LEVELS.reduce((acc, level) => {
  // @ts-ignore
  acc[level] = console[level];
  return acc;
}, {});
let DEBUG_LOGS = [];
function logDebugMessage(level) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  DEBUG_LOGS.push({
    level,
    args,
    date: new Date()
  });
  ORIGINAL_FUNCTIONS[level](...args);
}
function initDebugConsole() {
  DEBUG_LOGS = [];
  DEBUG_LEVELS.forEach(level => {
    // @ts-ignore
    console[level] = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      logDebugMessage(level, ...args);
    };
  });
}
function disableDebugConsole() {
  DEBUG_LEVELS.forEach(level => {
    // @ts-ignore
    console[level] = ORIGINAL_FUNCTIONS[level];
  });
  DEBUG_LOGS = [];
}
function getDebugLogs() {
  return JSON.stringify(DEBUG_LOGS, (key, value) => typeof value === 'bigint' ? value.toString() : value);
}

/***/ }),

/***/ "./src/util/emoji/fixNonStandardEmoji.ts":
/*!***********************************************!*\
  !*** ./src/util/emoji/fixNonStandardEmoji.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fixNonStandardEmoji)
/* harmony export */ });
/* harmony import */ var _lib_twemojiRegex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/twemojiRegex */ "./src/lib/twemojiRegex.js");


// Non-standard variations of emojis, used on some devices
const EMOJI_EXCEPTIONS = [[/\u{1f3f3}\u200d\u{1f308}/gu, '\u{1f3f3}\ufe0f\u200d\u{1f308}'],
// 🏳‍🌈
[/\u{1f3f3}\u200d\u26a7\ufe0f?/gu, '\u{1f3f3}\ufe0f\u200d\u26a7\ufe0f'],
// 🏳️‍⚧️
[/\u26d3\u200d\u{1f4a5}/gu, '\u26d3\ufe0f\u200d\u{1f4a5}'],
// ⛓‍💥
[/\u200d([\u2640\u2642])(?!\ufe0f)/gu, '\u200d$1\ufe0f'] // Gender variation without 0xFE0F
];
function fixNonStandardEmoji(text) {
  // Non-standard sequences typically parsed as separate emojis, so no need to fix text without any
  if (!text.match(_lib_twemojiRegex__WEBPACK_IMPORTED_MODULE_0__["default"])) return text;
  // eslint-disable-next-line no-restricted-syntax
  for (const [regex, replacement] of EMOJI_EXCEPTIONS) {
    text = text.replace(regex, replacement);
  }
  return text;
}

/***/ }),

/***/ "./src/util/emoji/parseEmojiOnlyString.ts":
/*!************************************************!*\
  !*** ./src/util/emoji/parseEmojiOnlyString.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_twemojiRegex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/twemojiRegex */ "./src/lib/twemojiRegex.js");
/* harmony import */ var _fixNonStandardEmoji__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fixNonStandardEmoji */ "./src/util/emoji/fixNonStandardEmoji.ts");


const DETECT_UP_TO = 100;
const MAX_LENGTH = DETECT_UP_TO * 8; // Maximum 8 per one emoji.
const RE_EMOJI_ONLY = new RegExp(`^(?:${_lib_twemojiRegex__WEBPACK_IMPORTED_MODULE_0__["default"].source})+$`, '');
const parseEmojiOnlyString = text => {
  const standardizedText = (0,_fixNonStandardEmoji__WEBPACK_IMPORTED_MODULE_1__["default"])(text);
  const lines = standardizedText.split('\n');
  const textWithoutNewlines = lines.join('');
  if (textWithoutNewlines.length > MAX_LENGTH) {
    return false;
  }
  const isEmojiOnly = Boolean(textWithoutNewlines.match(RE_EMOJI_ONLY));
  if (!isEmojiOnly) {
    return false;
  }
  const countPerLine = lines.map(line => {
    let emojiCount = 0;
    while (_lib_twemojiRegex__WEBPACK_IMPORTED_MODULE_0__["default"].exec(line)) {
      emojiCount++;
      if (emojiCount > DETECT_UP_TO) {
        _lib_twemojiRegex__WEBPACK_IMPORTED_MODULE_0__["default"].lastIndex = 0;
        return -1;
      }
    }
    return emojiCount;
  });
  let max = lines.length;
  for (let i = 0; i < countPerLine.length; i++) {
    if (countPerLine[i] === -1) {
      return false;
    }
    if (countPerLine[i] > max) {
      max = countPerLine[i];
    }
  }
  return max;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseEmojiOnlyString);

/***/ }),

/***/ "./src/util/files.ts":
/*!***************************!*\
  !*** ./src/util/files.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blobToDataUri: () => (/* binding */ blobToDataUri),
/* harmony export */   blobToFile: () => (/* binding */ blobToFile),
/* harmony export */   createPosterForVideo: () => (/* binding */ createPosterForVideo),
/* harmony export */   dataUriToBlob: () => (/* binding */ dataUriToBlob),
/* harmony export */   fetchBlob: () => (/* binding */ fetchBlob),
/* harmony export */   fetchFile: () => (/* binding */ fetchFile),
/* harmony export */   hasPreview: () => (/* binding */ hasPreview),
/* harmony export */   imgToCanvas: () => (/* binding */ imgToCanvas),
/* harmony export */   preloadImage: () => (/* binding */ preloadImage),
/* harmony export */   preloadVideo: () => (/* binding */ preloadVideo),
/* harmony export */   validateFiles: () => (/* binding */ validateFiles)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _schedulers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedulers */ "./src/util/schedulers.ts");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



// Polyfill for Safari: `File` is not available in web worker
if (typeof File === 'undefined') {
  // eslint-disable-next-line no-global-assign, no-restricted-globals, func-names
  self.File = class extends Blob {
    constructor(fileBits, fileName, options) {
      if (options) {
        const {
          type,
          ...rest
        } = options;
        super(fileBits, {
          type
        });
        _defineProperty(this, "name", void 0);
        Object.assign(this, rest);
      } else {
        super(fileBits);
        _defineProperty(this, "name", void 0);
      }
      this.name = fileName;
    }
  };
}
function dataUriToBlob(dataUri) {
  const arr = dataUri.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}
function blobToDataUri(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const {
        result
      } = e.target || {};
      if (typeof result === 'string') {
        resolve(result);
      }
      reject(new Error('Failed to read blob'));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
function blobToFile(blob, fileName) {
  return new File([blob], fileName, {
    lastModified: Date.now(),
    type: blob.type
  });
}
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
function preloadVideo(url) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.volume = 0;
    video.onloadedmetadata = () => resolve(video);
    video.onerror = reject;
    video.src = url;
  });
}
async function createPosterForVideo(url) {
  try {
    const video = await preloadVideo(url);
    return await Promise.race([(0,_schedulers__WEBPACK_IMPORTED_MODULE_1__.pause)(2000), new Promise((resolve, reject) => {
      video.onseeked = () => {
        if (!video.videoWidth || !video.videoHeight) {
          resolve(undefined);
        }
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        canvas.toBlob(blob => {
          resolve(blob ? URL.createObjectURL(blob) : undefined);
        });
      };
      video.onerror = reject;
      video.currentTime = Math.min(video.duration, 1);
    })]);
  } catch (e) {
    return undefined;
  }
}
async function fetchBlob(blobUrl) {
  const response = await fetch(blobUrl);
  return response.blob();
}
async function fetchFile(blobUrl, fileName) {
  const blob = await fetchBlob(blobUrl);
  return blobToFile(blob, fileName);
}
function imgToCanvas(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return canvas;
}
function hasPreview(file) {
  return _config__WEBPACK_IMPORTED_MODULE_0__.CONTENT_TYPES_WITH_PREVIEW.has(file.type);
}
function validateFiles(files) {
  if (!files?.length) {
    return undefined;
  }
  return Array.from(files).map(fixMovMime).filter(file => file.size);
}

// .mov MIME type not reported sometimes https://developer.mozilla.org/en-US/docs/Web/API/File/type#sect1
function fixMovMime(file) {
  const ext = file.name.split('.').pop();
  if (!file.type && ext.toLowerCase() === 'mov') {
    return new File([file], file.name, {
      type: 'video/quicktime'
    });
  }
  return file;
}

/***/ }),

/***/ "./src/util/iteratees.ts":
/*!*******************************!*\
  !*** ./src/util/iteratees.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   areSortedArraysEqual: () => (/* binding */ areSortedArraysEqual),
/* harmony export */   areSortedArraysIntersecting: () => (/* binding */ areSortedArraysIntersecting),
/* harmony export */   buildCollectionByCallback: () => (/* binding */ buildCollectionByCallback),
/* harmony export */   buildCollectionByKey: () => (/* binding */ buildCollectionByKey),
/* harmony export */   cloneDeep: () => (/* binding */ cloneDeep),
/* harmony export */   compact: () => (/* binding */ compact),
/* harmony export */   compareFields: () => (/* binding */ compareFields),
/* harmony export */   excludeSortedArray: () => (/* binding */ excludeSortedArray),
/* harmony export */   findIntersectionWithSet: () => (/* binding */ findIntersectionWithSet),
/* harmony export */   findLast: () => (/* binding */ findLast),
/* harmony export */   isInsideSortedArrayRange: () => (/* binding */ isInsideSortedArrayRange),
/* harmony export */   isLiteralObject: () => (/* binding */ isLiteralObject),
/* harmony export */   mapValues: () => (/* binding */ mapValues),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   omitUndefined: () => (/* binding */ omitUndefined),
/* harmony export */   orderBy: () => (/* binding */ orderBy),
/* harmony export */   partition: () => (/* binding */ partition),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   pickTruthy: () => (/* binding */ pickTruthy),
/* harmony export */   split: () => (/* binding */ split),
/* harmony export */   unique: () => (/* binding */ unique),
/* harmony export */   uniqueByField: () => (/* binding */ uniqueByField)
/* harmony export */ });
function buildCollectionByKey(collection, key) {
  return collection.reduce((byKey, member) => {
    byKey[member[key]] = member;
    return byKey;
  }, {});
}
function buildCollectionByCallback(collection, callback) {
  return collection.reduce((byKey, member) => {
    const [key, value] = callback(member);
    byKey[key] = value;
    return byKey;
  }, {});
}
function mapValues(byKey, callback) {
  return Object.keys(byKey).reduce((newByKey, key, index) => {
    newByKey[key] = callback(byKey[key], key, index, byKey);
    return newByKey;
  }, {});
}
function pick(object, keys) {
  return keys.reduce((result, key) => {
    result[key] = object[key];
    return result;
  }, {});
}
function pickTruthy(object, keys) {
  return keys.reduce((result, key) => {
    if (object[key]) {
      result[key] = object[key];
    }
    return result;
  }, {});
}
function omit(object, keys) {
  const stringKeys = new Set(keys.map(String));
  const savedKeys = Object.keys(object).filter(key => !stringKeys.has(key));
  return pick(object, savedKeys);
}
function omitUndefined(object) {
  return Object.keys(object).reduce((result, stringKey) => {
    const key = stringKey;
    if (object[key] !== undefined) {
      result[key] = object[key];
    }
    return result;
  }, {});
}
function orderBy(collection, orderRule) {
  let mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';
  function compareValues(a, b, currentOrderRule, isAsc) {
    const aValue = (typeof currentOrderRule === 'function' ? currentOrderRule(a) : a[currentOrderRule]) || 0;
    const bValue = (typeof currentOrderRule === 'function' ? currentOrderRule(b) : b[currentOrderRule]) || 0;
    return isAsc ? aValue - bValue : bValue - aValue;
  }
  if (Array.isArray(orderRule)) {
    const [mode1, mode2] = Array.isArray(mode) ? mode : [mode, mode];
    const [orderRule1, orderRule2] = orderRule;
    const isAsc1 = mode1 === 'asc';
    const isAsc2 = mode2 === 'asc';
    return collection.sort((a, b) => {
      return compareValues(a, b, orderRule1, isAsc1) || compareValues(a, b, orderRule2, isAsc2);
    });
  }
  const isAsc = mode === 'asc';
  return collection.sort((a, b) => {
    return compareValues(a, b, orderRule, isAsc);
  });
}
function unique(array) {
  return Array.from(new Set(array));
}
function uniqueByField(array, field) {
  return [...new Map(array.map(item => [item[field], item])).values()];
}
function compact(array) {
  return array.filter(Boolean);
}
function areSortedArraysEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((item, i) => item === array2[i]);
}
function areSortedArraysIntersecting(array1, array2) {
  return array1[0] <= array2[array2.length - 1] && array1[array1.length - 1] >= array2[0];
}
function isInsideSortedArrayRange(value, array) {
  return array[0] <= value && value <= array[array.length - 1];
}
function findIntersectionWithSet(array, set) {
  return array.filter(a => set.has(a));
}
/**
 * Exlude elements from base array. Both arrays should be sorted in same order
 * @param base
 * @param toExclude
 * @returns New array without excluded elements
 */
function excludeSortedArray(base, toExclude) {
  if (!base?.length) return base;
  const result = [];
  let excludeIndex = 0;
  for (let i = 0; i < base.length; i++) {
    if (toExclude[excludeIndex] === base[i]) {
      excludeIndex += 1;
    } else {
      result.push(base[i]);
    }
  }
  return result;
}
function split(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
function partition(array, filter) {
  const pass = [];
  const fail = [];
  array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
  return [pass, fail];
}
function cloneDeep(value) {
  if (!isObject(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(cloneDeep);
  }
  return Object.keys(value).reduce((acc, key) => {
    acc[key] = cloneDeep(value[key]);
    return acc;
  }, {});
}
function isLiteralObject(value) {
  return isObject(value) && !Array.isArray(value);
}
function isObject(value) {
  // eslint-disable-next-line no-null/no-null
  return typeof value === 'object' && value !== null;
}
function findLast(array, predicate) {
  let cursor = array.length;
  while (cursor--) {
    if (predicate(array[cursor], cursor, array)) {
      return array[cursor];
    }
  }
  return undefined;
}
function compareFields(a, b) {
  return Number(b) - Number(a);
}

/***/ }),

/***/ "./src/util/messageKey.ts":
/*!********************************!*\
  !*** ./src/util/messageKey.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildMessageKey: () => (/* binding */ buildMessageKey),
/* harmony export */   getMessageKey: () => (/* binding */ getMessageKey),
/* harmony export */   getMessageServerKey: () => (/* binding */ getMessageServerKey),
/* harmony export */   isLocalMessageId: () => (/* binding */ isLocalMessageId),
/* harmony export */   parseMessageKey: () => (/* binding */ parseMessageKey)
/* harmony export */ });
function getMessageKey(message) {
  const {
    chatId,
    id,
    previousLocalId
  } = message;
  return buildMessageKey(chatId, previousLocalId || id);
}
function getMessageServerKey(message) {
  if (isLocalMessageId(message.id)) {
    return undefined;
  }
  const {
    chatId,
    id
  } = message;
  return buildMessageKey(chatId, id);
}
function buildMessageKey(chatId, msgId) {
  return `msg${chatId}-${msgId}`;
}
function parseMessageKey(key) {
  const match = key.match(/^msg(-?\d+)-(\d+)/);
  return {
    chatId: match[1],
    messageId: Number(match[2])
  };
}
function isLocalMessageId(id) {
  return !Number.isInteger(id);
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

/***/ "./src/util/serverTime.ts":
/*!********************************!*\
  !*** ./src/util/serverTime.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getServerTime: () => (/* binding */ getServerTime),
/* harmony export */   getServerTimeOffset: () => (/* binding */ getServerTimeOffset),
/* harmony export */   setServerTimeOffset: () => (/* binding */ setServerTimeOffset)
/* harmony export */ });
let serverTimeOffset = 0;
function setServerTimeOffset(_serverTimeOffset) {
  serverTimeOffset = _serverTimeOffset;
}
function getServerTimeOffset() {
  return serverTimeOffset;
}
function getServerTime() {
  return Math.floor(Date.now() / 1000) + serverTimeOffset;
}

/***/ }),

/***/ "./src/util/waveform.ts":
/*!******************************!*\
  !*** ./src/util/waveform.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeWaveform: () => (/* binding */ decodeWaveform),
/* harmony export */   interpolateArray: () => (/* binding */ interpolateArray)
/* harmony export */ });
/* eslint-disable no-bitwise */

// Ref: https://github.com/telegramdesktop/tdesktop/blob/0743e71ab6b928d2ee5bae1aed991849b1e2b291/Telegram/SourceFiles/data/data_document.cpp#L1018
function decodeWaveform(encoded5bit) {
  const bitsCount = encoded5bit.length * 8;
  const valuesCount = Math.floor(bitsCount / 5);
  if (!valuesCount) {
    return [];
  }

  // Read each 5 bit of encoded5bit as 0-31 unsigned char.
  // We count the index of the byte in which the desired 5-bit sequence starts.
  // And then we read a uint16 starting from that byte to guarantee to get all of those 5 bits.
  //
  // BUT! if it is the last byte we have, we're not allowed to read a uint16 starting with it.
  // Because it will be an overflow (we'll access one byte after the available memory).
  // We see, that only the last 5 bits could start in the last available byte and be problematic.
  // So we read in a general way all the entries in a general way except the last one.
  const result = Array(valuesCount);
  const bitsData = encoded5bit;
  for (let i = 0, l = valuesCount - 1; i !== l; ++i) {
    const byteIndex = Math.floor(i * 5 / 8);
    const bitShift = Math.floor(i * 5 % 8);
    const value = bitsData[byteIndex] + (bitsData[byteIndex + 1] << 8);
    result[i] = value >> bitShift & 0x1F;
  }
  const lastByteIndex = Math.floor((valuesCount - 1) * 5 / 8);
  const lastBitShift = Math.floor((valuesCount - 1) * 5 % 8);
  const lastValue = bitsData[lastByteIndex] + (bitsData[lastByteIndex + 1] << 8);
  result[valuesCount - 1] = lastValue >> lastBitShift & 0x1F;
  return result;
}
function interpolateArray(data, fitCount) {
  let peak = 0;
  const newData = new Array(fitCount);
  const springFactor = data.length / fitCount;
  const leftFiller = data[0];
  const rightFiller = data[data.length - 1];
  for (let i = 0; i < fitCount; i++) {
    const idx = Math.floor(i * springFactor);
    const val = ((data[idx - 1] ?? leftFiller) + (data[idx] ?? leftFiller) + (data[idx + 1] ?? rightFiller)) / 3;
    newData[i] = val;
    if (peak < val) {
      peak = val;
    }
  }
  return {
    data: newData,
    peak
  };
}

/***/ }),

/***/ "./node_modules/idb-keyval/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/idb-keyval/dist/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   createStore: () => (/* binding */ createStore),
/* harmony export */   del: () => (/* binding */ del),
/* harmony export */   delMany: () => (/* binding */ delMany),
/* harmony export */   entries: () => (/* binding */ entries),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   getMany: () => (/* binding */ getMany),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   promisifyRequest: () => (/* binding */ promisifyRequest),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   setMany: () => (/* binding */ setMany),
/* harmony export */   update: () => (/* binding */ update),
/* harmony export */   values: () => (/* binding */ values)
/* harmony export */ });
function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = () => reject(request.error);
    });
}
function createStore(dbName, storeName) {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
}
/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function get(key, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => promisifyRequest(store.get(key)));
}
/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function set(key, value, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.put(value, key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Set multiple values at once. This is faster than calling set() multiple times.
 * It's also atomic – if one of the pairs can't be added, none will be added.
 *
 * @param entries Array of entries, where each entry is an array of `[key, value]`.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function setMany(entries, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        entries.forEach((entry) => store.put(entry[1], entry[0]));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Get multiple values by their keys
 *
 * @param keys
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function getMany(keys, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => Promise.all(keys.map((key) => promisifyRequest(store.get(key)))));
}
/**
 * Update a value. This lets you see the old value and update it as an atomic operation.
 *
 * @param key
 * @param updater A callback that takes the old value and returns a new value.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function update(key, updater, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => 
    // Need to create the promise manually.
    // If I try to chain promises, the transaction closes in browsers
    // that use a promise polyfill (IE10/11).
    new Promise((resolve, reject) => {
        store.get(key).onsuccess = function () {
            try {
                store.put(updater(this.result), key);
                resolve(promisifyRequest(store.transaction));
            }
            catch (err) {
                reject(err);
            }
        };
    }));
}
/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function del(key, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.delete(key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Delete multiple keys at once.
 *
 * @param keys List of keys to delete.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function delMany(keys, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        keys.forEach((key) => store.delete(key));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Clear all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function clear(customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.clear();
        return promisifyRequest(store.transaction);
    });
}
function eachCursor(store, callback) {
    store.openCursor().onsuccess = function () {
        if (!this.result)
            return;
        callback(this.result);
        this.result.continue();
    };
    return promisifyRequest(store.transaction);
}
/**
 * Get all keys in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function keys(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        if (store.getAllKeys) {
            return promisifyRequest(store.getAllKeys());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
    });
}
/**
 * Get all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function values(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        if (store.getAll) {
            return promisifyRequest(store.getAll());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.value)).then(() => items);
    });
}
/**
 * Get all entries in the store. Each entry is an array of `[key, value]`.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function entries(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        // (although, hopefully we'll get a simpler path some day)
        if (store.getAll && store.getAllKeys) {
            return Promise.all([
                promisifyRequest(store.getAllKeys()),
                promisifyRequest(store.getAll()),
            ]).then(([keys, values]) => keys.map((key, i) => [key, values[i]]));
        }
        const items = [];
        return customStore('readonly', (store) => eachCursor(store, (cursor) => items.push([cursor.key, cursor.value])).then(() => items));
    });
}




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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_pako_dist_pako_inflate_js","vendors-node_modules_buffer_index_js","vendors-node_modules_cryptography_aes_dist_es_aes_js-node_modules_async-mutex_lib_index_js-no-6f4388","src_config_ts","src_api_gramjs_apiBuilders_messages_ts"], () => (__webpack_require__("./src/api/gramjs/worker/worker.ts")))
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
/******/ 			return "" + chunkId + "." + {"vendors-node_modules_pako_dist_pako_inflate_js":"5f75bdcaf063c6c088d2","vendors-node_modules_buffer_index_js":"45268dee2535cd31950d","vendors-node_modules_cryptography_aes_dist_es_aes_js-node_modules_async-mutex_lib_index_js-no-6f4388":"4528306738c1d7badd5d","src_config_ts":"d91d981f0690dbfe91a9","src_api_gramjs_apiBuilders_messages_ts":"79fa57eddc7356ae8f68"}[chunkId] + ".js";
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_api_gramjs_worker_worker_ts-src_util_Deferred_ts-src_util_emoji_parseEmojiOnlyString_ts-n-0abdd2": 1
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
/******/ 			return Promise.all(["vendors-node_modules_pako_dist_pako_inflate_js","vendors-node_modules_buffer_index_js","vendors-node_modules_cryptography_aes_dist_es_aes_js-node_modules_async-mutex_lib_index_js-no-6f4388","src_config_ts","src_api_gramjs_apiBuilders_messages_ts"].map(__webpack_require__.e, __webpack_require__)).then(next);
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
//# sourceMappingURL=src_api_gramjs_worker_worker_ts-src_util_Deferred_ts-src_util_emoji_parseEmojiOnlyString_ts-n-0abdd2.5745f16b5d70a3c1f5ef.js.map