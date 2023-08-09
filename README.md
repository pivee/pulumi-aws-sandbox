# Pulumi AWS Sandbox

[Pulumi's infrastructure-as-code SDK](https://www.pulumi.com/docs/clouds/aws/get-started/begin/) helps you create, deploy, and manage AWS containers, serverless functions, and infrastructure using programming languages like TypeScript, Python, Go, C#, and Java, and markup languages like YAML. The Pulumi AWS provider packages and CLI help you accomplish all these within minutes.

## Install Pulumi on Linux

```sh
curl -fsSL https://get.pulumi.com | sh
```

Hope you've already installed your language runtime, Node.js for Typescript in our case.

## Configure Pulumi to access your AWS account

Pulumi requires cloud credentials to manage and provision resources. You must use an IAM user account that has Programmatic access with rights to deploy and manage resources handled through Pulumi.

If you have previously installed and configured the AWS CLI, Pulumi will respect and use your configuration settings.

### Configure AWS CLI

```sh
aws configure
```

### Set AWS access in Environment Variables

If you do not have the AWS CLI installed or plan on using Pulumi from within a CI/CD pipeline, retrieve your access key ID and secret access key and then set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables on your workstation.

```sh
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
```

## Create a new project

```sh
mkdir <PROJECT_NAME> && cd <PROJECT_NAME>
pulumi new aws-typescript
```

The pulumi new command creates a new Pulumi project with some basic scaffolding based on the cloud and language specified, and the code in `index.ts` shows how to create a new S3 bucket and export the name of the bucket. This is where you write your code for your infrastructure.
