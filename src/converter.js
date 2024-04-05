const turndown = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');

function to_md(html) {
  const td = new turndown({
		headingStyle: 'atx',
		bulletListMarker: '-',
		codeBlockStyle: 'fenced'
  });
  td.use(turndownPluginGfm.tables);
  return td.turndown(html);
}

function to_tag_category(list) {
  let cl = [];
  let tl = [];

  list.forEach((item) => {
    if (item['$'].domain === "category") {
      cl.push('"' + item['_'] + '"');
    } else if (item['$'].domain === "post_tag") {
      tl.push('"' + item['_'] + '"');
    }
  })

  return { categories: '[' + cl.join(",") + ']',
           tags: '[' + tl.join(",") + ']'
         };
}

const make_payload = (yields, config) => {
  const author_data = yields['wp:author'];
  const posts = yields.item

  let author_map = new Map();
  author_data.forEach((item) => {
    author_map.set(item['wp:author_login'][0], item['wp:author_display_name'][0]);
  });

  return posts.map((post) => {
    const frontmatter = {
      title: post["title"][0],
      slug: post["wp:post_name"][0],
      date: post["wp:post_date"][0].slice(0,10),
      modified: post["wp:post_modified"][0].slice(0,10),
      type: post["wp:post_type"][0],
      author: author_map.get(post['dc:creator'][0]),
      categories: to_tag_category(post.category).categories,
      tags: to_tag_category(post.category).tags
    };
    if (config.layoutPath) {
      frontmatter.layout = config.layoutPath
    }
    const markdown = to_md(post["content:encoded"][0]);
    return {frontmatter, markdown}
  });
}

exports.make_payload = make_payload;
