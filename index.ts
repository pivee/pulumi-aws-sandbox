import { deployStaticHtmlToS3 } from './handlers/static-html-to-s3'
import { deployDockerToFargate } from './handlers/docker-to-fargate'

/**
 * Deploy static HTML to S3
 */
export const { bucketName, bucketUrl } = deployStaticHtmlToS3();


/**
 * Deploy Docker to Fargate
 */
export const { ecrUrl, loadBalancerUrl } = deployDockerToFargate("next");