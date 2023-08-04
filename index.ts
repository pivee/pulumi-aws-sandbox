import { deployStaticHtmlToS3 } from './handlers/static-html-to-s3'

/**
 * Deploy static HTML to S3
 */
export const { bucketName, bucketEndpoint } = deployStaticHtmlToS3();