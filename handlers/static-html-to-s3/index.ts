import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { join } from "path";

export function deployStaticHtmlToS3() {
    // Create an AWS resource (S3 Bucket)
    const bucket = new aws.s3.Bucket("sandbox-bucket", {
        website: {
            indexDocument: "index.html",
        }
    });

    // Export the name of the bucket
    const bucketName = bucket.id;

    // Create S3 Bucket Ownership Controls
    const ownershipControls = new aws.s3.BucketOwnershipControls("ownership-controls", {
        bucket: bucket.id,
        rule: {
            objectOwnership: "ObjectWriter",
        },
    });

    // Create S3 Bucket Public Access Block
    const publicAccessBlock = new aws.s3.BucketPublicAccessBlock("public-access-block", {
        bucket: bucket.id,
        blockPublicAcls: false,
    });

    // Create an AWS resource (S3 Bucket Object)
    const bucketObject = new aws.s3.BucketObject("index.html", {
        bucket: bucket.id,
        source: new pulumi.asset.FileAsset(join(__dirname, "/../../apps/html/index.html")),
        contentType: "text/html; charset=utf-8",
        acl: "public-read",
    }, {
        dependsOn: publicAccessBlock,
    });

    // Export the website URL
    const bucketUrl = pulumi.interpolate`http://${bucket.websiteEndpoint}`;

    return {
        bucketName,
        bucketUrl,
    }
}