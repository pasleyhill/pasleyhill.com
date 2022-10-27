# Pasley Hill Website 

A plain old HTML site with some very minimal javascript. 
Uses Tailwind CSS. 

## Technology
* snowpack
* tailwind
* postcss
* serverless framework

# Installation
`npm run install`

# Development
`npm run dev` 

# Building for Deployment
`npm run build`

# Deployment
* Requirement: Create a `.env` file using the `.env.example` file.  The google captcha secret is stored in our password service, or get a new one by accessing Google Recaptcha settings using Pasley Hill account.  It is Recaptchv3, specifically.
* Requirement: `./backend/pasley-hill-leads.json` with Google service account user credentials added. There is Pasley Hill Web application in the Pasley Hill Google Cloud account.  Getting the service account user set-up, and key.
* `serverless.yml` contains the infrastructure as code to deploy the S3 bucket, CloudFront set-up, and configuration to the domain name, and this does also create the DNS record. 
* The domain is managed through Route53 but is actually registered through Google. You'll need to know how to get that ;).
* For staging deployemtns `npm run staging-deploy` to build, run serverless Cloudformation, and then upload files to S3. 
    * https://staging.pasleyhill.com
* For prod deployemtns `npm run deploy` to build, run serverless Cloudformation, and then upload files to S3. 
    * https://pasleyhill.com

