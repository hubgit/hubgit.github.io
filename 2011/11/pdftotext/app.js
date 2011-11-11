function App(){
  var self = this;
  
  this.pdfToText = function(data){    
    var div = document.getElementById('viewer');
    var textLayer = document.getElementById('text-layer');   

    // render the first pages
    var pdf = new PDFJS.PDFDoc(data);
    
    for (i = 1; i <= pdf.numPages; i++){      
      var page = pdf.getPage(i);

      var canvas = document.createElement('canvas');
      canvas.id = 'page' + i;
      canvas.mozOpaque = true;
      div.appendChild(canvas);

      canvas.width = page.width;
      canvas.height = page.height;

      var context = canvas.getContext('2d');
      context.save();
      context.fillStyle = 'rgb(255, 255, 255)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.restore();
      
      if (i < pdf.numPages){
        self.setMessage("Rendering...");
        page.startRendering(context, null, textLayer);
        continue;
      }
      
      // last page
      page.startRendering(context, function(){
        self.setMessage("Finished rendering.");
        // TODO: a real callback for when rendering has finished
        window.setTimeout(function(){ 
          self.sendOutput(textLayer.textContent); 
          self.setMessage("Done!");
        }, 500);
      }, textLayer);
    }
  };
  
  this.receiveInput = function(event){
    if (event.source != parent) return;
    if (!event.data.byteLength) return alert("The PDF data needs to be an ArrayBuffer");
    self.setMessage("Received data");
    self.pdfToText(event.data);
  }
  
  this.sendOutput = function(text){
    var recipient = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
    recipient.postMessage(text, "*");
  };
  
  this.setMessage = function(text){
    document.getElementById("message").textContent = text;
  }

  window.addEventListener("message", self.receiveInput, true);
  //self.setMessage("Ready");
  self.sendOutput("ready"); 
}
