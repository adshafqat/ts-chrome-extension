chrome.runtime.onMessage.addListener(function (request, sender: chrome.runtime.MessageSender, sendResponse) {
  console.log("Got message from content Script: ", request);
  postData(JSON.stringify(request.data));
  sendResponse('OK');
});



async function postData(body : any){
  let headers = {
    "Content-Type": "application/json"
  };

 let request = {
  method: "POST",
  body: body.replace("\n","\\"),
  headers,
 };

  //const URL = "http://localhost:4318/v1/traces";
  const URL = "http://localhost:8080/traces";
  console.log("Posting the data to the backend application");
  //console.log("Posting the data");
  console.log(request);
  //const reqq_grpc = value.encode(body);
  let  page = await fetch(URL, request);
  let json = page.json();
  console.log("Data recieved from backend v1.3 \n");
  console.log(page);
}
