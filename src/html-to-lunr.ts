// const HTML_FOLDER = 'src';
// const SEARCH_FIELDS = ['title', 'description', 'keywords', 'body'];
// const EXCLUDE_FILES = ['search.html'];
// const MAX_PREVIEW_CHARS = 275;
// const OUTPUT_INDEX = './src/lunr_index.js';
const path = require('path');
const fs = require('fs');
const lunr = require('lunr');
require('lunr-languages-cn/lunr.stemmer.support')(lunr);
require('lunr-languages-cn/tinyseg.js')(lunr);
require('lunr-languages-cn/lunr.cn')(lunr);
var cheerio = require('cheerio');

export interface IOptions {
  // 一个html的地址或者一堆html文件所在的文件夹地址
  input: string;
  // 在html中搜索的区域
  fields: string[];
  // 当input为文件夹时不需要被建立索引的html文件名
  excludes: string[];
  // 最大预览长度
  maxPreviewChars: number;
  // 建立完索引后输出的位置及文件名
  output: string;
}
export class to {
  constructor(public options: IOptions) {
    this.setDefaultOptions();
  }
  private setDefaultOptions() {
    this.options = Object.assign(
      {},
      {
        input: '',
        fields: ['title', 'description', 'keywords', 'body'],
        excludes: [],
        maxPreviewChars: 275,
        output: 'toIndex.js',
      },
      this.options,
    );
    console.log(this.options, '选项');
  }
  // 是否html文件
  private isHtml(fileName: string): boolean {
    if (!fileName) return false;
    const lower = fileName.toLowerCase();
    return lower.endsWith('.htm') || lower.endsWith('.html');
  }
  // 是目录还是文件
  private isDirectoryOrFile(filePath: string) {
    var stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      return 'D';
    }
    if (stat.isFile()) {
      return 'F';
    }
  }

  private findHtml(folder: string): string[] {
    const type = this.isDirectoryOrFile(folder);
    var htmls = [];
    if (type === 'F') {
      htmls.push(folder);
    }
    if (type === 'D') {
      // if (!fs.existsSync(folder)) {
      //   console.log('Could not find folder: ', folder);
      //   return [];
      // }
      const { input, excludes } = this.options;
      var files = fs.readdirSync(folder);
      for (var i = 0; i < files.length; i++) {
        var filename = path.join(folder, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
          var recursed = this.findHtml(filename);
          for (var j = 0; j < recursed.length; j++) {
            recursed[j] = path.join(files[i], recursed[j]).replace(/\\/g, '/');
          }
          htmls.push.apply(htmls, recursed);
        } else if (this.isHtml(filename) && !excludes.includes(files[i])) {
          htmls.push(files[i]);
        }
      }
    }
    console.log(htmls, '文件');
    return htmls;
  }

  private readHtml() {}

  public run() {
    const { input } = this.options;
    this.findHtml(input);
    // files = this.findHtml(input);
    // var docs = [];
    // console.log('Building index for these files:');
    // for (var i = 0; i < files.length; i++) {
    //   console.log('    ' + files[i]);
    //   docs.push(readHtml(HTML_FOLDER, files[i], i));
    // }
    // var idx = buildIndex(docs);
    // var previews = buildPreviews(docs);
    // var js =
    //   'export const LUNR_DATA = ' +
    //   JSON.stringify(idx) +
    //   ';\n' +
    //   'export const PREVIEW_LOOKUP = ' +
    //   JSON.stringify(previews) +
    //   ';';
    // fs.writeFile(OUTPUT_INDEX, js, function (err) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log('Index saved as ' + OUTPUT_INDEX);
    // });
  }
}

const a = new to({
  input: './demo',
  fields: ['title', 'description', 'keywords', 'body'],
  excludes: [],
  maxPreviewChars: 275,
  output: 'toIndex.js',
});
a.run();
