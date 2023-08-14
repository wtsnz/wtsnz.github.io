import fs from "fs";
import path from "path";

const perform = () => {
  // In the content directory there are folders for each post.
  // An directory name would be "2021-04-23-bitcoin-node-misconceptions". Inside contains the post
  // source - a file called "2021-04-23-bitcoin-node-misconceptions.md" in this example, along with
  // any images that are referenced in the markdown.

  // To calculate a slug for a post, we use the following logic:
  // yyyy/title
  // e.g. "2021-04-23-bitcoin-node-misconceptions" becomes "2021/bitcoin-node-misconceptions"

  // In this script we need to find all post directories that contain images, calculate the slug for
  // the post, and then copy the images into the nextjs public directory.
  // const posts = fs.readdirSync(path.join(process.cwd(), "content", "posts"));

  const posts = fs
    .readdirSync(path.join(process.cwd(), "src", "content", "blog"), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  console.log(posts)

  posts.forEach((post) => {
    const postDir = path.join(process.cwd(), "src", "content", "blog", post);
    const postFiles = fs.readdirSync(postDir);

    // Check if the post directory contains images
    const imageFiles = postFiles.filter((file) =>
      file.match(/\.(jpg|jpeg|png|gif|svg)$/i)
    );

    if (imageFiles.length > 0) {
      console.log(post)

      // Calculate the slug for the post
      const slug = post.replace(/^(\d{4})-(\d{1,2})-(\d{1,2})-(.*)$/, "$1/$4");

      // Copy images to the nextjs public directory
      imageFiles.forEach((imageFile) => {
        const srcPath = path.join(postDir, imageFile);
        const destDir = path.join(process.cwd(), "public", slug);
        const destPath = path.join(destDir, imageFile);

        // Create the destination directory if it doesn't exist
        fs.mkdirSync(destDir, { recursive: true });

        // Copy the image file
        fs.copyFileSync(srcPath, destPath);

        console.log(`Copied ${imageFile} to public/images/${slug}`);
      });
    }
  });


return;
  // Process each post's images individually.
  posts.forEach((post) => {
    // The existing path for the images for this post.
    const oldImagePath = path.join(
      __dirname,
      "..",
      "src",
      "posts",
      post,
      "images"
    );

    // The desired path for the images for this post.
    const newImagePath = path.join(
      __dirname,
      "..",
      "public",
      "posts",
      post,
      "images"
    );

    // Not every post has images, so check if this one does before moving.
    if (fs.existsSync(oldImagePath)) {
      console.log(`Moving ${post} images...`);

      // Create any missing directories.
      if (!fs.existsSync(newImagePath)) {
        fs.mkdirSync(newImagePath, { recursive: true });
      }

      // Move the existing images to the desired location.
      fs.renameSync(oldImagePath, newImagePath);
    } else {
      console.log(`Skipping ${post} images, none exist.`);

      // Create a placeholder images directory so it exists for future use.
      // The `.gitkeep` file is created in the "empty" directory so
      // it can be checked in to git.
      const placeholder = path.join(newImagePath, ".gitkeep");
      if (!fs.existsSync(placeholder)) {
        fs.mkdirSync(newImagePath, { recursive: true });
        fs.writeFileSync(placeholder, "");
      }
    }
  });
};

perform();