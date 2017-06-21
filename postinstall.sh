#!/usr/bin/env bash

# Fix symbolic link in iOS Framework
cd iOS/Frameworks

echo "Removing current Symlinks files"
rm Headers
rm Resources
rm ThePerfectApp
rm Versions/Current
	
echo "Creating new Symlinks"
cd Versions
ln -s A Current
cd ..

ln -s ./Versions/Current/Headers Headers
ln -s ./Versions/Current/Resources Resources
ln -s ./Versions/Current/ThePerfectApp ThePerfectApp
