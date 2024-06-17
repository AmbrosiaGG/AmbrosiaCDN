const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/", async (req, res) => {
  const directoryPathImg = "files/" + req.session.username + "/images";
  let images = [];
  fs.readdirSync(directoryPathImg).forEach((image) => {
    images.push({
      fullPath: image,
      size: fs.statSync(`${directoryPathImg}/${image}`).size / 1000,
      date: fs
        .statSync(`${directoryPathImg}/${image}`)
        .mtime.toLocaleDateString("en-US"),
    });
  });
  images.sort((a, b) => a - b);
  const totalSizeimg = images.reduce(
    (previousValue, initialValue) => previousValue + initialValue.size,
    0
  );
  const imgstatistics = {
    totalNb: images.length,
    mostRecentUpload: images[0].date,
    totalSize:
      totalSizeimg > 1000
        ? `${Math.round((totalSizeimg * 100) / 1000) / 100} MB`
        : `${Math.round(totalSizeimg * 100) / 100} KB`,
  };
  images = images.map((image) =>
    image.size > 1000
      ? {
          ...image,
          size: `${Math.round((image.size * 100) / 1000) / 100} MB`,
        }
      : { ...image, size: `${Math.round(image.size * 100) / 100} KB` }
  );

  const directoryPathText = "files/" + req.session.username + "/text";
  let files = [];
  fs.readdirSync(directoryPathText).forEach((file) => {
    files.push({
      fullPath: file,
      size: fs.statSync(`${directoryPathText}/${file}`).size / 1000,
      date: fs
        .statSync(`${directoryPathText}/${file}`)
        .mtime.toLocaleDateString("en-US"),
    });
  });
  files.sort((a, b) => a - b);
  const totalSizeText = files.reduce(
    (previousValue, initialValue) => previousValue + initialValue.size,
    0
  );
  const textstatistics = {
    totalNb: files.length,
    mostRecentUpload: files[0].date,
    totalSize:
      totalSizeText > 1000
        ? `${Math.round((totalSizeText * 100) / 1000) / 100} MB`
        : `${Math.round(totalSizeText * 100) / 100} KB`,
  };
  flies = files.map((files) =>
    files.size > 1000
      ? {
          ...files,
          size: `${Math.round((files.size * 100) / 1000) / 100} MB`,
        }
      : { ...files, size: `${Math.round(files.size * 100) / 100} KB` }
  );

  res.render("../views/dashboard/index.ejs", {
    title: process.env.title,
    req: req,
    res: res,
    role: req.session.role,
    name: req.session.username,
    textstatistics: textstatistics,
    totalSizeText: totalSizeText,
    imgstatistics: imgstatistics,
    totalSizeimg: totalSizeimg,
  });
});

router.get("/images", async (req, res) => {
  const directoryPath = "files/" + req.session.username + "/images";
  let images = [];
  fs.readdirSync(directoryPath).forEach((image) => {
    images.push({
      fullPath: image,
      size: fs.statSync(`${directoryPath}/${image}`).size / 1000,
      date: fs
        .statSync(`${directoryPath}/${image}`)
        .mtime.toLocaleDateString("en-US"),
    });
  });
  images.sort((a, b) => a - b);
  const totalSize = images.reduce(
    (previousValue, initialValue) => previousValue + initialValue.size,
    0
  );
  const statistics = {
    totalNb: images.length,
    mostRecentUpload: images[0].date,
    totalSize:
      totalSize > 1000
        ? `${Math.round((totalSize * 100) / 1000) / 100} MB`
        : `${Math.round(totalSize * 100) / 100} KB`,
  };
  images = images.map((image) =>
    image.size > 1000
      ? {
          ...image,
          size: `${Math.round((image.size * 100) / 1000) / 100} MB`,
        }
      : { ...image, size: `${Math.round(image.size * 100) / 100} KB` }
  );

  res.render("../views/dashboard/images.ejs", {
    title: process.env.title,
    req: req,
    res: res,
    role: req.session.role,
    name: req.session.username,
    pass: req.session.not_listd,
    fs: require("fs"),
    images: images,
    statistics: statistics,
    fileExists: require("fs").existsSync,
  });
});

router.get("/texts", async (req, res) => {
  const directoryPath = "files/" + req.session.username + "/text";
  let files = [];
  fs.readdirSync(directoryPath).forEach((file) => {
    files.push({
      fullPath: file,
      size: fs.statSync(`${directoryPath}/${file}`).size / 1000,
      date: fs
        .statSync(`${directoryPath}/${file}`)
        .mtime.toLocaleDateString("en-US"),
    });
  });
  files.sort((a, b) => a - b);
  const totalSize = files.reduce(
    (previousValue, initialValue) => previousValue + initialValue.size,
    0
  );
  const statistics = {
    totalNb: files.length,
    mostRecentUpload: files[0].date,
    totalSize:
      totalSize > 1000
        ? `${Math.round((totalSize * 100) / 1000) / 100} MB`
        : `${Math.round(totalSize * 100) / 100} KB`,
  };
  flies = files.map((files) =>
    files.size > 1000
      ? {
          ...files,
          size: `${Math.round((files.size * 100) / 1000) / 100} MB`,
        }
      : { ...files, size: `${Math.round(files.size * 100) / 100} KB` }
  );

  res.render("../views/dashboard/files.ejs", {
    title: process.env.title,
    req: req,
    res: res,
    role: req.session.role,
    name: req.session.username,
    pass: req.session.not_listd,
    fs: require("fs"),
    texts: files,
    statistics: statistics,
    fileExists: require("fs").existsSync,
  });
});

router.get("/redirects", async (req, res) => {
  res.render("../views/dashboard/redirects.ejs", {});
});
module.exports = router;
