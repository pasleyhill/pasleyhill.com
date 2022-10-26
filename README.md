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
* Requirement: pasley-hill-leads.json with Google service account user credentials added.
* `serverless.yml` contains the infrastructure as code to deploy the S3 bucket, CloudFront set-up, and configuration to the domain name, and this does also create the DNS record. 
* The domain is managed through Route53 but is actually registered through Google. You'll need to know how to get that ;).
* For staging deployemtns `npm run staging-deploy` to build, run serverless Cloudformation, and then upload files to S3. 
    * https://staging.pasleyhill.com
* For prod deployemtns `npm run deploy` to build, run serverless Cloudformation, and then upload files to S3. 
    * https://pasleyhill.com

