# wp-to-astro
wp-to-astro is a tool for exporting WordPress articles to [Astro](https://astro.build/). This convert Wordpress eXtended RSS file to Markdown files with frontmatter in YAML format.

## Features
In the process of generating Markdown files, you can insert `layout`, Astro's unique frontmatter.

## Dependencies
- nodejs

Confirmed to work with nodejs ver. 18.19

## install
Execute the following command.

````
npm install kurocode25/wp-to-astro
````

## How to use
### Basic usage
Basically, execute it by adding the path of the read file as an argument.

````
npx wp-to-astro export.xml
````

### Command details
The help screen is shown below.

````
Usage: wp-to-astro [options] <export_file_path>

Arguments:
  export_file_path Wordpress export file path

Options:
  -V, --version output the version number
  -o --outdir <dir_path> output dir path (default: "./")
  -l, --layout <string> layout frontmatter (default: "")
  -y, --year-dir make year directory
  -m, --month-dir make month directory
  -h, --help display help for command
````

## frontmatter
The frontmatter of the generated Markdwon file is as follows.

- title: article title
- date: publication date
- modified: last updated date
- author: author of article
- categories: array of categories
- tags: array of tags
- layout: path to layout astro file
- type: post type e.g. page: Fixed article, post: Posted article

## Alternate
- [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown)
