#!/usr/bin/env bash

# Fix symbolic link in iOS Framework
cd ios/Frameworks/ThePerfectApp.framework

echo "Removing current Symlinks files"
rm -f Headers
rm -f Resources
rm -f ThePerfectApp
rm -f Versions/Current
	
echo "Creating new Symlinks"
cd Versions
ln -s A Current
cd ..

ln -s ./Versions/Current/Headers Headers
ln -s ./Versions/Current/Resources Resources
ln -s ./Versions/Current/ThePerfectApp ThePerfectApp
