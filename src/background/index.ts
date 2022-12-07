import { CipherMode } from "crypto";

chrome.runtime.onMessage.addListener(function(request, sender: chrome.runtime.MessageSender, sendResponse) {
  console.log("Got message from content Script: ", request);
  postData(JSON.stringify(request.data));
  sendResponse('OK');
});



async function postData(body : any){
  let headers = {
    "Content-Type": "text/plain"
  };

 let request = {
  method: "POST",
  body: body.replace("\n","\\"),
  headers,
 };

  const URL = "http://localhost:4318/v1/traces";
  console.log("Posting the data");
  console.log(request);
  //const reqq_grpc = value.encode(body);
  let  page = await fetch(URL, request);
  let json = page.json();
  console.log("Data recieved from backend \n");
  console.log(page);
}