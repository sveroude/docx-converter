import mammoth from 'mammoth';

export function converter(event, callback) {
    const fileContent = event.target.result;

    mammoth.convertToHtml({arrayBuffer: fileContent})
        .then(result => callback(result.value))
}
