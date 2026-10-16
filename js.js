let removeSelector;
let provider;
let fieldData;
let hideAfter = 60;
let hideCommands = 'no';
let ignoredUsers = [];
let messagesLimit = 0;
let totalMessages = 0;
window.addEventListener("onEventReceived", function (_0xd6b65f) {
  parseEvent(_0xd6b65f);
});
window.addEventListener("onWidgetLoad", function (_0x48e018) {
  fieldData = _0x48e018.detail.fieldData;
  messagesLimit = fieldData.messagesLimit;
  hideAfter = fieldData.hideAfter;
  hideCommands = fieldData.hideCommands;
  fetch("https://api.streamelements.com/kappa/v2/channels/" + _0x48e018.detail.channel.id + '/').then(_0x549c0c => _0x549c0c.json()).then(_0x3a7d23 => {
    provider = _0x3a7d23.provider;
  });
  removeSelector = ".msg_overflow_fix:nth-last-child(n+" + (messagesLimit + 1) + ')';
  ignoredUsers = fieldData.ignoredUsers.toLowerCase().replace(" ", '').split(',');
});
const parseEvent = _0x5f5cfe => {
  console.log(_0x5f5cfe);
  if (_0x5f5cfe.detail.event.listener === "widget-button") {
    widgetButtonActions(_0x5f5cfe.detail.event.field);
    return;
  }
  if (_0x5f5cfe.detail.listener === "delete-message") {
    const _0x4bd597 = _0x5f5cfe.detail.event.msgId;
    $(".msg[data-msgid=" + _0x4bd597 + ']').remove();
    return;
  }
  if (_0x5f5cfe.detail.listener === "delete-messages") {
    const _0x26db76 = _0x5f5cfe.detail.event.userId;
    $(".msg[data-sender=" + _0x26db76 + ']').remove();
    return;
  }
  let _0x4989dd = _0x5f5cfe.detail.event.data;
  if (_0x5f5cfe.detail.listener !== "message") {
    return;
  }
  if (_0x4989dd.text.startsWith('!') && hideCommands === "yes") {
    return;
  }
  if (ignoredUsers.indexOf(_0x4989dd.nick) !== -1) {
    return;
  }
  messageEvent(_0x4989dd);
};
const widgetButtonActions = _0x25388e => {
  const _0x2fdef6 = switchMessageData(_0x25388e);
  if (_0x2fdef6.message.length === 0) {
    return;
  }
  emulateMessage(_0x2fdef6);
  return;
};
const emulateMessage = _0x1ffc73 => {
  let _0x315d31 = new CustomEvent("onEventReceived", {
    'detail': {
      'listener': "message",
      'event': {
        'service': "twitch",
        'data': {
          'time': Date.now(),
          'tags': {
            'badge-info': '',
            'badges': _0x1ffc73.badge,
            'color': "#5B99FF",
            'display-name': "StreamElements",
            'emotes': "25:46-50",
            'flags': '',
            'id': "43285909-412c-4eee-b80d-89f72ba53142",
            'mod': _0x1ffc73.mod,
            'room-id': "85827806",
            'subscriber': _0x1ffc73.subscriber,
            'tmi-sent-ts': "1579444549265",
            'turbo': '0',
            'user-id': "100135110",
            'user-type': _0x1ffc73.userType
          },
          'nick': _0x1ffc73.name,
          'userId': "100135110",
          'displayName': _0x1ffc73.name,
          'displayColor': "#5B99FF",
          'badges': _0x1ffc73.badges,
          'channel': _0x1ffc73.name,
          'text': _0x1ffc73.message,
          'isAction': false,
          'emotes': [{
            'type': "twitch",
            'name': "Kappa",
            'id': '25',
            'gif': false,
            'urls': {
              0x1: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
              0x2: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
              0x4: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0"
            },
            'start': 0x2e,
            'end': 0x32
          }],
          'msgId': "43285909-412c-4eee-b80d-89f72ba53142"
        },
        'renderedText': "Hello everyone and welcome to my stream. Glad you came to see me. <img src='https://static-cdn.jtvnw.net/emoticons/v1/25/1.0' srcset='https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 1x, https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/25/3.0 4x' title='Kappa' class='emote'>"
      }
    }
  });
  window.dispatchEvent(_0x315d31);
};
const EVENT_TYPES = {
  'testMessage': "testMessage",
  'testSubscriber': "testSubscriber",
  'testVip': "testVip",
  'testMod': "testMod"
};
const switchMessageData = _0x169174 => {
  const _0x51d4e2 = {
    'message': '',
    'name': '',
    'badge': '',
    'mod': '0',
    'subscriber': '0',
    'userType': '',
    'badges': {}
  };
  const _0x28caea = {
    'mod': {
      'type': "moderator",
      'version': '1',
      'url': "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
      'description': "moderator"
    },
    'vip': {
      'type': "vip",
      'version': '1',
      'url': "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/1",
      'description': "vip"
    }
  };
  switch (_0x169174) {
    case "testMessage":
      return {
        'message': "This is a message from a regular viewer!",
        'name': "username",
        'badge': '',
        'userType': '',
        'subscriber': '0',
        'badges': []
      };
    case "testVip":
      return {
        'message': "This is a message from a regular viewer!",
        'name': "vip",
        'badge': "vip/1",
        'mod': '0',
        'userType': "vip",
        'badges': [_0x28caea.vip]
      };
    case "testSubscriber":
      return {
        'message': "This is a message from a regular viewer!",
        'name': "qusa_subscriber",
        'badge': "subscriber/1",
        'subscriber': '1',
        'userType': "subscriber",
        'badges': []
      };
    case "testMod":
      return {
        'message': "This is a message from a regular viewer!",
        'name': "qusa_moderator",
        'badge': "moderator/1",
        'mod': '1',
        'userType': "mod",
        'badges': [_0x28caea.mod]
      };
    case "testAll":
      testAllMessages();
      break;
  }
  return _0x51d4e2;
};
const testAllMessages = _0x37e16b => {
  Object.keys(EVENT_TYPES).forEach(_0x3cf5dc => {
    widgetButtonActions(_0x3cf5dc);
  });
};
const messageEvent = _0x1d7b07 => {
  let _0x440c4f = attachEmotes(_0x1d7b07);
  let _0xbb46b7 = _0x1d7b07.displayName;
  if(_0xbb46b7 == "EnpyCross" || _0xbb46b7 == "Mikymac" ){
	  _0xbb46b7 = "Jesus";
  }
  
  addMessage(_0xbb46b7, '', _0x440c4f, parseUserType(_0x1d7b07), _0x1d7b07.userId, _0x1d7b07.msgId);
};
const parseUserType = _0x59768e => {
  const _0x27a117 = _0x59768e.tags;
  if (_0x27a117.mod === '1') {
    return "mod";
  }
  if (_0x59768e.tags.badges.split(',').filter(_0x4a8994 => _0x4a8994.split('/')[0] === "vip").length > 0) {
    return "vip";
  }
  
  if(_0x59768e.displayName == "EnpyCross" || _0x59768e.displayName == "Mikymac" ){
	  return "vip2";
  }
  
  if (_0x27a117.subscriber === '1') {
    return "subscriber";
  }
  return "follower";
};
const attachEmotes = _0x387be4 => {
  let _0x1fbd0e = html_encode(_0x387be4.text);
  let _0x3dfb72 = _0x387be4.emotes;
  if (typeof _0x387be4.attachment !== "undefined") {
    if (typeof _0x387be4.attachment.media !== "undefined") {
      if (typeof _0x387be4.attachment.media.image !== "undefined") {
        _0x1fbd0e = _0x387be4.text + "<img src=\"" + _0x387be4.attachment.media.image.src + "\">";
      }
    }
  }
  return _0x1fbd0e.replace(/([^\s]*)/gi, function (_0x1fb16b, _0x1101a1) {
    let _0x10415a = _0x3dfb72.filter(_0x3ef232 => {
      return html_encode(_0x3ef232.name) === _0x1101a1;
    });
    if (typeof _0x10415a[0] !== "undefined") {
      let _0x41ce6e = _0x10415a[0].urls[2];
      if (provider === "twitch") {
        return "<img class=\"emote\" src=\"" + _0x41ce6e + "\"/>";
      } else {
        if (typeof _0x10415a[0].coords === "undefined") {
          _0x10415a[0].coords = {
            'x': 0x0,
            'y': 0x0
          };
        }
        let _0x519917 = parseInt(_0x10415a[0].coords.x);
        let _0x17fb56 = parseInt(_0x10415a[0].coords.y);
        let _0x32bb3a = "{emoteSize}px";
        let _0x5085e3 = "auto";
        if (provider === "mixer") {
          if (_0x10415a[0].coords.width) {
            _0x32bb3a = _0x10415a[0].coords.width + 'px';
          }
          if (_0x10415a[0].coords.height) {
            _0x5085e3 = _0x10415a[0].coords.height + 'px';
          }
        }
        return "<div class=\"emote\" style=\"width: " + _0x32bb3a + "; height:" + _0x5085e3 + "; display: inline-block; background-image: url(" + _0x41ce6e + "); background-position: -" + _0x519917 + "px -" + _0x17fb56 + "px;\"></div>";
      }
    } else {
      return _0x1101a1;
    }
  });
};
const html_encode = _0x104f36 => {
  return _0x104f36.replace(/[<>"^]/g, function (_0x4c6c46) {
    return '&#' + _0x4c6c46.charCodeAt(0) + ';';
  });
};
function getRandomInt(_0x39b716 = 0, _0x5357e6 = 3) {
  return Math.round(Math.random() * (_0x5357e6 - _0x39b716) + _0x39b716);
}
const generateElemForMsg = (_0xada14, _0xc36298, _0x590a12, _0x5950ee, _0x8652ca, _0x2202ac) => {
  totalMessages += 1;
  const _0x44fd81 = $.parseHTML("\n  <div class=\"msg " + _0x5950ee + "\" data-sender=\"" + _0x8652ca + "\" data-msgid=\"" + _0x2202ac + "\" id=\"msg-" + totalMessages + "\">\n <div class=\"meta\">\n <div class=\"nameContainer\"><div class=\"name\">" + _0xada14 + "</div>" + "<div class=\"bgname\">" + _0xada14 + "</div></div>\n <path fill=\"#101010\" stroke=\"#22FF12\" stroke-width=\"2\"/>\n     <path fill=\"#101010\" stroke=\"#101010\" stroke-width=\"0.5\"/>\n </svg>\n </div>\n <div class=\"message\">" + _0x590a12);
  return _0x44fd81;
};
const addMessage = (_0x1bfb20, _0x55386c, _0x59aaa7, _0x2b2635, _0x1d362a, _0x49fe6d) => {
  const _0x505fc3 = generateElemForMsg(_0x1bfb20, _0x55386c, _0x59aaa7, _0x2b2635, _0x1d362a, _0x49fe6d);
  addNewRow(_0x505fc3);
  return;
};
const addNewRow = _0x5f050b => {
  const _0x1204b5 = $.parseHTML("<div class=\"msg_overflow_fix\"></div>");
  $(_0x1204b5).append(_0x5f050b);
  if (hideAfter !== 999) {
    $(_0x1204b5).appendTo(".main-container").hide().animate({
      'height': "toggle",
      'opacity': "toggle"
    }, "slow").delay(hideAfter * 1000).queue(function () {
      $(this).animate({
        'opacity': '0'
      }, "slow", "linear").delay(1000).queue(function () {
        $(this).remove();
      }).dequeue();
    });
  } else {
    $(_0x1204b5).appendTo(".main-container").hide().animate({
      'height': "toggle",
      'opacity': "toggle"
    }, "slow");
  }
  if (totalMessages > messagesLimit) {
    removeRow();
  }
};
function removeRow() {
  if (!$(removeSelector).length) {
    return;
  }
  $(removeSelector).animate({
    'opacity': '0'
  }, "slow", "linear", function () {
    $(this).remove();
  });
}