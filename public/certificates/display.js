document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener('click', () => {
    const iframe = document.querySelector('iframe');
    const certificateWindow = iframe.contentWindow;

    certificateWindow.window.print();

    setTimeout(() => {
      const canvas = certificateWindow.document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = certificateWindow.document.body.offsetWidth;
      canvas.height = certificateWindow.document.body.offsetHeight;

      context.drawImage(certificateWindow.document.body, 0, 0);

      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'certificate.png';
      link.click();
    }, 1000);
  });
});
