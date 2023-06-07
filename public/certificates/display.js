// Event listener for the download button
document.getElementById('downloadBtn').addEventListener('click', function() {
    // Select the iframe element
    var iframe = document.querySelector('.iframe-container iframe');
    
    // Wait for the iframe content to load
    iframe.addEventListener('load', function() {
      // Get the content document of the iframe
      var contentDocument = iframe.contentDocument || iframe.contentWindow.document;
      
      // Get the HTML content of the document
      var htmlContent = contentDocument.documentElement.outerHTML;
      
      // Create a canvas element
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      
      // Set the canvas dimensions to match the iframe content
      var iframeWidth = contentDocument.documentElement.scrollWidth;
      var iframeHeight = contentDocument.documentElement.scrollHeight;
      canvas.width = iframeWidth;
      canvas.height = iframeHeight;
      
      // Create a new image element
      var image = new Image();
      
      // Render the HTML content onto the canvas
      image.onload = function() {
        context.drawImage(image, 0, 0);
        
        // Convert the canvas to a data URL
        var dataURL = canvas.toDataURL('image/png');
        
        // Create a new jsPDF instance
        var pdf = new jsPDF();
        
        // Add the image to the PDF
        pdf.addImage(dataURL, 'PNG', 0, 0);
        
        // Save the PDF file
        pdf.save('certificate.pdf');
      };
      image.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
    });
  });
  