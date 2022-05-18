import { EditorLanguages } from '../components/Code-Editor/code-editor';

export const useSrcDoc = (
	code: { [key in EditorLanguages]?: string },
	err: string | null
) => {
	if (err) {
		return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
    <h2 style="color: red;">Build Error:</h2>
    <h3 style="color: red;">${err}</h>
    </body>
  </html>`;
	}

	return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${code.css || ''}</style>
    </head>
      <body>
        <div id="root"></div>
        <script>
          const main = document.createElement('main');
          main.innerHTML = \`${code.html || ''}\`
          document.body.appendChild(main)
          const handleError = (err, errType='Runtime') => {
            const errText = document.createTextNode(err);
            const header = document.createElement('h4');
            const msg = document.createElement('h3');
            msg.style.color = 'red';
            header.textContent = errType + ' ' + 'error:';
            msg.appendChild(header);
            msg.appendChild(errText);
            document.body.innerHTML = '';
            document.body.appendChild(msg);
            console.error(err);
          };

          window.addEventListener('error', event => {
            event.preventDefault();
            handleError(event.error);
          });


          window.addEventListener('message', event => {
            try {
              const code = event.data;
              eval(code);
            } catch (err) {
              handleError(err);
            };
          });
        </script>
      </body>
  </html>
`;
};
