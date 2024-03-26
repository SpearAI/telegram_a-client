import { getGlobal } from '../global';

import type { GlobalState } from '../global/types';

import { fetchChatByPhoneNumber } from '../global/actions/api/chats';
import { selectChat, selectChatByUsername } from '../global/selectors';

const handleChannelType = (channelName: string) => {
  if (/^\+/.test(channelName)) {
    return 'phone';
  } else if (/^-?\d+(\.\d+)?$/.test(channelName)) {
    return 'userId';
  }
  return 'username';
};

export async function updateUnreadMessages<T extends GlobalState>(global: T, telegramToEids: Record<string, string>,
  newMessage = false) {
  const eidsToUpdate: Record<string, number> = {};
  const localStorageMapper: Record<string, object> = {};
  for (const [telegramId, eid] of Object.entries(telegramToEids)) {
    const telegramType = handleChannelType(telegramId);
    let chat;
    switch (telegramType) {
      case 'phone':
        chat = await fetchChatByPhoneNumber(global, telegramId);
        break;
      case 'userId':
        chat = selectChat(global, telegramId);
        break;
      case 'username':
        chat = selectChatByUsername(global, telegramId);
        break;
    }
    if (chat) {
      let count = 0;
      if (newMessage) {
        count = chat?.unreadCount || 0;
      } else {
        count = chat.unreadCount || 0;
      }
      eidsToUpdate[eid] = count;
      localStorageMapper[chat.id] = { eid, crmTelegramId: telegramId };
    }
  }
  localStorage.setItem('crmMapper', JSON.stringify(localStorageMapper));
  window.parent.postMessage({ type: 'UpdateUnreadMessages', dataToUpdate: JSON.stringify(eidsToUpdate) }, '*');
  // setTimeout(() => { updateCrmWithTimeout(); }, 20000);
  // updateCrmWithTimeout();
}

export async function newMessageUpdateCrm<T extends GlobalState>(global: T, chatId: string) {
  const localstorageMapperString = localStorage.getItem('crmMapper');
  if (!localstorageMapperString) return;

  const localStorageMapper = JSON.parse(localstorageMapperString);
  const chat = localStorageMapper[chatId];
  if (!chat) return;
  const chatToUpdate = { [chat.crmTelegramId]: chat.eid };
  const global2 = getGlobal();
  await updateUnreadMessages(global2, chatToUpdate, true);
}

export function updateCrmWithTimeout<T extends GlobalState>(global: T, telegramToEids: Record<string, string>) {
  // eslint-disable-next-line no-console
  console.log('starting to updateCrmWithTimeout function');
  if (!telegramToEids) {
    const localstorageMapperString = localStorage.getItem('crmMapper');
    if (!localstorageMapperString) return;
    const localStorageMapper: Record<string, object> = JSON.parse(localstorageMapperString);
    telegramToEids = {};
    for (const [chatId, data] of Object.entries(localStorageMapper)) {
      // @ts-ignore
      telegramToEids[chatId] = data.eid;
    }
    global = getGlobal();
  }

  updateUnreadMessages(global, telegramToEids)
    .then(() => {
      setTimeout(updateCrmWithTimeout, 20000);
    })
    .catch(() => {
      setTimeout(updateCrmWithTimeout, 20000);
    });
}

// export function processChatData(chatData: Record<string, ApiChat>): Record<string, any> {
//   const result: Record<string, any> = {};
//
//   Object.values(chatData).forEach(item => {
//     let key: string = item.id; // Default key
//     if (item.usernames && item.usernames.length > 0) {
//       const activeUser = item.usernames.find(u => u.isActive);
//       if (activeUser) {
//         key = activeUser.username; // Use username if active
//       }
//     }
//     result[key] = item.unreadCount || 0;
//   });
//
//   return result;
// }
