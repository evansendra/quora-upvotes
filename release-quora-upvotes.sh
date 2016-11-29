#!/bin/sh
###
# Assumes that this file lives in is named the same as $ORIG variable below
# and generates a zip file for release as a chrome extension to the 
# chrome extension store
###

ORIG="quora-upvotes"
DEST="quora-upvotes-release"
OUTFILE="quora-upvotes/quora-upvotes-release.zip"

cd ..
rm -f $OUTFILE
cp -r $ORIG $DEST
rm -rf $DEST/.git $DEST/.gitignore $DEST/.idea $DEST/.DS_Store
zip -r $OUTFILE $DEST
rm -rf $DEST
