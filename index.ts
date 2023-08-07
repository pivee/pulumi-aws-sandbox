import { deployStaticHtmlToS3 } from './handlers/static-html-to-s3'
import { pushToEcrAndEcs } from './handlers/push-to-ecr-and-ecs'

/**
 * Deploy static HTML to S3
 */
// export const { bucketName, bucketEndpoint } = deployStaticHtmlToS3();

/**
 * Push to ECR and ECS
 */
export const { appUrl } = pushToEcrAndEcs();