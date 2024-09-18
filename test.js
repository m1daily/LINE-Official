// スプレッドシートからURL取得
function test() {
  // スプレッドシートからURL取得
  const ss =SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("ID"));
  const sheet = ss.getSheetByName("Sheet1");
  let messages = [];

  const userMessage = "予定";
    if (userMessage === "予定+時間割") {
      messages.push(get_schedules(sheet));
      messages = messages.concat(get_images(sheet));
    }else if (userMessage === "予定") {
      messages.push(get_schedules(sheet));
    }else if (userMessage === "時間割") {
      messages = messages.concat(get_images(sheet));
    }else{
      return false;
    };
    console.log(messages)
}

function test2() {
  // LINEの情報取得
    const ss =SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("ID"));
    const sheet = ss.getSheetByName("Sheet1");
    let messages = [];

    // 画像,予定等取得
    const userMessage = message.text;
    if (userMessage == "予定+時間割") {
      messages.push(get_schedules(sheet));
      messages = messages.concat(get_images(sheet));
    }else if (userMessage == "予定") {
      messages.push(get_schedules(sheet));
    }else if (userMessage == "時間割") {
      messages = messages.concat(get_images(sheet));
    }else if (userMessage == "月間予定"){
      messages.push({
        "type": "text",
        "text": sheet.getRange("D6").getValue().replace(" ", "")
      });
    }else{
      return false;
    };

    // APIリクエスト時にセットするペイロード値設定
    const payload = {
      "replyToken": "a",
      "messages": messages
    };
    //HTTPSのPOST時のオプションパラメータ設定
    const options = {
      "payload" : JSON.stringify(payload),
      "myamethod"  : "POST",
      "headers" : {"Authorization": `Bearer ${PropertiesService.getScriptProperties().getProperty("TOKEN")}`},
      "contentType" : "application/json"
    };
    console.log(options)
}

function test3() {
  const ss =SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("ID"));
  const sheet = ss.getSheetByName("Sheet1");
  console.log(get_schedules(sheet));
}