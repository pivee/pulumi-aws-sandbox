import { deployStaticHtmlToS3 } from './handlers/static-html-to-s3'
import { deployDockerToFargate } from './handlers/docker-to-fargate'

/**
 * Deploy static HTML to S3
 */
// export const { bucketName, bucketEndpoint } = deployStaticHtmlToS3();


/**
 * Deploy to Fargate
 */
// export const { loadBalancerUrl } = deployDockerToFargate();