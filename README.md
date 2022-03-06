## Installation
* The root folder of images should be resided inside *api* directory of the project
* UI dependencies can be installed with *cd ui && npm install*
* API server shoud be started with *cd api && dotnet watch*
* UI can be run with *cd ui && npm start*

## Implementation details
* API (ASP.NET Core MVC) and UI (React) projects are resided in different directories
* Logging functionality provided by .NET Generic Host in ASP.NET Core is used 
* ASP.NET Core Windows compatibility pack is used for reading image dimensions
* Blacklist is implemented with nlogm algorithm (n-number of folders, m-number of blacklist file lines)
* React router is used