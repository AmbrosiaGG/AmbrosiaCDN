const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Helper function to get file statistics
const getFileStatistics = (directoryPath, fileType) => {
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
  // Sort by date (latest first)
  files.sort((a, b) => b.date.localeCompare(a.date));

  const totalSize = files.reduce(
    (previousValue, initialValue) => previousValue + initialValue.size,
    0
  );

  const statistics = {
    totalNb: files.length,
    mostRecentUpload: files[0]?.date || "N/A",
    totalSize:
      totalSize > 1000
        ? `${Math.round((totalSize * 100) / 1000) / 100} MB`
        : `${Math.round(totalSize * 100) / 100} KB`,
  };

  // Format file sizes
  files = files.map((file) =>
    file.size > 1000
      ? { ...file, size: `${Math.round((file.size * 100) / 1000) / 100} MB` }
      : { ...file, size: `${Math.round(file.size * 100) / 100} KB` }
  );

  return { files, statistics };
};

// Route to display dashboard
router.get("/", async (req, res) => {
  const { username } = req.session;

  const { files: images, statistics: imgStatistics } = getFileStatistics(
    `files/${username}/images`,
    "image"
  );

  const { files: textFiles, statistics: textStatistics } = getFileStatistics(
    `files/${username}/text`,
    "text"
  );

  res.render("../views/dashboard/index.ejs", {
    title: process.env.title,
    req,
    res,
    role: req.session.role,
    name: username,
    textStatistics,
    imgStatistics,
  });
});

// Route for images
router.get("/images", async (req, res) => {
  const { username } = req.session;

  const { files: images, statistics } = getFileStatistics(
    `files/${username}/images`,
    "image"
  );

  res.render("../views/dashboard/images.ejs", {
    title: process.env.title,
    req,
    res,
    role: req.session.role,
    name: username,
    pass: req.session.not_listd,
    fs,
    images,
    statistics,
    fileExists: fs.existsSync,
  });
});

// Route for text files
router.get("/texts", async (req, res) => {
  const { username } = req.session;

  const { files: textFiles, statistics } = getFileStatistics(
    `files/${username}/text`,
    "text"
  );

  res.render("../views/dashboard/files.ejs", {
    title: process.env.title,
    req,
    res,
    role: req.session.role,
    name: username,
    pass: req.session.not_listd,
    fs,
    texts: textFiles,
    statistics,
    fileExists: fs.existsSync,
  });
});

// Route for redirects (currently empty)
router.get("/redirects", async (req, res) => {
  res.render("../views/dashboard/redirects.ejs", {});
});

module.exports = router;
