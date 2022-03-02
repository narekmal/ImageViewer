# Image Viewer

## Installation
* The root folder of images should be resided inside *wwwroot* directory of the project
* Typescript can be built with *npm run build-ts*

## Implementation details
* Logging functionality provided by .NET Generic Host in ASP.NET Core is used 
* ASP.NET Core Windows compatibility pack is used for reading image dimensions
* Typescript is used for client-side image manipulations, webpack and ts-loader are used for build process

## Possible improvements
Remove image flickering when moving image with the mouse.