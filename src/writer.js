const fs = require('fs');
const {mkdir} = require('node:fs/promises');
const {join, path, dirname} = require('node:path');

async function write(posts, config) {
  for (let post of posts) {
    const path = get_path(post, config);
    await fs.promises.mkdir(dirname(path), {recursive: true});

    let ar = ['---'];
    for (let [k, v] of Object.entries(post.frontmatter)) {
      if (k !== 'slug') { // frontmatter doesn't need slug
        if (k === 'tags' || k === 'categories') {
          ar.push(`${k}: ${v}`);
        } else {
          ar.push(`${k}: "${v}"`);
        }
      }
    }

    ar.push("---\n");
    ar.push(post.markdown)
    fs.promises.writeFile(path, ar.join("\n"));
  }
}

function get_path(post, config) {
  let path_array = [config.outputDir];
  if (config.doesMakeYearDir) {
    path_array.push(post.frontmatter.published.substring(0,4))
  }

  if (config.doesMakeMonthDir) {
    path_array.push(post.frontmatter.published.substring(5,7))
  }

  path_array.push(post.frontmatter.slug + '.md')

  return join(...path_array);
}

exports.write = write
