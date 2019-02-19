
export class MarkdownParser {
    constructor() {

        this.markdownParser = require('marked');
        this.markdownParser.setOptions({
            breaks: true,
            gfm: true,
            tables: true,
            smartLists: true,
            smartypants: true
        });
        
        
        this.markdownRenderer = new this.markdownParser.Renderer();
        this.markdownRenderer.link = function(href, title, text) {
            return (`<a href=${href} target="_blank">${text}</a>`);
        };

    };

    getMarkdownHtml(text) {
        return this.markdownParser(text, {renderer: this.markdownRenderer});
    }
}

