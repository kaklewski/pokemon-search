#!/bin/bash

# Folder paths
SOURCE_DIR="dist"
DEST_DIR="docs"

# Check if the source folder exists
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Folder $SOURCE_DIR nie istnieje."
  exit 1
fi

# Make sure the destination folder exists
mkdir -p "$DEST_DIR"

# Copying files with overwriting
cp -R "$SOURCE_DIR/"* "$DEST_DIR/"

echo "Files have been copied from $SOURCE_DIR to $DEST_DIR and overwritten if necessary."
