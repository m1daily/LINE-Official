function doPost(e) {
  // LINEの情報取得
  const json = JSON.parse(e.postData.contents);
  const replyToken = json.events[0].replyToken;
  const message = json.events[0].message;

  // 画像の場合のみ続行
  if (message.type === "text") {
    // スプレッドシートからURL取得
    const ss =SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("ID"));
    const sheet = ss.getSheetByName("Sheet1");
    let messages = [];

    // 画像,予定等取得
    const userMessage = message.text;
    switch (userMessage) {
      case "予定+時間割":
        messages.push(get_schedules(sheet));
        messages = messages.concat(get_images(sheet));
        break;
      case "予定":
        messages.push(get_schedules(sheet));
        break;
      case "時間割":
        messages = messages.concat(get_images(sheet));
        break;
      case "月間予定":
        messages.push({
          "type": "text",
          "text": sheet.getRange("D6").getValue().replace(" ", "")
        });
        break;
      case "土曜課外":
        messages.push(sat(sheet));
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
}