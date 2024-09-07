const chatux = new ChatUx();
const initParam = {
  renderMode: "auto",
  api: {
    //デプロイされたGASのエンドポイントを記載します。
    endpoint: "https://script.google.com/macros/s/AKfycbzL8heihFgqI2sB-f85-4lUqk7VFjHPdcPzeheEoWndaAcBaWPa8KLHSR6aVdsRIlqcfw/exec",
    method: "GET",
    dataType: "jsonp",
    errorResponse: {
      output: [{ type: "text", value: "network error" }],
    },
  },
  bot: {
    wakeupText: null,
    botPhoto:
      "img/sensorUMA.png",
    humanPhoto: null,
    widget: {
      sendLabel: "送信",
      placeHolder: "何か入力してね！",
    },
  },
  window: {
    title: "ChatGPT-ChatBot",
    infoUrl: null,
  },
  wakeupButton: {
    right: 20,
    bottom: 30,
    size: 60,
    fontSize: 25,
  },
};
chatux.init(initParam);
chatux.start(true);