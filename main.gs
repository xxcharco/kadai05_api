const openaiApiKey =
  PropertiesService.getScriptProperties().getProperty("OpenAI-APIKEY");
const openaiApiUrl = "https://api.openai.com/v1/chat/completions";

function doGet(e) {
  // e.parameter.textが存在しない場合、デフォルトメッセージを設定
  const userInputText = (e.parameter && e.parameter.text) ? e.parameter.text : "質問が入力されていません";
  const callback = e.parameter.callback;
  const response = {
    output: [{ type: "text", value: postOpenAI(userInputText) }],
  };

  let responseText = "";
  if (callback) {
    // JSONP
    responseText = `${callback}(${JSON.stringify(response)})`;
    return ContentService.createTextOutput(responseText).setMimeType(
      ContentService.MimeType.JAVASCRIPT
    );
  } else {
    // JSON
    return ContentService.createTextOutput(
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function postOpenAI(message) {
  if (!message || message.trim() === "") {
    return "入力されたメッセージが空です";
  }
  
  const messages = [{ role: "user", content: message }];
  const headers = {
    Authorization: "Bearer " + openaiApiKey,
    "Content-type": "application/json",
    "X-Slack-No-Retry": 1,
  };
  const options = {
    muteHttpExceptions: true,
    headers: headers,
    method: "POST",
    payload: JSON.stringify({
      model: "gpt-4",
      messages: messages,
    }),
  };
  
  const response = UrlFetchApp.fetch(openaiApiUrl, options);
  const jsonResponse = JSON.parse(response.getContentText());
  
  // エラーチェック: choicesが存在し、期待する応答があるか確認
  if (!jsonResponse.choices || jsonResponse.choices.length === 0) {
    throw new Error("API応答にchoicesが含まれていません: " + response.getContentText());
  }

  return jsonResponse.choices[0].message.content.trim();
}
