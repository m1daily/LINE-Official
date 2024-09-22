function doPost(e) {
  // LINEの情報取得
  const json = JSON.parse(e.postData.contents);
  const replyToken = json.events[0].replyToken;
  const type = json.events[0].type;

  // ポストバックかテキストの場合のみ続行
  let userMessage = ""
  if (type === "postback") {
    userMessage = json.events[0].postback.data;
  } else if (type === "message") {
    userMessage = json.events[0].message.text;
  } else {
    return false;
  }

  // スプレッドシートからURL取得
  const ss =SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("ID"));
  const sheet = ss.getSheetByName("Sheet1");
  let messages = [];

  // 画像,予定等取得
  switch (userMessage) {
    case "予定+時間割":
      messages.push(get_schedules(sheet));
      messages = messages.concat(get_images(sheet, "C6"));
      break;
    case "予定":
      messages.push(get_schedules(sheet));
      break;
    case "時間割":
      messages = messages.concat(get_images(sheet, "C6"));
      break;
    case "月間予定":
      messages = messages.concat(get_images(sheet, "D7"));
      break;
    case "土曜課外":
      messages = messages.concat(get_images(sheet, "C7"));
      break;
    case "ニュース":
      messages.push(get_news(sheet));
      break;
    case "辞書":
      messages.push(get_word());
      break;
    case "info" || "INFO" || "Info":
      messages.push(get_info("C2"));
      break;
    case "sns" || "SNS" || "Sns":
      messages.push(get_info("C3"));
      break;
    case "最新情報":
      messages.push(get_info("C4"));
      break;
    case "error175":
      messages.push(error_test());
      debug("エラーテスト");
      break;
    default:
      return false;
  };

  // APIリクエスト時にセットするペイロード値設定
  const payload = {
    "replyToken": replyToken,
    "messages": messages
  };

  //HTTPSのPOST時のオプションパラメータ設定
  const options = {
    "payload" : JSON.stringify(payload),
    "myamethod"  : "POST",
    "headers" : {"Authorization": `Bearer ${PropertiesService.getScriptProperties().getProperty("TOKEN")}`},
    "contentType" : "application/json"
  };

  // LINE Messaging APIリクエスト
  try{
    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
  }catch(e){
    debug(e.stack);
  };
}