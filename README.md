# Umbraco next.js Static Site Generator Demo

An Umbraco backoffice with a next.js front-end. Demo is available here: https://etive-mor.github.io/umbraco-nextjs-demo/

Learn how to build this app here: https://www.etive-mor.com/blog/a-nextjs-frontend-for-your-umbraco-site

## Run the apps

### Run the Umbraco application 
`dotnet run --project "UmbracoNextJsDemo.Site"` 

- The site should launch at http://localhost:59970/umbraco/login
  - Username: demo@example.com
  - Password: Test123456@
  - These are configured in appsettings.json
- uSync is configured to run on first build, but if it doesn't, sign into Umbraco and visit the dashboard http://localhost:59970/umbraco#/settings/usync/dashboard?mculture=en-US and click *Everything -> Import -> All* to create the content

### Run the NextJS frontend application

- The umbraco site must be running before the next.js client can build

`npm run dev --prefix .\umbraco-next-js-demo-client\`

### Generate the front-end

`npm run build --prefix .\umbraco-next-js-demo-client\`

The files will be output in `./umbraco-next-js-demo-client/out/`

### Patrik - notes
- NodeJS version 18
- BE elivery API: http://localhost:59970/umbraco/swagger/index.html?urls.primaryName=Umbraco%20Delivery%20API
- FE nextjs: http://localhost:3000/umbraco-nextjs-demo

## Patrik - docker
- `docker-compose up --build`
- FE nextjs: http://localhost:3000/umbraco-nextjs-demo
- BE umbraco: http://localhost:8080/umbraco

