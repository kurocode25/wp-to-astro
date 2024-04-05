const {Command} = require('commander');
const cliProgress = require('cli-progress');
const color = require('ansi-colors');

const parser = require('./parser.js');
const writer = require('./writer.js');
const converter = require('./converter.js');

const program = new Command();
const bar = new cliProgress.SingleBar({
  format: 'progress [' + color.green('{bar}') + '] {percentage}% ',
  barCompleteChar: '=',
  barInCompleteChar: '-',
  hideCursor: true
});

program
  .name('wp-to-astro')
  .version('1.0.0')
  .description('convert Wordpress eXtended RSS(WXR) to Markdown for Astro')
  .argument('<export_file_path>', 'Wordpress export file path')
  .option('-o --outdir <dir_path>', 'output dir path', './')
  .option('-l, --layout <string>', 'layout frontmatter', '')
  .option('-y, --year-dir', 'make year directory')
  .option('-m, --month-dir', 'make month directory')
  .showHelpAfterError()
  .action(exec);

async function exec(file, option) {
  const config = {
    exportFile: file,
    outputDir: option.outdir,
    layoutPath: option.layout,
    doesMakeYearDir: option.yearDir,
    doesMakeMonthDir: option.monthDir
  }
  try {
    bar.start(4, 0);
    const data = await parser.read_file(config.exportFile);
    bar.increment();
    const result = await parser.parse_data(data)
    bar.increment();
    const payload = converter.make_payload(result.rss.channel[0], config); 
    bar.increment();
    writer.write(payload, config);
    bar.increment();
    bar.stop();
    console.log(color.cyan('complete!!'));
  } catch (err) {
    console.log(err.name + ":" + err.message)
  }
}

const start = () => program.parse();
exports.start = start
