// スプレッドシートからURL取得
function test() {
  // スプレッドシートからURL取得
  const ss =SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("ID"));
  const sheet = ss.getSheetByName("Sheet1");
  let messages = [];

  messages.push(get_news(sheet));
  console.log(messages)
}

// function get_news(sheet) {
//   try{
//     // スプレッドシートからURL取得
//     const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("ID"));
//     const sheet = ss.getSheetByName("Sheet1");

//     // 直近のニュースを5件取得
//     const news_all = sheet.getRange("E6").getValue().split("\n").slice(0, 5);

//     // カラム作成
//     const columns = [];
//     for (let i = 0; i < news_all.length; i++){
//       let txt = {
//         "text": news_all[i].slice(0,100),
//         "actions": [
//           {
//             "type": "uri",
//             "label": "詳細を見る",
//             "uri": "https://www.mito1-h.ibk.ed.jp/"
//             }]};
//       columns.push(txt);
//     };

//     // message作成
//     const news = {
//       "type": "template",
//       "altText": "直近のニュース5件",
//       "template": {
//         "type": "carousel",
//         "columns": columns,
//       }
//     };

//     console.log(news)
//     return news;
//   }catch(e){
//     return [error(e.stack)];
//   };
// }
