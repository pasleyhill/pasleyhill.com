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
* `serverless.yml` contains the infrastructure as code to deploy the S3 bucket, CloudFront set-up, and configuration to the domain name.
    * However, after the CloudFront distribution is configured using the deploy commands, you will need to manage the CNAME where the domain is managed.  Point a CNAME record to the cloudfront distribution, and you are done there.  
* For staging deployemtns `npm run staging-deploy` to build, run serverless Cloudformation, and then upload files to S3. 
    * https://staging.pasleyhill.com
* For prod deployemtns `npm run deploy` to build, run serverless Cloudformation, and then upload files to S3. 
    * https://pasleyhill.com

