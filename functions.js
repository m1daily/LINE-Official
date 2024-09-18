function get_schedules(sheet) {
  try{
    // 予定取得
    const month = sheet.getRange("D2").getValue();
    const monthData = sheet.getRange("D6").getValue().replace(" ", "").split("\n");

    // 現在の月日取得
    const time = new Date();
    const m = time.getMonth() + 1;
    const d = time.getDate();    

    // 日付と予定のデータを整理
    const days = [];
    const schedules = [];
    
    for (let i = 0; i < monthData.length; i++) {
      let dayData = monthData[i];
      let dayParts = dayData.split(")");
      let yotei = [];
      
      for (let n = 0; n < dayParts.length; n++) {
        // 日付の場合「)」を追加
        if (dayParts.length - n > 1) {
          dayParts[n] = dayParts[n] + ")";
        };
        if (n > 0) {
          yotei.push(dayParts[n]);
        }else if (n === 0) {
          days.push(dayParts[n]);
        };
      };
      schedules.push(yotei.join(""));
    };
    
    // スプレッドシートの予定の月と現在の月が一致しないなら終了
    if (month != String(m)) {
      return {
        "type": "text",
        "text": `${month}月${days[0]}に ${schedules[0]} があります。`
      };
    };

    // 予定取得
    let schedule = ""
    for (let i = 0; i < days.length; i++) {
      let day = parseInt(days[i].slice(0, 2).replace("日", ""));
      if (d < day) {
        return {
          "type": "text",
          "text": `${days[i]}に ${schedules[i]} があります。`
        };
      };
    };
    if (schedule == "") {
      return {
        "type": "text",
        "text": "次の予定はまだ取得できません。"
      };
    };
  }catch(e){
    return error(e.stack);
  };
}

function get_images(sheet) {
  try{
    const images = [];
    const image_urls = sheet.getRange("C6").getValue().replace(" ", "").split("\n");
    for (let i = 0; i < image_urls.length; i++){
      let image = {
            "type": "image",
            "originalContentUrl": image_urls[i],
            "previewImageUrl": image_urls[i]
      };
      images.push(image);
    };
    return images;
  }catch(e){
    return [error(e.stack)];
  };
}

function sat(sheet) {
  try{
    const sat_image = sheet.getRange("C7").getValue();
    return {
            "type": "image",
            "originalContentUrl": sat_image,
            "previewImageUrl": sat_image
    };
  }catch(e){
    return error(e.stack);
  };
}

function error_test() {
  try{
    throw new Error("error_test");
  }catch(e){
    return error(e.stack);
  };
}

function error(error_message) {
  debug(error_message);
  return {
      "type": "text",
      "text": `エラーが発生しました。\nエラー内容:\n${error_message}\n\nhttps://works.do/R/ti/p/schedule@mito1daily\n↑から作者の公式アカウントを追加して連絡くれると助かります。連絡くれる場合は↑のエラー内容も伝えてください。`
  };
}

function debug(value) {
  const sheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("DEBUG"));
  const ss = sheet.getSheetByName("Schedules");
  const date = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");
  const targetRow = ss.getLastRow() + 1;
  ss.getRange('A' + targetRow).setValue(date);
  ss.getRange('B' + targetRow).setValue(value);
}