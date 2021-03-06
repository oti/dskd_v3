"use strict";

const gulp = require("gulp");

// server & browser sync
const server = require("./task/server/server");

// ブログアセット作成タスク ====================

// image
const image = require("./task/asset/image");

// css
const css = require("./task/asset/css");

// misc
const misc = require("./task/asset/misc");
const favicon = require("./task/asset/favicon");

// 記事オブジェクト作成タスク ====================
// （post/*.md -> posts.json -> archives.json, tags.json, years.json）
const json_posts = require("./task/json/posts");

// HTML作成タスク ====================

// 記事個別ページ作成（post_id.md -> post_id.html）
const html_posts = require("./task/html/posts");

// 記事一覧ページ作成（archives_name.md -> archives_name.html）
const html_archives = require("./task/html/archives");

// ブログインデックス作成（index.md -> index.html）
const html_pages = require("./task/html/pages");

// RSS作成（feed.md -> feed）
const feed = require("./task/html/feed");

// watch
const watch = (done) => {
  gulp.watch(["./src/style/**/*"], css);
  gulp.watch(["./src/image/**/*"], image);
  gulp.watch(["./src/misc/**/*"], misc);
  gulp.watch(["./src/html/**/*"], gulp.task("html"));
  done();
};

// Gulpタスク ====================

// 初回起動
gulp.task(
  "default",
  gulp.series(
    gulp.parallel(css, image, misc, favicon),

    json_posts,
    gulp.parallel(html_posts, html_archives, html_pages, feed),

    server,
    watch
  )
);

// テンプレート更新
gulp.task("html", gulp.series(html_posts, html_archives, html_pages, feed));

// 記事更新
gulp.task(
  "md",
  gulp.series(
    json_posts,
    gulp.parallel(html_posts, html_archives, html_pages, feed)
  )
);

// ビルド
gulp.task(
  "build",
  gulp.series(
    gulp.parallel(css, image, misc, favicon),

    json_posts,
    gulp.parallel(html_posts, html_archives, html_pages, feed)
  )
);
