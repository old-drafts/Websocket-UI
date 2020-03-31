var line={
    Author:"Lampese",
    Edition:"0.1"
}
var Text_name=[];
var Text_onit=[];
var Text_Top=0;
var button_Type=[];
var button_Text=[];
var button_Send=[];
var button_Top=0;
function Listen_on(func,interface){
    const WebSocket=require("ws");
    const wss=new WebSocket.Server({port:interface});
    wss.on('connection',(ws)=>{
        ws.on('message',(message)=>{
            func(message);
        });
    });
}
function button_add(Type,Text,Send){
    button_Type[button_Top]=Type;
    button_Text[button_Top]=Text;
    button_Send[button_Top]=Send;
    button_Top++;
}
function Text_Add(Name,Onit){
    Text_name[Text_Top]=Name;
    Text_onit[Text_Top]=Onit;
    Text_Top++;
}
function UI_create(path,iterface,title){
    var fs=require("fs");
    var self_that=
    `<!DOCTYPE HTML>
    <html>
       <head>
       <meta charset="utf-8">
       <title>${title}</title>
          <script type="text/javascript">
             function msgsend(str){
                var ws = new WebSocket("ws://localhost:${iterface}");
                ws.onopen=function(){
                    ws.send(str);
                    ws.close();
                }
             }

    `;
    for(let i in button_Type){
        self_that+=
        `
        function msg${i}(){
            msgsend("${button_Send[i]}");
        }

        `
    }
    self_that+=
    `
    </script>
   </head>
   <body>
      <div id="sse">
    
    `;
    for(let i in button_Text){
        self_that+=
        `
        <button onclick="javascript:msg${i}()">${button_Text}</button>
        `
    }
    for(let i in Text_name){
        self_that+=
        `
        <form action="" method="get" onsubmit="return ${Text_name}${i}()">
		<p>
            <h4>${Text_name}</h4>
            <input type="text" name="${Text_name}" id='${Text_name}' > 
		</p>
		<input type='submit' value='${Text_onit}'>
	    </form>
        `
    }
    self_that+=
    `<script>
    `
    for(let i in Text_name){
        self_that+=
        `
        ${Text_name[i]}=document.getElementById('${Text_name[i]}');
	    function ${Text_name[i]}${i}(){
            msgsend("${Text_name[i]} "+${Text_name[i]}.value);
        }
        
        `
    }
    self_that+=`</script>
    `;
    self_that+=`
    </div>
   </body>
</html>
    `;
    fs.appendFile(path,self_that,()=>{});
}
exports.Listen_on=Listen_on;
exports.button_add=button_add;
exports.UI_create=UI_create;
exports.Text_add=Text_Add;